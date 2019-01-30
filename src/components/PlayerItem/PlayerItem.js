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
        {player.name}
        {player.position}
        {player.number}
      </h4>
    );
  }
}

export default PlayerItem;
