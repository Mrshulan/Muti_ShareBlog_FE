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
    axios.get('/user/comments').then(res => {
      this.setState({
        list: res.data,
        total: res.count
      })
    })
  }
  getColumns = () => {
    return [
      {
        title: '评论文章',
        dataIndex: 'article',
        render: (text, record) => {
          return (
            <div className="action">
              {record.article.title}
            </div>
          )
        }
      },
      {
        title: '评论内容',
        dataIndex: 'content',
      },
      {
        title: '发布时间',
        dataIndex: 'created',
        render: (text) => {
          return timestampToTime(text, true)
        }
      },
      {
        title: '操作',
        render: (text, record) => {
          return (
            <div className="action">
              <Link to={`/article/${record.article._id}`}>查看</Link>
              <Divider type="vertical" />
              <span className="btn-delete" onClick={() => this.handleDelete(record._id, record.content)}>
                删除
              </span>
            </div>
          )
        }
      }
    ]
  }

  handleDelete = (commentId, content) => {
    Modal.confirm({
      title: '您确认删除该评论?此操作不可恢复！',
      content: `评论: ${content} `,
      onOk: () => {
        axios.delete('/comment/'+ commentId).then(res => {
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
