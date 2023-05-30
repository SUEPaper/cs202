---
id: demo
sidebar_position: 20
---

# FastAPI 简单案例

创建一个简单的 FastAPI 示例。首先，确保您已经安装了 FastAPI 和 Uvicorn。如果没有，请于终端下使用以下命令安装：

```python
pip install fastapi uvicorn
```    

看到'Successfully installed pip-[版本号]'证明安装成功

接下来，我们将创建一个简单的 FastAPI 应用。在您选择的目录中，创建一个名为 example.py 的文件，并将以下代码粘贴到文件中：

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
```

在这个例子中，我们创建了一个 FastAPI 实例，并定义了两个路由。第一个路由是根路由，当用户访问应用的根 URL 时，它将返回一个简单的 JSON 响应。第二个路由是一个带有参数的路由，它接受一个整数 item_id 和一个可选的查询参数 q。

要运行此应用，请在终端命令行中导航到包含 example.py 的目录，

```terminal
cd [目录路径]
```

运行以下命令：

```terminal
uvicorn example:app --reload
```

终端反馈：

```terminal
PS E:\Python\FastAPI> uvicorn example:app --reload
INFO:     Will watch for changes in these directories: ['E:\\Python\\FastAPI']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [2908] using StatReload
INFO:     Started server process [31516]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

现在，您的 FastAPI 应用应该在 http://127.0.0.1:8000 上运行。您可以通过访问 http://127.0.0.1:8000/items/42?q=test 来测试带有参数的路由。

此外，FastAPI 自动生成了一个交互式 API 文档，您可以通过访问 http://127.0.0.1:8000/docs 来查看和测试您的 API。

退出请在终端总按Ctrl+C.


# 创建 FastAPI 应用实例

# 路由与 HTTP 方法

# 路径参数与查询参数
