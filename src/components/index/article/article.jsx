import React, { Component } from 'react'
import { Icon, Avatar, message, Button } from 'antd';

import './index.less'
import LoadingCom from '../load/loading'
import { translateMarkdown, timestampToTime } from '@/utils/utils'
import axios from '@/utils/axios'
import ArticleComments from './comments'
const isPro = process.env.NODE_ENV === 'production'

class ArticleDetail extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      isArticleLoaded: false,
      isLike: false,
      title: '',
      content: '',
      author: '',
      likesCount: 0,
      categories: [],
      createdAt: '',
      commentsList: []
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.fetchData(id)
  }

  fetchData = (id) => {
    axios.get('/article/' + id).then(res => {
      const { article, commentsList, isLike } = res
      this.contentwords = this.wordCount(article.content)
      const content = translateMarkdown(article.content)
      const { title, author,created, categories, likeNum } = article

      this.setState({
        isArticleLoaded: true,
        isLike,
        title,
        author: author.username,
        authorAvatar: author.avatar,
        content,
        categories,
        likesCount: likeNum,
        createdAt: created,
        commentsList: commentsList,
      })
    }).catch(err => {
      this.props.history.push('/404')
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  likeArticle = () => {
    axios.post('/article/like', {
      articleId: this.props.match.params.id,
      isLike: this.state.isLike
    }).then(res => {
       if(res.status === 200) {
         message.success(res.message)
         if(res.message === '喜欢成功') {
            this.setState({
              isLike: true,
              likesCount: this.state.likesCount + 1
            })
          } else if(res.message === '放弃喜欢') {
            this.setState({
              isLike: false,
              likesCount: this.state.likesCount - 1
            })
         }
       }
       
    })
  } 

  // simplemde源码里的用来统计字数的
  wordCount(data) {
    const pattern = /[a-zA-Z0-9_\u0392-\u03c9\u0410-\u04F9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;
    const m = data.match(pattern);
    let count = 0;
    if (m === null) return count;
    for (let i = 0; i < m.length; i++) {
      if (m[i].charCodeAt(0) >= 0x4E00) {
        count += m[i].length;
      } else {
        count += 1;
      }
    }
    return count;
  }

  render() {
    const { isArticleLoaded, title, content ,author, authorAvatar, categories, createdAt, commentsList, isLike, likesCount} = this.state
    const list = categories.map((v) => (
			<span key={v} className="tag">
				{v}
			</span>
		));

    return (
      <div className="article">
        <div className="header">
          <div className="title">{title}</div>
          <div className="author">
            <a href="/" className="avatar">
              <Avatar 
                className="auth-logo"
                src={(isPro ? 'http://mrshulan.xin' : 'http://127.0.0.1:6001') + authorAvatar}
                size={50}
                icon="user" />
            </a>
            <div className="info">
              <span className="name">
                <a href="/">{author}</a>
              </span>
              <div props-data-classes="user-follow-button-header" data-author-follow-button="" />
              <div className="meta">
                <span className="publish-time">
                  发表于: {timestampToTime(createdAt, true)}
                </span>
                <span className="wordage">字数 {this.contentwords}</span>
								<span className="likes-count">点赞 {likesCount}</span>
								<span className="comments-count">评论 {commentsList.length}</span>
              </div>
            </div>
            <div className="tags " title="标签">
							<Icon type="tags" theme="outlined" />
							{list}
						</div>
						<span className="clearfix" />
          </div>
        </div>

        {isArticleLoaded ? '' : <LoadingCom /> }

        <div className="article-detail" dangerouslySetInnerHTML={{ __html: content }} />

        <div className="heart">
					<Button
						type="danger"
						size="large"
            icon="heart"
						onClick={this.likeArticle}
					>
						{isLike ? '取消喜欢' : '给 ta 点鼓励'}
					</Button>
				</div>

        <ArticleComments articleId={this.props.match.params.id} commentsList={commentsList} fetchData={this.fetchData} ></ArticleComments>
      </div>
    )
  }
}

export default ArticleDetail