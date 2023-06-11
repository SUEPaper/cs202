---
sidebar_position: 7
---

# 增加删除功能

## 创建被点击后执行的函数

```jsx
  const handleDeleteToDo = (id) => {
    const updatedToDoList = todoList.filter((todo) => todo.id != id);
    dispatch(setTodoList(updatedToDoList));
    localStorage.setItem("todoList", JSON.stringify(updatedToDoList));
  };
  ```

这段代码实现了删除待办事项的功能。

`handleDeleteToDo` 函数接收一个 `id` 参数，用于指定要删除的待办事项的唯一标识符。

在函数体内，通过使用 `filter` 方法对 `todoList` 进行筛选，创建一个新的 `updatedToDoList` 数组，其中排除了具有指定 `id` 的待办事项。

然后，调用 `dispatch` 函数触发 `setTodoList` action，将新的 `updatedToDoList` 数组作为 payload 传递给 action，更新状态管理中的待办事项列表。

接下来，通过使用 `localStorage.setItem` 将更新后的待办事项列表存储到本地存储，以便在页面刷新后仍然保留更新后的数据。

这样，当调用 `handleDeleteToDo` 函数并传递待办事项的 `id` 时，将从待办事项列表中删除该项，并更新状态管理和本地存储中的数据。

## 添加onClick

```jsx
<button
className="bg-sunsetOrange text-white p-1 rounded-md ml-2"
onClick={() => handleDeleteToDo(todo.id)}
>
<BsTrash />
</button>
```
当点击删除按钮时，将触发 `handleDeleteToDo` 函数并传递待办事项的 `id`，实现删除该待办事项的功能。

此时在网页上点击删除按钮可以看到对应的todolist被删除

## 总结

通过创建`handleDeleteToDo`函数，删除对应id的todolist，并调用 `dispatch` 函数触发 `setTodoList` action，将新的 `updatedToDoList` 数组作为 payload 传递给 action，更新状态管理中的待办事项列表。当点击按钮时`onClick={() => handleDeleteToDo(todo.id)}`，触发`handleDeleteToDo`函数，从待办事项列表中删除该项，并更新状态管理和本地存储中的数据。

