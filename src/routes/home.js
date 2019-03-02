import Layout from '../components/index/layout'

import Home from '../components/index/articles/articles.jsx'
import Article from '../components/index/article/article.jsx'
import Editor from '../components/index/editor/index.jsx'
import NotFound from '../components/404/index'

export default {
  path: '/',
  name: 'home',
  component: Layout,
  childRoutes: [
    {path: '', component: Home},
    {path: 'article/:id', component: Article},
    {path: 'editor', component: Editor},
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