const User = require("../Models/user")
const Article = require("../Models/article")
const Comment = require("../Models/comment")

// 文章的发表(保存到数据库)
exports.add = async ctx => {
  if (ctx.session.isNew) {
    // true没登录 就不需要查询数据库
    return ctx.body = {
      message: "用户未登录",
      status: 403
    }
  }

  // 用户登录发表 post发来的数据
  const data = ctx.request.body
  // 主动添加一下文章的作者的uid
  data.author = ctx.session.uid;
  data.commentNum = 0;

  await new Promise((resolve, reject) => {
      new Article(data).save((err, data) => {
        if (err) {
          return reject(err)
        }

        User.updateOne({
          _id: data.author
        }, {
          $inc: {
            articleNum: 1
          }
        }, err => {
          if (err) return console.log(err)
          console.log("文章保存成功")
        })
        resolve(data)
      })
    })
    .then(data => {
      ctx.body = {
        message: "发表成功",
        status: 200
      }
    })
    .catch(err => {
      ctx.body = {
        message: "发表失败",
        status: 403
      }
    })
}

// 获取文章列表
exports.getArticleList = async ctx => {
  let { page = 1, pageSize = 10 } = ctx.query
  let offset = (page - 1) * pageSize

  page--
  const total = await Article.find().then(data => data.length)

  const artList = await Article
    .find()
    .sort("-created")
    .skip(10 * page)
    .limit(10)
    .populate({
      path: "author",
      select: "_id username avatar"
    })
    .then(data => data)
    .catch(err => console.log(err))

  ctx.body = {
    artList,
    total,
    offset
  }
}

// 获取文章详情
exports.details = async ctx => {
  const _id = ctx.params.id

  const article = await Article
    .findById(_id)
    .populate("author", "username")
    .then(data => data)

  const commentsList = await Comment
    .find({
      article: _id
    })
    .sort("-created")
    .populate("from", "username avatar")
    .then(data => data)
    .catch(err => {
      console.log(err)
    })

  ctx.body = {
    article,
    commentsList,
  }
}

// admin 文章列表
exports.artlist = async ctx => {
  const uid = ctx.session.uid;
  const data = await Article.find({
    author: uid
  })

  ctx.body = {
    status: 200,
    count: data.length,
    data
  }
}

// 删除对应 id 的文章
exports.del = async ctx => {
  const _id = ctx.params.id

  // 思路
  // 用户的 articleNum  -= 1
  // 删除文章对应的所有的评论
  // 被删除评论对应的用户表里的 commnetNum -= 1

  let res = {
    status: 200,
    message: '删除成功'
  }

  await Article.findById(_id)
    .then(data => data.remove())
    .catch(err => {
      res = {
        state: 403,
        message: err
      }
    })
  
  ctx.body = res
}