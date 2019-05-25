const Article = require("../Models/article")

let Categories = [
  {
    name: '前端',
    linkname: 'frontend'        
  },
  {
    name: '后台',
    linkname: 'backend'
  },
  {
    name: '数据库',
    linkname: 'sql',
  },
  {
    name: 'webpack',
    linkname: 'webpack'
  },
  {
    name: 'koa2',
    linkname: 'koa2'
  },
  {
    name: 'react',
    linkname: 'react'
  },
  {
    name: 'vue',
    linkname: 'vue'
  },
  {
    name: '数据结构与算法',
    linkname: 'Algorithm'
  }
]

let addCategories = []

// 查询文章分类
exports.getCategories = async (ctx) => {
  const { isUnique } = ctx.request.query
  if(!isUnique) {
    // promise包装
    let countArticles = (item) => {
      return new Promise((resolve) => {
        Article.find({categories: item.linkname }).then(data => {resolve(data)})
      }).then(data => {
        item.countArticles = data.length
        return item
      }).catch(err => {
        console.error(err)
      })
    }
    // 并发查询
    let result = await Promise.all(Categories.concat(addCategories).map(item => {
      return countArticles(item)
    }))

    ctx.body = result
  } else {
    ctx.body = addCategories
  }
}

// 添加文章分类
exports.addCategories = async (ctx) => {
  const { name } = ctx.request.body 

  addCategories.push({name, linkname: name, isNew: true})
  ctx.body = {
    status: 200,
    message: '新增类别成功'
  }
}

// 删除文章分类
exports.delCategories = async (ctx) => {
  const name  = ctx.params.id

  addCategories = addCategories.filter(item => {
    return !(item.name === name)
  })

  ctx.body = {
    status: 200,
    message: '删除类别成功'
  }
}

// 获取热门文章 按照点赞数量
exports.getHotArticles = async ctx => {
  let { page = 1, pageSize = 5 } = ctx.query
  pageSize = +pageSize
  page--
  const total = await Article.find().then(data => data.length)

  const artList = await Article
    .find()
    .sort("-likeNum")
    .skip(pageSize * page)
    .limit(pageSize)
    .populate({
      path: "author",
      select: "_id username avatar"
    })
    .then(data => data)
    .catch(err => console.log(err))

  ctx.body = {
    artList,
    total,
  }
}