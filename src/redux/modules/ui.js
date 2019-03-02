const initialState = {
  loginModalOpen: false,
  registerModalOpen: false,
}

export const types = {
  OPEN_AUTH_MODAL: 'UI/OPEN_AUTH_MODAL',
  CLOSE_AUTH_MODAL: 'UI/CLOSE_AUTH_MODAL',
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
  }
}

const reducer = (state = initialState, action) => {
  const {type, payLoad} = action

  switch(type) {
    case types.OPEN_AUTH_MODAL:
      return { ...state, [`${payLoad}ModalOpen`]: true}
    case types.CLOSE_AUTH_MODAL:
      return { ...state, [`${payLoad}ModalOpen`]: false}
    default:
      return state
  }
}

export default reducer
