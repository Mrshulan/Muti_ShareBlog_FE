import React, { Component } from 'react'
import { Tag } from 'antd'

const CheckableTag = Tag.CheckableTag

class SelectCates extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectList: [this.props.categoryList[0].linkname]
    }
  }

  componentDidMount() {
    this.props.onRef && this.props.onRef(this)
  }

  handleSelect = (value, checked) => {
    const { selectList } = this.state
    const newSelectList = checked ? [...selectList, value] : selectList.filter(t => t !== value)
    this.setState({ selectList: newSelectList })
  }

  getResult = () => {
    return [...this.state.selectList]
  }

  render() {
    const { selectList } = this.state

    return (
      <div className="editItem">
        <span className="label">分类:</span>
        {this.props.categoryList.map((item) => (
            <CheckableTag
              key={item.linkname}
              checked={selectList.includes(item.linkname)}
              onChange={checked => this.handleSelect(item.linkname, checked)}
            >
              {item.name}
            </CheckableTag>
          ))
        }
      </div>
    )
  }
}


export default SelectCates