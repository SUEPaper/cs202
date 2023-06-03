---
id: ImportingandExportingComponents
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 组件的导入与导出

组件的神奇之处在于它们的可重用性：你可以创建一个由其他组件构成的组件。但当你嵌套了越来越多的组件时，则需要将它们拆分成不同的文件。这样可以使得查找文件更加容易，并且能在更多地方复用这些组件。

## 根组件文件 

在 你的第一个组件 中，你创建了一个 `Profile` 组件，并且渲染在 `Gallery` 组件里。

<Tabs>
<TabItem value="App.js"  label="App.js">

```jsx
function Profile1_1_2() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export default function Gallery1_1_1() {
  return (
    <section>
      <h1>了不起的科学家</h1>
      <Profile1_1_2 />
      <Profile1_1_2 />
      <Profile1_1_2 />
    </section>
  );
}

```

</TabItem>
</Tabs>

```jsx live
<Gallery1_1_1/>

```
在此示例中，所有组件目前都定义在**根组件** `App.js` 文件中，在 [Create React App](https://create-react-app.dev/) 中，你的应用应在 src/App.js 文件中定义。具体还需根据项目配置决定，有些根组件可能会声明在其他文件中。如果你使用的框架基于文件进行路由，如 Next.js，那你每个页面的根组件都会不一样。
