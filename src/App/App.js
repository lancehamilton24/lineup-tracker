import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import lineupRequests from '../helpers/data/lineupRequests';
import Home from '../components/pages/Home/Home';
import Auth from '../components/pages/Auth/Auth';
import './App.scss';
import connection from '../helpers/data/connections';
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

        const articlesPage = () => {
          const uid = authRequests.getCurrentUid();
          console.log(lineupRequests.getAllLineups(uid));
        };

        articlesPage();
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
        <div className="App">>
          <div className="row">
            <Auth isAuthenticated={this.isAuthenticated}/>
          </div>
        </div>
      );
    }
    return (
      <div className="App">
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
