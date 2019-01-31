import React from 'react';
import PropTypes from 'prop-types';
import './PlayerForm.scss';
import authRequests from '../../../helpers/data/authRequests';
// import playerRequests from '../../../helpers/data/playerRequests';

const defaultPlayer = {
  name: '',
  position: '',
  number: 0,
};

class PlayerForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
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

  formPlayerSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const myPlayer = { ...this.state.newPlayer };
    myPlayer.uid = authRequests.getCurrentUid();
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
      <div className="player-form col">
        <form onSubmit={this.formPlayerSubmit}>
          <div className="form-group">
            <label htmlFor="player">Player Name:</label>
            <input
              type="text"
              className="form-control"
              id="address"
              aria-describedby="addressHelp"
              placeholder="Name"
              value={newPlayer.name}
              onChange={this.playerNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl">Position:</label>
            <input
              type="text"
              className="form-control"
              id="imageUrl"
              aria-describedby="imageUrlHelp"
              placeholder="Position"
              value={newPlayer.position}
              onChange={this.positionChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="squareFootage">Number:</label>
            <input
              type="text"
              className="form-control"
              id="squareFootage"
              aria-describedby="squareFootageHelp"
              placeholder="Number"
              value={newPlayer.number}
              onChange={this.numberChange}
            />
          </div>
          <button className="btn btn-danger">Save Player</button>
        </form>
      </div>
    );
  }
}

export default PlayerForm;
