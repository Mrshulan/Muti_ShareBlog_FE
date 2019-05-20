const { Schema } = require("./config")
const ObjectId = Schema.Types.ObjectId

const LikeSchema = new Schema({
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
  timestamps: true
})

// 设置remove后置钩子
LikeSchema.post("remove",  async (doc) => {
  const Article = require("../Models/article")
  const User = require("../Models/user")
  const { from, article } = doc;

  await Article.updateOne({_id: article}, {$inc: {likeNum: -1}}).exec()
  await User.updateOne({_id: from}, {$inc: {likeNum: -1}}).exec()
})

module.exports = LikeSchema