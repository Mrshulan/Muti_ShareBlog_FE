import React, { Component } from 'react'
import { Icon, Avatar } from 'antd'
import './index.less'
import logo from '../../../assets/logo.jpg'


class SliderRight extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      name: '',
			linkList: [
        {
          url: 'https://github.com/Mrshulan',
          icon: 'github'
        },
        {
          url: 'https://weibo.com/AKingDMJim',
          icon: 'weibo'
        }
      ],
      categoriesList: [
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
      ],
    }
  }

  componentDidMount() {
    if(window.sessionStorage.userInfo) {
      let username = JSON.parse(window.sessionStorage.userInfo).name
      this.setState({
        name: username
      })
    }
  }

  render() {
    const linkList = this.state.linkList.map(item => (
      <a key={item.icon} target="_blank" rel='noopener noreferrer' href={item.url}>
				<Icon
					key={item.icon}
					type={item.icon}
					theme="outlined"
					style={{ fontSize: '20px', marginRight: '10px' }}
				/>
			</a>
    ))
    
    const categoriesList = this.state.categoriesList.map((item, i) => (
      <a className='item' key={item.name} href={`/categories/${item.linkname}}`}>
      	<span>{item.name}</span>
      </a>
    ))


    return (
      <div className="right">
        <Avatar className="right-logo" src={logo} size={130} icon="user" />
        <div className="title">{this.state.name}</div>
				<div className="right-signature">
           像狗一样的学习,像狗一样的学习
        </div>
        <div className="right-info">
					<div className="title">个人介绍</div>
					<div className="introduce">
						电话: 18473871766
            <br/>
            邮箱：adengminjie@163.com
					</div>
					<div className="footer">{linkList}</div>
				</div>
        <div className="right-tags">
					<div className="title">归档</div>
					{categoriesList}
				</div>
      </div>
    )
  }
}

export default SliderRight