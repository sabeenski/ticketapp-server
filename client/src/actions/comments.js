import request from 'superagent'
import {logout} from './users'
import {isExpired} from '../jwt'


export const ADD_COMMENT = 'ADD_COMMENT'

const baseUrl = 'http://localhost:4000'

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
    .post(`${baseUrl}/tickets/${id}`)
    .set('Authorization', `Bearer ${jwt}`)

    .send({content})
    .then(response => {
      dispatch(commentAdded(response.body))
    })
  
    .catch(console.error)
  }
