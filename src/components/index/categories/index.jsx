import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '@/utils/axios'
import './index.less'
import { Badge } from 'antd'

const Categoires = ({selfCategories}) => {
  const [ list, setList ] = useState([
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
  ])
  // componentDidMount
  useEffect(() => {
    axios.get('/categories').then(data => {
      setList(data)
    })
  },[])
  
  const categoriesList = list.map((item, i) => (
    <Badge key={item.linkname} count={item.countArticles || 0} offset={[-10, 10]} style={{ backgroundColor: '#52c41a' }} >
      <Link className='item' to={`/categories/${item.linkname}`}>
          <span>{item.name}</span>
      </Link>
    </Badge>
  ))
  
  return categoriesList
}


export default Categoires