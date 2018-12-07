

import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {loadTickets} from '../../actions/tickets'
import CommentForm from '../comments/CommentForm';



class TicketDetailsContainer extends Component {
  state = {
    content: ''
  }

  

  
  render() { 
    
       return ( 
         <div className="container">
           <CommentForm />
         </div>
     );
  }
}

 
const mapStateToProps = state => ({
  tickets: state.tickets, 

}) 

export default connect(mapStateToProps, {loadTickets})(TicketDetailsContainer)