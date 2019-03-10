import React, { Component } from 'react'
import { Icon, Avatar, message, Button } from 'antd';

import './index.less'
import logo from '../../../assets/logo.jpg'
import LoadingCom from '../load/loading';
import { translateMarkdown, timestampToTime } from '../../../utils/utils';
import axios from '../../../utils/axios'
import ArticleComments from '../comments';

class ArticleDetail extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      isArticleLoaded: false,
      likeStatus: false,
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
      const { article, commentsList } = res
      const content = translateMarkdown(article.content)
      const { title, author,created, categories, likeNum } = article
      this.setState({
        isArticleLoaded: true,
        title,
        author: author.username,
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
      articleId: this.props.match.params.id
    }).then(res => {
       if(res.status === 200) {
         message.success(res.message)
       }
       this.setState({
        likeStatus: true,
        likesCount: this.state.likesCount + 1
       })
    })
  } 

  addCommentsList = item => {
    this.setState({
      commentsList: [item, ...this.state.commentsList]
    })
  }

  render() {
    const { isArticleLoaded, title, content ,author, categories, createdAt, commentsList, likeStatus, likesCount} = this.state
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
                  发表于: {timestampToTime(createdAt, true)}
                </span>
                <span className="wordage">字数 {content.length}</span>
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
            disabled={likeStatus}
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