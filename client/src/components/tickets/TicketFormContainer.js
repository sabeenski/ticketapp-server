import React, { Component } from 'react';
import {connect} from 'react-redux'
import {createTicket} from '../../actions/tickets'
import {addComment} from '../../actions/comments'
import { Link } from 'react-router-dom'

class TicketFormContainer extends Component {

  
  onChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name] : event.target.value,
      event: this.props.match.params.id,
      user: this.props.user,
      comment: this.props.comments
      
      
    })
    console.log(this.props.user)
  }
  
  onSubmit = (event) => {
    event.preventDefault()
    this.props.createTicket(this.state, Number(this.props.match.params.id))
    
  }
  
  
  render() { 
    return ( 
      <div className="container">
      {this.props.currentUser && 
        <form onSubmit={this.onSubmit}>
            <label> <h5> Price: </h5>
              <input type="text" onChange={this.onChange} name="price" required></input>
            </label>
            <label> <h5> Description: </h5>
              <input type="text" onChange={this.onChange} name="description" required></input>
            </label>
            <label> <h5> Picture: </h5>
              <input type="url" onChange={this.onChange} name="picture"></input>
            </label>

            <button>Create New Ticket</button>
        </form>}
        {!this.props.tickets && <i>No tickets for this event at the moment.</i>}
        {!this.props.currentUser  && <i>Please login or sign up to add new tickets.
          <button><Link to='/login'>Login</Link></button>
          <button><Link to='/signup'>Signup</Link></button></i>}        
      </div>
     );
  }
}

const mapStateToProps = state => ({
  tickets: state.tickets,
  comments: state.comments,
  currentUser: state.currentUser

  // events: state.events
}) 

export default connect(mapStateToProps, { createTicket, addComment })(TicketFormContainer) 
