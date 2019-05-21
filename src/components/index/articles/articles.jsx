import React, { Component } from 'react'
import { Icon, Tag, Divider, Pagination, Empty,} from 'antd';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import LoadingCom from '../load/loading'
import LoadedCom from '../load/loadend'
import './index.less'
import axios from '../../../utils/axios'
import { translateMarkdown, timestampToTime } from '../../../utils/utils'
const isPro = process.env.NODE_ENV === 'production'

const NoData = ({ keyword }) => (
  <React.Fragment>
    没有关于<span className="keyword">{keyword ? keyword : "技术"}</span>的文章！ 
    <br/>
    期待你的创作~
  </React.Fragment>
)

class Articles extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      keyword: '',
      isArticlesLoaded: false,
      articlesList: [],
      total: 5,
      page: 1
    }
  }

  componentDidMount() {
    let isHot = this.props.match.path === '/hot'
    this.fetchList({isHot, page: 1, categories: this.props.match.params.id})
  }

  componentDidUpdate(preProps) {
    if(preProps.match.params.id !== this.props.match.params.id) {
      this.fetchList({page: 1, categories: this.props.match.params.id})
    }
  }

  fetchList = ({ isHot, page, categories }) => {
    if(!isHot) {
      axios.get('/articlesList', { params: { page, pageSize: 5, categories: categories ? categories : ''} })
      .then(res => {
        this.setState({
          isArticlesLoaded: true,
          articlesList: res.artList || [], 
          total: res.total || 0
       })
      })  
    } else {
      axios.get('/hot', { params: { page, pageSize: 5 } })
      .then(res => {
        this.setState({
          isArticlesLoaded: true,
          articlesList: res.artList || [], 
          total: res.total || 0
       })
      }) 
    } 
  }

  handleSearch = () => {  
    this.setState({
      isArticlesLoaded: false,
    })
  }
  
  jumpTo = (id) => {
    this.props.history.push('/article/' + id)
  }

  handlePageChange = (page) => {
    this.setState({
      page: page
    })
    this.fetchList({page})
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  translateMarkdownToDesc = (content) => {
    let index = content.indexOf('<!--more-->')
    if(index > -1) {
      return translateMarkdown(content.slice(0, index + 1))
    } else {
      return translateMarkdown(content.slice(0, 100))
    }
  }

  render() {
    const { articlesList, total, isArticlesLoaded, page, keyword } = this.state
    const list = articlesList && articlesList.map((item) => (
      <CSSTransition
        in={isArticlesLoaded}
        key={item._id}
        classNames="article-item"
        timeout={500}
      >
        <li key={item._id} className='article-item have-img'>
          <a className="wrap-img" href={`/article/${item._id}`} >
						<img className="img-blur-done" data-src={item.author.avatar} src={(isPro ? 'http://mrshulan.xin' : 'http://127.0.0.1:6001') + item.author.avatar} alt="摘要图片" />
					</a>
          <div className="content">
            <Divider orientation="left" onClick={() => this.jumpTo(item._id)}> 
              <span className="title">{item.title}</span>
              <Icon type="folder" style={{ margin: '0px 7px' }} />
              {
                item.categories.map((v) => (
                  <Tag color={'#2db7f5'} key={v}>{v}</Tag>
                ))
              }
            </Divider>

            <div
              onClick={() => this.jumpTo(item._id)}
              className="article-detail description abstract"
              dangerouslySetInnerHTML={{ __html: this.translateMarkdownToDesc(item.content) }}
            />

            <div className="meta">
							<a href={`/article/${item._id}`}>
								<Icon type="like" theme="outlined" /> {item.likeNum}
							</a>&nbsp;
							<a href={`/article/${item._id}`}>
								<Icon type="message" theme="outlined" /> {item.commentNum}
							</a>&nbsp;
              <span className="time">{timestampToTime(item.created)}</span>
            </div>
          </div>
        </li>
      </CSSTransition>
    ))

    return (
      <div className="left" ref={(left) => { this.left = left}}>
        <ul className="article-list">
          <TransitionGroup>
            {list}
          </TransitionGroup>
        </ul>
        {
          articlesList.length > 0 ? (
            <div>
              {articlesList.length <= total && (
                <div style={{ textAlign: 'right' }}>
                  <Pagination current={page} pageSize={5} onChange={this.handlePageChange} total={total} />
                </div>
              )}
            </div>
          ) : (
            <div className="no-data">
              <Empty description={<NoData keyword={keyword} />} />
            </div>
          )
        }
        {isArticlesLoaded ? <LoadedCom /> : <LoadingCom />}
      </div>
    )
  }
}

export default Articles