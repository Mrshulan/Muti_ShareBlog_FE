import React, { Component } from 'react'

import { Button, Input, Modal, BackTop } from 'antd'
import SelectCate from './categories'

import SimpleMDE from "simplemde"
import 'simplemde/dist/simplemde.min.css'

import './index.less'
import { translateMarkdown } from '../../../utils/utils'
import axios from '../../../utils/axios'

class Edit extends Component {
  state = {
    title: '',
    categoryList:  ["前端", "后台",'数据库', "产品", '运营'],
  }

  componentDidMount() {
    this.smde = new SimpleMDE({
      element: document.getElementById('editor'),
      autofocus: true,
      autosave: true,
      previewRender: translateMarkdown
    })
  }

  handleSubmit = () => {
    const categories = this.$categoryRef.getResult()
    let params = {
      title: this.state.title,
      categories,
      content: this.smde.value(),
    }

    axios.put('/article', params).then(res => {
      if(res.status === 200) {
        Modal.confirm({
          title: res.message
        })
      }
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { title, categoryList } = this.state
    return (
      <div className='edit'>
        <div className="editItem">
          <span className='label'>标题: </span>
          <Input 
            placeholder="请输入文章标题"
            className='titleIpt'
            name="title"
            value={title}
            onChange={this.handleChange}
          />
        </div>
        <SelectCate
          onRef={el => (this.$categoryRef = el)}
          categoryList={categoryList}
        />
        <textarea id="editor" placeholder='请输入正文...'></textarea>
        <Button onClick={this.handleSubmit} type="primary">
          创建
        </Button>
        <BackTop />
      </div>
    )
  }
}

export default Edit