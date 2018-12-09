import React, { Component } from 'react';
import {connect} from 'react-redux'
import {createTicket} from '../../actions/tickets'
import {addComment} from '../../actions/comments'
import { Link } from 'react-router-dom'

class TicketFormContainer extends Component {
  
  state={
    price:'',
    picture:'',
    description:''
  }
  
  onChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value,
    })
  }
  
  
  onSubmit = (event) => {
    event.preventDefault()
    this.props.createTicket(this.state, Number(this.props.match.params.id))
    this.setState({
      price:'',
      description:'',
      picture:''
    })
    
  }
  
  
  render() { 
    return ( 
      <div className="container">
      {this.props.currentUser && 
        <form onSubmit={this.onSubmit}>
            <label> <h5> Price: </h5>
              <input type="text" onChange={this.onChange} name="price" value={this.state.price} required></input>
            </label>
            <label> <h5> Description: </h5>
              <input type="text" onChange={this.onChange} name="description" value={this.state.description} required></input>
            </label>
            <label> <h5> Picture: </h5>
              <input type="url" onChange={this.onChange} name="picture" value={this.state.picture}></input>
            </label>

            <button className="btn waves-effect waves-light">Create New Ticket</button>
        </form>}
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
