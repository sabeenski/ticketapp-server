import React from 'react'
import { withRouter } from 'react-router'
import { userId } from '../jwt'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
    const { location, history, user } = props

    return (
        <div className="container">

        <div className="nav-wrapper">
        <a href="/" className="brand-logo center"><i className="material-icons">local_offer</i>TicketSale</a>
           
          <div className="right hide-on-med-and-down">

          {props.user !== null && 
           <div>
            <Link to = '/logout'><button className="btn waves-effect waves-light">LOGOUT</button></Link>
           </div>}
          
           {props.user === null && 
           <div>
            <Link to = '/login'><button className="btn waves-effect waves-light">LOGIN</button></Link>
            ---
            <Link to = '/signup'><button className="btn waves-effect waves-light">SIGNUP</button></Link>
           </div>}


          </div>

        </div>
          
          
        </div>
        
        
      )
    }
    
    const mapStateToProps = state => ({
      user: state.currentUser 
    })
    
    export default withRouter(
      connect(mapStateToProps)(NavBar)
    )
