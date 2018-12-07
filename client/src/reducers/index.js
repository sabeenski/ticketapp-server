import {combineReducers} from 'redux'
import users from './users'
import login from './login'
import currentUser from './currentUser'
import signup from './signup'
import events from './events'
import tickets from './tickets'
import ticket from './ticket'
import comments from './comments'


export default combineReducers({
  users,
  login,
  currentUser,
  signup,
  events,
  tickets,
  ticket,
  comments
  
})