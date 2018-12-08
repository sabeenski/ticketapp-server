import React, { Component } from 'react';
import {loadEvents} from '../../actions/events'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import EventFormContainer from './EventFormContainer';



class EventsListContainer extends Component {
  componentDidMount() {
    this.props.loadEvents()
  }
  render() { 
    if(!this.props.events) return `Loading.....`
     else {
       return ( 
         <div className="container">
           {this.props.events.map(event => {
              return (
                <div key={event.id}>
                  <div> <h4>-----------------------------------</h4>
                    <b>Event: </b> <Link to = {`/events/${event.id}/tickets`}>{event.name}</Link> 
                  </div>
                  <div>
                    <b>Description: </b>{event.description}
                  </div>
                  <div>
                    <b>Starts on: </b>{event.startDate}
                  </div>
                  <div>
                    <b>Ends on: </b>{event.endDate}
                  </div>
                  <div>{event.picture && <img src = {event.picture} width="50%" alt="event" />}
                  </div>
                
                </div>
              )
            })} <hr/>
            {!this.props.currentUser  && <i>Please login or sign up to add new events & tickets.
              <button><Link to='/login'>Login</Link></button>
              <button><Link to='/signup'>Signup</Link></button></i>}        
                  {this.props.currentUser && <EventFormContainer />}
         </div>
     );
  }
}
}
 
const mapStateToProps = state => ({
  events: state.events, 
  currentUser: state.currentUser,
  signup: state.signup

}) 

export default connect(mapStateToProps, {loadEvents})(EventsListContainer)