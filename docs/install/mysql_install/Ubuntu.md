---
id: Ubuntu
sidebar_position: 2
---

# Ubuntu Linux 安装

:::caution

_非常重要，请仔细阅读完本文以后再进行相关操作。（因未仔细阅读完本文，出现任何错误后果自负， 逃～～～逃～～～逃_

`作为一个成熟的Linux用户，其实你应该知道怎么安装MySQL。`

:::

Ubuntu 是一个使用非常广泛的 Linux 发行版。Ubuntu Server 则是云上最流行的服务器操作系统。本教程中，我们展示了在 Ubuntu 上安装 MySQL 8 的详细步骤。

## 先决条件

同学们需要使用 root 用户，或者具有管理员权限的用户登录系统，完成以下操作。

## 更新软件仓库包索引

执行以下命令更新 Ubuntu 本地软件仓库的包索引。

```bash
sudo apt update
```

## 升级本地软件

输入以下命令升级系统：

```bash
sudo apt upgrade
```

## 配置 MySQLPPA

在 Ubuntu 中安装 Mysql 最方便方式是用 MySQL 自己的 APT 仓库。 APT 仓库中包含了 MySQL 的服务器和工具相关的软件。我们需要将此 MySQL APT 仓库添加到系统的包源列表中。

1. 使用 wget 命令下载 MySQL APT 仓库包：

```bash
wget -c https://repo.mysql.com//mysql-apt-config_0.8.13-1_all.deb
```

2. 使用 dpkg 命令安装 MySQL APT 仓库包：

```bash
sudo dpkg -i mysql-apt-config_0.8.13-1_all.deb
```

## 安装 MySQL

执行以下命令开始安装 MySQL：

```bash
sudo apt install mysql-server
```

这一步会安装一个不安全的 MySQL 服务器。我们将在下一步配置服务器的安全性。

安装完成后，我们先启动 MySQL 服务器：

```bash
sudo systemctl start mysql
```

## MySQL 配置

执行以下命令调整 MySQL 服务器的安全性：

```bash
sudo mysql_secure_installation
```

这将会输出：

```bash
Securing the MySQL server deployment.

Connecting to MySQL using a blank password.

VALIDATE PASSWORD COMPONENT can be used to test passwords
and improve security. It checks the strength of password
and allows the users to set only those passwords which are
secure enough. Would you like to setup VALIDATE PASSWORD component?

Press y|Y for Yes, any other key for No:
```

这里时问我们是否使用密码验证组件。输入 ‘Y’ 并按下回车键。

```bash
There are three levels of password validation policy:

LOW    Length >= 8
MEDIUM Length >= 8, numeric, mixed case, and special characters
STRONG Length >= 8, numeric, mixed case, special characters and dictionary                  file

Please enter 0 = LOW, 1 = MEDIUM and 2 = STRONG:
```

这是是设置密码验证策略的级别。他提供了 3 个级别：

- LOW: 密码长度至少 8 位
- MEDIUM: 密码长度至少 8 位, 由数字、混合大小写的字母和特殊字符组成
- STRONG: 密码长度至少 8 位, 由数字、混合大小写的字母、特殊字符和字典文件组成
  请选择适合你的密码级别。

:::danger MySQL 密码设置推荐

**建议同学们把自己的 root 密码设置为：`password`**

_使用其他密码的出现问题我们概不负责_

:::

```bash
Please set the password for root here.

New password:

Re-enter new password:
```

在这里，输入两次密码：

```bash
Estimated strength of the password: 25
Do you wish to continue with the password provided?(Press y|Y for Yes, any other key for No) : Y
```

如果你对密码强度满意，输入 Y 和回车键后继续。

```bash
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

在这里，上面所有问题都输入 Y 。然后完成整个配置过程。

## 通过 Systemd 管理 MySQL 服务器

安装完成后，MySQL 服务就会自动启动。我们可以通过以下几个命令查看 MySQL 服务的状态，启动、停止、重启 MySQL 服务器：

- 查看 MySQL 服务器状态： `sudo systemctl status mysql`
- 启动 MySQL 服务器： `sudo systemctl start mysql`
- 停止 MySQL 服务器： `sudo systemctl stop mysql`
- 重启 MySQL 服务器： `sudo systemctl restart mysql`
- 配置 MySQL 服务器自启动： `sudo systemctl enable mysql`

## 连接到 MySQL 服务器

请使用以下命令连接到 MySQL 服务器：

```bash
mysql -u root -p
```

然后根据提示输入 root 帐户的密码，并按下回车键。验证通过后，将显示以下输出代表进入了 MySQL 控制台：

```bash
mysql>
```

使用 SHOW DATABASES 显示当前服务器中的所有数据库：

```bash
mysql> show databases;
```

这是输出：

```bash
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.05 sec)
```

上面显示的数据库，是 MySQL 服务器自带数据库。
