---
id: data
sidebar_position: 3
---

# 其他数据类型

## 数组

---
在 JavaScript 中，数组是一种用于存储多个值的有序集合。

### 1. 声明数组 
   
   可以使用 `[]` 或 `Array` 构造函数来声明一个空数组，并使用索引访问和修改数组的元素。
```javascript
    let myArray = []; // 声明一个空数组
    let colors = ['red', 'green', 'blue']; // 声明一个包含三个元素的数组
```

### 2. 访问和修改数组元素： 
   
   可以使用索引来访问和修改数组中的元素。注意，数组的索引从 0 开始。
```javascript
    let fruits = ['apple', 'banana', 'orange'];
    console.log(fruits[0]); // 输出 'apple'
    fruits[1] = 'kiwi'; // 修改数组中的元素
    console.log(fruits); // 输出 ['apple', 'kiwi', 'orange']
```


### 3. 数组的常用方法： 
   
   JavaScript 提供了一系列用于操作数组的内置方法，例如添加元素、删除元素、查找元素等。以下是一些常用的数组方法：

   |函数名|作用|
   |:-|:-:|
   | `push()` |向数组末尾添加一个或多个元素。|
   | `pop()` |移除并返回数组的最后一个元素。|
   | `shift()` |移除并返回数组的第一个元素。|
   | `unshift()` |向数组开头添加一个或多个元素。|
   | `concat()` |连接两个或多个数组，并返回一个新数组。|
   | `splice()` |从数组中添加、删除或替换元素。|
   | `slice()` |从数组中提取指定范围的元素，并返回一个新数组。|
   | `indexOf()` |返回指定元素在数组中的索引，如果不存在则返回 -1。|
    | `includes()` |判断数组是否包含指定元素，返回布尔值。|


## 字符串
---
在基本语法中我们提到了字符串是如何声明的，接下来就让我们来更加深入了解一下字符串：

### 1. 字符串的属性和方法 

JavaScript 提供了一些字符串的内置属性和方法，用于操作和处理字符串。

|函数名|作用|
|:-|:-:|
| `length` |获取字符串的长度。|
| `toUpperCase()` |将字符串转换为大写。|
| `toLowerCase()` |将字符串转换为小写。|
| `charAt(index)` |返回指定索引位置的字符。|
| `concat(str1, str2)` |将两个或多个字符串拼接成一个新字符串。|
| `indexOf(substring)` |返回子字符串第一次出现的索引位置，如果不存在则返回 -1。|
| `lastIndexOf(substring)` |返回子字符串最后一次出现的索引位置，如果不存在则返回 -1。|
| `substring(startIndex, endIndex)` |提取指定范围的子字符串。|
| `split(separator)` |将字符串拆分为字符串数组，根据指定的分隔符进行拆分。|
| `replace(searchValue, replaceValue)` |替换字符串中的内容。|
| `trim()` |去除字符串两端的空格。|

### 2. 字符串的拼接
可以使用 + 运算符或模板字符串来拼接字符串。
```javascript
    let firstName = 'John';
    let lastName = 'Doe';
    let fullName = firstName + ' ' + lastName; // 使用 + 运算符拼接字符串
    console.log(fullName); // 输出 'John Doe'

    let age = 25;
    let info = `Name: ${fullName}, Age: ${age}`; // 使用模板字符串拼接字符串
    console.log(info); // 输出 'Name: John Doe, Age: 25'
```

### 3. 访问和修改字符串中的字符
可以使用索引访问字符串中的字符，但是字符串是不可变的，无法直接修改字符串中的字符。如果需要修改字符串，需要创建一个新的字符串。
```javascript
    let str = 'Hello';
    console.log(str[0]); // 输出 'H'
    // str[0] = 'M'; // 无法直接修改字符串中的字符，会导致错误
    let newStr = 'M' + str.slice(1); // 创建一个新的字符串
    console.log(newStr); // 输出 'Mello'
```


## Map
---
在 JavaScript 中，`Map` 是一种数据结构，用于存储键值对的集合。它类似于对象（ `Object` ），但有一些不同之处。

以下是关于 JavaScript 中 `Map` 的一些要点：

### 1. 创建 Map 对象
可以使用 `new Map()` 构造函数来创建一个空的 `Map` 对象。
```javascript
    let map = new Map(); // 创建一个空的 Map 对象
```

### 2. 添加和获取键值对
使用 `set(key, value)` 方法向 `Map` 中添加键值对，并使用 `get(key)` 方法获取指定键的值。
```javascript
    let map = new Map();
    map.set('name', 'John');
    map.set('age', 25);

    console.log(map.get('name')); // 输出 'John'
    console.log(map.get('age')); // 输出 25
```

### 3. 判断键是否存在
使用 has(key) 方法可以判断 Map 中是否存在指定的键。

```javascript
    let map = new Map();
    map.set('name', 'John');

    console.log(map.has('name')); // 输出 true
    console.log(map.has('age')); // 输出 false
```

### 4. 删除键值对
使用 `delete(key) ` 方法可以删除 `Map` 中指定的键值对。
``` javascript
    let map = new Map();
    map.set('name', 'John');
    map.set('age', 25);

    map.delete('age');
    console.log(map.get('age')); // 输出 undefined
```

### 5. 遍历 Map
可以使用 `for`...`of` 循环或 `forEach()` 方法来遍历 `Map` 中的键值对。
```javascript
    let map = new Map();
    map.set('name', 'John');
    map.set('age', 25);

    // 使用 for...of 遍历
    for (let [key, value] of map) {
        console.log(key, value);
    }

    // 使用 forEach() 方法遍历
    map.forEach((value, key) => {
        console.log(key, value);
    });
```

### 6. 获取 Map 的大小
使用 `size` 属性可以获取 `Map` 中键值对的数量。
```javascript
    let map = new Map();
    map.set('name', 'John');
    map.set('age', 25);

    // 使用 for...of 遍历
    for (let [key, value] of map) {
        console.log(key, value);
    }

    // 使用 forEach() 方法遍历
    map.forEach((value, key) => {
        console.log(key, value);
    });
```

### 小结
`Map` 对象在 JavaScript 中提供了一种更灵活和强大的键值对存储方式，适用于需要高效地存储和检索键值对的场景。与对象相比，`Map` 具有更丰富的方法和功能，能够满足更复杂的数据操作需求。

## Set
---
`Set` 是一种集合数据结构，用于存储唯一的值，没有重复的元素。
### 1. 创建 Set 对象
可以使用 `new Set()` 构造函数来创建一个空的 `Set` 对象。
```javascript
    let set = new Set(); // 创建一个空的 Set 对象
```

### 2. 添加和获取元素
使用 `add(value)` 方法向 `Set` 中添加元素，并使用 `has(value)` 方法判断 `Set` 中是否存在指定的值。

```javascript
    let set = new Set();
    set.add('apple');
    set.add('banana');
    set.add('apple'); // 重复的值将被忽略

    console.log(set.has('apple')); // 输出 true
    console.log(set.has('orange')); // 输出 false
```

### 3. 删除元素
使用 `delete(value)` 方法可以从 `Set` 中删除指定的元素。

```javascript
    let set = new Set();
    set.add('apple');
    set.add('banana');

    set.delete('banana');
    console.log(set.has('banana')); // 输出 false
```

### 4. 获取 Set 的大小
使用 `size` 属性可以获取 `Set` 中元素的数量。

```javascript
    let set = new Set();
    set.add('apple');
    set.add('banana');

    console.log(set.size); // 输出 2
```

### 5. 遍历 Set
可以使用 `for`...`of` 循环或 `forEach()` 方法来遍历 `Set` 中的元素。

```javascript
    let set = new Set();
    set.add('apple');
    set.add('banana');

    // 使用 for...of 遍历
    for (let item of set) {
        console.log(item);
    }

    // 使用 forEach() 方法遍历
    set.forEach((value) => {
        console.log(value);
    });
```

### 6. 转换为数组
可以使用 `Array.from(set)` 或 `Array.from(set.values())` 将 `Set` 转换为数组。
```javascript
    let set = new Set();
    set.add('apple');
    set.add('banana');

    let array = Array.from(set);
    console.log(array); // 输出 ['apple', 'banana']
```

### 小结
`Set` 对象在 JavaScript 中提供了一种简单和高效的方式来存储唯一的值。它非常适用于需要保持元素唯一性的场景，例如去重、检查值是否存在等。与数组或对象相比，`Set` 提供了更直接的集合操作，可以更方便地处理集合数据。



## JSON 数据
---
在 JavaScript 中，JSON（JavaScript Object Notation）是一种用于表示数据的格式，它是一种轻量级的数据交换格式。JSON 数据由键值对组成，类似于 JavaScript 中的对象。以下是关于 JavaScript 中 JSON 数据的一些要点：

### 1. JSON 对象
在 JavaScript 中，可以使用 JSON 对象来解析和序列化 JSON 数据。JSON 对象提供了两个核心方法： `JSON.parse()` 和 `JSON.stringify()` 。

- `JSON.parse(jsonString)` ：将 JSON 字符串解析为 JavaScript 对象或数组。
- `JSON.stringify(value[, replacer[, space]])` ：将 JavaScript 对象或数组序列化为 JSON 字符串。

### 2. JSON 数据格式
JSON 数据由键值对组成，键和值之间使用冒号 `:` 分隔，不同的键值对之间使用逗号 `,` 分隔。值可以是字符串、数字、布尔值、对象、数组、`null` 等。字符串必须使用双引号 `"` `"` 包裹。

>以下是一个简单的 JSON 数据示例：
```javascript
    Copy code
    {
    "name": "John",
    "age": 25,
    "isStudent": true,
    "address": {
        "street": "123 Main St",
        "city": "New York"
    },
    "hobbies": ["reading", "music", "sports"],
    "isActive": null
    }
```

### 3. 解析 JSON 字符串
可以使用 `JSON.parse()` 方法将 JSON 字符串解析为 JavaScript 对象或数组。

```javascript
    Copy code
    let jsonString = '{"name":"John","age":25,"isStudent":true}';
    let data = JSON.parse(jsonString);

    console.log(data.name); // 输出 'John'
    console.log(data.age); // 输出 25
    console.log(data.isStudent); // 输出 true
```

### 3. 序列化为 JSON 字符串
可以使用 `JSON.stringify()` 方法将 JavaScript 对象或数组序列化为 JSON 字符串。

```javascript
    Copy code
    let data = {
    name: 'John',
    age: 25,
    isStudent: true
    };
    let jsonString = JSON.stringify(data);

    console.log(jsonString); // 输出 '{"name":"John","age":25,"isStudent":true}'
```

### 4. 处理复杂 JSON 数据
如果 JSON 数据包含嵌套的对象或数组，可以通过递归的方式访问和操作嵌套的属性。

```javascript
    Copy code
    let jsonString = '{"name":"John","address":{"street":"123 Main St","city":"New York"}}';
    let data = JSON.parse(jsonString);

    console.log(data.name); // 输出 'John'
    console.log(data.address.street); // 输出 '123 Main St'
    console.log(data.address.city); // 输出 'New York'
```

### 注意事项

JSON 数据必须使用双引号 `"` `"` 包裹键和字符串值。
JSON 中的键是唯一的，不能重复。
JSON 中的值可以是字符串、数字、布尔值、对象、数组、`null`。
JavaScript 中的 JSON 数据格式是一种常用的数据交换格式，在 Web 开发中经常用于前后端数据传输和存储。通过 `JSON.parse()` 和 `JSON.stringify()` 方法，可以在 JavaScript 中方便地解析和序列化 JSON 数据。