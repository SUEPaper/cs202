---
id: "Todo Application"
sidebar_position: 1
---

# 学前介绍

欢迎来到FastAPI教程系列。该系列是基于TODOApplication项目的 教程，我们将在其中构建cooking API方法。每篇文章都会逐渐添加更复杂的功能，展示 FastAPI 的功能，并以一个逼真的、生产就绪的 REST API 结束。该系列旨在按顺序遵循，请同学们耐心学习。

下面我们会介绍在开始之前必要的一些准备。

:::tip 提示
在大多数情况下，Python安装时会自动附带pip包管理工具。然而，如果你在安装Python时未选择安装pip或者需要手动安装pip，可以按照以下步骤进行安装：

1. 首先，确保你已经安装了Python。可以在终端或命令提示符中运行以下命令来检查是否安装了Python：

```bash
python --version
```

2. 如果显示Python的版本号，则表示已经安装了Python。

下载 `get-pip.py` 脚本。可以在 `https://bootstrap.pypa.io/get-pip.py` 下载该脚本。你可以在浏览器中打开该链接，然后将页面上的内容保存到一个名为 `get-pip.py` 的文件中。

3. 打开终端或命令提示符，切换到包含 `get-pip.py` 文件的目录。

4. 运行以下命令来安装pip：

```bash
python get-pip.py
```

这将运行 `get-pip.py` 脚本，并安装pip包管理工具。

5. 安装完成后，可以使用以下命令来验证pip是否成功安装：

```bash
pip --version
```

如果显示pip的版本号，则表示pip已成功安装。

注意：如果你使用的是Python 3.4 版本或更高版本，那么pip可能已经随着Python的安装自动包含在内。你可以直接尝试在终端或命令提示符中使用pip命令来验证是否安装了pip。
:::

:::warning 注意
开始项目之前，确保你已经下载并安装好了vscode编辑器，并且安装好了相应的python扩展。

要想使用 Fast API ，首先请保证你的Python版本在3.6+。
:::
