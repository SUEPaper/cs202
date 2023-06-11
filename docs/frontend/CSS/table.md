---
id: table
sidebar_position: 8
---

# 表格样式
在CSS中，可以使用各种属性和选择器来自定义表格的样式。下面是一些常用的CSS属性和选择器，用于设置表格样式：

1、表格属性：
- border-collapse：设置表格边框的合并方式。常用的值包括collapse（合并边框）和separate（边框分开）。例如：border-collapse: collapse;
- border-spacing：设置表格边框之间的间距。例如：border-spacing: 5px;

2、表格元素选择器：
- table：选择整个表格元素。
- th：选择表格标题单元格。
- td：选择表格数据单元格。

3、单元格样式：
- border：设置单元格边框的样式、宽度和颜色。例如：border: 1px solid black;
- padding：设置单元格的内边距。例如：padding: 10px;
- text-align：设置单元格内容的水平对齐方式。常用的值有left（左对齐）、center（居中对齐）和right（右对齐）。例如：text-align: center;

4、表头样式：
- background-color：设置表头单元格的背景颜色。例如：background-color: #f1f1f1;
- font-weight：设置表头单元格的字体粗细。例如：font-weight: bold;

5、表格行样式：
- background-color：设置表格行的背景颜色。例如：background-color: #f9f9f9;

通过组合使用这些属性和选择器，您可以轻松自定义表格的样式。例如，以下是一个示例：
```bash
table {
  border-collapse: collapse;
}

th, td {
  border: 1px solid black;
  padding: 10px;
  text-align: center;
}

th {
  background-color: #f1f1f1;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}
```
上述样式设置了一个具有合并边框、单元格居中对齐的表格，表头单元格具有背景颜色和粗体字体，偶数行具有不同的背景颜色。

通过调整这些属性和选择器的值，您可以根据自己的需求和设计风格来自定义表格样式。




