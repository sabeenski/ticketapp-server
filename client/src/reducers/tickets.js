import { TICKETS_FETCHED, TICKET_CREATE_SUCCESS } from "../actions/tickets";

export default (state = null, action = {}) => {
  switch(action.type){
    case TICKETS_FETCHED:
    return action.tickets
    case TICKET_CREATE_SUCCESS:
    return  [...state,
             action.ticket]
    
    
    default:
    return state
  }
}