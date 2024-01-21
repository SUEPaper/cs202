---
id: float
sidebar_position: 4
---

# 浮动布局
CSS浮动布局是一种旧的布局技术，用于实现元素的浮动排列。通过设置元素的float属性为left或right，可以使元素浮动到父元素的左侧或右侧，并允许其他元素环绕其周围。

基本的浮动布局步骤如下：

1、创建父容器，并将其设置为包含浮动元素的容器。
```bash
<div class="container">
  <!-- 浮动元素 -->
  <div class="item"></div>
  <div class="item"></div>
</div>
```
2、为浮动元素设置float属性，使其浮动到左侧或右侧。
```bash
.item {
  float: left; /* 或 float: right; */
}
```
3、为了清除浮动，避免浮动元素对其他内容的影响，可以在父容器的末尾添加一个空的元素，并为其设置clear: both;属性。
```bash
<div class="container">
  <!-- 浮动元素 -->
  <div class="item"></div>
  <div class="item"></div>

  <!-- 清除浮动 -->
  <div style="clear: both;"></div>
</div>
```
这样，浮动元素将按照浮动的方向排列，并允许其他内容环绕其周围。但需要注意的是，浮动布局具有一些问题，例如容器高度坍塌、元素重叠等，需要额外的处理和清除。

值得一提的是，随着CSS的发展，Flexbox和Grid布局已经取代了浮动布局，成为更为现代和强大的布局技术。它们提供更灵活、可预测且易于控制的布局方式，建议优先使用它们来创建复杂的布局。