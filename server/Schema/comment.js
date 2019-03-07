const { Schema } = require("./config")
const ObjectId = Schema.Types.ObjectId

const CommentSchema = new Schema({
  content: String,
  from: {
    type: ObjectId,
    ref: "users"
  },
  article: {
    type: ObjectId,
    ref: "articles"
  }
},{
  versionKey: false,
  timestamps: {
    createdAt: "created"
  }
})

// 设置remove后置钩子
CommentSchema.post("remove", async (doc) => {
  const Article = require("../Models/article")
  const User = require("../Models/user")

  const { from, article } = doc;

  await Article.updateOne({_id: article}, {$inc: {commentNum: -1}}).exec()

  await User.updateOne({_id: from}, {$inc: {commentNum: -1}}).exec()
})

module.exports = CommentSchema