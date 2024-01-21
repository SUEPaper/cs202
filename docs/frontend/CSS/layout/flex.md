---
id: flex
sidebar_position: 2
---

# Flex 布局

## Flexbox 基础
Flexbox（弹性盒子布局）是一种用于创建灵活、自适应的布局结构的CSS布局技术。它通过使用容器和项目的属性来实现弹性和对齐控制，使得元素在不同屏幕尺寸和布局环境下都能自动调整位置和尺寸。

Flexbox 提供了更直观、灵活的布局方式，可以轻松创建各种布局结构，如水平居中、垂直居中、等分布局等。通过使用弹性容器和弹性项目的属性，可以实现自适应的响应式布局，使得网页在不同屏幕尺寸下都能
## Flex 容器属性
1、display: 定义元素的显示类型为Flex容器，取值为 flex 或 inline-flex。

2、flex-direction: 定义弹性项目在容器中的排列方向，默认值为 row。可选值有：
- row: 水平方向，从左到右排列。
- row-reverse: 水平方向，从右到左排列。
- column: 垂直方向，从上到下排列。
- column-reverse: 垂直方向，从下到上排列。

3、flex-wrap: 定义弹性项目是否换行，默认值为 nowrap。可选值有：
- nowrap: 不换行，所有项目在一行显示。
- wrap: 换行，项目按需分行显示。
- wrap-reverse: 换行，项目按需分行显示，但以相反的顺序。

4、justify-content: 定义弹性项目在主轴上的对齐方式，默认值为 flex-start。可选值有：
- flex-start: 项目在主轴起始位置对齐。
- flex-end: 项目在主轴末尾位置对齐。
- center: 项目在主轴中间位置对齐。
- space-between: 项目平均分布在主轴上，首尾项目贴边。
- space-around: 项目平均分布在主轴上，两侧留有相等的空白间距。

5、align-items: 定义弹性项目在交叉轴上的对齐方式，默认值为 stretch。可选值有：
- stretch: 项目拉伸以填满容器的交叉轴。
- flex-start: 项目在交叉轴起始位置对齐。
- flex-end: 项目在交叉轴末尾位置对齐。
- center: 项目在交叉轴中间位置对齐。
- baseline: 项目以基线对齐。

6、align-content: 定义多行弹性项目在交叉轴上的对齐方式，默认值为 stretch。只有在存在多行时才有效。可选值有：
- stretch: 项目拉伸以填满容器的交叉轴。
- flex-start: 项目在交叉轴起始位置对齐。
- flex-end: 项目在交叉轴末尾位置对齐。
- enter: 项目在交叉轴中间位置对齐。
- space-between: 项目平均分布在交叉轴上，首尾项目贴边。
- space-around: 项目平均分布在交叉轴上，两侧留有相等的空白间距。
## Flex 项目属性
1、flex-grow: 定义弹性项目在剩余空间中的放大比例，默认值为 0。如果所有项目的 flex-grow 值都为 1，则它们将平均分配剩余空间。如果一个项目的 flex-grow 值为 2，而其他项目的值为 1，则前者将获得的空间是后者的两倍。

2、flex-shrink: 定义弹性项目在空间不足时的缩小比例，默认值为 1。如果所有项目的 flex-shrink 值都为 1，则它们将等比例缩小以适应空间不足。如果一个项目的 flex-shrink 值为 0，而其他项目的值为 1，则前者将不缩小。

3、flex-basis: 定义弹性项目在分配多余空间之前的初始大小。默认值为 auto，即由项目的内容决定。可以设置为具体的长度值（如像素或百分比）或关键字 auto。

4、flex: 是 flex-grow、flex-shrink 和 flex-basis 属性的缩写形式，按顺序设置这三个值。例如，flex: 1 0 auto 表示 flex-grow: 1; flex-shrink: 0; flex-basis: auto。

5、align-self: 定义单个弹性项目在交叉轴上的对齐方式，覆盖容器的 align-items 属性。可选值与 align-items 属性相同，包括 stretch、flex-start、flex-end、center、baseline。

这些属性可以用于每个弹性项目，以控制其在容器中的伸缩性、对齐方式和尺寸等特性。通过调整这些属性的值，可以实现不同项目在弹性容器中的灵活布局和定位。
## 实际布局示例
HTML 结构：
```bash
<div class="container">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</div>
```
CSS 样式：
```bash
.container {
  display: flex;
  justify-content: space-between;
}

.item {
  flex-basis: 30%;
  padding: 10px;
  background-color: #f0f0f0;
}
```
- .container 是一个 Flex 容器，通过设置 display: flex 将其设置为 Flex 布局。
- justify-content: space-between 将弹性项目在主轴上均匀分布，首尾项目与容器边缘贴边，创建了两个项目之间的空白间距。
- .item 是弹性项目，其初始尺寸由 flex-basis: 30% 定义，表示每个项目占据容器宽度的 30%。
- padding: 10px 添加了内边距，使项目之间有一定的间隔。
- background-color: #f0f0f0 设置项目的背景颜色为浅灰色。

这个示例将容器中的三个项目水平排列，宽度占据容器的 30% 并具有相同的宽度。项目之间有间隔，并且首尾项目与容器边缘对齐。这是一个基本的 Flex 布局示例，可以根据需要进行调整和扩展。