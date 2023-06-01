---
id: basic
sidebar_position: 2
---

# 基本语法

## 一、变量声明

---
在JavaScript中，可以使用以下关键字来声明变量：

### 1. `var` 
在ES5及之前的版本中，使用var关键字声明变量。例如：
   

```javascript
   var name = 'John';
   var age = 25;
```

### 2. `let` 
在ES6中，引入了let关键字，用于声明**块级作用域**的**变量**。块级作用域是指在花括号 { } 内定义的作用域。
>例如：
```javascript
    let name = 'John';
    let age = 25;
```

### 3. `const` 
在ES6中，还引入了const关键字，用于声明**常量**，其值在声明后**不可被修改**。
   
   >例如：
```javascript
   const PI = 3.14;
   const MAX_SIZE = 100;
```

### 小结
- 在变量声明时，可以选择是否给变量赋初始值。如果未赋初始值，则变量的值为 `undefined` 。
另外， `let` 和 `const` 关键字还具有块级作用域的特性，使得变量的作用范围更加可控和清晰；而 `var` 关键字声明的变量是函数作用域或全局作用域的。

- 推荐使用 `let` 和 `const` 来声明变量，因为它们更安全、更符合预期的作用域行为，并且避免了一些潜在的问题。只在特定情况下使用 `var` ，比如需要兼容旧版本的 JavaScript 或者需要特定的作用域行为。
  
- 总而言之，JavaScript中的变量声明可以使用 `var` 、 `let` 和 `const` 关键字，具体选择哪个关键字取决于变量的作用范围和是否需要修改变量的值。

## 二、数据类型

---
### 1. 常见类型
JavaScript 中有多种数据类型，包括以下几种常见类型：

#### 1) 数字（Number）
表示数值，可以是整数或浮点数。
   >例如： `10` 、 `3.14` 。

#### 2) 字符串（String）
表示文本数据，使用引号（单引号或双引号）括起来。
   >例如： `'Hello'` 、 `"World"` 。

#### 3) 布尔值（Boolean）
表示逻辑值，只有两个取值： 
   > `true` （真）和 `false` （假）。

#### 4) 数组（Array）
表示有序的数据集合，使用方括号括起来，各元素之间用逗号分隔。
   >例如： `[1, 2, 3]` 、 `['apple', 'banana', 'orange']` 。

#### 5) 对象（Object）： 
表示键值对的集合，使用花括号括起来，每个键值对由键和值组成，键和值之间使用冒号分隔，键值对之间用逗号分隔。
>例如：`{ name: 'John', age: 25 }` 。

#### 6) 空值（Null）：
表示空值或不存在的对象引用。
   >例如：
```javascript
   let myVar = null; // 声明一个变量并将其赋值为空值
   console.log(myVar); // 输出 null
   // 当变量不再需要引用一个对象时，可以将其赋值为 null，释放内存资源
   let myObj = {
       name: 'John'
   };
   console.log(myObj); // 输出 { name: 'John' }
   myObj = null;
   console.log(myObj); // 输出 null
```

#### 7) 未定义（Undefined）：
表示未赋值的变量或不存在的属性。

在变量声明时，如果未赋初始值，则变量的值为 `undefined` 。
需要注意的是， `null` 是一个特殊的值，表示空值。与 `undefined` 不同， `undefined` 表示一个未初始化或不存在的值，而 `null` 是一个显式赋值的值。

### 2. 特殊类型
除了以上基本数据类型，JavaScript 还有一些特殊的类型：

#### 1) 函数（Function）：
表示一段可执行的代码块，可以在需要时调用执行。

#### 2) 日期（Date）：
表示日期和时间的数据类型。

#### 3) 正则表达式（Regular Expression）：
表示文本模式的描述，用于字符串匹配和替换。

#### 4) Symbol：
表示唯一的标识符，用于对象属性的键。

### 小结
JavaScript 是一种动态类型语言，变量的类型不是在声明时指定的，而是根据值的类型自动推断。同一个变量也可以在不同的上下文中持有不同的类型值。了解这些数据类型是进行 JavaScript 编程的基础。

## 三、运算符与表达式

---
在 JavaScript 中，运算符用于对值进行操作，而表达式由运算符、操作数和操作符组成。以下是常见的 JavaScript 运算符和表达式的示例：

### 1. 算术运算符
用于执行基本的数学运算，例如加法、减法、乘法、除法等。
   

```javascript
   let a = 10 + 5; // 加法运算
   let b = 10 - 5; // 减法运算
   let c = 10 * 5; // 乘法运算
   let d = 10 / 5; // 除法运算
```

### 2. 比较运算
用于比较两个值的关系，返回布尔值  `true` 或 `false` 。
   

```javascript
   let a = 10;
   let b = 5;
   let result = a > b; // 大于运算符，result 的值为 true
```

### 3. 逻辑运算符
用于组合多个条件，并返回布尔值。
   

```javascript
   let a = 10;
   let b = 5;
   let c = 20;
   let result = (a > b) && (c > b); // 逻辑与运算符，result 的值为 true
```

### 4. 赋值运算符
用于给变量赋值。
 

```javascript
   let a = 10; // 简单赋值运算符
   let b = 5;
   b += a; // 复合赋值运算符，等价于 b = b + a
```

### 5. 条件（三元）运算符
用于根据条件选择不同的值。
   

```javascript
   let a = 10;
   let b = (a > 5) ? '大于5' : '小于等于5'; // 条件运算符，b 的值为 '大于5'
```

### 6. 字符串拼接运算符
用于将字符串连接起来。
```javascript
   let greeting = 'Hello';
   let name = 'John';
   let message = greeting + ' ' + name; // 字符串拼接运算符，message 的值为 'Hello John'
```

### 小结
这只是一些常见的 JavaScript 运算符和表达式示例，JavaScript 还提供了更多丰富的运算符和表达式来处理不同的操作和计算需求。

## 四、语句与控制结构

---
在 JavaScript 中，语句用于执行特定的操作，而控制结构则用于控制程序的执行流程。以下是常见的 JavaScript 语句和控制结构的示例：

### 1. 条件语句（if...else）
根据给定的条件选择不同的代码块执行。
```javascript
   let num = 10;
   if (num > 0) {
       console.log('Number is positive');
   } else {
       console.log('Number is negative or zero');
   }
```

### 2. 循环语句（for、while、do...while）
重复执行一段代码，直到满足特定的条件。
```javascript
   for (let i = 0; i < 5; i++) {
       console.log(i);
   }

   let i = 0;
   while (i < 5) {
       console.log(i);
       i++;
   }

   let j = 0;
   do {
       console.log(j);
       j++;
   } while (j < 5);
```

### 3. 条件循环（for...in、for...of）
用于遍历对象的属性或数组的元素。
   

```javascript
   let obj = {
       name: 'John',
       age: 25
   };
   for (let prop in obj) {
       console.log(prop + ': ' + obj[prop]);
   }

   let arr = [1, 2, 3];
   for (let elem of arr) {
       console.log(elem);
   }
```

### 4. 选择语句（switch）
根据给定的表达式的值选择执行特定的代码块。
   

```javascript
   let color = 'red';
   switch (color) {
       case 'red':
           console.log('Color is red');
           break;
       case 'blue':
           console.log('Color is blue');
           break;
       default:
           console.log('Color is neither red nor blue');
   }
```

### 5. 跳转语句（break、continue）
用于跳出循环或继续循环的下一次迭代。
```javascript
   for (let i = 0; i < 5; i++) {
       if (i === 3) {
           break; // 跳出循环
       }
       console.log(i);
   }

   for (let i = 0; i < 5; i++) {
       if (i === 2) {
           continue; // 跳过当前迭代，继续下一次迭代
       }
       console.log(i);
   }
```

### 小结
以上是一些常见的 JavaScript 语句和控制结构的示例。通过使用这些语句和结构，可以实现不同的逻辑和流程控制，从而构建复杂的程序逻辑。
