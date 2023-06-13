---
id: "jwt"
sidebar_position: 10
---

# 通过JSON Web令牌（JWT）进行身份验证

## 理论部分--JWT Auth Overview

我们所说的身份验证是什么意思：**身份验证与授权**

当人们谈论“身份验证”时，他们谈论的是：

- 身份验证：确定用户是否是他们声称的身份
- 授权：确定用户可以访问和不能访问的内容

简而言之，对资源的访问受到身份验证和授权的保护。 如果您无法证明自己的身份，您将不被允许进入资源。即使你可以 证明您的身份，如果您未获得该资源的授权，您仍将被拒绝访问。

我们在本教程中介绍的大部分内容都是身份验证，但它奠定了基础 授权所必需的。

什么是**JWT**

JSON Web Token（JWT，愚蠢地发音为“jot”）是一个开放标准（RFC 7519），它 定义在双方之间传输信息（如身份验证和授权事实）的方式： 发行人和受众。 通信是安全的，因为每个颁发的令牌都经过数字签名，因此消费者可以验证 令牌是真实的或伪造的。有很多不同的方法来签署令牌 在这里更详细地讨论。

JSON Web 令牌基本上是一个长编码的文本字符串。此字符串由三个较小的部分组成， 用句点分隔。这些部分是：

- 页眉
- 有效载荷或主体
- 一个签名

因此，令牌将如下所示：`header.payload.signature`

JSON Web 令牌不像 API 令牌那样是“机密”（除非您选择加密它们）。然而，因为他们 签名它们不容易被篡改 - 这就是它们的价值。 JWT 旨在四处传递。 实际上，这是我们的示例应用程序，您可以将其复制并粘贴到 `jwt.io` 中以播放 跟：`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwiZXhwIjoxNjI5NzMyNzY2LCJpYXQiOjE2MjkwNDE1NjYsInN1YiI6IjUifQ.rJCd2LxtEn5hJz3OASul0bhHf2GlFKfCNNk48q0pb4o`

您应该看到：

![](./img/J1.png)

请注意，右侧的解码部分由三个部分组成。

为什么要使用 JWT？
这一切都归结为状态。HTTP 协议是无状态的，因此在调用受保护的 API 端点时，我们的选项是：

1. 为每个请求发送用户名/密码
2. 更聪明的东西

使用JWT，客户端（例如用户的浏览器）将在登录后存储JWT的副本，然后 将其包含在后续请求标头中。在服务器上，对此令牌进行解码和验证。 这意味着无需每个受保护的端点请求都包含登录凭据。

典型的 JWT 身份验证用例包括：

- 非服务器端渲染的Web前端，例如在React，Angular或Vue等前端框架中编写的前端。
- 后端微服务
- 外部服务
- 移动应用
- 桌面应用

本教程系列的项目（配方 API）是一个现实场景，我们需要一个身份验证解决方案。

JWT 有替代方案，例如：

- Fernet
- Branca
- Platform-Agnostic Security Tokens (PASETO)

让我们开始编码吧！

## 实用部分 1 - 实现 JWT 身份验证终结点 - 注册流

:::note 步骤

打开`./api/users.py`

1. 确定文件中所需要的包已经导入

```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api import deps
from crud import crud_user
from schemas import user as schemas_user
```

2. 确定router应用已经创建

```python
router = APIRouter()
```

3. 我们在配方 API 中添加了三个新端点。这些都在模块中。我们将首先考虑新的 POST 端点，我们将在其中创建新用户：

```python

@router.post("/", response_model=schemas_user.UserInDB)
def create_user(
    user_params: schemas_user.UserCreate,
    db: Session = Depends(deps.get_db)
):
    user = crud_user.get_by_email(db=db, email=user_params.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system."
        )
    user = crud_user.create(db=db, user_params=user_params)
    return user


@router.put("/name", response_model=schemas_user.UserInDB)
def update_user(
    user_params: schemas_user.UserUpdateName,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_user)
):
    user = crud_user.update_name(db=db, id=current_user.id, user_params=user_params)
    return user


@router.put("/password", response_model=schemas_user.UserInDB)
def update_user(
    user_params: schemas_user.UserUpdatePassword,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_user)
):
    user = crud_user.update_password(db=db, id=current_user.id, user_params=user_params)
    return user
```

然后将上述代码整合，封装在`./api/api.py`中

```python
from api.users import router as users_router

#skipping...

api_router.include_router(users_router, prefix="/users", tags=["users"])
```

让我们分解一下：

1. 如本系列的第 4 部分所示，我们指定了一个 Pydantic，用于塑造端点 JSON 响应。`response_model`
2. 如本系列的第 7 部分所示，我们通过 FastAPI 的依赖关系注入将数据库指定为端点的依赖关系 能力。
POST 请求正文根据 pydantic 架构进行验证。那里 是我们在用户模式中进行的一些非常强大的调整，我们将很快介绍。`UserCreate`
3. 如本系列的第 7 部分所述，我们使用 SQLAlchemy ORM 来查询数据库表，应用过滤器进行检查 如果已存在具有所请求电子邮件的任何用户。`user`
4. 为了确保用户电子邮件是唯一的，如果找到匹配的用户（即现有的 具有相同电子邮件地址的用户），然后我们返回一个 HTTP 400（如第 5 部分：基本错误处理中所示）
5. 最后，如果用户电子邮件是唯一的，我们继续使用实用程序函数来创建用户。我们来看看这个 现在。`crud`

如果我们遵循代码逻辑，我们来看看这个代码在：`./crud/users.py`

```python
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from crud.base import CRUDBase
from models import User as ModelsUser
from core.security import get_password_hash, verify_password


class CRUDUser(CRUDBase):

    def get_by_email(self, db: Session, email: str):
        return db.query(self.model).filter(self.model.email == email).first()

    def create(self, db: Session, user_params):
        user = ModelsUser(
            name=user_params.name,
            email=user_params.email,
            hashed_password=get_password_hash(user_params.password)
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    def authenticate(self, db: Session, email, password):
        user = self.get_by_email(db, email=email)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user
    
    def update_name(self, db: Session, id, user_params):
        user = self.get_by_id(db=db, id=id)
        user.name = user_params.name    
        db.commit()
        db.refresh(user)
        return user
    
    def update_password(self, db: Session, id, user_params):
        user = self.get_by_id(db=db, id=id)
        user.hashed_password = get_password_hash(user_params.password)   
        db.commit()
        db.refresh(user)
        return user


crud_user = CRUDUser(ModelsUser)
```

打开./schemas/users.py
我们需要将此代码与更新的架构一起考虑，其中现在包含以下字段：

```python
class UserCreate(UserBase):
    password: str
```

至关重要的是，您会注意到在方法中（请注意，我们正在覆盖父方法）， 我们通过调用将 Pydantic 模型转换为字典，然后通过 .然后为了生成散列密码，我们调用一个新的 方法。接下来让我们看看这个函数。

当密码被“散列”时，这意味着它已被加扰 表示自身（更多细节在这里）。 获取用户的密码，并使用已知的密钥 site – 哈希值来自密码和密钥的组合， 使用集合算法。在配方 API 中，我们将使用 passlib 库来帮助我们实现此功能。从文档中：

Passlib是Python 2和3的密码哈希库，它提供了超过30个跨平台的实现。 密码哈希算法，以及用于管理现有密码哈希的框架。它被设计为有用的 适用于广泛的任务，从验证在 /etc/shadow 中找到的哈希，到提供完整的密码哈希 多用户应用程序。

打开./core/security.py

```python
from datetime import datetime, timedelta
from jose import jwt

from passlib.context import CryptContext

SECRET_KEY = "196ca263383b2fd21dfae2eda445f30b25d14806a861ababf10a408beb5e2117"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 15

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_access_token(
    subject,
    expires_delta=None
):

    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode = {
        "exp": expire,
        "sub": str(subject)
    }
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)

```

在这里，来自类用于散列和验证用户密码。`CryptContextpasslib`

用户创建流程的最后一步是更新我们的数据库。我们必须对表进行一项更改：`user`

```python
class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(256), nullable=True)
    surname = Column(String(256), nullable=True)
    email = Column(String, index=True, nullable=False)
    is_superuser = Column(Boolean, default=False)
    recipes = relationship(
        "Recipe",
        cascade="all,delete-orphan",
        back_populates="submitter",
        uselist=True,
    )

    # New addition
    hashed_password = Column(String, nullable=False)
```

请注意新列。`hashed_password`

这就是我们创建用户的流程。那些跟随以前的教程文章的人会注意到我已经调整了 用于适应使用密码创建用户的 Alembic 迁移和脚本。`app/db/init_db.py`
:::

## 实用部分 2 - 实现 JWT 身份验证终结点 - 登录流

接下来，让我们考虑新的端点：`/login`

:::note 步骤
打开`./api/auth.py`

```python
from fastapi.security import OAuth2PasswordRequestForm
# skipping...

@router.post("/login")
def login(
    db: Session = Depends(deps.get_db), form_data: OAuth2PasswordRequestForm = Depends()  # 1
) -> Any:
    """
    Get the JWT for a user with data from OAuth2 request form body.
    """

    user = authenticate(email=form_data.username, password=form_data.password, db=db)  # 2
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")  # 3

    return {
        "access_token": create_access_token(sub=user.id),  # 4
        "token_type": "bearer",
    }

# skipping...
```

请注意，我们在路径操作函数中使用了 FastAPI 的 OAuth2PasswordRequestForm 依赖项。

OAuth2PasswordRequestForm是一个类依赖项，它声明了一个表单主体，其中：

- 用户名。
- 密码。
- 可选grant_type
- 作为大字符串的可选范围字段，由空格分隔的字符串组成。（对于我们的示例不是必需的）
- 可选client_id（对于我们的示例不是必需的）。
- 可选client_secret（对于我们的示例不是必需的）。

让我们分解终结点逻辑：

- 我们声明依赖关系OAuth2PasswordRequestForm
- 我们通过一个新函数检查请求正文（我们稍后会看看这个）authenticate
- 如果身份验证失败，则不返回任何用户，这将触发 HTTP 400 响应
- 最后，创建 JSON Web 令牌并通过函数返回到客户端（我们稍后会看一下）。create_access_token

上面列表中的两个新功能（和）都来自新模块。现在让我们完整地考虑这个模块。在这一点上，您会注意到 在教程系列中，我们介绍了另一个外部依赖项 python-jose，它为我们提供了用于加密和签名令牌的各种加密后端。
打开`./api/auth.py`

```python

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from api import deps
from crud import crud_user
from schemas import token as schemas_token
from core import security

router = APIRouter()


@router.post("/login/access_token", response_model=schemas_token.Token)
def login_access_token(
    db: Session = Depends(deps.get_db), form_data: OAuth2PasswordRequestForm = Depends()
):

    user = crud_user.authenticate(
        db, email=form_data.username, password=form_data.password
    )

    if not user:
        raise HTTPException(
            status_code=400,
            detail="Incorrect email or password"
        )
    access_token = security.create_access_token(user.id)
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
```

这里发生了很多事情，让我们分解一下：

1. 我们使用之前看到的函数，其中利用了 passlib 库
2. 函数的关键字参数将对应于用户 IDsubcreate_access_token
3. 更新以包含一些与身份验证相关的设置，例如到期前的 JWT 有效性时间范围
4. 我们构建智威汤逊。RFC 7519 中详述了许多必填/可选字段（称为“声明”）。“exp”（过期时间）声明标识过期时间 在此日期或之后，不得接受 JWT 进行处理。
5. “iat”（签发时间）索赔指明了JWT的签发时间。
6. “子”（主题）声明标识作为 JWT 主体的主体。在我们的例子中，这将是用户 ID。

如果用户通过身份验证检查，终结点会将 JWT 返回到客户端。然后，此 JWT 可以是 用于访问受限功能。在第三个新端点中可以找到一个基本示例：`/login`
```python
@router.get("/me", response_model=schemas.User)
def read_users_me(current_user: User = Depends(deps.get_current_user)):
    """
    Fetch the current logged in user.
    """

    user = current_user
    return user
```

到目前为止，我们使用的唯一依赖注入是用于访问数据库，但我们可以 还可以将其用于其他操作，例如获取登录用户。我们将在下一页更详细地探讨这一点 关于依赖注入系列的帖子。

更新模块中要注意的关键代码如下：`api/deps.py`

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

在这里，传入的 JWT 令牌被解码（再次使用 python-jose），并结合一个值 在 API 中设置以及在那里配置的编码算法 （HS256）。如果此解码 成功了，我们“信任”令牌，并乐于从数据库中获取用户。JWT_SECRETapp/core/config.py
:::

现在，让我们在本地尝试整个身份验证流：

:::info 访问

开放式 `http://localhost:8000/docs`
应会看到新的终结点：

![](./img/J2.png)

此时我们的API已被上锁，现在我们得注册账号去获得修改权限

![](./img/J3.png)

如果向下滚动，应在响应中看到您的用户已创建：

![](./img/J4.png)

接下来，我们将利用一个有用的 swagger 交互式 UI 功能来授权用户。点击右上角的按钮：Authorize

![](./img/J5.png)

输入凭据（请注意，您应该在用户名字段中输入电子邮件地址），然后单击“授权”：

![](./img/J6.png)

您应该看到您已登录。现在，如果您再次尝试该端点，您应该得到 200 响应正文中包含用户详细信息的响应

![](./img/J7.png)

恭喜！您现在可以在 FastAPI 应用程序中使用基本身份验证！

我们可以添加许多更复杂的功能，例如：

- 使用范围进行授权
- 刷新令牌
- 密码重置
- 单点登录 （SSO）
- 将自定义数据添加到 JWT 有效负载
- JSON 网络加密
:::

至此，我们后端的学习内容已经结束。

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
│      auth.py
│      deps.py
│      todos.py
│      users.py
│      __init__.py
│
├─core
│      security.py
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