import React, { Component } from 'react';
import PlayerItem from '../../PlayerItem/PlayerItem';
import playerRequests from '../../../helpers/data/playerRequests';

export class LineupView extends Component {
  state = {
    players: this.props.players,
  }

  // componentDidMount() {
      
  // }

  render() {
    const {
      players,
    } = this.props;

    const playerItems = players.map(player => (
      <PlayerItem
        player={player}
        key={player.id}
      />
    ));
    return (
      <div className="container">
              <div className="row">
                <div className="col">
                  <h3>Number</h3>
                </div>
                <div className="col">
                  <h3>Name</h3>
                </div>
                <div className="col">
                  <h3>Position</h3>
                </div>
                <div className="col">
                  <h3>At-Bats</h3>
                </div>
                <div className="col">
                  <h3>Hits</h3>
                </div>
                <div className="col">
                  <h3>Walks</h3>
                </div>
                <div className="col">
                  <h3>Strikeouts</h3>
                </div>
              </div>
              <hr></hr>
              <h5>{playerItems}</h5>
            </div>
    );
  }
}

export default LineupView;
