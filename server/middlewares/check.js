// 关键路径鉴权
function check(ctx) {
  let token = false
  if(ctx.request.method === 'GET') {
    const requireList = [/getUserArticle/, /user\/users/]
    token = !!requireList.find(reg => reg.test(ctx.request.url))
  } else if(ctx.request.method === 'PUT') {
    const requireList = [/addCategories/]
    token = !!requireList.find(reg => reg.test(ctx.request.url))
  } else if (ctx.request.method === 'DELETE') {
    const requireList = [/delCategories/, /user/]
    token = !!requireList.find(reg => reg.test(ctx.request.url))
  } else if (ctx.request.method === 'POST') {
    const requireList = [/article\/[\w]{24}/]
    token = !!requireList.find(reg => reg.test(ctx.request.url))
  }
  return token
}

module.exports = async (ctx, next) => {
  const token = check(ctx)
  if(token) {
    if (ctx.session.role === '666') {
      await next()
    } else {
      ctx.body = {
        status: 403,
        message: '你无权该操作!'
      }
    }
  } else {
    await next()
  }
}