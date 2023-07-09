---
id: demo_migration
sidebar_position: 10
---

# TODO API的数据库版本

:::tip

本课程网站内容请仔细阅读后再进行实操。因未仔细阅读内容，出现任何错误后果自负（逃～～～逃～～～逃

请切换到 `backend_demo_migration_start` 分支，开始此教程代码的编写。

**所有的代码请不要复制粘贴，请手敲每一行代码。复制粘贴不会让你动脑子，而手敲每一个行代码会让你自然而然地去动脑子会想每一行代码的含义和原理**
:::

通过前面的教程，我们已经准备好将内存里面的TODOS数据存入数据库里面了。

用 VS Code 打开 `api/todos.py`，将代码改成如下：

```python showLineNumbers
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api import deps
from crud import crud_todo
from schemas import todo as schemas_todo

router = APIRouter()

@router.get("/todos", response_model=list[schemas_todo.Todo])
def get_all_todos(
    db: Session = Depends(deps.get_db)
):
    todos = crud_todo.get_all(db=db)
    return todos

@router.get("/todos/{todo_id}", response_model=schemas_todo.Todo)
def get_todo_by_id( 
    todo_id: int,
    db: Session = Depends(deps.get_db)
):
    todo = crud_todo.get_by_id(db=db, id=todo_id)
    return todo

@router.post("/todos", response_model=schemas_todo.Todo)
def create_todo(
    todo_parmas: schemas_todo.TodoCreate,
    db: Session = Depends(deps.get_db)
): 
    todo = crud_todo.create(db=db, todo_params=todo_parmas)
    return todo
```

`db: Session = Depends(deps.get_db)`的含义是在函数中获取一个数据库会话对象，并将其赋值给名为`db`的参数。在函数被调用时，FastAPI会自动解析依赖项，并调用`deps.get_db`函数获取数据库会话对象，并将其传递给`db`参数。

这种依赖注入的方式使得在路由处理函数中可以轻松地访问数据库会话对象，而不必在每个函数中显式创建和管理数据库会话。这样可以提高代码的可维护性和可测试性，同时避免了重复的代码编写。

## 依赖注入

在FastAPI中，依赖注入是一种设计模式，用于管理和注入应用程序中的依赖关系。它使得组件之间的耦合度更低，提供了更灵活和可测试的代码结构。

依赖注入的基本思想是，将一个组件所需的依赖关系从组件内部移动到外部，由外部容器负责创建和提供这些依赖关系。这样，组件只需关注自身的业务逻辑，而无需关心如何创建或获取依赖的实例。

在FastAPI中，依赖注入是通过使用Pydantic模型和函数参数注解来实现的。可以在路由处理函数中声明需要的依赖项，并将其作为参数传递给函数。FastAPI会自动解析这些依赖项，并在调用路由处理函数之前解决它们的依赖关系。

依赖项可以是各种类型的对象，例如数据库连接、配置对象、身份验证服务等。通过将这些依赖项声明为函数的参数，FastAPI会自动创建它们的实例并注入到函数中。

依赖注入的优势包括：

- 提高可测试性：通过将依赖项从组件中解耦，可以更容易地进行单元测试，可以轻松地替换依赖项的实现，以进行测试或模拟。
- 提高代码的可维护性：依赖注入使代码的结构更清晰，减少了组件之间的紧密耦合，使代码更易于理解和维护。
- 促进代码重用：通过将依赖项作为独立的组件提供，可以在不同的模块或应用程序中重用这些组件，提高代码的可重用性。
- 支持可扩展性：依赖注入使得向应用程序添加新的功能或服务变得更容易，只需添加新的依赖项并进行相应的配置即可。


## 运行和测试 API

接下来是测试阶段，请用浏览器打开 http://localhost:8000/docs(打开 URL 前请确保我们的FastAPI 应用是运行起来的)对我们迁移到数据库版本的API进行测试，同时请用MySQL的命令行工具，查看数据库表中是否有对应的数据。


:::tip

可以切换 `backend_demo_migration_finished` 分支，查看最终正确实现的代码。

:::