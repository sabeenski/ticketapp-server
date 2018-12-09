import React, { Component } from 'react';
import {loadTickets} from '../../actions/tickets'
import {loadEvent} from '../../actions/events'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'





class TicketsListContainer extends Component {

  componentDidMount() {
      this.props.loadTickets(Number(this.props.match.params.id))
      this.props.loadEvent(Number(this.props.match.params.id))

  }
  
  


  render() { 
       return ( 
         <div className="container"> 
          <h3>Tickets for : {this.props.event && this.props.event.name}</h3>  
          {!this.props.tickets && <i>`There are no tickets for this event at the moment.`</i>}

           {this.props.tickets && this.props.tickets.map(ticket => {
             return (
                <div key={ticket.id}> 
                  
                <Link to={`/tickets/${ticket.id}/comments`}><div> <h4>-----------------------------------</h4>
                    <b>Ticket number: </b>  {ticket.id} 
                    <p>Price: {ticket.price} €</p>
                    <p>Description: {ticket.description} </p>
                  </div>
                </Link>
                </div>  
              )

           })}
           
         </div>

);

}
}
 
const mapStateToProps = state => ({
  tickets: state.tickets,
  event: state.event,
}) 

export default connect(mapStateToProps, {loadTickets, loadEvent})(TicketsListContainer) 
 

