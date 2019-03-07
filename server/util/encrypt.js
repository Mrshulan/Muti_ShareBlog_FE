const crypto = require('crypto')
// 导出的是一个函数
// crypto创建加密方式,update更新，digest导出 返回加密成功的数据
module.exports = function(password, key = "mrshulan"){
  const hmac = crypto.createHmac("sha256", key)
  hmac.update(password)
  const passwordHmac = hmac.digest("hex")
  return passwordHmac
}