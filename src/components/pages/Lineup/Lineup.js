import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';
import Modal from 'react-responsive-modal';
// import { ModalFooter } from 'reactstrap';
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
    isActive: false,
    editId: '-1',
    isHidden: true,
  }

  static propTypes = {
    lineup: lineupShape.lineupShape,
    onLineupSelection: PropTypes.func,
  }

  toggleHidden = () => {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
    this.setState({ isHidden: true });
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
      isHidden,
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

    const noLineupData = () => {
      if (lineups.length === 0) {
        return (
          <p>You have not created any lineups yet! Please begin by entering your lineup name above!</p>
        );
      }
      return (
        <p>Select lineup name to view, add, and edit players</p>
      );
    };

    const hideAddPlayerBtn = () => {
      if (isHidden === true) {
        return (
          <a onClick={this.toggleHidden.bind(this)} class="btn-floating btn-large waves-effect waves-light red"><FontAwesomeIcon icon={faPlus} /></a>
        );
      }
      return (
        <div></div>
      );
    };

    return (
      <div className="container">
        <div className='lineups'>
          <div className='lineupForm'>
            <LineupForm
              onSubmit={this.formSubmitLineup}
              isEditing={isEditing}
              editId={editId}
            />
          </div>
          <div>
            {noLineupData()}
          </div>
          <div className="existingLineups">{lineupItems}</div>
          <div>
            <Modal className="modal" open={open} onClose={this.onCloseModal} center>
              <LineupPlayers players={players} lineupId={this.state.lineupId} />
              <div className="playerForm">
                {!this.state.isHidden && <PlayerForm
                  onSubmit={this.formSubmitPlayer}
                  players={players}
                  onSelect={onLineupSelection}
                  lineupId={this.state.lineupId}
                  loadSelectedLineup={this.loadSelectedLineup}
                  onClick={this.toggleHidden.bind(this)}
                  isHidden={isHidden}
                />}
              </div>
              <div className="addPlayerBtn">{hideAddPlayerBtn()}</div>
            </Modal>
          </div>
          <div>
          </div>
        </div>
      </div>
    );
  }
}

export default Lineup;