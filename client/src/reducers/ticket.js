import {TICKET_FETCHED} from '../actions/tickets'
export default (state = [], action = {}) => {
    switch(action.type){
        case TICKET_FETCHED:
        return [action.ticket]
        default:
            return state
    }
}