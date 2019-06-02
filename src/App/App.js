import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import connection from '../helpers/data/connections';

import Auth from '../components/pages/Auth/Auth';
// import Home from '../components/pages/Home/Home';
// import CreateLineup from '../components/pages/CreateLineup/CreateLineup';
import Lineup from '../components/pages/Lineup/Lineup';
import MyNavbar from '../components/MyNavbar/MyNavbar';
// import playerRequests from '../helpers/data/playerRequests';
import './App.scss';
import authRequests from '../helpers/data/authRequests';
import lineupRequests from '../helpers/data/lineupRequests';

class App extends Component {
  state = {
    authed: false,
    pendingUser: true,
    lineups: [],
    players: [],
    isEditing: false,
    editId: '-1',
    selectedLineupId: -1,
  }

  lineupSelectEvent = (id) => {
    this.setState({
      selectedLineupId: id,
    });
  }

  componentDidMount() {
    connection();
    lineupRequests.getAllLineups()
      .then((lineups) => {
        this.setState({ lineups });
      })
      .catch(err => console.error('error with getting lineup', err));

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

  deleteOne = (lineupId) => {
    lineupRequests.deleteLineup(lineupId)
      .then(() => {
        const uid = authRequests.getCurrentUid();
        lineupRequests.getAllLineups(uid)
          .then((lineups) => {
            this.setState({ lineups });
            // this.setState({ players: [] });
          });
      })
      .catch(err => console.error('error with delete single', err));
  }

  formSubmitLineup = (newLineupName) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      lineupRequests.updateLineup(editId, newLineupName)
        .then(() => {
          const uid = authRequests.getCurrentUid();
          lineupRequests.getAllLineups(uid)
            .then((lineups) => {
              this.setState({ lineups, isEditing: false, editId: '-1' });
            });
        })
        .catch(err => console.error('error with lineup post', err));
    } else {
      lineupRequests.postRequest(newLineupName)
        .then(() => {
          const uid = authRequests.getCurrentUid();
          lineupRequests.getAllLineups(uid)
            .then((lineups) => {
              this.setState({ lineups });
              // this.setState({ players: [] });
              // this.setState({ newLineupName: '' });
            });
        })
        .catch(err => console.error('error with listings post', err));
    }
  }

  passLineupToEdit = lineupId => this.setState({ isEditing: true, editId: lineupId });

  render() {
    const {
      authed,
      lineups,
      isEditing,
      editId,
      selectedLineupId,
    } = this.state;

    const selectedLineup = lineups.find(lineup => lineup.id === selectedLineupId) || { nope: 'nope' };

    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    if (!authed) {
      return (
        <div className="App">
          <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent} />
          {/* <div className="row"> */}
          <Auth isAuthenticated={this.isAuthenticated} />
          {/* </div> */}
        </div>
      );
    }
    return (
      <div className="App">
        <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent} />
        <div className='row'>
          <Lineup
            lineups={lineups}
            SingleLineup={this.deleteOne}
            passLineupToEdit={this.passLineupToEdit}
            onLineupSelection={this.lineupSelectEvent}
          />
        </div>
      </div>
    );
  }
}

export default App;
