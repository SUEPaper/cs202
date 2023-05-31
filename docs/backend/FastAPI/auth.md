---
id: auth
sidebar_position: 5
---

# 身份验证和授权

## 基本身份验证（Basic Auth）

在 FastAPI 中,你可以很容易地实现基本身份验证(Basic Auth)。

使用 `HTTPBasic` 认证类来验证用户名和密码:

```python
    from fastapi import Depends, FastAPI, HTTPException, status
    from fastapi.security import HTTPBasic, HTTPBasicCredentials
    
    app = FastAPI()
    security = HTTPBasic()
    
    def verify_password(credentials: HTTPBasicCredentials):
        username = credentials.username
        password = credentials.password
        # 在这里你要验证用户名和密码 
        if username == "test" and password == "test": 
            return True
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, 
                detail="Incorrect username or password"
            )
    
    @app.get("/items/")
    def read_items(credentials: HTTPBasicCredentials = Depends(security)):
        verify_password(credentials)
        # 验证成功后可以访问该路由
```

使用方法:

在调用该 API 时,需要在 Authorization 头中提供 base64 编码的 用户名:密码:

```dax
    Authorization: Basic dGVzdDp0ZXN0
```

如果用户名和密码正确,则可以访问 `/items/` 路由。否则会返回 401 未授权响应。

所以,通过 `HTTPBasic` 认证类,我们可以轻松实现基本身份验证,保护 FastAPI 应用中的敏感路由。
主要步骤是:

- 定义一个 verify_password 函数来验证用户名和密码。
- 使用 Depends 将 verify_password 函数关联到 security 认证类中。
- FastAPI 会自动检查传入请求的 Authorization 头,并调用 verify_password 函数进行验证。
- 验证成功后允许访问路由,否则返回 401 响应。

这使我们可以非常简单地为 FastAPI 应用添加基本的身份验证和访问控制机制,提高安全性。
希望这个简短示例能帮助你理解如何在 FastAPI 中实现基本身份验证。FastAPI 为身份验证和授权提供了丰富的支持,我们将在后续示例中进一步学习。

## OAuth2 和 JWT 令牌

在 FastAPI 中,你可以轻松实现 OAuth2 和 JWT 令牌认证。这里我们主要介绍 OAuth2 密码授权流的实现。

安装 `python-jose` 和 `passlib` 用于 JWT 和密码加密:

```dax
    pip install python-jose[cryptography] passlib[bcrypt]
```

定义用户模型和加密密码:

```python
    from passlib.context import CryptContext
    
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    
    users = {
        "test": {
            "username": "test",
            "hashed_password": pwd_context.hash("test"),
            "full_name": "Test User"
        } 
    }
```

定义获取 JWT 令牌的路径:

```python
    from fastapi import Depends, FastAPI, HTTPException, status
    from fastapi.security import OAuth2PasswordRequestForm
    from jose import jwt, JWTError
    
    SECRET_KEY = "secret"
    ALGORITHM = "HS256"
    
    @app.post("/token")
    def login(form_data: OAuth2PasswordRequestForm = Depends()):
        user = authenticate_user(form_data.username, form_data.password)
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
        access_token = create_access_token(user["username"])
        return {"access_token": access_token, "token_type": "bearer"} 
```

该路径接收用户名和密码,如果正确则生成 JWT 令牌返回。

定义验证 JWT 令牌的路径:

```python
    def verify_password(credentials: str = Header(...)): 
        ...
    
    @app.get("/items/") 
    def read_items(user=Depends(verify_password)): 
        ... 
```

这会在 `Authorization` 头中检查 `Bearer` 令牌,如果有效则允许访问该路由。
所以,通过这些机制,我们实现了一个完整的 OAuth2 密码授权流认证系统:

- 定义用户信息和加密密码
- `/token` 路径验证用户名密码,并返回JWT令牌
- 使用 `Depends` 装饰器将令牌验证函数与路由绑定
- FastAPI 会自动检查 `Authorization` 头中的令牌并调用验证函数
- 如果令牌有效,允许访问路由,否则返回401响应

这使我们可以轻松为 FastAPI 应用添加 OAuth2 和 JWT 令牌认证支持,实现更高级的身份验证和访问控制逻辑。
希望这个示例能帮助你理解 FastAPI 中 OAuth2 和 JWT 认证的实现。我们将在后续继续深入探讨 FastAPI 的安全机制。

## 依赖项注入系统（Depends）

在 FastAPI 中,依赖项注入系统(`Depends`)是一个非常强大的功能。

它允许你将依赖项(函数、类等)作为参数注入到路径操作函数或其他依赖项中。这使我们可以更易于复用逻辑并解耦应用。

一个简单示例:

```python
    from fastapi import Depends, FastAPI
    
    app = FastAPI()
    
    def query_extractor(q: str): 
        return q
    
    def query_or_default(q: str = None): 
        if q:
            return q 
        return "default"
    
    @app.get("/items/")
    def read_items(query: str = Depends(query_or_default)): 
        return query_extractor(query) 
```

这里我们有:

- `query_extractor` - 一个提取查询字符串的函数
- `query_or_default` - 一个检索查询字符串或返回默认值的函数,我们使用 `Depends` 将其设置为依赖项
- `read_items` 路径操作函数接收 `query` 参数,该参数的值来自 `query_or_default` 依赖项

所以,实际执行过程是:

- 调用 `/items/` 路径
- FastAPI 调用 `query_or_default` 函数获取 `query` 的值
- `query` 的值作为参数传递给 `read_items` 函数
- `read_items` 内部调用 `query_extractor` 函数使用该值

`Depends` 允许我们将常用的逻辑抽出为依赖项,然后在多处重复使用,这大大提高了代码重用性和可维护性。

此外,依赖项可以是:

- 路径操作参数
- 其他依赖项的参数
- 类方法(通过 `Depends(SomeClass.method)`)

我们还可以编写高阶依赖项——接收其他依赖项作为参数的依赖项。
所以,通过 `Depends` 系统,我们可以构建出一个灵活的依赖关系网,将应用逻辑解耦为可重用的模块。这是 FastAPI 之所以简洁高效的重要原因之一。
希望这个简短示例能帮助你理解 FastAPI 的依赖项注入系统。

## 用户权限和角色控制

在 FastAPI 中,你可以轻松实现基于角色的访问控制。这里我们介绍一种简单方法。

定义用户角色模型:

```python
    from enum import Enum
    
    class UserRole(str, Enum):
        admin = "admin"
        moderator = "moderator"
        user = "user"
```

我们定义了 `admin`、`moderator` 和 user 三个角色。

存储用户与角色的映射:

```python
    users = {
        1: {
            "username": "john",  
            "role": UserRole.admin
        },
        2: {
            "username": "jane",
            "role": UserRole.moderator
        },
        3: {        
            "username": "jack",
            "role": UserRole.user
        }
    } 
```

获取当前登录用户的角色:

```python
    from fastapi import Depends, Header, HTTPException
    
    async def get_current_user(token: str = Header(None)):
        if token is None:
            raise HTTPException(status_code=400, detail="Invalid authentication token") 
        return users[int(token)]
    
    async def get_current_user_role(user=Depends(get_current_user)): 
        return user["role"] 
```

这会从 `Authorization` 头的令牌中获取当前用户,并返回其角色。

在路径操作函数中检查用户角色:

```python
    from fastapi import FastAPI
    
    app = FastAPI()
    
    @app.get("/admin/", dependencies=[Depends(is_admin)])    
    def admin_items(): 
        ...
    
    @app.get("/moderator/", dependencies=[Depends(is_moderator)])  
    def mod_items():
        ...   
    
    def is_admin(role=Depends(get_current_user_role)):
        assert role == UserRole.admin, "Admin access required"
    
    def is_moderator(role=Depends(get_current_user_role)):
        assert role == UserRole.moderator, "Moderator access required"  
```

这里我们编写了检查用户角色的依赖项,并在路径操作函数中使用 `dependencies` 参数将其绑定,这样只有当角色符合要求时才会执行相应路径操作函数。  
所以,通过这种简单机制,我们实现了 FastAPI 应用的基于角色访问控制:

- 定义用户角色 Enum 类
- 存储用户与角色映射
- 获取当前登录用户的角色
- 编写检查角色的依赖项
- 在路径操作函数中绑定这些依赖项
- 只有当角色经依赖项验证后,路径函数才会被执行

这使我们可以灵活地基于用户角色控制 FastAPI 应用的访问权限,提高安全性。
希望这个简短示例能帮助你理解如何在 FastAPI 中实现基于角色的访问控制。我们将在后续继续深入学习更高级的 FastAPI 权限和授权机制。
