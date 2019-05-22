import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, Divider, Tag, Modal, message } from 'antd'
import axios from '../../../utils/axios'
import { timestampToTime } from '../../../utils/utils'

class ArticleCol extends Component {
  state = {
    list: [],
    total: 0
  }
  componentDidMount() {
    this.fetchList()
  }

  categoriesChange = (item) => {
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
  
  fetchList = () => {
    axios.get('/user/articles').then(res => {
      this.setState({
        list: res.data,
        total: res.count
      })
    })
  }

  getColumns = () => {
    return [
      {
        title: '标题',
        dataIndex: 'title'
      },
      {
        title: '分类',
        dataIndex: 'categories',
        render: (text, record) => {
          return text.map(v => (
            <Tag color={'#2db7f5'} key={v}>
              {this.categoriesChange(v)}
            </Tag>
          ))
        }
      },
      {
        title: '发布时间',
        dataIndex: 'created',
        render: (text) => {
          return timestampToTime(text, true)
        }
      },{
        title: '评论数',
        dataIndex: 'commentNum'
      },{
        title: '点赞数',
        dataIndex: 'likeNum'
      },{
        title: '操作',
        render: (text, record) => {
          return (
            <div className="action" key={record._id}>
              <Link to={`/article/${record._id}`}>查看</Link>
              <Divider type="vertical" />
              <span className="btn-delete" onClick={() => this.handleDelete(record._id, record.title)}>
                删除
              </span>
            </div>
          )
        }
      }
    ]
  }

  handleDelete = (articleId, title) => {
    Modal.confirm({
      title: '您确认删除该文章?此操作不可恢复!',
      content: `文章: ${title} `,
      onOk: () => {
        axios.delete('/article/'+ articleId).then(res => {
          if (res.status === 200) {
            message.success(res.message)
            this.fetchList()
          }
        })
      }
    })
  }
  render() {
    const { list } = this.state

    return (
      <div className="manager">
        <Table
          rowKey="_id"
          bordered
          columns={this.getColumns()}
          dataSource={list}
        />
      </div>
    )
  }
}

export default ArticleCol
