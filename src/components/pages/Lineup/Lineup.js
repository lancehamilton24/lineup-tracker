import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import { ModalFooter } from 'reactstrap';
import LineupItem from '../../LineupItem/LineupItem';
// import PlayerItem from '../../PlayerItem/PlayerItem';
import LineupPlayers from '../LineupView/LineupView';
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
              this.setState({ players: [] });
              this.setState({ newLineupName: '' });
            });
        })
        .catch(err => console.error('error with listings post', err));
    }
  }

  formSubmitPlayer = (newPlayer) => {
    const { lineupId } = this.state;
    playerRequests.postPlayerRequest(newPlayer)
      .then(() => {
        this.setState({ lineupId });
        playerRequests.getPlayersByLineupId(lineupId)
          .then((players) => {
            this.setState({ players });
          });
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
    } = this.state;

    const lineupItems = lineups.map(lineup => (
      <LineupItem
        lineup={lineup}
        deleteSingleLineup={this.deleteOne}
        key={lineup.id}
        passLineupToEdit={this.passLineupToEdit}
        loadSelectedLineup={this.loadSelectedLineup}
        onOpenModal={this.onOpenModal}
      />
    ));
    // const playerItems = players.map(player => (
    //   <PlayerItem
    //     player={player}
    //     key={player.id}
    //   />
    // ));

    return (
      <div className='lineups'>
        <div className='lineupForm'>
          <LineupForm
            onSubmit={this.formSubmitLineup}
            isEditing={isEditing}
            editId={editId}
          />
        </div>
          <div className="existingLineups">{lineupItems}</div>
        <div>
          <Modal className="modal" open={open} onClose={this.onCloseModal} center>
            <LineupPlayers players={players} lineupId={this.state.lineupId}/>
            <div className="playerForm">
            <PlayerForm
              onSubmit={this.formSubmitPlayer}
              players={players}
              onSelect={onLineupSelection}
              lineupId={this.state.lineupId}
              loadSelectedLineup={this.loadSelectedLineup}
            />
            </div>
          </Modal>
        </div>
        <div>
        </div>
      </div>
    );
  }
}

export default Lineup;