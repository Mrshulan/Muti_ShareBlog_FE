import { message } from 'antd'
import { actions as appActions } from './app'
import axios from '../../utils/axios'
import jwtDecode from 'jwt-decode'
import { getCookie ,setCookie, delCookie } from '../../utils/utils'

let initialState = {
  userId: null,
  username: '',
  role: 1,
  avatar: ''
}

export const types = {
  LOGIN: 'AUTH/LOGIN',
  REGISTER: 'AUTH/REGiSTER',
  LOGOUT: 'AUTH/LOGOUT',
  UPDATEAVATAR: 'AUTH/UPDATEAVATAR'
}


export const actions = {
  login: ({ username, password }) => {
    return dispatch => {
      dispatch(appActions.startRequest())
      return axios.post('/login', { username, password }).then(res => {
        dispatch(appActions.finishRequest())
        if(res.code === 200) {
          setCookie('token', res.token, 100)
          message.success(res.message)
          dispatch(actions.setLoginInfo(res.token))
        } else {
          dispatch(appActions.setError(res.message))
        }

        return res
      })
    }
  },
  register: ({username, password}) => {
    return dispatch => {
      dispatch(appActions.startRequest())
      return axios.post('/register', { username, password }).then(res => {
        dispatch(appActions.finishRequest())       
        if (res.code === 200) {     
          message.success(res.message)
        }
        else {
          message.error(res.message)
          dispatch(appActions.setError(res.message))        
        }
        return res
      })
    }
  },
  logout: () => {
    delCookie('token')
    return {
      type: types.LOGOUT
    }
  },
  updateAvatar: (path) => ({
    type: types.UPDATEAVATAR,
    payload: {
      path
    }
  }),
  setLoginInfo: (token) => ({
    type: types.LOGIN,
    payload: { 
      token
    }
  })  
}

// 解决刷新之后无法保持住state
const token = getCookie('token')
if (token && token !== "undefined") {
  const { userId, username, role, avatar} = jwtDecode(token)
  initialState = Object.assign(initialState, { userId, username, role , avatar })
}


const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch(type) {
    case types.LOGIN:
      const { userId, username, avatar } = jwtDecode(payload.token)
      return { ...state, userId, username, avatar }
    case types.LOGOUT:
      return { userId: null, username: '',role: 0, avatar: ''}
    case types.UPDATEAVATAR:
      return {...state, avatar: action.payload.path }
    default:
      return state
  }
}

export default reducer
