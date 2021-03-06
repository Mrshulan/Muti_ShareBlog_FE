const User = require("../Models/user")
const Article = require("../Models/article")
const Comment = require("../Models/comment")

// 文章评论保存
exports.save = async ctx => {
  let message = {
    status: 200,
    message: "评论成功"
  }

  const { article, content, isSub, fatherId } = ctx.request.body
  let data = {
    content,
    from: ctx.session.uid
  }
  if(!isSub) {
    
    data.article = article

    const _comment = new Comment(data)
    await _comment
      .save()
      .then(data => {    
        // 更新当前文章的评论计数器
        Article.updateOne({
            _id: data.article
          }, {
            $inc: {
              commentNum: 1
            }
          }, err => {
            if (err) return console.log(err)
          })
  
        User
          .updateOne({
            _id: data.from
          }, {
            $inc: {
              commentNum: 1
            }
          }, err => {
            if (err) return console.log(err)
          })
      })
      .catch(err => {
        message = {
          status: 403,
          message: err
        }
      })
  } else {
    Comment
        .updateOne(
          {_id: fatherId},
          {$push: {sub: data} },
          err => {
            if (err) {
              message = {   
                status: 403,
                message: err
              }
              return console.log(err)
            }
          })
  }

  ctx.body = message
}

// admin 评论列表
exports.comlist = async ctx => {
  const uid = ctx.session.uid

  const data = await Comment.find({
    from: uid
  }).populate("article", "title")

  ctx.body = {
    code: 0,
    count: data.length,
    data
  }
}

// 评论删除
exports.del = async ctx => {
  const commentId = ctx.params.id;

  let res = {
    status: 200,
    message: "删除成功"
  }
  // 不能绕过remove方法使用deleteOne(勾不住钩子)
  await Comment.findById(commentId)
    .then(data => data.remove() )
    .catch(err => {
      res = {
        status: 403,
        message: err
      }
    })

  ctx.body = res
}