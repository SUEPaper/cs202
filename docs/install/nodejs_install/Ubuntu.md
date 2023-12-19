---
id: Ubuntu
sidebar_position: 2
---

# Ubuntu Linux 安装

:::caution

_非常重要，请仔细阅读完本文以后再进行相关操作。（因未仔细阅读完本文，出现任何错误后果自负， 逃～～～逃～～～逃_

`作为一个成熟的Linux用户，其实你应该知道怎么安装Node.js。`

:::

## 安装 Node.js

在命令行中输入如下命令：

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```

验证是否安装成功，输入如下命令：

```bash
node -v
```

如果返回版本信息，则说明安装成功。

## npm 国内镜像加速

由于众所周知的原因，在中国大陆使用 npm 过程中经常会遇到无法下载包的问题。

```bash
npm config set registry https://registry.npmmirror.com
```

验证是否配置成功，输入如下命令：

```bash
npm config get registry
```

如果返回 `https://registry.npmmirror.com`，说明镜像配置成功。
