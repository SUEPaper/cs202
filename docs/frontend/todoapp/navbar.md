---
id: navbar
sidebar_position: 5
---

# 导航栏

## 例子
```jsx
// frontend\src\components\Navbar.jsx 部分
function Navbar() {
  return (
    <nav className="flex items-center justify-between p-6 bg-blue-500 border border-blue-500">
      <div>
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/todo"
              className="px-2 py-1 text-xl text-white  hover:border-transparent hover:text-blue-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/test"
              className="px-2 py-1 text-xl text-white  hover:border-transparent hover:text-blue-200"
            >
              Test
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
```
:::tip
```jsx
className="px-2 py-1 text-xl text-white 
```
这是导入了TailWindCss的样式
:::
在这个案例中定义了一个导航栏`<nav>`,用`<Link>`中的`to`链接了路由中对应的`/todo` 与 `/test`,当访问`/todo`路径时渲染`todo`组件，访问`/test`路径时渲染`test`组件。导航栏中的链接将导航到对应的路径，实现页面之间的切换。