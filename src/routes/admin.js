import Layout from '../components/admin/layout'

import Home from '../components/admin/home'
import UsersManage from '../components/admin/user/index'
import ArticlesManage from '../components/admin/articles'
import CommentsManage from '../components/admin/comments'
import LikesManage from '../components/admin/likes'
import AvatarManage from "../components/admin/info/avatar/index"
import InfoManage from "../components/admin/info/profile/index"
import UserArticlesManager from '../components/admin/useArticles'
import CategtoriesManager from '../components/admin/categories'
import NotFound from '../components/404/index'

export default {
  path: 'user',
  name: 'user',
  component: Layout,
  childRoutes: [
    {
      path: '',
      icon: 'home',
      name: '首页',
      component: Home,
    },
    {
      path: 'userinfo',
      icon: 'info',
      name: '个人信息',
      childRoutes: [
        { path: 'avatar', icon: 'user',  name: '头像更换', component: AvatarManage },
        { path: 'info', icon: 'profile', name: '信息修改', component: InfoManage },
      ]
    },
    {
      path: 'users',
      name: '用户管理', 
      icon: 'user', 
      component: UsersManage
    },
    {
      path: 'categories',
      icon: 'edit',
      name: '分类管理',
      component: CategtoriesManager
    },
    {
      path: 'articles',
      icon: 'edit',
      name: '我的文章',
      component: ArticlesManage
    },
    {
      path: 'comments',
      icon: 'book',
      name: '我评论的',
      component: CommentsManage
    },
    {
      path: 'likes',
      icon: 'like',
      name: '我喜欢的',
      component: LikesManage
    },
    {
      path: 'userArticles',
      icon: 'edit',
      name: '文章管理',
      component: UserArticlesManager
    },
    { path: '*', component: NotFound}
  ]
}