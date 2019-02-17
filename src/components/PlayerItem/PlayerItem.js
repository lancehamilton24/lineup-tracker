import React from 'react';
import lineupShape from '../../helpers/propz/lineupShape';

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

    return (
      <div class="playerFormat container">
        <div class="individualPlayer row">
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
        <hr></hr>
      </div>
    );
  }
}

export default PlayerItem;
