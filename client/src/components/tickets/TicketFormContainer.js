import React, { Component } from 'react';
import {connect} from 'react-redux'
import {createTicket} from '../../actions/tickets'
import {loadEvents} from '../../actions/events'

class TicketFormContainer extends Component {

  
  
  state = {
    seller: this.props.userId,
    price: null,
    picture: "",
    description: "",
    createdOn: ""
  }

  
  onChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name] : event.target.value
      
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.createTicket(this.state, Number(this.props.events.match.params.id))

  }
  
  
  render() { 

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
  events: state.events
}) 

export default connect(mapStateToProps, {createTicket, loadEvents})(TicketFormContainer) 
