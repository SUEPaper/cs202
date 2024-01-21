---
id: font
sidebar_position: 4
---

# 文本和字体样式

## 字体系列、大小和样式
### 字体系列属性（font-family）
font-family：用于设置元素的字体系列，即指定要使用的字体名称或字体族名。您可以指定多个字体名称作为备选项，以便在第一个不可用时使用下一个字体。
```bash
body {
  font-family: Arial, sans-serif;
}
```
### 字体大小属性（font-size）
font-size：用于设置文本的字体大小。可以使用绝对单位（如像素px、点pt）、相对单位（如百分比%、em、rem）或其他相对于视口的单位（如vw、vh）来指定大小。
```bash
p {
  font-size: 16px;
}
```
### 字体样式属性（font-style）
font-style：用于设置文本的字体样式，例如斜体。可以设置为 normal（默认，正常样式）、italic（斜体）或 oblique（倾斜，与斜体类似但有一些差异）。
```bash
p {
  font-style: italic;
}
```

## 文字间距、行高和对齐
### 文字间距属性（letter-spacing）
letter-spacing：用于设置文本字符之间的间距。可以使用像素值、相对单位（如em、rem）或者正负值来调整间距。正值增加间距，负值减少间距。
```bash
p {
  letter-spacing: 2px;
}
```
### 行高属性（line-height）
line-height：用于设置文本行之间的高度。可以使用无单位的数值、相对单位（如百分比、em、rem）或具体的长度单位来指定行高。
```bash
p {
  line-height: 1.5;
}
```
### 文本对齐属性（text-align）：
text-align：用于设置文本的对齐方式。可以设置为 left（左对齐）、right（右对齐）、center（居中对齐）或 justify（两端对齐）。
```bash
p {
  text-align: center;
}
```
### 垂直对齐属性（vertical-align）：
vertical-align：用于设置行内元素的垂直对齐方式。可以设置为 baseline（基线对齐，默认值）、top（顶部对齐）、middle（中部对齐）、bottom（底部对齐）等。
```bash
span {
  vertical-align: middle;
}
```
这些属性可以应用于文本或具有文本内容的元素，以调整文本之间的间距、行高和对齐方式。您可以根据设计需求自定义这些属性的值，以实现所需的文本外观和排版效果。
## 文字装饰和变换
### 文字装饰属性（text-decoration）
text-decoration：用于设置文本的装饰效果，例如下划线、删除线等。可以设置为 none（无装饰）、underline（下划线）、overline（上划线）、line-through（删除线）或它们的组合。
```bash
p {
  text-decoration: underline;
}
```
### 文字转换属性（text-transform）：
text-transform：用于设置文本的大小写转换效果。可以设置为 none（无转换）、uppercase（转为大写字母）、lowercase（转为小写字母）或 capitalize（每个单词首字母大写）。
```bash
h1 {
  text-transform: uppercase;
}
```
### 文字阴影属性（text-shadow）：
text-shadow：用于设置文本的阴影效果。可以指定阴影的水平偏移、垂直偏移、模糊半径和颜色。
```bash
h2 {
  text-shadow: 2px 2px 4px #000000;
}

```
### 文字溢出属性（text-overflow）
text-overflow：用于控制当文本溢出容器时的处理方式。可以设置为 clip（裁剪溢出部分）或 ellipsis（用省略号表示溢出部分）。通常与 overflow: hidden 和 white-space: nowrap 一起使用。
```bash
p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```
### 字体变换属性（font-variant）
font-variant：用于设置文本的字体变换效果，例如小型大写字母。可以设置为 normal（正常显示）、small-caps（使用小型大写字母）或 inherit（继承父元素的字体变换效果）
```bash
p {
  font-variant: small-caps;
}
```
通过设置这些属性的值，您可以为文字添加装饰效果、转换大小写、添加阴影、处理文字溢出，并对字体进行特殊变换。这些属性提供了灵活的选项，以满足不同设计需求。
## 高级字体属性（字体加载和字体显示）
### 字体加载属性（@font-face）
@font-face：用于定义自定义字体，使浏览器能够加载和显示非标准字体。您可以指定字体的名称、字体文件的路径和格式，并定义字体的各种属性。
```bash
@font-face {
  font-family: "CustomFont";
  src: url("path/to/font.woff2") format("woff2"),
       url("path/to/font.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}

p {
  font-family: "CustomFont", sans-serif;
}
```
### 字体显示属性（font-display）
font-display：用于控制在字体加载期间的文本显示方式，以提供更好的用户体验。您可以设置为 auto（默认，浏览器自动选择显示方式）、block（直接显示文本，可能会出现 FOIT，Flash of Invisible Text）、swap（在字体下载完成前显示备用字体）或 fallback（在字体下载完成前显示备用字体，但保留文本的占位）。
```bash
@font-face {
  font-family: "CustomFont";
  src: url("path/to/font.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

p {
  font-family: "CustomFont", sans-serif;
}
```
这些高级字体属性允许使用自定义字体，并对字体加载和字体显示进行更细粒度的控制。通过定义字体文件的路径和格式，以及使用适当的字体加载和显示属性，可以确保页面上的字体能够正确加载和显示，提供更好的用户体验。