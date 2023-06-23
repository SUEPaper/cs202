---
id: orm
sidebar_position: 6
---

# SQLAlchemy的快速介绍

SQLAlchemy是使用最广泛、质量最高的Python第三方库之一。它为应用程序开发者提供了在他们的Python代码中与关系数据库工作的简单方法。

SQLAlchemy认为数据库是一个关系代数引擎，而不仅仅是一个表的集合。行不仅可以从表中选择，还可以从连接和其他选择语句中选择；任何这些单元都可以组成一个更大的结构。SQLAlchemy的表达式语言从核心上建立了这个概念。

SQLAlchemy由两个不同的组件组成：

- 核心--一个功能齐全的SQL抽象工具箱

- ORM（Object Relational Mapper 对象关系映射器）--它是可选的

在本教程中，我们将使用这两个组件，尽管你可以调整方法不使用ORM。

# 实用部分1--用SQLAlchemy设置数据库表

在本教程中，到目前为止，我们还不能在服务器重启后继续保存数据，因为我们所有的POST操作只是更新了内存中的数据结构。我们将通过引入一个关系型数据库来改变这种情况。

:::tip 提示
开始之前，要在 FastAPI 项目中使用 SQLAlchemy,首先需要安装它:

```bash
pip install SQLAlchemy
```

:::
**FastAPI SQL炼金图**

我们正在努力实现的目标的整体图如下所示：

![](./img/O1.png)

首先，我们将查看ORM和数据访问层：

![](./img/O2.png)

现在，让我们将注意力转向新目录。在`./backend/db/`路径下创建`config.py`和`__init__.py`文件。

:::note 代码

```python
config.py
# 从SQLAlchemy库中导入create_engine函数。此函数用于创建一个连接到指定数据库URL的数据库引擎。
from sqlalchemy import create_engine 
from sqlalchemy.ext.declarative import declarative_base # 从SQLAlchemy库中导入declarative_base函数。此函数用于创建一个基类，用于声明类定义。
from sqlalchemy.orm import sessionmaker # 从SQLAlchemy库中导入sessionmaker函数。此函数用于创建一个会话工厂，可用于创建新会话以与数据库交互。

# SQLALCHEMY_DATABASE_URL变量包含应用程序将连接到的MySQL数据库的URL。此URL包括用户名、密码、主机、端口和数据库名称。
SQLALCHEMY_DATABASE_URL = "mysql://root:password@localhost:3306/todoapp"

# engine变量是通过使用SQLALCHEMY_DATABASE_URL变量作为参数调用create_engine函数创建的。这将创建一个数据库引擎，可用于连接到MySQL数据库。
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# SessionLocal变量是通过使用autocommit、autoflush和bind参数分别设置为False、False和engine调用sessionmaker函数创建的。这将创建一个会话工厂，可用于创建新会话以与数据库交互。
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base变量是通过调用declarative_base函数创建的。这将创建一个基类，用于声明类定义的结构。
Base = declarative_base()

```

./alembic/envy.py包含了使用Alembic和SQLAlchemy运行数据库迁移所需的必要代码。这些文件中的代码设置了使用SQLAlchemy连接到数据库所需的必要配置，并提供了运行迁移所需的必要工具。`config`对象提供了对正在使用的`.ini`文件中的值的访问，target_metadata变量可以设置为数据库模型的元数据以支持“自动生成”。

`run_migrations_offline`函数在“离线”模式下运行迁移，该模式仅使用URL而不是引擎来配置上下文。当不需要引擎时，使用此函数，并且对context.execute()的调用将将给定字符串发出到脚本输出。

`run_migrations_online`函数在“在线”模式下运行迁移，该模式创建引擎并将连接与上下文关联。当需要引擎时，通过使用config.get_section和poolclass参数分别设置为config.config_ini_section, {}和pool.NullPool调用engine_from_config函数创建connectable变量。

总的来说，这些文件包含了使用Alembic和SQLAlchemy运行数据库迁移所需的必要代码。

:::

然后更改models文件夹中的文件：

:::note 代码

```python
todo.py

# 导入新的包类
from datetime import datetime
from sqlalchemy import TIMESTAMP, Boolean, Column, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship
from db.config import Base

# 增加数据模型的属性
class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    is_done = Column(Boolean, default=False)
    content = Column(Text, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, default=datetime.utcnow
    )
    updated_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        onupdate=datetime.utcnow,
        default=datetime.utcnow,
    )
    user = relationship("User", back_populates="todos")

```

```python
user.py

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
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, default=datetime.utcnow
    )
    updated_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        onupdate=datetime.utcnow,
        default=datetime.utcnow,
    )
    todos = relationship("Todo", uselist=True, back_populates="user")


```

user与todo改变类似。这些数据模型将允许您在应用程序中创建用户和待办事项，并将它们关联起来。这些模型还将允许您轻松地查询用户和待办事项，并查找它们之间的关系。

:::

对应要更改api，打开api文件夹。

:::note 代码

```python
todos.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api import deps
from crud import crud_todo
from schemas import todo as schemas_todo


router = APIRouter()


@router.get("/", response_model=list[schemas_todo.TodoInDB])
def get_all_todos(
    db: Session = Depends(deps.get_db), current_user=Depends(deps.get_current_user)
):
    todos = crud_todo.get_all_by_user_id(db=db, user_id=current_user.id)
    return todos


@router.post("/", response_model=schemas_todo.TodoInDB)
def create_todo(
    todo_params: schemas_todo.TodoCreate,
    db: Session = Depends(deps.get_db),
    current_user=Depends(deps.get_current_user),
):
    todo = crud_todo.create(db=db, user_id=current_user.id, todo_params=todo_params)
    return todo


@router.put("/{todo_id}", response_model=schemas_todo.TodoInDB)
def update_todo(
    todo_id: int,
    todo_params: schemas_todo.TodoCreate,
    db: Session = Depends(deps.get_db),
    current_user=Depends(deps.get_current_user),
):
    todo = crud_todo.get_by_id_with_user_id(db=db, id=todo_id, user_id=current_user.id)

    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")

    todo = crud_todo.update(
        db=db, id=todo_id, user_id=current_user.id, todo_params=todo_params
    )
    return todo


@router.delete("/{todo_id}", response_model=schemas_todo.TodoInDB)
def delete_todo(
    todo_id: int,
    db: Session = Depends(deps.get_db),
    current_user=Depends(deps.get_current_user),
):
    todo = crud_todo.get_by_id_with_user_id(db=db, id=todo_id, user_id=current_user.id)

    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    todo = crud_todo.remove(db=db, id=todo_id)

    return todo

```

```python
users.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api import deps
from crud import crud_todo
from schemas import todo as schemas_todo


router = APIRouter()


@router.get("/", response_model=list[schemas_todo.TodoInDB])
def get_all_todos(
    db: Session = Depends(deps.get_db), current_user=Depends(deps.get_current_user)
):
    todos = crud_todo.get_all_by_user_id(db=db, user_id=current_user.id)
    return todos


@router.post("/", response_model=schemas_todo.TodoInDB)
def create_todo(
    todo_params: schemas_todo.TodoCreate,
    db: Session = Depends(deps.get_db),
    current_user=Depends(deps.get_current_user),
):
    todo = crud_todo.create(db=db, user_id=current_user.id, todo_params=todo_params)
    return todo


@router.put("/{todo_id}", response_model=schemas_todo.TodoInDB)
def update_todo(
    todo_id: int,
    todo_params: schemas_todo.TodoCreate,
    db: Session = Depends(deps.get_db),
    current_user=Depends(deps.get_current_user),
):
    todo = crud_todo.get_by_id_with_user_id(db=db, id=todo_id, user_id=current_user.id)

    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")

    todo = crud_todo.update(
        db=db, id=todo_id, user_id=current_user.id, todo_params=todo_params
    )
    return todo


@router.delete("/{todo_id}", response_model=schemas_todo.TodoInDB)
def delete_todo(
    todo_id: int,
    db: Session = Depends(deps.get_db),
    current_user=Depends(deps.get_current_user),
):
    todo = crud_todo.get_by_id_with_user_id(db=db, id=todo_id, user_id=current_user.id)

    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    todo = crud_todo.remove(db=db, id=todo_id)

    return todo

```

代码定义了待办事项API的路由，并使用crud_todo模块与数据库交互。

get_all_todos函数检索当前用户的所有待办事项，而create_todo函数为当前用户创建新的待办事项。update_todo函数更新当前用户的现有待办事项，而delete_todo函数删除当前用户的现有待办事项。

所有这些函数都使用deps模块获取当前用户和数据库会话。schemas_todo模块定义了待办事项API的输入和输出模式。
:::

然后在`./backend/crud/`文件夹中创建base.py,todo.py,user.py实现我们的crud操作：

:::note

```python
base.py

from typing import Any, Optional
from sqlalchemy.orm import Session


class CRUDBase:
    def __init__(self, model) -> None:
        self.model = model

    def get_by_id(self, db: Session, id: Any):
        return db.query(self.model).filter(self.model.id == id).first()

    def get_all(self, db: Session):
        return db.query(self.model).all()

    def remove(self, db: Session, id: Any):
        obj = db.query(self.model).get(id)
        db.delete(obj)
        db.commit()
        return obj

```

```python
todo.py

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from crud.base import CRUDBase
from models import Todo as ModelsTodo
from typing import Any, Optional


class CRUDTodo(CRUDBase):
    def get_by_id_with_user_id(self, db: Session, id: Any, user_id: Any):
        return (
            db.query(self.model)
            .filter(self.model.id == id)
            .filter(self.model.user_id == user_id)
            .first()
        )

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
        todo = (
            db.query(self.model)
            .filter(self.model.id == id)
            .filter(self.model.user_id == user_id)
            .first()
        )

        todo_params_dict = todo_params.dict(exclude_unset=True)
        for key, value in todo_params_dict.items():
            setattr(todo, key, value)

        db.commit()
        db.refresh(todo)
        return todo


crud_todo = CRUDTodo(ModelsTodo)

```

```python
user.py

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
            hashed_password=get_password_hash(user_params.password),
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

:::

:::info
SQLAlchemy是一个流行的Python ORM（对象关系映射）库，它提供了一种方便的方式来操作关系型数据库。

SQLAlchemy具有以下特点和功能：

- 对多种数据库后端的支持：SQLAlchemy支持多种主流的关系型数据库后端，包括MySQL、PostgreSQL、SQLite、Oracle等，可以在不同的数据库系统之间无缝切换。

- 完整的ORM功能：SQLAlchemy提供了完整的ORM功能，包括对象映射、关联关系、事务管理、数据一致性等。开发者可以使用Python类来表示数据库表，通过对这些类的操作来实现对数据库的增删改查操作。

- 灵活的查询语法：SQLAlchemy提供了强大而灵活的查询语法，可以通过方法链式调用来构建复杂的查询条件和排序规则。开发者可以使用SQLAlchemy的查询API来执行各种查询操作，并获得查询结果。

- 事务支持：SQLAlchemy支持事务的管理，开发者可以通过事务机制来确保数据的一致性和完整性。可以使用commit和rollback方法来提交或回滚事务。

- 数据库连接池：SQLAlchemy提供了连接池的支持，可以在应用程序和数据库之间建立连接池，以提高数据库操作的性能和效率。

支持原生SQL语句：除了提供ORM功能外，SQLAlchemy还支持执行原生SQL语句，以满足一些特定的数据库操作需求。

:::

更多有关SQLAlembic的基础知识请看后端fastapi教程中的ORM部分
