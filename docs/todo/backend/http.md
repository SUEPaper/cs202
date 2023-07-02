---
id: http
sidebar_position: 1
---

# HTTP方法和状态码

了解API可以执行哪些任务，以及为正确的任务选择正确的HTTP方法是非常重要的。

有5种常见的HTTP方法，分别是GET，POST，PUT，PATCH和DELETE，可以用来管理资源的状态。

- GET: 检索已有资源（只读）
- POST: 创建新资源
- PUT: 更新已有资源
- PATCH: 部分更新已有资源
- DELETE: 删除资源
  
处理完一个使用HTTP方法的请求后，响应中会包含一个HTTP状态码。通常来说，状态码的含义如下，

- 2xx: 操作成功
- 3xx: 重定向
- 4xx: 客户端错误
- 5xx: 服务器错误

完整的状态码列表可以在[维基百科](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)里找到。查看状态码以确保操作成功执行，或者如果出现错误进行调试，并向用户返回适当的结果，这是非常重要的。