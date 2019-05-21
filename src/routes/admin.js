import Layout from '../components/admin/layout'

import Home from '../components/admin/home'
import UsersManage from '../components/admin/user/index'
import ArticlesManage from '../components/admin/articles'
import CommentsManage from '../components/admin/comments'
import LikesManage from '../components/admin/likes'
import AvatarManage from "../components/admin/info/avatar/index"
import InfoManage from "../components/admin/info/index"
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
      path: 'users',
      name: '用户管理', 
      icon: 'user', 
      component: UsersManage
    },
    {
      path: 'articles',
      icon: 'edit',
      name: '我的文章',
      component: ArticlesManage
    },
    {
      path: 'comments',
      icon: 'edit',
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
      path: 'userinfo',
      icon: 'user',
      name: '个人信息',
      routes: [
        { path: 'avatar', name: '头像更换', component: AvatarManage },
        { path: 'info', name: '信息修改', component: InfoManage },
      ]
    },
    { path: '*', component: NotFound}
  ]
}