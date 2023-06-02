---
id: table
sidebar_position: 3
---

# 数据表和数据类型

__SQL 通用数据类型__

*好兄弟，你有没有问过自己，明明学了一学期的数据库，可到头来连 `varchar`是什么意思都不知道，其实这是满可悲的...那有请我作为你的战友，来解决你出于忙碌、无知抑或是懒惰等原因造成的后果* 

数据库表中的每个列都要求有名称和数据类型。 *（Each column in a database table is required to have a name and a data type.）* 

SQL 开发人员必须在创建 SQL 表时决定表中的每个列将要存储的数据的类型。数据类型是一个标签，是便于 SQL 了解每个列期望存储什么类型的数据的指南，它也标识了 SQL 如何与存储的数据进行交互。

下面的表格列出了 SQL 中通用的数据类型：

<table>
  <tr>
    <th>数据类型</th>
    <th>描述</th>
    <th>MySQL</th>

  </tr>
  <tr>
    <td>integer</td>
    <td>整数值（没有小数点）。精度 10。</td>
    <td>Int, Integer</td>
  </tr>
  <tr>
    <td>float</td>
    <td>近似数值，尾数精度 16。</td>
    <td>Float</td>
  </tr>
  <tr>
    <td>string (fixed)</td>
    <td>字符/字符串。固定长度 n。</td>
    <td>Char</td>
  </tr>
    <tr>
    <td>string (variable)</td>
    <td>字符/字符串。可变长度。最大长度 n。</td>
    <td>Varchar</td>
  </tr>
    <tr>
    <td>binary object</td>
    <td>二进制串。</td>
    <td>Blob, Text</td>
  </tr>
</table>

## 数据表的基本概念

数据表的基本概念是指在关系型数据库中，表是数据的矩阵，由行和列组成。每一行代表一条记录，每一列代表记录的一个字段。每个字段都有一个数据类型，控制着字段的可能值和语义。基本表是本身独立存在的表，对应一个关系。

1. 表结构（`structure`）

    表拥有行和列。其中列称为字段，每个字段分别存储着不同性质的数据，而每行中的各个字段的数据则构成一条数据记录。

2. 记录（`record`）

    每个表包含了若干行数据，它们是表的“值”，表中的一行称为一个记录。因此，表是记录的有限集合

3. 字段（`Field`）

    每个记录由若干个数据项构成，将构成记录的每个数据项称为字段。

4. 空值（`NULL`）

    空值通常表示未知、不可用或将在以后添加的数据。若一个列允许为空值，则向表中输入记录值时可不为该列给出具体值。而一个列若不允许为空值，则在输入时必须给出具体值。

5. 关键字（`Key`）

    若表中记录的某一字段或字段组合能唯一标识记录，则称该字段或字段组合为候选关键字（Candidate key）。若一个表有多个候选关键字，则选定其中一个为主关键字（Primary key），也称为`主键`。当一个表仅有唯一的一个候选关键字时，该候选关键字就是主关键字。

6. 长度、精度和小数位数

    表结构的设计中，在决定了字段的名称之后，就要设置字段的数据类型（Data Type）、长度（Length）、精度（Precision）与小数位数（Scale）。

## 创建和删除数据表

__SQL `CREATE TABLE` 语句__

`CREATE TABLE` 语句用于创建数据库中的表。

表由行和列组成，每个表都必须有个表名。

SQL `CREATE TABLE` 语法

```MySQL
    CREATE TABLE table_name
    (
    column_name1 data_type(size),
    ....
    );
```

`column_name` 参数规定表中列的名称。

`data_type` 参数规定列的数据类型（例如 `varchar`、`integer`、`decimal`、`date` 等等）。

`size` 参数规定表中列的最大长度。

__SQL `CREATE TABLE` 实例__

现在我们想要创建一个名为 "`MyFavSong`" 的表，包含三列：`Sno`、`Sname` 和 `Aname`。

我们使用下面的 `CREATE TABLE` 语句：

```MySQL
    CREATE TABLE Persons
    (
    Sno varchar(8),
    Sname varchar(8),
    Aname varchar(8)
    );
```

空的 "`MyFavSong`" 表如下所示：

<table>
  <tr>
    <th>Sno</th>
    <th>Sname</th>
    <th>Aname</th>

  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>
