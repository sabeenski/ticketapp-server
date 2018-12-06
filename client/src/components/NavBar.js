import React from 'react'
import { withRouter } from 'react-router'
import { userId } from '../jwt'
import { connect } from 'react-redux'


const NavBar = (props) => {
    const { location, history, user } = props

    return (
        <div className="container">

        <div className="nav-wrapper">
        <a href="/" className="brand-logo center"><i className="material-icons">local_offer</i>TicketSale</a>
           
          <div className="right hide-on-med-and-down">

            {
              user &&
              <button>{ user.name }</button>
            }
    
            {
              location.pathname.indexOf('signup') > 0 &&
             <button className="btn waves-effect waves-light" onClick={() => history.push('/login')}>Login</button>
            }
            {
              location.pathname.indexOf('login') > 0 &&
              <button className="btn waves-effect waves-light" onClick={() => history.push('/signup')}>Sign up</button>
            }
            {
              location.pathname.indexOf('events/') > 0 &&
              <button className="btn waves-effect waves-light" onClick={() => history.push('/')}>All Events</button>
            }
            {
              /events$/.test(location.pathname) &&
              <button className="btn waves-effect waves-light" onClick={() => history.push('/logout')}>Log out</button>
            }
          </div>

        </div>
          
          
        </div>
        
        
      )
    }
    
    const mapStateToProps = state => ({
      user: state.currentUser && state.users &&
        state.users[userId(state.currentUser.jwt)]
    })
    
    export default withRouter(
      connect(mapStateToProps)(NavBar)
    )
