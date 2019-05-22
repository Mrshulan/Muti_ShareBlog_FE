const initialState = {
  loginModalOpen: false,
  registerModalOpen: false,
  articlesModalOpen: false,
  isEdit: false
}

export const types = {
  OPEN_AUTH_MODAL: 'UI/OPEN_AUTH_MODAL',
  CLOSE_AUTH_MODAL: 'UI/CLOSE_AUTH_MODAL',
  OPEN_ARTICLES_MODAL: 'UI/OPEN_ARTICLES_MODAL',
  CLOSE_ARTICLES_MODAL: 'UI/CLOSE_ARTICLES_MODAL',
  IS_EDIT: 'UI/IS_EDIT'
}

export const actions = {
  openAuthModal: (type) => {
    return {
      type: types.OPEN_AUTH_MODAL,
      payLoad: type,
    }
  },
  closeAuthModal: (type) => {
    return {
      type: types.CLOSE_AUTH_MODAL,
      payLoad: type
    }
  },
  openArticlesModal: () => {
    return {
      type: types.OPEN_ARTICLES_MODAL
    }
  },
  closeArticlesModal: () => {
    return {
      type: types.CLOSE_ARTICLES_MODAL
    }
  },
  editStatus: () => {
    return {
      type: types.IS_EDIT
    }
  }
}

const reducer = (state = initialState, action) => {
  const {type, payLoad} = action

  switch(type) {
    case types.OPEN_AUTH_MODAL:
      return { ...state, [`${payLoad}ModalOpen`]: true}
    case types.CLOSE_AUTH_MODAL:
      return { ...state, [`${payLoad}ModalOpen`]: false}
    case types.OPEN_ARTICLES_MODAL:
      return { ...state, articlesModalOpen: true}
    case types.CLOSE_ARTICLES_MODAL:
      return { ...state, articlesModalOpen: false}
    case types.IS_EDIT:
      return { ...state, isEdit: !state.isEdit}
    default:
      return state
  }
}

export default reducer
