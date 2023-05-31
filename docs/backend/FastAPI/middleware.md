---
id: middleware
sidebar_position: 10
---

# 中间件和异常处理

## 自定义中间件

中间件是在请求被发送到路径操作函数之前和之后执行的函数。它允许我们扩展 FastAPI 的功能。

我们可以实现以下类型的中间件:

1. 全局中间件:在所有请求之前和之后执行
2. 基于路径的中间件:只针对满足路径条件的请求执行
3. 基于HTTP方法的中间件:只针对特定方法(如GET、POST)的请求执行

定义中间件的步骤:

1. 创建一个中间件函数,接收三个参数:

- `request`:当前请求对象
- `call_next`:调用后续中间件或路径操作函数
- `response`:响应对象(后续中间件使用)

2. 在请求阶段,执行一些逻辑然后调用 `call_next()` 转发请求
3. 在响应阶段,可以修改响应,然后返回 
4. 注册中间件,全局使用 `app.middleware()`,基于路径使用 `app.middleware("path")`

示例:一个简单的全局中间件

```python
    async def simple_middleware(request: Request, call_next):
        print("Before request")
        response = await call_next(request)
        print("After response")
        return response
    
    app.middleware('http')(simple_middleware)  # 注册中间件
```

当请求到达之后,这个中间件会在路径操作函数执行前后打印日志。

基于路径的中间件:

```python
    async def require_api_key(request: Request, call_next):
        if request.headers.get("API-Key") != "secret":
            return PlainTextResponse("Bad API key", status_code=400)
        response = await call_next(request)
        return response  
    
    app.middleware('api')(require_api_key)  
```

这个中间件只对 `/api/*` 路径生效,校验 `API-Key` 头并拦截未授权的请求。

所以,总结来说,自定义中间件的主要步骤是:

1. 定义中间件函数,接收 `request`、`call_next` 和 `response` 参数
2. 在请求阶段执行逻辑并调用 `call_next()` 转发请求
3. 在响应阶段可以修改响应并返回
4. 注册中间件,全局或基于路径

使用中间件,我们可以实现诸如鉴权、请求日志、速率限制等公共功能,而不必在每个路径操作中重复逻辑。这大大简化了开发流程,也使应用更加模块化和服务化。

希望这个概览能帮助你理解 FastAPI 中间件的作用与实现方式。我们将在后续项目中分别实现上述的日志、鉴权和速率限制中间件,不断实践与提高。

## 异常处理与自定义异常

当 API 操作发生错误时,需要返回相应的错误信息给调用方。FastAPI 提供了便捷的异常处理机制,我们也可以自定义异常类型。

**内置异常处理**
FastAPI 自动处理以下异常:

- HTTPException - 返回HTTP响应,状态码与响应体
- ValidationError - 数据验证异常,返回400状态码
- FileNotFound - 文件路径不存在,返回404状态码

例如:

```python
    from fastapi import HTTPException
    
    @app.get("/items/{id}")
    async def get_item(id: int):
        if id > 10:
            raise HTTPException(status_code=404, detail="Item not found")
        ... 
```

这会返回 JSON 响应:

```json
    {
      "detail": "Item not found"
    }  
```

并HTTP状态码404。

**自定义异常**
我们可以定义自己的异常类型,FastAPI也会自动处理。例如:

```python
    class ItemNotFound(HTTPException):
        def __init__(self):  
            super().__init__(status_code=404, detail="Item not found")
    
    @app.get("/items/{id}")
    async def get_item(id: int):
        if id > 10:
            raise ItemNotFound()
        ...
```

FastAPI 会捕获该异常并返回404响应。我们也可以在该异常中包含自定的响应体,以返回更丰富的错误信息。

**异常处理中间件**  
我们也可以定义一个中间件来统一处理所有 uncaught exception,返回500响应。例如:

```python
    @app.middleware('http')
    async def catch_exception(request: Request, call_next):
        try:
            response = await call_next(request)
        except Exception as e:
            return Response({"detail": "Internal server error"}, status_code=500)
        return response
```

使用这个中间件,任何未处理异常都会返回标准的500响应。
所以,总结来说,FastAPI 异常处理的方式主要有:

1. 内置的异常捕获与处理 - HTTP异常等
2. 自定义异常类型,FastAPI 也会自动处理
3. 定义异常处理中间件,统一处理 uncaught exceptions

使用这几种方法,我们可以在 API 中抛出各种异常,并为调用方返回友好、标准的错误响应。这确保 API 的稳定性与健壮性。

我们需要在设计 API 时就考虑到所有的潜在异常情况,并选择相应的方式进行处理与响应。

希望这个概览能帮助你理解 FastAPI 的异常处理机制。我们会在后续项目中实践自定义异常与中间件,不断练习与提高。

## CORS 中间件配置

CORS(跨域资源共享)中间件允许我们的 API 被其他源(域)的客户端应用访问。
在 FastAPI 中,我们可以轻易地通过 `fastapi-corsmiddleware` 包添加 CORS 支持。

安装:

```bash
    pip install fastapi-corsmiddleware
```

配置:
在 FastAPI 应用中导入 `CORSMiddleware` 并注册为中间件:

```python
    from fastapi_corsmiddleware import CORSMiddleware
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # 支持所有源
        allow_credentials=True,  # 支持Cookie
        allow_methods=["*"],  # 支持所有HTTP方法
        allow_headers=["*"],   # 支持所有HTTP头
    )
```

这会允许来自所有源的请求访问我们的 API。

我们也可以设置更严格的源控制:

```python
    allow_origins=["http://example.com", "http://www.example.com"]
```

只允许 example.com 相关的源发起跨域请求。
实际开发中,我们通常会设置比较宽松的CORS策略,比如:

- 允许所有源(如上例)
- 允许所有二级域名下的源(如`*.example.com`)
- 预先注册允许的源列表

同时,也会根据实际业务需求控制:`allow_methods`、`allow_headers`等,达到一定的跨域安全性。

总结来说,要在 FastAPI 添加 CORS 支持主要是:

1. 安装 `fastapi-corsmiddleware` 包
2. 导入 `CORSMiddleware` 并注册为全局中间件
3. 设置 CORS 相关参数,如 `allow_origins`、`allow_methods`等
4. 根据实际需求允许部分或全部源发起跨域请求

CORS 中间件的配置对于开发面向浏览器的 Web 应用至关重要。我们需要在 API 设计初期就考虑到跨域情况,选择适当的策略与方式进行配置。

希望这个简单概览能帮助你理解 FastAPI 中 CORS 配置的方式与作用。我们将在后续前后端分离的项目中实践 CORS 相关内容,不断深入理解与运用。
