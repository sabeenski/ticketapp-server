import request from 'superagent'
import {logout} from './users'
import {isExpired} from '../jwt'
import { baseUrl } from '../constants'



export const ADD_COMMENT = 'ADD_COMMENT'
export const COMMENTS_FETCHED = 'COMMENTS_FETCHED'

// const baseUrl = 'http://localhost:4000'

const commentAdded = comment => ({
  type: ADD_COMMENT,
  comment
})
export const addComment = (content, id) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/tickets/${id}/comments`)
    .set('Authorization', `Bearer ${jwt}`)

    .send(content, id)
    .then(response => {
      dispatch(commentAdded(response.body))
    })
  
    .catch(console.error)
  }



const commentsFetched = comments => ({
  type: COMMENTS_FETCHED,
  comments
})
export const loadComments = (id) => (dispatch, getState) => {
  if(getState().comments) return
  request(`${baseUrl}/tickets/${id}/comments`)
    .then(response => {
      dispatch(commentsFetched(response.body))
    })
    .catch(console.error)
}