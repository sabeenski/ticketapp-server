

import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'



class TicketDetailsContainer extends Component {
  
  render() { 
    
       return ( 
         <div className="container">
           <p>Hello</p>
                  
         </div>
     );
  }
}

 
const mapStateToProps = state => ({
  tickets: state.tickets, 

}) 

export default connect(mapStateToProps)(TicketDetailsContainer)