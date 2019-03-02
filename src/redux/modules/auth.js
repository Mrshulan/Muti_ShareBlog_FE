import { message } from 'antd'
import { actions as appActions } from './app'
import axios from '../../utils/axios'
import jwtDecode from 'jwt-decode'

const initialState = {
  userId: null,
  username: '',
  identity: 0
}

export const types = {
  LOGIN: 'AUTH/LOGIN',
  REGISTER: 'AUTH/REGiSTER',
  LOGOUT: 'AUTH/LOGOUT'
}


export const actions = {
  login: ({ username, password }) => {
    return dispatch => {
      dispatch(appActions.startRequest())
      return axios.post('/login', { username, password }).then(res => {
        dispatch(appActions.finishRequest())
        if(res.code === 200) {
          localStorage.setItem('token', res.token)
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
    localStorage.removeItem('token')
    return {
      type: types.LOGOUT
    }
  },
  setLoginInfo: (token) => ({
    type: types.LOGIN,
    payload: { 
      token
    }
  })  
}



const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch(type) {
    case types.LOGIN:
      const { userId, username, identity } = jwtDecode(payload.token)
      return { ...state, userId, username, identity }
    case types.LOGOUT:
      return { userId: null, username: '',identity: 0 }
    default:
      return state
  }
}

export default reducer
