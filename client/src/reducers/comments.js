import { ADD_COMMENT } from "../actions/comments";

export default (state = null, action = {}) => {
  switch(action.type){
    
    case ADD_COMMENT:
    return [...state, 
            action.comment]
    
    
    default:
    return state
  }
}