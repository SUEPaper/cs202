---
id: http
sidebar_position: 2
---

# HTTP 和 HTTPS

本文复制于：
  1. [HTTP 与 HTTPS：有什么区别？](https://www.cloudflare.com/zh-cn/learning/ssl/why-is-http-not-secure/)

HTTPS 是支持加密和验证的 HTTP。两种协议的唯一区别是HTTPS 使用 TLS (SSL) 来加密普通的 HTTP 请求和响应，并对这些请求和响应进行数字签名。因此，HTTPS 比 HTTP 安全得多。使用 HTTP 的网站的 URL 中带有 http://，而使用 HTTPS 的网站则带有 https://。

![](./img/http-vs-https.svg)

## 什么是 HTTP？

HTTP 代表超文本传输协议，它是一种用于通过网络传输数据的协议，或是一种表示信息的规范顺序和语法。通过互联网发送的大多数信息（包括网站内容和 API 调用）都使用 HTTP 协议。HTTP 消息主要有两种：请求和响应。

在 OSI 模型中（请参阅[什么是 OSI 模型](https://www.cloudflare.com/zh-cn/learning/ddos/glossary/open-systems-interconnection-model-osi/)？），HTTP 是[第 7 层](https://www.cloudflare.com/zh-cn/learning/ddos/what-is-layer-7/)协议。

## 什么是 HTTP 请求？什么是 HTTP 响应？

用户与浏览器交互时，用户浏览器会生成 HTTP 请求。例如，如果用户点击一个超链接，浏览器将针对对应页面上出现的内容发送一系列“HTTP GET”请求。如果有人在 Google 中搜索“什么是 HTTP？”，那么本文会出现在搜索结果中，当他们点击其链接时，浏览器将创建并发送一系列 HTTP 请求以获取呈现页面所需的信息。

这些 HTTP 请求全部传送到[源站服务器](https://www.cloudflare.com/zh-cn/learning/cdn/glossary/origin-server/)或代理[缓存](https://www.cloudflare.com/zh-cn/learning/cdn/what-is-caching/)服务器，并且服务器将生成 HTTP 响应。HTTP 响应是对 HTTP 请求的回答。

## 典型的 HTTP 请求是什么样的？

简单来说，HTTP 请求是遵循 HTTP 协议的一系列文本行。GET 请求可能如下所示：

```bash
GET /hello.txt HTTP/1.1
User-Agent: curl/7.63.0 libcurl/7.63.0 OpenSSL/1.1.l zlib/1.2.11
Host: www.example.com
Accept-Language: en
```

用户浏览器生成的这部分文本将通过 Internet 发送。而问题在于，它是明文形式发送的，监视连接的任何人都能读取它。（不熟悉 HTTP 协议的人可能觉得此文本难以理解，但任何对协议的命令和语法有基本了解的人都能轻松读懂。）

当用户通过网站或 Web 应用程序提交敏感数据时，这尤其是一个问题。敏感数据可能是密码、信用卡号，或在表单中输入的任何其他数据。而且在 HTTP 中，所有这些数据都以明文形式发送，任何人都能读取。（当用户提交表单时，浏览器会将其转换为 HTTP POST 请求，而不是 HTTP GET请求。）

源站服务器收到 HTTP 请求时，将发送 HTTP 响应，其类似于：

```bash
HTTP/1.1 200 OK
Date: Wed, 30 Jan 2019 12:14:39 GMT
Server: Apache
Last-Modified: Mon, 28 Jan 2019 11:17:01 GMT
Accept-Ranges: bytes
Content-Length: 12
Vary: Accept-Encoding
Content-Type: text/plain

Hello World!
```

如果网站使用 HTTP 而非 HTTPS，则监视会话的任何人都可以读取所有请求和响应。本质上，恶意行为者可以只读取请求或响应中的文本，就能知道某人正在索取、发送或接收的确切信息。


## 什么是 HTTPS？

HTTPS 中的 S 代表“安全”。HTTPS 使用 TLS（或 SSL）来加密HTTP 请求和响应，因此在上例中，攻击者看到的不是其文本，而是一堆看似随机的字符。

攻击者不会看到：

```bash
GET /hello.txt HTTP/1.1
User-Agent: curl/7.63.0 libcurl/7.63.0 OpenSSL/1.1.l zlib/1.2.11
Host: www.example.com
Accept-Language: en
```

而会看到类似如下：

```bash
t8Fw6T8UV81pQfyhDkhebbz7+oiwldr1j2gHBB3L3RFTRsQCpaSnSBZ78Vme+DpDVJPvZdZUZHpzbbcqmSW1+3xXGsERHg9YDmpYk0VVDiRvw1H5miNieJeJ/FNUjgH0BmVRWII6+T4MnDwmCMZUI/orxP3HGwYCSIvyzS3MpmmSe4iaWKCOHQ==
```

## 在 HTTPS 中，TLS/SSL 如何加密 HTTP 请求和响应？

TLS 使用一种称为[公钥加密](https://www.cloudflare.com/zh-cn/learning/ssl/how-does-public-key-encryption-work/)的技术：[密钥](https://www.cloudflare.com/zh-cn/learning/ssl/what-is-a-cryptographic-key/)有两个，即公钥和私钥，其中公钥通过服务器的 SSL 证书与客户端设备共享。当客户端打开与服务器的连接时，这两个设备使用公钥和私钥商定新的密钥（称为[会话密钥](https://www.cloudflare.com/zh-cn/learning/ssl/what-is-a-session-key/)），以加密它们之间的后续通信。

然后，所有 HTTP 请求和响应都使用这些会话密钥进行加密），使任何截获通信的人都只能看到随机字符串，而不是明文。

有关加密和密钥的工作原理的更多信息，请参阅[什么是加密?](https://www.cloudflare.com/zh-cn/learning/ssl/what-is-encryption/)


## HTTPS 如何帮助验证 Web 服务器身份？
身份验证是指核实一个人或一台计算机是否是声称的身份。HTTP 中没有身份验证，它基于信任原则。HTTP 的架构师不一定是做出了隐式信任所有 Web 服务器的决定；他们当时除了安全以外还有其他优先事务。但在现代 Internet 上，身份验证是不可或缺的。

就像身份证件能确认一个人的身份一样，私钥可以确认服务器的身份。当客户端打开与源站服务器的连接通道时（例如，当用户导航到网站时），拥有与网站 SSL 证书中公钥匹配的私钥可证明此服务器确实是该网站的合法主机。这可以防止或帮助阻止在没有身份验证时可能发生的多种攻击，例如：

- [在途攻击](https://www.cloudflare.com/zh-cn/learning/security/threats/on-path-attack/)
- [DNS 劫持](https://www.cloudflare.com/zh-cn/learning/dns/dns-security/)
- [BGP 劫持](https://www.cloudflare.com/zh-cn/learning/security/glossary/bgp-hijacking/)
- [域欺骗](https://www.cloudflare.com/zh-cn/learning/ssl/what-is-domain-spoofing/)
  
此外，SSL 证书由签发它的证书颁发机构进行数字签名。这可以确认服务器就是它声称的身份。

