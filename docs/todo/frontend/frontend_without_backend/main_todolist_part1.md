---
sidebar_position: 4
---

# todolist主体part1

在frontend\src\components新建文件ToDoList.jsx

写入
```jsx
import React from "react";

const ToDoList = () => {
  return <div>ToDoList</div>;
};

export default ToDoList;
```

在frontend\src\App.jsx中，添加
```jsx
import ToDoList from "./components/ToDoList";
```

在`<div>`中添加`<ToDoList />`

![](img/3_1.png)

此时在网页中可以看到

![](img/3_2.png)

在frontend\src\components\ToDoList.jsx中修改代码

```jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setTodoList,
    addTodo,
    updateTodo,
    sortTodo,
    toggleCompleted,
  } from "../ToDoSlice";
import { TiPencil } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";
import empty from "../assets/empty.jpg";

const ToDoList = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);
  const sortCriteria = useSelector((state) => state.todo.sortCriteria);
  const [showModel, setShowModel] = React.useState(false);

  return (
    <button
      className="bg-sunsetOrange text-center text-white py-3 px-10 rounded-md"
    >
      Add Task
    </button>
  );
};

export default ToDoList;

```

在上述代码中，新加了

```jsx
import { useDispatch, useSelector } from "react-redux";
import {
    setTodoList,
    addTodo,
    updateTodo,
    sortTodo,
    toggleCompleted,
  } from "../ToDoSlice";
import { TiPencil } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";
import empty from "../assets/empty.jpg";
```

上述代码主要包括以下内容：

1. 导入了 `useDispatch` 和 `useSelector` hooks 用于从 Redux store 中获取 dispatch 函数和状态数据。
2. 导入了 `setTodoList`、`updateTodo`、`sortTodo` 和 `toggleCompleted` 这些 action creators，用于更新 Redux store 中的数据。
3. 导入了 `TiPencil` 和 `BsTrash` 组件，这些是来自 `react-icons` 库的图标组件。
4. 导入了一个图片资源 `empty`。

```jsx
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);
  const sortCriteria = useSelector((state) => state.todo.sortCriteria);
```
这部分代码使用了 `useDispatch` 和 `useSelector` 这两个 hooks 来与 Redux store 进行交互。

1. `useDispatch` hook 返回一个 dispatch 函数，用于触发 Redux 中的 actions。你可以在组件中使用 `dispatch` 函数来调用定义的 action creators，从而更新 Redux store 中的数据。

2. `useSelector` hook 允许你从 Redux store 中选择和访问状态数据。你可以通过传入一个 selector 函数来指定你需要选择的数据。在这段代码中，`useSelector` 用于选择 `state.todo.todoList` 和 `state.todo.sortCriteria` 这两个状态。

通过使用这两个 hooks，你可以在组件中获取 Redux store 中的数据，并根据需要进行状态更新和操作。

```jsx
const [showModel, setShowModel] = React.useState(false);
```
这段代码使用了 `React.useState` hook 来定义一个名为 `showModel` 的状态变量，并通过 `setShowModel` 函数来更新该状态。

`React.useState` 是 React 提供的一个 hook，它用于在函数组件中添加状态。它接受一个初始值作为参数，并返回一个包含当前状态值的数组和一个用于更新状态的函数。在这段代码中，`false` 是 `showModel` 的初始值。

通过调用 `setShowModel` 函数并传递新的值，你可以在组件中更新 `showModel` 的值。这将触发组件的重新渲染，并根据新的状态值来更新相应的 UI。

```jsx
<button
    className="bg-sunsetOrange text-center text-white py-3 px-10 rounded-md"
>
    Add Task
</button>
```

这段代码是一个 `<button>` 元素，用于触发添加任务的操作。

具体来说：

- `className="bg-sunsetOrange text-center text-white py-3 px-10 rounded-md"` 是应用于按钮的 CSS 类名，用于设置按钮的背景颜色、文本样式、内边距和圆角等样式。
- 按钮的文本内容为 "Add Task"。

这个按钮没有绑定点击事件处理函数，因此点击按钮不会触发任何操作。你可以根据需要添加 `onClick` 属性，并为其指定一个函数，以实现按钮的点击行为。
