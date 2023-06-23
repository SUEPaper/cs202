---
id: SRC
sidebar_position: 4
---

# SRC查询参数

本节内容，我们会定义具有查询参数的API,并对其进行测试，为此我们在`main.py`文件中进行增加：

:::note 代码

```python
main.py

import uvicorn
from fastapi import FastAPI
# 导入新的需要使用的类
from recipe_data import RECIPES
from typing import Optional

app = FastAPI()



@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/test/{id}", status_code=200)
def api_match(*, id: int) -> dict:
    # print(type(id))  # added
    result = [recipe for recipe in RECIPES if recipe["id"] == id]
    if result:
        return result[0]

# 新增查询API
@app.get("/search/", status_code=200)
def api_search(keyword: Optional[str] = None, max_results: Optional[int] = 10) -> dict:
    if not keyword:
        return {"results": RECIPES[:max_results]} # 设置默认值
    # 我们使用 Python 过滤器功能在我们的数据集上进行非常基本的关键字搜索。搜索完成后，数据将被序列化 通过框架到 JSON。
    results = filter(lambda recipe: keyword.lower() in recipe["title"].lower(), RECIPES)
    return {"results": list(results)[:max_results]}


if __name__ == "__main__":
    uvicorn.run("main:app", reload=True, host="localhost", port=8000)

```

其他文件保持不变，点击运行按钮。
:::

:::info 访问
导航到位于localhost:8000/docs

尝试使用API：

- 通过单击展开 GET 端点
- 点击“try”按钮
- 为关键字输入值“pie”
- 按下大的“exe”按钮
- 按出现的较小的“exe”按钮

![](img/S1.png)
![](img/S2.png)

尝试用更多的关键词测试查询参数API叭~
:::

# 实现todolist的增删改查功能
增加`./backend/api/todos.py`和`./backend/api/api.py`
:::note
```python

todos.py

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def get_all_todos():
    return {"get": "todos"}


@router.post("/")
def create_todo():
    return {"post": "todos"}


@router.put("/{todo_id}")
def update_todo():
    pass


@router.delete("/{todo_id}")
def delete_todo():
    pass
```

```python
api.py

from fastapi import APIRouter
from api.todos import router as todos_router

api_router = APIRouter()
api_router.include_router(todos_router, prefix="/todos", tags=["todos"])

```

```python
main.py

import uvicorn
from fastapi import FastAPI
from api.api import api_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(api_router, prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


if __name__ == "__main__":
    uvicorn.run("main:app", reload=True, host="localhost", port=8000)


```

我们之所以对文件进行拆分，是因为：所有代码放到一个文件里有着存储维护等问题，为了面向对象编程，我们采用大量的封装保持代码整洁。

跨域请求常见的解决方案之一是使用中间件（`middleware`）来处理。中间件是一个在请求到达服务器之前或响应发送给客户端之前对请求或响应进行处理的组件。

`include_router` 是 FastAPI 框架中用于将路由器（router）包含在应用程序中的方法。它允许你将路由器中定义的路由和处理函数与 FastAPI 应用程序进行关联，以便这些路由能够被应用程序处理。

通常，你会将路由器定义在单独的模块中，并使用 `include_router` 方法将其包含在主应用程序中。这样可以将应用程序的路由逻辑进行模块化，使代码更加清晰和易于维护。

:::

下一节内容我们会学习数据库迁移。