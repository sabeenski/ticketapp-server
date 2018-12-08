import React, { Component } from 'react';
import {connect} from 'react-redux'
import { addComment } from '../../actions/comments'
import {getUsers} from '../../actions/users'
import {loadTicket} from '../../actions/tickets'
import { Link } from 'react-router-dom'


class CommentForm extends Component {
  
  state={}
    
    
      
    onChange = (event) => {
      this.setState({
        [event.target.name] : event.target.value
      })
    }
    
    onSubmit = (event) => {
      event.preventDefault()
      this.setState({
        content: '',
      })
      this.props.addComment(this.state, Number(this.props.ticket.id))
      console.log(this.props)
    }
    
    
    
    render() { 
      return ( 
        <div className="container">
          <div>
            {this.props.comments && this.props.comments.map(comment => 
            <p key={comment.id}><b>{comment.user.firstName}</b>: {comment.content}</p>)}
            {!this.props.currentUser  && <i>Please login or sign up to add your comments.

              <button><Link to='/login'>Login</Link></button>
              <button><Link to='/signup'>Signup</Link></button></i>
            }
          </div>
          <div>
            {this.props.currentUser && 
            <form onSubmit={this.onSubmit}>
              <label> <h5> Add your comment:  </h5>
                <input type="text" onChange={this.onChange} name="content" required></input>
              </label>
              <button >Send</button>
            </form>}
          </div>
        </div>
      )}
}

const mapStateToProps = state => ({
  
  ticket: state.ticket,
  comments: state.comments,
  currentUser: state.currentUser
})

 
export default connect(mapStateToProps,  {addComment, getUsers, loadTicket})(CommentForm) 
