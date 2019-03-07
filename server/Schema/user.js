const { Schema } = require('./config')

// 生成Schema实例规范
const UserSchema = new Schema({
  username: String,
  password: String,
  role: {
    type: String,
    default: 1
  },
  avatar: {
    type: String,
    default: "/avatar/default.jpg"
  },
  articleNum: Number,
  commentNum: Number
}, {versionKey: false})

// 删除用户的钩子
UserSchema.post('remove', async doc => {
  const Article = require("../Models/article")
  const Comment = require("../Models/comment")

  const { _id: uid } = doc

  await Article.find({author: uid})
    .then(data => {
      data.forEach(v => v.remove())
    })
    .catch(err => {
      console.log("用户删除连接Article失败")
    })
  await Comment.find({from: uid})
    .then(data => {
      data.forEach(v => v.remove())
    })
    .catch(err => {
      console.log("用户删除连接Comment失败")
    })
})


module.exports = UserSchema