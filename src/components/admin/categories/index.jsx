import React, { Component } from 'react'
import { Input, Tooltip, Icon, Tag, message } from 'antd'
import axios from '../../../utils/axios'

class CategoriesCol extends Component {
  state = {
    list: [],
    inputVisible: false,
    inputValue: '',
    initialList: [
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
        list: data.map(item => item.name)
      })
    })
  }

  handleClose = removedTag => {
    const list = this.state.list.filter(t => t !== removedTag)
    axios.delete('/delCategories/' + removedTag).then(res => {
      if(res.status === 200) {
        message.success(res.message)
        this.setState({ list })
      }
    })
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  }

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value })
  }

  handleInputConfirm = () => {
    let { inputValue, list } = this.state

    if (inputValue && !list.includes(inputValue) && !list.includes(inputValue)) {
      list = [...list, inputValue ]
      axios.put('/addCategories',{ name: inputValue }).then(res => {
        if(res.status === 200) {
          message.success(res.message)
          this.setState({
            list,
            inputVisible: false,
            inputValue: ''
          })
        }
      })
    } else {
      this.setState({
        list,
        inputVisible: false,
        inputValue: ''
      })
    }
    
  }

  saveInputRef = input => (this.input = input)

  render() {
    const { list, inputVisible, inputValue, initialList} = this.state
    return (
      <React.Fragment>
        {
          initialList.map((item, i) => (
            <Tag key={item.linkname} color="#1890ff">
              {item.name}
            </Tag>
          ))
        }


        {list.map((item, index) => {
          const isLongTag = item.length > 20
          const tagElem = (
            <Tag key={item} closable afterClose={() => this.handleClose(item)} color="#1890ff">
              {isLongTag ? `${item.slice(0, 20)}...` : item}
            </Tag>
          )
          return isLongTag ? (
            <Tooltip title={item} key={item}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          )
        })}

        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}

        {!inputVisible && (
          <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </React.Fragment>
    )
  }
}

export default CategoriesCol
