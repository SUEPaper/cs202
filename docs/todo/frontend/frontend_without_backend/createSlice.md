---
sidebar_position: 3
---

# 创建Slice

在frontend\src下新建文件ToDoSlice.jsx

## 为什么

首先介绍下何为状态(State)与Redux？

### 什么是状态

状态（State）是指应用程序中存储的数据的集合，表示系统的某一时刻的特定情况或条件。在前端开发中，状态通常用来描述应用程序的各种数据，例如用户信息、页面内容、组件的显示状态等。

状态可以是动态的，会随着用户的交互或系统的变化而改变。通过管理和更新状态，应用程序可以响应用户的操作、展示不同的内容或执行相应的逻辑。

在 React 和 Redux 中，状态是被视为不可变（Immutable）的数据。这意味着状态本身是不可直接修改的，而是通过创建新的状态副本来进行更新。这样做的好处是方便进行状态的追踪和管理，减少意外的副作用和数据混乱的可能性。

状态管理是前端开发中一个重要的概念，它帮助开发者组织和管理应用程序的数据，使应用程序的状态变得可控和可预测。通过合理的状态设计和管理，可以提高应用程序的可维护性、扩展性和性能。

### 什么是Redux

Redux 是一个用于 JavaScript 应用程序的状态管理库。它可以帮助开发者更好地管理应用程序的状态，并提供可预测性和可维护性。Redux 的核心概念是单一数据源和状态不可变性。

Redux 的设计思想是基于 Flux 架构模式的一种实现。它将应用程序的状态存储在一个**单一的数据源**中，称为 Store。Store 中的状态是不可变的，只能通过**派发（dispatch）**动作来改变。**动作（Action）**是一个普通的 JavaScript 对象，用于描述状态的变化。通过派发动作，Redux 可以根据事先定义好的规则执行对应的 **reducer 函数**，来更新状态。Reducer 是纯函数，它接收当前的状态和派发的动作作为输入，然后返回一个新的状态。

通过 Redux，开发者可以统一管理应用程序的状态，使得状态变化的流程更加清晰和可追踪，方便调试和测试。Redux 的设计思想和原则也可以帮助开发者更好地组织和抽象代码，提高代码的可复用性和可维护性。

### 什么是Redux

在 Redux 中，Slice 是一种组织和管理状态的方式，它将相关的状态、操作和 reducer 逻辑组合在一起。Slice 旨在简化 Redux 的使用，提供了一种更简洁、可维护和可测试的方式来定义状态和操作。

使用 Slice 的好处是可以将相关的状态和操作组织在一起，提高代码的可读性和可维护性。Slice 将 reducer 和 action creators 集中在一起，简化了 Redux 的使用，并且减少了样板代码的编写。Slice 还遵循了一定的约定，使得状态更新的逻辑更加清晰和一致。

### 什么是reducer

Reducer 是 Redux 中的一个概念，它是一个纯函数，用于根据派发的动作来更新应用程序的状态。Reducer 接收当前的状态和派发的动作作为输入，并返回一个新的状态。

Reducer 的设计原则是不直接修改原始的状态对象，而是创建一个全新的状态对象。这是因为 Redux 中的状态是不可变的，它们只能通过派发动作来改变。通过创建新的状态对象，Redux 可以确保状态的变化是可追踪和可预测的。

### 什么是action

在 Redux 中，Action 是一个普通的 JavaScript 对象，用于描述应用程序中发生的事件或用户的操作。Action 包含一个 type 字段，用于标识动作的类型，并可以携带其他与动作相关的数据。

Action 的设计目的是描述一个事情已经发生或即将发生的事件，它是对状态变化的抽象表示。通过派发 Action，应用程序可以触发对应的 Reducer 来更新状态。


### createSlice()是什么函数

createSlice 是 Redux Toolkit 中的一个函数，用于创建一个 Slice。它基于传入的初始状态和一组 reducer 函数自动生成 reducer 和 action creators。createSlice 函数接受一个配置对象，包含了 Slice 的名称、初始状态和 reducer 函数。通过调用 createSlice 函数，我们可以轻松地定义和组织状态的初始值和更新逻辑。



**所以 使用 Slice 可以简化 Redux 的使用，使状态管理更加容易和高效。它提供了一种声明性的方式来定义状态更新的行为，并自动处理状态的更新逻辑，减少了冗余的代码和手动编写的工作量。**

## 怎么用

将以下代码放在刚创建的ToDoSlice.jsx文件中
```jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoList: [],
  sortCriteria: "All",
};

const ToDoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodoList: (state, action) => {
      state.todoList = action.payload;
    },
    addTodo: (state, action) => {
      state.todoList.push({
        task: action.payload.task,
        id: action.payload.id,
        completed: false,
      });
    },
    sortTodo: (state, action) => {
      state.sortCriteria = action.payload;
    },
    updateTodo: (state, action) => {
      const { id, task } = action.payload;
      const index = state.todoList.findIndex((todo) => todo.id === id);
      state.todoList[index].task = task;
    },
    toggleCompleted: (state, action) => {
      const { id } = action.payload;
      const index = state.todoList.findIndex((todo) => todo.id === id);
      state.todoList[index].completed = !state.todoList[index].completed;
    },
  },
});

export const { setTodoList, addTodo, sortTodo, updateTodo, toggleCompleted } =
  ToDoSlice.actions;

export default ToDoSlice.reducer;
```

这段代码是使用 Redux Toolkit 中的 `createSlice` 函数创建了一个 Redux 的 Slice（切片），用于管理 ToDoList 相关的状态。

- `createSlice` 函数接受一个配置对象，其中包括初始状态 `initialState` 和一组自动生成的 reducer 函数。
- `name` 字段指定了这个 Slice 的名称，可以在整个应用程序中唯一标识这个 Slice。
- `initialState` 是状态的初始值，包含了 `todoList` 和 `sortCriteria` 两个字段。
- `reducers` 是一个包含了多个 reducer 函数的对象，每个 reducer 函数负责处理特定的 action，并对状态进行相应的更新。
  - `setTodoList` reducer 接收一个 action，将传入的 `action.payload`（todoList）赋值给状态中的 `todoList` 字段。
  - `addTodo` reducer 接收一个 action，将传入的 `action.payload`（包含 task 和 id）作为新的 todo 添加到 `todoList` 中。
  - `sortTodo` reducer 接收一个 action，将传入的 `action.payload`（sortCriteria）赋值给状态中的 `sortCriteria` 字段。
  - `updateTodo` reducer 接收一个 action，根据传入的 `action.payload` 中的 id 和 task 更新对应的 todo。
  - `toggleCompleted` reducer 接收一个 action，根据传入的 `action.payload` 中的 id，切换对应的 todo 的 `completed` 状态。

最后，通过 `ToDoSlice.actions` 导出了这些 reducer 函数，可以在组件中通过 `dispatch` 函数来触发相应的 action，从而更新状态。而 `ToDoSlice.reducer` 则导出了整个 Slice 的 reducer 函数，可以在 Redux 的 `configureStore` 中作为参数进行配置，以创建 Redux store。

在我们的目标中，有
1. 显示todolist
2. 增加todolist
3. 查找todolist
4. 修改todolist
   
而在上述代码中，
1. `setTodoList` reducer对应显示todolist
2. `addTodo` reducer对应增加todolist
3. `sortTodo`reducer以及`toggleCompleted` reducer对应增加查找todolist
4. `updateTodo` reducer对应修改todolist

## 整合slice

在frontend\src\Store下新建store.jsx

写入以下代码
```jsx
import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "../ToDoSlice";

const store = configureStore({
  reducer: {
    todo: TodoReducer,
  },
});

export default store;
```

### configureStore

`configureStore` 是 Redux Toolkit 提供的一个函数，用于创建 Redux store。

Redux store 是应用程序中存储状态的地方。它是一个对象，包含整个应用程序的状态，并提供了一些方法来更新和访问状态。

`configureStore` 函数的作用是简化 Redux store 的创建过程，它接受一个配置对象作为参数，可以通过配置对象来进行一些自定义的设置，例如指定 reducer、中间件、预加载状态等。

使用 `configureStore` 可以省去手动配置 Redux store 的繁琐步骤，它内部集成了一些常用的 Redux 插件和工具，让创建和管理 Redux store 更加简单和高效。

在上述代码中，通过调用 `configureStore` 函数并传入一个包含 `todo` reducer 的配置对象，创建了 Redux store，并将其导出供应用程序的其他部分使用。

### 代码解读

这段代码使用 Redux Toolkit 的 `configureStore` 函数创建了 Redux store，并将 `TodoReducer` 作为根 reducer 进行配置。

- `configureStore` 函数接受一个配置对象，其中的 `reducer` 字段用于指定应用程序的根 reducer。
- `TodoReducer` 是一个通过 Redux Toolkit 的 `createSlice` 函数创建的 reducer，负责管理 TodoList 相关的状态。

通过将 `TodoReducer` 作为根 reducer 配置给 `reducer` 字段，创建的 Redux store 就可以管理和处理与 TodoList 相关的状态变化。

最后，通过 `export default store` 将创建的 Redux store 导出，以便在应用程序的其他部分使用。

## 让该slice全局可用

在frontend\src\main.jsx中，用以下代替
```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Store/store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```
其中

```jsx
<Provider store={store}> </Provider>
```
 是 React Redux 库提供的一个组件，用于在应用程序中将 Redux 的状态（store）与 React 组件连接起来。

在 Redux 中，状态被存储在一个单一的全局存储对象中，该对象称为 "store"。`<Provider>` 组件的作用是将这个 Redux 的 store 对象传递给整个应用程序的组件树，使得所有的组件都能够访问到该 store。

通过将 `store` 对象作为 `store` 属性传递给 `<Provider>` 组件，应用程序中的所有组件都可以使用 ,从而获取或修改状态，并在状态发生变化时进行更新。

在上述代码中，通过将 `store` 作为属性传递给 `<Provider>` 组件，整个应用程序都可以访问到 Redux 的状态。这样，在应用程序中的任何地方，都可以使用 React Redux 提供的 hooks 或高阶组件来连接 Redux 的状态，以实现状态的读取和更新。