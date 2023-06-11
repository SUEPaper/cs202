---
sidebar_position: 6
---

# 显示todolist

## 添加排序功能

```jsx
  const handleSort = (sortCriteria) => {
    dispatch(sortTodo(sortCriteria));
  };

  const sortTodoList = todoList.filter((todo) => {
    if (sortCriteria === "All") return true;
    if (sortCriteria === "Completed" && todo.completed) return true;
    if (sortCriteria === "Not Completed" && !todo.completed) return true;
    return false;
  });
```

  ![](img/7_1.png)

这段代码用于处理待办事项列表的排序功能。

首先，`handleSort` 函数接收一个 `sortCriteria` 参数，用于指定排序的条件。在函数体内，调用 `dispatch` 函数触发 `sortTodo` action，并将 `sortCriteria` 作为 payload 传递给 action。

接下来，根据指定的排序条件，使用 `filter` 方法对 `todoList` 进行筛选。根据不同的 `sortCriteria` 值，判断每个 `todo` 的完成状态，符合条件的保留在新的 `sortTodoList` 数组中，不符合条件的被过滤掉。

因为此时的全局状态`todoList`中的`sortCriteria`默认为"All",我们也并没有对其修改，所以此时`todoList.filter`全为`true`即`sortTodoList`=`todoList`

最后，生成的 `sortTodoList` 数组将用于渲染排序后的待办事项列表。

这样，当调用 `handleSort` 函数时，会更新状态管理中的排序条件，并重新筛选生成排序后的待办事项列表。

## 显示排序后的todolist

```jsx
<div className="flex items-center justify-center flex-col">
{todoList.length === 0 ? (
    <div className="mb-8">
    <div className="sm:w-[500px] sm:h-[500px] min-w-[250px]">
        <img src={empty} alt="" />
    </div>
    <p className="text-center text-Gray">
        You have no todo's,plese add one.
    </p>
    </div>
) : (
    <></>//需要填入
)}

<button
    className="bg-sunsetOrange text-center text-white py-3 px-10 rounded-md"
    onClick={() => setShowModel(true)}
>
    Add Task
</button>
</div>
```

在这段代码中需要填入的部分填入
```jsx
<div>
{sortTodoList.map((todo) => (
    <div key={todo.id}>
    <div>{todo.task}</div>
    </div>
))}
</div> 
```
![](img/7_2.png)

此时打开网页在其中添加todolist，就可以看到

![](img/7_3.png)

## 让每行todolist更为好看+具有修改的逻辑

在`<div>{todo.task}</div>`之下添加两个按钮，其图标为`<TiPencil />` `<BsTrash />`
```jsx
<div>
    <button>
    <TiPencil />
    </button>
    <button>
    <BsTrash />
    </button>
</div>
```

![](img/7_4.png)

此时打开网页可以看到

![](img/7_5.png)

发现还是不太好看，再给它增加些css样式

```jsx
<div className="container mx-auto mt-6">
{sortTodoList.map((todo) => (
    <div
    key={todo.id}
    className="flex items-center justify-between mb-6 bg-Tangaroa mx-auto w-full md:w-[75%] rounded-md p-4"
    >
    <div>{todo.task}</div>
    <div>
        <button className="bg-blue-500 text-white p-1 rounded-md ml-2">
        <TiPencil />
        </button>
        <button className="bg-sunsetOrange text-white p-1 rounded-md ml-2">
        <BsTrash />
        </button>
    </div>
    </div>
))}
</div>
```
![](img/7_6.png)

打开网页可以看到

![](img/7_7.png)

比上一版好看些

## 总结

通过创造一个`sortTodoList`数组对todolist进行筛选，并使用`sortTodoList.map()`函数，为每一个单独的todolist创造一个`<div>`,再对其添加两个按钮及css样式
