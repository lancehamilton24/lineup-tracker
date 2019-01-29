import React from 'react';
import lineupShape from '../../../helpers/propz/lineupShape';
// import authRequests from '../../../helpers/data/authRequests';
// import playerRequests from '../../../helpers/data/playerRequests';
import './SingleLineup.scss';

class SingleLineup extends React.Component {
  static propTypes = {
    lineup: lineupShape.lineupShape,
  }

  render() {
    return (
      <div className="building col">
        <div className="row">
          <h1>Hello</h1>
        </div>
      </div>
    );
  }
}

export default SingleLineup;
