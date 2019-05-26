const Koa = require('koa')
const logger = require('koa-logger')
const body = require('koa-body')
const session = require('koa-session')
const cors = require("@koa/cors")
const staticSource = require('koa-static')
const router = require('./routers/router')
const check = require('./middlewares/check')
const errorHandle = require('./middlewares/errorHandle')
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

// 跨域
app.use(cors({
  origin: 'http://127.0.0.1:3000',
  credentials: true,
}))

app.use(errorHandle)

// 注册日志模块
app.use(logger())
// 注册session
app.use(session(CONFIG, app))
  .use(check)


// 配置 koa-body 处理 post 请求数据
app.use(body())

// 配置静态资源目录 (强 + 协)
app.use(staticSource(join(__dirname, "public"), { maxage: '86400000' }))

// 注册路由信息
app.use(router.routes()).use(router.allowedMethods())

app.listen(6001, () => {
  console.log("项目启动成功，监听在6001端口")
})
