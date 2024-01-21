---
id: background
sidebar_position: 3
---

# 颜色和背景
在CSS中，可以使用颜色属性和背景属性来设置元素的颜色和背景样式。
## 颜色值的表示方法
1、颜色名称：CSS预定义了一些颜色名称，例如"red"（红色）、"blue"（蓝色）、"green"（绿色）等。您可以直接使用这些名称来表示颜色。例如：
```bash
p {
  color: red;
}
```
2、十六进制值：使用六位的十六进制值表示颜色。每两位表示红、绿、蓝三个颜色通道的强度，取值范围是00到FF。例如，红色可以表示为"#FF0000"。可以使用缩写形式，将每个颜色通道的值缩写为单个字符。例如，红色可以表示为"#F00"。
```bash
p {
  color: #FF0000;
}
```
3、RGB值：使用RGB（红、绿、蓝）通道的整数值来表示颜色。每个颜色通道的取值范围是0到255，代表颜色的强度。例如，红色可以表示为"rgb(255, 0, 0)"。
```bash
p {
  color: rgb(255, 0, 0);
}
```
4、RGBA值：与RGB类似，但包含了一个额外的透明度（alpha）通道。透明度的取值范围是0到1，0表示完全透明，1表示完全不透明。例如，红色半透明可以表示为"rgba(255, 0, 0, 0.5)"。
```bash
p {
  color: rgba(255, 0, 0, 0.5);
}
```
5、HSL值：使用HSL（色相、饱和度、亮度）模型来表示颜色。色相的取值范围是0到360，饱和度和亮度的取值范围是0%到100%。例如，红色可以表示为"hsl(0, 100%, 50%)"。
```bash
p {
  color: hsl(0, 100%, 50%);
}
```
6、HSLA值：与HSL类似，包含了一个额外的透明度（alpha）通道。透明度的取值范围是0到1，0表示完全透明，1表示完全不透明。例如，红色半透明可以表示为"hsla(0, 100%, 50%, 0.5)"。
```bash
p {
  color: hsla(0, 100%, 50%, 0.5);
}
```
## 背景颜色和背景图像
1、背景颜色属性：

background-color：用于设置元素的背景颜色。可以使用颜色名称、十六进制值或RGB值来指定颜色。
```bash
body {
  background-color: #f2f2f2;
}
```
2、背景图像属性：

background-image：用于设置元素的背景图像。可以使用URL来指定图像的路径。
```bash
div {
  background-image: url('image.jpg');
}
```
## 背景属性（大小、位置、重复和附着）
1、背景大小属性（background-size）：

background-size：用于设置背景图像的大小。可以指定具体的宽度和高度值、百分比值或关键词（如 cover 或 contain）。
```bash
div {
  background-size: 100px 200px; /* 使用具体的宽度和高度值 */
  background-size: 50% auto; /* 使用百分比值，自动计算另一个维度 */
  background-size: cover; /* 图片等比例缩放，保持宽度和高度充满容器 */
  background-size: contain; /* 图片等比例缩放，保持宽度和高度适应容器 */
}
```
2、背景位置属性（background-position）：

background-position：用于指定背景图像的起始位置。可以使用关键词（如 top、right、bottom、left）或百分比值来定位。
```bash
div {
  background-position: top left; /* 图片从容器的左上角开始 */
  background-position: 50% 50%; /* 图片居中 */
  background-position: 80% bottom; /* 图片水平偏移80%，垂直位于容器底部 */
}
```
3、背景重复属性（background-repeat）：

background-repeat：用于指定背景图像的重复方式。可以设置为 repeat（默认，水平和垂直方向重复）、repeat-x（仅水平方向重复）、repeat-y（仅垂直方向重复）或 no-repeat（不重复）。
```bash
div {
  background-repeat: repeat; /* 图片在水平和垂直方向都重复 */
  background-repeat: repeat-x; /* 图片在水平方向重复 */
  background-repeat: repeat-y; /* 图片在垂直方向重复 */
  background-repeat: no-repeat; /* 图片不重复 */
}
```
4、背景附着属性（background-attachment）：

background-attachment：用于指定背景图像的滚动方式。可以设置为 scroll（默认，背景图像会随元素的滚动而滚动）或 fixed（背景图像固定在视窗中，不随元素的滚动而滚动）。
```bash
div {
  background-attachment: scroll; /* 背景图像随元素滚动 */
  background-attachment: fixed; /* 背景图像固定在视窗中 */
}
```