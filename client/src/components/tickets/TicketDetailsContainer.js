

import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'



class TicketDetailsContainer extends Component {
  state = {

  }

  render() { 
    
       return ( 
         <div className="container">
           "show some details"
         </div>
     );
  }
}

 
const mapStateToProps = state => ({
  tickets: state.tickets, 

}) 

export default connect(mapStateToProps)(TicketDetailsContainer)