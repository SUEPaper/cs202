---
id: orm
sidebar_position: 9
---

# SQLAlchemy 对象关系映射

:::tip

本课程网站内容请仔细阅读后再进行实操。因未仔细阅读内容，出现任何错误后果自负（逃～～～逃～～～逃

请切换到 `backend_orm_start` 分支，开始此教程代码的编写。

**所有的代码请不要复制粘贴，请手敲每一行代码。复制粘贴不会让你动脑子，而手敲每一个行代码会让你自然而然地去动脑子会想每一行代码的含义和原理**
:::


对象关系映射（Object-Relational Mapping，ORM）是一种编程技术，用于将关系型数据库中的表格和记录映射到面向对象的编程语言中的对象和类。ORM允许开发人员使用面向对象的方式进行数据库操作，而无需直接编写和执行SQL语句。

ORM的主要目标是将数据库和应用程序的数据模型相连接，通过将数据库表格映射为类，行映射为对象的实例，列映射为类的属性，以及通过关联和关系映射表达数据库之间的关系，从而实现数据的持久化和操作。


## 实现todos表的ORM

在 `models` 文件夹里面新建一个 `todo.py` 文件， 用 VS Code 打开， 输入如下代码：

```python showLineNumbers
from datetime import datetime
from sqlalchemy import TIMESTAMP, Boolean, Column, Integer, Text, ForeignKey
from db.config import Base

class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    is_done = Column(Boolean, default=False)
    content = Column(Text, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP(timezone=True), nullable=False,
                        onupdate=datetime.utcnow, default=datetime.utcnow)
```

- `class Todo(Base):`: 定义一个名为 `Todo` 的类，该类是一个数据库表的映射模型。这个类继承自 `Base` 类。
- `__tablename__ = "todos"`: 定义表格的名称为 "todos"，这个属性将会被 SQLAlchemy 用来创建和管理与该模型对应的数据库表格。
- `id = Column(Integer, primary_key=True, index=True)`: 定义一个名为 `id` 的列，它是整数类型，并且被设置为主键。`primary_key=True` 表示这个列是表格的主键，`index=True` 表示为这个列创建索引，以提高查询效率。
- `is_done = Column(Boolean, default=False)`: 定义一个名为 `is_done` 的列，它是布尔类型，并且默认值为 `False`。这个列表示一个任务是否已完成。
- `content = Column(Text, nullable=False)`: 定义一个名为 `content` 的列，它是文本类型，并且不能为空。这个列存储任务的内容。
- `created_at = Column(TIMESTAMP(timezone=True), nullable=False, default=datetime.utcnow)`: 定义一个名为 `created_at` 的列，它是带有时区的时间戳类型，并且不能为空。`default=datetime.utcnow` 表示如果没有提供值，则默认为当前的 UTC 时间。
- `updated_at = Column(TIMESTAMP(timezone=True), nullable=False, onupdate=datetime.utcnow, default=datetime.utcnow)`: 定义一个名为 `updated_at` 的列，它是带有时区的时间戳类型，并且不能为空。`onupdate=datetime.utcnow` 表示在更新记录时自动更新为当前的 UTC 时间。`default=datetime.utcnow` 表示如果没有提供值，则默认为当前的 UTC 时间。

VS Code 打开  `models/__init__.py`， 输入如下代码：

```python showLineNumbers
from models.todo import Todo
```

# 实现todos表的CRUD操作

在 `crud` 文件夹里面新建一个 `base.py` 文件， 用 VS Code 打开， 输入如下代码：

```python showLineNumbers
from typing import Any
from sqlalchemy.orm import Session

class CRUDBase:
    def __init__(self, model):
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


- `def __init__(self, model):`: 定义 `CRUDBase` 类的构造函数，接收一个 `model` 参数，表示数据库模型。
- `self.model = model`: 在构造函数中，将传入的 `model` 参数赋值给类的 `model` 属性，以便在类的其他方法中使用。
- `def get_by_id(self, db: Session, id: Any):`: 定义一个方法 `get_by_id`，用于根据给定的 `id` 从数据库中获取记录。
- `def get_all(self, db: Session):`: 定义一个方法 `get_all`，用于从数据库中获取所有记录。
- `def remove(self, db: Session, id: Any):`: 定义一个方法 `remove`，用于从数据库中删除指定的记录。


在 `crud` 文件夹里面新建一个 `todo.py` 文件， 用 VS Code 打开， 输入如下代码：

```python showLineNumbers
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from crud.base import CRUDBase
from models import Todo as ModelsTodo
from typing import Any

class CRUDTodo(CRUDBase):

    def create(self, db: Session, todo_params):
        todo_data = jsonable_encoder(todo_params)
        todo = self.model(**todo_data)
        db.add(todo)
        db.commit()
        db.refresh(todo)
        return todo

    def update(self, db: Session, id: Any, todo_params):

        todo = db.query(self.model).filter(self.model.id == id).first()

        todo_params_dict = todo_params.dict(exclude_unset=True)
        for key, value in todo_params_dict.items():
            setattr(todo, key, value)

        db.commit()
        db.refresh(todo)
        return todo

crud_todo = CRUDTodo(ModelsTodo)

```

- `def create(self, db: Session, todo_params):`: 定义一个方法 `create`，用于向数据库中创建新的记录。
- `def update(self, db: Session, id: Any, todo_params):`: 定义一个方法 `update`，用于更新数据库中的记录。
- `crud_todo = CRUDTodo(ModelsTodo)`: 创建一个 `CRUDTodo` 类的实例，传入一个名为 `ModelsTodo` 的数据库模型作为参数。


VS Code 打开  `crud/__init__.py`， 输入如下代码：

```python showLineNumbers
from crud.todo import crud_todo
```

VS Code 打开  `schemas/todo.py`， 改成如下代码：

```python showLineNumbers
from datetime import datetime
from pydantic import BaseModel

class TodoCreate(BaseModel):
    content: str
    is_done: bool

class Todo(TodoCreate):
    id: int

class TodoInDB(Todo):
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
```

:::tip

可以切换 `backend_orm_finished` 分支，查看最终正确实现的代码。

:::