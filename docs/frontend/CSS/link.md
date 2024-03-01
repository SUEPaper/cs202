---
id: link
sidebar_position: 7
---

# 链接样式
链接的样式，可以用任何CSS属性（如颜色，字体，背景等）。

特别的链接，可以有不同的样式，这取决于他们是什么状态。

1、链接状态选择器：
- :link：表示未访问的链接状态。
- :visited：表示已访问的链接状态。
```bash
/* 未访问的链接样式 */
a:link {
  color: blue;
  text-decoration: underline;
}

/* 已访问的链接样式 */
a:visited {
  color: purple;
}
```
2、鼠标悬停状态选择器：
- :hover：表示鼠标悬停在链接上时的状态。
```bash
/* 鼠标悬停时的链接样式 */
a:hover {
  color: red;
  text-decoration: none;
}
```
3、激活状态选择器
- :active：表示链接被激活时的状态，通常是在用户点击链接但尚未释放鼠标按钮时的状态。
```bash
/* 链接被激活时的样式 */
a:active {
  color: green;
}
```
通过使用这些伪类选择器，可以为链接设置不同的颜色、文本装饰、背景色等属性，以在不同的状态下提供视觉反馈。这样，用户可以更好地理解链接的功能和当前状态。当然，可以根据自己的设计需求自定义链接的样式，以适应网站或应用程序的外观和风格。