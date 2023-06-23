---
id: tran
sidebar_position: 5
---


# 数据迁移

:::tip

使用 Python 和 Alembic 而不是直接使用 SQL 语句有几个主要的原因：

1. 方便版本控制： Alembic 是一个数据库迁移工具，它提供了一种管理数据库架构变更的方式。通过使用 Alembic，你可以将数据库变更操作封装在 Python 脚本中，并使用版本控制系统（如 Git）进行跟踪和管理。这使得团队协作和版本控制变得更加容易，可以轻松地跟踪和回滚数据库的变更。

2. 易于维护： 使用 Python 和 Alembic 可以提高代码的可读性和可维护性。你可以使用 Python 的面向对象编程和强大的编程能力来定义数据库模型和变更操作，以及编写复杂的数据库迁移脚本。这种编程式的方式使得代码更具可读性和可维护性，便于理解和修改。

3. 数据库无关性： Alembic 提供了一种与数据库无关的方法来管理数据库架构变更。它使用 SQLAlchemy 作为数据库访问工具，可以与多种关系型数据库（如 MySQL、PostgreSQL、SQLite 等）进行交互。这意味着你可以在不同的数据库上运行相同的迁移脚本，而不需要修改 SQL 语句。

4. 自动化和错误检测： Alembic 提供了一些自动化功能和错误检测机制，可以帮助你更轻松地管理数据库架构变更。例如，它可以自动检测数据库中已经应用的迁移脚本，以避免重复应用；还可以检测到迁移脚本中的错误，例如无效的 SQL 语句或数据类型不匹配等。

总的来说，使用 Python 和 Alembic 可以提供更好的版本控制、易于维护的数据库架构管理方式，同时也具备数据库无关性和自动化的特性。这使得开发团队能够更高效地进行数据库开发和维护，并降低了维护成本和错误风险。
:::

使用 Alembic 进行数据迁移,我们先在`./backend/`路径下创建db文件夹

然后在db文件夹下数据迁移，具体步骤如下：

:::note
1. 安装配置Alembic

```bash
pip install alembic
```

2. 初始化环境

```bash
alembic init alembic
```

这一步需要保证终端路径在`./backend/db/`

3. 创建和管理迁移脚本
在`alembic.ini`文件中配置SQLalchemy引擎

```ini
[alembic]# 所选的SQL工具
sqlalchemy.url = sqlite:///database.db 
...

```

定义模型后创建首个迁移脚本

```bash
alembic revision -m "first_revision"

```
这会创建一个版本文件。

我们要编写脚本文件，以todolist项目为例，我们需要创建两个表todos和users。

```python
def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.Integer, primary_key=True, index=True),
        sa.Column("name", sa.String(200), nullable=False),
        sa.Column("email", sa.String(200), unique=True,
                  index=True, nullable=False),
        sa.Column("hashed_password", sa.String(200), nullable=False),
        sa.Column("created_at", sa.TIMESTAMP, nullable=False),
        sa.Column("updated_at", sa.TIMESTAMP, nullable=False)
    )


def downgrade() -> None:
    op.drop_table("users")
```

需要在文件内进行一些编辑。

然后将脚本与数据库同步：

```bash
alembic upgrade head
```

然后大家可以连接到自己的mysql数据库，看到自己创建的表啦

以后每当模型有变更,重复第 4 步生成新脚本,第 5 步同步变更。

如果需要回滚，使用：

```bash
alembic downgrade -1      # 回滚最后一次迁移 
alembic downgrade 3ce5a9 # 回滚到特定版本号的迁移
```

迁移部署到生产环境使用:

```bash
alembic upgrade <revision_id>   # 升级到指定 ID 的最新版本
```

:::
