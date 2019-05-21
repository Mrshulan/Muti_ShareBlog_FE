const Article = require("../Models/article")

const Categories = [
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
// 查询文章分类
exports.getCategories = async (ctx) => {
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
  let result = await Promise.all(Categories.map(item => {
    return countArticles(item)
  }))

  ctx.body = result
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