---
id: backend-db-migration
sidebar_position: 7
---

# Web后端：数据库迁移

:::tip

本课程网站内容请仔细阅读后再进行实操。因未仔细阅读内容，出现任何错误后果自负（逃～～～逃～～～逃

请切换到 `backend_db_migration_start` 分支，开始此教程代码的编写。

**所有的代码请不要复制粘贴，请手敲每一行代码。复制粘贴不会让你动脑子，而手敲每一个行代码会让你自然而然地去动脑子会想每一行代码的含义和原理**
:::



数据库迁移（Database Migration）是一种管理数据库模式（Schema）和结构变化的技术。它允许开发人员在数据库模式发生变化时，通过编程方式自动地迁移和更新数据库，而无需手动执行繁琐的脚本或手动修改数据库。

数据库迁移通常用于以下情况：

- 模式演化：当应用程序的需求发生变化时，可能需要向数据库添加新的表、列、索引等。数据库迁移允许开发人员通过创建迁移脚本来自动执行这些结构变化，确保数据库与应用程序的最新版本保持一致。

- 团队协作：在团队开发中，多个开发人员可能同时对数据库进行修改。使用数据库迁移可以帮助团队协作，每个开发人员可以创建和应用自己的迁移脚本，保证数据库结构的一致性。

- 数据库版本控制：数据库迁移工具通常与版本控制系统（如Git）集成，可以跟踪和管理数据库结构的变化。这样可以方便地回滚到先前的数据库版本，或者在不同的环境（开发、测试、生产）之间同步数据库结构。

- 数据库迁移通常由一个数据库迁移工具来管理，如Alembic、Flyway、Liquibase等。这些工具提供了创建、应用和回滚迁移脚本的功能，并与主流数据库系统（如MySQL、PostgreSQL、SQLite）兼容。

- 在使用数据库迁移时，通常会创建一个初始迁移脚本，用于初始化数据库模式。随后的每个迁移脚本会描述数据库结构的变化，包括创建新表、修改表结构、添加索引等。每次应用迁移脚本时，数据库迁移工具会自动执行相应的操作，使数据库达到所需的结构状态。

本教程中使用的是 Alembic 作为数据库迁移的工具。

## 安装和配置 Alembic

### 安装

在终端中输入如下命令安装 Alembic

```bash
pip install alembic sqlalchemy mysqlclient
```

### 初始化环境

打开终端，并且进入 `db/` 文件夹，输入如下命令。

```bash
alembic init migrations
```
则会产生如下所示的文件和文件夹。

```bash
E:
db
├── __init__.py
├── alembic.ini
└── migrations
    ├── README
    ├── env.py
    ├── script.py.mako
    └── versions
```

用 VS Code 打开 `alembic.ini` 文件，将第63行代码改成如下所示：

```yml
sqlalchemy.url = mysql://root:password@localhost:3306/todoapp
```

![](./img/db_migration_01.png)

:::danger

此操作前提条件是，MySQL数据库中root账户下有`todoapp`这个数据库，如果没有请新建一个，并且你MySQL的root账户密码需为 `password`。（**MySQL root 用户密码已在MySQL安装教程中强烈要求大家设置为 `password`**）

:::


## 为 Todo 新建一张数据库表

到目前为止，我们的代码中的 TODOS 都存在内存里面，当 FastAPI 程序重启以后，TODOS里面的数据都丢失了。接下来我们要将 TODOS 的数据存到数据库里面，在实现数据库操作之前我们需要在 MySQL 数据库中新建一张 `todos` 表，用来存储 TODOS 的数据。

打开终端，并且进入 `db/` 文件夹，输入如下命令

```bash
alembic revision -m "create_todos_table"
```

则会产生如下所示的文件和文件夹。

```bash
E:
db
├── __init__.py
├── alembic.ini
└── migrations
    ├── README
    ├── env.py
    ├── script.py.mako
    └── versions
        └── 0f54f99f8360_create_todos_table.py
```

:::tip 见名知义
 `create_todos_table` 一看就知道新建一张 `todos` 表，并且 alembic 自动生成的迁移文件的文件名中也有  `create_todos_table`， 方便团队合作中其他工程师阅读和维护代码。
:::

`0f54f99f8360_create_todos_table.py`是我们第一个数据库迁移文件，请用VS Code 打开代码文件。(**也许在你的电脑里面文件名不是`0f54f99f8360_`开头的，这个取决于你的电脑随机生成的数字和字母的组合， 本教程用`xxx_create_todos_table.py`指代你本地对应的文件**)

```python showLineNumbers
"""create_todos_table

Revision ID: 0f54f99f8360
Revises: 
Create Date: 2023-07-01 14:37:56.539116

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0f54f99f8360'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass

```

- `revision = '0f54f99f8360'` 是记录当前migration文件的版本号，alembic 就是基于这个版本号来管理数据库变更的版本。
- 函数 `upgrade` 编写数据库往前滚的变更。
- 函数 `downgrade` 编写数据库往回滚的变更，用户删除`upgrade`的变更。

:::danger
不要因为文件名看起来非常乱而随便改名
:::

### 实现新建`todos`表的迁移代码

将`xxx_create_todos_table.py`中的`upgrade`、`downgrade` 函数替换成如下代码：

```python showLineNumbers
def upgrade() -> None:
    op.create_table(
        "todos",
        sa.Column("id", sa.Integer, primary_key=True, index=True),
        sa.Column("is_done", sa.Boolean, default=False, nullable=False),
        sa.Column("content", sa.Text, nullable=False),
        sa.Column("created_at", sa.TIMESTAMP, nullable=False),
        sa.Column("updated_at", sa.TIMESTAMP, nullable=False)
    )

def downgrade() -> None:
    op.drop_table("todos")
```

- `op.create_table`: 新建一张表，第一个参数是表的名字，此处为："todos"。
- `op.drop_table`: 删除表，此处删除的表是: "todos"。
- `sa.Column("id", sa.Integer, primary_key=True, index=True)`: `todos`表中包含 `id` 字段，该字段是 `Integer` 型，是主键，采用MySQL自增的方式自动生成，并且有索引。
- `sa.Column("is_done", sa.Boolean, default=False, nullable=False)`: `todos`表中包含 `is_done` 字段，该字段是 `Boolean` 型，默认值是`False`, 非空。
- `sa.Column("content", sa.Boolean, default=False, nullable=False)`: `todos`表中包含 `content` 字段，该字段是 `Text` 型，无默认值，非空。
- `sa.Column("created_at", sa.TIMESTAMP, nullable=False)`: `todos`表中包含 `created_at` 字段，该字段是 `TIMESTAMP` 型，无默认值，非空。
- `sa.Column("updated_at", sa.TIMESTAMP, nullable=False)`: `todos`表中包含 `updated_at` 字段，该字段是 `TIMESTAMP` 型，无默认值，非空。

:::note

关于 alembic 可以进行哪些操作请查阅官方文档： https://alembic.sqlalchemy.org/en/latest/ops.html

可以看到 alembic 使用 SQLAchemy 的提供的数据库字段类型，因此更多的表字段类型请查阅官方文档：https://docs-sqlalchemy.readthedocs.io/ko/latest/core/type_basics.html
:::

### 创建 `todos` 表


打开终端，并且进入 `db/` 文件夹，输入如下命令

```bash
alembic upgrade head
```

进入数据库便可看到新建的 `todos` 表。

![](./img/db_migration_02.png)


:::note
alembic 详细教程请看官方文档：https://alembic.sqlalchemy.org/en/latest/tutorial.html
:::


:::tip

可以切换 `backend_db_migration_finished` 分支，查看最终正确实现的代码。

:::