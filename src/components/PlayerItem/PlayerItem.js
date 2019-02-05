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
    <div class="container">
    <div class="row">
      <div class="col">
      {player.number}
      </div>
      <div class="col">
      {player.name}
      </div>
      <div class="col">
      {player.position}
      </div>
      <div class="col">
      {player.atBats}
      </div>
      <div class="col">
      {player.hits}
      </div>
      <div class="col">
      {player.walks}
      </div>
      <div class="col">
      {player.strikeouts}
      </div>
      <div class="col">
      {player.inningsPitched}
      </div>
      </div>
      </div>
    );
  }
}

export default PlayerItem;
