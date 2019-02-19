import React, { Component } from 'react'
import { Icon, Avatar, message } from 'antd'

import './index.less'
import logo from '../../assets/logo.jpg'

class SliderRight extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      list: [
        {
          _id: 'dg',
          name: '前端',
          
        }
      ],
			linkList: [
        {
          _id: 'ag',
          url: 'mrshulan.com',
          icon: 'lock'
        }
      ],
			filingList: [
				{
					id: 1,
					name: '2018-12-12',
					urlId: '/home',
				},
				{
					id: 2,
					name: '2018-12-12',
					urlId: '/home',
				},
				{
					id: 3,
					name: '2018-12-12',
					urlId: '/home',
        },
      ]
    }
  }

  render() {
    const list = this.state.list.map((item, i) => (
      <a className='item' key={item._id} href={`/home?tag_id=${item._id}&tag_name=${item.name}&category_id=`}>
      	<span key={item._id}>{item.name}</span>
      </a>
    ))

    const linkChildren = this.state.linkList.map(item => (
      <a key={item._id} target="_blank" href={item.url}>
				<Icon
					key={item._id}
					type={item.icon}
					theme="outlined"
					style={{ fontSize: '20px', marginRight: '10px' }}
				/>
			</a>
    ))

    return (
      <div className="right">
        <Avatar className="right-logo" src={logo} size={130} icon="user" />
        <div className="title">树懒</div>
				<div className="right-content">
        </div>
        <div className="introduce">
					<div className="title">个人介绍</div>
					<div className="content">
						像狗一样的学习 <br /> 像绅士一样的玩
					</div>
					<div className="footer">{linkChildren}</div>
				</div>
        <div className="tags">
					<div className="title">标签云</div>
					{list}
				</div>
      </div>
    )
  }
}

export default SliderRight