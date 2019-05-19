const { db } = require("../Schema/config")
const SessionSchema = require("../Schema/sessionStore")

const Session = db.model("sessions", SessionSchema)

module.exports.Session = Session

module.exports.SessionStore = class SessionStore {
  constructor () {
    // 挂载到实例上 session 也就是集合的操作权利了
    this.session = Session
  }

  async destroy (id) {
    const { session } = this
    return session.deleteOne({ _id: id })
  }

  async get (id) {
    const { session } = this
    const { data } = await session.findById(id)
    return data
  }

  async set (id, data = {}, maxAge, { changed, rolling }) {
    // koa-session源码 changed 哈希改变(所以造成destroy之后也算change返回新的set-cookie) rolling每次都换
    if (changed || rolling) {
      const { session } = this
      const record = { _id: id, data, updatedAt: new Date() }
      await session.findOneAndUpdate({_id: id}, record, { upsert: true, safe: true })
    }
    return data
  }

  static create (opts) {
    return new SessionStore(opts);
  }
}