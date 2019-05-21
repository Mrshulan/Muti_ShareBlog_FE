import Layout from '../components/index/layout'

import Articles from '../components/index/articles/articles.jsx'
import Article from '../components/index/article/article.jsx'
import Editor from '../components/index/editor/index.jsx'
import Categories from '../components/index/categories/index.jsx'
import NotFound from '../components/404/index'

export default {
  path: '/',
  name: 'home',
  component: Layout,
  childRoutes: [
    {path: '', component: Articles},
    {path: 'article/:id', component: Article},
    {path: 'editor', component: Editor},
    {path: 'categories/:id', component: Articles},
    {path: 'categories', component: Categories},
    {path: 'hot', component: Articles},
    {path: '*', component: NotFound}
  ]
}

// import React from 'react'
// import Loadable from 'react-loadable'

// let config = [
//   {
//     name: '/',
//     path: '/',
//     exact: true,
//     component: Loadable({
//       loader: () => import('../components/articles/articles.jsx'),
//       loading: () => <div />
//     })
//   },
//   {
//     name: 'articleDetail',
//     path: '/article/:id',
//     component: Loadable({
//       loader: () => import('../components/article/article'),
//       loading: () => <div />
//     })
//   },
//   {
//     name: 'editor',
//     path: '/editor',
//     exact: true,
//     component: Loadable({
//       loader: () => import('../components/editor/index'),
//       loading: () => <div />
//     })
//   },
// ]

// export default config