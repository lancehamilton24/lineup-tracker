import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import './Auth.scss';
import authRequests from '../../../helpers/data/authRequests';
import bats1 from './bats1.png';

class Auth extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.func,
  }

  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate().then(() => {
      this.props.isAuthenticated();
    }).catch(err => console.error('there was an error with auth', err));
  }

  render() {
    return (
      <div className='Auth' id='hello'>
      <div className="authentication">
        <button className="login" onClick={this.authenticateUser}>
        <h1>Login</h1>
        </button>
        <img src={bats1}/> 
        </div>
      </div>
    );
  }
}

export default Auth;
