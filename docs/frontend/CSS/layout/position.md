---
id: position
sidebar_position: 5
---

# 定位布局
定位布局（Positioning Layout）：通过CSS的定位属性（如position: absolute和position: relative）可以控制元素相对于其正常位置的定位方式。这使得可以将元素精确地放置在页面上的特定位置。
## 相对
相对定位布局是一种使用 CSS 的相对定位技术来微调元素位置的布局方法。相对定位允许你将元素相对于其正常位置进行偏移，而不会脱离文档流。以下是使用相对定位布局的基本步骤：

1、将父元素设置为相对定位容器：为父元素添加 position: relative 属性。这将创建一个相对定位的坐标系，使子元素的相对定位基于该父元素。

2、使用相对定位属性调整子元素的位置：为需要调整位置的子元素添加 position: relative 属性。然后，使用 top、right、bottom 和 left 属性来指定相对于其正常位置的偏移量。

下面是一个示例：

HTML 代码：
```bash
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
</div>
```
CSS 代码：
```bash
.container {
  position: relative;
  width: 300px;
  height: 200px;
  border: 1px solid #ccc;
}

.item {
  position: relative;
  top: 20px;
  left: 30px;
  background-color: #f1f1f1;
  padding: 10px;
}
```
在这个示例中，.container 是相对定位容器，它的宽度为 300px，高度为 200px，并带有一个边框。

.item 是容器内的子元素，它使用相对定位布局。通过设置 top: 20px 和 left: 30px，它相对于其正常位置向下和向右偏移。

使用相对定位布局，可以微调元素的位置，并使其相对于其正常位置进行偏移。这对于在页面布局中进行微小的调整非常有用，但相对定位不会改变其他元素的布局。请注意，相对定位的偏移是相对于元素自身的正常位置进行计算的。

## 绝对
绝对定位布局是一种使用 CSS 的绝对定位技术来精确控制元素位置的布局方法。绝对定位使元素脱离文档流，并相对于其最近的已定位祖先元素进行定位，或者相对于文档的初始包含块（通常是浏览器窗口）进行定位。以下是使用绝对定位布局的基本步骤：

1、将父元素设置为相对定位容器：为父元素添加 position: relative 属性。这将创建一个相对定位的坐标系，使绝对定位的子元素相对于该父元素进行定位。

2、使用绝对定位属性定位子元素：为需要定位的子元素添加 position: absolute 属性。然后，使用 top、right、bottom 和 left 属性来指定与其定位参考点（父元素或文档的初始包含块）的距离。

下面是一个示例：

HTML 代码：
```bash
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
</div>
```
CSS 代码：
```bash
.container {
  position: relative;
  width: 300px;
  height: 200px;
  border: 1px solid #ccc;
}

.item {
  position: absolute;
  top: 20px;
  left: 30px;
  background-color: #f1f1f1;
  padding: 10px;
}
```
在这个示例中，.container 是相对定位容器，它的宽度为 300px，高度为 200px，并带有一个边框。

.item 是容器内的子元素，它使用绝对定位布局。通过设置 top: 20px 和 left: 30px，它相对于 .container 定位，向下和向右偏移。

使用绝对定位布局，可以将元素精确地放置在所需的位置上，不受其他元素的影响。这对于创建重叠元素、悬浮元素、定位菜单等情况非常有用。请注意，绝对定位的偏移是相对于定位参考点（父元素或文档的初始包含块）进行计算的。
## 固定
固定定位布局是一种使用 CSS 的固定定位技术来将元素固定在浏览器窗口的特定位置上的布局方法。固定定位使元素脱离文档流，并相对于浏览器窗口进行定位，不会随页面滚动而改变位置。以下是使用固定定位布局的基本步骤：

1、使用固定定位属性定位元素：为需要固定的元素添加 position: fixed 属性。这将使元素相对于浏览器窗口进行定位。

2、使用 top、right、bottom 和 left 属性指定元素与浏览器窗口的距离。可以使用像素值、百分比值或其他长度单位来定义距离。

下面是一个示例：

HTML 代码：
```bash
<div class="fixed-element">
  This is a fixed element
</div>
```
CSS 代码：
```bash
.fixed-element {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #f1f1f1;
  padding: 10px;
}
```
在这个示例中，.fixed-element 是一个固定定位的元素。通过设置 position: fixed，它将相对于浏览器窗口进行定位。

使用 top: 20px 和 right: 20px 属性，该元素距离浏览器窗口的顶部和右侧各偏移 20px。

固定定位布局适用于创建悬浮元素、固定导航栏、返回顶部按钮等情况。请注意，固定定位的元素不会随页面滚动而改变位置，因此在使用固定定位时，要确保元素不会遮挡其他内容或导致页面布局问题。
## 粘性定位
粘性定位布局是一种使用 CSS 的粘性定位技术来实现元素在特定条件下固定或粘性定位的布局方法。粘性定位允许元素在滚动过程中在某个位置停止，并在滚动到另一个位置时继续滚动。它提供了固定定位和相对定位的组合效果。以下是使用粘性定位布局的基本步骤：

1、使用粘性定位属性定位元素：为需要应用粘性定位的元素添加 position: sticky 属性。这将使元素在滚动到指定位置时固定或粘性定位。

2、使用 top、right、bottom 和 left 属性指定元素与其定位参考点（通常是父元素）的距离。可以使用像素值、百分比值或其他长度单位来定义距离。

3、设置 z-index 属性（可选）：如果需要通过层叠顺序控制元素的叠放顺序，可以使用 z-index 属性来定义。

下面是一个示例：

HTML 代码：
```bash
<div class="sticky-element">
  This is a sticky element
</div>
```
CSS 代码：
```bash
.sticky-element {
  position: sticky;
  top: 20px;
  background-color: #f1f1f1;
  padding: 10px;
}
```
在这个示例中，.sticky-element 是一个应用粘性定位的元素。通过设置 position: sticky，它将在滚动到指定位置时固定或粘性定位。

使用 top: 20px 属性，该元素距离其定位参考点的顶部偏移 20px。

粘性定位布局适用于创建粘性导航栏、表头、侧边栏等情况。请注意，粘性定位的元素在滚动过程中会固定或粘性定位，但在超过其定位参考点时会恢复正常的文档流位置。因此，在使用粘性定位时，要确保元素不会遮挡其他内容或导致页面布局问题，并注意浏览器对粘性定位的兼容性支持。