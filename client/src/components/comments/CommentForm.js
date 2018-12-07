import React, { Component } from 'react';
import {connect} from 'react-redux'
import { addComment } from '../../actions/comments'
import {getUsers} from '../../actions/users'
import {loadTickets} from '../../actions/tickets'




class CommentForm extends Component {

  /* componentDidMount(){
    console.log(this.props + "123")
    // this.props.loadTickets(Number(this.props.match.params.id))
  } */




   onChange = (event) => {
     this.setState({
       [event.target.name] : event.target.value
      })
    }
    

    onSubmit = (event) => {
      event.preventDefault()
      this.props.addComment(this.state.comment, this.props.tickets[0].id)
      console.log("hey")
    }
    
    
    
    render() { 
      
    return ( 
      <div className="container">
        <form onSubmit={this.onSubmit}>
            <label> <h5> Add your comment:  </h5>
              <input type="box" onChange={this.onChange} name="comment" required></input>
            </label>
            <button >Send</button>
        </form>
        {this.props.comments.map(comment => 
        <div>
          
        <p>{comment.content}{comment.user.firstName}</p>
      </div>
     )}
     </div>
    )}
}

const mapStateToProps = state => ({
  
  tickets: state.tickets,
  users: state.users,
  comments: state.comments
})

 
export default connect(mapStateToProps,  {addComment, getUsers, loadTickets})(CommentForm) 
