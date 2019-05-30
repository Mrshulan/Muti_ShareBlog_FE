import React, { Component } from 'react'
import { Table, Button, Modal, message } from 'antd'
import axios from '@/utils/axios'


class UsersCol extends Component {
  state = {
    list: [],
    total: 0,
  }

  componentDidMount() {
    this.fetchList()
  }
  fetchList = () => {
    axios.get('/user/users').then(res => {
      if(res.status === 200) {
        this.setState({
          total: res.count,
          list: res.data
        })
      } else {
        message.error(res.message)
      }
    })
  }
  getColumns = () => {
    return [
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '文章数',
        dataIndex: 'articleNum',      
      },
      {
        title: '评论数',
        dataIndex: 'commentNum',
      },
      {
        title: '操作',
        render: (text, record) => <Button type="danger" onClick={() => this.handleDelete(record._id, record.username)}>删除</Button>
      }
    ]
  }

  handleDelete = (userId, username) => {
    Modal.confirm({
      title: '您确认删除该用户? 此操作不可恢复！',
      content: `用户： ${username} `,
      onOk: () => {
        axios.delete('/user/' + userId).then(res => {
          if (res.status === 200) {
            this.fetchList()
            message.success(res.message)
          } else {
            message.success(res.message)
          }
        })
      }
    })
  }
  render() {
    const { list } = this.state

    return (
      <Table
        rowKey="_id"
        bordered
        columns={this.getColumns()}
        dataSource={list}
      />
    )
  }
}

export default UsersCol