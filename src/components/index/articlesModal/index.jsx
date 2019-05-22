import React from 'react'
import { Modal } from 'antd'
import Articles from '../articles/articles'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as uiActions } from '../../../redux/modules/ui'


const ArticlesModal = ({keyword, articlesModalOpen, closeArticlesModal}) => {
  const handleCancel = () => {
    closeArticlesModal()
  }

  return (
    <Modal
      title={`关于${keyword}`}
      style={{ top: '25%' }}
      visible={articlesModalOpen}
      onCancel={handleCancel}
      width={700}
      footer={null}
    >
      <Articles keyword={keyword}/>
    </Modal>
  )
}

const mapStateToProps = (state, props) => {
  return {
    articlesModalOpen: state.ui.articlesModalOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(uiActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesModal)