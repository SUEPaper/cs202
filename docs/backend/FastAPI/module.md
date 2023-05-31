---
id: module
sidebar_position: 9
---

# 路由分组和模块化

## 路由分组与 API 版本控制

在开发大型 API 项目时,将路由进行逻辑分组与模块化设计是很必要的。这可以:

- 降低 API 路径的混乱度,让路径更加清晰和规范
- 方便后期维护与新功能开发
- 可以更轻易地实现 API 版本控制

FastAPI 中我们可以使用 APIRouter 轻松实现路由分组与版本控制。

**路由分组**
我们可以这样定义路由:

```python
    users_router = APIRouter(prefix="/users")
    
    @users_router.get("/")
    def read_users():
        ...
    
    @users_router.post("/") 
    def create_user():
        ...
    
    posts_router = APIRouter(prefix="/posts")
    
    @posts_router.get("/")
    def read_posts():
        ...
    
    app.include_router(users_router)
    app.include_router(posts_router)
```

这会生成两个路由分组:

- `/users/*` 用于用户相关接口
- `/posts/*` 用于帖子相关接口

**API 版本控制**
我们可以这样实现两个 API 版本:

```python
    v1_router = APIRouter(prefix="/v1")     # 版本1路由
    
    @v1_router.get("/users/")
    def read_users_v1():
        ...
    
    v2_router = APIRouter(prefix="/v2")     # 版本2路由
    
    @v2_router.get("/users/")  
    def read_users_v2():
        ...  
    
    app.include_router(v1_router)  
    app.include_router(v2_router)
```

这会生成两个 API 版本:

- `/v1/users/` 用于 v1 版本的用户接口
- `/v2/users/` 用于 v2 版本的用户接口

调用方可以根据需求选择合适的版本进行调用。当我们需要对 API 进行重大更新时,可以发布新的版本而不是直接修改旧版本的接口。

这可以最大限度兼容接口调用方,而不会产生重复工程。
所以,总结来说,APIRouter 可以帮助我们在 FastAPI 中轻松实现:

- 路由分组 - 通过 prefix参数添加路径前缀,方便管理大量路由
- API 版本控制 - 可以定义多个router并设置不同版本前缀,同时包含在APP中

这两个功能对于开发大型、长期产品级 API 项目是必不可少的。有了这些功能,我们的 API 可以模块清晰,方便后续扩展,也可以稳定兼容调用方。

希望这个概览能帮助你理解 FastAPI 中的路由分组与 API 版本控制的作用与方式。我们将在后续项目中更加深入地实践这两种方法。

## 模块化应用结构

当 API 项目越来越大时,使用独立文件管理路由与模型是必要的。这可以:

1. 使代码结构更加清晰易读
2. 方便代码维护与新功能开发
3. 限制每个文件内容的复杂度,提高开发效率

FastAPI 支持使用包和子模块轻松实现应用的模块化结构。我们可以这样组织:

```Bash
project/
├── main.py        # FASTAPI 应用构建与路由注册
├── api/          # API模块
│   ├── v1/         # 版本1路由 
│   │   ├── users.py       
│   │   ├── posts.py
│   ├── v2/         # 版本2路由
│   │   ├── users.py  
│   │   └── posts.py  
│   └── __init__.py
└── models/       # 模型模块
    ├── user.py
    ├── post.py
    └── __init__.py
```

然后在 `api/v1/users.py` 中定义 v1 版本的用户路由:

```python
    from fastapi import APIRouter

    router = APIRouter(prefix="/users")

    @router.get("/")
    def get_users():
        ...

# 其他路由路径...
```

在 `models/user.py` 中定义用户模型:

```python
    from pydantic import BaseModel
    
    class User(BaseModel):
        ... 
```

最后,在 `main.py` 中注册路由:

```python
    from api.v1 import users, posts
    
    app.include_router(users.router)
    app.include_router(posts.router)
```

这样,我们的 API 就被划分为三个主体模块:

- api - 包含各个 API 版本的路由
- models - 包含所有数据模型
- main.py - 用于注册路由与启动应用

每个模块内部也遵循相同规则进一步拆分。这样的结构可以让我们在开发大型项目时心无旁骛,专注在当前文件内的设计与实现,而不用顾虑整体架构。

这也方便其他开发者理解与工作,限制文件的复杂度在一定范围内。

所以,总结来说,模块化可以让我们在开发 API 项目时:

1. 使整体结构清晰易理解
2. 限制每个模块或文件的复杂度,提高开发效率
3. 方便团队协作开发
4. 简化后期新增功能或业务需求

这是设计任何大型软件项目都应遵循的原则。
希望这个简单示例可以帮助你理解如何在 FastAPI 中实现模块化。我们将在后续各大实战项目中使用这种模式,不断优化与提高。

## 重用路径操作和参数

在开发 API 时,我们常常需要在多个路径操作中重用相同的路径参数、查询参数、请求体等。

FastAPI 提供了几种方式实现重用:

1. 通过函数实现重用路径操作 

我们可以这样定义一个函数,在多个路径操作中调用:

```python
    def get_query_params(q: Optional[str] = None):  
        ...
        return query_params
    
    @app.get("/users/") 
    async def get_users(query_params=get_query_params()):  
        ...
    
    @app.get("/posts/")
    async def get_posts(query_params=get_query_params()):  
        ...
```

这样,两个路径操作就共用了相同的 `query_params` 查询参数。

2. 在路径操作装饰器中重用路径参数

```python
    @app.get("/users/", response_model=List[User])
    @app.get("/posts/", response_model=List[Post])
    async def list_items(
        page: int = 1, 
        size: int = 100  
    ):  
        ...  
```

这里,两个路径操作共用 `page` 和 `size` 两个路径参数。

3. 使用路径参数默认值

```python
@app.get("/users/")  
    async def get_users(
        q: Optional[str] = None, 
        page: int = 1    
    ):  
        ...
    
    @app.get("/posts/")
    async def get_posts(q: Optional[str] = None): 
        ...
```

这里,`get_posts` 路径操作自动继承了 `get_users` 中 `page` 参数的默认值 `1`。

4. 路径操作函数重载

我们可以定义多个同名路径操作,FastAPI 会根据路径和方法选择正确的操作处理请求。例如:

```python
    @app.get("/items/")
    async def get_items():
        ...
    
    @app.post("/items/")  
    async def get_items():
        ...  
```

FastAPI 根据请求方法选择相应的 `get_items()` 执行。
所以,总结来说,FastAPI 通过以下主要方式实现路径操作与参数的重用:

1. 定义公共函数,在多个路径操作中调用
2. 在同一个路径操作装饰器中定义多个路径,共用参数
3. 设置路径参数的默认值,让其他路径操作自动继承
4. 路径操作函数重载,根据请求方法选择正确执行的操作

这些特性可以让我们在设计 API 时不必重复定义相同的参数或路径,大大简化开发过程。我们应该充分利用这些特性,设计更加简洁高效的 API。

希望这个概览能帮助你理解 FastAPI 中路径操作与参数重用的方式。我们将在后续项目中实践这几种方法,不断深入理解与运用。
