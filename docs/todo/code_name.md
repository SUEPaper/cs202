---
id : code-name
sidebar_position: 100
---

# 代码的命名技巧

:::tip

非原创声明，只是进行适当修改，相关内容来源：
1. https://github.com/chengpeiquan/learning-vue3

:::

对于接触编程不久的开发者，在个人练习 demo 或者简单的代码片段里可能会经常看到 `var a` 、 `var b` 这样的命名，因为本身是一段练习代码，因此都是 “能跑就行”，问题不大。

但在工作中，很多开发团队都会有语义化命名的规范要求，严格的团队会有 Code Review 环节，
使用这种无意义命名的代码将无法通过审查，在这种背景下，
开发者可能会在命名上花费很多时间，在这里也分享笔者的一些常用技巧，希望能够帮助开发者节约在命名上的时间开销。

## 变量的命名

首先遵循变量只使用 camelCase 小驼峰风格的基本原则，并且根据不同的类型，搭配不同的命名前缀或后缀。

对于 `string` 字符串类型，使用相关的名词命名即可。

```js
import { ref } from 'vue'

// 用户名
const username = ref('Petter')

// 职业
const profession = ref('Front-end Engineer')
```

对于 `number` 数值类型，除了一些本身可以代表数字的名词，例如年龄 `age` 、秒数 `seconds` ，其他的情况可以搭配后缀命名，常用的后缀有 `Count` 、 `Number` 、 `Size` 、 `Amount` 等和单位有关的名词。

```ts
import { ref } from 'vue'

// 最大数量
const maxCount = ref(100)

// 页码
const pageNumber = ref(1)

// 每页条数
const pageSize = ref(10)

// 折扣金额
const discountAmount = ref(50)
```

对于 `boolean` 布尔值类型，可搭配 `is` 、 `has` 等 Be 动词或判断类的动词作为前缀命名，并视情况搭配行为动词和目标名词，或者直接使用一些状态形容词。

```js
import { ref } from 'vue'

// 是否显示弹窗
const isShowDialog = ref(false)

// 用户是否为 VIP 会员
const isVIP = ref(true)

// 用户是否有头像
const hasAvatar = ref(true)

// 是否被禁用
const disabled = ref(true)

// 是否可见
const visible = ref(true)
```

之所以要搭配 `is` 开头，是为了和函数区分，例如 `showDialog()` 是显示弹窗的方法，而 `isShowDialog` 才是一个布尔值用于逻辑判断。

对于数组，通常使用名词的复数形式，或者名词加上 `List` 结尾作为命名，数组通常会有原始数据类型的数组，也有 JSON 对象数组，笔者习惯对前者使用名词复数，对后者使用 `List` 结尾。

```js
import { ref } from 'vue'

// 每个 Item 都是字符串
const tags = ref(['食物', '粤菜', '卤水'])

// 每个 Item 都是数值
const tagIds = ref([1, 2, 3])

// 每个 Item 都是 JSON 对象
const memberList = ref([
  {
    id: 1,
    name: 'Petter',
  },
  {
    id: 2,
    name: 'Marry',
  },
])
```

如果是作为函数的入参，通常也遵循变量的命名规则。

除非是一些代码量很少的操作，可以使用 `i` 、 `j` 等单个字母的变量名，例如提交接口参数时，经常只需要提交一个 ID 数组，从 JSON 数组里提取 ID 数组时就可以使用这种简短命名。

```js
// `map` 的参数命名就可以使用 `i` 这种简短命名
const ids = dataList.map((i) => i.id)
```

## 函数的命名

函数的命名也是只使用 camelCase 小驼峰风格，通常根据该函数是同步操作还是异步操作，使用不同的动词前缀。

获取数据的函数，通常使用 `get` 、 `query` 、 `read` 等代表会返回数据的动词作为前缀，如果还是觉得很难确定使用哪一个，可以统一使用 `get` ，也可以根据函数的操作性质来决定：

- 如果是同步操作，不涉及接口请求，使用 `get` 作为前缀
- 如果是需要从 API 接口查询数据的异步操作，使用 `query` 作为前缀
- 如果是 Node.js 程序这种需要进行文件内容读取的场景，就使用 `read`

```js
// 从本地存储读取数据
// 因为是同步操作，所以使用 `get` 前缀
function getLoginInfo() {
  try {
    const info = localStorage.getItem('loginInfo')
    return info ? JSON.parse(info) : null
  } catch (e) {
    return null
  }
}

// 从接口查询数据
// 因为是异步操作，需要去数据库查数据，所以使用 `query` 前缀
async function queryMemberInfo(id) {
  try {
    const res = await fetch(`https://example.com/api/member/${id}`)
    const json = await res.json()
    return json
  } catch (e) {
    return null
  }
}
```

修改数据的函数，通常使用 `save` 、 `update` 、 `delete` 等会变更数据的动词作为前缀，一般情况下：

- 数据存储可以统一使用 `save`
- 如果要区分新建或者更新操作，可以对新建操作使用 `create` ，对更新操作使用 `update`
- 删除使用 `delete` 或 `remove`
- 如果是 Node.js 程序需要对文件写入内容，使用 `write`
- 表单验证合法性等场景，可以使用 `verify` 或 `check`
- 切换可见性可以用 `show` 和 `hide` ，如果是写在一个函数里，可以使用 `toggle`
- 发送验证码、发送邮件等等可以使用 `send`
- 打开路由、打开外部 URL 可以使用 `open`

当然以上只是一些常用到的命名技巧建议，对于简单的业务，例如一个 H5 活动页面，也可以在同步操作时使用 `set` 表示可以直接设置，在异步操作时使用 `save` 表示需要提交保存。

```js
// 将数据保存至本地存储
// 因为是同步操作，所以使用 `set` 前缀
function setLoginInfo(info) {
  try {
    localStorage.setItem('loginInfo', JSON.stringify(info))
    return true
  } catch (e) {
    return false
  }
}

// 将数据通过接口保存到数据库
// 因为是异步操作，所以使用 `save` 前缀
async function saveMemberInfo(id, data) {
  try {
    const res = await fetch(`https://example.com/api/member/${id}`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
    const json = await res.json()
    return json.code === 200
  } catch (e) {
    return false
  }
}
```

Class 类上的方法和函数命名规则一样，但 Class 本身使用 PascalCase 命名法，代表这是一个类，在调用的时候需要 `new` 。

```ts
// 类使用 PascalCase 命名法
class Hello {
  constructor(name) {
    this.name = name
  }

  say() {
    console.log(`Hello ${this.name}`)
  }
}

const hello = new Hello('World')
hello.say() // Hello World
```

## Vue 组件

在 Vue 项目里，会有放在 views 下的路由组件，有放在 components 目录下的公共组件，虽然都是以 `.vue` 为扩展名的 Vue 组件文件，但根据用途，它们其实并不相同，因此命名上也有不同的技巧。

### 路由组件

路由组件组件通常存放在 src/views 目录下，在命名上容易困惑的点应该是风格问题，开发者容易陷入是使用 camelCase 小驼峰还是 kebab-case 短横线风格，或者是 snake_case 下划线风格的选择困难。

一般情况下路由组件都是以单个名词或动词进行命名，例如个人资料页使用 `profile` 命名路由，路由的访问路径使用 `/profile` ，对应的路由组件使用 `profile.vue` 命名，下面是几个常见的例子。

```js
const routes = [
  // 首页
  // e.g. `https://example.com/`
  {
    path: '/',
    name: 'home',
    component: () => import('@views/home.vue'),
  },
  // 个人资料页
  // e.g. `https://example.com/profile`
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@views/profile.vue'),
  },
  // 登录页
  // e.g. `https://example.com/login`
  {
    path: '/login',
    name: 'login',
    component: () => import('@views/login.vue'),
  },
]

export default routes
```

如果是一些数据列表类的页面，使用名词复数，或者名词单数加上 `-list` 结尾的 kebab-case 短横线风格写法，推荐短横线风格是因为在 URL 的风格设计里更为常见。

像文章列表可以使用 `articles` 或者 `article-list` ，但同一个项目建议只使用其中一种方式，以保持整个项目的风格统一，下面是几个常见的例子。

```js
const routes = [
  // 文章列表页
  // 翻页逻辑是改变页码进行跳转，因此需要添加动态参数 `:page`
  // 可以在组件内使用路由实例 `route.params.page` 拿到页码
  // e.g. `https://example.com/articles/1`
  {
    path: '/articles/:page',
    name: 'articles',
    component: () => import('@views/articles.vue'),
  },
  // 通知列表页
  // 翻页逻辑使用 AJAX 无刷翻页，这种情况则可以不配置页码参数
  // e.g. `https://example.com/notifications`
  {
    path: '/notifications',
    name: 'notifications',
    component: () => import('@views/notifications.vue'),
  },
]

export default routes
```

列表里的资源详情页，因为访问的时候通常会带上具体的 ID 以通过接口查询详情数据，这种情况下资源就继续使用单数，例如下面这个例子。

```js
const routes = [
  // 文章详情页
  // 可以在组件内使用路由实例 `route.params.id` 拿到文章 ID
  // e.g. `https://example.com/article/1`
  {
    path: '/article/:id',
    name: 'article',
    component: () => import('@views/article.vue'),
  },
]

export default routes
```

如果项目路由比较多，通常会对同一业务的路由增加文件夹归类，因此上面的文章列表和文章详情页，可以统一放到 article 目录下，使用 `list` 和 `detail` 区分是列表还是详情。

```js
const routes = [
  // 文章相关的路由统一放在这里管理
  {
    path: '/article',
    name: 'article',
    // 这是一个配置了 `<router-view />` 标签的路由中转站组件
    // 目的是使其可以渲染子路由
    component: () => import('@cp/TransferStation.vue'),
    // 由于父级路由没有内容，所以重定向至列表的第 1 页
    // e.g. `https://example.com/article`
    redirect: {
      name: 'article-list',
      params: {
        page: 1,
      },
    },
    children: [
      // 文章列表页
      // e.g. `https://example.com/article/list/1`
      {
        path: 'list/:page',
        name: 'article-list',
        component: () => import('@views/article/list.vue'),
      },
      // 文章详情页
      // e.g. `https://example.com/article/detail/1`
      {
        path: 'detail/:id',
        name: 'article-detail',
        component: () => import('@views/article/detail.vue'),
      },
    ],
  },
]

export default routes
```

对于一些需要用多个单词才能描述的资源，可以使用 kebab-case 短横线风格命名，例如很常见的 “策划面对面” 这种栏目，在设置路由时，比较难用一个单词在 URL 里体现其含义，就需要使用这种多个单词的连接。

```js
const routes = [
  // 面对面栏目
  {
    path: '/face-to-face',
    name: 'face-to-face',
    component: () => import('@views/face-to-face.vue'),
  },
]

export default routes
```

这种情况如果需要使用文件夹管理多个路由，同样建议使用 kebab-case 短横线风格命名，例如上面这个 “策划面对面” 栏目，可能会归属于 “开发计划” 这个业务下，那么其父级文件夹就可以使用 `development-plan` 这样的短横线命名。

### 公共组件

公共组件组件通常存放在 `src/components` 目录下，也可以视不同的使用情况，在路由文件夹下创建属于当前路由的 components 目录，作为一个小范围共享的公共组件目录来管理，而 `src/components` 则只存放全局性质的公共组件。

本节最开始提到了路由组件和公共组件并不相同，虽然都是组件，但路由组件代表的是整个页面，而公共组件更多是作为一个页面上的某个可复用的部件。

公共组件通常使用 PascalCase 帕斯卡命名法，也就是大驼峰，为什么不用小驼峰呢？

这是源于 Vue 官网的一个 [组件名格式](https://cn.vuejs.org/guide/components/registration.html#component-name-casing) 命名推荐：

> 使用 PascalCase 作为组件名的注册格式，这是因为：
> PascalCase 是合法的 JavaScript 标识符。这使得在 JavaScript 中导入和注册组件都很容易，同时 IDE 也能提供较好的自动补全。`<PascalCase />` 在模板中更明显地表明了这是一个 Vue 组件，而不是原生 HTML 元素。同时也能够将 Vue 组件和自定义元素（ web components ）区分开来。

而且实际使用 PascalCase 风格的编码过程中，在 VSCode 里可以得到不同颜色的高亮效果，这与 kebab-case 风格的 HTML 标签可以快速区分。

```html
<template>
  <!-- 普通的 HTML 标签 -->
  <!-- 在笔者的 VSCode 风格里呈现为桃红色 -->
  <div></div>

  <!-- 大驼峰组件 -->
  <!-- 在笔者的 VSCode 风格里呈现为绿色 -->
  <PascalCase />
</template>
```

养成这种习惯还有一个好处，就是使用 UI 框架的时候，例如 Ant Design Vue 的 [Select 组件](https://www.antdv.com/components/select-cn) ，在其文档上演示的是全局安装的写法：

```html
<template>
  <a-select>
    <a-select-option value="Hello">Hello</a-select-option>
  </a-select>
</template>
```

而实际使用时，为了更好的配合构建工具进行 Tree Shaking 移除没有用到的组件，都是按需引入 UI 框架的组件，因此如果平时有养成习惯使用 PascalCase 命名，就可以很轻松的知道上面的 `<a-select-option />` 组件应该对应的是 `<SelectOption />` ，因此是这样按需导入：

```js
import { Select, SelectOption } from 'ant-design-vue'
```

可以说， PascalCase 这个命名方式也是目前流行 UI 框架都在使用的命名规范。

希望曾经在命名上有过困扰的开发者，不再有此烦恼，编写代码更加高效率！

