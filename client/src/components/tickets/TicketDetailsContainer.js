

import React, { Component } from 'react';
import {connect} from 'react-redux'
import {loadComments} from '../../actions/comments'
import {loadTicket} from '../../actions/tickets'
import CommentForm from '../comments/CommentForm';



class TicketDetailsContainer extends Component {

  componentWillMount(){
    this.props.loadTicket(Number(this.props.match.params.id))
    this.props.loadComments(Number(this.props.match.params.id))
  }

  
  render() { 
      if (this.props.ticket === null) return "Loading..." 
      return ( 
        <div className="container"> 
          <h5><b>Price: </b>{this.props.ticket.price}€ </h5>
          <h5><b>Description: </b>{this.props.ticket.description}</h5>
           <hr/> 
          <h5><b>Comments: </b></h5>
          <div>
           <CommentForm />
          </div>
        </div>
      )
  }
}

 
const mapStateToProps = state => ({
  tickets: state.tickets, 
  comments: state.comments,
  ticket: state.ticket,


}) 

export default connect(mapStateToProps, {loadComments, loadTicket})(TicketDetailsContainer)