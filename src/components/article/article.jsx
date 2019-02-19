import React, { Component } from 'react'

import { Icon, Avatar, message, Button, Comment } from 'antd';


import CommentList from '../comments/list';

import './index.less'
import logo from '../../assets/logo.jpg'

class Articles extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      list: [
        {
          _id: 'sfa'
        }
      ]
    }
  }

  render() {
    // const list = this.state.articleDetail.tags.map((item, i) => (
		// 	<span key={item.id} className="tag">
		// 		{item.name}
		// 	</span>
		// ));

    return (
      <div className="article">
        <div className="header">
          <div className="title">title</div>
          <div className="author">
            <a href="/" className="avatar">
              <Avatar className="auth-logo" src={logo} size={50} icon="user" />
            </a>
            <div className="info">
              <span className="name">
                <a href="/">author</a>
              </span>
              <div props-data-classes="user-follow-button-header" data-author-follow-button="" />
              <div className="meta">
                <span className="publish-time">
                  19nian
                </span>
                <span className="wordage">字数 {1}</span>
								<span className="views-count">阅读 {1}</span>
								<span className="comments-count">评论 {1}</span>
								<span className="likes-count">喜欢 {1}</span>
              </div>
            </div>
            <div className="tags " title="标签">
							<Icon type="tags" theme="outlined" />
							{"list"}
						</div>
						<span className="clearfix" />
          </div>
        </div>

        <div className="content">
          content
        </div>

        <div className="heart">
					<Button
						type="danger"
						size="large"
						icon="heart"
						// loading={this.state.isLoading}
						// onClick={this.likeArticle}
					>
						给 ta 点鼓励
					</Button>

          <Comment />
          <CommentList 
            list={this.state.list}
          />
				</div>
      </div>
    )
  }
}

export default Articles