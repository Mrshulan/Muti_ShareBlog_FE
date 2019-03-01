import React, { Component } from 'react'

import { Comment, Avatar, Button, Tooltip, Input, Icon, Popconfirm, message } from 'antd'

const { TextArea } = Input

const CommentItem = (({
  children,
  item,
  openReply,
  fatherId,
  levelOneId,
  levelTwoId,
  handleChange,
  handleKeyUp,
  onSumbit,
  renderAvatar,
  deComment,
  auth,
  value,
}) => {
  const level = item.replies ? 1 : 2
  function handleClick(level) {
    if (level === 1) openReply(level, item.id)
    else openReply(level, item.id, fatherId)
  }


  return (
    <Comment
    author={<a>Han Solo</a>}
    avatar={(
      <Avatar
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
      />
    )}
    actions={[
      <span onClick={() => handleClick(level)}>Reply to</span>,
      <React.Fragment>
          {auth === 1 && (
            <Popconfirm
              title={'是否删除该评论？'}
              cancelText="取消"
              okText="确认"
              onConfirm={() => delComment(item, fatherId)}>
              <Icon type="delete" className="icon-delete" />
            </Popconfirm>
          )}
        </React.Fragment>
    ]}
    content={
      <div
        className="article-detail"
        dangerouslySetInnerHTML={{ __html: translateMarkdown(item.content) }}
      />
    }
    datetime={
      <Tooltip title={item.createdAt}>
        <span>{moment(item.createdAt).fromNow()}</span>
      </Tooltip>
    }
    >
    {((level === 1 && levelOneId === item.id) || (level === 2 && levelTwoId === item.id)) && (
        <div className="reply-form">
          <TextArea
            placeholder={`回复${item.user.username}...`}
            value={value}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
          />
          <div className="reply-form-controls">
            <span className="tip">Ctrl or ⌘ + Enter</span>
            <Button htmlType="submit" type="primary" disabled={!value.trim()} onClick={onSubmit}>
              回复
            </Button>
          </div>
        </div>
      )}
    {children}
    </Comment>
  )
})

class CommentList extends Component {
  state = {
    commentList: [],
    colorMap: {},
    value: ''
  }

  render() {
    
    return (
      <div>
        {this.commnetList.map(comment => (
          <CommentItem key={comment.id} item={comment} >
            {comment.replies.map(reply => (
              <CommentItem
                key={reply.id}
                item={reply}
                levelTwoId={levelTwoId}
                fatherId={comment.id}
                {...commonProps}
              />
            ))}
          </CommentItem>
        ))}
      </div>
    )
  }
}