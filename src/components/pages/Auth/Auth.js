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
        <img src={baseball} onClick={this.authenticateUser}/> 
        <div className="centered">sign in</div>
        </div>
      </div>
    );
  }
}

export default Auth;
