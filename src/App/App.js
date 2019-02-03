import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';

import connection from '../helpers/data/connections';

import Auth from '../components/pages/Auth/Auth';
// import Home from '../components/pages/Home/Home';
// import CreateLineup from '../components/pages/CreateLineup/CreateLineup';
import Lineup from '../components/pages/Lineup/Lineup';
import MyNavbar from '../components/MyNavbar/MyNavbar';
// import playerRequests from '../helpers/data/playerRequests';
import './App.scss';
import authRequests from '../helpers/data/authRequests';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends Component {
  state = {
    authed: false,
    pendingUser: true,
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          pendingUser: false,
        });

      } else {
        this.setState({
          authed: false,
          pendingUser: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  isAuthenticated = () => {
    this.setState({ authed: true });
  }

  render() {
    const {
      authed,
    } = this.state;

    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    if (!authed) {
      return (
        <div className="App">
        <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent} />
          <div className="row">
            <Auth isAuthenticated={this.isAuthenticated}/>
          </div>
        </div>
      );
    }
    return (
      <div className="App">
          <BrowserRouter>
          <React.Fragment>
            <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent} />
            <div className='container'>
            <div className='row'>
                <Switch>
                  <PrivateRoute path='/' exact component={Lineup} authed={this.state.authed} />
                  <PrivateRoute path='/lineup' component={Lineup} authed={this.state.authed} />
                  {/* <PrivateRoute path="/createlineup" authed={this.state.authed} component={CreateLineup} /> */}
                  {/* <PrivateRoute path="/lineup" authed={this.state.authed} component={Lineup} /> */}
                  {/* <PrivateRoute path="/createlineup/:lineupId" authed={this.state.authed} component={CreateLineup} /> */}
                  <PublicRoute path='/auth' component={Auth} authed={this.state.authed} />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
