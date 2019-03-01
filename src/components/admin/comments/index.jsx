import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, Divider, Tag, Modal, message } from 'antd'

class CommentsCol extends Component {
  state = {
    list: [],
    pagination: {},
    total: 0
  }

  getColumns = () => {
    return [
      {
        title: '文章',
        dataIndex: 'article'
      },
      {
        title: '评论内容',
        dataIndex: 'commentContent',
      },
      {
        title: '发布时间',
        dataIndex: 'createdAt'
      },
      {
        title: '操作',
        render: (text, record) => {
          return (
            <div className="action">
              <Link to={`/article/${record.id}`}>查看</Link>
              <Divider type="vertical" />
              <span className="btn-delete" onClick={() => this.handleDelete(record.id, record.title)}>
                删除
              </span>
            </div>
          )
        }
      }
    ]
  }

  handleDelete = (commendId, content) => {
    Modal.confirm({
      title: '您确认删除该评论?，此操作不可恢复！',
      content: `评论 ${content} `,
    })
  }
  render() {
    const { list,pagination } = this.state

    return (
      <div className="manager">
        <Table
          rowKey="id"
          bordered
          columns={this.getColumns()}
          dataSource={list}
          pagination={pagination}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default CommentsCol
