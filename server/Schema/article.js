const { Schema } = require("./config")
const ObjectId = Schema.Types.ObjectId

const ArticleSchema = new Schema({
  title: String,
  content: String,
  commentNum: {
    type: Number,
    default: 0
  },
  likeNum: {
    type: Number,
    default: 0
  },
  author: {
    type: ObjectId,
    ref: "users"
  },
  categories: {
    type: [String],
    default: ['JavaScript']
  },
  isTop: {
    type: Boolean,
    default: false
  },
  isBan: {
    type: Boolean,
    default: false
  }
},{
  versionKey: false,
  timestamps: {
    createdAt: "created"
  }
})

// 设置文章删除的钩子
ArticleSchema.post('remove', async doc => {
  const User = require('../Models/user')
  const Comment = require('../Models/comment')

  const { _id: artId, author: authorId } = doc

  await User.findByIdAndUpdate(authorId, {$inc: {articleNum: -1}}).exec()

  await Comment.find({article: artId})
    .then(data => {
      data.forEach(v => v.remove())
    })
    .catch(err => {
      console.log("文章删除连接Comment失败")
    })
})


module.exports = ArticleSchema