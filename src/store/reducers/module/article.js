import * as types from '../../types.js'

const initState = {
  articlesList: [],
  total: 0
}

export function articles(state = initState, action) {
  switch(action.type) {
    case types.SAVE_ARTICLES_LIST:
      return {
        ...state,
        articlesList: state.articlesList.length ? [...state.articlesList, ...action.payload.list] : action.payload.list,
        total: action.payload.count
      }
    default:
      return state
  }
}
