import React from 'react'
import { Icon, Avatar } from 'antd'
import './index.less'
import logo from '../../../assets/logo.jpg'
import Categories from '../categories/index'
const isPro = process.env.NODE_ENV === 'production'

const SliderRight = ({data}) => {
  let {avatar, username, sign, tellphone, email } = data
  let link = [
        {
          url: 'https://github.com/Mrshulan',
          icon: 'github'
        },
        {
          url: 'https://weibo.com/AKingDMJim',
          icon: 'weibo'
        }
      ]
    
  const linkList = link.map(item => (
    <a key={item.icon} target="_blank" rel='noopener noreferrer' href={item.url}>
      <Icon
        key={item.icon}
        type={item.icon}
        theme="outlined"
        style={{ fontSize: '20px', marginRight: '10px' }}
      />
    </a>
  ))
  // 处理一下头像链接
  avatar = isPro ? 'http://mrshulan.xin' : 'http://127.0.0.1:6001' + avatar

  return ( 
  <div className="right">
      <Avatar className="right-logo" src={avatar|| logo} size={130} icon="user" />
      <div className="title">{username || '你的名字'}</div>
      <div className="right-signature">
        { sign || '像狗一样的学习,像狗一样的学习' }
      </div>
      <div className="right-info">
        <div className="title">个人介绍</div>
        <div className="introduce">
          {tellphone || '电话: 18473871766'}
          <br/>
          {email || '邮箱：adengminjie@163.com'}
        </div>
        <div className="footer">{linkList}</div>
      </div>
      <div className="tags">
        <div className="title">归档</div>
        <Categories />
      </div>
    </div>
  )
}

export default SliderRight