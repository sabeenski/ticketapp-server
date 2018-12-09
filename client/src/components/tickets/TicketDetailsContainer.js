

import React, { Component } from 'react';
import {connect} from 'react-redux'
import {loadComments} from '../../actions/comments'
import {addComment} from '../../actions/comments'
import {loadTicket} from '../../actions/tickets'
import CommentForm from '../comments/CommentForm';
import { Link } from 'react-router-dom'



class TicketDetailsContainer extends Component {

  componentWillMount(){
    this.props.loadTicket(Number(this.props.match.params.id))
    this.props.loadComments(Number(this.props.match.params.id))
  }

  createComment = (comment) => {
    this.props.addComment(comment, Number(this.props.match.params.id))
  }

  
  render() { 
      if (this.props.ticket === null) return "Loading..." 
      return ( 
        <div className="container"> 
          <div className="card-panel">

          <h5><b>Event Name: </b>{this.props.ticket.event.name} </h5>
          <h5><b>Price: </b>{this.props.ticket.price}€ </h5>
          <h5><b>Description: </b>{this.props.ticket.description}</h5>
          <h5><b>FraudRisk: {Math.floor(this.props.ticket.fraudRisk)}%</b></h5>
          <h5><b>Seller: </b> <i>{this.props.ticket.user.firstName}</i></h5>
           <hr/> 
          <h5><b>Comments: </b></h5>

          <div>
            {this.props.comments && this.props.comments.map(comment => 
            <p key={comment.id}><b>{comment.user.firstName}</b>: {comment.content}</p>)}
          </div>

            {!this.props.currentUser  && <i>Please login or sign up to add your comments.

              <button><Link to='/login'>Login</Link></button>
              <button><Link to='/signup'>Signup</Link></button></i>
            }
          </div>
          <div>
            {this.props.currentUser && 
           <CommentForm onSubmit={this.createComment} />}
          </div>
        </div>
      )
  }
}

 
const mapStateToProps = state => ({
  tickets: state.tickets, 
  comments: state.comments,
  ticket: state.ticket,
  currentUser: state.currentUser


}) 

export default connect(mapStateToProps, {loadComments, loadTicket, addComment})(TicketDetailsContainer)