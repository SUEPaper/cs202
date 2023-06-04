---
id: fun
sidebar_position: 4
---

# 函数概述

## 一、函数声明与调用

---
函数是一种可重复使用的代码块，用于执行特定任务或计算结果。函数提供了一种组织代码和模块化的方式，可以将一段代码封装在函数中，并通过函数名进行调用。在 JavaScript 中，函数可以通过函数声明或函数表达式来声明和调用。


### 1. 函数声明

使用函数声明可以创建一个命名函数，函数名后面跟着一对圆括号 `( )` 和函数体 `{ ... }` 。可以在任何地方声明函数，并且可以在声明之前或之后调用函数。

```javascript
// 函数声明
function greet(name) {
    console.log('Hello, ' + name + '!');
}

// 调用函数
greet('John'); // 输出 'Hello, John!'
```

### 2. 函数表达式

使用函数表达式可以将函数赋值给变量或表达式。函数表达式可以是匿名函数（没有名称）或具名函数（有名称）。

匿名函数和具名函数是 JavaScript 中两种不同的函数定义方式，它们在名称和函数的可见性方面有所不同。

#### 1）匿名函数：

匿名函数是指没有名称的函数。它通常通过函数表达式的方式定义，并将函数赋值给一个变量或传递给其他函数作为参数。

```javascript
// 匿名函数表达式
let greet = function(name) {
    console.log('Hello, ' + name + '!');
};

// 调用函数
greet('John'); // 输出 'Hello, John!'
```

> 匿名函数没有自己的名称，因此在函数内部无法通过函数名来递归调用自身。它们的主要特点是可以作为值来传递和赋值给变量，以便稍后调用或传递给其他函数。在函数表达式中，我们可以为匿名函数提供一个变量名，但这个变量名只在其所在的作用域内可见，外部作用域无法直接访问。

#### 2）具名函数：

具名函数是指具有名称的函数，它使用函数声明的方式定义。

```javascript
// 具名函数表达式
let sayHello = function hello() {
    console.log('Hello!');
};

// 调用函数
sayHello(); // 输出 'Hello!'
```

具名函数有一个名称，可以在函数内部和外部通过函数名进行调用和递归。具名函数的名称在其所在的作用域内是可见的，并且可以直接引用函数名来调用函数。

#### 区别总结：

* 匿名函数没有名称，具名函数有名称。
* 匿名函数通常通过函数表达式的方式定义，而具名函数通过函数声明的方式定义。
* 匿名函数在声明时可以将其赋值给变量或传递给其他函数，具名函数没有这样的需求。
* 匿名函数在其所在的作用域内可以使用变量名（如果有），具名函数的名称在其所在的作用域内是可见的。

无论是匿名函数还是具名函数，它们都在 JavaScript 中具有各自的用途和灵活性，可以根据不同的场景选择合适的方式来定义和使用函数。

### 3. 箭头函数：

箭头函数是一种更简洁的函数表达式形式，使用箭头 ( `=>` ) 来定义函数。箭头函数可以更紧凑地编写函数，省略了 `function` 关键字，并且自动绑定了外部作用域的 `this` 值。

```javascript
// 箭头函数
let add = (a, b) => {
    return a + b;
};

// 调用函数
let result = add(3, 5);
console.log(result); // 输出 8
```

### 小结

无论是函数声明还是函数表达式，都可以在声明之后通过函数名加上括号来调用函数。调用函数时，可以传递参数作为函数的输入，并且可以使用函数的返回值进行进一步的操作。

请注意，函数声明会在代码解析阶段被提升到当前作用域的顶部，因此可以在声明之前调用函数。而函数表达式需要在赋值之后才能被调用。

函数是 JavaScript 中非常重要的概念，它们为代码提供了可重用和模块化的结构。了解如何声明和调用函数是编写有效 JavaScript 代码的基础之一。

## 二、函数参数与返回值

---
在 JavaScript 中，函数参数用于传递数据给函数进行处理，而返回值用于将函数的执行结果返回给调用者。

### 1. 函数参数

函数参数是函数定义时声明的占位符，用于接收传递给函数的数据。函数可以定义零个或多个参数，每个参数都有一个名称和可选的默认值。在函数调用时，可以将具体的值传递给参数。

```javascript
function greet(name) {
    console.log('Hello, ' + name + '!');
}

greet('John'); // 输出 'Hello, John!'
```

> 在上述示例中， `greet` 函数接受一个参数 `name` ，用于存储传递给函数的值。在函数调用时，将字符串 `'John'` 作为参数传递给 `name` ，函数内部使用该值进行处理。

除了单个参数，JavaScript 函数还支持多个参数：

```javascript
function add(a, b) {
    return a + b;
}

let result = add(3, 5);
console.log(result); // 输出 8
```

> 在上述示例中， `add` 函数接受两个参数 `a` 和 `b` ，在函数调用时分别传递了值 `3` 和 `5` 。函数内部通过 `return` 关键字返回了参数 `a` 和 `b` 的和。

### 2. 函数返回值

函数可以通过 `return` 语句将一个值作为函数的返回值。当函数执行到 `return` 语句时，函数会立即停止执行，并将返回值传递给调用者。

```javascript
function multiply(a, b) {
    return a * b;
}

let result = multiply(3, 4);
console.log(result); // 输出 12
```

> 在上述示例中， `multiply` 函数接受两个参数 `a` 和 `b` ，并通过 `return` 语句返回了它们的乘积。函数调用时将结果赋值给变量 `result` ，并打印出结果。
如果函数没有显式地使用 `return` 语句返回值，则函数的返回值为 `undefined` 。
函数参数和返回值在 JavaScript 中非常常用，它们允许函数与外部环境进行数据交互和结果传递。通过合理使用参数和返回值，可以使函数更灵活和功能强大。

## 三、变量作用域
---
变量的作用域决定了变量在程序中的可见性和访问范围。了解 JavaScript 中的变量作用域非常重要，它有助于正确理解和管理变量的可见性和生命周期，避免出现变量冲突和错误。

JavaScript 中有三种 **变量作用域** ：
### 1. 全局作用域（Global Scope）
在代码中任何位置声明的变量，没有限定在特定的函数或代码块中，都属于全局作用域。全局作用域的变量在整个程序中都可访问。

```javascript
let globalVariable = 'I am in global scope';

function printGlobal() {
  console.log(globalVariable); // 可以访问全局变量
}

printGlobal(); // 输出 'I am in global scope'
```

### 2. 函数作用域（Function Scope）
在函数内部声明的变量属于函数作用域，只能在函数内部访问。函数作用域中的变量在函数执行结束后会被销毁。
```javascript
function printLocal() {
  let localVariable = 'I am in function scope';
  console.log(localVariable); // 可以访问函数作用域内的变量
}

printLocal(); // 输出 'I am in function scope'
console.log(localVariable); // 报错，无法访问函数作用域内的变量
```

### 3. 块级作用域（Block Scope）
块级作用域指由一对花括号 `{ ... }` 创建的代码块内部的作用域。在 **ES6** 引入 `let` 和 `const` 关键字之前，JavaScript 中没有块级作用域，只有全局作用域和函数作用域。
```javascript
function printBlock() {
  if (true) {
    let blockVariable = 'I am in block scope';
    console.log(blockVariable); // 可以访问块级作用域内的变量
  }
}

printBlock(); // 输出 'I am in block scope'
console.log(blockVariable); // 报错，无法访问块级作用域内的变量
```

**ES6** 引入的 `let` 和 `const` 关键字使得块级作用域成为可能。使用 `let` 或 `const` 声明的变量将限定在当前的块级作用域内。


## 四、词法作用域
词法作用域（Lexical Scope），也称静态作用域，指在代码编写阶段就确定的作用域。词法作用域决定了函数在定义时访问的变量，而不是函数被调用时的变量。
在词法作用域中，变量的可见性和访问权限是由它们在代码中的位置决定的，而不是函数被调用时的上下文。

在 JavaScript 中，词法作用域是由函数的 **定义位置** 决定的。当一个函数被定义时，它就会创建一个新的词法作用域，并且该作用域包含了函数内部的变量、函数参数以及外部环境中的变量。这意味着函数可以访问它定义时所处的作用域中的变量，即使在函数被调用时，它们可能不在同一个作用域中。

>下面是一个示例，说明了词法作用域的概念：

```javascript
let globalVariable = 'Global'; // 全局作用域

function outerFunction() {
  let outerVariable = 'Outer'; // 外部函数作用域

  function innerFunction() {
    let innerVariable = 'Inner'; // 内部函数作用域

    console.log(innerVariable); // 访问内部函数作用域的变量
    console.log(outerVariable); // 访问外部函数作用域的变量
    console.log(globalVariable); // 访问全局作用域的变量
  }

  innerFunction(); // 调用内部函数
}

outerFunction(); // 调用外部函数
```

>在上述示例中，内部函数 `innerFunction` 可以访问外部函数 `outerFunction` 中声明的变量 `outerVariable`，以及全局作用域中声明的变量 `globalVariable`。这是因为词法作用域保留了函数定义时的变量访问权限。

词法作用域的优势是它提供了一种可靠的变量查找机制，使得函数内部的变量和外部的变量能够正确地隔离和访问。这也是 JavaScript 中 **闭包的实现基础** ，闭包可以让函数记住定义时的词法作用域，即使在函数被调用后，仍然可以访问它定义时的变量。

## 五、闭包
---
闭包（Closure）是指一个函数能够访问并使用其词法作用域外的变量的能力。换句话说，闭包允许函数在定义时捕获其所在的词法作用域，并在之后的任何时间使用这些变量，即使在函数执行时所处的上下文不再存在。

在 JavaScript 中，闭包是由函数以及其周围的词法环境（包含该函数定义时的变量）组成的。当函数内部引用了外部的变量时，就创建了一个闭包。这使得函数可以访问并操作它所在的词法作用域中的变量，即使在函数被调用时，它们可能不在同一个作用域中。

>以下是一个示例，展示了闭包的概念：

```javascript
function outerFunction() {
  let outerVariable = 'I am from outer function';

  function innerFunction() {
    console.log(outerVariable); // 访问外部函数作用域中的变量
  }

  return innerFunction; // 返回内部函数
}

let closure = outerFunction(); // 调用外部函数并将返回的内部函数赋值给变量

closure(); // 执行内部函数，输出 'I am from outer function'
```

>在上述示例中，内部函数 innerFunction 引用了外部函数 outerFunction 中的变量 outerVariable。尽管 outerFunction 执行完毕后，其内部的变量 outerVariable 仍然可以通过闭包的方式被内部函数访问和使用。


闭包在 JavaScript 中有多种应用场景:
>
- 封装私有变量和函数，创建模块化的代码结构。
- 在异步操作中保留状态或数据。
- 创建函数工厂，动态生成函数。
- 实现柯里化（Currying）等高级函数概念。


使用闭包需要注意内存管理，因为闭包会持有外部环境中的变量引用，导致这些变量无法被垃圾回收。在不需要使用闭包时，应该及时释放相关的引用，以避免内存泄漏问题。

了解和灵活运用闭包可以让你写出更灵活、高效的 JavaScript 代码，并能理解某些高级概念和设计模式的实现原理。