import React, { Component } from 'react'
import { Icon } from 'antd';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './index.less'

class Articles extends Component {
  constructor() {
    super(...arguments)

    this.state = {
      keyword: '',
      articlesList: [
        {
          _id: 'asgff',
          img_url:'https://upload-images.jianshu.io/upload_images/12890819-c54e7b7930922c40.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
          title: 'test',
          desc: 'test_desc',
          meta: {
            views: 44,
            comments: 444,
            likes: 13
          },
          create_time: '2019年'
        },
      ],
    }
  }


  render() {
    const list = this.state.articlesList.map((item, i) => (
      <ReactCSSTransitionGroup
        key={item._id}
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={1000}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
      >
        <li key={item._id} className='have-img'>
          <a className="wrap-img" href="/" target="_blank">
						<img className="img-blur-done" data-src={item.img_url} src={item.img_url} alt="120" />
					</a>
          <div className="content">
            <a href={`/articleDetail/ + ${item._id}`} target="_blank" className='title'>{item.title}</a>
            <p className="abstract">{item.desc}</p>
            <div className="meta">
              <a target="_blank" to={`/articleDetail?article_id=${item._id}`}>
								<Icon type="eye" theme="outlined" /> {item.meta.views}
							</a>{' '}
							<a target="_blank" to={`/articleDetail?article_id=${item._id}`}>
								<Icon type="message" theme="outlined" /> {item.meta.comments}
							</a>{' '}
							<a target="_blank" to={`/articleDetail?article_id=${item._id}`}>
								<Icon type="heart" theme="outlined" /> {item.meta.likes}
							</a>
              <span className="time">{item.create_time}</span>
            </div>
          </div>
        </li>
      </ReactCSSTransitionGroup>
    ))

    return (
      <div className="left">
        <ul className="note-list">{list}</ul>
      </div>
    )
  }
}

export default Articles