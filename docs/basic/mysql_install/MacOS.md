---
id: MacOS
sidebar_position: 3
---

# MacOS

在 MacOS 上有两种方式安装 MySQL 服务器：通过 brew 安装和通过安装包安装。

## 通过 brew 安装 MySQL

在 MacOS 上，我们可以通过 brew 很容易地安装 MySQL。

### 安装 MySQL

```pyhton
brew install mysql
```

### 启动 MySQL 服务器

```pyhton
brew services start mysql
```

### 配置 MySQL 服务器

我们需要运行以下脚本配置 MySQL 服务器的安全性：

```python
mysql_secure_installation
```

在这个过程中，你可以设置 root 的密码，配置一些选项以增强 MySQL 服务器的安全性。你会看到如下类似的输出：

```python
Securing the MySQL server deployment.

Connecting to MySQL using a blank password.

VALIDATE PASSWORD COMPONENT can be used to test passwords
and improve security. It checks the strength of password
and allows the users to set only those passwords which are
secure enough. Would you like to setup VALIDATE PASSWORD component?

Press y|Y for Yes, any other key for No: Y

There are three levels of password validation policy:

LOW    Length >= 8
MEDIUM Length >= 8, numeric, mixed case, and special characters
STRONG Length >= 8, numeric, mixed case, special characters and dictionary                  file

Please enter 0 = LOW, 1 = MEDIUM and 2 = STRONG: 0
Please set the password for root here.

New password:

Re-enter new password:

Estimated strength of the password: 25
Do you wish to continue with the password provided?(Press y|Y for Yes, any other key for No) : Y
By default, a MySQL installation has an anonymous user,
allowing anyone to log into MySQL without having to have
a user account created for them. This is intended only for
testing, and to make the installation go a bit smoother.
You should remove them before moving into a production
environment.

Remove anonymous users? (Press y|Y for Yes, any other key for No) : Y
Success.


Normally, root should only be allowed to connect from
'localhost'. This ensures that someone cannot guess at
the root password from the network.

Disallow root login remotely? (Press y|Y for Yes, any other key for No) : Y
Success.

By default, MySQL comes with a database named 'test' that
anyone can access. This is also intended only for testing,
and should be removed before moving into a production
environment.


Remove test database and access to it? (Press y|Y for Yes, any other key for No) : Y
 - Dropping test database...
Success.

 - Removing privileges on test database...
Success.

Reloading the privilege tables will ensure that all changes
made so far will take effect immediately.

Reload privilege tables now? (Press y|Y for Yes, any other key for No) : Y
Success.

All done!
```

### MySQL 服务器管理命令

brew 提供了实用的命令可以管理 MySQL 服务器。

* ```brew services start mysql```: 启动 MySQL 服务器，并设置为自启动。
* ```brew services stop mysql```: 停止 MySQL 服务器，并设置为不自启动。
* ```brew services run mysql```: 只启动 MySQL 服务器。
* ```mysql.server start```: 启动 MySQL 服务器。
* ```mysql.server stop```: 停止 MySQL 服务器。

## 通过安装包安装 MySQL

通过安装包安装 MySQL 的过程有友好的 UI 界面，更加的方便快捷。

### 下载安装包

请点击[这里](https://dev.mysql.com/downloads/mysql/)去下载 MySQL 社区版的 dmg 文件，它包含了 MySQL 的安装器。

### 安装  MySQL

下载安装包后，请按照以下步骤进行安装：

1. 双击下载 dmg 文件。双击后，会看到 MySQL 安装器文件，比如： mysql-8.0.26-macos-10.13-x86_64.pkg。双击 MySQL 安装器文件。

2. 在介绍页面，直接点击 “继续” 按钮。

3. 在 “许可” 页面，直接点击 “继续” 按钮。

4. 在 “安装类型” 页面，可以直接点击 “安装” 按钮，也可以先点击 “自定义” 按钮选择要安装的组件后再点击 “安装” 按钮。

5. 在 “配置” 页面，密码加密方式选择 Use Strong Password Entryption。然后，输入 root 用户的密码。点击 “Finish” 按钮就完成安装了.

### 管理 MySQL

MySQL 偏好窗格会被默认安装。你可以在 系统偏好 窗口中找到它。MySQL 偏好窗格允许你启动、停止和配置 MySQL。

![22](./img/22.png)