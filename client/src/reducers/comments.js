import { ADD_COMMENT, COMMENTS_FETCHED } from "../actions/comments";

export default (state = null, action = {}) => {
  switch(action.type){
    
    case ADD_COMMENT:
    return [...state, 
            action.comment]
    
    case COMMENTS_FETCHED:
    return action.comments
    
    default:
    return state
  }
}