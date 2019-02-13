import React from 'react';
import PropTypes from 'prop-types';
import './PlayerForm.scss';
import authRequests from '../../../helpers/data/authRequests';
// import playerRequests from '../../../helpers/data/playerRequests';

const defaultPlayer = {
  name: '',
  position: '',
  number: 0,
  atBats: 0,
  hits: 0,
  walks: 0,
  strikeouts: 0,
  inningsPitched: 0
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

  inningsChange = e => this.formFieldStringAndNumberState('inningsPitched', e);

  formPlayerSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const myPlayer = { ...this.state.newPlayer };
    myPlayer.uid = authRequests.getCurrentUid();
    myPlayer.lineupId = this.props.lineupId;
    onSubmit(myPlayer);
    this.setState({ newPlayer: defaultPlayer });
  }

  // componentDidUpdate(prevProps) {
  //   const { isEditing, editId } = this.props;
  //   if (prevProps !== this.props && isEditing) {
  //     eventRequests.getSingleEvent(editId)
  //       .then((event) => {
  //         this.setState({ newListing: event.data });
  //       })
  //       .catch(err => console.error('error with getSingleListing', err));
  //   }
  // }

  render() {
    const { newPlayer } = this.state;
    // const { isEditing } = this.props;
    return (
      <div className="player-form">
        <form class="pure-form" onSubmit={this.formPlayerSubmit}>
        <div class="top-row">
          <div className="form-group" id="top-row">
            <label htmlFor="player">Player Name:</label>
            <input
              type="text"
              placeholder="Name"
              value={newPlayer.name}
              onChange={this.playerNameChange}
            />
          </div>
          <div className="form-group" id="top-row">
            <label htmlFor="imageUrl">Position:</label>
            <input
              type="text"
              placeholder="Position"
              value={newPlayer.position}
              onChange={this.positionChange}
            />
          </div>
          <div className="form-group" id="top-row">
            <label htmlFor="Number">Number:</label>
            <input
              type="text"
              placeholder="Number"
              value={newPlayer.number}
              onChange={this.numberChange}
            />
          </div>
          </div>
          <div className="battingStats">
          <div className="form-group" id="battingStats">
            <label htmlFor="squareFootage">At Bats:</label>
            <input
              type="text"
              placeholder="At Bats"
              value={newPlayer.atBats}
              onChange={this.atBatChange}
            />
          </div>
          <div className="form-group" id="battingStats">
            <label htmlFor="squareFootage">Hits:</label>
            <input
              type="text"
              placeholder="Hits"
              value={newPlayer.hits}
              onChange={this.hitChange}
            />
          </div>
          <div className="form-group" id="battingStats">
            <label htmlFor="squareFootage">Walks:</label>
            <input
              type="text"
              placeholder="Walks"
              value={newPlayer.walks}
              onChange={this.walkChange}
            />
          </div>
          <div className="form-group" id="battingStats">
            <label htmlFor="squareFootage">Strikeouts:</label>
            <input
              type="text"
              placeholder="Strike-outs"
              value={newPlayer.strikeouts}
              onChange={this.strikeoutChange}
            />
          </div>
          </div>
          <div className="form-group">
            <label htmlFor="squareFootage">IP:</label>
            <input
              type="text"
              placeholder="Innings Pitched"
              value={newPlayer.inningsPitched}
              onChange={this.inningsChange}
            />
          </div>
          <button className="btn btn-danger">Save Player</button>
        </form>
      </div>
    );
  }
}

export default PlayerForm;
