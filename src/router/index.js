import React from 'react'
import Loadable from 'react-loadable'

let config = [
  {
    name: '/',
    path: '/',
    exact: true,
    component: Loadable({
      loader: () => import('../components/articles/articles.jsx'),
      loading: () => <div />
    })
  },
  {
    name: 'articleDetail',
    path: '/articleDetail',
    exact: true,
    component: Loadable({
      loader: () => import('../components/article/article'),
      loading: () => <div />
    })
  },
  {
    name: 'editor',
    path: '/editor',
    exact: true,
    component: Loadable({
      loader: () => import('../components/editor/index'),
      loading: () => <div />
    })
  }
]

export default config