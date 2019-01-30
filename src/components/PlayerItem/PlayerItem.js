import React from 'react';
// import PropTypes from 'prop-types';
// import playerRequests from '../../helpers/data/playerRequests';
import lineupShape from '../../helpers/propz/lineupShape';
// import authRequests from '../../helpers/data/authRequests';

import './PlayerItem.scss';

class PlayerItem extends React.Component {
  state = {
    players: [],
  }

  static propTypes = {
    player: lineupShape.playerShape,
  }

  render() {
    const { player } = this.props;
    // const uid = authRequests.getCurrentUid();

    return (
      <h4 className="player-item text-center">
        <span className="col-7">{player.name}</span>
        <span className="col-7">{player.position}</span>
        <span className="col-7">{player.number}</span>
        <span className="col-7">{player.hits}</span>
      </h4>
    );
  }
}

export default PlayerItem;
