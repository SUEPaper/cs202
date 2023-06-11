---
id: basic
sidebar_position: 3
---

# React 基本概念

## JSX 

JSX（JavaScript XML）是一种在 JavaScript 中编写类似于 XML 或 HTML 的语法扩展。它是 React 框架中的一项核心功能，用于声明性地描述用户界面的结构和外观。

JSX 允许开发人员在 JavaScript 代码中直接编写 HTML 结构和组件，并且可以在其中嵌入 JavaScript 表达式。通过使用 JSX，可以更直观和简洁地描述 UI 的层次结构，使得 React 组件的开发更加易于理解和维护。

```jsx
import React from "react";

const App = () => {
  const name = "John Doe";
  const greeting = <h1>Hello, {name}!</h1>;

  return (
    <div>
      {greeting}
      <p>This is a JSX example.</p>
    </div>
  );
};

export default App;
```

在上面的例子中，我们使用 JSX 编写了一个简单的 React 组件。`{name}` 是一个 JSX 表达式，它在组件中嵌入了 JavaScript 变量 `name` 的值。通过将 JSX 元素直接插入到组件的返回值中，我们可以在界面上渲染出 HTML 结构和动态内容。

需要注意的是，虽然 JSX 类似于 HTML，但它实际上是 JavaScript 代码，并在构建过程中被转译为普通的 JavaScript。这意味着我们可以在 JSX 中使用 JavaScript 的语法和表达式，并且可以通过组件的属性和状态来动态地生成 JSX 元素。

## Fetch API
**Fetch API** 是一个用于发送 HTTP 请求的现代 JavaScript API。它提供了一种更简洁、灵活的方式来进行网络通信，取代了传统的 XMLHttpRequest 对象。

**Fetch API** 使用 Promise 对象来处理请求和响应，它提供了一组方法来发送请求、设置请求头、处理响应数据等操作。通过 Fetch API，可以发送各种类型的请求，包括 `GET`、`POST`、`PUT`、`DELETE` 等，并且支持异步操作和处理不同的数据格式。

```jsx


```


Fetch API 的基本用法如下：

1. 使用 `fetch()` 函数发送请求，传入一个 URL 参数作为请求的目标地址。
2. 可以通过配置选项对象来设置请求的方法、请求头、请求体等信息。
3. `fetch()` 函数返回一个 Promise 对象，可以使用 `then()` 方法来处理响应。
4. 在 `then()` 方法中可以处理响应数据，包括解析 *JSON* 数据、读取响应头等操作。
*Fetch API* 提供了一种现代且更简单的方式来进行网络请求，它已经成为前端开发中常用的网络通信工具。与传统的 *XMLHttpRequest* 相比，*Fetch API* 的语法更简洁，支持 Promise 对象，使得处理异步请求更加方便。同时，*Fetch API* 的设计也更加符合现代 Web 开发的要求。

## Route
在 *React Router* 库中，**"Route"** 是一个用于定义路由的组件。它可以帮助我们在应用中进行页面的导航和路由匹配。

通过使用 "Route" 组件，我们可以将 URL 与特定的组件关联起来。当用户访问匹配的 URL 时，与该 URL 关联的组件将被渲染到页面上。

```jsx
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/todo" element={<App_WithAuth />} />
        <Route path="/edit-profile" element={<EditProfilePage_WithAuth />} />
      </Routes>
    </Router>
  </Provider>
);
```


"Route" 组件有以下几个重要的属性：

- `path`: 指定 URL 的路径模式，用于与当前 URL 进行匹配。
- `component`: 指定要渲染的组件，当 URL 与 path 匹配时，该组件将被渲染到页面上。
- `exact`: 用于精确匹配 URL，只有当 URL 与 path 完全匹配时才会渲染组件。
- `render`: 可以替代 `component` 属性，用于以内联函数的形式渲染组件。
- `children`: 与 `render` 类似，但会在匹配时无论路径是否匹配都会被渲染。

除了上述属性外，"Route" 组件还可以嵌套使用，以实现嵌套路由的功能。嵌套路由可以帮助我们构建复杂的应用程序，将页面结构组织成层次化的路由结构。

总结来说，"Route" 组件是 React Router 库中用于定义路由的组件，它根据 URL 的匹配情况渲染相应的组件。通过配置不同的属性，我们可以实现路由的匹配、页面的导航和嵌套路由等功能。

### Link

Link 是 React Router 库中的一个组件，用于在应用程序中创建导航链接。它可以在不刷新页面的情况下切换路由，实现单页应用的导航功能。

使用 Link 组件可以避免传统的 `<a>` 标签导航产生的页面刷新，从而提供了更流畅的用户体验。它接受一个 `to` 属性，用于指定要导航到的目标路由路径。当用户点击 `Link` 组件时，React Router 将自动处理导航逻辑，更新应用程序的当前路由，并在不重新加载整个页面的情况下渲染相应的组件。

### useNavigate
useNavigate 是 React Router 库中的一个自定义 Hook，用于在函数组件中进行编程式导航。

通过 useNavigate，你可以在 React 组件中获取一个导航函数，用于在不同的路由之间进行切换。它提供了一种简单且便捷的方式来执行编程式导航，而无需使用 `<Link>` 组件或其他路由导航组件。

使用 useNavigate 的语法如下：

```jsx
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/other-route');
  };

  return (
    <button onClick={handleClick}>Go to Other Route</button>
  );
}
```

在上面的例子中，我们使用 useNavigate 获取了一个 `navigate` 函数，然后在按钮的点击事件处理函数中调用了 `navigate('/other-route')`，以实现在点击按钮时跳转到 `/other-route` 路由。

使用 useNavigate 可以在函数组件中方便地执行导航操作，比如在表单提交后进行重定向、在特定条件下跳转到不同的路由等等。它提供了一种更灵活的方式来控制路由导航，使得编程式导航更加直观和易于管理。

## Hook
Hook 是 React 16.8 版本引入的一种函数式组件扩展机制，它使得在函数组件中可以使用状态管理、生命周期钩子等特性，而不需要使用类组件。

简单来说，Hook 是一些预定义的函数，可以让你在函数组件中使用 React 的特性。通过使用 Hook，你可以在不编写类组件的情况下，使用状态管理、副作用处理、上下文等功能。

React 提供了一些常用的内置 Hook，如 `useState`、`useEffect`、`useContext` 等。此外，你也可以自定义自己的 Hook，将一些常用的逻辑封装起来，以便在多个组件中复用。

使用 Hook 的优势包括：

1. 更简洁：使用函数组件编写代码，减少了类组件的样板代码，让代码更加简洁易读。
2. 更易理解：Hook 使得组件的状态和副作用逻辑更紧密地结合在一起，更易理解和维护。
3. 更方便复用逻辑：可以将一些常用的逻辑抽象为自定义 Hook，方便在多个组件中复用。

需要注意的是，Hook 必须遵循一些规则，例如在函数的顶层调用 Hook，不可在循环、条件判断或嵌套函数中调用 Hook。此外，Hook 的使用也要遵循特定的命名约定，如以 `use` 开头命名自定义 Hook。

总的来说，Hook 是一种在函数组件中使用 React 特性的机制，它提供了更简洁、更易理解和更方便复用逻辑的方式，使得 React 开发更加灵活和高效。


### useEffect
`useEffect` 是 React 中的一个 Hook，用于在函数组件中执行副作用操作。副作用指的是那些不直接与组件渲染结果相关的操作，例如访问网络请求、订阅事件、修改 DOM 等。

`useEffect` 接收两个参数：一个回调函数和一个依赖数组。回调函数会在组件渲染完成后执行，并且根据依赖数组的变化情况决定是否重新执行。如果依赖数组为空，则回调函数只会在组件初次渲染后执行一次。

在 `useEffect` 内部，可以执行各种副作用操作，例如发送网络请求、订阅事件、修改 DOM 等。同时，`useEffect` 还支持返回一个清理函数，用于在组件被销毁前执行清理操作，例如取消订阅、清除定时器等。

### useState

useState 是 React 中的一个 Hook，用于在函数组件中添加状态管理。它接收一个初始状态值作为参数，并返回一个状态变量和一个更新状态的函数。通过调用更新状态的函数，可以更新状态变量的值，并触发组件的重新渲染。

使用 useState 可以在函数组件中轻松管理和更新状态，从而实现动态的 UI 和交互效果。

## Redux
Redux 是一个用于管理 JavaScript 应用程序状态的可预测状态容器。它是一个独立于任何 UI 框架的状态管理库，常与 **React**、**Angular**、**Vue** 等前端框架一起使用。

Redux 的核心概念是单一数据源和状态不可变性。它将整个应用程序的状态存储在一个称为 "store" 的对象中，并使用纯函数的方式来修改状态。通过定义 actions 和 reducers，Redux 实现了可预测的状态变化，使状态的管理和更新变得可控和可测试。

Redux 的工作原理如下：
1. 应用程序的状态存储在一个单一的全局状态树中，称为 "store"。
2. 当应用程序的状态需要更新时，需要通过派发 `(dispatch) actions` 来描述状态变化的意图。
3. Reducer 是一个纯函数，接收当前状态和一个 `action`，根据 `action` 的类型来更新状态，并返回一个新的状态对象。
4. Store 接收 reducer 返回的新状态，并将其作为应用程序的当前状态。
5. 订阅 (subscribe) 函数可以用来监听状态的变化，以便在状态变化时触发相应的更新操作。

Redux 的设计理念是可预测性、可维护性和可测试性。它通过严格的数据流和一致的状态更新方式来简化复杂应用程序的状态管理，提供了一种可靠的方式来处理状态和数据的流动，同时也提供了丰富的开发工具和插件生态系统来辅助开发和调试。

### reducer

在 Redux 中，`reducer` 是一个纯函数，用于处理应用程序的状态变化。它接收两个参数：当前的状态 `(state)` 和一个描述要执行的操作的动作对象 `(action)`，然后返回一个新的状态。

reducer 的作用是根据不同的动作类型 `(action type)` 来更新应用程序的状态。它基于当前状态和动作对象的信息，计算并返回一个新的状态对象，而不会直接修改原始的状态对象。

Redux 的设计思想是单一数据源，即整个应用程序的状态被保存在一个称为 "store" 的对象中。`reducer` 是用来更新这个 store 中的状态的核心机制。

### state

在 Redux 中，"state"（状态）指的是整个应用程序的状态数据。它是存储在 Redux 的 store 中的对象，代表了应用程序的当前状态。

Redux 的状态是一个不可变的数据结构，意味着它不能直接被修改。每当应用程序的状态需要更新时，都需要通过触发一个 `action` 来描述状态的变化。`Reducer` 函数会根据这个 `action` 的类型来处理状态的更新，并返回一个新的状态对象，而不是修改原始的状态对象。

通过将整个应用程序的状态存储在一个统一的状态树中，Redux 提供了一种一致且可预测的方式来管理和访问状态数据。任何组件都可以通过订阅 `store` 来获取应用程序的当前状态，并根据需要进行更新和渲染。

总结来说，Redux 中的 "state" 是一个存储在 store 中的不可变对象，代表了应用程序的当前状态数据。它可以被通过派发 `actions` 触发的 `reducer` 函数来更新，从而实现状态的变化和管理。


## Tailwind css

Tailwind CSS 是一个现代化的 CSS 框架，它提供了一组直观的、可重用的 CSS 类，用于快速构建现代的、响应式的 Web 界面。

Tailwind CSS 的设计理念是将样式原子化，将常用的样式属性拆分为小的、独立的类名，通过组合这些类名来构建样式。这种原子化的方法使得样式的组合变得灵活且可控，开发人员可以根据需要选择和组合不同的类名，而无需编写自定义的 CSS。

使用 Tailwind CSS 可以极大地提高开发效率，减少样式编写的工作量。它提供了丰富的预定义类，涵盖了常见的样式需求，包括布局、间距、颜色、文本样式、响应式设计等。开发人员只需将所需的类名应用到 HTML 元素上，即可实现相应的样式效果。

Tailwind CSS 的特点包括：

- 可定制性：通过配置文件可以定制样式、颜色、间距等属性，满足不同项目的需求。
- 响应式设计：提供了一套响应式的类名，用于在不同屏幕尺寸下适应不同的布局和样式。
- 可扩展性：支持自定义类名和样式的扩展，以及与其他 CSS 框架和工具的集成。

总之，Tailwind CSS 是一个灵活、可定制的 CSS 框架，通过原子化的样式类名和丰富的预定义类，使得构建现代 Web 界面变得更加简单和高效。