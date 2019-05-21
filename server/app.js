const Koa = require('koa')
const logger = require('koa-logger')
const body = require('koa-body')
const session = require('koa-session')
const cors = require("@koa/cors")
const staticSource = require('koa-static')
const router = require('./routers/router')
const { SessionStore } =require('./Models/sessionStore')

const {
  join
} = require('path')

const app = new Koa()

app.keys = ["secret"]

const CONFIG = {
  key: "MRSHULAN",
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true, // 只能同构http协议来修改session cookie
  signed: true, // 哈希签名
  sameSite: 'strict', // 防止大部分浏览器的xsrf
  store: new SessionStore()
}

// 被踢出后中间件(可用来错误上报)
app.use(async (ctx, next) => {
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
})
// 跨域
app.use(cors({
  origin: 'http://127.0.0.1:3000',
  credentials: true,
}))

// 注册日志模块
app.use(logger())
// 注册session
app.use(session(CONFIG, app))

// 配置 koa-body 处理 post 请求数据
app.use(body())

// 配置静态资源目录
app.use(staticSource(join(__dirname, "public")))

// 注册路由信息
app.use(router.routes()).use(router.allowedMethods())

app.listen(6001, () => {
  console.log("项目启动成功，监听在6001端口")
})
