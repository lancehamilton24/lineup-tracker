import React from 'react';
import lineupShape from '../../helpers/propz/lineupShape';

// import './PlayerItem.scss';

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
      <div className="playerFormat container">
        <div className="individualPlayer row">
          <div className="col">
            {player.number}
          </div>
          <div className="col">
            {player.name}
          </div>
          <div className="col">
            {player.position}
          </div>
          <div className="col">
            {player.atBats}
          </div>
          <div className="col">
            {player.hits}
          </div>
          <div className="col">
            {player.walks}
          </div>
          <div className="col">
            {player.strikeouts}
          </div>

        </div>
        <hr></hr>
      </div>
    );
  }
}

export default PlayerItem;