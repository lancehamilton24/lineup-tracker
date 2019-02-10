import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
// import { Button } from 'reactstrap';
// import lineupShape from '../../../helpers/propz/lineupShape';
import LineupItem from '../../LineupItem/LineupItem';
import PlayerItem from '../../PlayerItem/PlayerItem';
import './Lineup.scss';
import lineupRequests from '../../../helpers/data/lineupRequests';
import playerRequests from '../../../helpers/data/playerRequests';
import authRequests from '../../../helpers/data/authRequests';
import lineupShape from '../../../helpers/propz/lineupShape';
import LineupForm from '../LineupForm/LineupForm';
import PlayerForm from '../PlayerForm/PlayerForm';


class Lineup extends React.Component {
  state = {
    lineups: [],
    players: [],
    lineupId: '',
    isEditing: false,
    open: false,
    editId: '-1',
  }

  static propTypes = {
    lineup: lineupShape.lineupShape,
    onLineupSelection: PropTypes.func,
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };

  lineupSelectEvent = (id) => {
    this.setState({
      selectedLineupId: id,
    });
  }

  getLineups = () => {
    const uid = authRequests.getCurrentUid();
    lineupRequests.getAllLineups(uid)
      .then((lineups) => {
        this.setState({ lineups });
      });
  };

  loadSelectedLineup = (lineupId) => {
    this.setState({ lineupId });
    playerRequests.getPlayersByLineupId(lineupId)
      .then((players) => {
        this.setState({ players });
      });
  }

  componentDidMount() {
    this.getLineups();
  }

  deleteOne = (lineupId) => {
    lineupRequests.deleteLineup(lineupId)
      .then(() => {
        const uid = authRequests.getCurrentUid();
        lineupRequests.getAllLineups(uid)
          .then((lineups) => {
            this.setState({ lineups });
            this.setState({ players: [] });
          });
      })
      .catch(err => console.error('error with delete single', err));
  }

  formSubmitLineup = (newLineupName) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      lineupRequests.updateLineup(editId, newLineupName)
        .then(() => {
          const uid = authRequests.getCurrentUid();
          lineupRequests.getAllLineups(uid)
            .then((lineups) => {
              this.setState({ lineups, isEditing: false, editId: '-1' });
            });
        })
        .catch(err => console.error('error with listings post', err));
    } else {
      lineupRequests.postRequest(newLineupName)
        .then(() => {
          const uid = authRequests.getCurrentUid();
          lineupRequests.getAllLineups(uid)
            .then((lineups) => {
              this.setState({ lineups });
              this.setState({ players: [] })
              this.setState({ newLineupName: [] })
            });
        })
        .catch(err => console.error('error with listings post', err));
    }
  }

  formSubmitPlayer = (newPlayer) => {
    playerRequests.postPlayerRequest(newPlayer)
      .then((lineupId) => {
        this.setState({ lineupId })
        // playerRequests.getPlayersByLineupId(lineupId);
      })
      .catch(err => console.error('error with listings post', err));
  }

  passLineupToEdit = lineupId => this.setState({ isEditing: true, editId: lineupId });

  render() {
    const {
      lineups,
      onLineupSelection,
      isEditing,
      editId,
      open,
      players,
      // players,
      // selectedLineupId,
    } = this.state;

    // const selectedLineup = lineups.find(lineup => lineup.id === selectedLineupId) || { nope: 'nope' };
    // console.log(selectedLineup);
    const lineupItems = lineups.map(lineup => (
      <LineupItem
      lineup={lineup}
      deleteSingleLineup={this.deleteOne}
      key={lineup.id}
      // onSelect={onLineupSelection}
      passLineupToEdit={this.passLineupToEdit}
      loadSelectedLineup={this.loadSelectedLineup}
      onOpenModal={this.onOpenModal}
      />
    ));
    const playerItems = players.map(player => (
      <PlayerItem
      player={player}
      key={player.id}
      />
    ));

    return (
      <div className='Lineup'>
      <div className='lineupForm'>
          <LineupForm
          onSubmit={this.formSubmitLineup}
          isEditing={isEditing}
          editId={editId}
          />
          </div>
        <div>
          <h2>Current Lineups</h2>
          <div>{lineupItems}</div>
        </div>
        <div>
        <Modal open={open} onClose={this.onCloseModal} center> 
        <div class="container">
      <div class="row">
      <div class="col">
      <h3>Number</h3>
      </div>
      <div class="col">
      <h3>Name</h3>
      </div>
      <div class="col">
      <h3>Position</h3>
      </div>
      <div class="col">
      <h3>At-Bats</h3>
      </div>
      <div class="col">
      <h3>Hits</h3>
      </div>
      <div class="col">
      <h3>Walks</h3>
      </div>
      <div class="col">
      <h3>Strikeouts</h3>
      </div>
      <div class="col">
      <h3>Innings Pitched</h3>
      </div>
      </div>
      <h5>{playerItems}</h5>
      </div>
      <h2>Add New Player</h2>
          <PlayerForm
           onSubmit={this.formSubmitPlayer}
           onSelect={onLineupSelection}
           lineupId={this.state.lineupId}
           />
      </Modal>
        </div>
        <div>
        </div>
      </div>
    );
  }
}

export default Lineup;
