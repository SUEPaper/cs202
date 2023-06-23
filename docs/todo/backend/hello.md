---
id: "Hello World"
sidebar_position: 2
---

# 尝试运行最简单的demo

首先在项目的根目录下创建一个新的文件夹，起名为`backend`表示我们的后端代码。

在`./backend/`路径创建`main.py`和`__init__.py`空文件主文件，后续我们只使用此文件启动后端所有代码。

:::warning 警告
`__init__.py` 文件在 Python 中具有特殊的作用，它主要用于标识一个目录是一个 Python 包。

其在 Python 包中具有重要的作用，它定义了包的初始化行为，为包提供了命名空间，并可以包含包级别的代码和定义。
:::

打开`main.py`文件,新建一个终端

:::tip 提示
创建一个 FastAPI 示例。首先，确保您已经安装了 FastAPI 和 Uvicorn。如果没有，请于终端下使用以下命令安装：

```bash
pip install fastapi uvicorn
```

:::note 操作

输入下列代码：

```python
# 导入所需要的类
import uvicorn
from fastapi import FastAPI

# 创建名为app的FastAPI应用
app = FastAPI()

# 创建一个default端口的跟路由
@app.get("/")
async def root():
    return {"message": "Hello World"}

# 为了方面Debug
if __name__ == "__main__":
    uvicorn.run("main:app", reload=True, host="localhost", port=8000)
```

:::
:::info 访问
导航到本地主机:`http://localhost:8000/`或`http://127.0.0.1:8000/`：您应该看到：

![](./img/H1.png)

如果您可以看到“Hello， World！”响应，则您的 API 正在工作。

接下来，访问`http://localhost:8000/docs`或`http://127.0.0.1:8000/docs`，你应该看到一个这样的屏幕：

![](./img/H2.png)

这是 FastAPI 提供的开箱即用的交互式文档，因为框架 是围绕OpenAPI标准构建的。这些文档页面是交互式的，并且会更加详细地介绍我们添加更多端点并描述预期的输入/输出值 我们的代码。

尝试您的终端节点：

- 通过单击展开 GET 端点
- 点击“试用”按钮
- 按下大的“执行”按钮
- 按出现的较小的“执行”按钮

![](./img/H3.png)

您可以看到 API 响应正文（我们的“Hello， World！”消息）以及命令 FastAPI 已经在引擎盖下为您运行。我们将在整个过程中使用此功能 教程系列可轻松检查我们的端点。
:::
