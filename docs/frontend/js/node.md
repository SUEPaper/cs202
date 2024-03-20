---
id: nodejs
sidebar_position: 10
---

# Node.js与ES6

## 什么是 Node.js

根据前面一些文档的内容，我们大概了解到 JavaScript 是一种前端语言，可以赋予静态的网页丰富的动态效果，换句话说，JavaScript 运行在浏览器中，能够访问的只有一个页面上的内容，以及浏览器提供的 API。Node.js 基于 V8 引擎和一些系统库，创建了一个 JavaScript 的运行时环境，使得 JavaScript 能够独立于浏览器在系统上直接运行，并且访问系统的多种接口。

V8 引擎的高效使得基于 Node.js 的程序可以有极高的运行效率，同时 JavaScript 的一些特性在编写部分服务端程序时有独特的好处。

Node.js 的运行机制与浏览器中极为相似，主要的区别体现在于运行环境和所能访问的 API 不同，因此以下将尽量**不会**涉及语法细节。

## Node.js 使用场景

Node.js 是 JavaScript / TypeScript 语言的主要开发环境，常见的场景至少包括：

### 后端开发

Node.js 可以直接运行，由于包含相关的系统库，Node.js 可以读写文件、监听网络等，这就使得 Node.js 可以作为后端开发的选择，常见的框架为 Express.js。

### 前端开发

尽管前端的运行环境是浏览器而非 Node.js，但 Node.js 提供了与浏览器基本相同的机制，同时提供了编译、打包等能力，因此在前端开发中，往往使用 TypeScript 进行开发，在 Node.js 环境中完成编译和打包后，将生成的打包文件部署在前端。常用的框架有 React.js、Vue.js 等。

值得一提的是，这里的编译并不仅仅包括 TypeScript 到 JavaScript 的编译，由于用户使用的浏览器种类和版本无法确定，为了提供尽可能好的兼容性，同时保留较好的开发体验，常常使用 Babel 等工具将代码转换为较低版本 JavaScript 兼容的语法。

### 原生应用开发

除了可以进行网页开发，Node.js 还可以通过 React Native、Electron 等框架编写原生应用，提供与网页开发相似的开发体验。但需要注意的是这种应用的逻辑处理仍然依赖于 JavaScript 运行时，因此其运行效率与平台相关（指 iOS 会限制 JIT 的使用并导致速度相对较慢）。

:::note JIT (Just In Time，即时编译)

  JavaScript 的多种运行时都支持 JIT，同时也支持以解释器方式运行。

  使用 JIT 时，运行时首先分析 JavaScript 代码并转换为字节码，在这个过程中会尝试进行优化，通常而言可以显著提高 JavaScript 的运行效率，但同时也会增加很多内存开销（Chrome: ?）。如果代码中有较多性能开销大且难以被分析和优化的代码（通常是由于类型难以判断），则很容易导致 JIT 的效果下降，这样会导致代码运行效率降低。

:::

## 安装

我们提供了不同平台的Node.js安装教程：

- [Windows](../../basic/nodejs_install/Windows.md)
- [MacOS](../../basic/nodejs_install/MacOS.md)
- [Ubuntu Linux](../../basic/nodejs_install/Ubuntu.md)

在使用包管理器安装时请注意，安装包中可能包含 `npm` 即 `Node.js package manager` 是 Node.js 默认的包管理器，如果此处没有安装也没有关系，我们会在下节中详细解释这个问题。

### Node.js 运行

Node.js 的运行与 Python 十分相似，可以使用 REPL（英文：read-eval-print-loop，即交互式命令行）或者脚本的方式，甚至还有人搞过对标 IPython 的 IJavaScript ~~（不过凉了）~~。

- REPL：在命令行输入 `node` 就可以打开一个交互式界面，就如同你在学习 JavaScript 时使用浏览器调试工具那样，但是 Node.js 并不能像在浏览器中那样对打印出来的对象做复杂的操作，当然考虑到这是在 CLI 中，缺少类似的操作并不奇怪。
  - 与浏览器不同的另一点是，你可以使用类似 `.exit` 的语句进行一些非 JavaScript 的操作，如退出 Node.js（当然也可以使用两次 `Ctrl+C` 或者一次 `Ctrl+D` 来退出）。
- 脚本：与 Python 类似，使用 `node xxx.js` 来执行一个脚本（但是实际操作中这个行为也会被封装，同样会在下一节中解释）。

## Node.js 模块化

在之前的 JavaScript 基础章节中并没有提及 JavaScript 有什么模块化或者包管理的东西，这是因为在前端开发中，要么将用到的模块通过 Node.js 全部打包（关于打包将在后续提及），要么通过 CDN 引入。例如，通过 CDN 引入第三方模块时，可以在 HTML 中添加：

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

当该脚本加载完成后，在浏览器全局对象 `window` 中会添加属性 `axios`，也即成为全局变量，在其他代码中可直接使用。这是早期 JavaScript 的问题，通过全局变量解决一切问题，大家在程设中想必<del>这么做过</del>知道这样做是不好的。

这个问题早在 ECMA 制定 ES6 标准引入 ES6 Module 前就广泛存在了，因此社区早已提出了多种解决方案，主要有 CommonJS、AMD、CMD 几种。后两种现在已经很少出现，而 CommonJS 的主要实践者正是 Node.js。因此当运行 Node.js 项目时，如果在版本低于 ES6 的情况下使用 ES6 Module（即使用 `import`、`export`）方法就会报错。不过好在我们可以选择使用 ES6 及以上版本，或者使用 Babel（见资源链接）实现兼容，因此我们将主要使用 ES6 Module 来管理模块。

### ES6 Module

从一个文件中导出变量、函数、类型等内容的方法为：

```javascript
// 文件名 export.js
// 导出值 value
export { value };
// 导出值 value 并重命名为 aliasNameOfValue
export { value as aliasNameOfValue };
// 以下两句等价
export { value as default };
export default value;

// 对于 TypeScript，可以通过以下方式导出类型
// 二者的区别是前一个可以确保这一行内容不会出现在编译结果中
export type { type };
export { type };
```

引入模块的方式则为：

```javascript
// 注意这里并不需要指定后缀名，更多的细节请见下节
import { value } from './export';
// 引入值并起别名
import { value as aliasNameOfValue } from './export';
// 以下两句等价
import { default as value } from './export';
import value from './export';
// 将 ./export 中的所有导出都导入，并作为对象 someModule
import * as someModule from './export';
someModule.value === value;
```

如果需要引入再导出，可以简写为：

```javascript
export { value } from './export';
```

## npm

npm 即 Node.js package manager，是 Node.js 默认的包管理工具，按照上节所说的方法安装 Node.js 时，应当已经安装了 npm，可以通过 `npm -v` 来检查 npm 是否已安装成功。

## Node.js 的包管理

新建一个文件夹并执行 `npm init` 命令，根据提示填写字段后，我们看到文件夹中多了一个名为 `package.json` 的文件，这个文件记录了当前项目的基本信息，如项目名称、描述、版本、证书，以及可能用到的一些操作，还有当前项目的依赖信息，这些信息的作用将在后面说明。

## Node.js 的模块查找

上节说到了如何在 Node.js 中引用其他文件导出的模块，但是上节给出的例子都是从相对路径中引入，引入内置或第三方模块时，应当按照如下方式：

```javascript
import fs from 'fs';           // 内置文件系统模块
import express from 'express'; // 一个 web 服务器模块
```

这并不是相对或绝对的路径，这就要提到 Node.js 寻找模块的逻辑。

- 对于内置模块，在编译阶段已经确定了它们的位置，因此没有寻址的问题；
- 对于指定路径的模块：
    1. 首先查找该文件，缺省的后缀名按照 `.js`, `.node`, `.json` 的顺序尝试；
    2. 然后尝试作为文件夹名查找该文件夹下的 `package.json` 并引用其中 `main` 字段指定的文件；
    3. 最后尝试作为文件夹名查找该文件夹下的 `index` 文件，缺省后缀名逻辑与 1. 相同。
- 对于其他没有指定路径的模块，也即通过包管理器安装的模块，会尝试在当前文件夹下的 `node_modules` 文件夹下查找，如果查找失败，则依次从上级文件夹中（可能的） `node_modules` 文件夹下查找。

## 其他包管理器

上一部分引出了一个重要的问题，当我们需要很多依赖的项目时，如何组织这些项目就成为一个问题，因为 `node_modules` 当中的每一个项目都可能有自己的依赖，如果所有项目的依赖都分别安装，显然可能存在许多重复，但是又必须尽量避免不同项目的依赖互相干扰，这就涉及到包管理器的策略问题。

目前常见的包管理器主要有 npm、yarn、pnpm。（cnpm 本质上不过是 npm 自动换源的快捷方式，没有必要使用，后面会给出手动换源的方式）

以下简单介绍几种包管理器的策略区别：

1. 安装
    - npm 的安装是串行的，也就是说只有安装完一个 `package.json` 中声明的依赖后才会安装下一个，而且会把所有的信息打在终端上，而且每次安装同样的内容都是重新下载；
    - yarn 和 pnpm 会同时进行所有的安装，同时优化了输出信息，可以使用缓存减少重复下载。
2. 组织方式
    - 早期 npm 安装的依赖是逐层嵌套的，其结果就是文件路径极长而且不可共享（首先是会重复安装同样的东西浪费空间，其次是不同的模块分别引用两份模块并不能共享内存空间，造成不可预知的 bug）；
    - 现在的 npm 和 yarn 都采用扁平化结构，把所有项目的依赖都装在最上层的 `node_modules` 中，当遇到版本冲突时才单独安装在内层；
    - pnpm 对于同一个项目的同一个版本全局只保留一份，存储在自己的目录中，任何项目引用时都通过硬链接指向同一份文件，仍然使用嵌套结构。

安装的区别自然不用说，npm 比 yarn 和 pnpm 慢很多，值得一提的是第二点，扁平化带来的影响是项目可以非法访问没有声明的包（如果依赖 A 声明了依赖 B，那么依赖 C 不需要声明 B 就可以在上级文件夹中访问到 B），这就造成了潜在的不安全性。其余的差别可以参考 [为什么现在我更推荐 pnpm 而不是 npm/yarn?](https://jishuin.proginn.com/p/763bfbd3bcff)。

因此三者的排序应当是 pnpm > yarn > npm。pnpm 在一些项目中会引起错误，具体原因我没有研究过，如果遇到这种情况，建议换用 yarn，以下将主要以 yarn 为例介绍。

安装两种包管理器的方法是：

```bash
npm install -g yarn
npm install -g pnpm
```

## 包管理器的使用

三种包管理器支持的功能比较类似，语法也比较接近，常用的有：

| 操作                                 | npm                       | yarn                   | pnpm                   |
| ------------------------------------ | ------------------------- | ---------------------- | ---------------------- |
| 自动安装依赖                         | `npm install`               | `yarn install / yarn`    | `pnpm install`           |
| 添加依赖                             | `npm install lodash`        | `yarn add lodash`        | `pnpm add lodash`        |
| 添加开发依赖（不用于生产环境） | `npm install -D typescript` | `yarn add -D typescript` | `pnpm add -D typescript` |
| 移除依赖                             | `npm uninstall lodash`      | `yarn remove lodash`     | `pnpm remove lodash`     |
| 执行 `start` 脚本                             | `npm run start`             | `yarn start`             | `pnpm start`             |


注：在不引起歧义的情况下 npm 允许简写，如 `npm i` 代替 `npm install`。

## Node.js 脚本

前面提到的执行脚本，是指在 `package.json` 中声明的脚本，如 `package.json` 中有如下字段：

```json
{
  "scripts": {
    "start": "node dist/index.js",
  }
}
```

那么执行 `yarn start` 就相当于执行 `node dist/index.js`。但脚本的功能不止于此，例如 `prettier` 是一个代码格式化工具，安装在项目中后并没有安装在 `$PATH` 中，因此直接在 Shell 中运行 `prettier` 不会得到任何结果，此时应该执行 `yarn prettier --write src/**/*.js`，yarn 会找到适当的可执行文件来完成这一命令，我们可以在 `package.json` 中写：

```json
{
  "scripts": {
    "lint": "prettier --write src/**/*.js",
  }
}
```

那么 `yarn lint` 就相当于上述命令。

**npx**

在另一些情况下（比如创建 React 项目），我们虽然需要执行一些类似于 `prettier` 的命令，但以后并不需要安装这个模块，更没有必要把这个模块写在 `package.json` 中，此时我们可以执行 `npx create-react-app example-app`，npx 会自动下载这一模块并运行，但并不会保留在当前文件夹中，也不会对 `package.json` 造成影响。

yarn 和 pnpm 也支持这一语法：

```bash
pnpx create-react-app example-app
# yarn 并不普遍地支持这种用法，但是对于常见的创建项目，yarn 提供如下方法
yarn create react-app example-app
```