import React, { Component, useState } from 'react'
import { Comment, Avatar, Tooltip, message, Input, Button} from 'antd'
import { translateMarkdown, timestampToTime } from '../../../utils/utils'
import axios from '../../../utils/axios'

const isPro = process.env.NODE_ENV === 'production'

const CommentItem = (({ item, fatherId, handleSubmit, children }) => {
  const { from, created } = item
  const [replySwitch, turnReplySwitch ] = useState(false)
  const [replyContent, setReplyContent ] = useState('')
  function handleClick() {
    turnReplySwitch(!replySwitch)
  }
  function handleChange(e) {
    setReplyContent(e.target.value)
  }
  function handleKeyUp (e) {
    if (e.ctrlKey && e.keyCode === 13) {
      onSubmit()
    }
  }
  function onSubmit () {
    handleSubmit({fatherId, replyContent, setReplyContent, turnReplySwitch})
  }
  return (
    <Comment
      actions={[
        <span onClick={() => handleClick()}>回复</span>
      ]}
      author={from.username}
      avatar={(
        <Avatar
          src={(isPro ? 'http://mrshulan.xin' : 'http://127.0.0.1:6001') + from.avatar}
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
       {(replySwitch) && (
        <div className="reply-form">
          <Input.TextArea
            placeholder={`回复楼主点什么吧...`}
            value={replyContent}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
          />
          <div className="reply-form-controls">
            <span className="tip">Ctrl or ⌘ + Enter</span>
            <Button htmlType="submit" type="primary" disabled={!replyContent.trim()} onClick={onSubmit}>
              回复
            </Button>
          </div>
        </div>
      )}
      {children}
    </Comment>
  )
})

class CommentsList extends Component {
  handleSubmit = ({fatherId, replyContent, setReplyContent, turnReplySwitch}) => {
    if (!replyContent) {
      message.error('评论内容不能为空')
    }
    axios.put('/comment', {
      fatherId,
      content: replyContent,
      isSub: true,
    }).then(res => {
      if(res.status === 200) {
        message.success(res.message)
        this.props.fetchData(this.props.articleId)
        setReplyContent('')
        turnReplySwitch(false)
      } 
    }).catch(err => {
      message.error(err.message)
    })
  }

  render() {
    const { list } = this.props
    return (
      <div>
        { list && list.map(item => {
          return (
              <CommentItem key={item._id} item={item} fatherId={item._id} handleSubmit={this.handleSubmit}>
                {item.sub && item.sub.map(sub => (
                  <CommentItem
                    key={sub._id}
                    item={sub}
                    fatherId={item._id}
                    handleSubmit={this.handleSubmit}
                  />
                ))}
              </CommentItem>
            )
          })
        }
      </div>
    )
  }
}

export default CommentsList