import React from 'react';
import PropTypes from 'prop-types';
import './Auth.scss';
import authRequests from '../../../helpers/data/authRequests';

import googleButton from './googlebutton.png';

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
        <button className='btn btn-danger' onClick={this.authenticateUser}>
          <img src={googleButton} alt="google login button"/>
        </button>
        </div>
      </div>
    );
  }
}

export default Auth;
