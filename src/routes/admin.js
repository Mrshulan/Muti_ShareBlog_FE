import Layout from '../components/admin/layout'

import Home from '../components/admin/home'
import UsersManage from '../components/admin/user/index'
import ArticlesManage from '../components/admin/articles'
import CommentsManage from '../components/admin/comments'
import InfoManage from "../components/admin/info/avatar/index"
import NotFound from '../components/404/index'

export default {
  path: 'admin',
  name: 'admin',
  component: Layout,
  childRoutes: [
    {
      path: '',
      icon: 'home',
      name: '首页',
      component: Home,
    },
    {
      path: 'user',
      name: '用户管理', 
      icon: 'user', 
      component: UsersManage
    },
    {
      path: 'articles',
      icon: 'edit',
      name: '文章管理',
      component: ArticlesManage
    },
    {
      path: 'comments',
      icon: 'edit',
      name: '评论管理',
      component: CommentsManage
    },
    {
      path: 'avatar',
      icon: 'edit',
      name: '头像上传',
      component: InfoManage
    },
    { path: '*', component: NotFound}
  ]
}