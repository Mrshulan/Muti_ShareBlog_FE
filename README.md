# React全家桶+ Ant Design +Koa2+Mongodb实现多人共享博客

## 前言

该项目在[多人共享博客v1](https://github.com/Mrshulan/Muti_ShareBlog) (传统的服务端渲染)的基础上实现二次开发，采用前后端分离(CSR)(v2)的模式，在线体验地址<http://mrshulan.xin/blog/>

目前已经对该项目实现了[服务端同构渲染v3](https://github.com/Mrshulan/Muti_ShareBlog_SSR) (SSR) 在线体验地址<http://mrshulan.xin/blogssr/> ,不得不说，**真的没有白屏loading**，感觉非常的舒服，SEO啥的umm 大家都懂~(SSR自带优点)

项目的打包的体积更小，这跟我没有使用create-react-app 和 nextjs有关吧，webpack做了`splitchunks`之后有效提升了首屏速度，在Disable cache下 大约从3s提升到了2.3左右。

##  实现功能

- [x] 登录 /  注册
- [x] 文章发表（支持 MarkDown 语法）
- [x] 文章列表分页
- [x] 文章hot列表
- [x] 文章归档分类
- [x] 文章搜索(根据标题和内容)
- [x] 点赞与评论 (支持 MarkDown 语法）
- [x] 头像上传更换
- [x] 用户修改自己的基本信息
- [x] 用户管理自己的文章及其评论
- [x] 管理员顶置文章
- [x] 管理员禁文章
- [x] 管理员管理归档分类
- [x] 管理员删除普通用户
- [ ] 文章摘要图片
- [ ] ...

## 效果展示(简单截图就不做gif了)

博客主界面

![主界面](http://qiniu.mrshulan.com/%E5%8D%9A%E5%AE%A2%E4%B8%BB%E7%95%8C%E9%9D%A2.png)

管理界面

![管理界面](http://qiniu.mrshulan.com/%E5%8D%9A%E5%AE%A2%E7%AE%A1%E7%90%86%E9%A1%B5%E9%9D%A2%E9%A2%84%E8%A7%88.png)

[CSR线上体验](http://mrshulan.xin/blog/) 👆

[SSR线上体验](http://mrshulan.xin/blogssr/) 👆

##  项目目录

```
前端组件
- components
  - 404
  - admin 用户管理界面 /user
  	- articles 文章管理
  	- categories 归档管理
  	- comments 评论管理
  	- home (初始的默认界面)
  	- layout 布局
  	- info 用户信息管理
  	- likes 文章点赞管理
  	- useArticles 管理员管理用户发表文章
  	- user (管理员管理用户 根据 role)
  - index 首屏加载页面 /
    - about 关于(放网站项目简介)
    - article 文章详情
    - articles 文章列表
    - categories 归档分类
    - layout 布局
    - load 加载组件
    - modals 全局弹窗组件(抽离组件)
- routes 路由(包括 admin home)
- redux 状态管理 (Ducks结构)
- utils 工具函数
```

为了方便代码的联调所以我就把server放一起了，在SSR中直接调用这边的接口

``` 
后端MVC 麻雀虽小五脏俱全嘛，增删改查~
- control 各个collection的操作
- middlewares 自定义中间件
- Models 封装document操作权
- public 静态资源(用户头像上传)
- routers 路由接口
- Schema 表的设计
- util 工具函数
```

## 遇到的问题

- componentDidMount componentDidUpdate等**生命周期**理解阶段✔  实践阶段傻傻没缓过神✖ 

  然后使用**hook**的时候停留生命周期 跨不过 Function component大法好的坎

- axios**跨域**的时候 127.0.0.1 和 localhost区别 以及理解跨域的本质 credentials origin参数的使用，以及当时使用Upload组件上传到时候 和 自己封装axios 是两码事

- 受到自己的的Layout影响，组件的状态到底放在哪里 怎么传输，一些common性高的组件如果收到**props**

- **登录方案**的确定 怎么哈希 怎么加密 怎么传输

- 前端**鉴权** 后端关键路径中间件鉴权，登录持久化 选择 token 还是 session [本人春招两次挂都是这个没有答好，深度不够...]

- redux怎么**保持住state**  不用cookie localstorage怎么实现expires(做SSR的时候这里还有坑)

- 上线的**体积过大** 当初还不知道map这个东西 create-react-app build的时候会自动生成, 还在线上发挥了作用...得自己eject之后关了他，打开的我的website要30s甚至更长............ 怎么办(webpack)....似乎网上搜索上线的案例比较少唉

- mongoose做**doc操作**的时候 使用 await 时候会发生两次操作 原因就是当成promise一次，回调$inc又是一次。

- 同构时候遇到的(一块到这写了吧....)[两套webpack config]

  - 上面提到的SSR redux问题 因为我用到了 自己封装的Storage里边使用到了**localstorage**，而我们应该做同构渲染的时候是要明确在服务端是没有window、css(antd按需加载时候遇到的)这些概念的

    我的解决方法第一种撤销直出的localstorage 选择新增一个**dispatch**方法(recovery) 在componentDidMount里边做出数据判断，在这中间我还使用到了redux-presist 结果发现没啥luan用，管不到直接的持久化

    第二种模仿nextjs，在**getInitialProps**做出相应的操作也不影响原本的生命周期

    - 上面说到**CSS**，首先我们明白 SSR 就是把首屏(组件啥的)的转化成HTML，所以回到我们的需求，组件是不能引用css的 而antd的按需加载是利用`babel-plugin-import`把import ｛｝from ‘antd’ 转变成 import 他们的路径，通过webpack转变成**require js css**这类的文件，在此我在server的webpack做出了externals，而此时我当初的以为把less/css文件放入白名单就好了，并且在less/css的loader里边做出include处理就好了，然后在结果就意外了，报错无法识别.....@import巴拉的，起初我想的是**webpack**打包到了我们的import {} from 'antd'递归到里边 然后有了require css 而我并没有明面上的import css 造成的冲突最终打包失败, after a long time... 我打开了antd的包惊奇的发现 antd是通过js来引入css的 所以上面的冲突不成立，是我根本没有让loader发挥作用，赶紧把externals白名单改改....it was work!!!

    - 产生的原因是因为我需要原本的项目里边的less文件走**css module** 而 antd的less走另外的loader配置，

      不得不说 同构使用css module 一个个改 className={styles. ....}，还要注意驼峰命名...改到吐血 然后发现了babel-plugin-react-css-modules大法 (ctrl + H)一招搞定一步到位!!! 不过注意要 这个plugin 要 -S install 有一些运行依赖要处理。

  - **直出的路由**管理和来自react的**js跳转**两类处理，直出的状态保持(上面说到了解决方法)，html模版 数据的脱水注水hydrateData, 不过react都提供了这些钩子(react在ssr的时候 提供了 **StaticRouter renderToString**)就很方便了，只要在html模版上面动一下手脚即可(我的方案是通过注释，然后正则替换)，不过我们不能停留在使用的基本上，关键还是要理解，这要的做的目的就是为了保持直出的数据和 client渲染之后保持初始化一致，通过脚本注入 然后前端createStore的时候初始化redux即可，如果要解决刷新路由直出**数据丢失** 用我上面提到的就可以解决这个问题。

  - 当我使用simplemde包的时候 因为这个包里边还是涉及到了 navigator，在build构建的时候也是会报错的，解决方法是 通过**import()** 和 componentDidMount结合 不过这就就牺牲一点效率，没啥大碍。

  - 其次还有一个小问题，静态资源路径的问题，即便是在webpack整体设置了**publicPath**(针对的是bundle资源)也需要在url-loader(针对的是当前资源)里边再一次设置。

  ...

## 优化方面(针对该项目我做出的)

### 代码层面

- **state**扁平设计 状态提升&使用redux setState的主动合并减少重复渲染
- Classes component =》 **Function component + Hooks** 简化代码结构 也方便后期扩展
- 重复的逻辑代码&UI代码进行**抽离**
- 请求如无直接联系选择**并发**处理Promise.all 或者 async await封装提高效率
- ...

### 缓存层面

- 文件指纹(有利于版本及时跟新)
- 图片资源(强 + 协商缓存)
- ...

### 安全层面

- token =》 session 方便控制用户登录和其他操作 cookie✔(HTTPONLY SAMESITE) sessionstorage localstorage选择
- 选择HTTPS 或者 RSA(非对称) + AES(对称)组合实现 安全信息通道
- ...

### 打包层面(eject)

- 把首屏不是那么重要的包 以script cdn的形式引入 比方说highlight.js 减少打包体积
- splitchunks (控制chunk的打包规则和请求方式) 
- optimization -> 代码压缩
- ...

## 克隆一波

``` 
第一步把数据库连接好
mongod -dbpath 'path' (window下注意把路径带上个引号)
cd server
nodemon app.js

cd /
npm install 
npm start
```



## 想说的是

此前学习的都是一些基本功，当真正自己干一个项目的时候，可能就会有一种感觉，感觉啥也不会(因为之前感觉自己啥也学习了，于是就干上了) 😰，好不容易弄出来了，给同学一测试emm gg,又有新的问题了，上线又是一堆bug等着你解决，记住解决bug会越解越多(这个时候就不能放弃了)，但是最后锻炼的还是解决问题能力，以后有相同类型的需求的话，就可以考虑很多因素了，比方说问自己 为什么要这么做，还可以怎么做，区别怎么对比，怎么取舍。

还有准备以后打算说一下我是如何摸爬打滚(各位前辈不要喷我)整出一个这样的项目来的，然后就是写一写博客吧， 因为大佬们都有自己经常更新的博客，其实我也是跟着大佬的博客一点点学习，把这些零碎的知识点联合在一起真的是一件很痛苦的事情唉，然后发觉前端路漫漫，学习的东西真的真的好多，但是话又说回来，既然喜欢上了前端，就得付出时间和代价hmm。

>总结我这一年学习的最大感触就是: 知识一定要形成体系
>
>附上我的代码仓库[**Go-ahead_FE**](https://github.com/Mrshulan/Go-ahead_FE) 里边啥都有真的~

如果喜欢 欢迎(孬也)给个star star star 不是 skr skr skr！！！ 来自一个学弟(准备秋招)的乞讨脸.jpg 😂
