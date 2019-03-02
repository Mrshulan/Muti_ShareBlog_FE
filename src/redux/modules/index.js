import { combineReducers } from "redux"

import app from './app'
import auth from './auth'
import ui from './ui'


const rootReducer = combineReducers({
  app,
  auth,
  ui
})

export default rootReducer