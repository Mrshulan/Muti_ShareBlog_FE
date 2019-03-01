import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, Divider, Tag, Modal, message } from 'antd'


import './index.less'

class ArticleCol extends Component {

  state = {
    list: [],
    pagination: {},
    total: 0
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
          return text.map(d => (
            <Tag color={'#2db7f5'} key={d.name}>
              {d.name}
            </Tag>
          ))
        }
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

  handleDelete = (articleId, title) => {
    Modal.confirm({
      title: '您确认删除该文章?，此操作不可恢复！',
      content: `文章： ${title} `,
      onOk: () => {
        // delete('/article/delete', { params: { articleId } }).then(res => {
        //   if (res.code === 200) {
        //     this.fetchList(this.state.pagination)
        //     message.success(res.message)
        //   }
        // })
      }
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

export default ArticleCol
