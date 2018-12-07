import request from 'superagent'
export const ADD_COMMENT = 'ADD_COMMENT'

const baseUrl = 'http://localhost:4000'

const commentAdded = comment => ({
  type: ADD_COMMENT,
comment
})
export const addComment = (data, id) => dispatch => {
  request
    .post(`${baseUrl}/tickets/${id}`)
    .send(data, id)
    .then(response => {
      dispatch(commentAdded(response.body))
    })
  
    .catch(console.error)
  }
