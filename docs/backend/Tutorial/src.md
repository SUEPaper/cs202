---
id: "src"
sidebar_position: 4
---

# SRC查询参数

本节内容，我们会定义具有查询参数的API,并对其进行测试，为此我们在第二节的`main.py`文件中进行小部分修改：

:::note 步骤

1. 这里我们需要导入一个新的包：

```python
from typing import Optional
```

2. 我们创建了一个新的端点。请注意，它没有路径参数，我们 在第 2 部分中查看`GET/search/`

3. 该函数定义新终结点的逻辑。其 参数表示终结点的查询参数。有两个参数：和 。这意味着具有这两个查询参数的（本地）查询 可能如下所示：search_recipeskeywordmax_resultshttp://localhost:8001/search/?keyword=chicken&max_results=2

```python
# 2 new addition, query parameter
@api_router.get("/search/", status_code=200)  # 3
```

将上述代码插入带参数路由资源之后。

4. 请注意，对于每个参数，我们指定其类型和默认值。两者都是 来自 Python 标准库模块。FastAPI能够使用这些本机 Python 类型声明来理解不需要设置参数（如果我们想要的话） 参数是强制性的，我们将省略`OptionaltypingOptional`

5. 这两个参数还有一个默认值，通过符号指定，例如，查询参数默认值为 。如果未在请求中指定这些参数，则默认 将使用值。`=max_result10`

```python
def search_recipes(
    keyword: Optional[str] = None, max_results: Optional[int] = 10  
) -> dict:
    """
    Search for recipes based on label keyword
    """
    if not keyword:
        # we use Python list slicing to limit results
        # based on the max_results query parameter
```

6. 我们使用 Python 列表切片来实现一些基本的搜索功能来限制结果

7. 我们使用 Python 过滤器功能 在我们的玩具数据集上进行非常基本的关键字搜索。搜索完成后，数据将被序列化 通过框架到 JSON。

```python
return {"results": RECIPES[:max_results]}  # 6

    results = filter(lambda recipe: keyword.lower() in recipe["label"].lower(), RECIPES)  # 7
    return {"results": list(results)[:max_results]}

# skipping...
```

最后点击运行。
:::

:::info 访问
导航到位于localhost:8000/docs

尝试使用终结点：

- 通过单击展开 GET 端点
- 点击“试用”按钮
- 为关键字输入值“chicken”
- 按下大的“执行”按钮
- 按出现的较小的“执行”按钮

![](img/S1.png)

按下按钮（只是通过引擎盖下的卷曲发出请求）后，您 可以向下滚动以查看来自 FastAPI 的响应：`executeGET`

请注意，只返回了两个鸡肉食谱。使用关键字重试以查看 “花椰菜豆腐咖喱”食谱回归。然后尝试调整参数。`cauliflowermax_results`
:::

在本教程的下一部分中，我们将介绍使用 Pydantic 模型进行更高级的终结点输入和输出验证， 以及处理 POST 端点和请求正文数据。
