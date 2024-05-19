---
id: package
sidebar_position: 5
---

# Nodejs包管理和插件

:::tip

非原创声明，只是进行适当修改，相关内容来源：
1. https://github.com/chengpeiquan/learning-vue3

:::

在实际业务中，经常会用到各种各样的插件，插件在 Node 项目里的体现是一个又一个的依赖包。

虽然也可以把插件的代码文件手动放到的源码文件夹里引入，但并不是一个最佳的选择，本节内容将带了解 Node 的依赖包。

## 什么是包

在 Node 项目里，包可以简单理解为模块的集合，一个包可以只提供一个模块的功能，也可以作为多个模块的集合集中管理。

包通常是发布在官方的包管理平台 npmjs 上面，开发者需要使用的时候，可以通过包管理器安装到项目里，并在的代码里引入，开箱即用（详见： [依赖包的管理](#依赖包的管理) ）。

使用 npm 包可以减少在项目中重复造轮子，提高项目的开发效率，也可以极大的缩小项目源码的体积（详见：[什么是 node_modules](#什么是-node-modules)）。

包管理平台官网：[https://www.npmjs.com](https://www.npmjs.com)

## 什么是 node_modules

node_modules 是 Node 项目下用于存放已安装的依赖包的目录，如果不存在，会自动创建。

如果是本地依赖，会存在于项目根目录下，如果是全局依赖，会存在于环境变量关联的路径下，详见下方的管理依赖部分内容的讲解。

:::tip
一般在提交项目代码到 Git 仓库或者的服务器上时，都需要排除 node_modules 文件夹的提交，因为它非常大。

如果托管在 Git 仓库，可以在 .gitignore 文件里添加 `node_modules` 作为要排除的文件夹名称。
:::

## 什么是包管理器

包管理器（ Package Manager ）是用来管理依赖包的工具，比如：发布、安装、更新、卸载等等。

Node 默认提供了一个包管理器 `npm` ，在安装 Node.js 的时候，默认会一起安装 npm 包管理器，可以通过以下命令查看它是否正常。

```bash
npm -v
```

如果正常，将会输出相应的版本号。

## 依赖包的管理

接下来会以 npm 作为默认的包管理器，来了解如何在项目里管理依赖包。

### 配置镜像源

在国内，直接使用 npm 会比较慢，可以通过绑定 [npm Mirror 中国镜像站](https://npmmirror.com/) 的镜像源来提升依赖包的下载速度。

可以先在命令行输入以下命令查看当前的 npm 配置：

```bash
npm config get registry
# https://registry.npmjs.org/
```

默认情况下，会输出 npm 官方的资源注册表地址，接下来在命令行上输入以下命令，进行镜像源的绑定：

```bash
npm config set registry https://registry.npmmirror.com
```

可以再次运行查询命令来查看是否设置成功：

```bash
npm config get registry
# https://registry.npmmirror.com/
```

可以看到已经成功更换为中国镜像站的地址了，之后在安装 npm 包的时候，速度会有很大的提升！

如果需要删除自己配置的镜像源，可以输入以下命令进行移除，移除后会恢复默认设置：

```bash
npm config rm registry
```

:::tip
如果之前已经绑定过 `npm.taobao` 系列域名，也请记得更换成 `npmmirror` 这个新的域名！

随着新的域名已经正式启用，老 `npm.taobao.org` 和 `registry.npm.taobao.org` 域名在 2022 年 05 月 31 日零时后不再提供服务。

详见：[【望周知】淘宝 npm 镜像站喊你切换新域名啦](https://zhuanlan.zhihu.com/p/430580607)
:::

### 本地安装

项目的依赖建议优先选择本地安装，这是因为本地安装可以把依赖列表记录到 package.json 里，多人协作的时候可以减少很多问题出现，特别是当本地依赖与全局依赖版本号不一致的时候。

#### 生产依赖

执行 `npm install` 的时候，添加 `--save` 或者 `-S` 选项可以将依赖安装到本地，并列为生产依赖。

:::tip
需要提前在命令行 `cd` 到的项目目录下再执行安装。

另外， `--save` 或者 `-S` 选项在实际使用的时候可以省略，因为它是默认选项。
:::

```bash
npm install --save <package-name>
```

可以在项目的 `package.json` 文件里的 `dependencies` 字段查看是否已安装成功，例如：

```json
// package.json
{
  // 会安装到这里
  "dependencies": {
    // 以 "包名"："版本号" 的格式写入
    "vue-router": "^4.0.14"
  }
}
```

生产依赖包会被安装到项目根目录下的 `node_modules` 目录里。

项目在上线后仍需用到的包，就需要安装到生产依赖里，比如 Vue 的路由 `vue-router` 就需要以这个方式安装。

#### 开发依赖

执行 `npm install` 的时候，如果添加 `--save-dev` 或者 `-D` 选项，可以将依赖安装到本地，并写入开发依赖里。

:::tip
需要提前在命令行 `cd` 到的项目目录下再执行安装。
:::

```bash
npm install --save-dev <package-name>
```

可以在项目的 `package.json` 文件里的 `devDependencies` 字段查看是否已安装成功，例如：

```json
// package.json
{
  // 会安装到这里
  "devDependencies": {
    // 以 "包名"："版本号" 的格式写入
    "eslint": "^8.6.0"
  }
}
```

开发依赖包也是会被安装到项目根目录下的 `node_modules` 目录里。

和生产依赖包不同的点在于，只在开发环境生效，构建部署到生产环境时可能会被抛弃，一些只在开发环境下使用的包，就可以安装到开发依赖里，比如检查代码是否正确的 `ESLint` 就可以用这个方式安装。

### 全局安装

执行 `npm install` 的时候，如果添加 `--global` 或者 `-g` 选项，可以将依赖安装到全局，它们将被安装在 [配置环境变量](#配置环境变量) 里配置的全局资源路径里。

```bash
npm install --global <package-name>
```

:::tip
Mac 用户需要使用 `sudo` 来提权才可以完成全局安装。

另外，可以通过 `npm root -g` 查看全局包的安装路径。
:::

一般情况下，类似于 `@vue/cli` 之类的脚手架会提供全局安装的服务，安装后，就可以使用 `vue create xxx` 等命令直接创建 Vue 项目了。

但不是每个 npm 包在全局安装后都可以正常使用，请阅读 npm 包的主页介绍和使用说明。

### 版本控制

有时候一些包的新版本不一定适合的老项目，因此 npm 也提供了版本控制功能，支持通过指定的版本号或者 Tag 安装。

语法如下，在包名后面紧跟 `@` 符号，再紧跟版本号或者 Tag 名称。

```bash
npm install <package-name>@<version | tag>
```

例如：

现阶段 Vue 默认为 3.x 的版本了，如果想安装 Vue 2 ，可以通过指定版本号的方式安装：

```bash
npm install vue@2.6.14
```

或者通过对应的 Tag 安装：

```bash
npm install vue@legacy
```

:::tip
版本号或者 Tag 名称可以在 npmjs 网站上的包详情页查询。
:::

### 版本升级

一般来说，直接重新安装依赖包可以达到更新的目的，但也可以通过 `npm update` 命令来更新。

语法如下，可以更新全部的包：

```bash
npm update
```

也可以更新指定的包：

```bash
npm update <package-name>
```

npm 会检查是否有满足版本限制的更新版本。

### 卸载

可以通过 `npm uninstall` 命令来卸载指定的包，和安装一样，卸载也区分了卸载本地依赖包和卸载全局包，不过只有在卸载全局包的时候才需要添加选项，默认只卸载当前项目下的本地包。

本地卸载：

```bash
npm uninstall <package-name>
```

全局卸载：

```bash
npm uninstall --global <package-name>
```

:::tip
Mac 用户需要使用 `sudo` 来提权才可以完成全局卸载。
:::

## 如何使用包

在了解了 npm 包的常规操作之后，通过一个简单的例子来了解如何在项目里使用 npm 包。

继续使用的 [Hello Node](#hello-node) demo ，或者也可以重新创建一个 demo 。

首先在命令行工具通过 `cd` 命令进入项目所在的目录，用本地安装的方式来把 [md5 包](https://www.npmjs.com/package/md5) 添加到生产依赖，这是一个为提供开箱即用的哈希算法的包，在未来的实际工作中，可能也会用到它，在这里使用它是因为足够简单。

输入以下命令并回车执行：

```bash
npm install md5
```

可以看到控制台提示一共安装了 4 个包，这是因为 md5 这个 npm 包还引用了其他的包作为依赖，需要同时安装才可以正常工作。

```bash
# 这是安装 md5 之后控制台的信息返回
added 4 packages, and audited 5 packages in 2s

found 0 vulnerabilities
```

此时项目目录下会出现一个 node_modules 文件夹和一个 package-lock.json 文件：

```bash
hello-node
│ # 依赖文件夹
├─node_modules
│ # 源码文件夹
├─src
│ # 锁定安装依赖的版本号
├─package-lock.json
│ # 项目清单
└─package.json
```

先打开 package.json ，可以看到已经多出了一个 `dependencies` 字段，这里记录了刚刚安装的 md5 包信息。

```json
{
  "name": "hello-node",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev:cjs": "node src/cjs/index.cjs",
    "dev:esm": "node src/esm/index.mjs",
    "serve": "node server/index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "md5": "^2.3.0"
  }
}
```

来到这里可能会有一连串的疑问：

> 1.  为什么只安装了一个 md5 ，但控制台提示安装了 4 个包？
> 2.  为什么 package.json 又只记录了 1 个 md5 包信息？
> 3.  为什么提示审核了 5 个包，哪里来的第 5 个包？

不要着急，请先打开 package-lock.json 文件，这个文件是记录了锁定安装依赖的版本号信息（由于篇幅原因，这里的展示省略了一些包的细节）：

```json
{
  "name": "hello-node",
  "version": "1.0.0",
  "lockfileVersion": 2,
  "requires": true,
  "packages": {
    "": {
      "name": "hello-node",
      "version": "1.0.0",
      "license": "ISC",
      "dependencies": {
        "md5": "^2.3.0"
      }
    },
    "node_modules/charenc": {
      "version": "0.0.2"
      // ...
    },
    "node_modules/crypt": {
      "version": "0.0.2"
      // ...
    },
    "node_modules/is-buffer": {
      "version": "1.1.6"
      // ...
    },
    "node_modules/md5": {
      "version": "2.3.0"
      // ...
    }
  },
  "dependencies": {
    "charenc": {
      "version": "0.0.2"
      // ...
    },
    "crypt": {
      "version": "0.0.2"
      // ...
    },
    "is-buffer": {
      "version": "1.1.6"
      // ...
    },
    "md5": {
      "version": "2.3.0",
      // ...
      "requires": {
        "charenc": "0.0.2",
        "crypt": "0.0.2",
        "is-buffer": "~1.1.6"
      }
    }
  }
}
```

可以看到这个文件的 `dependencies` 字段除了 md5 之外，还有另外 3 个包信息，它们就是 md5 包所依赖的另外 3 个 npm 包了，这就解答了为什么一共安装了 4 个 npm 包。

在 node_modules 文件夹下也可以看到以这 4 个包名为命名的文件夹，这些文件夹存放的就是各个包项目发布在 npmjs 平台上的文件。

再看 `packages` 字段，这里除了罗列出 4 个 npm 包的信息之外，还把项目的信息也列了进来，这就是为什么是提示审核了 5 个包，原因是除了 4 个依赖包，该项目本身也是一个包。

:::tip
package-lock.json 文件并不是一成不变的，假如以后 md5 又引用了更多的包，这里记录的信息也会随之增加。

并且不同的包管理器，它的 lock 文件也会不同，如果是使用 yarn 作为包管理器的话，它是生成一个 yarn.lock 文件，而不是 package-lock.json。
:::

现在已经安装好 md5 包了，接下来看看具体如何使用它。

通常在包的 npmjs 主页上会有 API 和用法的说明，只需要根据说明操作，打开 `src/esm/index.mjs` 文件，首先需要导入这个包。

包的导入和在模块化设计一节了解到的模块导入用法是一样的，只是把 `from` 后面的文件路径换成了包名。

```js
// src/esm/index.mjs
import md5 from 'md5'
```

然后根据 md5 的用法，来编写一个小例子，先声明一个原始字符串变量，然后再声明一个使用 md5 加密过的字符串变量，并打印它们：

```js
// src/esm/index.mjs
import md5 from 'md5'

const before = 'Hello World'
const after = md5(before)
console.log({ before, after })
```

在命令行输入 `npm run dev:esm` ，可以在控制台看到输出了这些内容，成功获得了转换后的结果：

```bash
npm run dev:esm

> demo@1.0.0 dev:esm
> node src/esm/index.mjs

{ before: 'Hello World', after: 'b10a8db164e0754105b7a99be72e3fe5' }
```

是不是非常简单，其实包的用法和在导入模块的用法可以说是完全一样的，区别主要在于，包是需要安装了才能用，而模块是需要自己编写。
