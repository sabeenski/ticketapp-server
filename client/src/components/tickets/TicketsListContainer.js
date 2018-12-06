import React, { Component } from 'react';
import {loadTickets} from '../../actions/tickets'
import {loadEvents} from '../../actions/events'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import TicketFormContainer from './TicketFormContainer';





class TicketsListContainer extends Component {

  componentDidMount() {
      this.props.loadTickets(Number(this.props.match.params.id))
      this.props.loadEvents()

  }

  


  render() { 
    
    if(!this.props.tickets) return `There are no tickets for this event at the moment.`
     else {
       return ( 
         <div className="container">
           <p>Ticket for : {this.props.events && this.props.events.name} </p>
           {this.props.tickets && this.props.tickets.map(ticket => {
             return (

                <div key={ticket.id}>
                  <div> <h4>-----------------------------------</h4>
                    <b>Ticket number: </b> <Link to={`/tickets/${ticket.id}`}> {ticket.id} </Link>
                    <p>Price: {ticket.price} </p>
                    <p>Description: {ticket.description} </p>
                  </div>
                </div>              
              )
             
           })}
           <TicketFormContainer />
         </div>
     );
  }
}
}
 
const mapStateToProps = state => ({
  tickets: state.tickets,
  events: state.events
}) 

export default connect(mapStateToProps, {loadTickets, loadEvents})(TicketsListContainer) 
 

