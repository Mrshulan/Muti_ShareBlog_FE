// 被踢出后中间件(可用来错误上报)
module.exports = async (ctx, next) => {
  try {
    await next()
  } catch(err) {
    if(/data/.test(err.message)) {
      // 覆盖koa-session的返回
      ctx.cookies.set('MRSHULAN', '')
      ctx.cookies.set('MRSHULAN.sig', '')
      ctx.body = {
        status: -1,
        message: '被迫登出,请重新登录'
      }
    } else {
      console.error(err)
    }
  }
}