---
id: route
sidebar_position: 4
---

# 路由

## 设置路由

```jsx
// TodoListApplication\frontend\src\main.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/todo" element={<App_WithAuth />} />
        <Route path="/edit-profile" element={<EditProfilePage_WithAuth />} />
      </Routes>
    </BrowserRouter>
);
```


`BrowserRouter`, `Route`, 和 `Routes` 是 `react-router-dom` 包中提供的组件，用于在 React 应用中实现路由功能。

1. `BrowserRouter`：
   - `BrowserRouter` 是一个用于包裹整个应用的高阶组件，它提供了基于浏览器历史记录的路由功能。
   - 使用 `BrowserRouter` 组件，你可以将路由功能引入到你的应用中，并通过 URL 来匹配不同的路由路径。

2. `Route`：
   - `Route` 是一个用于定义单个路由的组件，它用于在指定的路径上渲染特定的组件。
   - 使用 `Route` 组件，你可以定义应用的不同路由路径，并指定要在该路径下渲染的组件。
   - 语法：
    ```jsx
    <Route path="/path" component={Component} />
    ```

3. `Routes`：
   - `Routes` 是一个用于定义多个路由的组件，它可以包含多个 `Route` 组件，并根据 URL 匹配路径来渲染相应的组件。
   - 使用 `Routes` 组件，你可以将多个路由配置组合在一起，以实现更复杂的路由配置。

4. 总结：
- `BrowserRouter` 是用于包裹整个应用的高阶组件，提供基于浏览器历史记录的路由功能。
- `Route` 用于定义单个路由，指定路径和对应的组件。
- `Routes` 用于定义多个路由，包含多个 `Route` 组件，并根据 URL 匹配路径来渲染相应的组件。

