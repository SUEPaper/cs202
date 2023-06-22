---
id: "deps"
sidebar_position: 10
---

# 依赖注入和 FastAPI 依赖

## 理论部分 - 什么是依赖注入

依赖关系注入 （DI） 是代码函数和/或类声明它们需要工作的东西的一种方式。

如果你想获得更多的技术：依赖注入依赖于组合，是一种实现反转的方法 的控制。

FastAPI有一个优雅而简单的依赖注入系统。 这是我最喜欢的框架功能。您可以在路径操作函数中声明依赖关系，即 定义 API 端点的修饰函数。您可能想要的依赖项类型的典型示例 注入：

- 数据库连接
- 身份验证/安全要求（例如，获取用户凭据、检查用户是否处于活动状态、检查用户访问级别）
- 用于与其他服务（例如 AWS 服务、电子邮件营销服务、CMS）交互的客户端
- 几乎任何共享代码逻辑

这些依赖项只需要声明一次，然后在代码库中的其他位置引用，因此 DI 使您的 代码重复性更少，更易于理解。DI 对于测试也非常有用，因为您可以将测试替身注入到对象中，从而减少笨拙的猴子修补。 我们将在文章的第二部分看一个例子。让我们开始看一些例子。

## 实践部分 1 - 在 FastAPI 中使用 DI

到目前为止，在本教程系列中，我们已经开始在数据库会话中使用 FastAPI 的依赖注入系统 和身份验证。让我们重新审视这些，然后看一个新示例。

:::note
**注入数据库会话依赖项**

我们有一个中心位置，在其中定义了我们的依赖项。在前面的部分中，我们已经 定义了此函数以将数据库会话注入路径操作函数：`./api/deps.py`

```python
def get_db() -> Generator:
    db = SessionLocal()
    db.current_user_id = None
    try:
        yield db
    finally:
        db.close()
```

然后我们像这样使用数据库会话：

```python
from fastapi import Depends
# other imports skipped for brevity

@router.get("/{recipe_id}", status_code=200, response_model=Recipe)
def fetch_recipe(
    *,
    recipe_id: int,
    db: Session = Depends(deps.get_db),  # (1) The dependency injection
) -> Any:
    """
    Fetch a single recipe by ID
    """
    result = crud.recipe.get(db=db, id=recipe_id)  # (2) Using the dependency
    # code continues...
```

您可以在此代码片段的注释 （1） 中看到 FastAPI 中依赖项注入的结构：

- 定义一个（通常是一个函数，但在极少数情况下也可以是一个类） 返回或生成要注入的实例化对象（或简单值）callable
将参数添加到路径操作函数（即修饰的 API 终结点函数），使用 FastAPI 类定义参数，并将函数传递给类。DependsDepends
请注意，依赖函数使用的典型用例是您在之后执行额外步骤 完成（例如关闭数据库连接、清理、某些状态更改）。yield

- 然后可以使用依赖项，如上面代码片段中的注释 （2） 所示，其中数据库会话 传递给 crud 实用程序方法（该方法又通过会话执行数据库查询，请参阅源代码）。

您的函数没有“注册”（或类似）过程，FastAPI 会在后台为您处理。 根据文档，这取决于您是否 您希望依赖项函数是否异步。

**一个新的依赖注入示例 - Reddit 客户端**

在第 11 部分中，示例代码随着 reddit 客户端依赖项的添加而更改。函数 已替换终结点中使用的终结点。

```python
def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(
    db: Session = Depends(get_db),
    token: str = Depends(reusable_oauth2)
):
    try:
        payload = jwt.decode(
            token, security.SECRET_KEY, algorithms=[security.ALGORITHM]
        )
        token_data = schemas_token.TokenPayload(**payload)
    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials"
        )

```

让我们分解一下，因为这段代码有几个微妙之处。随意跳过作为理解的关键 它是一个基本的Reddit HTTP客户端：

1. 虽然大多数 Python 爱好者都熟悉流行的请求 HTTP 客户端，但很少有人熟悉 使用称为HTTPX的替代方案，它具有类似的干净界面，但也优雅地支持异步。什么时候 我们使用HTTPX，这与请求相似，即通过池化重用连接。ClientSession
2. 有点丑陋的方法，用于在会话中捞出适当的方法（等），然后立即使用 正确的网址。getattrgetpost
与请求一样，在任何 4xx 或 5xx 响应上引发错误（文档raise_for_status)
3. 第 2 点中描述的方法的用法。


现在返回数据，而不是像上一个（次优）函数那样仅改变字典。

太好了，现在我们有了客户端，我们需要更新模块以包含它：deps.py

```python
from typing import Generator
from db.config import SessionLocal
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import ValidationError
from sqlalchemy.orm import Session
from jose import jwt
from core import security
from crud import crud_user
from schemas import token as schemas_token

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl="/login/access_token"
)


def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(
    db: Session = Depends(get_db),
    token: str = Depends(reusable_oauth2)
):
    try:
        payload = jwt.decode(
            token, security.SECRET_KEY, algorithms=[security.ALGORITHM]
        )
        token_data = schemas_token.TokenPayload(**payload)
    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials"
        )

    user = crud_user.get_by_id(db, id=token_data.sub)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return user

```

现在，reddit 客户端在路径操作功能中可用。

:::

本节文件目录图：

```bash

E:.
│  .gitignore
│  main.py
│  package-lock.json
│  requirements.txt
│  __init__.py
│  
├─.vscode
│      settings.json
│
├─api
│      api.py
│      deps.py
│      todos.py
│      users.py
│      __init__.py
│
├─crud
│      base.py
│      todo.py
│      user.py
│      __init__.py
│
├─db
│  │  alembic.ini
│  │  config.py
│  │  __init__.py
│  │
│  ├─alembic
│  │  │  env.py
│  │  │  README
│  │  │  script.py.mako
│  │  │
│  │  └─versions
│  └─migrations
│      │  alembic.ini
│      │  env.py
│      │  README
│      │  script.py.mako
│      │
│      ├─versions
│      │  │  627ad3ae9268_create_user_table.py
│      │  │  ba7950cbec98_add_user_id_in_todo_table.py
│      │  │  bb9dd166b2ca_create_todo_table.py
│      │  │
│      │  └─__pycache__
│      │          627ad3ae9268_create_user_table.cpython-311.pyc
│      │          ba7950cbec98_add_user_id_in_todo_table.cpython-311.pyc
│      │          bb9dd166b2ca_create_todo_table.cpython-311.pyc
│      │
│      └─__pycache__
│              env.cpython-311.pyc
│
├─models
│      todo.py
│      user.py
│      __init__.py
│
└─schemas
        todo.py
        token.py
        user.py
        __init__.py
```
