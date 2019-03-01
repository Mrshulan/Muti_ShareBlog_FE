import React, { Component } from 'react'
import { Icon, Avatar, message, Button } from 'antd';

import './index.less'
import logo from '../../assets/logo.jpg'
import https from '../../utils/https';
import urls from '../../utils/urls';
import LoadingCom from '../loading/loading';
import { getQueryStringByName, timestampToTime } from '../../utils/utils';

import dataDetail from '../../utils/data/articleDetail'
import ArticleComment from '../comments';

class Articles extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      isLoading: false,
      title: '是方法',
      content: '大师法',
      author: '树懒',
      categories: ['前端', '后台'],
      createAt: '1111',
      commentList: []
    }
  }

  componentDidMount() {
    let article_id = getQueryStringByName('article_id');
    this.handleSearch(article_id)
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  refreshArticle = () => {
    let article_id = getQueryStringByName('article_id')
    this.handleSearch(article_id)
  }

  handleSearch = (article_id) => {
    this.setState({
      isLoading: true
    })

    // 异步请求之后
    this.setState({
      articleDetail: dataDetail.data,
      isLoading: false,
    })

    // let keyword = dataDetail.data.keyword.join(',')
    // let description = dataDetail.data.desc
    let title = dataDetail.data.title

    // 修饰SEO
    document.title = title
    // document.getElementById('keywords').setAttribute('content', keyword);
		// document.getElementById('description').setAttribute('content', description);
  }

  handleAddComment = () => {
    if(!this.state.articleDetail._id) {
      message.error('信息错误', 1)
      return
    }
    if(!this.state.content) {
      message.warning('内容不能为空', 1)
      return
    }

    let user_id = ''
    if(window.sessionStorage.userInfo) {
      let userInfo = JSON.parse(window.sessionStorage.userInfo)
      user_id = userInfo._id
    } else {
      message.warning('登录才能发表哦', 1)
      return
    }

    this.setState({
      isSubmitLoading: true
    })

    // 一些异步操作之后
    message.success('发表成功', 1);
    this.setState({
      isSubmitLoading: false,
      content: '',
    });
    let article_id = getQueryStringByName('article_id');
    this.handleSearch(article_id);
    
  }

  likeArticle = () => {
    if (!this.state.articleDetail._id) {
			message.error('信息错误', 1);
			return;
		}
		let user_id = '';
		if (window.sessionStorage.userInfo) {
			let userInfo = JSON.parse(window.sessionStorage.userInfo);
			user_id = userInfo._id;
		} else {
			message.warning('登录才能发表！', 1);
			return;
		}
		this.setState({
			isLoading: true,
    });

    // 一些异步操作之后
    let articleDetail = this.state.articleDetail
    ++articleDetail.meta.likes
    this.setState({
      isLoadin: false,
      articleDetail,
    })
    message.success("喜欢成功", 1)
  }

  render() {
    const list = this.state.categories.map((v) => (
			<span key={v} className="tag">
				{v}
			</span>
		));

    return (
      <div className="article">
        <div className="header">
          <div className="title">{this.state.title}</div>
          <div className="author">
            <a href="/" className="avatar">
              <Avatar className="auth-logo" src={logo} size={50} icon="user" />
            </a>
            <div className="info">
              <span className="name">
                <a href="/">{this.state.author}</a>
              </span>
              <div props-data-classes="user-follow-button-header" data-author-follow-button="" />
              <div className="meta">
                <span className="publish-time">
                  {this.state.createAt
										? timestampToTime(this.state.createAt, true) :
                    ''
                  }
                </span>
                <span className="wordage">字数 {this.state.content.length}</span>
								<span className="comments-count">评论 {this.state.commentList.length}</span>
              </div>
            </div>
            <div className="tags " title="标签">
							<Icon type="tags" theme="outlined" />
							{list}
						</div>
						<span className="clearfix" />
          </div>
        </div>

        {this.state.isLoading ? <LoadingCom /> : ''}

        <div className="content">
          {this.state.content}
        </div>

        <div className="heart">
					<Button
						type="danger"
						size="large"
						icon="heart"
						loading={this.state.isLoading}
						// onClick={this.likeArticle}
					>
						给 ta 点鼓励
					</Button>
				</div>
        <ArticleComment></ArticleComment>
      </div>
    )
  }
}

export default Articles