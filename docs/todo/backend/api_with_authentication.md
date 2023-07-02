---
id: auth_api
sidebar_position: 14
---

# API 鉴权

:::tip

本课程网站内容请仔细阅读后再进行实操。因未仔细阅读内容，出现任何错误后果自负（逃～～～逃～～～逃

请切换到 `backend_api_with_auth_start` 分支，开始此教程代码的编写。

**所有的代码请不要复制粘贴，请手敲每一行代码。复制粘贴不会让你动脑子，而手敲每一个行代码会让你自然而然地去动脑子会想每一行代码的含义和原理**
:::

上文介绍了如何实现一个用户登陆的API，有了登陆的API以后，客户端（浏览器、IOS/Android App）便可通拿到JWT令牌。在登陆以后，客户端每次发送请求可以将JWT令牌附带到HTTP请求的Header中。

以下是一个示例的HTTP请求报文，使用Bearer类型的JWT令牌：

```bash
GET /api/data HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

客户端每次HTTP请求带上JWT令牌，服务器端代码只需要在每次请求的时候解析JWT令牌，解密令牌得到用户信息。

## 实现API鉴权的依赖

用 VS Code 打开 `api/deps.py`，将代码修改成如下：

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

def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl="/api/login/access_token"
)

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

下列代码创建了一个`OAuth2PasswordBearer`实例，用于处理OAuth2密码模式的身份验证。`tokenUrl`参数指定了用于获取访问令牌的URL。

```python
reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl="/api/login/access_token"
)
```

`get_current_user`函数是一个路由处理函数，通过依赖 `reusable_oauth2` 得到HTTP请求中的JWT令牌，并验证其有效性。如果令牌验证失败，将引发`jwt.JWTError`或`ValidationError`异常，并返回HTTP 403 Forbidden错误。如果令牌验证成功，便会得到 `user_id` 信息。通过CRUD提供的`get_by_id`方法获取用户信息。

## 实现修改用户名和密码的API

从业务逻辑的角度出发，更改用户名和密码应该只允许当前用户修改自己的用户名和密码，因此这两个API需要实现鉴权验证功能。

用 VS Code 打开 `api/users.py` 文件，将代码修改如下：

```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api import deps
from crud import crud_user
from schemas import user as schemas_user

router = APIRouter()

@router.post("/users", response_model=schemas_user.UserInDB)
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

@router.put("/users/name", response_model=schemas_user.UserInDB)
def update_user(
    user_params: schemas_user.UserUpdateName,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_user)
):
    user = crud_user.update_name(db=db, id=current_user.id, user_params=user_params)
    return user

@router.put("/users/password", response_model=schemas_user.UserInDB)
def update_user(
    user_params: schemas_user.UserUpdatePassword,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_user)
):
    user = crud_user.update_password(db=db, id=current_user.id, user_params=user_params)
    return user
```

上述代码可知，实现API的鉴权验证功能的方式很简单，加入 `deps.get_current_user` 函数依赖便可。


接下来是测试阶段，请用浏览器打开 http://localhost:8000/docs(打开 URL 前请确保我们的FastAPI 应用是运行起来的)测试修改用户名和密码的API。

![](./img/api_with_auth_01.png)


可以看到修改用户名和密码的两个API请求多了一把形状像打开的小锁，这代表这需要登陆才能使用这些API。那么我们该如何使用这些加锁的API呢？点击右上角的 `Authorize` 按钮 (**前提是已经注册好了一个用户**)。

![](./img/api_with_auth_02.png)

![](./img/api_with_auth_03.png)

![](./img/api_with_auth_04.png)

![](./img/api_with_auth_05.png)

关闭弹窗后，你会看到原本打开的小锁被锁上了，说明这几个API可以使用了，并且Swagger UI在发送请求时会自动将前面获取到的JWT令牌放到HTTP的header中。解下来请继续测试修改用户名和密码的API。

## 在Todo中加入`user_id`，实现一对多。

在Todo List Application的原型设计中，每个用户都有自己的 Todo List。并且每个用户只能看到属于自己的Todo List，并且也只能修改属于自己的Todo List。通过分析我们可知道在数据库中 `todos` 表中加一列 `user_id`，并且在 `todos` 表CRUD时加入 `user_id` 属性的约束，便可实现上述功能。

打开终端，并且进入 `db/` 文件夹，输入如下命令。

```bash
alembic revision -m "add_user_id_in_todo_table"
```

我们可以看到在 `db/migrations/versions` 文件夹下新增了一个`12c84915bab9_add_user_id_in_todo_table.py`。(**也许在你的电脑里面文件名不是`12c84915bab9_`开头的，这个取决于你的电脑随机生成的数字和字母的组合， 本教程用`xxx_add_user_id_in_todo_table.py`指代你本地对应的文件**)

```bash
E:
db
├── __init__.py
├── alembic.ini
├── config.py
└── migrations
    ├── README
    ├── env.py
    ├── script.py.mako
    └── versions
        ├── 0f54f99f8360_create_todos_table.py
        ├── 12c84915bab9_add_user_id_in_todo_table.py
        └── a61389cd92a0_create_users_table.py
```

请用 VS Code 打开 `xxx_add_user_id_in_todo_table.py`，将代码文件中的`upgrade`、`downgrade` 函数替换成如下代码：

```python
def upgrade() -> None:
    op.add_column('todos', sa.Column('user_id', sa.Integer))
    op.create_foreign_key(
        "user_todo",
        "todos",
        "users",
        ["user_id"],
        ["id"],
    )

def downgrade() -> None:
    op.drop_constraint("user_todo", "todos", type_="foreignkey")
    op.drop_column("todos", "user_id")
```

请用 VS Code 打开 `models/todo.py`，将代码函数替换成如下代码：

```python
from datetime import datetime
from sqlalchemy import TIMESTAMP, Boolean, Column, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship
from db.config import Base

class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    is_done = Column(Boolean, default=False)
    content = Column(Text, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP(timezone=True), nullable=False,
                        onupdate=datetime.utcnow, default=datetime.utcnow)
    user = relationship("User", back_populates="todos")
```

请用 VS Code 打开 `models/user.py`，将代码函数修改成如下代码：

```python
from datetime import datetime
from sqlalchemy import TIMESTAMP, Column, Integer, String
from sqlalchemy.orm import relationship
from db.config import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    email = Column(String(200), unique=True, index=True, nullable=False)
    hashed_password = Column(String(200), nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP(timezone=True), nullable=False,
                        onupdate=datetime.utcnow, default=datetime.utcnow)
    todos = relationship("Todo", uselist=True, back_populates="user")
```

请用 VS Code 打开 `crud/todo.py`，将代码函数修改成如下代码：

```python
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from crud.base import CRUDBase
from models import Todo as ModelsTodo
from typing import Any

class CRUDTodo(CRUDBase):

    def get_by_id_with_user_id(self, db:Session, id: Any, user_id: Any):
        return db.query(self.model).filter(self.model.id == id).filter(self.model.user_id == user_id).first()

    def get_all_by_user_id(self, db: Session, user_id: Any):
         return db.query(self.model).filter(self.model.user_id == user_id).all()

    def create(self, db: Session, user_id: Any, todo_params):
        todo_data = jsonable_encoder(todo_params)
        todo = self.model(**todo_data)
        todo.user_id = user_id
        db.add(todo)
        db.commit()
        db.refresh(todo)
        return todo

    def update(self, db: Session, id: Any, user_id: Any, todo_params):

        todo = db.query(self.model).filter(self.model.id == id).filter(self.model.user_id == user_id).first()

        todo_params_dict = todo_params.dict(exclude_unset=True)
        for key, value in todo_params_dict.items():
            setattr(todo, key, value)

        db.commit()
        db.refresh(todo)
        return todo


crud_todo = CRUDTodo(ModelsTodo)
```

最后请用 VS Code 打开 `api/todos.py`，将代码函数修改成如下代码：

```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api import deps
from crud import crud_todo
from schemas import todo as schemas_todo

router = APIRouter()

@router.get("/todos", response_model=list[schemas_todo.TodoInDB])
def get_all_todos(
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_user)
):
    todos = crud_todo.get_all_by_user_id(db=db, user_id=current_user.id)
    return todos

@router.post("/todos", response_model=schemas_todo.TodoInDB)
def create_todo(
    todo_params: schemas_todo.TodoCreate,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_user)
):
    todo = crud_todo.create(db=db, user_id=current_user.id, todo_params=todo_params)
    return todo

@router.put("/todos/{todo_id}", response_model=schemas_todo.TodoInDB)
def update_todo(
    todo_id: int,
    todo_params: schemas_todo.TodoCreate,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_user)
):
    todo = crud_todo.get_by_id_with_user_id(db=db, id=todo_id, user_id=current_user.id)

    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")

    todo = crud_todo.update(db=db, id=todo_id, user_id=current_user.id, todo_params=todo_params)
    return todo

@router.delete("/todos/{todo_id}", response_model=schemas_todo.TodoInDB)
def delete_todo(
    todo_id: int,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_user)
):

    todo = crud_todo.get_by_id_with_user_id(db=db, id=todo_id, user_id=current_user.id)

    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    todo = crud_todo.remove(db=db, id=todo_id)

    return todo
```

接下来是测试阶段，请用浏览器打开 http://localhost:8000/docs(打开 URL 前请确保我们的FastAPI 应用是运行起来的)测试Todos的增删改查API。

![](./img/api_with_auth_06.png)

:::tip

可以切换 `backend_api_with_auth_finished` 分支，查看最终正确实现的代码。

:::

:::caution 恭喜🎉🎉🎉

恭喜你已经顺利完成 Todo List Application 的后端 API 教程。

:::