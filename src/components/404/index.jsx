import React from 'react'
import { Link } from 'react-router-dom'


const NotFound = () => {
  return (
    <div className="nofound-wrapper">
      <i className="iconfont icon-back" style={{ color: 'green', marginRight: 6 }} />
      网页正在加紧开发中~ <br/>404 Not fount ！！！
      <Link to="/">返回首页</Link>
    </div>
  )
}

export default NotFound
