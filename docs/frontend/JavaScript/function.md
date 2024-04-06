---
id: function
sidebar_position: 4
---

# 函数
函数是程序的主要“构建模块”。函数使该段代码可以被调用很多次，而不需要写重复的代码。

我们已经看到了内建函数的示例，如 alert(message)、prompt(message, default) 和 confirm(question)。但我们也可以创建自己的函数。

## 函数声明
使用函数声明创建函数。

function 关键字首先出现，然后是 函数名，然后是括号之间的 参数 列表（用逗号分隔，在上述示例中为空，我们将在接下来的示例中看到），最后是花括号之间的代码（即“函数体”）

```js showLineNumbers title="script.js"
function name(parameter1, parameter2, ... parameterN) {
  ...body...
}
```
我们的新函数可以通过名称调用：showMessage()。
```js showLineNumbers title="script.js"
function showMessage() {
  alert( 'Hello everyone!' );
}

showMessage();
```

## 局部变量
在函数中声明的变量只在该函数内部可见。
```js showLineNumbers title="script.js"
function name(parameter1, parameter2, ... parameterN) {
  ...body...
}
```
我们的新函数可以通过名称调用：showMessage()。
```js showLineNumbers title="script.js"
function showMessage() {
  alert( 'Hello everyone!' );
}

showMessage();
```
## 外部变量
函数对外部变量拥有全部的访问权限。函数也可以修改外部变量。
```js showLineNumbers title="script.js"
let userName = 'John';

function showMessage() {
  let message = 'Hello, ' + userName;
  alert(message);
}

showMessage(); // Hello, John
```
只有在没有局部变量的情况下才会使用外部变量。

如果在函数内部声明了同名变量，那么函数会 遮蔽 外部变量。例如，在下面的代码中，函数使用局部的 userName，而外部变量被忽略

:::tip 
全局变量

任何函数之外声明的变量，例如上述代码中的外部变量 userName，都被称为 全局 变量。

全局变量在任意函数中都是可见的（除非被局部变量遮蔽）。

减少全局变量的使用是一种很好的做法。现代的代码有很少甚至没有全局变量。大多数变量存在于它们的函数中。但是有时候，全局变量能够用于存储项目级别的数据。
:::

## 参数
当一个值被作为函数参数（parameter）传递时，它也被称为 参数（argument）。
- 参数（parameter）是函数声明中括号内列出的变量（它是函数声明时的术语）。
- 参数（argument）是调用函数时传递给函数的值（它是函数调用时的术语）。

我们声明函数时列出它们的参数（parameters），然后调用它们传递参数（arguments）。
```js showLineNumbers title="script.js"
function showMessage(from, text) { // 参数：from 和 text
  alert(from + ': ' + text);
}

showMessage('Ann', 'Hello!'); // Ann: Hello! (*)
showMessage('Ann', "What's up?"); // Ann: What's up? (**)
```
from 和 text 是两个参数，当函数在 (*) 和 (**) 行中被调用时，给定值被复制到了局部变量 from 和 text。然后函数使用它们进行计算。

## 默认值
如果一个函数被调用，但有参数（argument）未被提供，那么相应的值就会变成 undefined。那不是错误，因为参数 text 的值未被传递，所以变成了 undefined。

我们可以使用 = 为函数声明中的参数指定所谓的“默认”（如果对应参数的值未被传递则使用）值：
```js showLineNumbers title="script.js"
function showMessage(from, text = "no text given") {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: no text given
```
现在如果 text 参数未被传递，它将会得到值 "no text given"。

## 返回值
函数可以将一个值返回到调用代码中作为结果。

指令 return 可以在函数的任意位置。当执行到达时，函数停止，并将值返回给调用代码。

在一个函数中可能会出现很多次 return：
```js showLineNumbers title="script.js"
function checkAge(age) {
  if (age >= 18) {
    return true;
  } else {
    return confirm('Got a permission from the parents?');
  }
}

let age = prompt('How old are you?', 18);

if ( checkAge(age) ) {
  alert( 'Access granted' );
} else {
  alert( 'Access denied' );
}
```

只使用 return 但没有返回值也是可行的。但这会导致函数立即退出。
:::tip 
空值的 return 或没有 return 的函数返回值为 undefined

如果函数无返回值，它就会像返回 undefined 一样：
```js showLineNumbers title="script.js"
function doNothing() { /* 没有代码 */ }

alert( doNothing() === undefined ); // true
```
空值的 return 和 return undefined 等效：
```js showLineNumbers title="script.js"
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```

不要在 return 与返回值之间添加新行
:::

## 函数命名
函数就是行为（action）。所以它们的名字通常是动词。它应该简短且尽可能准确地描述函数的作用。这样读代码的人就能清楚地知道这个函数的功能。

一种普遍的做法是用动词前缀来开始一个函数，这个前缀模糊地描述了这个行为。团队内部必须就前缀的含义达成一致。

- "get…" —— 返回一个值
- "calc…" —— 计算某些内容
- "create…" —— 创建某些内容
- "check…" —— 检查某些内容并返回 boolean 值，等
- showMessage(..)     // 显示信息
- getAge(..)          // 返回 age（gets it somehow）
- calcSum(..)         // 计算求和并返回结果
- createForm(..)      // 创建表单（通常会返回它）
- checkPermission(..) // 检查权限并返回 true/false

:::tip 
一个函数 —— 一个行为
一个函数应该只包含函数名所指定的功能，而不是做更多与函数名无关的功能。

两个独立的行为通常需要两个函数，即使它们通常被一起调用（在这种情况下，我们可以创建第三个函数来调用这两个函数）。

有几个违反这一规则的例子：
- getAge —— 如果它通过 alert 将 age 显示出来，那就有问题了（只应该是获取）。
- createForm —— 如果它包含修改文档的操作，例如向文档添加一个表单，那就有问题了（只应该创建表单并返回）。
- checkPermission —— 如果它显示 access granted/denied 消息，那就有问题了（只应执行检查并返回结果）。
  
这些例子假设函数名前缀具有通用的含义。你和你的团队可以自定义这些函数名前缀的含义，但是通常都没有太大的不同。无论怎样，你都应该对函数名前缀的含义、带特定前缀的函数可以做什么以及不可以做什么有深刻的了解。所有相同前缀的函数都应该遵守相同的规则。并且，团队成员应该形成共识。
:::

## 函数 == 注释
函数应该简短且只有一个功能。如果这个函数功能复杂，那么把该函数拆分成几个小的函数是值得的。有时候遵循这个规则并不是那么容易，但这绝对是件好事。

一个单独的函数不仅更容易测试和调试 —— 它的存在本身就是一个很好的注释！

比较如下两个函数 showPrimes(n)。它们的功能都是输出到 n 的 素数。

第一个变体使用了一个标签：
```js showLineNumbers title="script.js"
function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert( i ); // 一个素数
  }
}
```
我们通过函数名就可以看出函数的行为，而不需要通过代码。人们通常把这样的代码称为自描述,见函数名知道这个函数表达意思。

## 回调函数
我们写一个包含三个参数的函数 ask(question, yes, no)：

question 关于问题的文本

yes 当回答为 “Yes” 时，要运行的脚本

no 当回答为 “No” 时，要运行的脚本

函数需要提出 question（问题），并根据用户的回答，调用 yes() 或 no()：
```js showLineNumbers title="script.js"
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

function showOk() {
  alert( "You agreed." );
}

function showCancel() {
  alert( "You canceled the execution." );
}

// 用法：函数 showOk 和 showCancel 被作为参数传入到 ask
ask("Do you agree?", showOk, showCancel);
```
