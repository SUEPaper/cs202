---
id: MacOS
sidebar_position: 3
---

# MacOS 安装

## Homebrew 安装 git

:::note

Homebrew 是啥？请看[Mac 必备神器 Homebrew](https://zhuanlan.zhihu.com/p/59805070)

:::

在安装好 Homebrew 后, 命令行中输入如下命令就可以安装 git。

```bash
brew install node
```

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
