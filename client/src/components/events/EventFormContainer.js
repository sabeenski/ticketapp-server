import React, { Component } from 'react';
import {connect} from 'react-redux'
import { createEvent } from '../../actions/events'
import {getUsers} from '../../actions/users'




class EventFormContainer extends Component {

  
  // state = { 
  //   name: '',
  //   description: '',
  //   picture: ''
  //  }

   

   onChange = (event) => {
     this.setState({
       [event.target.name] : event.target.value
       
      })
    }
    
    onSubmit = (event) => {
      event.preventDefault()
      this.setState({
        name: '',
        description: '',
        picture: '',
        startDate: '',
        endDate: ''
      })
      this.props.createEvent(this.state)
    }
    
    
    
    render() { 
      
    return ( 
      <div>
        <form onSubmit={this.onSubmit}>
            <label> <h5> Name: </h5>
              <input type="text" onChange={this.onChange} name="name" required></input>
            </label>
            <label> <h5> Description: </h5>
              <input type="text" onChange={this.onChange} name="description" required></input>
            </label>
            <label> <h5> Picture: </h5>
              <input type="url" onChange={this.onChange} name="picture"></input>
            </label>
            <label htmlFor="start"> <h5> Starts on: </h5>
              <input type="date" onChange={this.onChange} name="startDate"></input>
            </label>
            <label htmlFor="end"> <h5> Ends on: </h5>
              <input type="date" onChange={this.onChange} name="endDate"></input>
            </label> 

            <button className="btn waves-effect waves-light">Create New Event</button>
        </form>
      </div>
     );
  }
}

const mapStateToProps = state => ({
  events: state.events,
	// users: state.users 
})


 
export default connect(mapStateToProps,  {createEvent, getUsers})(EventFormContainer) 
