import { message } from 'antd'
import { actions as appActions } from './app'
import axios from '../../utils/axios'
import md5 from 'md5'
import { getCookie ,setCookie, delCookie } from '../../utils/utils'
import Storage from '../../utils/storage'

const cache = new Storage()
const { userId, username, role, avatar} = cache.get('info') || {}
let initialState = {
  userId: userId || null,
  username: username || '',
  role: role || '1',
  avatar: avatar || ''
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
      return axios.post('/login', { username, password: md5(password + username) }).then(res => {
        dispatch(appActions.finishRequest())
        console.log(res.status)
        if(res.status === 200) {
          const { userId, username, role, avatar } = res
          const data = { userId, username, role, avatar }
          cache.set('info', data, 86400000)
          message.success(res.message)
          dispatch(actions.setLoginInfo(data))
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
      return axios.post('/register', { username, password: md5(password + username)}).then(res => {
        dispatch(appActions.finishRequest())       
        if (res.status === 200) {     
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
    axios.get('/logout').then(res => {
      console.log('logout')
      message.success(res.message)
      // delCookie('MRSHULAN')
      // delCookie('MRSHULAN.sig')
      cache.remove('info')
    })
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
  setLoginInfo: (payload) => ({
    type: types.LOGIN,
    payload
  })  
}

// 解决刷新之后无法保持住state
// const token = getCookie('token')
// if (token && token !== "undefined") {
  // const { userId, username, role, avatar} = jwtDecode(token)
  // initialState = Object.assign(initialState, { userId, username, role , avatar })
// }


const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch(type) {
    case types.LOGIN:
      const { userId, username, avatar, role } = payload
      return { ...state, userId, username, avatar, role }
      case types.LOGOUT:
      return { userId: null, username: '',role: 0, avatar: ''}
    case types.UPDATEAVATAR:
      return {...state, avatar: action.payload.path }
    default:
      return state
  }
}

export default reducer
