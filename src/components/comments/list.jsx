import React, { Component } from 'react';
import { message, Avatar, Spin } from 'antd';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ChildrenComment from './childrenComment.jsx';

import './index.less';
import { timestampToTime } from '../../utils/utils';

class CommentList extends Component {
  constructor() {
    super(...arguments)
    this.state = {
			visible: false,
			isLoading: false,
			content: '',
			comment_id: '',
			to_uesr: {},

    }
	}
	
	showCommentModal = (item,secondItem) => {
		if(!window.sessionStorage.userInfo) {
			message.error('登录才能发表')
			return false
		}

		if(secondItem) {
			this.setState({
				visible: true,
				comment_id: item._id,
				to_user: secondItem.user
			})
		} else {
			this.setState({
				visible: true,
				comment_id: item.id,
				to_user: item.user
			})
		}
	}

	handleAddOtherComment = () => {
		if(!this.state.comment_id) {
			message.warning('信息错误')
			return 
		}
		if(!this.state.content){
			message.warning('评论内容不能为空')
			return
		}

		let user_id = ''
		if(window.sessionStorage.userInfo) {
			let userInfo = JSON.parse(window.sessionStorage.userInfo)
			user_id = userInfo.id
		} else {
			message.warning('登录才能发表')
			return
		}

		this.setState({
			isLoading: true
		})

		// 一些异步操作
		this.setState({
			content: '',
			visible: false,
			isLoading: false,
		})
		// this.props.refreshArticle()
	}

	handleChange = (e) => {
		console.log(1)
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleCancel = () => {
		this.setState({
			visible: false
		})
	}

  render() {
		console.log(this.props.list)
    const list = this.props.list.map(item => (
      <ReactCSSTransitionGroup
        key={item.id}
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={1000}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
      >
        <div className="item">
					<div className="item-header">
						<div className="author">
							<a className="avator">
								<Avatar size="large" icon={item.user.avatar} />
							</a>
						</div>
						<div className="info">
							<a className="name">
								{item.user.name}
								{item.user.type === 0 ? '作者' : ''}
							</a>
							<div className="time">{item.create_time ? timestampToTime(item.create_time,true) : ''}</div>
						</div>
					</div>
					<div className="comment-detail">{item.content}</div>
					<div className="item-comment">
						<a className="like">
							<Avatar size="small" icon="like" /> 赞
						</a>
						<a onClick={() => this.showCommentModal(item)} className="message">
							<Avatar size="small" icon="message" /> 回复
						</a>
					</div>
					{item.other_comments.map((e, index) => {
						return (
							<div key={e._id} className="item-other">
								<div className="item-header">
									<div className="author">
										<a className="avator">
											<Avatar size="large" icon={e.user.avatar} />
										</a>
									</div>
									<div className="info">
										<a className="name">
											{e.user.name}
											{e.user.type === 0 ? '(作者)' : ''}
										</a>
										<div className="time">
											{e.create_time ? timestampToTime(e.create_time,true) : ''}
										</div>
									</div>
								</div>
								<div className="comment-detail">
									{'@' + e.to_user.name}
									{e.to_user.type === 0 ? '(作者)' : ''}：{e.content}
								</div>
								<div className="item-comment">
									<a className="like">
										<Avatar size="small" icon="like" /> 赞
									</a>
									<a onClick={() => this.showCommentModal(item, e)} className="message">
										<Avatar size="small" icon="message" /> 回复
									</a>
								</div>
							</div>
						);
					})}
				</div>
      </ReactCSSTransitionGroup>
    ))

    return (
      <div className="comment-list">
        <div className="top-title">
          <span>{this.props.numbers}条评论</span>
          <Spin spinning={this.state.isLoading}>{list}</Spin>
          <ChildrenComment
            visible={this.state.visible}
            content={this.state.content}
            handleChange={this.handleChange}
            handleOk={this.handleAddOtherComment}
            handleCancel={this.handleCancel}
				  />
        </div>
      </div>
    )
  }
}

export default CommentList