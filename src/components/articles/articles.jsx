import React, { Component } from 'react'
import { Icon, Tag, Divider, Pagination, Empty} from 'antd';
// import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import LoadingCom from '../../components/loading/loading'
import LoadedCom from '../../components/loadend/loaded'

import './index.less'
import https from '../../utils/https'
import urls from '../../utils/urls'
import {
	getScrollTop,
	getDocumentHeight,
	getWindowHeight,
	getQueryStringByName,
	timestampToTime,
} from '../../utils/utils';


const NoDataDesc = ({ keyword }) => (
  <div>
    没有关于<span className="keyword">{keyword ? keyword : "技术"}</span>的文章！ 
    <br/>
    期待你的创作~
  </div>
)

class Articles extends Component {
  constructor() {
    super(...arguments)

    this.state = {
      keyword: '',
      isArticlesLoaded: false,
      page: 1,
      articlesList: [
        {
          _id: 'default',
          img_url:'https://upload-images.jianshu.io/upload_images/12890819-c54e7b7930922c40.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
          title: 'default',
          categories: ['前端'],
          desc: 'default_desc',
          meta: {
            views: 0,
            comments: 0,
            likes: 0
          },
          create_time: '2019年'
        },      
      ]
    }
    this.total = 30
  }

  componentDidMount() {
    this.setState({ 
      isArticlesLoaded: true
    })
    this.handleSearch()
  }

  handleSearch = () => {
    
    // this.setState({
    //   isArticlesLoaded: false,
    // })
  }
  
  jumpTo = (id) => {
    this.props.history.push('/article/' + id)
  }

  handlePageChange = (page) => {
    console.log(page)
  }

  render() {
    const list = this.state.articlesList.map((item, i) => (
      <CSSTransition
        in={this.state.isArticlesLoaded}
        key={item._id}
        classNames="article-item"
        timeout={500}
      >
        <li key={item._id} className='article-item have-img'>
          <a className="wrap-img" href={`/article/${item._id}`} >
						<img className="img-blur-done" data-src={item.img_url} src={item.img_url} alt="120" />
					</a>
          <div className="content">
            <Divider orientation="left" onClick={() => this.jumpTo(item.id)}> 
              <span className="title">{item.title}</span>
              <Icon type="folder" style={{ margin: '0px 7px' }} />
              {
                item.categories.map((v) => (
                  <Tag color={'#2db7f5'} key={v}>{v}</Tag>
                ))
              }
            </Divider>
            <p className="abstract" onClick={() => this.jumpTo(item.id)} >{item.desc}</p>
            <div className="meta">
							<a href={`/article/${item._id}`}>
								<Icon type="message" theme="outlined" /> {item.meta.comments}
							</a>&nbsp;
              <span className="time">{item.create_time}</span>
            </div>
          </div>
        </li>
      </CSSTransition>
    ))

    return (
      <div className="left">
        <ul className="article-list">
          {list}
        </ul>
        {
          list.length > 0 ? (
            <div>
              {list.length < this.total && (
                <div style={{ textAlign: 'right' }}>
                  <Pagination current={parseInt(this.state.page) || 1} defaultCurrent={1} onChange={this.handlePageChange} total={this.total} />
                </div>
              )}
            </div>
          ) : (
            <div className="no-data">
              <Empty description={<NoDataDesc keyword={this.state.keyword} />} />
            </div>
          )
        }
        {this.state.isArticlesLoaded ? <LoadedCom /> : <LoadingCom />}
      </div>
    )
  }
}

export default Articles