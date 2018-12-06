import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import  SignupPage  from './components/signup/SignupPage'
import LoginPage from './components/login/LoginPage'
import LogoutPage from './components/logout/LogoutPage'
import NavBar from './components/NavBar'
import EventsListContainer from './components/events/EventsListContainer';
import TicketsListContainer from './components/tickets/TicketsListContainer';
import TicketDetailsContainer from './components/tickets/TicketDetailsContainer';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <NavBar />
          </nav>
        <Route exact path="/signup" component={SignupPage} /> 
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/logout" component={LogoutPage} />
        <Route exact path="/events" component={EventsListContainer} />
        {/* <Route exact path="/" component={EventFormContainer} /> */}
        <Route exact path="/events/:id/tickets" component={TicketsListContainer} />
        <Route exact path="/tickets/:id" component={TicketDetailsContainer} />
        {/* <Route exact path="/events/:id/tickets" component={TicketFormContainer} /> */}
        {/* <Route exact path="/events/:id/tickets/:id" component={TicketFormContainer} /> */}
        <Route exact path="/" render={ () => <Redirect to="/events" /> } />


        </div>
      </Router>
    );
  }
}

export default App;
