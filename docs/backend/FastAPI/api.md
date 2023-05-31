---
id: api
sidebar_position: 8
---

# API 文档和测试

## 自动生成 API 文档（Swagger UI 和 ReDoc）

在开发 API 时,API 文档是必不可少的一部分。高质量的 API 文档可以:

1. 方便 API 使用者理解各个接口的功能和用法
2. 降低 API 使用的学习成本和精力消耗
3. 减少 API 设计方和使用方的沟通交流成本

所以,在开发 API 时自动生成和持续更新文档显得尤为重要。

FastAPI 框架内置了 OpenAPI (OpenAPI 3) 支持,可以自动生成交互式文档。主要有两种方式:

**Swagger UI**
Swagger UI 是一款可视化展现 API文档的开源工具。在 FastAPI 中使用方法如下:

1. 安装

```bash
    pip install swagger-ui-bundle
```

2. 在 `.py` 文件中添加:

```python
    from fastapi.middleware.cors import CORSMiddleware
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    from fastapi.openapi.utils import get_openapi
    
    @app.get("/openapi.json")
    def openapi():
        return get_openapi(
            title="FastAPI example",
            version="1.0.0"
        )
    
    from fastapi.staticfiles import StaticFiles
    
    app.mount("/static", StaticFiles(directory="static"), name="static")
```

3. 在项目目录下创建 `static` 文件夹,并添加 `index.html` 文件,内容为:

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="/static/swagger-ui.css" >
    <script src="/static/swagger-ui-bundle.js"> </script>
    <script>
    const ui = SwaggerUIBundle({
        url: "/openapi.json",
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout"
      })
    </script>
  </head>

  <body>
    <div id="swagger-ui"></div>
  </body>
</html>
```

4. 访问 /static/index.html 查看交互式 API 文档。

所以,要在 FastAPI 中使用 Swagger UI 自动生成文档,主要分为:

- 安装所需 package
- 添加响应的 API 和中间件
- 创建静态文件夹及 index.html 文件并配置
- 通过访问 /static/index.html 查看文档

**ReDoc**
ReDoc 是另一款 API 文档工具,使用方法类似:

1. 安装

```bash
    pip install redoc
```

2. 在 `.py` 中添加:

```python
    from fastapi import FastAPI
    from fastapi.openapi.docs import get_redoc_html
    
    app = FastAPI()
    
    @app.get("/redoc")
    def redoc():
        return get_redoc_html(
            title="FastAPI example",
            openapi_url="/openapi.json",
            redoc_js_url="/static/redoc.standalone.js"
        )
```

3. 添加 `static/redoc.standalone.js` 文件(从 ReDoc 项目下载)

4. 访问 /redoc 查看文档

ReDoc 的界面更加简洁大方,适合作为产品API文档。Swagger UI更加详细,适合开发调试阶段。

所以,总结来说,要在 FastAPI 中使用 Open API 标准自动生成交互式 API 文档,有以下两种优选方案:

- Swagger UI:详细、全面,适合开发者使用
- ReDoc:简洁大方,适合产品文档

只需要一些简单配置,我们的 FastAPI 应用就可以拥有高质量的 API 文档,这大大提高了项目的专业度与可用性。
文档自动更新也可以最大限度减轻文档维护的工作量,让开发者专注于 API 本身。

希望这两个示例能帮助你理解如何在 FastAPI 中使用 Swagger UI 和 ReDoc 自动生成 API 文档。我们将在后续项目实践中不断使用这两款工具。

## 自定义 API 文档元数据

除了使用 Open API 标准自动生成基础文档外,我们还可以自定义 OpenAPI 元数据,丰富文档内容。

主要有以下几种方式:

1. 添加标题、描述和版本
我们可以在 openapi() 方法中添加:

```python
    @app.get("/openapi.json")
    def openapi():
        return get_openapi(
            title="FastAPI example",        # 标题
            description="API description", # 描述
            version="1.0.0"               # 版本号
        ) 
```

2. 添加联系信息

```python
    contact={
        "name": "FastAPI example team",
        "url": "https://example.com/contact/",
        "email": "contact@example.com"
    }
```

3. 定义标签(标签用于在文档中对 API 进行分类)

```python
    tags=[
        {
            "name": "user",
            "description": "Operations on users" 
        },
        {
            "name": "post",
            "description": "Operations on posts"
        }
    ] 
```

4. 为每个接口路径添加说明

```python
    @app.get("/users/")
    def read_users(
        ..., 
        summary="Retrieve a list of users", 
        description="This returns a list of all users"
    ): 
        ...
```

5. 添加请求体、响应和参数说明

```python
    from fastapi import Body
    
    @app.post("/posts/") 
    def create_post(
        title: str = Body(..., title="Title of the post", description="The post title"),
        content: str = Body(..., title="Post content", description="The actual content of the post")
    ):
        return {
            "message": "Post created"
        }
```

6. 指定响应模型

```python
    from fastapi import Response
    
    @app.get("/posts/")
    def get_posts() -> Response:
       ...
    
    response_model=List[Post],      # Post 模型
```

7. 给模型添加描述

```python
    class Post(BaseModel):
        title: str 
        content: str 
        
        class Config:
            title="Blog post"
            description="A blog post with title and content"
```

所以,通过以上几种方式,我们可以大大丰富 OpenAPI 元数据,使生成的 API 文档更加全面详尽。这需要我们在设计 API 时,就要考虑到相关说明、类型定义明确与准确。

虽然这会带来一定的工作量,但是高质量的 API 文档可以让我们的 API 项目真正的产品级。文档的作用不仅限于开发测试阶段,也是面向最终用户与通过调用方来说的。

希望这个概览能帮助你理解如何自定义 Open API 元数据以生成高级别的 API 文档。我们会在后续各个项目实践中运用这些方法,不断实践与提高。

## FastAPI 测试客户端

FastAPI 内置了一个用于测试 API 的客户端 TestClient。我们可以使用它来编写整合测试,确保我们的 API 以预期的方式工作。
主要的测试方法有:

- `client.get("/")` - 执行 GET 请求
- `client.post("/")` - 执行 POST 请求
- `client.put("/")` - 执行 PUT 请求
- `client.delete("/")` - 执行 DELETE 请求
- `client.params` - 添加 URL 参数
- `client.headers` - 添加请求头
- `client.json()` - 添加 JSON 请求体
- `client.cookies` - 添加 Cookie
- `response.json()` - 获取 JSON 响应体
- `response.status_code` - 获取状态码
- `response.text` - 获取文本响应体

一个简单的测试例子:

```python
    from fastapi import FastAPI
    from fastapi.testclient import TestClient
    
    app = FastAPI()
    
    @app.get("/")
    def read_root():
        return {"msg": "Hello World"}
    
    client = TestClient(app)
    
    def test_read_root():
        response = client.get("/")
        assert response.status_code == 200
        assert response.json() == {"msg": "Hello World"}
```

我们可以编写各种场景的测试来确保我们的 API 主要功能和业务逻辑等都是正确的。
包含正常请求、异常请求、身份验证等。
FastAPI 测试客户端 `TestClient` 的主要步骤是:

1. 初始化 `TestClient` 并传入我们的应用实例
2. 调用响应方法(如 `get`、`post` 等)并传入 API 路径
3. 添加任何需要的请求参数、 headers、cookies 等
4. 获取响应,并验证状态码、响应体等与预期一致
5. 编写各种测试场景来确保 API 函数与预期

使用 `TestClient` 可以让我们在开发过程中就确保 API 的正确性和健壮性,而不必一直到部署与调用方反馈后才发现问题。这可以最大限度减少后期维护成本,提高开发效率。

所以,编写 API 的同时利用 `TestClient` 编写相关的整合测试用例是非常值得推荐的最佳实践。我们将在各个后续项目中广泛使用它,不断实践和提高。

## 单元测试和端到端测试

除了使用 `TestClient` 进行整合测试外,我们还应该编写单元测试和端到端测试来确保 API 的健壮性。

**单元测试**
单元测试是针对 API 中的单个函数或类方法进行的测试。主要通过 `unittest` 或 `pytest` 框架来实现。

示例:

```python
    def add(a, b):
        return a + b
    
    def test_add():
        assert add(1, 2) == 3     # 测试1+2=3
        assert add(5, 6) == 11   # 测试5+6=11
```

所以,编写单元测试的主要步骤是:

1. 导入 `unittest` 或 `pytest`
2. 定义测试函数,函数名以 `test_` 开头
3. 在测试函数内使用 `assert` 语句验证功能的预期结果

单元测试可以确保 API 的每一小段逻辑或函数都符合需求,让我们开发时就可以发现并修复潜在问题。

**端到端测试**
端到端测试是模拟从用户输入到系统响应的完整流程进行测试。通常使用自动化测试工具 Selenium 来实现。
主要步骤是:

1. 安装 Selenium 及 WebDriver
2. 定义测试用例类,继承 `unittest.TestCase`
3. 在测试方法中使用 Selenium 启动浏览器并模拟用户交互
4. 对页面响应的元素、提示信息等进行验证
5. 补充测试数据及断言

示例:

```python
    from selenium import webdriver
    from selenium.webdriver.common.keys import Keys
    
    class PythonOrgSearch(unittest.TestCase):
    
        def setUp(self):  # 执行每个测试方法前都会运行
            self.driver = webdriver.Chrome()
    
        def test_search_pyhton_org(self):  
            driver = self.driver
            driver.get("http://www.python.org")
            self.assertIn("Python", driver.title)
            elem = driver.find_element_by_name("q")
            elem.send_keys("pycon")
            elem.send_keys(Keys.RETURN)  
            self.assertIn("PyCon", driver.page_source)  
    
        def tearDown(self):  # 执行每个测试方法后都会运行
            self.driver.close()
    
    if __name__ == "__main__":  
        unittest.main()  
```

端到端测试可以确保我们的 API 或系统可以正常工作在全部流程和交互环节中。这需要编写各种用户场景的测试来覆盖更为全面。
综上,我们有三种方式来确保 API 的正确性:

1. 使用 `TestClient` 进行整合测试
2. 用 `unittest` 和 `pytest` 进行单元测试
3. Selenium 实现端到端测试

这三种方法各有优劣,我们应该根据项目实际选择适合的方式或同时采用。编写足够的测试可以让我们开发 API 时保持高质量与稳定性。测试的工作量虽然较大,但是可以省去许多调试与维护成本。

希望这三种测试方法的介绍能帮助你理解如何构建稳定高质的 API。我们将在后续项目中同时采用,不断实践与提高
