---
id: db_migration
sidebar_position: 7
---

# 数据迁移

## 数据迁移简介

对于任何一套严谨的后端系统来说,数据迁移都是必不可少的一部分。所谓数据迁移,就是将数据库从一种状态迁移到另一种状态。

通常会涉及到两种类型的迁移:
:::note

- 架构迁移:修改表结构,如添加/删除列、索引等。
- 数据迁移:直接操作表数据,如同步新数据源的数据。
:::

:::info
为什么需要数据迁移?主要有以下几个原因:

1. 模型变更:当我们的模型(表结构)发生变化时,如添加新列,我们需要迁移数据库模式以匹配新模型。
2. 初始数据源导入:当我们从其他数据源获得初始数据时,需要迁移到系统数据库。
3. 生产环境 bug 修复:有时会出现在生产环境中表数据不正确或缺失的情况,此时需要修复迁移。
4. A/B 测试:当我们要在生产环境做 A/B 测试,需要迁移一部分表数据。
5. 旧系统切换:当切换到新系统时,需要从旧系统迁移数据。

:::
所以,数据迁移是确保我们的系统数据始终是正确和同步的关键步骤。对于生产环境来说尤其重要。

要实现数据迁移,有几种常见的方式:

:::note

1. 纯 SQL 脚本:编写 SQL 语句创建/修改表结构,以及增删改数据。
2. ORM 工具:使用 SQLAlchemy 等 ORM 工具同步模型变更到数据库,以及操作表数据。
3. 专业的数据迁移工具:使用 Alembic、Django 数据迁移等专业工具管理变更和迁移。
4. 自定义脚本:编写自定义 Python 脚本,使用 SQLAlchemy 等工具实现迁移逻辑。

:::
在后续,我们会具体讲解如何使用 Alembic 和 SQLAlchemy 在 FastAPI 项目中进行高效的数据迁移。

希望这个简要概览能帮助你理解什么是数据迁移以及其重要性。数据迁移是后端开发中必不可少但又容易被忽视的一部分,值得我们投入足够的时间和精力深入学习与实践。

## 常用数据迁移工具
:::tip
在 Python Web 开发中,常用的数据迁移工具主要有:

- Alembic
- Django 迁移
- SQLAlchemy ORM
这三者各有优劣,适合不同的项目场景。
:::

**Alembic**
Alembic 是一个用于对 SQLAlchemy 模型和数据库架构进行管理和更新的轻量级数据库迁移工具。

主要特点:

:::note

- 专注于数据库模式迁移,不依赖任何ORM框架,但集成了对 SQLAlchemy 的支持。
- 使用目录来管理版本,可以非常清晰地看到过去的迁移历史。
- 可以生成迁移脚本,也可以手工编写 SQL 脚本。
- 支持多种数据库,如 Postgres、MySQL、SQLite 等。
:::
使用 Alembic 进行迁移的基本步骤是:

1. 初始化 Alebic 环境并创建版本库:

```bash
alembic init alembic
```

2. 编写迁移脚本:

```bash
alembic revision -m "creat a table"
```

3. 将脚本升级至最新版本:

```bash
alembic upgrade head
```

4. 管理员想要回滚最后一次迁移:

```bash
alembic downgrade -1
```

所以,Alembic 是一个轻量但强大的数据库迁移工具,适用于绝大部分项目场景。

**Django 迁移**
Django 的 ORM 框架内置了一套数据库迁移机制,可以直接使用。当我们更改 Django 模型时,可以运行:

```python
python manage.py makemigrations
python manage.py migrate
```

这将同步模型的变更到数据库,实现迁移
。
Django 迁移的优点是简单方便,不过只适用于 Django 项目,不具备通用性。

**SQLAlchemy ORM**
我们也可以直接使用 SQLAlchemy 的 ORM 工具来同步模型变更和操作数据。的确,这是一个选择,但是不如 Alembic 这种专业的迁移工具来的高效和规范。

所以,综上,我个人推荐:
:::note

- 对于大多数项目,使用 Alembic 进行高效的数据迁移管理。
- 如果是小型 Django 项目,使用内置的 Django 迁移机制即可。
- 只有在简单的模式变更下,才考虑直接使用 SQLAlchemy ORM 工具迁移数据。
:::

明确选择一款适合项目实际需求的迁移工具,可以最大限度确保我们的数据是最准确和同步的.

希望这个比较能帮助你选择最适合你项目的迁移工具。我们将在后续 FastAPI 项目示例中全面讲解 Alembic 的使用方法。

## 使用 Alembic 进行数据迁移

在 FastAPI 项目中,我们推荐使用 Alembic 来管理数据迁移。具体步骤如下:

### 安装与配置 Alembic

1. 安装 Alembic:

```bash
pip install alembic
```

### 初始化 Alembic 环境

2. 初始化 Alembic 环境:

```bash
alembic init alembic
```

这会在项目根目录下创建 `alembic` 文件夹,包含 Alembic 配置文件。

### 创建和管理迁移脚本

3. 在 `alembic.ini` 文件中配置 SQLAlchemy 引擎:

```ini
[alembic]# 所选的SQL工具
sqlalchemy.url = sqlite:///database.db 
...
```

4. 定义模型后,生成首个迁移脚本:

```bash
alembic revision -m "first_revision"
```

这会创建一个版本文件 `versions/xxxxxxx_first_revision.py`。

5. 将脚本与数据库同步:

```bash
alembic upgrade head
```

6. 以后每当模型有变更,重复第 4 步生成新脚本,第 5 步同步变更。

7. 如需回滚,使用:

```bash
alembic downgrade -1      # 回滚最后一次迁移 
alembic downgrade 3ce5a9 # 回滚到特定版本号的迁移  
```

### 执行数据迁移

8. 迁移部署到生产环境使用:

```bash
alembic upgrade <revision_id>   # 升级到指定 ID 的最新版本
```

所以,在 FastAPI 项目中使用 Alembic 进行数据迁移的工作流是:

:::note

1. 初始化环境并配置 SQLAlchemy 引擎
2. 首次定义模型后生成初始迁移脚本
3. 将脚本升级到最新版本,与开发数据库同步
4. 以后每有模型变更生成新脚本,并升级同步
5. 如需要回滚到某版本或在生产升级,使用相应命令
:::

Alembic 会高效地管理我们的所有迁移历史,使我们可以清晰查看某次迁移具体执行了什么变更 SQL 语句。
:::info

这有助于我们在出现问题时快速定位和修复。
而且,Alembic 支持绝大多数数据库,所以我们的 FastAPI 项目可以轻松切换到 PostgreSQL、MySQL 等生产级数据库, Alembic 可以生成对应的 SQL 语句,实现无缝迁移。
:::

所以,总之,Alembic 是 FastAPI 项目进行专业数据迁移管理的首选工具,值得我们投入时间深入学习与实践。

希望这个示例能帮助你理解如何在 FastAPI 项目中使用 Alembic 进行数据迁移。我们将在后续项目实践中不断运用这些知识。

## 数据迁移的最佳实践

在进行数据迁移时,有几点最佳实践可以遵循:
:::note

1. 事先规划迁移方案,不可贸然操作生产数据。要评估风险和影响。
2. 先在开发/预生产环境测试迁移方案,确保成功后再部署到生产。
3. 生产环境迁移时选择在业务活动较少的时间窗口执行。
4. 每次只部署一个新的迁移版本,以便出问题可以快速定位和回滚。
5. 回滚机制要事先预备,一旦新版本出现问题可以快速还原。
6. 备份原有数据以防万一,特别是在生产环境操作前后各备份一次。
7. 详细记录每次迁移都做了什么变更,有助于后期维护和追溯问题。
8. 在生产环境,要控制迁移过程不停机或者停机时间最短。可以采用蓝绿部署方式。
9. 迁移后要进行验证,确认数据已正确迁移至新版本并且各功能均正常。
10. 要有完备的监控,若新版本上线后出现异常,能快速发现并做出响应。
11. 定期对迁移过程和策略进行审核评估,不断改进与优化。
12. 建立数据迁移负责小组,明确任务分工和职责,定期合作演练。
:::
所以,要进行成功且低风险的数据迁移,除了选择一款强大的迁移工具外,我们还需要遵循一系列最佳实践。
:::warning

特别是在生产环境的操作,更加严谨和审慎。事先的规划、演练和监控对于数据迁移至关重要。

任何一个环节出错,都可能带来系统停机或数据异常,给用户带来极差体验。
所以,对数据迁移要有足够的重视,切记轻率行事。
:::

希望这些最佳实践可以为你进行数据迁移带来一定的指引和参考。我们在后续各大实践项目中也会遵循这些建议,不断总结提高。如果你有任何其他的最佳实践,也欢迎补充和分享。
