import React from 'react';
import PropTypes from 'prop-types';
import './PlayerForm.scss';
import authRequests from '../../../helpers/data/authRequests';

const defaultPlayer = {
  name: '',
  position: '',
  number: 0,
  atBats: 0,
  hits: 0,
  walks: 0,
  strikeouts: 0,
};

class PlayerForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    lineupId: PropTypes.string,
  }

  state = {
    newPlayer: defaultPlayer,
  }

  formFieldStringAndNumberState = (name, e) => {
    e.preventDefault();
    const tempPlayer = { ...this.state.newPlayer };
    tempPlayer[name] = e.target.value;
    this.setState({ newPlayer: tempPlayer });
  }

  playerNameChange = e => this.formFieldStringAndNumberState('name', e);

  positionChange = e => this.formFieldStringAndNumberState('position', e);

  numberChange = e => this.formFieldStringAndNumberState('number', e);

  atBatChange = e => this.formFieldStringAndNumberState('atBats', e);

  hitChange = e => this.formFieldStringAndNumberState('hits', e);

  walkChange = e => this.formFieldStringAndNumberState('walks', e);

  strikeoutChange = e => this.formFieldStringAndNumberState('strikeouts', e);

  formPlayerSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const myPlayer = { ...this.state.newPlayer };
    myPlayer.uid = authRequests.getCurrentUid();
    myPlayer.lineupId = this.props.lineupId;
    onSubmit(myPlayer);
    this.setState({ newPlayer: defaultPlayer });
  }

  render() {
    const { newPlayer } = this.state;
    return (
      <div className="newPlayerForm">
        <form className="pure-form" onSubmit={this.formPlayerSubmit}>
        <h2>Add New Player</h2>
          <div className="basicLineup">
            <div className="form-group" id="basicStats">
              <label>Player Name:</label>
              <input
                type="text"
                placeholder="Name"
                value={newPlayer.name}
                onChange={this.playerNameChange}
              />
            </div>
            <div className="form-group" id="basicStats">
              <label>Position:</label>
              <input
                type="text"
                placeholder="Position"
                value={newPlayer.position}
                onChange={this.positionChange}
              />
            </div>
            <div className="form-group" id="basicStats">
              <label>Number:</label>
              <input
                type="text"
                placeholder="Number"
                value={newPlayer.number}
                onChange={this.numberChange}
              />
            </div>
          </div>
          <div className="battingLineup">
            <div className="form-group" id="battingStats">
              <label>At Bats:</label>
              <input
                type="text"
                placeholder="At Bats"
                value={newPlayer.atBats}
                onChange={this.atBatChange}
              />
            </div>
            <div className="form-group" id="battingStats">
              <label>Hits:</label>
              <input
                type="text"
                placeholder="Hits"
                value={newPlayer.hits}
                onChange={this.hitChange}
              />
            </div>
            <div className="form-group" id="battingStats">
              <label>Walks:</label>
              <input
                type="text"
                placeholder="Walks"
                value={newPlayer.walks}
                onChange={this.walkChange}
              />
            </div>
            <div className="form-group" id="battingStats">
              <label>Strikeouts:</label>
              <input
                type="text"
                placeholder="Strike-outs"
                value={newPlayer.strikeouts}
                onChange={this.strikeoutChange}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default PlayerForm;
