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
      <div className="playerFormat">
        <div className="individualPlayer row">
          <div className="col s2 s1">
            {player.number}
          </div>
          <div className="col s2">
            {player.name}
          </div>
          <div className="col s2">
            {player.position}
          </div>
          <div className="col s2">
            {player.atBats}
          </div>
          <div className="col s2">
            {player.hits}
          </div>
          <div className="col s2">
            {player.walks}
          </div>
          <div className="col s2">
            {player.strikeouts}
          </div>
        </div>
        <hr></hr>
      </div>
    );
  }
}

export default PlayerItem;