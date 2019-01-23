import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import connection from '../helpers/data/connections';

import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import MyNavbar from '../components/MyNavbar/MyNavbar';


import lineupRequests from '../helpers/data/lineupRequests';

import './App.scss';
import authRequests from '../helpers/data/authRequests';


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

        const lineupsPage = () => {
          const uid = authRequests.getCurrentUid();
          console.log(lineupRequests.getAllLineups(uid));
        };

        lineupsPage();
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

  render() {
    const {
      authed,
      home,
    } = this.state;

    if (!authed) {
      return (
        <div className="App">
        <MyNavbar isAuthed={authed}/>
          <div className="row">
            <Auth isAuthenticated={this.isAuthenticated}/>
          </div>
        </div>
      );
    }
    return (
      <div className="App">
      <MyNavbar isAuthed={authed} />
        <div className="row">
          <Home
          home={home}
          />
        </div>
      </div>
    );
  }
}

export default App;
