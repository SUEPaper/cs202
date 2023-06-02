---
id: orm
sidebar_position: 6
---

# 使用 ORM 进行数据库操作

## ORM（对象关系映射）简介

:::tip
ORM(对象关系映射)是一种技术,允许我们使用面向对象的方式操作数据库,而不需要编写原始的 SQL 语句。

ORM 会根据我们定义的模型类自动构建表结构、生成查询、映射对象到数据库行等等。这使我们可以更高效地对数据库进行 CRUD 操作,而不必花时间编写各种 SQL 语句。
:::
FastAPI 与 SQLAlchemy ORM 无缝集成,所以我们通常会使用 SQLAlchemy 作为 ORM 框架。

一个简单示例:

定义模型:

```python
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String)
    password = Column(String) 
```

这会创建一个 `users` 表,包含 `id`、`username` 和 `password` 列。

创建数据库会话:

```python
engine = create_engine("sqlite:///database.db") 
Base.metadata.create_all(bind=engine)   
session = Session(bind=engine) 
```

这会连接到 `database.db` 数据库,并创建所有模型的表结构。

然后我们可以执行常见的 CRUD 操作:

```python
# 创建
user = User(username="john", password="1234")
session.add(user)
session.commit()

# 读取
users = session.query(User).all()

# 更新
user = session.query(User).filter(User.username == "john").first() 
user.password = "5678"
session.commit()  

# 删除
session.delete(user)
session.commit()  
```

所以,通过 SQLAlchemy ORM,我们可以使用 Python 面向对象的方式操作数据库,而不必编写复杂的 SQL 语句。主要步骤是:

:::note

- 定义模型类继承自 `Base`
- 创建数据库连接 `engine` 和会话 `session`
- 执行常见的增、删、改、查操作
- 提交更改 `session.commit()`
:::

这使我们可以更高效地实现数据库驱动的 Python 应用,因为 ORM 会自动处理许多复杂而重复的工作。
希望这个简短示例能帮助你理解 ORM 的基本思想和 SQLAlchemy 的基本用法。我们将在后续示例中进一步学习如何在 FastAPI 中集成 SQLAlchemy,访问数据库等高级用法。

## 常用 Python ORM 库

Python 有许多优秀的 ORM 库,这里我们介绍几个最常用的:
:::note

- **SQLAlchemy** - 非常流行和高效的 ORM 库,FastAPI 的默认选择。支持多种数据库后端。
- **Django ORM** - Django 框架自带的 ORM 功能,简单易用,主要用于 Django 应用开发。
- **Peewee** - 一个小巧简单的 ORM,支持 SQLite、MySQL 和 PostgresSQL 等数据库。
- **Pony ORM** - 一个使用 OO 的ORM,主要特点是支持原生 SQL 查询、事务和数据库迁移。
- **Tortoise ORM** - 一个基于异步 IO 的 ORM,主要用于 FastAPI 和 Django 应用,支持多种数据库。
- **ORMur** - 一个小型 ORM 框架,主要特点是简单易学,支持多种数据库。
这些都是 Python Web 开发中常用的 ORM 选项,各有优势与侧重点:
- **SQLAlchemy** - 功能最丰富和正规,可用于大型项目,FastAPI 默认选择。
- **Django ORM** - 主要用于 Django 开发,易于上手,功能也比较完备。
- **Peewee**和**ORMur** - 简单易学,适合简单项目。
- **Pony ORM** - 性能很好,可用于高负载系统。
- **Tortoise ORM** - 专注于异步Web开发,与FastAPI和Django无缝集成。
:::

所以,根据你的项目需求,你可以选择:
:::info

- SQLAlchemy - 全能型ORM,可满足大多数需求。
- Django ORM - 专注于 Django 开发。
- 其他轻量级ORM - 用于小型项目,易于入门。
- Pony ORM - 需要高性能的场景。
- Tortoise ORM - 异步 Web 应用。
:::

选择一个合适的 ORM 库可以大大提高 Python Web 开发的效率和体验,所以 ORM 技术是每位 Python Web 开发者都需要掌握的。

希望这个简短概览能帮助你选择适合项目需求的 Python ORM。我们将在后续示例中主要使用 SQLAlchemy 与 FastAPI 进行集成,演示各种数据库操作。

## SQLAlchemy 使用

:::tip
SQLAlchemy是一个流行的Python ORM（对象关系映射）库，它提供了一种方便的方式来操作关系型数据库。

SQLAlchemy具有以下特点和功能：

1. 对多种数据库后端的支持：SQLAlchemy支持多种主流的关系型数据库后端，包括MySQL、PostgreSQL、SQLite、Oracle等，可以在不同的数据库系统之间无缝切换。

2. 完整的ORM功能：SQLAlchemy提供了完整的ORM功能，包括对象映射、关联关系、事务管理、数据一致性等。开发者可以使用Python类来表示数据库表，通过对这些类的操作来实现对数据库的增删改查操作。

3. 灵活的查询语法：SQLAlchemy提供了强大而灵活的查询语法，可以通过方法链式调用来构建复杂的查询条件和排序规则。开发者可以使用SQLAlchemy的查询API来执行各种查询操作，并获得查询结果。

4. 事务支持：SQLAlchemy支持事务的管理，开发者可以通过事务机制来确保数据的一致性和完整性。可以使用commit和rollback方法来提交或回滚事务。

5. 数据库连接池：SQLAlchemy提供了连接池的支持，可以在应用程序和数据库之间建立连接池，以提高数据库操作的性能和效率。

6. 支持原生SQL语句：除了提供ORM功能外，SQLAlchemy还支持执行原生SQL语句，以满足一些特定的数据库操作需求。
:::
在 FastAPI 中使用 SQLAlchemy 进行数据库操作非常简单。这里我们来看一个简单示例:

定义模型:

```python
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String)
    password = Column(String) 
```

创建数据库连接和会话:

```python
engine = create_engine("sqlite:///database.db")
Base.metadata.create_all(bind=engine) 
session = Session(bind=engine)
```

在路径操作函数中使用会话访问数据库:

```python
from fastapi import Depends, FastAPI

app = FastAPI()

def get_session():
    session = Session(bind=engine)
    try: 
        yield session
    finally:
        session.close()
        
@app.post("/users/")  
def create_user(user: UserCreate, session: Session = Depends(get_session)):
    session.add(user)
    session.commit()
    return {"msg": "User created"}  
```

我们编写了一个依赖项 `get_session` 来获取数据库会话,并将其作为参数注入到路径操作函数中。
在函数中,我们可以直接使用该会话执行各种数据库操作,这里我们演示了创建一条用户记录。
所以,要在 FastAPI 中使用 SQLAlchemy,主要步骤是:
:::note

- 定义模型类继承自 `Base`
- 创建数据库连接 `engine`
- 定义一个依赖项来获取数据库会话 `session`
- 将该依赖项 `Depends` 注入到需要访问数据库的路径操作函数
- 在路径操作函数中使用该会话执行数据库查询等操作
- 提交更改`session.commit()`
:::

:::info
这使我们可以在 FastAPI 中便捷地进行各种数据库操作,利用 SQLAlchemy ORM 的强大功能管理模型、查询、事务等。
而依赖项系统确保我们可以在任意路径操作函数中获取并使用数据库会话,真正实现了解耦。
:::
希望这个简短示例能帮助你理解如何在 FastAPI 中集成 SQLAlchemy 进行数据库访问。我们将在后续示例中继续深入学习和实践各种高级用法。

### 安装与配置

要在 FastAPI 项目中使用 SQLAlchemy,首先需要安装它:

```bash
pip install SQLAlchemy
```

然后,我们需要进行一些配置。这里是一个基本配置示意:

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 数据库URL
SQLALCHEMY_DATABASE_URL = "sqlite:///./database.db"  

# 创建引擎
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False}  
)

# 创建会话本地类
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 映射基类
Base = declarative_base()
```

这么做的目的是:
:::note

- 定义数据库 URL,这里使用 SQLite数据库。
- 根据 URL 创建 SQLAlchemy 引擎 `engine`。
- 创建会话类 `SessionLocal`,绑定该引擎。
- 定义映射基类 `Base`,后续模型都要继承这个基类。
:::

然后,在各个模型中,我们需要指定:
:::note

- `__tablename__` - 数据库表名
- 列及类型 - 使用 `Column` 类定义
- 继承 `Base` - 以关联映射元数据
:::

例如:

```python
from .database import Base  

class User(Base):
__tablename__ = "users"

id = Column(Integer, primary_key=True)
username = Column(String)
password = Column(String) 
```

此外,如果使用其他类型的数据库,还需要安装相应的数据库驱动,如:

:::note

- PostgreSQL -  `pip install psycopg2`
- MySQL - `pip install mysqlclient`
- SQL Server - `pip install pymssql`
:::
:::info
配置 SQLALCHEMY_DATABASE_URL 时,也需要对应指明数据库类型、主机、端口、用户名等信息。

在 FastAPI 应用中,我们通常会编写一个依赖项来获取 SQLAlchemy 会话,并将其注入到各个需要访问数据库的路径操作函数中使用,以达到解耦的目的。

所以,通过一些简单配置,我们可以将 SQLAlchemy 与 FastAPI 应用无缝集成,利用强大的 SQLAlchemy ORM 工具进行数据库开发。这使我们可以专注于业务逻辑,而不必过多关注 SQL 语句本身,大大提高开发效率。
:::
希望这个简短概览能帮助你理解如何在 FastAPI 项目中配置和使用 SQLAlchemy。

### 定义数据模型

在 SQLAlchemy 中,我们使用模型类来定义数据库表结构和数据类型。这里是一个简单示例:

```python
from sqlalchemy import Column, Integer, String
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True)
    email = Column(String(120), unique=True)
    password = Column(String(30))
```

这个模型定义了一个 `users` 表,包含以下列:
:::note

- id - 整数主键
- username - 50 字符的唯一用户名
- email - 120 字符的唯一邮箱
- password - 30 字符的用户密码
:::
:::tip
要定义 SQLAlchemy 模型,我们需要:

1. 继承自 `Base` 类,这个类我们在前面配置中定义过。
2. 指定 `__tablename__` - 对应的数据库表名
3. 使用 `Column` 类定义列,指定:
   - 类型 - `Integer`、`String`、`Boolean` 等
   - 主键 - `primary_key=True`
   - 唯一 - `unique=True`
   - 长度 - 比如 `String(50)`
   - 其他约束等
4. 指定表级约束 - `__table_args__` - 比如联合主键等。
:::
然后,我们可以在 FastAPI 应用中使用这个模型类对应到数据库表,执行各种操作:

```python
@app.post("/users/")  
def create_user(user: UserCreate, session: Session = Depends(get_session)):
user = User(**user.dict())
session.add(user)
session.commit()
return {"msg": "User created"}  
```

:::info

这里我们接收一个 `UserCreate` Pydantic 模型,使用其字典方式初始化一个 `User` 模型对象,然后添加到会话并提交,实现创建一条用户记录。

所以,通过定义这些数据库模型类,我们可以将代码逻辑和数据库表结构关联起来,使用面向对象的方式表示和操作数据库数据,这就是 ORM 技术的威力所在。
:::
希望这个简短示例能帮助你理解如何使用 SQLAlchemy 定义数据库模型。我们将在后续示例中继续深入学习各种高级 mapping 方式及模型关系定义等。

### 创建和管理数据库会话

在 SQLAlchemy 中,会话是用于执行数据库操作(查询、插入、更新、删除)的最主要对象。

创建会话的基本步骤是:

1. 在配置中创建会话类,绑定到数据库引擎:

```python
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
```

2. 在需要访问数据库的路径操作函数中实例化该会话类获取会话对象:

```python
session = SessionLocal()
```

3. 使用会话对象执行各种数据库操作:

```python
user = User(username="john", password="1234")
session.add(user)   # 添加对象
session.commit()     # 提交更改

user = session.query(User).first()  # 查询第一个对象  
```

4. 接下来我们需要正确关闭会话,避免资源泄露:

```python
session.close()  # 关闭会话
```

但是,直接在路径操作函数中创建会话并不合适,因为 FastAPI 处理 HTTP 请求是异步的。

所以,推荐的方式是使用依赖项来获取数据库会话:

```python
def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
        
@app.get("/users/")  
def get_users(session: Session = Depends(get_session)):
    users = session.query(User).all()
    ... 
```

:::info

这里我们定义一个依赖项 `get_session`,该依赖项会创建一个新的会话,使用 `try/finally` 确保其得到关闭。
然后,我们将这个依赖项注入到路径操作函数,在函数中就可以使用该会话进行各种数据库操作了。

这样,会话的获取和关闭被封装在了依赖项中,确保每次数据库访问都获取一个新的会话,并在完成操作后关闭,避免并发问题。
所以,总结一下在 FastAPI 中管理数据库会话的最佳方式:

- 在配置中创建会话本地类,绑定引擎
- 定义一个依赖项来获取会话,并在完成操作后关闭
- 将这个依赖项注入到各个需要访问数据库的路径操作函数
- 在路径操作函数内部使用这个会话进行各种数据库访问

这是一个非常干净的方式来管理数据库会话,可以在 FastAPI 中很好地使用 SQLAlchemy 进行各种数据库操作。
:::
希望这个示例能帮助你理解在 FastAPI 项目中如何正确创建和管理 SQLAlchemy 数据库会话。我们将在后续继续深入学习各种高级用法。

### CRUD 操作

:::tip
CRUD是一个常见的术语，用于描述对数据库或持久化存储的基本操作。它代表了四个基本操作：创建(Create)、读取(Retrieve)、更新(Update)和删除(Delete)。

以下是每个操作的简要说明：

- 创建(Create)：创建操作用于向数据库中添加新的数据记录。它涉及将新的数据插入到数据库表中，通常通过执行插入语句来实现。创建操作可以使用SQL的INSERT语句或ORM库提供的创建对象的方法来完成。

- 读取(Retrieve)：读取操作用于从数据库中检索数据记录。它涉及从数据库表中查询数据，以获取所需的数据集合。读取操作可以使用SQL的SELECT语句或ORM库提供的查询方法来实现。

- 更新(Update)：更新操作用于修改数据库中的现有数据记录。它涉及对数据库表中的数据进行更改，以更新其值。更新操作可以使用SQL的UPDATE语句或ORM库提供的更新对象的方法来完成。

- 删除(Delete)：删除操作用于从数据库中删除数据记录。它涉及从数据库表中删除指定的数据记录。删除操作可以使用SQL的DELETE语句或ORM库提供的删除对象的方法来实现。

这些CRUD操作是对数据库进行常见的数据操作，它们提供了对数据的基本管理能力。在应用程序中，开发者可以使用这些操作来执行各种数据操作，包括添加新数据、查询数据、修改数据和删除数据。无论是使用原生的SQL语句还是ORM库，CRUD操作都是开发者在处理数据库数据时经常使用的基本操作。
:::

在 SQLAlchemy 中,我们可以轻松执行数据库的基本 CRUD(创建、读取、更新、删除)操作。

**创建**
要创建一个对象,只需:
:::note

1. 实例化模型类
2. 将对象添加到会话
3. 提交会话
:::

```python
user = User(username="john", password="1234")
session.add(user)  
session.commit() 
```

这会向 `users` 表插入一条新记录。

**读取**
要读取对象,我们可以查询会话:

```python
user = session.query(User).first()     # 获取第一条记录
users = session.query(User).all()      # 获取全部记录
```

也可以使用过滤器进行条件查询:

```python
user = session.query(User).filter(User.username == "john").first()
```

**更新**
要更新一个对象,只需:

:::note

1. 查询该对象
2. 更新属性
3. 提交会话
:::

```python
user = session.query(User).filter(User.username == "john").first()
user.password = "5678"
session.commit() 
```

这会更新 `users` 表中 `username` 为 `john` 的记录。

**删除**
要删除一个对象,只需:
:::note

1. 查询该对象
2. 从会话中移除
3. 提交会话

:::

```python
user = session.query(User).filter(User.username == "john").first()
session.delete(user)     
session.commit()
```

这会从 `users` 表中删除 `username` 为 `john` 的记录。
:::info

所以,通过这些基本步骤,我们可以在 FastAPI 应用中实现对数据库表的完整 CRUD 操作,利用 SQLAlchemy ORM 工具和会话管理来简化代码逻辑,不再需要编写原始 SQL 语句。
:::

希望这个简短概览能帮助你理解如何使用 SQLAlchemy 执行基本的数据库 CRUD 操作。我们将在后续示例中继续深入学习关联对象的 CRUD 等高级用法。

### 一对多

:::tip
一对多（One-to-Many）是数据库关系模型中的一种常见关系类型，它描述了两个实体之间的关系，其中一个实体（称为"一"）可以与多个相关的实体（称为"多"）相关联，而相关的实体只能与一个"一"实体相关联。

在数据库设计中，一对多关系可以通过在相关的实体表中添加一个外键来实现。这个外键指向"一"实体的主键，以建立两个实体之间的关联。
:::
:::info
在关系数据库中,一对多的关系非常常见。比如:

- 用户和帖子 - 一个用户可以有多条帖子
- 部门和员工 - 一个部门有多名员工
:::

要在 SQLAlchemy 中定义一对多的关系,我们需要:

:::note

1. 在 "一" 这一端定义 `relationship()`
2. 在 "多" 这一端定义外键列指向 "一" 的主键
:::

例如,如果我们有 `User` 和 `Post` 两张表,关系是:一个用户可以有多篇文章。

首先定义 `User` 模型:

```python
class User(Base):
__tablename__ = "users"

id = Column(Integer, primary_key=True)
...
```

然后在 `Post` 模型中定义外键列和关系:

```python
class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))  # 外键
    
    user = relationship("User", backref="posts")   # 关系
```

这里:
:::note

- user_id 列定义为外键,引用 users.id
- 使用 relationship() 定义与 User 的一对多关系
- backref 自动在 User 模型中添加一个 posts 属性,表示这个用户的文章列表
:::

这样,我们就可以像访问对象属性一样访问相关记录:

```python
user = session.query(User).first()
posts = user.posts   # 获取该用户的所有文章

post = session.query(Post).first()
user = post.user    # 获取该文章的作者
```

你也可以手动添加关系的另一端:

```python
user = User(username="john")  
post = Post(content="Hello", user=user)  # 绑定关系
```

这会自动将 `post.user_id` 设置为 `user.id`,实现关系绑定。

所以,要在 SQLAlchemy 中定义一对多关系,主要步骤是:
:::note

1. 在 "一" 的模型中使用 `relationship()` 定义关系
2. 在 "多" 的模型中定义外键列,指向 "一" 的主键
3. 可以使用 `backref` 自动添加反向关系
4. 可以在创建对象时手动绑定关系,自动维护外键
:::

:::info

通过这种关联关系的定义,我们可以像访问普通属性一样,方便地在两个模型之间进行数据获取和绑定。这大大简化了我们编写数据库关系逻辑的难度,使代码更加优雅和可读。
:::

希望这个示例能帮助你理解 SQLAlchemy 如何定义一对多关系。我们将在后续继续学习多对多关系以及关系的高级用法。

### 多对多

:::tip
多对多（Many-to-Many）是数据库关系模型中的一种常见关系类型，它描述了两个实体之间的复杂关系，其中一个实体可以与多个相关的实体相关联，并且相关的实体也可以与多个该实体相关联。

在数据库设计中，多对多关系通常需要通过引入一个中间表（也称为关联表、连接表或交叉表）来实现。中间表包含两个外键，分别指向两个相关实体的主键，用于建立两个实体之间的关联。
:::
:::info
在关系数据库中,多对多关系也很常见。比如:

- 用户和角色 - 一个用户可以有多个角色,一个角色可以赋予多个用户
- 学生和课程 - 一个学生可以选择多门课程,一门课程可以有多个选修学生

:::

要在 SQLAlchemy 中定义多对多关系,我们需要:
:::note

1. 创建一个中间表,包含两个外键列,每个指向一方的主键
2. 在两方模型中定义关系,指定`secondary`参数指向中间表
:::

例如,如果我们有 `User`、`Role` 和 `user_roles` 三张表,关系如下:
:::note
users 表:

| id  | username |
| --- | -------- |
| 1   | john     |
| 2   | jane     |

roles 表:

| id  | name  |
| --- | ----- |
| 1   | admin |
| 2   | user  |

user_roles 表:

| user_id | role_id |
| ------- | ------- |
| 1       | 1       |
| 1       | 2       |
| 2       | 2       |
:::
那么我们可以这样定义:  

User 模型:

```python
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    ...
    
role = relationship("Role", secondary="user_roles")
```

这里我们在两个模型中分别定义了指向 `user_roles` 表的关系,指定了 `secondary` 参数。
这样,我们就可以像访问普通属性一样,在 `User` 和 `Role` 之间建立关联:

```python
user = User(username="john")
role1 = Role(name="admin") 
user.role.append(role1)  # john 赋予 admin 角色

role2 = Role(name="user")
user.role.append(role2)   # john 也拥有 user 角色
```

这会自动在 user_roles 表中插入对应的记录,建立起关系映射。
所以,要定义 SQLAlchemy 多对多关系,主要步骤是:

:::note

1. 创建一个中间表,包含两个外键列,分别指向两方主键
2. 在两方模型中定义关系,指定 secondary 参数指向中间表
3. 可以像列表一样在关系上追加对象,自动维护中间表
:::

通过 SQLAlchemy,我们可以用最简单的方式,以面向对象的思维来操作数据库中间表关系,简化了多对多逻辑的实现难度。

希望这个示例能帮助你理解 SQLAlchemy 如何定义多对多关系。

## 将 SQLAlchemy 与 FastAPI 整合

在 FastAPI 中使用 SQLAlchemy 进行数据库操作,我们需要:
:::note步骤

1. 在配置中创建 SQLAlchemy 引擎和会话本地类
2. 定义一个依赖项来获取数据库会话,并在完成操作后关闭
3. 将这个依赖项注入到各个需要访问数据库的路径操作函数
4. 在路径操作函数内使用这个会话进行各种数据库访问
:::
这里是一个示例:

```python
# 配置
engine = create_engine("sqlite:///database.db")  
SessionLocal = sessionmaker(bind=engine)  

#依赖项    
def get_db():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
        
# FastAPI 应用        
app = FastAPI()

@app.post("/users/")  
def create_user(user: UserCreate, session: Session = Depends(get_db)):
    session.add(user)
    session.commit()
    return {"msg": "User created"} 
```

这里我们:
:::note步骤

1. 在配置中创建引擎和会话本地类
2. 定义 `get_db` 依赖项来获取会话,并确保最终会话关闭
3. 将 `get_db` 依赖项注入 `create_user()` 路径操作函数
4. 在该函数中使用会话添加一条新用户记录,并提交  
:::

所以,要整合 SQLAlchemy 与 FastAPI,关键是:
:::note要点

- 必须在路径操作函数参数中声明会话 `session: Session`
- 必须使用 `Depends()` 注入我们定义的依赖项,以获取会话对象
- 必须在函数内使用会话对象进行数据库操作
- 必须在依赖项中正确关闭会话,避免资源泄露
:::
:::info

如果正确配置和注入,我们的 FastAPI 应用可以在任意路径操作函数中获取 SQLAlchemy 会话对象,执行数据库操作。
这使我们可以在异步Web服务框架 FastAPI 中,利用强大的 ORM 工具 SQLAlchemy 实现后端数据库功能,并使用 Open API 标准接口与前端交互。

所以,要熟练使用 FastAPI 框架,掌握 SQLAlchemy 等 ORM 工具与其的集成是非常重要的一项技能。
只需要一些简单的依赖项和配置,我们就可以在 FastAPI 中实现复杂的数据库后端服务。
:::
希望这个概览能帮助你理解 FastAPI 与 SQLAlchemy 的整合方法。我们将在后续示例中不断实践和深化这方面的学习。
