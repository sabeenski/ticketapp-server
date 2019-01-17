import request from 'superagent'
import {logout} from './users'
import {isExpired} from '../jwt'
import { baseUrl } from '../constants'


export const TICKETS_FETCHED = 'TICKETS_FETCHED'
export const TICKET_CREATE_SUCCESS = 'TICKET_CREATE_SUCCESS'
export const TICKET_FETCHED = 'TICKET_FETCHED'


// const baseUrl = 'http://localhost:4000'

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
export const createTicket = (data, id) => (dispatch, getState) => {
  const jwt = getState().currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())
  request
    .post(`${baseUrl}/events/${id}/tickets`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data, id)
    .then(response => {
      dispatch(ticketCreateSuccess(response.body))
    })
    .catch(console.error)
}

const ticketFetched = ticket => ({
  type: TICKET_FETCHED,
  ticket
})

export const loadTicket = (ticketId) => dispatch => {
  request
  .get(`${baseUrl}/tickets/${ticketId}`)
  .then(response => dispatch(ticketFetched(response.body)))
  .catch(console.error)
} 
