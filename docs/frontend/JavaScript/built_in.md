---
id: built-in
sidebar_position: 8
---

# 内置对象与函数

## Math 对象
---
Math对象是JavaScript中的一个内置对象，它提供了一组用于执行数学运算的属性和方法。通过Math对象，我们可以进行各种数学计算，如取整、求绝对值、计算三角函数等。

>下面是Math对象的一些常用属性和方法的示例：

|Math对象|作用|
|:-|:-:|
| `Math.PI` |表示圆周率 π 的近似值，约为 3.141592653589793。|
| `Math.abs(x)` |返回参数 x 的绝对值。|
| `Math.ceil(x)` |返回不小于参数 x 的最小整数。|
| `Math.floor(x)` |返回不大于参数 x 的最大整数。|
| `Math.round(x)` |返回参数 x 最接近的整数，四舍五入。|
| `Math.max(x1, x2, ...)` |返回参数中的最大值。|
| `Math.min(x1, x2, ...)` |返回参数中的最小值。|
| `Math.random()` |返回一个0到1之间的随机数。|
| `Math.sqrt(x)` |返回参数 x 的平方根。|
| `Math.pow(x, y)` |返回 x 的 y 次幂。|
| `Math.sin(x)` |返回参数 x 的正弦值。|
| `Math.tan(x)` |返回参数 x 的正切值。|

这只是Math对象的一小部分属性和方法。Math对象还提供了许多其他有用的数学函数和常量，可以根据具体需求进行使用。



## Date 对象
---
Date对象是JavaScript中的内置对象，用于处理日期和时间。通过Date对象，我们可以获取和设置当前日期和时间，进行日期和时间的计算和比较，以及格式化日期和时间的显示。

下面是Date对象的一些常用方法和属性的示例：

|Date对象|作用|
|:-|:-:|
| `new Date()` |创建一个表示当前日期和时间的Date对象。|
| `new Date(year, month, day, hours, minutes, seconds, milliseconds)` |创建一个指定日期和时间的Date对象。|
| `Date.now()` |返回当前的时间戳，以毫秒为单位。|
| `dateObj.getFullYear()` |返回Date对象中的年份。|
| `dateObj.getMonth()` |返回Date对象中的月份，范围是0-11。|
| `dateObj.getDate()` |返回Date对象中的日期。|
| `dateObj.getHours()` |返回Date对象中的小时数。|
| `dateObj.getMinutes()` |返回Date对象中的分钟数。|
| `dateObj.getSeconds()` |返回Date对象中的秒数。|
| `dateObj.getMilliseconds()` |返回Date对象中的毫秒数。|
| `dateObj.getDay()` |返回Date对象中的星期几，范围是0-6，其中0代表星期日。|
| `dateObj.toString()` |返回以字符串形式表示的日期和时间。|
| `dateObj.toLocaleDateString()` |返回以本地格式表示的日期字符串。|
| `dateObj.toLocaleTimeString()` |返回以本地格式表示的时间字符串。|
| `dateObj.getTime()` |返回Date对象表示的时间的时间戳，以毫秒为单位。|

通过这些方法和属性，我们可以对日期和时间进行各种操作，如获取特定部分的日期和时间、计算日期之间的差值、比较日期的先后等。同时，也可以将日期和时间格式化为需要的显示格式，以满足具体的需求。

请注意，JavaScript中的日期和时间操作基于客户端的本地时间，因此可能受到客户端时区和设置的影响。



## String 对象
---
String对象是JavaScript中的内置对象，用于处理字符串。通过String对象，我们可以对字符串进行各种操作，如字符串的拼接、查找、替换、截取等。

下面是String对象的一些常用方法的示例：

|String对象|作用|
|:-|:-:|
| `str.length` |返回字符串的长度。|
| `str.charAt(index)` |返回指定索引位置处的字符。|
| `str.concat(str1, str2, ...)` |将多个字符串连接起来，返回连接后的新字符串。|
| `str.indexOf(searchValue, startIndex)` |从指定索引位置开始查找字符串，返回第一个匹配项的索引，如果没有找到则返回-1。|
| `str.lastIndexOf(searchValue, startIndex)` |从指定索引位置开始从后往前查找字符串，返回最后一个匹配项的索引，如果没有找到则返回-1。|
| `str.substring(startIndex, endIndex)` |返回从起始索引到终止索引（不包括终止索引）之间的子字符串。|
| `str.slice(startIndex, endIndex)` |与substring方法类似，返回从起始索引到终止索引（不包括终止索引）之间的子字符串。|
| `str.replace(searchValue, replaceValue)` |将指定的字符串或正则表达式匹配项替换为新的字符串。|
| `str.split(separator)` |将字符串按指定的分隔符分割成数组。|
| `str.toLowerCase()` |将字符串转换为小写字母形式。|
| `str.toUpperCase()` |将字符串转换为大写字母形式。|
| `str.trim()` |去除字符串两端的空格。|
| `str.startsWith(searchValue)` |判断字符串是否以指定的字符串开头。|
| `str.endsWith(searchValue)` |判断字符串是否以指定的字符串结尾。|

这些方法只是String对象的一部分方法，还有其他很多有用的方法可供使用。String对象的方法可以帮助我们处理和操作字符串，实现字符串的拼接、格式化、搜索等功能。



## Array 对象
---
Array对象是JavaScript中的内置对象，用于创建和操作数组。通过Array对象，我们可以对数组进行各种操作，如元素的添加、删除、查找、排序等。

下面是Array对象的一些常用方法的示例：

|Array对象|作用|
|:-|:-:|
| `Array.isArray(arr)` |检查一个值是否为数组。|
| `arr.length` |返回数组的长度。|
| `arr.push(element1, element2, ...)` |将一个或多个元素添加到数组的末尾，并返回新数组的长度。|
| `arr.pop()` |从数组的末尾删除一个元素，并返回该元素。|
| `arr.unshift(element1, element2, ...)` |将一个或多个元素添加到数组的开头，并返回新数组的长度。|
| `arr.shift()` |从数组的开头删除一个元素，并返回该元素。|
| `arr.join(separator)` |将数组中的所有元素连接成一个字符串，并使用指定的分隔符分隔。|
| `arr.concat(arr1, arr2, ...)` |将多个数组合并成一个新数组。|
| `arr.slice(startIndex, endIndex)` |返回一个新数组，其中包含从起始索引到终止索引（不包括终止索引）之间的元素。|
| `arr.splice(startIndex, deleteCount, item1, item2, ...)` |从数组中删除、替换或添加元素。|
| `arr.indexOf(searchElement, startIndex)` |从指定索引位置开始查找元素，返回第一个匹配项的索引，如果没有找到则返回-1。|
| `arr.lastIndexOf(searchElement, startIndex)` |从指定索引位置开始从后往前查找元素，返回最后一个匹配项的索引，如果没有找到则返回-1。|
| `arr.sort()` |对数组中的元素进行排序。|
| `arr.reverse()` |颠倒数组中元素的顺序。|

这些方法只是Array对象的一部分方法，还有其他很多有用的方法可供使用。Array对象的方法可以帮助我们对数组进行各种操作，如增删改查、排序、连接等，方便地处理和管理数组数据。



## 其他常用函数
---
除了内置对象和函数之外，JavaScript还有许多其他常用的函数，这些函数可以通过直接调用来实现各种功能。以下是一些常见的JavaScript函数：

|函数|作用|
|:-|:-:|
| `parseInt(str, radix)` |将字符串转换为整数。radix参数可选，指定解析时的基数，默认为十进制。|
| `parseFloat(str)` |将字符串转换为浮点数。|
| `isNaN(value)` |检查一个值是否是NaN（Not a Number）。|
| `isFinite(value)` |检查一个值是否是有限数。|
| `parseFloat(str)` |将字符串转换为浮点数。|
| `String(value)` |将值转换为字符串。|
| `Number(value)` |将值转换为数字。|
| `encodeURI(uri)` |对URI进行编码。|
| `decodeURI(encodedURI)` |对已编码的URI进行解码。|
| `encodeURIComponent(uriComponent)` |对URI组件进行编码。|
| `decodeURIComponent(encodedURIComponent)` |对已编码的URI组件进行解码。|
| `setTimeout(callback, delay)` |设置一个定时器，在指定的延迟后执行回调函数。|
| `clearTimeout(timer)` |清除通过 `setTimeout` 函数设置的定时器。|
| `setInterval(callback, delay)` |设置一个间隔定时器，每隔指定的延迟时间执行一次回调函数。|
| `clearInterval(timer)` |清除通过 `setInterval` 函数设置的定时器。|

这些是JavaScript中的一些常见函数，它们可以用于字符串转换、类型判断、编码解码、定时器等各种场景。根据具体的需求，可以选择合适的函数来实现所需的功能。