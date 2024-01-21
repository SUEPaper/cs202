---
id: MacOS
sidebar_position: 3
---

# MacOS 安装

:::caution

_非常重要，请仔细阅读完本文以后再进行相关操作。（因未仔细阅读完本文，出现任何错误后果自负， 逃～～～逃～～～逃_

:::

在 MacOS 上，我们可以通过 brew 很容易地安装 MySQL。

:::note

Homebrew 是啥？请看[Mac 必备神器 Homebrew](https://zhuanlan.zhihu.com/p/59805070)

:::

### 安装 MySQL

```bash
brew install mysql
```

### 启动 MySQL 服务器

```bash
brew services start mysql
```

### 配置 MySQL 服务器

我们需要运行以下脚本配置 MySQL 服务器的安全性：

```bash
mysql_secure_installation
```

在这个过程中，你可以设置 root 的密码，配置一些选项以增强 MySQL 服务器的安全性。

:::danger MySQL 密码设置推荐

**建议同学们把自己的 root 密码设置为：`password`**

_使用其他密码的出现问题我们概不负责_

:::

你会看到如下类似的输出：

```bash
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

- `brew services start mysql`: 启动 MySQL 服务器，并设置为自启动。
- `brew services stop mysql`: 停止 MySQL 服务器，并设置为不自启动。
- `brew services run mysql`: 只启动 MySQL 服务器。
- `mysql.server start`: 启动 MySQL 服务器。
- `mysql.server stop`: 停止 MySQL 服务器。
