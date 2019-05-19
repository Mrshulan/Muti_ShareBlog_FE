// 具有过期功能localStorage存储
export default class Storage {
  constructor() {
    this.source = window.localStorage
    this.initRun()
  }

  initRun() {
    // 匹配一波有特殊要求的
    const reg = new RegExp('__expires__')
    let data = this.source
    // for in 使用hasOwnProperty方法过滤或Object.keys会返回自身可枚举属性组成的数组
    let list = Object.keys(data)

    if(list.length > 0) {
      list.map((key, v) => {
        // key 和 key__expires__ 是一对 处理 key的就好 如果没有__expires 则永久存储 + 1处理
        if(!reg.test(key)) {
          let now = Date.now()
          let expires = data[`${key}__expires__`] || Date.now() + 1

          if(now > expires) {
            this.remove(key)
          }
          return key
        }
        return null
      }) 
    }
  }
  // set 额外${key}__expires__
  set(key, value, expired) {
    let source = this.source

    source[key] = JSON.stringify(value)

    if(expired) {
      source[`${key}__expires__`] = Date.now() + expired
    }

    return value
  }
  // get 额外${key}__expires__ 与 当前 Date.now() 做出比较
  get(key) {
    let source = this.source

    let expired = source[`${key}__expires__`] || Date.now() + 1

    const now = Date.now()

    if(now >= expired) {
      this.remove(key)
      return
    }

    const value = source[key] ? JSON.parse(source[key]) : source[key]

    return value
  }

  remove(key) {
    const data = this.source
    const value = data[key]

    delete data[key]
    delete data[`${key}__expires__`]

    return value
  }
}