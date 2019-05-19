const { Schema } = require("./config")

const SessionSchema = new Schema({
  _id: String,
  data: {
    type: Object,
    default: {}
  },
  updatedAt: {
    default: new Date(),
    expires: 86400, // 1 day
    type: Date
  }
}, {
  versionKey: false,
})

module.exports = SessionSchema