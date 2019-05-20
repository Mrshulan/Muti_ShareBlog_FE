const { db } = require("../Schema/config")

const LikeSchema = require("../Schema/like")
const Like = db.model("likes", LikeSchema)

module.exports = Like