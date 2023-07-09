---
id: scoop
sidebar_position: 19
---

# Windows 包管理器 Scoop

## 为什么使用Scoop

在 Windows 下，搭建开发环境一直是一个复杂且困难的问题。由于没有一个统一的标准，导致各种开发环境的安装方式差异巨大，需要付出很多不必要的时间成本。而 Scoop 可以帮助你统一安装并管理常见的开发软件，省去了手动下载安装，配置环境变量等繁琐步骤。

例如安装 python 和 nodejs 只需要执行：

```bash
scoop install python
scoop install nodejs
```

## 安装 Scoop

Scoop 需要 [Windows PowerShell 5.1](https://aka.ms/wmf5download) 或者 [PowerShell](https://aka.ms/powershell) 作为运行环境，如果你使用的是 Windows 10 及以上版本，Windows PowerShell 是内置在系统中的。而 Windows 7 内置的 Windows PowerShell 版本过于陈旧，你需要手动安装新版本的 PowerShell。

:::tips

由于发现很多同学在设置 Windows 用户时使用了中文用户名，导致了用户目录也变成了中文名。如果按照 Scoop 的默认方式将软件安装到用户目录下，可能会造成部分软件执行错误。所以这里推荐安装到自定义目录，如果需要其他安装方式请参考： [ScoopInstaller/Install](https://github.com/ScoopInstaller/Install)

:::

- 设置 PowerShell 执行策略

```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
- 下载安装脚本

```bash
irm get.scoop.sh -outfile 'install.ps1'
```
- 执行安装, --ScoopDir 参数指定 Scoop 安装路径

```bash
.\install.ps1 -ScoopDir 'C:\Scoop'
```

## Scoop
Scoop 的官方文档对于新手非常友好，相对于在此处赘述更推荐阅读
[快速入门](https://github.com/ScoopInstaller/Scoop/wiki/Quick-Start)。


## 课程编程开发环境安装

- 安装基础依赖 (7zip, git, aria2)

```bash
 scoop install https://cdn.jsdelivr.net/gh/duzyn/scoop-cn/bucket/7zip.json
```

```bash
 scoop install https://cdn.jsdelivr.net/gh/duzyn/scoop-cn/bucket/git.json
```

```bash
 scoop install https://cdn.jsdelivr.net/gh/duzyn/scoop-cn/bucket/aria2.json
```

- 安装 Python
  
```bash
scoop install python
```

- 安装 nodejs
  
```bash
scoop install nodejs
```
