import React, { Component } from 'react'
import { Table, Button, Modal, message } from 'antd'



class UsersCol extends Component {
  state = {
    list: [],
    pagination: {}
  }

  getColumns = () => {
    return [
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '文章数',
        dataIndex: 'articles',      
      },
      {
        title: '评论数',
        dataIndex: 'comments',
        // render: text => getCommentsCount(text),
        // sorter: (a, b) => getCommentsCount(a.comments) - getCommentsCount(b.comments)
      },
      {
        title: '操作',
        render: (text, record) => <Button type="danger" onClick={() => this.handleDelete(record.id, record.username)}>删除</Button>
      }
    ]
  }

  handleDelete = (userId, username) => {
    Modal.confirm({
      title: '您确认删除该用户?，此操作不可恢复！',
      content: `用户： ${username} `,
      onOk: () => {
        // axios.delete('/user/delete', { params: { userId } }).then(res => {
        //   if (res.code === 200) {
        //     this.fetchList(this.state.pagination)
        //     message.success(res.message)
        //   }
        // })
      }
    })
  }
  render() {
    const { list, pagination } = this.state

    return (
      <Table
        rowKey="id"
        bordered
        columns={this.getColumns()}
        dataSource={list}
        pagination={pagination}
        onChange={this.handleChange}
      />
    )
  }
}

export default UsersCol