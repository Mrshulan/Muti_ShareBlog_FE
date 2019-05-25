const User = require("../Models/user")
const Article = require("../Models/article")
const Comment = require("../Models/comment")
const Like = require('../Models/like')

// 文章的发表(保存到数据库)
exports.add = async ctx => {
  // if (ctx.session.isNew) {
  //   // true没登录 就不需要查询数据库
  //   return ctx.body = {
  //     message: "用户未登录",
  //     status: 403
  //   }
  // }

  const data = ctx.request.body
  // 主动添加一下文章的作者的uid
  data.author = ctx.session.uid;

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
  let { page = 1, pageSize = 5, categories, keyword} = ctx.query
  pageSize = +pageSize
  page--

  // 条件判断
  let condition = {isBan: false}
  if(categories) {
    condition = { ...condition, categories }
  } else if (keyword) {
    condition = {
      ...condition,
      $or: [
        { title: { $regex: keyword, $options: '$i' }},
        { content: { $regex: keyword, $options: '$i' }}
      ],
    }
  }
  // await 处理并发
  let Promises = []
  Promises.push(async () => await Article.find(condition).then(data => data.length))
  Promises.push(async () => await Article
  .find({ isTop: true, isBan: false })
  .sort("-created")
  .populate({
    path: "author",
    select: "_id username avatar"
  })
  .then(data => data)
  .catch(err => console.log(err)))
  Promises.push(async () => await Article
  .find(condition)
  .sort("-created")
  .skip(pageSize * page)
  .limit(pageSize)
  .populate({
    path: "author",
    select: "_id username avatar"
  })
  .then(data => data)
  .catch(err => console.log(err)))

  const resultArr = []
  for (const promise of Promises) {
    resultArr.push(await promise())
  }

  ctx.body = {
    artList: resultArr[1].concat(resultArr[2]),
    total: resultArr[0],
  }
}

// 获取文章详情
exports.details = async ctx => {
  const _id = ctx.params.id

  const article = await Article
    .findById(_id)
    .populate("author", "username avatar")
    .then(data => data)

  const commentsList = await Comment
    .find({
      article: _id
    })
    .sort("-created")
    .populate("from", "username avatar")
    .populate("sub.from", "username avatar")
    .then(data => data)
    .catch(err => {
      console.log(err)
    })
  
  const likeData = await Like.find({ article: _id, from: ctx.session.uid }).then(data => data)

  ctx.body = {
    article,
    commentsList,
    isLike: likeData.length ? true : false
  }
}

// 喜欢文章
exports.like = async ctx => {
  let message = {
    status: 403,
    message: "登录才能喜欢"
  }
  // 更新点赞数据
  const { articleId, isLike } = ctx.request.body
  // 如果还没有喜欢(亮时)
  if(!isLike) {
    const _like = new Like({article: articleId, from: ctx.session.uid})
    await _like.save().then(data => {
      message = {
        status: 200,
        message: "喜欢成功"
      }

      Article.updateOne({
        _id: data.article
      }, {
        $inc: {
          likeNum: 1
        }
      }, err => {
        if (err) {
          message = {
            status: 403,
            message: err
          }
        }
      })

      User.updateOne({
        _id: data.from
      }, {
        $inc: {
          likeNum: 1
        }
      }, err => {
        if (err) {
          message = {
            status: 403,
            message: err
          }
        }
      })
    })
  // 放弃喜欢(灰时)
  } else {
    message = {
      status: 200,
      message: "放弃喜欢"
    }
    await Like.findOne({ article:articleId, from: ctx.session.uid })
      .then(data => data.remove())
      .catch(err => {
        message = {
          status: 403,
          message: err
        }
      })
  }
  ctx.body = message
}

// 顶置或封杀
exports.topOrBan = async ctx => {
  let message = {
    status: 200,
    message: '操作成功'
  }

  const _id = ctx.params.id
  const { isTop, isBan } = ctx.request.body

  if(isTop !== undefined) {
    Article.updateOne({_id}, { $set: { isTop }}, err => {
      if (err) {
        message = {
          status: 403,
          message: err
        }
      }
    })
  } else if (isBan !== undefined) {
    Article.updateOne({_id}, { $set: { isBan }}, err => {
      if (err) {
        message = {
          status: 403,
          message: err
        }
      }
    })
  }

  ctx.body = message
}

// 喜欢列表
exports.getLikeList = async ctx => {
  const uid = ctx.session.uid;
  const data = await Like.find({
    from: uid
  }).populate({
    path: "article",
    select: "_id title likeNum"
  })
  .then(data => data)

  ctx.body = {
    status: 200,
    count: data.length,
    data
  }
}
// 文章列表
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
// 管理员获取所有文章
exports.userArtlist = async ctx => {
  const data = await Article.find()

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