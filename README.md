# js-code

## ES5

## ES6

## HTTP

### HTTP 缓存

强缓存：响应头 expires 绝对时间，客户端时间可修改，造成服务器与客户端时间偏差；
请求头：cache-control：max-age=888 相对时间，优先级高；public 可被任何对象缓存；private，指可被浏览器用户缓存；
no-cache：在发布缓存副本之前，强制要求缓存把请求提交给原始服务器进行验证(协商缓存验证)；
no-store：缓存不应存储有关客户端请求或服务器响应的任何内容，即不使用任何缓存。
到期
协商缓存：last-modified/if-modified-since; etag/if-none-match

当 ctrl+f5 强制刷新网页时，直接从服务器加载，跳过强缓存和协商缓存；
当 f5刷新网页时，跳过强缓存，但是会检查协商缓存；

### cookie
跨域传输：
后端：需设置Access-Control-Allow-Origin 为当前web域名，不能设为*。Access-Control-Allow-Credentials设置为true
前端： withCredentials: true,
'a.test.com'与'b.test.com'  cookie共享可以用domain设为 '.test.com'
### jwt
### HTTP 版本区别

https://blog.csdn.net/m0_60360320/article/details/119812431


HTTP/1.1

开启长链接
管道也可以并行发送请求，但是返回响应的顺序则必须是发送时候的顺序。
队头阻塞：原因：管道化造成响应延迟；解决方法：HTTP2使用二进制分帧，但是也无法完全解决

HTTP/2 在 HTTP/1.1 有几处基本的不同:

HTTP/2 是二进制协议而不是文本协议。不再可读，也不可无障碍的手动创建，改善的优化技术现在可被实施。
这是一个复用协议。并行的请求能在同一个链接中处理，移除了 HTTP/1.x 中顺序和阻塞的约束。
压缩了 headers。因为 headers 在一系列请求中常常是相似的，其移除了重复和传输重复数据的成本。
其允许服务器在客户端缓存中填充数据，通过一个叫服务器推送的机制来提前请求。

二进制分帧传输（就是将一条连接上所有传输的信息，分割为更小的消息和帧）
多路复用（多路复用的基础就是二进制分帧，因为可以乱序发送和接收）
头部压缩
服务器推送（服务器可以对一个客户端请求发送多个响应，例如，浏览器向服务端请求 index.html，里面包含一张样式表和一张图片。传统的方法就是会向浏览器发送三次请求。而服务端推送，则可以在一次请求内将这三个文件全部发送给浏览器，减少了请求次数，提升了网页性能。）

### HTTP 和 HTTPS

HTTP：不安全，数据明文传输，可劫持。无法验证真实性
HTTPS:
对称加密：客户端和服务器密钥一致，若密钥被劫持，则抓包的数据将被解密；
每对客户端服务器都需要存储密钥；
但加密算法快

非对称加密：客户端公钥，服务器私钥；
若传给客户端的公钥被替换，则客户端传输的数据被劫持后将被解密，
解决办法：需要验证服务器，证书授权中心（CA)将发放有效证书验证服务器；
若证书中的公钥被替换：
解决办法：用哈希算法将服务器公钥加密=摘要；用 CA 私钥加密该摘要生成指纹；
将公钥，指纹，哈希算法放在证书中，客户端用哈希算法加密服务器公钥=摘要，用 CA 公钥解密指纹，若二者相同则可信；CA 公钥嵌入操作系统（微软）

### 事件循环

macro-task大概包括：

script(整体代码)
setTimeout
setInterval
setImmediate
I/O
UI render

micro-task大概包括:

process.nextTick
Promise
Async/Await(实际就是promise)
MutationObserver(html5新特性)

## CSS

### 盒模型

标准盒模型（content-box)：盒子的大小就只是 width 和 height
IE 盒模型（border-box)：盒子的大小要加上内边距和边框
box-sizing 属性可指定使用的盒模型

### flex：1

CSS 简写属性设置了弹性项目如何增大或缩小以适应其弹性容器中可用的空间。

flex-grow：定义项目的的放大比例；
默认为 0，即 即使存在剩余空间，也不会放大；
所有项目的 flex-grow 为 1：等分剩余空间（自动放大占位）；
flex-grow 为 n 的项目，占据的空间（放大的比例）是 flex-grow 为 1 的 n 倍。

flex-shrink：定义项目的缩小比例；
默认为 1，即 如果空间不足，该项目将缩小；
所有项目的 flex-shrink 为 1：当空间不足时，缩小的比例相同；
flex-shrink 为 0：空间不足时，该项目不会缩小；
flex-shrink 为 n 的项目，空间不足时缩小的比例是 flex-shrink 为 1 的 n 倍。

flex-basis： 定义在分配多余空间之前，项目占据的主轴空间（main size），浏览器根据此属性计算主轴是否有多余空间
默认值为 auto，即 项目原本大小；
设置后项目将占据固定空间。(若设置 width，flex-basis 的优先级高)

### 水平垂直居中

display：flex；
justify-content:center
align-items:center

### BFC 块格式化上下文（Block Formatting Context，BFC）

BFC 是一个完全独立的空间（布局环境），让空间里的子元素不会影响到外面的布局。
触发 BFC
overflow: hidden
display: inline-block
position: absolute
position: fixed
display: table-cell
display: flex
解决问题: 1.使用 Float 脱离文档流，高度塌陷
2.Margin 边距重叠

### 扇形 css

background-color: red;
width: 100px;
height: 100px;
border-top-right-radius: 100px;
### CSS优先级
第一优先级：!important 会覆盖页面内任何位置的元素样式
1.内联样式，如 style="color: green"，权值为 1000
2.ID 选择器，如#app，权值为 0100
3.类、伪类、属性选择器，如.foo, :first-child, div[class="foo"]，权值为 0010
4.标签、伪元素选择器，如 div::first-line，权值为 0001
5.通配符、子类选择器、兄弟选择器，如*, >, +，权值为 0000
6.继承的样式没有权值


## 路由

路由出现原因：单页面应用可通过显示隐藏切换组件，但是地址栏未发生改变，浏览器无法记录用户行为，不会存在前进后退，所以引进前端路由
哈希路由
当 URL 的片段标识符更改时，将触发 hashchange 事件 (跟在＃符号后面的 URL 部分，包括＃符号)
history 路由
需要注意的是调用 history.pushState()或 history.replaceState()不会触发 popstate 事件。只有在做出浏览器动作时，才会触发该事件，如用户点击浏览器的回退按钮（或者在 Javascript 代码中调用 history.back()或者 history.forward()方法）

## 浏览器

### setTimeout & requestAnimationFrame

setTimeout 的执行时间并不是确定的。在 JS 中，setTimeout 任务被放进事件队列中，只有主线程执行完才会去检查事件队列中的任务是否需要执行，因此 setTimeout 的实际执行时间可能会比其设定的时间晚一些。
刷新频率受屏幕分辨率和屏幕尺寸的影响，因此不同设备的刷新频率可能会不同，而 setTimeout 只能设置一个固定时间间隔，这个时间不一定和屏幕的刷新时间相同。在 setTimeout 中对 dom 进行操作，必须要等到屏幕下次绘制时才能更新到屏幕上，如果两者步调不一致，就可能导致中间某一帧的操作被跨越过去，而直接更新下一帧的元素，从而导致丢帧现象。
与 setTimeout 相比，requestAnimationFrame 最大的优势是由系统来决定回调函数的执行时机。它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象。
## 设计模式
单例模式：全局对象，全局信息提示；
代理模式：axios拦截；在返回真正信息前做预处理；
策略模式：策略类，ABCD四个职级工资不同；
## 性能优化
抽离公共组件；细化组件
koa自定义服务器在未渲染页面之前重定向
webpack压缩css，js，
配置exclude/include缩小打包范围
url-loader,image小于8k转为base64，image如果有可能的话用svg或者css动画
