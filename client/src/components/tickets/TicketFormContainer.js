import React, { Component } from 'react';
import {connect} from 'react-redux'
import {createTicket} from '../../actions/tickets'
import {addComment} from '../../actions/comments'

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
    // console.log(this.props.match.params.id)

    return ( 
      <div className="container">
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
        </form>
        
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
