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
                  <div><img src = {event.picture} width="50%" alt="event" />
                  </div>
                
                </div>
              )
           })} {!this.props.currentUser && <h5>To create new events and tickets, please login!<button><Link to='/login'>Login</Link></button>
</h5>}
                  
                  {this.props.currentUser && <EventFormContainer />}
         </div>
     );
  }
}
}
 
const mapStateToProps = state => ({
  events: state.events, 
  currentUser: state.currentUser

}) 

export default connect(mapStateToProps, {loadEvents})(EventsListContainer)