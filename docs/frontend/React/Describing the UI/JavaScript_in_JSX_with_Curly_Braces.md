---
id: JavaScriptinJSXwithCurlyBraces
sidebar_position: 5
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 在 JSX 中通过大括号使用 JavaScript

JSX 允许你在 JavaScript 中编写类似 HTML 的标签，从而使渲染的逻辑和内容可以写在一起。有时候，你可能想要在标签中添加一些 JavaScript 逻辑或者引用动态的属性。这种情况下，你可以在 JSX 的大括号内来编写 JavaScript。

## 使用引号传递字符串 

当你想把一个字符串属性传递给 JSX 时，把它放到单引号或双引号中：

<Tabs>
<TabItem value="App.js"  label="App.js">

```jsx
export default function Avatar1_5_1() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/7vQD0fPs.jpg"
      alt="Gregorio Y. Zara"
    />
  );
}
```
</TabItem>
</Tabs>

```jsx live
<Avatar1_5_1 />
```

这里的 `"https://i.imgur.com/7vQD0fPs.jpg"` 和 `"Gregorio Y. Zara"` 就是被作为字符串传递的。

但是如果你想要动态地指定 `src` 或 `alt` 的值呢？你可以 **用 `{` 和 `}` 替代 `"` 和 `"` 以使用 JavaScript 变量**：

<Tabs>
<TabItem value="App.js"  label="App.js">

```jsx
export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = 'Gregorio Y. Zara';
  return (
    <img
      className="avatar"
      src={avatar}
      alt={description}
    />
  );
}
```
</TabItem>
</Tabs>

```jsx live
<Avatar1_5_2 />
```

请注意 `className="avatar"` 和 `src={avatar}` 之间的区别，`className="avatar"` 指定了一个就叫 `"avatar"` 的使图片在样式上变圆的 CSS 类名，而 `src={avatar}` 这种写法会去读取 JavaScript 中 `avatar` 这个变量的值。这是因为大括号可以使你直接在标签中使用 JavaScript！

## 使用大括号：一扇进入 JavaScript 世界的窗户 
JSX 是一种编写 JavaScript 的特殊方式。这为在大括号`{ }` 中使用 JavaScript 带来了可能。下面的示例中声明了科学家的名字，`name`，然后在 `<h1>` 后的大括号内嵌入它：

<Tabs>
<TabItem value="App.js"  label="App.js">

```jsx
export default function TodoList1_5_3() {
  const name = 'Gregorio Y. Zara';
  return (
    <h1>{name}'s To Do List</h1>
  );
}

```
</TabItem>
</Tabs>

```jsx live
<TodoList1_5_3/>
```

试着将 `name` 的值从 `'Gregorio Y. Zara'` 更改成 `'Hedy Lamarr'`。看看这个 To Do List 的标题将如何变化？

大括号内的任何 JavaScript 表达式都能正常运行，包括像 `formatDate()` 这样的函数调用：

<Tabs>
<TabItem value="App.js"  label="App.js">

```jsx
const today = new Date();

function formatDate1_5_4(date) {
  return new Intl.DateTimeFormat(
    'en-US',
    { weekday: 'long' }
  ).format(date);
}

export function TodoList1_5_4() {
  return (
    <h1>To Do List for {formatDate1_5_4(today)}</h1>
  );
}

```
</TabItem>
</Tabs>

```jsx live
<TodoList1_5_4/>
```

### 可以在哪使用大括号 
在 JSX 中，只能在以下两种场景中使用大括号：

1. 用作 JSX 标签内的文本：`<h1>{name}'s To Do List</h1>` 是有效的，但是 `<{tag}>Gregorio Y. Zara's To Do List</{tag}>` 无效。
2. 用作紧跟在 `=` 符号后的 属性：`src={avatar}` 会读取 `avatar` 变量，但是 `src="{avatar}"` 只会传一个字符串 `{avatar}`。
## 使用 “双大括号”：JSX 中的 CSS 和 对象 
除了字符串、数字和其它 JavaScript 表达式，你甚至可以在 JSX 中传递对象。对象也用大括号表示，例如 `{ name: "Hedy Lamarr", inventions: 5 }`。因此，为了能在 JSX 中传递，你必须用另一对额外的大括号包裹对象：`person={{ name: "Hedy Lamarr", inventions: 5 }}`。

你可能在 JSX 的内联 CSS 样式中就已经见过这种写法了。React 不要求你使用内联样式（使用 CSS 类就能满足大部分情况）。但是当你需要内联样式的时候，你可以给 `style` 属性传递一个对象：

<Tabs>
<TabItem value="App.js"  label="App.js">

```jsx
export default function TodoList1_5_5() {
  return (
    <ul style={{
      backgroundColor: 'black',
      color: 'pink'
    }}>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}
```
</TabItem>
</Tabs>

```jsx live
<TodoList1_5_5/>
```

当你写成这样时，你可以很清楚地看到大括号里包着的对象：

```jsx
<ul style={
  {
    backgroundColor: 'black',
    color: 'pink'
  }
}>
```

所以当你下次在 JSX 中看到 `{{` 和 `}}`时，就知道它只不过是包在大括号里的一个对象罢了！

:::danger 陷阱
内联 style 属性 使用驼峰命名法编写。例如，HTML `<ul style="background-color: black">` 在你的组件里应该写成 `<ul style={{ backgroundColor: 'black' }}>`。
:::

## JavaScript 对象和大括号的更多可能 
你可以将多个表达式合并到一个对象中，在 JSX 的大括号内分别使用它们：

<Tabs>
<TabItem value="App.js"  label="App.js">

```jsx
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList1_5_6() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}

```
</TabItem>
</Tabs>

```jsx live
<TodoList1_5_6/>
```

在这个示例中，`person` JavaScript 对象包含 `name` 中存储的字符串和 `theme` 对象：

```html
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};
```

该组件可以这样使用来自 `person` 的值：

```html
<div style={person.theme}>
  <h1>{person.name}'s Todos</h1>
```
JSX 是一种模板语言的最小实现，因为它允许你通过 JavaScript 来组织数据和逻辑。
