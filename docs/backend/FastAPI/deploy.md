---
id: deploy
sidebar_position: 11
---

# 应用部署

## FastAPI 应用部署方法

开发完成的 FastAPI 应用,我们需要将其部署到服务器上,以供外部访问调用。主要的部署方式有:

1. Uvicorn + Gunicorn
2. Docker 容器化部署
3. uWSGI

## 使用 Uvicorn、Gunicorn 或其他 ASGI 服务器部署

FastAPI 是一个 ASGI 框架,需要配合 ASGI 服务器来部署应用。常用的 ASGI 服务器有:

- Uvicorn - 轻量级,用于开发
- Gunicorn - 生产可部署,可管理多 Uvicorn 工作进程
- Daphne - Channels 项目默认服务器
- Hypercorn - 性能较高,生产可用

这里我们主要介绍 Uvicorn 和 Gunicorn 的使用。

**Uvicorn**
Uvicorn 是一个轻量级的 ASGI 服务器,主要用于开发环境。
安装:

```bash
    pip install uvicorn
```

运行 FastAPI 应用:

```bash
    uvicorn main:app
```

`main:app` 是 FastAPI 应用的路径与对象名。
可以通过 `http://127.0.0.1:8000` 访问。

支持以下参数:

- `--port` - 指定端口,默认8000
- `--host` - 绑定访问IP,默认127.0.0.1
- `--reload` - 代码更新自动重载
- `--workers` - 工作进程数,用于部署
适用于本地开发与小型部署,无法很好支持高并发场景。

**Gunicorn**
Gunicorn 是一个 WSGI 服务器,可以管理多个 Uvicorn 工作进程。适用于生产部署。

安装:

```bash
    pip install gunicorn
```

运行:

```bash
    gunicorn --bind 0.0.0.0:8000 main:app --reload --workers 4 
```

这会启动4个 Uvicorn 工作进程来处理请求。
通过 `http://xn--ip-fr5c86lx7z:8000` 访问。
支持的参数:

- `--bind` - 访问地址
- `--workers` - 工作进程数
- `--threads` - 每进程线程数
- `--timeout` - 请求超时时间
- `--reload` - 代码更新自动重载

可以轻松部署在常见云服务器上,并发性较高,但无法满足超高并发场景。这需要配合更高级的部署架构,如Docker集群等。

总结来说,FastAPI 应用部署的 ASGI 服务器主要有:

- Uvicorn - 轻量级,用于开发,小型部署
- Gunicorn - 生产部署,管理 Uvicorn 进程,并发性较高
- Hypercorn - 性能较高,也可用于生产

选用何种方式取决于实际项目规模与需求。但一般来说,Gunicorn 可以满足绝大部分中小型部署场景。Uvicorn 更适用于本地开发。

**Docker 容器化部署**
Docker 可以将 FastAPI 应用打包成镜像,然后在容器中运行。这种部署方式可以轻易支持高可用与负载均衡。
步骤:

1. 编写 Dockerfile

```dockerfile
    FROM python:3.7-slim
    
    WORKDIR /app
    
    COPY . .
    
    RUN pip install -r requirements.txt
    
    CMD ["gunicorn", "--bind", "0.0.0.0:8000", "main:app"]
```

2. 构建镜像

```bash
    docker build -t myfastapiapp:latest . 
```

3. 运行容器

```bash
    docker run -d -p 8000:8000 myfastapiapp
```

4. 应用可以通过 http://server_ip:8000 访问
5. 配合 Nginx 反向代理和负载均衡使用

这种部署方式具有很高的可扩展性,是生产环境下的首选方式。我们可以轻松实现高可用部署与自动扩缩容。

综上,FastAPI 应用的主要部署方式是:

1. Uvicorn + Gunicorn - 用于小型部署,方便快速上线
2. Docker 容器化 - 用于生产环境,高可扩展与高可用

我们需要根据实际项目情况选择适合的方式。Docker 部署可以支持绝大部分场景,是深入学习与实践的重点。

希望这个部署方式概览能帮助你理解 FastAPI 应用的部署方法。我们将在后续项目中实践 Docker 部署,不断深入与提高。
