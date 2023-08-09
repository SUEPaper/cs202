---
id : zustand
sidebar_position: 4
---
# zustand 状态管理

正常来讲，应该实现"增加"功能，其流程为

1. 新增组件:add按钮
2. 完成其逻辑
3. 调用该组件

但到第二步时，会发现，如何为`MyToDoListBody.jsx`文件中的data添加数据？

组件:add按钮与组件:MyToDoListBody没有任何关联，又如何更改其中的数据呢

因此我们要管理data，也就是"状态"，需要通过`zustand`，相比`Redux`，在小型项目中，它更为简单方便。

## 安装`zustand`

命令行输入
```bash
npm install zustand
```

## 新建状态
在`src\`新建文件夹`store`

在该文件夹中新建文件`useData.jsx`,将`MyToDoListBody.jsx`中的data转移到该文件中，并添加

```jsx
const data = [
  {
    id: 1,
    task: "Give dog a bath",
    complete: true,
  },
  {
    id: 2,
    task: "Do laundry",
    complete: true,
  },
  {
    id: 3,
    task: "Vacuum floor",
    complete: false,
  },
  {
    id: 4,
    task: "Feed cat",
    complete: true,
  },
  {
    id: 5,
    task: "Change light bulbs",
    complete: false,
  },
  {
    id: 6,
    task: "Go to Store",
    complete: true,
  },
  {
    id: 7,
    task: "Fill gas tank",
    complete: true,
  },
  {
    id: 8,
    task: "Change linens",
    complete: false,
  },
  {
    id: 9,
    task: "Rake leaves",
    complete: true,
  },
  {
    id: 10,
    task: "Bake Cookies",
    complete: false,
  },
  {
    id: 11,
    task: "Take nap",
    complete: true,
  },
  {
    id: 12,
    task: "Read book",
    complete: true,
  },
  {
    id: 13,
    task: "Exercise",
    complete: false,
  },
  {
    id: 14,
    task: "Give dog a bath",
    complete: false,
  },
  {
    id: 15,
    task: "Do laundry",
    complete: false,
  },
  {
    id: 16,
    task: "Vacuum floor",
    complete: false,
  },
  {
    id: 17,
    task: "Feed cat",
    complete: true,
  },
  {
    id: 18,
    task: "Change light bulbs",
    complete: false,
  },
  {
    id: 19,
    task: "Go to Store",
    complete: false,
  },
  {
    id: 20,
    task: "Fill gas tank",
    complete: false,
  },
];

const useData = create((set) => ({
  data: data,
}));

export { useData };
```

### 代码解释

这段代码创建了一个自定义 hook `useData`，它使用 `create` 函数来创建一个状态容器。在状态容器的回调函数中，我们定义了一个状态属性 `data`，初始值为 `data`(之前的data数组)

## 使用状态

在`src\components\MyToDoListBody.jsx`中，输入

```jsx
import React from "react";
import { useData } from "../store/useData";

const MyToDoListBody = () => {
  const data = useData((state) => state.data);
  return (
    <div className="text-center">
      {data.map((item) => (
        <div>{item.task}</div>
      ))}
    </div>
  );
};

export default MyToDoListBody;
```

其中

```jsx
const data = useData((state) => state.data);
```
使用 `useData` 自定义 hook 并传入一个回调函数，来获取 `data` 状态。回调函数接受 `state` 参数，然后从中提取出 `data` 属性。

## 文件结构

```
frontend
├─ .eslintrc.cjs
├─ .gitignore
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.jsx
│  ├─ assets
│  ├─ components
│  │  ├─ MyToDoListBody.jsx
│  │  └─ MyToDoListHead.jsx
│  ├─ index.css
│  ├─ main.jsx
│  └─ store
│     └─ useData.jsx
├─ tailwind.config.js
└─ vite.config.js

```