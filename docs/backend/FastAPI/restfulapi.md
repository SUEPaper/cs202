---
id: restful_api
sidebar_position: 3
---

# 设计 RESTful API

## RESTful API 简介

RESTful API 是一种软件架构风格,用于设计网络 API。REST 是 Representational State Transfer 的缩写,意思是"表现层状态转化"。
RESTful API 的主要特征有:

- 资源(Resources):网络上的一个实体,每个资源都有一个唯一的资源标识符(URL)。
- 表现层(Representation):资源的具体表现形式,比如 JSON、XML、HTML。
- 状态转化(State Transfer):即 HTTP 动词(GET、POST、PUT、DELETE)触发对资源的不同操作。
- 无状态(Stateless):请求之间没有状态依赖,所有的请求都包含请求所需要的信息。
- 缓存能力(Cacheable):响应可以被缓存,以改进性能。
- 分层系统(Layered System):代理和网关可以用于为系统添加额外的功能,如缓存、负载均衡、身份验证等。
- 统一接口(Uniform Interface):通过一组标准化的HTTP请求方法对资源的操作。

RESTful API 的优点:

- 性能高效:使用 HTTP 及其标准方法和状态代码。
- 灵活性高:API 简单、标准且易于理解,能够跨多种平台使用。
- 可扩展性高:REST 风格使更多设备和系统能够轻松地与API集成。
- 松散耦合:服务之间无状态和无忧,调用方和服务器之间独立且可互换。

目前,REST 已成为开发 Web API 的主流方法。很多知名的 API 服务都是 RESTful API,例如 Twitter、Github、微博等。
使用 RESTful API 可以轻松构建跨平台的应用,而且可以充分利用 HTTP 、HTML 等现有标准和协议。所以说,掌握 RESTful API 设计可以帮助我们开发出简洁、实用、易于理解的 API。

## FastAPI 中的资源和嵌套路由

在 FastAPI 中,你可以很简单地定义资源和嵌套路由。
定义资源,使用 `app.get()` 等装饰器:

```python
    @app.get("/items/")
    def read_items():
        ...
    
    @app.get("/items/{item_id}") 
    def read_item(item_id: int): 
        ...
```

这定义了两个资源:

- `/items/` 读取所有 items
- `/items/{item_id}` 读取某个特定的 item,其中 `item_id` 是路径参数

在路径中使用大括号 `{}` 定义路径参数,并使用类型注释指定参数类型,FastAPI 会自动进行校验。
定义嵌套路由,只需要在路径中添加斜线 `/`:

```python
@app.get("/items/{item_id}/")
def read_item(item_id: int): 
    ...

@app.get("/items/{item_id}/comments/")
def read_comments(item_id: int):
    ... 

@app.get("/items/{item_id}/comments/{comment_id}")
def read_comment(item_id: int, comment_id: int):
    ...
```

这定义了三个嵌套的资源:

- `/items/{item_id}/` 读取某个 item
- `/items/{item_id}/comments/` 读取该 item 的所有评论
- `/items/{item_id}/comments/{comment_id}` 读取该 item 的某个具体评论

FastAPI 会自动将这些路由组织成嵌套结构,并在 OpenAPI 文档中clearly显示出来。
所以,通过路径参数和嵌套路由,我们可以构建出表达丰富意思的 URL,定义清晰的资源结构。这可以让 API 的用户体验更佳,也有利于 SEO。
FastAPI 使定义这些 RESTful 风格的 URL 变得异常简单。希望这个简短示例能让你理解 FastAPI 中的资源和嵌套路由!

## 请求体（Request Body）与 Pydantic

在 FastAPI 中,你可以使用 Pydantic 对请求体(Request Body)进行校验和验证。
定义一个 Pydantic 模型来描述请求体:

```python
    from pydantic import BaseModel
    
    class Item(BaseModel):
        name: str
        price: float
        is_offer: bool = None
```

在请求参数中接收这些数据:

```python
    @app.put("/items/{item_id}")
    def update_item(item_id: int, item: Item):
        ...
```

FastAPI 会自动校验传入的请求体 `item` 是否符合 `Item` 模型的要求。
如果不符合,将返回一个验证错误响应,状态码为 422 Unprocessable Entity,内容如下:

```python
{
  "detail": [
    {
      "loc": [
        "body", 
        "name"
      ], 
      "msg": "field required", 
      "type": "value_error.missing"
    }
  ]
}
```

这会指明哪些字段欠缺或不正确,非常友好地指导 API 使用者纠正错误。

Pydantic 的一些主要特性:

- 从简单的类型注释中创建数据模型。
- 验证数据符合模型要求。
- 将不可靠的外部数据转换为清洁 validated_data。
- 创建类似 ORM 的模型,具有默认值、可选参数和多种关系。
- 轻松地将模型转为 JSON/Dict 并返回。

所以,通过 Pydantic 我们可以:

- 定义复杂的请求体和响应体模型。
- 轻松验证传入请求数据的正确性。
- 将模型转为 JSON 进行响应返回。
- 在 FastAPI 中使用类型提示直接将 Pydantic 模型用于请求体、响应体、查询参数等。

这使我们可以集中注意力在 API 的业务逻辑上,而不必烦恼数据验证和序列化问题,大大提高开发效率。
总而言之,Pydantic 和 FastAPI 深度集成,使我们可以专注于 API 的核心功能,编写简洁高效的代码。这是 FastAPI 之所以显著简化 API 开发的重要原因之一。
希望这个示例对你理解 Pydantic 和 FastAPI 的深度集成有所帮助!

## JSON、表单和文件上传处理

在 FastAPI 中,处理 JSON、表单和文件上传非常简单。

### JSON

由于 FastAPI 内建了 Pydantic 支持,所以处理 JSON 数据只需要定义一个 Pydantic 模型:

```python
    from pydantic import BaseModel
    
    class Item(BaseModel):
        name: str
        price: float
```

然后在请求参数中接收这个模型:

```python
    @app.put("/items/{item_id}")
    def update_item(item_id: int, item: Item):
        ...
```

FastAPI 会自动解析 JSON 数据,校验并验证是否符合模型,并将结果赋值给 item 参数。

### 表单

处理表单也类似,先定义一个 Pydantic 模型:

```python
    class Item(BaseModel):
        name: str
        price: float  
```

然后使用 Form 装饰器接收表单:

```python
    from fastapi import Form
    
    @app.post("/items/")
    def create_item(item: Item = Form(...)):
        ...
```

FastAPI 会自动解析表单数据,并验证是否符合模型要求。

### 文件上传

要接收上传的文件,首先需要安装 `python-multipart` :

```bash
    pip install python-multipart
```

然后定义一个 File 模型:

```python
    from fastapi import File
    
    @app.post("/files/")
    def upload_file(file: bytes = File(...)):
        ...  
```

上传的文件将作为 bytes 对象保存在 `file` 中。你可以使用标准文件操作进行保存等操作。
也可以在 `File()` 中指定:

- `filename` - 文件名称
- `content_type` - 文件 MIME 类型
- `max_size` - 最大文件大小(字节)

FastAPI 会自动处理文件上传和数据验证工作,我们只需要关注文件操作逻辑即可。
总之,借助 FastAPI 和 Pydantic,处理 JSON、表单和文件上传变得异常简单。我们只需要定义 Pydantic 模型,FastAPI 就会自动解析请求数据、进行验证和文件上传工作。
这使我们可以专注在 API 的核心业务逻辑上,极大提高开发效率。
希望这个示例对你进一步理解 FastAPI 如何简化各种数据交互有所帮助!

## 响应模型和数据序列化

在 FastAPI 中,使用 Pydantic 模型可以很容易定义响应模型和进行数据序列化。

定义一个 Pydantic 模型作为响应模型:

```python
    from pydantic import BaseModel
    
    class Item(BaseModel):
        name: str
        price: float
```

在视图函数中直接返回该模型:

```python
    @app.get("/items/{item_id}", response_model=Item)  
    def read_item(item_id: int) -> Item:
        ...
        return item
```

FastAPI 会自动序列化 `item` 为 JSON,并在响应中返回:

```json
    {
      "name": "Foo",
      "price": 42.0 
    }
```

也可以在模型中定义响应头等:

```python
    class Item(BaseModel):
        name: str 
        price: float 
        
        class Config:
            allow_population_by_alias = True
            schema_extra = {
                "example": {
                    "name": "Foo",
                    "price": 42.0
                }
            }  
```

这会在 OpenAPI 文档中添加 example 示范响应。

还可以排除某些字段:

```python
    @app.get("/items/", response_model=List[Item], response_model_exclude={"name"})
    def read_items() -> List[Item]:
        ...
```

这会在 JSON 响应中排除 `name` 字段。

通过设置 `response_model=None`,可以返回无模型的响应:

```python
    @app.delete("/items/{item_id}", response_model=None) 
    def delete_item(item_id: int):
        ...
```

这会返回标准的 204 No Content 响应。

所以,通过 Pydantic 模型,我们可以:

- 轻松定义复杂的响应模型和例子。
- FastAPI 会自动序列化模型为 JSON 并在响应中返回。
- 可以灵活地控制哪些字段包含或排除在响应中。
- 也可以直接返回无模型的响应。

这使得数据序列化变得异常简单,我们只需要定义模型,FastAPI 就会处理响应返回的全部逻辑。
这使我们可以专注于 API 的核心逻辑,真正做到关注点分离,编写高质量的 RESTful API。
希望这个示例能进一步帮助你理解 FastAPI 中 Pydantic 模型和数据序列化的强大功能。

## 自定义响应头和状态码

在 FastAPI 中,你可以很容易地自定义响应头和状态码。

### 自定义响应头

要自定义响应头,只需要在 Pydantic 模型的 Config 中定义:

```python
    class Item(BaseModel):
        name: str
        price: float
    
        class Config:
            allow_population_by_alias = True
            schema_extra = {
                "example": {
                    "name": "Foo",
                    "price": 42.0
                }
            }
    
    @app.get("/items/{item_id}", response_model=Item)
    def read_item(item_id: int) -> Item:
        ...
        return item
```

这会在响应中添加:

- `X-Example`: 由 `schema_extra` 定义的例子数据

你可以定义任意自定义响应头。FastAPI 会自动在响应中包含这些头信息。

### 自定义状态码

要自定义响应状态码,只需要在视图装饰器中指定:

```python
    @app.get("/items/{item_id}", status_code=200)
    def read_item(item_id: int) -> Item:
        ...
```

这会使该路由返回 200 OK 状态码。
你可以指定的状态码包括:

- 200 成功
- 201 已创建
- 204 无内容
- 400 错误请求
- 401 未授权
- 403 禁止访问
- 404 未找到
- 422 未能处理
- ...

所以,通过这两种简单方法,我们可以完全控制 FastAPI 响应的头信息和状态码。
这使得自定义复杂的响应逻辑变得异常简单。我们只需要在 Pydantic 模型或视图装饰器中进行简单配置,FastAPI 就会自动处理响应返回的全部逻辑。
希望这个简短示例能让你理解如何在 FastAPI 中灵活定制响应头和状态码。

## 实现 CRUD 操作的 API

以下是一个实现简单 CRUD 操作的 FastAPI 示例:

```python
    from fastapi import FastAPI
    from pydantic import BaseModel
    
    app = FastAPI()
    
    # 定义模型
    class Item(BaseModel):
        id: int
        name: str
        price: float
    
    # 存储数据
    items = [
        {
            "id": 1,
            "name": "Apple", 
            "price": 5.99
        },
        {
            "id": 2,
            "name": "Orange",
            "price": 3.49
        } 
    ]
    
    # 读取所有 items
    @app.get("/items/")  
    def read_items():
        return items
    
    # 读取一个 item
    @app.get("/items/{item_id}")
    def read_item(item_id: int):
        for item in items:
            if item["id"] == item_id:
                return item 
    
    # 创建新的 item
    @app.post("/items/")
    def post_item(item: Item):
        item.id = len(items) + 1
        items.append(item.dict())
        return item
    
    # 更新一个 item
    @app.put("/items/{item_id}")
    def put_item(item_id: int, item: Item):
        for i, it in enumerate(items):
            if it["id"] == item_id:
                items[i] = item.dict()  
                return item
    
    # 删除一个 item  
    @app.delete("/items/{item_id}")
    def delete_item(item_id: int):
        for i, item in enumerate(items):
            if item["id"] == item_id:
                items.pop(i)
                return {"message": f"Deleted item with id {item_id}"}
```

这个示例实现的主要功能包括:

- 定义模型 Item 代表项目
- 以列表的形式储存示例数据 `items`
- `/items/` 读取所有items
- `/items/{item_id}` 读取一个item
- `/items/` 创建一个新的item
- `/items/{item_id}` 更新一个item
- `/items/{item_id}` 删除一个item

运行这个应用,你可以通过这些端点对 items 进行 CRUD 操作。FastAPI 会自动生成 OpenAPI 文档,方便使用和测试。
所以,通过 FastAPI 我们可以非常简练地实现一个完整的 CRUD REST API。主要工作就是定义几个装饰器和 Pydantic 模型,FastAPI 就会自动生成文档、验证数据、序列化响应等等,使我们可以专注在 API 本身的业务逻辑上。
希望这个示例对你进一步理解 FastAPI 如何简化 REST API 开发有所帮助!
