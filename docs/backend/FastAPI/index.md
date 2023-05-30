---
id: index
sidebar_position: 17
---

# FastAPI 概述

## FastAPI 简介和历史

### FastAPI 简介

FastAPI 是一个现代的、快速的、基于标准Python类型注释的API框架。

它的主要特点有:

- 快速:它内建了基于标准Python类型注释的静态类型检查。这可以在开发时就捕捉许多错误,并得到编辑器的帮助。这也使得其性能接近于纯Python。
- 简单:它采用Python标准类型注释来定义类型。这使得开发简单且轻松。
- 可移植:它使用开放标准(OpenAPI),并与所有主要开发语言兼容。
- 可扩展:它设计成易于扩展和集成的,以适应复杂的需求。
- 健壮:它基于 Starlette 和 Pydantic,具有很强的校验、测试覆盖率和安全性。

### FastAPI 历史

- 2018年10月,FastAPI 0.1.0 发布。
- 2019年1月,FastAPI 0.3.0 发布,添加了 OpenAPI 支持。
- 2019年8月,FastAPI 0.5.0 发布,采用 Starlette 和 Pydantic,性能大幅提高。
- 2020年1月,FastAPI 0.6.0 发布,新增许多功能,包括:
  - 依赖注入
  - 后台任务
  - WebSocket 支持
  - 自定义响应
  - ...
- 2020年6月,FastAPI 0.61.0 发布,新增 OAuth2 密码模式和客户端模式支持。
- 2020年9月,FastAPI 0.63.0 发布,新增 OpenAPI UI 定制支持和 CORS 中间件。
- 2020年12月,FastAPI 0.65.0 发布,新增用于生成 Angular, React 等前端代码的 OpenAPI 客户端生成器。
- 2021年3月,FastAPI 0.66.0 发布,新增用于进行功能测试的 TestClient 类。
- 2021年6月,FastAPI 0.68.0 发布,新增静态文件支持和重定向中间件。
- 2021年9月,FastAPI 0.70.0 发布,移除了对 Python 3.7 以下版本的支持,提高依赖软件的最低版本要求。
- 直至2023年5月，FastAPI 0.95.2 已经发布，添加了部分国家的翻译，重构 2 个测试，以实现一致性和简化，重构 OpenAPI 测试，为 Pydantic v2 做准备。

除此之外:

- FastAPI 的社区继续高速增长,已超过 5.5k 订阅 和 600 贡献。
- 出现了许多 FastAPI 相关的库,包括数据库框架、认证方案、生产部署方案等。
- FastAPI 被选为 2021 年 The Rising Stars of Python Web Frameworks。
- FastAPI 的创始人 Sebastian Ramirez 发起了一个新的项目,叫 Typer,用于构建命令行接口。
可以说,FastAPI 已成为 Python 生态系统中最流行和活跃的 Web 框架之一。未来,它会继续快速发展,社区也会更加繁荣。

## FastAPI 的优势和应用场景

### FastAPI 主要优势

- 快速:FastAPI 基于 Starlette,性能极高,几乎接近于纯 Python。
- 简单:只需要使用 Python 标准类型注释,就可以定义架构。非常易于上手和使用。
- 安全:FastAPI 使用 OAuth2 密码模式和客户端模式进行认证,内建 CSRF 和 SQL 注入预防。
- 可移植:FastAPI 使用 OpenAPI,与所有主流编程语言和平台兼容。
- 可扩展:FastAPI 易于与其他框架和库集成,可以适应各种复杂的需求。
- 健壮:FastAPI 基于 Starlette 和 Pydantic,拥有良好的测试覆盖率和验证。

### FastAPI 主要应用场景

- API 开发:FastAPI 尤其适合开发 API 和后台服务,特别是数据密集型的 API。
- 微服务:FastAPI 非常适合构建微服务架构。
- 机器学习:FastAPI 易于与机器学习模型和库集成,用于构建机器学习 API。
- 桌面应用后端:FastAPI 可以用于开发桌面应用程序的后端和 API。
- 实时应用:FastAPI 内建 WebSocket 支持,非常适合构建实时应用程序后端。

总之,FastAPI 是一个全能型的 Web 框架,但由于其简单、快速和安全的特点,它尤其适合 API 开发、微服务和机器学习应用。它可用于生产环境,也很适合快速构建原型。

## FastAPI 与其他 Python Web 框架的对比（如 Flask 和 Django）

- 性能:FastAPI 与 Flask 相当,性能比 Django 高,因为 FastAPI 基于 Starlette（轻量级异步框架）,使用了 Uvicorn（异步Web服务器） 作为服务器。
- 简单易用:FastAPI 与 Flask 相当,比 Django 简单,因为 FastAPI 只需要使用 Python 类型注释即可定义模型和架构。
- 安全性:FastAPI 的安全性高于 Flask 和 Django,因为 FastAPI 内建了 CSRF（一种跨站请求伪造攻击方式） 预防、SQL 注入预防以及 OAuth2（一种授权框架） 认证支持。
- 规范性:FastAPI 遵循 OpenAPI 标准,这方面优于 Flask,但略逊于 Django REST framework（基于Django的又一种框架）。
- 异步支持：FastAPI 内置对异步编程的支持，使用 async/await（异步编程语法） 可以编写异步的请求处理函数。这使得 FastAPI 可以处理大量并发请求，同时保持响应性能。而 Flask 和 Django 主要是基于同步方式运行的，虽然它们也可以使用异步库或框架进行异步处理，但相对于 FastAPI 来说，异步支持没有那么原生和内置。
- 社区及生态:Django 的社区最为繁荣,Flask 次之,FastAPI 相对较小但增长迅速。生态系统也是这个顺序。
- 支持数据库:FastAPI 不包括ORM（对象关系映射是一种编程技术）,这方面不如 Flask-SQLAlchemy 和 Django ORM。但 FastAPI 易于集成外部 ORM。
- 部署:FastAPI 可以通过 Uvicorn 直接部署,也可以用 Gunicorn + Nginx（用于部署和扩展Python Web应用程序的工具） 部署,手动部署难度与 Flask 相近,较 Django 简单。
- 其他功能:FastAPI 支持依赖注入、后台任务、WebSocket（一种在Web应用程序中实现实时双向通信的协议） 等,Flask 仅部分支持,Django 支持更丰富。
总体来说,FastAPI 与 Flask 在简洁易用和灵活性上相当,超过 Django;在性能和安全上超过 Flask 和 Django。FastAPI 是一个全栈 Web 框架,能胜任绝大多数 Web 后台任务,尤其擅长 API 开发。但在复杂的 CMS（一种用于创建、编辑和管理网站内容的软件或工具） 或 ERP 系统（一种综合性的软件解决方案）,Django 会更合适。
Flask 和 Django 由于历史更长,生态更丰富,在很多企业应用中更加常见。但 FastAPI 以其出色的性能和简洁的语法正在迅速崛起,未来很有潜力在更多领域采用。
