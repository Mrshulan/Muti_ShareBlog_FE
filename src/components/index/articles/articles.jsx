import React, { Component, useState, useEffect, useCallback } from 'react'
import { Icon, Tag, Divider, Pagination, Empty } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import LoadingCom from '../load/loading'
import LoadedCom from '../load/loadend'
import './index.less'
import axios from '@/utils/axios'
import { translateMarkdown, timestampToTime } from '@/utils/utils'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as uiActions } from '@/redux/modules/ui'
const isPro = process.env.NODE_ENV === 'production'

const NoData = ({ keyword, categories, history, closeArticlesModal}) => (
  <React.Fragment>
    没有关于<span className="keyword">{keyword ? keyword : categories ? categories : "该技术"}</span>的文章！ 
    <br/>
    期待你的创作~
  </React.Fragment>
)

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(uiActions, dispatch)
  }
}

// 使用function component 就要忘记class component生命周期一些老毛病,
const Articles = ({ match, history, keyword, closeArticlesModal}) => {
  const [ data, setData ] = useState({
    isArticlesLoaded: false,
    articlesList: [],
    total: 5
  })
  const [ page, setPage ] = useState(1)
  const { isArticlesLoaded, articlesList, total }  = data

  // 依赖条件只要发生了一个变化就会生成新的cb 从而触发 useEffect to get fetchData （真香）
  // 免去在 componentDidMount comopnentDidUpdate 来回转转 state状态顾虑
  const fetchList = useCallback(({ isHot, categories, keyword }) => {
    if(!isHot) {
      let params = {
        page: page,
        pageSize: 5,
      }
      // 文章查询条件判断
      if(categories) {
        params = { ...params, categories }
      } else if(keyword) {
        params = { ...params, keyword }
      }

      axios.get('/articlesList', { params })
      .then(res => {
        setData({
          isArticlesLoaded: true,
          articlesList: res.artList || [],
          total: res.total || 0
        })
      })
    } else {
      axios.get('/hot', { params: { page: page, pageSize: 5 } })
      .then(res => {
        setData({
          isArticlesLoaded: true,
          articlesList: res.artList || [],
          total: res.total || 0
        })
      }) 
    } 
  }, [ page, keyword, match ])

  useEffect(() => {
    fetchList({
      isHot: match && match.path === '/hot',
      categories: match && match.params.id,
      keyword
    })
  }, [fetchList])

  const handlePageChange = (page) => {
    setPage(page)
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  
  const categoriesChange = (item) => {
    switch (item) {
      case "frontend" : 
        return '前端'
      case "backend" : 
        return '后端'
      case "sql" : 
        return '数据库'
      case "Algorithm" : 
        return '数据结构与算法'
      default: 
        return item
    }
  }

  const jumpTo = (id) => {
    history.push('/article/' + id)
    closeArticlesModal()
  }

  const translateMarkdownToDesc = (content) => {
    let index = content.indexOf('<!--more-->')
    if(index > -1) {
      return translateMarkdown(content.slice(0, index + 1))
    } else {
      return translateMarkdown(content.slice(0, 100))
    }
  }

  const list = articlesList && articlesList.map((item) => {
    return (
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
            <Divider orientation="left" onClick={() => jumpTo(item._id)}> 
              <span className="title">{item.title}</span>
              {item.isTop && <Tag color={'#00B38A'} style={{ margin: '0px 7px' }} >顶</Tag>}
              <Icon type="folder" style={{ margin: '0px 7px' }} />
              {
                item.categories.map((v) => {
                  return (
                    <Tag color={'#2db7f5'} key={v}>{categoriesChange(v)}</Tag>
                  )
                })
              }
            </Divider>

            <div
              onClick={() => jumpTo(item._id)}
              className="article-detail description abstract"
              dangerouslySetInnerHTML={{ __html: translateMarkdownToDesc(item.content) }}
            />

            <div className="meta">
              <Link to={`/article/${item._id}`}>
                <Icon type="like" theme="outlined" /> {item.likeNum}
              </Link>&nbsp;
              <Link to={`/article/${item._id}`}>
                <Icon type="message" theme="outlined" /> {item.commentNum}
              </Link>&nbsp;
              <span className="time">{timestampToTime(item.created)}</span>
            </div>
          </div>
        </li>
      </CSSTransition>
    )
  })

  return (
    <div className="left" >
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
                <Pagination current={page} pageSize={5} onChange={handlePageChange} total={total} />
              </div>
            )}
          </div>
        ) : (
          <div className="no-data">
            <Empty description={<NoData keyword={keyword} categories={match && categoriesChange(match.params.id)}/>} />
          </div>
        )
      }
      {isArticlesLoaded ? <LoadedCom /> : <LoadingCom />}
    </div>
  )
}

// class Articles extends Component {
//   constructor() {
//     super(...arguments)
//     this.state = {
//       isArticlesLoaded: false,
//       articlesList: [],
//       total: 5,
//       page: 1
//     }
//   }

//   componentDidMount() {
//     if(this.props.match) {
//       let isHot = this.props.match.path === '/hot'
//       if(!isHot) {
//         this.fetchList({categories: this.props.match.params.id })
//       } else {
//         this.fetchList({isHot})
//       }
//       // 如果不是走路由过来的而是走弹出层
//     } else if (this.props.keyword) {
//       this.fetchList({ keyword: this.props.keyword })
//     }
//   }

//   componentDidUpdate(preProps, preState) {
//     // categories切换触发
//     if((preProps.match && this.props.match) && preProps.match.params.id !== this.props.match.params.id) {
//       this.fetchList({categories: this.props.match.params.id})
//     // 搜索关键字触发
//     } else if (preProps.keyword !== this.props.keyword) {
//       this.fetchList({keyword: this.props.keyword})
//     // page换页切换
//     } else if (preState.page !== this.state.page) {
//       // 代码没有被复用
//       if(this.props.match) {
//         let isHot = this.props.match.path === '/hot'
//         if(!isHot) {
//           this.fetchList({categories: this.props.match.params.id })
//         } else {
//           this.fetchList({isHot})
//         }
//         // 如果不是走路由过来的而是走弹出层
//       } else if (this.props.keyword) {
//         this.fetchList({ keyword: this.props.keyword })
//       }
//     }
//   }

//   fetchList = ({ isHot, categories, keyword }) => {
//     if(!isHot) {
//       let params = {
//         page: this.state.page,
//         pageSize: 5,
//       }

//       // 文章查询条件判断
//       if(categories) {
//         params = { ...params, categories }
//       } else if(keyword) {
//         params = { ...params, keyword }
//       }

//       axios.get('/articlesList', { params })
//       .then(res => {
//         this.setState({
//           isArticlesLoaded: true,
//           articlesList: res.artList || [], 
//           total: res.total || 0
//        })
//       })
//     } else {
//       axios.get('/hot', { params: { page: this.state.page, pageSize: 5 } })
//       .then(res => {
//         this.setState({
//           isArticlesLoaded: true,
//           articlesList: res.artList || [], 
//           total: res.total || 0
//        })
//       }) 
//     } 
//   }
  
//   jumpTo = (id) => {
//     this.props.history.push('/article/' + id)
//   }

//   handlePageChange = (page) => {
//     this.setState({
//       page: page
//     })
//     document.body.scrollTop = document.documentElement.scrollTop = 0;
//   }

//   categoriesChange = (item) => {
//     switch (item) {
//       case "frontend" : 
//         return '前端'
//       case "backend" : 
//         return '后端'
//       case "sql" : 
//         return '数据库'
//       case "Algorithm" : 
//         return '数据结构与算法'
//       default: 
//         return item
//     }
//   }

//   translateMarkdownToDesc = (content) => {
//     let index = content.indexOf('<!--more-->')
//     if(index > -1) {
//       return translateMarkdown(content.slice(0, index + 1))
//     } else {
//       return translateMarkdown(content.slice(0, 100))
//     }
//   }

//   render() {
//     const { articlesList, total, isArticlesLoaded, page } = this.state
//     const { keyword, match } = this.props
//     const list = articlesList && articlesList.map((item) => {
//       return (
//         <CSSTransition
//           in={isArticlesLoaded}
//           key={item._id}
//           classNames="article-item"
//           timeout={500}
//         >
//           <li key={item._id} className='article-item have-img'>
//             <a className="wrap-img" href={`/article/${item._id}`} >
//               <img className="img-blur-done" data-src={item.author.avatar} src={(isPro ? 'http://mrshulan.xin' : 'http://127.0.0.1:6001') + item.author.avatar} alt="摘要图片" />
//             </a>
//             <div className="content">
//               <Divider orientation="left" onClick={() => this.jumpTo(item._id)}> 
//                 <span className="title">{item.title}</span>
//                 {item.isTop && <Tag color={'#00B38A'} style={{ margin: '0px 7px' }} >顶</Tag>}
//                 <Icon type="folder" style={{ margin: '0px 7px' }} />
//                 {
//                   item.categories.map((v) => {
//                     return (
//                       <Tag color={'#2db7f5'} key={v}>{this.categoriesChange(v)}</Tag>
//                     )
//                   })
//                 }
//               </Divider>

//               <div
//                 onClick={() => this.jumpTo(item._id)}
//                 className="article-detail description abstract"
//                 dangerouslySetInnerHTML={{ __html: this.translateMarkdownToDesc(item.content) }}
//               />

//               <div className="meta">
//                 <Link to={`/article/${item._id}`}>
//                   <Icon type="like" theme="outlined" /> {item.likeNum}
//                 </Link>&nbsp;
//                 <Link to={`/article/${item._id}`}>
//                   <Icon type="message" theme="outlined" /> {item.commentNum}
//                 </Link>&nbsp;
//                 <span className="time">{timestampToTime(item.created)}</span>
//               </div>
//             </div>
//           </li>
//         </CSSTransition>
//       )
//     })

//     return (
//       <div className="left" ref={(left) => { this.left = left}}>
//         <ul className="article-list">
//           <TransitionGroup>
//             {list}
//           </TransitionGroup>
//         </ul>
//         {
//           articlesList.length > 0 ? (
//             <div>
//               {articlesList.length <= total && (
//                 <div style={{ textAlign: 'right' }}>
//                   <Pagination current={page} pageSize={5} onChange={this.handlePageChange} total={total} />
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="no-data">
//               <Empty description={<NoData keyword={keyword} categories={match && this.categoriesChange(match.params.id)}/>} />
//             </div>
//           )
//         }
//         {isArticlesLoaded ? <LoadedCom /> : <LoadingCom />}
//       </div>
//     )
//   }
// }

export default connect(null, mapDispatchToProps)(withRouter(Articles))
