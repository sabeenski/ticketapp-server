

import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {loadTickets} from '../../actions/tickets'
import {loadTicket} from '../../actions/tickets'
import CommentForm from '../comments/CommentForm';



class TicketDetailsContainer extends Component {

  componentDidMount(){
    this.props.loadTickets(this.props.match.params.id)
    this.props.loadTicket(this.props.match.params.id)
    console.log(this.props.loadTicket(1))
    console.log(this.props.match.params.id)
  }
  state = {
    content: ''
  }

  

  
  render() { 
       return ( 
         <div>
            {this.props.ticket && this.props.ticket.map(ticket => {
              return (
                <div key={ticket.id}>
                <h4>Event name: {ticket.description}</h4>
                <h4>Description: {ticket.description}</h4>
                <h4>Price: {ticket.price}</h4>
                </div>
              )
            })}
            

         <CommentForm />
         </div>
     )
  }
}

 
const mapStateToProps = state => ({
  tickets: state.tickets, 
  ticket: state.ticket

}) 

export default connect(mapStateToProps, {loadTickets, loadTicket})(TicketDetailsContainer)