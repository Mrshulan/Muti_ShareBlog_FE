const { db } = require("../Schema/config")

const UserSchema = require("../Schema/user")
// 通过db对象在库里边创建了users数据库表/集合(collection)以UserShema作为数据模型 User操作整张表
const User = db.model("users", UserSchema)

module.exports = User