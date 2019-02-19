import React, { Component } from 'react';
import { message, Avatar, Spin } from 'antd';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ChildrenComment from './childrenComment.jsx';

import './index.less';

class CommentList extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      visible: false
    }
  }

  render() {
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
								<Avatar size="large" icon={"user"} />
							</a>
						</div>
						<div className="info">
							<a className="name">
								{"树懒"}
								{'(作者)'}
							</a>
							<div className="time">{2019}</div>
						</div>
					</div>
					<div className="comment-detail">{"content"}</div>
					<div className="item-comment">
						{/* <a className="like">
							<Avatar size="small" icon="like" /> 赞
						</a> */}
						<a onClick={() => this.showCommentModal(item)} className="message">
							<Avatar size="small" icon="message" /> 回复
						</a>
					</div>
					{/* {item.other_comments.map((e, index) => {
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
					})} */}
				</div>
      </ReactCSSTransitionGroup>
    ))

    return (
      <div className="comment-list">
        <div className="top-title">
          <span>{9}条评论</span>
          <Spin >{list}</Spin>
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