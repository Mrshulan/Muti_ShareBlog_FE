import * as types from '../../types'

const initState = {
	userInfo: {
		email: '',
		id: '',
		introduce: '',
		name: '',
		password: '',
		tellphone: '',
		type: '',
	},
	message: '',
	refresh: 1,
};

export function user(state = initState, action) {
  switch(action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        message: action.payload.message,
      }
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        message: action.payload.message
      }
    case types.LOGOUT:
      return {
        userInfo: '',
        message: '',
        refresh: 0
      }
    case types.LOGIN_FAILURE:
    case types.REGISTER_FAILURE:
      return {
        ...state,
        userInfo: '',
        message: action.payload
      }
    default:
      return state
    }
}
