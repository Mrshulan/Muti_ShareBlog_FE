import axios from "axios";
import * as types from '../type.js'


// async
export function getArticlesList({ keyword, likes, state, pageNum, pageSize }) {
  return dispatch => {
    axios
    .get('http://47.106.136.114/api/getArticle', {
      params: {
        keyword,
        likes,
        state,
        pageNum,
        pageSize,
      }
    })
    .then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(saveArticlesList(res.data));
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
}


export function saveArticlesList(data) {
  return {
    type: types.SAVE_ARTICLES_LIST,
    payload: data,
  }
}