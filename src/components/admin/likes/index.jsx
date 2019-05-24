import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, Divider, Modal, message } from 'antd'
import axios from '../../../utils/axios'
import { timestampToTime } from '../../../utils/utils'

class CommentsCol extends Component {
  state = {
    list: [],
    total: 0
  }

  componentDidMount() {
    this.fetchList()
  }
  fetchList = () => {
    axios.get('/likelist').then(res => {
      this.setState({
        list: res.data,
        total: res.count
      })
    })
  }
  getColumns = () => {
    return [
      {
        title: '喜欢文章',
        dataIndex: 'article',
        render: (text, record) => {
          return (
            <div className="action">
              {record.article && record.article.title}
            </div>
          )
        }
      },
      {
        title: '当前人气',
        render: (text, record) => {
          return record.article && record.article.likeNum
        }
      },
      {
        title: '喜欢时间',
        dataIndex: 'createdAt',
        render: (text, record) => {
          return record.article && timestampToTime(text, true)
        }
      },
      {
        title: '操作',
        render: (text, record) => {
          return record.article && (
            <div className="action">
              <Link to={`/article/${record.article._id}`}>查看</Link>
              <Divider type="vertical" />
              <span className="btn-delete" onClick={() => this.handleDelete(record.article._id)}>
                取消喜欢
              </span>
            </div>
          )
        }
      }
    ]
  }

  handleDelete = (articleId) => {
    Modal.confirm({
      title: '你将要取消对该文章的喜欢',
      onOk: () => {
        axios.post('/article/like', {articleId,isLike: true}).then(res => {
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

export default CommentsCol
