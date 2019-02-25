import React, { Component } from 'react'
import { Icon } from 'antd';
// import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import LoadingCom from '../../components/loading/loading'
import LoadedCom from '../../components/loadend/loaded'

import './index.less'
import https from '../../utils/https'
import urls from '../../utils/urls'
import dataList from '../../utils/data/articlesList'
import {
	getScrollTop,
	getDocumentHeight,
	getWindowHeight,
	getQueryStringByName,
	timestampToTime,
} from '../../utils/utils';


class Articles extends Component {
  constructor() {
    super(...arguments)

    this.state = {
      isArticlesLoaded: false,
      keyword: '',
      likes: '',
      state: 1,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tag_id: getQueryStringByName('tag_id'),
			tag_name: decodeURI(getQueryStringByName('tag_name')),
			category_id: getQueryStringByName('category_id'),
      articlesList: [
        {
          _id: 'default',
          img_url:'https://upload-images.jianshu.io/upload_images/12890819-c54e7b7930922c40.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
          title: 'default',
          desc: 'default_desc',
          meta: {
            views: 0,
            comments: 0,
            likes: 0
          },
          create_time: '2019年'
        },      
      ],
    }
  }

  componentDidMount() {
    this.setState({
      isArticlesLoaded: true
    })
    this.handleSearch()
  }

  handleSearch = () => {
    this.setState({
      isArticlesLoaded: false,
    })

    // https
    //   .get(
    //     urls.getArticleList,
    //     {
    //       params: {
    //         keyword: this.state.keyword,
    //         likes: this.state.likes,
    //         state: this.state.state,
    //         tag_id: this.state.tag_id,
    //         category_id: this.state.category_id,
    //         pageNum: this.state.pageNum,
    //         pageSize: this.state.pageSize,
    //       }
    //     },
    //     { withCredentials: true } 
    //   )
    //   .then(res => {
        let num = this.state.pageNum
    //     if(res.status === 200 && res.data.code === 0) {
          this.setState(preState => ({
            articlesList: [...preState.articlesList,...dataList.data.list],
            total: dataList.data.count,
            pageNum: ++num,           
          }))

          // if(this.state.total === this.state.articlesList.length) {
            this.setState({
              isArticlesLoaded: true
            })
          // }
      //   }
      // })
      // .catch(err => {
			// 	console.error(err);
			// })
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
          <a className="wrap-img" href="/" target="_blank">
						<img className="img-blur-done" data-src={item.img_url} src={item.img_url} alt="120" />
					</a>
          <div className="content">
            <a href={`/articleDetail?article_id=${item._id}`} target="_blank" className='title'>{item.title}</a>
            <p className="abstract">{item.desc}</p>
            <div className="meta">
              <a target="_blank" href={`/articleDetail?article_id=${item._id}`}>
								<Icon type="eye" theme="outlined" /> {item.meta.views}
							</a>{' '}
							<a target="_blank" href={`/articleDetail?article_id=${item._id}`}>
								<Icon type="message" theme="outlined" /> {item.meta.comments}
							</a>{' '}
							<a target="_blank" href={`/articleDetail?article_id=${item._id}`}>
								<Icon type="heart" theme="outlined" /> {item.meta.likes}
							</a>
              <span className="time">{item.create_time}</span>
            </div>
          </div>
        </li>
      </CSSTransition>
    ))

    return (
      <div className="left">
        <ul className="note-list">
          {list}
        </ul>
        {this.state.isArticlesLoaded ? <LoadedCom /> : <LoadingCom />}
      </div>
    )
  }
}

export default Articles