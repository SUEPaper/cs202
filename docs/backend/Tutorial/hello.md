---
id: "Hello World"
sidebar_position: 2
---

# 根路由下的主界面 hello world

首先在项目的根目录下创建一个新的文件夹，起名为`backend`

在此文件夹中创建`main.py`文件，点击文件进入编辑界面，新建一个终端。

:::tip 提示
创建一个 FastAPI 示例。首先，确保您已经安装了 FastAPI 和 Uvicorn。如果没有，请于终端下使用以下命令安装：

```bash
pip install fastapi uvicorn
```

:::

完成这一部分目标，我们需要做一下几个步骤：

:::note 步骤

1. 导入我们所要用到的package ，并实例化一个 FastAPI 对象，它是一个 Python 类，提供 API 的功能。`app`

```python
import uvicorn
from fastapi import FastAPI, APIRouter

# 1
app = FastAPI(title="Recipe API", openapi_url="/openapi.json")
```

2. 我们实例化一个对我们的 API 进行分组的应用（并指定版本和其他配置，我们将在后面查看）`APIRouter`

```python
# 2
api_router = APIRouter()
```

3. 通过将装饰器添加到函数中，我们为 API 定义了一个基本的 GET 端点。`@api_router.get("/", status_code=200)`--`root`

```python
# 3
@api_router.get("/", status_code=200)
def root() -> dict:
    """
    Root Get
    """
    return {"msg": "Hello, World!"}
```

4. 我们使用对象的方法注册路由器 在步骤 2 中在 FastAPI 对象上创建。`include_routerapp`

```python
# 4
app.include_router(api_router)
```

5. 当直接调用模块时，条件适用，即如果 我们运行.在这种情况下，我们需要导入，因为 FastAPI 取决于这个 Web 服务器（我们将在后面详细讨论）`__name__ == "__main__"python app/main.py`--`uvicorn`

```python
# 5
if __name__ == "__main__":
    # Use this for debugging purposes only
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="debug")
```

点击运行按钮一键运行~
:::

:::info 访问
[导航到本地主机](http://localhost:8000/)：8000，您应该看到：

![](./img/H1.png)

如果您可以看到“Hello， World！”响应，则您的 API 正在工作。接下来，[访问本地主机](http://localhost:8000/docs)：8000/docs，你应该看到一个这样的屏幕：

![](./img/H2.png)

这是 FastAPI 提供的开箱即用的交互式文档，因为框架 是围绕OpenAPI标准构建的。这些文档页面是交互式的，并且会增加 详细地介绍我们添加更多端点并描述预期的输入/输出值 我们的代码。

尝试您的终端节点：

- 通过单击展开 GET 端点
- 点击“试用”按钮
- 按下大的“执行”按钮
- 按出现的较小的“执行”按钮

![](./img/H3.png)

您可以看到 API 响应正文（我们的“Hello， World！”消息）以及命令 FastAPI 已经在引擎盖下为您运行。我们将在整个过程中使用此功能 教程系列可轻松检查我们的端点。`curl`
:::
