---
id: backend-db
sidebar_position: 8
---

# Web后端：与 MySQL 数据库连接

:::tip

本课程网站内容请仔细阅读后再进行实操。因未仔细阅读内容，出现任何错误后果自负（逃～～～逃～～～逃

请切换到 `backend_db_connect_start` 分支，开始此教程代码的编写。

**所有的代码请不要复制粘贴，请手敲每一行代码。复制粘贴不会让你动脑子，而手敲每一个行代码会让你自然而然地去动脑子会想每一行代码的含义和原理**
:::

SQLAlchemy是一个开源的Python SQL工具和对象关系映射（ORM）库。它提供了一组功能强大的工具和API，用于简化与关系型数据库的交互和操作。

SQLAlchemy的主要目标是为开发人员提供灵活、高效和可扩展的数据库访问解决方案。它支持多种关系型数据库，包括常见的MySQL、PostgreSQL、SQLite以及Oracle、Microsoft SQL Server等。

SQLAlchemy提供了两个核心组件：

- ORM（对象关系映射）：SQLAlchemy的ORM层允许开发人员使用Python对象进行数据库操作，而无需直接编写SQL语句。它将数据库表格映射为Python类，表格的行映射为类的实例，列映射为类的属性。开发人员可以通过操作这些对象来执行数据库查询、插入、更新和删除等操作，同时还可以利用ORM的关系映射功能处理表格之间的关系。
- SQL表达式语言：SQLAlchemy提供了一套强大而灵活的SQL表达式语言，允许开发人员以面向对象的方式构建和执行SQL查询。使用SQL表达式语言，开发人员可以通过Python代码生成复杂的SQL查询，并利用丰富的API对查询进行操作和定制。


## 新建 `config.py` 代码

在 `db/` 文件夹下新建一个 `config.py` 文件，用 VS Code 打开，输入如下代码：

```python showLineNumbers
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "mysql://root:password@localhost:3306/todoapp"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
```

- `SQLALCHEMY_DATABASE_URL = "mysql://root:password@localhost:3306/todoapp"`: 定义数据库的连接 URL，这里使用 MySQL 数据库作为示例，使用用户名 `root`、密码 `password`，连接本地主机（`localhost`）上的端口 `3306`，数据库名为 `todoapp`。
- `engine = create_engine(SQLALCHEMY_DATABASE_URL)`: 使用 `create_engine` 函数创建一个数据库引擎对象，它将连接到指定的数据库。
- `SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)`: 使用 `sessionmaker` 函数创建一个会话类，用于执行数据库操作。`autocommit=False` 表示会话不自动提交事务，`autoflush=False` 表示会话不自动刷新数据库状态，`bind=engine` 表示将会话绑定到之前创建的数据库引擎对象。
- `Base = declarative_base()`: 使用 `declarative_base` 函数创建一个基础的类 `Base`，它将作为所有数据库模型类的基类。通过继承 `Base` 类，可以定义数据库模型类，并通过 ORM（对象关系映射）将其映射到数据库表格。

## 新建 `deps.py` 代码

在 `api/` 文件夹下新建一个 `deps.py` 文件，用 VS Code 打开，输入如下代码：

```python showLineNumbers
from typing import Generator
from db.config import SessionLocal

def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

- `def get_db() -> Generator:`: 定义一个函数 `get_db()`，该函数不接收任何参数，并且返回一个生成器对象。
- `db = SessionLocal()`: 在函数内部，调用 `SessionLocal()` 函数创建一个数据库会话对象，并将其赋值给变量 `db`。
- `try:`: 开始一个异常处理块。
- `yield db`: 使用 `yield` 关键字返回会话对象 `db`，使函数成为一个生成器函数。通过返回生成器对象，可以在函数执行期间多次暂停和继续执行，从而实现将会话对象提供给其他函数或方法使用。
- `finally:`: 在异常处理块结束后，执行最终的清理操作。
- `db.close()`: 在 `finally` 块中，调用会话对象的 `close()` 方法关闭数据库会话。这个操作确保在生成器函数结束后，会话对象被正确关闭，以释放与数据库的连接和资源。

通过定义这样的生成器函数，可以确保在每次需要数据库会话对象时都能获得一个新的会话对象，并在使用完毕后将其正确关闭。

:::tip

可以切换 `backend_db_connect_finished` 分支，查看最终正确实现的代码。

:::