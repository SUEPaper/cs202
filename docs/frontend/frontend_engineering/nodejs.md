---
id: nodejs
sidebar_position: 3
---

# 工程化神器 Node.js

:::tip

非原创声明，只是进行适当修改，相关内容来源：
1. https://github.com/chengpeiquan/learning-vue3

:::


只要接触过现代Web前端开发，哪怕没有实际使用过，也应该有听说过 Node.js ，那么它是一个什么样的存在？

## 什么是 Node.js

Node.js （简称 Node ） 是一个基于 Chrome V8 引擎构建的 JS 运行时（ JavaScript Runtime ）。

它让 JavaScript 代码不再局限于网页上，还可以跑在客户端、服务端等场景，极大的推动了前端开发的发展，现代的前端开发几乎都离不开 Node 。

## 什么是 Runtime

Runtime ，可以叫它 “运行时” 或者 “运行时环境” ，这个概念是指，项目的代码在哪里运行，哪里就是运行时。

传统的 JavaScript 只能跑在浏览器上，每个浏览器都为 JS 提供了一个运行时环境，可以简单地把浏览器当成一个 Runtime ，明白了这一点，相信就能明白什么是 Node 。

Node 就是一个让 JS 可以脱离浏览器运行的环境，当然，这里并不是说 Node 就是浏览器。


:::tip 计算机科学中的Runtime

Runtime是指程序在运行时的状态和行为。在计算机编程中，runtime是指程序在实际运行中所表现出来的一种状态。它包括了程序的执行环境和执行状态，以及程序在运行时所产生的各种数据和结果。Runtime的概念在编程中非常重要，它关系到程序的正确性、稳定性和性能等方面。

在编程语言中，runtime通常是由编译器和运行时库共同实现的。编译器负责将源代码编译成可执行代码，而运行时库则负责在程序运行时提供各种运行时支持和服务。运行时库通常包括了各种系统库和标准库，以及一些特定于编程语言的库和框架。

1. C语言中，runtime的实现通常是由C库和操作系统共同提供的。C库提供了各种常用的函数和数据类型，而操作系统则提供了一些底层的系统调用和服务。
2. Java语言中，runtime的实现则是由Java虚拟机（JVM）和Java类库共同提供的。JVM负责将Java字节码编译成可执行代码，并提供各种运行时支持和服务，而Java类库则提供了各种常用的类和函数。

:::

## Node 和浏览器的区别

虽然 Node 也是基于 Chrome V8 引擎构建，但它并不是一个浏览器，它提供了一个完全不一样的运行时环境，没有 Window 、没有 Document 、没有 DOM 、没有 Web API ，没有 UI 界面…

但它提供了很多浏览器做不到的能力，比如和操作系统的交互，例如 “文件读写” 这样的操作在浏览器有诸多的限制，而在 Node 则轻轻松松。

对于前端开发者来说， Node 的巨大优势在于，使用一种语言就可以编写所有东西（前端和后端），不再花费很多精力去学习各种各样的开发语言。

哪怕仅仅只做 Web 开发，也不再需要顾虑新的语言特性在浏览器上的兼容性（ e.g. ES6 、 ES7 、 ES8 、 ES9 …）， Node 配合构建工具，以及诸如 Babel 这样的代码编译器，可以帮转换为浏览器兼容性最高的 ES5 。

当然还有很多工程化方面的好处，总之一句话，使用 Node 的开发体验会非常好。

在工程化的入门准备 一章中，会对 Node 开发做进一步的讲解，下面先继续顺着 Node 的工具链，了解与日常开发息息相关的前端构建工具。


## 安装 Node.js 环境

安装好命令行工具之后，来安装 Node 的开发环境。

### 下载和安装 Node

在 Node.js 官网提供了安装包的下载，不论是使用 Windows 系统还是 MacOS 系统， Node 都提供了对应的安装包，直接下载安装包并运行即可安装到的电脑里，就可以用来开发的项目了。

点击访问：[Node.js 官网下载](https://nodejs.org/zh-cn/download/)

安装后，打开的 [命令行工具](#命令行工具) ，输入以下命令即可查看是否安装成功：

```bash
node -v
```

如果已成功安装，会在控制台输出当前的 Node 版本号。

### 版本之间的区别

可以看到官网标注了 LTS 和 Current 两个系列，并且对应了不同的版本号。

#### Current 版本

Current 是最新发布版本，或者叫 “尝鲜版” ，可以在这个系列体验到最新的功能，但也可能会有一些意想不到的问题和兼容性要处理。

每六个月会发布一次 Current 大版本，新的偶数版本（ e.g. v16.x.x ）会在每年的 4 月份发布，奇数版本（ e.g. v17.x.x ）会在每年的 10 月份发布。

也就是说，所有版本都会有 Current 版本阶段，这个阶段会持续 6 个月的时间，期间会被活跃的维护和变更，在发布满 6 个月后，奇偶数版本会有不同的结果：

- 大版本号是奇数的，将变为不支持状态，不会进入 LTS 版本。
- 大版本号是偶数的，会按照发布节点进入 LTS ，并且作为活跃状态投入使用。

:::tip
除非是狂热的 Node 开发探索者，否则不应该选择 Current 系列（特别是在生产环境），应该选择未被 EOL 的 LTS 系列作为的项目运行环境，详见下方的 [LTS 版本](#lts-版本) 说明。
:::

#### LTS 版本

LTS ，全称 Long Time Support ，长期维护版本，这个系列代表着稳定，建议首次下载以及后续的每次升级都选择 LTS 版本，减少开发过程中的未知问题出现。

每个 LTS 版本的大版本号都是偶数，并且会有 3 个阶段的生命周期：

|  生命周期   | 含义 | 说明                                                                                                                                        |
| :---------: | :-----------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------ |
|   Active    |                           活跃阶段                            | 每个从 Current 进入 LTS 的偶数版本，都会有 18 个月的时间被积极维护和升级。                                                                  |
| Maintenance |                           维护阶段                            | 活跃阶段达到 18 个月后，会进入为期 12 个月的维护阶段，期间只会进行错误修复和安全补丁。                                                      |
| End of Life |                           结束阶段                            | 简称 EOL ，在维护阶段达到期限之后，该版本进入 EOL 阶段，将不再维护，也就是说，每个 LTS 版本最长会有 30 个月的维护时间，之后将不再进行维护。 |

:::tip
当然也会有一些例外情况，例如 Node.js 16 版本，为了配合 OpenSSL 1.1.1 的 EOL 时间，将提前 7 个月进入 EOL 阶段。

详见官方公告： [Bringing forward the End-of-Life Date for Node.js 16](https://nodejs.org/en/blog/announcements/nodejs16-eol/) 。
:::

#### 是否需要经常更新版本

不论是 LTS 还是 Current ，每个系列下面都还有不同的大版本和小版本，是不是每次都必须及时更新到最新版呢？

当然不是，完全可以依照的项目技术栈依赖的最低 Node 版本去决定是否需要升级，不过如果条件允许，还是建议至少要把大版本升级到最新的 LTS 版本。

:::tip
关于 Node.js 的版本发布时间表可以在官方 GitHub 的 [Release 仓库](https://github.com/nodejs/Release) 查看。
:::


## 基础的 Node 项目

在安装和配置完 Node.js 之后，接下来了解 Node 项目的一些基础组成，这有助于开启前端工程化开发大门。

:::tip
当前文档所演示的 hello-node 项目已托管至 [learning-vue3/hello-node](https://github.com/learning-vue3/hello-node) 仓库，可使用 Git 克隆命令拉取至本地：

```bash
# 从 GitHub 克隆
git clone https://github.com/learning-vue3/hello-node.git

# 如果 GitHub 访问失败，可以从 Gitee 克隆
git clone https://gitee.com/learning-vue3/hello-node.git
```

成品项目可作为学习过程中的代码参考，但更建议按照教程的讲解步骤，从零开始亲手搭建一个新项目并完成 node 开发的体验，可以更有效的提升学习效果。
:::

### 初始化一个项目

如果想让一个项目成为 Node 项目，只需要在命令行 `cd` 到项目所在的目录，执行初始化命令：

```bash
npm init
```

之后命令行会输出一些提示，以及一些问题，可以根据的实际情况填写项目信息，例如：

```bash
package name: (demo) hello-node
```

以上面这个问题为例：

冒号左边的 `package name` 是问题的题干，会询问要输入什么内容。

冒号右边的括号内容 `(demo)` 是 Node 为推荐的答案（不一定会出现这个推荐值），如果觉得 OK ，可以直接按回车确认，进入下一道题。

冒号右边的 `hello-node` 是输入的答案（如果选择了推荐的答案，则这里为空），这个答案会写入到项目信息文件里。

当回答完所有问题之后，会把填写的信息输出到控制台，确认无误后，回车完成初始化的工作。

```bash
{
  "name": "hello-node",
  "version": "1.0.0",
  "description": "A demo about Node.js.",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "chengpeiquan",
  "license": "MIT"
}


Is this OK? (yes)
```

如果觉得问题太多，太繁琐了，可以直接加上 `-y` 参数，这样会以 Node 推荐的答案帮快速生成项目信息。

```bash
npm init -y
```

### 了解 package.json

在完成 [项目的初始化](#初始化一个项目) 之后，会发现在项目的根目录下出现了一个名为 `package.json` 的 JSON 文件。

这是 Node 项目的清单，里面记录了这个项目的基础信息、依赖信息、开发过程的脚本行为、发布相关的信息等等，未来将在很多项目里看到它的身影。

:::tip
它必须是 JSON 文件，不可以是存储了 JavaScript 对象字面量的 JS 文件。
:::

如果是按照上面初始化一节的操作得到的这个文件，打开它之后，会发现里面存储了在初始化过程中，根据问题确认下来的那些答案，例如：

```json
{
  "name": "hello-node",
  "version": "1.0.0",
  "description": "A demo about Node.js.",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "chengpeiquan",
  "license": "MIT"
}
```

package.json 的字段并非全部必填，唯一的要求就是，必须是一个 JSON 文件，所以也可以仅仅写入以下内容：

```json
{}
```

但在实际的项目中，往往需要填写更完善的项目信息，除了手动维护这些信息之外，在安装 npm 包等操作时， Node 也会帮写入数据到这个文件里，来了解一些常用字段的含义：

|     字段名      | 含义                                                                                                        |
| :-------------: | :---------------------------------------------------------------------------------------------------------- |
|      name       | 项目名称，如果打算发布成 npm 包，它将作为包的名称                                                           |
|     version     | 项目版本号，如果打算发布成 npm 包，这个字段是必须的，遵循 [语义化版本号](#语义化版本号管理) 的要求          |
|   description   | 项目的描述                                                                                                  |
|    keywords     | 关键词，用于在 npm 网站上进行搜索                                                                           |
|    homepage     | 项目的官网 URL                                                                                              |
|      main       | 项目的入口文件                                                                                              |
|     scripts     | 指定运行脚本的命令缩写，常见的如 `npm run build` 等命令就在这里配置，详见 [脚本命令的配置](#脚本命令的配置) |
|     author      | 作者信息                                                                                                    |
|     license     | 许可证信息，可以选择适当的许可证进行开源                                                                    |
|  dependencies   | 记录当前项目的生产依赖，安装 npm 包时会自动生成，详见：[依赖包和插件](#依赖包和插件)                        |
| devDependencies | 记录当前项目的开发依赖，安装 npm 包时会自动生成，详见：[依赖包和插件](#依赖包和插件)                        |
|      type       | 配置 Node 对 CJS 和 ESM 的支持                                                                              |

其中最后的 type 字段是涉及到模块规范的支持，它有两个可选值： `commonjs` 和 `module` ，其默认值为 `commonjs` 。

- 当不设置或者设置为 `commonjs` 时，扩展名为 `.js` 和 `.cjs` 的文件都是 CommonJS 规范的模块，如果要使用 ES Module 规范，需要使用 `.mjs` 扩展名
- 当设置为 `module` 时，扩展名为 `.js` 和 `.mjs` 的文件都是 ES Module 规范的模块，如果要使用 CommonJS 规范，需要使用 `.cjs` 扩展名

关于 package.json 的完整的选项可以在 [npm Docs](https://docs.npmjs.com/cli/v8/configuring-npm/package-json/) 上查阅。

### 项目名称规则

如果打算发布成 npm 包，它将作为包的名称，可以是普通包名，也可以是范围包的包名。

|                              类型                               | 释义                                                                                     | 例子                                                       |
| :-------------------------------------------------------------: | :--------------------------------------------------------------------------------------- | :--------------------------------------------------------- |
| 范围包 | 具备 `@scope/project-name` 格式，一般有一系列相关的开发依赖之间会以相同的 scope 进行命名 | 如 `@vue/cli` 、 `@vue/cli-service` 就是一系列相关的范围包 |
|                             普通包                              | 其他命名都属于普通包                                                                     | 如 `vue` 、 `vue-router`                                   |

包名有一定的书写规则：

- 名称必须保持在 1 ~ 214 个字符之间（包括范围包的 `@scope/` 部分）
- 只允许使用小写字母、下划线、短横线、数字、小数点（并且只有范围包可以以点或下划线开头）
- 包名最终成为 URL 、命令行参数或者文件夹名称的一部分，所以名称不能包含任何非 URL 安全字符

:::tip
了解这一点有助于在后续工作中，在需要查找技术栈相关包的时候，可以知道如何在 npmjs 上找到它们。
:::

如果打算发布 npm 包，可以通过 `npm view <package-name>` 命令查询包名是否已存在，如果存在就会返回该包的相关信息。

比如查询 `vue` 这个包名，会返回它的版本号、许可证、描述等信息：

```bash
npm view vue

vue@3.2.33 | MIT | deps: 5 | versions: 372
The progressive JavaScript framework for building modern web UI.
https://github.com/vuejs/core/tree/main/packages/vue#readme

keywords: vue

# 后面太多信息这里就省略...
```

如果查询一个不存在的包名，则会返回 404 信息：

```bash
npm view vue123456
npm ERR! code E404
npm ERR! 404 Not Found - GET https://registry.npmjs.org/vue123456 - Not found
npm ERR! 404
npm ERR! 404  'vue123456@latest' is not in this registry.
npm ERR! 404 You should bug the author to publish it (or use the name yourself!)
npm ERR! 404
npm ERR! 404 Note that you can also install from a
npm ERR! 404 tarball, folder, http url, or git url.

# 后面太多信息这里就省略...
```

### 语义化版本号管理

Node 项目遵循 [语义化版本号](https://semver.org/lang/zh-CN/) 的规则，例如 `1.0.0` 、 `1.0.1` 、 `1.1.0` 这样的版本号，本教材的主角 Vue 也是遵循了语义化版本号的发布规则。

建议开发者在入门前端工程化的时候就应该熟悉这套规则，后续的项目开发中，会使用到很多外部依赖，它们也是使用版本号控制来管理代码的发布，每个版本之间可能会有一些兼容性问题，如果不了解版本号的通用规则，很容易在开发中带来困扰。

:::tip
现在有很多 CI/CD 流水线作业具备了根据 Git 的 Commit 记录来自动升级版本号，它们也是遵循了语义化版本号规则，版本号的语义化在前端工程里有重大的意义。
:::

#### 基本格式与升级规则

版本号的格式为： `Major.Minor.Patch` （简称 `X.Y.Z` ），它们的含义和升级规则如下：

| 英文  |   中文   | 含义                                               |
| :---: | :------: | :------------------------------------------------- |
| Major | 主版本号 | 当项目作了大量的变更，与旧版本存在一定的不兼容问题 |
| Minor | 次版本号 | 做了向下兼容的功能改动或者少量功能更新             |
| Patch |  修订号  | 修复上一个版本的少量 BUG                           |

一般情况下，三者均为正整数，并且从 `0` 开始，遵循这三条注意事项：

- 当主版本号升级时，次版本号和修订号归零
- 当次版本号升级时，修订号归零，主版本号保持不变
- 当修订号升级时，主版本号和次版本号保持不变

下面以一些常见的例子帮助快速理解版本号的升级规则：

- 如果不打算发布，可以默认为 `0.0.0` ，代表它并不是一个进入发布状态的包
- 在正式发布之前，可以将其设置为 `0.1.0` 发布第一个测试版本，自此，代表已进入发布状态，但还处于初期开发阶段，这个阶段可能经常改变 API ，但不需要频繁地更新主版本号
- 在 `0.1.0` 发布后，修复了 BUG ，下一个版本号将设置为 `0.1.1` ，即更新了一个修订号
- 在 `0.1.1` 发布后，有新的功能发布，下一个版本号可以升级为 `0.2.0` ，即更新了一个次版本号
- 当觉得这个项目已经功能稳定、没有什么 BUG 了，决定正式发布并给用户使用时，那么就可以进入 `1.0.0` 正式版了

#### 版本标识符

以上是一些常规的版本号升级规则，也可以通过添加 “标识符” 来修饰的版本更新：

格式为： `Major.Minor.Patch-Identifier.1` ，其中的 `Identifier` 代表 “标识符” ，它和版本号之间使用 `-` 短横线来连接，后面的 `.1` 代表当前标识符的第几个版本，每发布一次，这个数字 +1 。

| 标识符 | 含义                                                               |
| :----: | :----------------------------------------------------------------- |
| alpha  | 内部版本，代表当前可能有很大的变动                                 |
|  beta  | 测试版本，代表版本已开始稳定，但可能会有比较多的问题需要测试和修复 |
|   rc   | 即将作为正式版本发布，只需做最后的验证即可发布正式版               |

### 脚本命令的配置

在工作中，会频繁接触到 `npm run dev` 启动开发环境、 `npm run build` 构建打包等操作，这些操作其实是对命令行的一种别名。

它在 package.json 里是存放于 `scripts` 字段，以 `[key: string]: string` 为格式的键值对存放数据（ `key: value` ）。

```json
{
  "scripts": {
    // ...
  }
}
```

其中：

- `key` 是命令的缩写，也就是 `npm run xxx` 里的 `xxx` ，如果一个单词不足以表达，可以用冒号 `:` 拼接多个单词，例如 `mock:list` 、 `mock:detail` 等等

- `value` 是完整的执行命令内容，多个命令操作用 `&&` 连接，例如 `git add . && git commit`

以 Vue CLI 创建的项目为例，它的项目 package.json 文件里就会包括了这样的命令：

```json
{
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build"
  }
}
```

这里的名字是可以自定义的，比如可以把 `serve` 改成更喜欢的 `dev` ：

```json
{
  "scripts": {
    "dev": "vue-cli-service serve",
    "build": "vue-cli-service build"
  }
}
```

这样运行 `npm run dev` 也可以相当于运行了 `vue-cli-service serve` 。

据笔者所了解，有不少开发者曾经对不同的 Vue CLI 版本提供的 `npm run serve` 和 `npm run dev` 有什么区别有过疑问，看到这里应该都明白了吧，可以说没有区别，因为这取决于它对应的命令，而不是取决于它起什么名称。

:::tip
如果 `value` 部分包含了双引号 `"` ，必须使用转义符 `\` 来避免格式问题，例如： `\"` 。
:::

可以阅读 npm 关于 scripts 的 [完整文档](https://docs.npmjs.com/cli/v8/using-npm/scripts) 了解更多用法。

### Hello Node

看到这里，对于 Node 项目的基本创建流程和关键信息都有所了解了吧！来写一个 demo ，实际体验一下如何从初始化项目到打印一个 `Hello World` 到控制台的过程。

请先启动的命令行工具，然后创建一个项目文件夹，这里使用 `mkdir` 命令：

```bash
# 语法是 mkdir <dir-name>
mkdir hello-node
```

使用 `cd` 命令进入刚刚创建好的项目目录：

```bash
# 语法是 cd <dir-path>
cd hello-node
```

执行项目初始化，可以回答问题，也可以添加 `-y` 参数来使用默认配置：

```bash
npm init -y
```

来到这里就得到了一个具有 package.json 的 Node 项目了。

在项目下创建一个 `index.js` 的 JS 文件，可以像平时一样书写 JavaScript ，输入以下内容并保存：

```js
console.log('Hello World')
```

然后打开 package.json 文件，修改 scripts 部分如下，也就是配置了一个 `"dev": "node index"` 命令：

```json
{
  "name": "hello-node",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "node index"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

在命令行执行 `npm run dev` ，可以看到控制台打印出了 `Hello World` ：

```bash 
npm run dev

> demo@1.0.0 dev
> node index

Hello World
```

这等价于直接在命令行执行 `node index.js` 命令，其中 `node` 是 Node.js 运行文件的命令， `index` 是文件名，相当于 `index.js` ，因为 JS 文件名后缀可以省略。
