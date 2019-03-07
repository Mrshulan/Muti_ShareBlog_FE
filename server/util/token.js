const jwt = require('jsonwebtoken')

exports.enToken = info => {
  const token = jwt.sign(info, 'mrshulan', { expiresIn: '1h' })
  console.log('generated token', token)
  return token
}

exports.deToken = ctx => {
  let token
  if(typeof ctx === 'object') {
    const authorizationHeader = ctx.headers['authorization']
    token = authorizationHeader.split(' ')[1] // 取到 token
  } else {
    token = ctx
  }
  return jwt.decode(token)
}

