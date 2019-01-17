import request from 'superagent'
import {logout} from './users'
import {isExpired} from '../jwt'
import { baseUrl } from '../constants'



export const EVENTS_FETCHED = 'EVENTS_FETCHED'
export const EVENT_FETCHED = 'EVENT_FETCHED'
export const EVENT_CREATE_SUCCESS = 'EVENT_CREATE_SUCCESS'



// const baseUrl = 'http://localhost:4000'

const eventsFetched = events => ({
  type: EVENTS_FETCHED,
  events
})
export const loadEvents = () => (dispatch, getState) => {
  if(getState().events) return
  request(`${baseUrl}/events`)
    .then(response => {
      dispatch(eventsFetched(response.body))
    })
    .catch(console.error)
}

const eventCreateSuccess = event => ({
  type: EVENT_CREATE_SUCCESS,
  event
})
export const createEvent = (data) => (dispatch, getState) => {
  const jwt = getState().currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())
    request
      .post(`${baseUrl}/events`)
      .set('Authorization', `Bearer ${jwt}`)
      .send(data)
      .then(response => {
      dispatch(eventCreateSuccess(response.body))
    })
    .catch(console.error)

}

const eventFetched = event => ({
  type: EVENT_FETCHED,
  event
})
export const loadEvent = (id) => (dispatch, getState) => {
  if(getState().event) return
  request(`${baseUrl}/events/${id}`)
    .then(response => {
      dispatch(eventFetched(response.body))
    })
    .catch(console.error)
}