# React全家桶+ Ant Design +Koa2+Mongodb实现多人共享博客v2

## 前言

此项目刚开始纯粹是为了学习一把前后端分离，加深一下react全家桶的熟悉度，在[多人共享博客v1](https://github.com/Mrshulan/Muti_ShareBlog)的基础上实现二次开发。在线体验地址 http://mrshualn.xin/blog/

##  实现功能

- [x] 登录 /  注册
- [x] 文章发表（支持 MarkDown 语法）
- [x] 文章列表分页
- [x] 点赞与评论 (支持 MarkDown 语法）
- [x] 头像上传更换
- [x] 用户管理自己的文章及其评论
- [x] 管理员删除普通用户

## 效果展示

![前端预览](http://qiniu.mrshulan.com/1552200553265.png)

由于没有实现文章图片的外链，所以文章的预览图片就只能用作者的头像进行代替了

好吧，这只是一个静态的图片, 那么我就来演示一下网站首页的一些实现了的功能吧，

![前端预览](http://qiniu.mrshulan.com/%E5%89%8D%E7%AB%AF%E9%A2%84%E8%A7%88.gif)

emm 忘记演示上传头像(其实是我不敢打开那个隐私的图片文件夹)了， 别担心接下来 用管理员的帐号测试一下 上传头像吧， 顺便删除刚刚的test用户

![后端预览](http://qiniu.mrshulan.com/%E5%90%8E%E7%AB%AF%E9%A2%84%E8%A7%88.gif)

在v2版本中我混用了 token + session 来保证安全会话的, 同时使用 axios 进行前后端交互。 在v1 版本中 因为全在服务端渲染，都不知道的有跨域这回事，就一把梭，全借助Koa2 这个优秀的框架的给完事了。

##  项目目录

麻雀虽小五脏俱全嘛，增删改查该有的都有了。

```
前端的
- components
  - 404
  - admin 用户管理界面
  	- articles 文章管理
  	- comments 评论管理
  	- header (就是右上角那个头像)
  	- home (初始的默认界面)
  	- info (里边的avatar 修改头像的组件)
  	- layout 布局
  	- siderbar 左边栏
  	- user (管理员管理用户 根据 role)
  - index 首屏加载页面
    - article 文章详情
    - articles 文章列表
    - authMOdal 登录注册弹窗
    - comments 评论
    - layout 布局
    - nav 头部导航
    - slider 右边栏(本来是想管理页面的时候增加修改个人信息)
- routes 路由(包括 admin home)
- redux 状态管理 (学的React进阶之路这本书里边的ducks组织)
- utils 工具函数
```

为了方便代码的联调所以我就把server放一起了

``` 
后端的
- control 各个collection的操作
- Models 封装document操作权
- public 静态资源(用户头像上传)
- routers 路由接口
- Schema 表的设计
- util 工具函数
```

然后想说的就是 Markdown的渲染 用的就是 marked + highlight.js

## Build Setup ( 建立安装 )

``` 
# install dependencies
npm install 

# serve with hot reload at localhost: 3000
npm start 或者 yarn start

# build for production with minification
npm run build 或者 yarn run build
```



## 最后想说的是

感觉此前学习的都是一些基本功，当真正自己干一个项目的时候，可能就会有一种感觉，感觉啥也不会(因为之前感觉自己啥也学习了，于是就干上了) 😰，好不容易弄出来了，给同学一测试emm gg,又有新的问题了，上线又是一堆bug等着你解决。

还有准备以后打算说一下我是如何摸爬打滚整出一个这样的项目来的，然后就是写一写博客吧， 因为大佬们都有自己经常更新的博客，其实我也是跟着大佬的博客一点点学习，把这些零碎的知识点联合在一起真的是一件很痛苦的事情唉，然后发觉前端路漫漫，学习的东西真的真的好多，但是话有说话来，既然喜欢上了前端，就得付出时间和代价。

>总结我这一年学习的最大感触就是: 知识一定要形成体系
>
>附上我的代码仓库[**Go-ahead_FE**](https://github.com/Mrshulan/Go-ahead_FE)

如果喜欢 欢迎(孬也)给个star star star 不是 skr skr skr！！！ 来自一个大三学弟（准备找实习）的乞讨脸.jpg

