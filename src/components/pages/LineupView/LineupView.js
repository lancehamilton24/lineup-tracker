import React, { Component } from 'react';
import PlayerItem from '../../PlayerItem/PlayerItem';
import playerRequests from '../../../helpers/data/playerRequests';
import './LineupView.scss';

export class LineupView extends Component {
  state = {
    // players: this.props.players,
  }

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

    if (players.length > 0) {
      return (
        <div>
          <div className="row">
            <div className="col s1">
              <h6>Number</h6>
            </div>
            <div className="col s1">
              <h6>Name</h6>
            </div>
            <div className="col s1">
              <h6>Position</h6>
            </div>
            <div className="col s1">
              <h6>At-Bats</h6>
            </div>
            <div className="col s1">
              <h6>Hits</h6>
            </div>
            <div className="col s1">
              <h6>Walks</h6>
            </div>
            <div className="col s1">
              <h6>Strikeouts</h6>
            </div>
          </div>
          <hr></hr>
          <h5>{playerItems}</h5>
        </div>
      );
    }
    return (
      <div><h6>You do not currently have any players in this lineup</h6></div>
    );
  }
}

export default LineupView;
