import React, { Component } from 'react';
import {connect} from 'react-redux'
import { addComment } from '../../actions/comments'
import {getUsers} from '../../actions/users'




class CommentForm extends Component {

  
  state = { 
    content: '',
    author: this.props.users
  }

   

   onChange = (event) => {
     this.setState({
       [event.target.name] : event.target.value
      })
    }
    

    onSubmit = (event) => {
      event.preventDefault()
      this.props.addComment(this.state, Number(this.props.match.params.id))
      
    }
    
    
    
    render() { 
      
    return ( 
      <div className="container">
        <form onSubmit={this.onSubmit}>
            <label> <h5> Add your comment: </h5>
              <input type="box" onChange={this.onChange} name="name" required></input>
            </label>
            

            <button >Send</button>
        </form>
      </div>
     );
  }
}


const mapStateToProps = state => ({
  
  
  users: state.users,
  comments: state.comments
})


 
export default connect(mapStateToProps,  {addComment, getUsers})(CommentForm) 
