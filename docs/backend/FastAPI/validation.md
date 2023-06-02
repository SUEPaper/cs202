---
id: validation
sidebar_position: 4
---

# 数据验证和转换

## Pydantic 模型与字段验证

在 FastAPI 中,使用 Pydantic 可以很容易地对数据进行验证和转换。

Pydantic 通过类型注释来验证和转换数据。定义一个基本模型:

```python
from pydantic import BaseModel

class Item(BaseModel):
    id: int
    name: str
    price: float = 10.2
```

这会验证传入数据中的 `id` 为整数,`name` 为字符串,`price` 为浮点数且默认值为 10.2。

例如,传入无效数据:

```python
item = Item(id=1, name="Apple", price="invalid")
```

会得到一个验证错误:

```bash
ValueError: Value 'invalid' is not a valid float.
```

Pydantic 还支持更丰富的验证,如:

:::note

- `min_length` / `max_length` 字符串长度限制
- `regex`正则表达式验证
- `min_value` / `max_value` 数值限制
- `email` 邮件地址验证
- `url` URL 验证
- `conform` 自定义验证函数
- 等等

:::

例如:

```python
class Item(BaseModel):
id: int 
name: str = None
description: str = Field(None, min_length=10)
price: float = Field(..., gt=0, lt=100) 
```

这会:
:::note

- 验证 `description` 至少10个字符
- 验证 `price` 大于0小于100
- `name` 为可选项,默认为None
:::

:::info
所以,通过 Pydantic 我们可以对传入的数据进行严格的验证和转换,确保数据格式正确和符合我们的预期。这使我们可以放心地在 FastAPI 中处理这些数据,专注于 API 的业务逻辑,而不必担心各种格式错误导致的问题。

Pydantic 的这一数据验证功能是 FastAPI 可以专注于业务逻辑的重要基础,使其成为一款高效友好的 Web 框架。

:::

希望这个简短示例能帮助你理解 Pydantic 如何通过类型注释实现强大的数据验证。

## 自定义验证器（validator）

在 Pydantic 中,你可以很容易地编写自定义验证器(validator)来验证数据。

例如,要验证字符串只包含数字,可以编写这样的 validator:

```python
from pydantic import BaseModel, validator

class Item(BaseModel):
    id: int 
    name: str
    
    @validator('name')
    def name_only_digits(cls, v):
        assert v.isdigit(), 'must contain only digits'
        return v
```

这个 validator 被应用于 `name` 字段,会验证其只包含数字,否则抛出验证错误。

使用方法:

```python
item = Item(id=1, name="1234")  # 成功
item = Item(id=1, name="abc")   # 失败,引发验证错误
```

你还可以编写更复杂的 validator,例如:

:::note

- 联合验证几个字段
- 基于数据库或其它外部资源进行验证
- 自定义错误消息
- 等等
:::

validator 的基本结构是:

```python
@validator('field_name', 'other_field')  # 要验证的字段
def validator_name(cls, v, values):   # v 为该字段值,values 为模型中所有值
    ...
    assert ...  # 进行验证
    ...
    return v   # 返回验证后的值
```

此外,你还可以定义:

:::note

- `@root_validator` 用于验证整个模型
- `@pre_root_validator` 和 `@post_root_validator` 在 `@root_validator` 之前和之后执行
:::

:::info
所以,通过自定义 validator,我们可以实现复杂的验证逻辑,确保传入 Pydantic 模型中的数据符合我们的预期和业务规则。

这使我们可以将大部分数据验证工作转交给 Pydantic 进行,真正做到关注点分离,专注于 API 的核心功能。
:::
希望这个简短示例能帮助你理解如何在 Pydantic 中编写自定义验证器。Pydantic 的这一功能是其成为 Python Web 框架的数据验证基础的重要原因之一。

## 数据转换与别名

Pydantic 不仅可以验证数据,还可以对数据进行转换和别名设置。

**数据转换**

例如,我们希望 `id` 字段传入为字符串,但在模型中作为整数使用。可以这样定义:

```python
from pydantic import BaseModel

class Item(BaseModel):
    id: int
    
    @validator('id')
    def validate_id(cls, v):
        return int(v)
```

这样,即使传入的 `id` 是字符串,它也会被转换为整数:

```python
item = Item(id='1')
print(item.id)  # 1 
```
:::info
Pydantic 支持各种数据转换,我们只需要编写简单的 validator 即可。

这使我们可以在 API 中接收各种格式的数据,但在后续处理中总是以我们期望的格式使用这些数据,非常便利。

:::
**别名**

我们还可以为字段设置别名,以便序列化和反序列化时使用别名。例如:

```python
class Item(BaseModel):
id: int
product_name: str = Field(alias='name')
```

这里我们给 `product_name` 设置了别名 `name`。这样:

:::note

- 反序列化时,`name` 也会被接受并设置到 `product_name`
- 序列化为 JSON/Dict 时,会使用别名 `name`

:::

因此,我们可以这样使用:

```python
item = Item(id=1, name="Apple")  # 使用别名
print(item.product_name)  # Apple

print(item.dict())  # {'id': 1, 'name': 'Apple'}  # 序列化也使用别名
```

所以,通过 Pydantic 我们可以:
:::note

- 轻松编写自定义 validator 实现各种数据转换。
- 为模型字段设置别名,简化序列化和反序列化。

:::
:::info
这使我们可以在 API 中接收和返回各种格式的数据,但在处理逻辑中总是使用我们常用和习惯的格式,真正做到格式解耦,提高开发效率。
:::
希望这个简短示例能够帮助你进一步理解 Pydantic 除验证数据之外的强大功能。Pydantic 的这些高级功能使其成为 Python 最流行的数据验证方案之一。
