const crypto = require('crypto')

// crypto创建HMAC密钥哈希,update更新，digest导出 返回加密成功的数据
module.exports = function({password, vkey = 'mrshulan'}){
  const hmac = crypto.createHmac("sha256", vkey)
  hmac.update(password)
  const passwordHmac = hmac.digest("hex")
  return passwordHmac
}