import { message } from 'antd'
import { actions as appActions } from './app'
import axios from '../../utils/axios'
import md5 from 'md5'
import Storage from '../../utils/storage'

const cache = new Storage()
const { userId, username, role, avatar, tellphone, info } = cache.get('info') || {}
let initialState = {
  userId: userId || null,
  username: username || '',
  role: role || '1',
  avatar: avatar || '',
  tellphone: tellphone || 18473871766,
  info: info || {}
}

export const types = {
  LOGIN: 'AUTH/LOGIN',
  REGISTER: 'AUTH/REGiSTER',
  LOGOUT: 'AUTH/LOGOUT',
  UPDATEAVATAR: 'AUTH/UPDATEAVATAR',
  UPDATEINFO: 'AUTH/UPDATEINFO'
}


export const actions = {
  login: ({ username, password }) => {
    return dispatch => {
      dispatch(appActions.startRequest())
      return axios.post('/login', { username, password: md5(password + username) }).then(res => {
        dispatch(appActions.finishRequest())

        if(res.status === 200) {
          const { userId, username, role, avatar, tellphone, info} = res
          const data = { userId, username, role, avatar,  tellphone, info }
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
  register: ({username, password, tellphone}) => {
    return dispatch => {
      dispatch(appActions.startRequest())
      return axios.post('/register', { username, password: md5(password + username), tellphone}).then(res => {
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
      message.success(res.message)
      cache.remove('info')
    })
    return {
      type: types.LOGOUT
    }
  },
  updateAvatar: (path) => {
    cache.set("info", { ...cache.get('info'), avatar: path })
    return {
      type: types.UPDATEAVATAR,
      payload: {
        path
      }
    }
  },
  updateInfo: (data) => {
    cache.set("info", { ...cache.get('info'), info: data })
    return {
      type: types.UPDATEINFO,
      payload: {
        data
      }
    }
  },
  setLoginInfo: (payload) => ({
    type: types.LOGIN,
    payload
  })  
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch(type) {
    case types.LOGIN:
      const { userId, username, avatar, role, tellphone, info} = payload
      return { ...state, userId, username, avatar, role, tellphone, info}
    case types.LOGOUT:
      return { userId: null, username: '',role: 0, avatar: '', info: {}, tellphone: 18473871766}
    case types.UPDATEAVATAR:
      return {...state, avatar: action.payload.path }
    case types.UPDATEINFO:
      return {...state, info: action.payload.data }
    default:
      return state
  }
}

export default reducer
