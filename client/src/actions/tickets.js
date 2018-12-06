import request from 'superagent'

export const TICKETS_FETCHED = 'TICKETS_FETCHED'
export const TICKET_CREATE_SUCCESS = 'TICKET_CREATE_SUCCESS'



const baseUrl = 'http://localhost:4000'

const ticketsFetched = tickets => ({
  type: TICKETS_FETCHED,
  tickets
})
export const loadTickets = (id) => (dispatch, getState) => {
  if(getState().tickets) return
  request(`${baseUrl}/events/${id}/tickets`)
    .then(response => {
      dispatch(ticketsFetched(response.body))
    })
    .catch(console.error)
}

const ticketCreateSuccess = ticket => ({
  type: TICKET_CREATE_SUCCESS,
  ticket
})
export const createTicket = (data, id) => dispatch => {
  request
    .post(`${baseUrl}/events/${id}/tickets`)
    .send(data, id)
    .then(response => {
      dispatch(ticketCreateSuccess(response.body))
    })
    .catch(console.error)
}