---
id: list
sidebar_position: 5
---

# 列表样式
在CSS中，可以使用list-style属性来设置列表的样式，包括列表项的标记符号和标记的位置。下面是一些常用的列表样式属性：
## 列表样式类型（list-style-type）
list-style-type：用于设置列表项的标记符号的类型。

可以设置为以下值之一：
- none：无标记符号（默认）。
- disc：实心圆点。
- circle：空心圆点。
- square：实心方块。
- decimal：十进制数字。
- decimal-leading-zero：前导零的十进制数字。
- lower-roman：小写罗马数字。
- upper-roman：大写罗马数字。
- lower-alpha：小写字母。
- upper-alpha：大写字母。
- lower-greek：小写希腊字母。
- upper-greek：大写希腊字母。
```bash
ul {
  list-style-type: disc;
}
```
## 列表样式位置（list-style-position）
list-style-position：用于设置列表项的标记符号的位置。可以设置为以下值之一：
- inside：标记符号位于列表项内部（默认）。
- outside：标记符号位于列表项外部。
```bash
ul {
  list-style-position: outside;
}
```
## 列表样式图像（list-style-image）：
list-style-image：用于设置列表项的自定义标记图像。可以使用URL指定图像的路径。
```bash
ul {
  list-style-image: url("path/to/image.png");
}
```
使用这些列表样式属性，可以自定义列表的外观，包括标记符号的类型、位置和自定义图像。根据设计需求，可以选择适合的样式来使列表更具吸引力和可读性。