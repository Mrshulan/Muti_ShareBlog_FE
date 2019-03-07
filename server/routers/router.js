const Router = require('koa-router')
// 拿到操作各个表（集合）的逻辑对象
const user = require('../control/user')
const article = require('../control/article')
const comment = require("../control/comment")
const admin = require("../control/admin")

const upload = require("../util/upload")


const router = new Router()

router.get('/', async ctx => {
  ctx.body = '多人分享博客接口页面'
})

// 注册用户 路由
router.post("/register", user.reg)

// 用户登录 路由
router.post("/login", user.login)

// 用户退出
router.get("/user/logout", user.logout)

// 文章的发表页面
router.get('/article', user.keepLog, article.addPage)

// 文章添加
router.put("/article", user.keepLog, article.add)

// 文章获取列表
router.get('/articlesList', user.keepLog, article.getArticleList)

// //文章列表分页 路由
// router.get("/page/:id", article.getArticleList)

// 文章详情页 路由
router.get("/article/:id", user.keepLog, article.details)

// 发表评论
router.put("/comment", user.keepLog, comment.save)

// 文章评论头像上传
router.get("/admin/:id", user.keepLog, admin.index)


// 头像上传
router.post("/upload", user.keepLog, upload.single("avatar"), user.upload)

// 获取用户的所有评论
router.get("/user/comments", user.keepLog, comment.comlist)
// 获取用户的所有文章
router.get("/user/articles", user.keepLog, article.artlist)
// 获取用户
router.get("/user/users", user.keepLog, user.usrlist)

// 删除用户的评论
router.del("/comment/:id", user.keepLog, comment.del)
// 删除用户文章
router.del("/article/:id", user.keepLog, article.del)
// 删除用户
router.del('/user/:id', user.keepLog, user.del)


module.exports = router