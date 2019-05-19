const User = require("../Models/user")
const { Session } = require('../Models/sessionStore')
const encrypt = require("../util/encrypt")
const rand = require('csprng')

// 用户注册
exports.reg = async ctx => {
  // ctx.request.body 接受注册时 post发过来的数据
  const { username, password } = ctx.request.body
  let response
  // 给个promise承诺 
  await new Promise((resolve, reject) => {
      // 1、先去数据库里边查一下是否有这个用户
      User.find({
        username
      }, (err, data) => {
        // 查询出错 
        if (err) return reject(err)
        // 用户名已经存在
        if (data.length !== 0) {
          return resolve("")
        }
        const vkey = rand(160, 36)
        // 用User模子new一个	数据记录行/文档BSON 记得用模块导出的函数加密 函数返回的是加密后的数据
        const _user = new User({
          username,
          password: encrypt({password, vkey}),
          vkey,
          commentNum: 0,
          articleNum: 0
        })
        // 保存该数据
        _user.save((err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      })
    })
    .then(async data => {
      // then 也是异步 所以都是用async await进行先操作
      if (data) {
        response = { status: 200, message: '注册成功' }
      } else {
        response = { status: 403, message: '用户名已被注册' }
      }

      ctx.body = response
    })
    .catch(async err => {
      ctx.body = { status: 403, message: '注册失败' }
    })
}

// 用户登录
exports.login = async ctx => {
  // 拿到 post数据
  const { username, password } = ctx.request.body
  let response
  await new Promise((resolve, reject) => {
      User.find({
        username
      }, (err, data) => {
        if (err) return reject(err)
        if (data.length === 0) return reject("用户名不存在")
        // 数据库中的加密密码是否和输入的加密一致，
        if (data[0].password === encrypt({password, vkey: data[0].vkey})) {
          return resolve(data)
        }
        resolve("")
      })
    })
    .then(async data => {
      if (!data) {
        response = { status: 403, message: '密码不正确' }
      } else {
        // 剔除其他设备的用户
        await Session.deleteMany({'data.uid':  data[0]._id})
        // 成功登录 保存新session
        ctx.session = {
          username,
          uid: data[0]._id,
          role: data[0].role
        }
        response = { status: 200, message: '你已经登录成功', username, userId: data[0]._id, avatar: data[0].avatar, role: data[0].role }
      }
      ctx.body = response
    })
    .catch(async err => {
      ctx.body = { status: 400, message: err }
    })
}

// 确定和记录 保证同一个session信息不会永久有效，又能让正常的、频繁使用的用户免除登录
exports.keepLog = async (ctx, next) => {
  const currentTime = Date.now()
  if (currentTime <= ctx.session._expire) { // 有效期间内
    // 快要过期的一个小时续期
    if(0 < ctx.session._expire - currentTime && ctx.session._expire - currentTime < 60 * 60 * 1000) {
      ctx.session = {
        ...ctx.session
      }
    }
  }
  await next() //移交下一个中间件
}

// 用户退出中间件
exports.logout = async ctx => {
  ctx.body = {
    message:'退出成功'
  }
  ctx.session = null
}

// 用户的头像上传
exports.upload = async ctx => {
  const filename = ctx.req.file.filename
  let data = {}
  await User.updateOne({
    _id: ctx.session.uid
  }, {
    $set: { avatar: `/avatar/${filename}` }
  }, (err, res) => {
    if (err) {
      data = {
        status: 400,
        message: "上传失败"
      }
    } else {
      data = {
        status: 200,
        message: '上传成功',
        avatar: "/avatar/" + filename
      }
      ctx.session.avatar = "/avatar/" + filename
    }
  })
  
  ctx.body = data
}


// admin 管理员查看用户
exports.usrlist = async ctx => {
  const data = await User.find({role: '1'}).exec()

  ctx.body = {
    status: 200,
    count: data.length,
    data
  }
}

// admin 删除用户
exports.del = async ctx => {
  const uid = ctx.params.id

  let res = {
    status: 200,
    message: '删除成功'
  }

  await User.findById(uid)
    .then(data => data.remove())
    .catch(err => {
      res = {
        state: 400,
        message: err
      }
    })
  
  ctx.body = res
}