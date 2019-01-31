import React from 'react';
import './Home.scss';
import { Button } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div className='Home'>
            <p>Home Page</p>
            {/* <Button
    color="success"
    size="large"
    tag={RRNavLink}
    to='/createlineup/:lineupId'
>
    Create Lineup
</Button> */}
<Button
    color="success"
    size="large"
    tag={RRNavLink}
    to='/viewlineup'
>
    View Lineup
</Button>
      </div>
    );
  }
}

export default Home;
