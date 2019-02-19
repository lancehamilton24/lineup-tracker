import React from 'react';
import PropTypes from 'prop-types';
import './Auth.scss';
import authRequests from '../../../helpers/data/authRequests';
import baseball from '../../../images/baseball.png';

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
      <div className='auth'>
      <div className="container authentication">
      <h1 className="welcome">Welcome to Lineup Tracker!</h1>
        <img src={baseball} onClick={this.authenticateUser}/> 
        <div className="centered"><h1>Click</h1>
        <h3>To Sign In</h3>
        </div>
        </div>
      </div>
    );
  }
}

export default Auth;
