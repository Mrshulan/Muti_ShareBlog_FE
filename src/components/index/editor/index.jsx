import React, { Component } from 'react'
import { Button, Input, Modal, BackTop, message } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as uiActions} from '@/redux/modules/ui'

import SelectCate from './categories'
import './index.less'
import { translateMarkdown } from '@/utils/utils'
import axios from '@/utils/axios'

import SimpleMDE from "simplemde"
import 'simplemde/dist/simplemde.min.css'


class Edit extends Component {
  state = {
    title: '',
    categoryList:  [
      {
        name: '前端',
        linkname: 'frontend'        
      },
      {
        name: '后台',
        linkname: 'backend'
      },
      {
        name: '数据库',
        linkname: 'sql',
      },
      {
        name: 'webpack',
        linkname: 'webpack'
      },
      {
        name: 'koa2',
        linkname: 'koa2'
      },
      {
        name: 'react',
        linkname: 'react'
      },
      {
        name: 'vue',
        linkname: 'vue'
      },
      {
        name: '数据结构与算法',
        linkname: 'Algorithm'
      }
    ]
  }

  componentDidMount() {
    axios.get('/categories', { params: {isUnique: true} }).then(data => {
      this.setState({
        categoryList: [...this.state.categoryList, ...data]
      })
    })
    this.smde = new SimpleMDE({
      element: document.getElementById('editor'),
      autofocus: true,
      autosave: {
        enabled: true,
        uniqueId: "MyEidtID",
        delay: 10000,
      },
      previewRender: translateMarkdown    
    })
  }

  componentWillUnmount() {
    this.props.editStatus()
  }

  handleSubmit = () => {
    const categories = this.$categoryRef.getResult()
    if(this.state.title && this.smde.value()) {
      let params = {
        title: this.state.title,
        categories,
        content: this.smde.value(),
      }

      axios.put('/article', params).then(res => {
        if(res.status === 200) {
          Modal.confirm({
            title: res.message,
            onOk: () => {
              this.props.history.push('/')
            }
          })
        }
      }) 
    } else {
      message.error('标题与内容不能为空')
    }
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
          立即分享
        </Button>
        <BackTop />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isEdit: state.ui.isEdit,
})

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(uiActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)