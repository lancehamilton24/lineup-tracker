import React from 'react';
// import PropTypes from 'prop-types';
import './Lineups.scss';
import LineupItem from '../../LineupItem/LineupItem';
// import authRequests from '../../../helpers/data/authRequests';
import LineupForm from '../../LineupForm/LineupForm';
import lineupRequests from '../../../helpers/data/lineupRequests';
import lineupShape from '../../../helpers/propz/lineupShape';

class Lineups extends React.Component {
  state = {
    lineups: [],
    lineupId: '',
    isEditing: false,
    editId: '-1',
  }

  static propTypes = {
    lineup: lineupShape.lineupShape,
    // passLineupToEdit: PropTypes.func,
  }

  getLineups = () => {
    lineupRequests.getAllLineups()
      .then((lineups) => {
        this.setState({ lineups });
      });
  };

  componentDidMount() {
    this.getLineups();
  }

  formSubmitLineups = (lineup) => {
    lineupRequests.postRequest(lineup)
      .then(() => {
        // const uid = authRequests.getCurrentUid();
        lineupRequests.getAllLineups()
          .then((lineups) => {
            this.setState({ lineups });
          });
      })
      .catch(err => console.error('error with lineup post', err));
  }

  deleteOne = (lineupId) => {
    lineupRequests.deleteLineup(lineupId)
      .then(() => {
        // const uid = authRequests.getCurrentUid();
        lineupRequests.getAllLineups()
          .then((lineups) => {
            this.setState({ lineups });
          });
      })
      .catch(err => console.error('error with lineup delete', err));
  }

  formSubmitLineup = (newLineupName) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      lineupRequests.updateLineup(editId, newLineupName)
        .then(() => {
          lineupRequests.getAllLineups()
            .then((lineups) => {
              this.setState({ lineups, isEditing: false, editId: '-1' });
            });
        })
        .catch(err => console.error('error with lineups post', err));
    } else {
      lineupRequests.postRequest(newLineupName)
        .then(() => {
          lineupRequests.getAllLineups()
            .then((lineups) => {
              this.setState({ newLineupName });
              // this.setState({ players: [] });
              // this.setState({ newLineupName: '' });
            });
        })
        .catch(err => console.error('error with lineups post', err));
    }
  }

  passLineupToEdit = lineupId => this.setState({ isEditing: true, editId: lineupId });

  render() {
    const {
      lineups,
      isEditing,
      editId,
    } = this.state;

    const lineupItems = lineups.map(lineup => (
      <LineupItem
        lineup={lineup}
        key={lineup.id}
        passLineupToEdit={this.passLineupToEdit}
        deleteSingleLineup={this.deleteOne}
      />
    ));


    return (
      <div className='lineups'>
        <div className="row">
        <LineupForm onSubmit={this.formSubmitLineup} 
            isEditing={isEditing}
            editId={editId} />
        </div>
        <div className="existingLineups">{lineupItems}</div>
      </div>
    );
  }
}

export default Lineups;
