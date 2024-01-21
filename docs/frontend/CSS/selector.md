---
id: selector
sidebar_position: 2
---

# CSS 选择器

## 选择器概述
CSS选择器是用于选择HTML元素并应用样式的模式。选择器基于元素的标签名、类名、ID、属性等进行匹配。
## 基本选择器

### 标签选择器
标签选择器: 通过元素的标签名来选择HTML文档中的元素。标签选择器使用标签名作为选择器来选择匹配的元素。以下是一些常见的CSS标签选择器的示例：
1、选择所有段落元素（&#60p>）：
```bash
p {
  /* CSS样式规则 */
}
```
2、选择所有标题元素（&#60h1>、&#60h2>、&#60h3>等）
```bash
h1, h2, h3 {
  /* CSS样式规则 */
}
```
3、选择所有链接元素（&#60a>）：
```bash
a {
  /* CSS样式规则 */
}
```
4、选择所有列表元素（&#60ul>、&#60ol>、&#60li>等）：
```bash
ul, ol, li {
  /* CSS样式规则 */
}
```
5、选择所有表格元素（&#60table>、&#60tr>、&#60td>等）：
```bash
table, tr, td {
  /* CSS样式规则 */
}
```
通过标签选择器，可以选择和应用样式于特定的HTML元素，从而实现对网页外观和布局的控制。请注意，标签选择器会选择所有匹配的元素，因此在应用样式时需要谨慎使用，以免影响到整个文档中的所有相应元素。

### 类选择器
类选择器: 通过元素的类名来选择HTML文档中的元素。类选择器使用类名前面的"."来进行选择。可以在HTML元素中使用"class"属性为元素指定一个或多个类名，然后使用类选择器选择具有相同类名的元素，并为其应用样式规则。以下是一些示例：
1、选择具有 "my-class" 类的元素：
```bash
.my-class {
  /* CSS样式规则 */
}
```
在HTML中的元素示例：
```bash
<div class="my-class">This is a div with my-class</div>
<p class="my-class">This is a paragraph with my-class</p>
```
2、选择具有多个类名的元素：
```bash
.class1.class2 {
  /* CSS样式规则 */
}
```
在HTML中的元素示例：
```bash
<div class="class1 class2">This is a div with class1 and class2</div>
<p class="class1 class2">This is a paragraph with class1 and class2</p>
```
3、可以与其他选择器组合使用，例如与标签选择器组合：
```bash
p.my-class {
  /* CSS样式规则 */
}
```
在HTML中的元素示例：
```bash
<p class="my-class">This is a paragraph with my-class</p>
```
### ID 选择器
ID选择器（ID Selector）：通过元素的ID属性选择元素。ID选择器使用"#"加上ID值进行选择。ID在文档中应该是唯一的。例如，选择具有"my-id" ID的元素：
```bash
#my-id {
  /* CSS样式规则 */
}
```

## 组合选择器
CSS组合选择器是一种强大的选择器，它允许您选择满足多个条件的元素。通过组合不同的选择器，您可以更精确地选择目标元素并应用相应的样式。
### 子选择器
子元素选择器（Child Selector）：选择某个元素的直接子元素。它使用 > 符号进行选择。例如，选择 div 元素的直接子元素中的所有 p 元素：
```bash
div > p {
  /* CSS样式规则 */
}
```
### 后代选择器
后代选择器（Descendant Selector）：选择某个元素的后代元素。它使用空格分隔不同元素。例如，选择 div 元素内部的所有 p 元素：
```bash
div p {
  /* CSS样式规则 */
}
```
### 相邻兄弟选择器
相邻兄弟选择器（Adjacent Sibling Selector）：选择某个元素的下一个相邻兄弟元素。它使用 + 符号进行选择。例如，选择紧接在 h1 元素后的第一个 p 元素：
```bash
h1 + p {
  /* CSS样式规则 */
}
```
### 通用兄弟选择器
通用兄弟选择器（General Sibling Selector）：选择某个元素之后的所有兄弟元素。它使用 ~ 符号进行选择。例如，选择紧接在 h1 元素后的所有 p 元素：
```bash
h1 ~ p {
  /* CSS样式规则 */
}
```
## 属性选择器
CSS属性选择器允许您根据元素的属性及其属性值来选择元素并应用样式。属性选择器提供了更灵活的选择方式，可以根据属性的存在、特定值或值的匹配模式来选择元素。
### 存在属性选择器
存在属性选择器（Existence Attribute Selector）：选择具有指定属性的元素。例如，选择具有 "href" 属性的所有链接元素：
```bash
a[href] {
  /* CSS样式规则 */
}
```
### 精确值属性选择器
精确值属性选择器（Exact Value Attribute Selector）：选择具有指定属性值的元素。例如，选择 input 元素的 type 属性值为 "text" 的元素：
```bash
input[type="text"] {
  /* CSS样式规则 */
}
```
### 包含值属性选择器
包含值属性选择器（Substring Value Attribute Selector）：选择属性值中包含指定值的元素。例如，选择具有以 "example" 开头的 class 属性值的元素：
```bash
[class^="example"] {
  /* CSS样式规则 */
}
```
### 结束值属性选择器
结束值属性选择器（Suffix Value Attribute Selector）：选择属性值以指定值结尾的元素。例如，选择具有以 ".jpg" 结尾的 src 属性值的图片元素：
```bash
img[src$=".jpg"] {
  /* CSS样式规则 */
}
```
### 包含词属性选择器
包含词属性选择器（Word Value Attribute Selector）：选择属性值中包含指定词的元素。例如，选择具有包含 "red" 的 class 属性值的元素：
```bash
[class~="red"] {
  /* CSS样式规则 */
}
```
## 伪类选择器
伪类选择器（Pseudo-class Selector）是CSS中用于选择元素的一种机制，它允许您选择特定状态或特定位置的元素。伪类选择器以冒号（":"）作为前缀，用于选择不同的元素状态或行为。以下是一些常见的伪类选择器的示例：

1、链接伪类选择器：
- link：选择所有未访问过的链接。
- visited：选择所有已访问过的链接。

2、鼠标状态伪类选择器：
- :hover：选择鼠标悬停在元素上的状态。
- :active：选择鼠标点击正在进行的状态。
3、焦点伪类选择器：
- :focus：选择当前获取焦点的元素。
4、选中状态伪类选择器：
- :checked：选择被选中的输入框或选项。
5、第一个和最后一个伪类选择器：
- :first-child：选择父元素的第一个子元素。
- :last-child：选择父元素的最后一个子元素。
6、奇偶行伪类选择器：
- :nth-child(odd)：选择父元素的奇数位置的子元素。
- :nth-child(even)：选择父元素的偶数位置的子元素。
7、目标伪类选择器：
- :target：选择与URL片段标识符匹配的元素。

这只是一小部分伪类选择器的示例，还有许多其他伪类选择器可用于选择元素的不同状态和位置。伪类选择器为开发人员提供了一种强大的工具，以根据元素的状态和行为来选择和样式化元素，实现交互性和可视化效果。
## 伪元素选择器
CSS伪元素选择器（Pseudo-element Selector）允许您选择并样式化元素的某个特定部分。伪元素选择器使用双冒号（"::"）作为前缀，用于选择元素的特定部分或生成的内容。以下是一些常见的伪元素选择器的示例：
1、::before：在元素内容之前插入生成的内容。
```bash
.element::before {
  /* CSS样式规则 */
}
```
2、::after：在元素内容之后插入生成的内容。
```bash
.element::after {
  /* CSS样式规则 */
}
```
3、::first-line：选择元素内容的第一行。
```bash
.element::first-line {
  /* CSS样式规则 */
}
```
4、::first-letter：选择元素内容的第一个字母。
```bash
.element::first-letter {
  /* CSS样式规则 */
}
```
5、::selection：选择用户选择的文本部分。
```bash
::selection {
  /* CSS样式规则 */
}
```
这些伪元素选择器使您能够针对元素的特定部分或生成的内容应用样式。您可以使用伪元素选择器来插入生成的内容、样式化文本的首字母或首行以及样式化用户选择的文本等。伪元素选择器为开发人员提供了一种更细粒度的控制和样式化元素的能力。请注意，伪元素选择器通常需要与 content 属性一起使用，以定义生成的内容或样式化效果。
