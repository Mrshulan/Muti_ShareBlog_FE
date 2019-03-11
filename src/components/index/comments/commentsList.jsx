import React, { Component } from 'react'
import { Comment, Avatar, Tooltip } from 'antd'
import { translateMarkdown, timestampToTime } from '../../../utils/utils'

const CommentItem = (({ item }) => {
  const { from, created } = item
  return (
    <Comment
      author={from.username}
      avatar={(
        <Avatar
          src={'http://mrshulan.xin' + from.avatar}
          alt={from.username}
        />
      )}
      content={
        <div
          className="article-detail"
          dangerouslySetInnerHTML={{ __html: translateMarkdown(item.content)}}
        />
      }
      datetime={
        <Tooltip>
          <span>{'评论于' + timestampToTime(created, true)}</span>
        </Tooltip>
      }
    >
    </Comment>
  )
})

class CommentsList extends Component {
  render() {
    return (
      <div>
        {this.props.list.map(item => (
          <CommentItem key={item._id} item={item} ></CommentItem>
        ))}
      </div>
    )
  }
}

export default CommentsList