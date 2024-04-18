---
id: html_table
sidebar_position: 7
---

# HTML表格

HTML 表格是一种用于展示结构化数据的标记语言元素。
HTML 表格由 `<table>` 标签来定义。
数据单元格可以包含文本、图片、列表、段落、表单、水平线、表格等等。


用 VS Code修改 `html_css_basic/index.html`的 HTML 文件代码，内容如下：

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>学生成绩表</title>
</head>
<body>

<h2>学生成绩表</h2>

<table>
    <thead>
        <tr>
            <th>姓名</th>
            <th>科目</th>
            <th>分数</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>小明</td>
            <td>数学</td>
            <td>90</td>
        </tr>
        <tr>
            <td>小红</td>
            <td>英语</td>
            <td>85</td>
        </tr>
        <tr>
            <td>小华</td>
            <td>物理</td>
            <td>88</td>
        </tr>
    </tbody>
</table>

</body>
</html>

```


- 我们首先使用 `<table>` 标签创建了一个表格。
- 使用 `<thead>` 标签定义了表格的表头部分，其中包含了表格的列名。
- 使用 `<tbody>` 标签定义了表格的主体部分，其中包含了实际的数据行。
- 使用 `<tr>` 标签定义了表格的行，每个 `<tr>` 表示一行数据。
- 使用 `<th>` 标签定义了表头单元格，而 `<td>` 标签定义了数据单元格。