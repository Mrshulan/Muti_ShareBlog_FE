import React, { Component } from 'react'
import { Icon, Avatar, message, Button } from 'antd';

import './index.less'
import logo from '../../../assets/logo.jpg'
import LoadingCom from '../loading';
import { translateMarkdown, timestampToTime } from '../../../utils/utils';
import axios from '../../../utils/axios'
import ArticleComments from '../comments';

class ArticleDetail extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      isArticleLoaded: false,
      title: '',
      content: '',
      author: '',
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
      const { article, commentsList } = res
      const content = translateMarkdown(article.content)
      const { title, author,created, categories } = article
      this.setState({
        isArticleLoaded: true,
        title,
        author: author.username,
        content,
        categories,
        createdAt: created,
        commentsList: commentsList,
      })

      document.title = title
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
    message.success("喜欢成功")
    setTimeout(() => {
      message.error("该功能暂未开放", 1)
    }, 1000)
  } 

  addCommentsList = item => {
    this.setState({
      commentsList: [item, ...this.state.commentsList]
    })
  }

  render() {
    const { isArticleLoaded, title, content ,author, categories, createdAt, commentsList } = this.state
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
              <Avatar className="auth-logo" src={logo} size={50} icon="user" />
            </a>
            <div className="info">
              <span className="name">
                <a href="/">{author}</a>
              </span>
              <div props-data-classes="user-follow-button-header" data-author-follow-button="" />
              <div className="meta">
                <span className="publish-time">
                  {timestampToTime(createdAt, true)}
                </span>
                <span className="wordage">字数 {content.length}</span>
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

        {this.state.isArticleLoaded ? '' : <LoadingCom /> }

        <div className="article-detail" dangerouslySetInnerHTML={{ __html: content }} />

        <div className="heart">
					<Button
						type="danger"
						size="large"
						icon="heart"
						loading={!isArticleLoaded}
						onClick={this.likeArticle}
					>
						给 ta 点鼓励
					</Button>
				</div>

        <ArticleComments articleId={this.props.match.params.id} commentsList={commentsList} addCommentsList={this.addCommentsList} ></ArticleComments>
      </div>
    )
  }
}

export default ArticleDetail