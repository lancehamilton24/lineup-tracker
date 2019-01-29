import React from 'react';
import PropTypes from 'prop-types';
// import lineupShape from '../../../helpers/propz/lineupShape';
import LineupItem from '../../LineupItem/LineupItem';
import './ViewLineup.scss';
import lineupRequests from '../../../helpers/data/lineupRequests';
import authRequests from '../../../helpers/data/authRequests';
import lineupShape from '../../../helpers/propz/lineupShape';
import SingleLineup from '../SingleLineup/SingleLineup';


class ViewLineup extends React.Component {
  state = {
    lineups: [],
    selectedLineupId: -1,
    isEditing: false,
    editId: '-1',
  }

  static propTypes = {
    lineup: lineupShape.lineupShape,
    onLineupSelection: PropTypes.func,
  }

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

  loadSelectedLineup = () => {
    alert('hello');
  }

  componentDidMount() {
    this.getLineups();
  }

  deleteOne = (lineupId) => {
    lineupRequests.deleteLineup(lineupId)
      .then(() => {
        console.log('hello');
        const uid = authRequests.getCurrentUid();
        lineupRequests.getAllLineups(uid)
          .then((lineups) => {
            this.setState({ lineups });
          });
      })
      .catch(err => console.error('error with delete single', err));
  }

  passLineupToEdit = lineupId => this.setState({ isEditing: true, editId: lineupId });

  render() {
    const {
      lineups,
      onLineupSelection,
      isEditing,
      editId,
      // selectedLineupId,
    } = this.state;

    // const selectedLineup = lineups.find(lineup => lineup.id === selectedLineupId) || { nope: 'nope' };
    // console.log(selectedLineup);
    const lineupItems = lineups.map(lineup => (
      <LineupItem
      lineup={lineup}
      deleteSingleLineup={this.deleteOne}
      key={lineup.id}
      onSelect={onLineupSelection}
      passLineupToEdit={this.passLineupToEdit}
      loadSelectedLineup={this.loadSelectedLineup}
      />
    ));

    return (
      <div className='ViewLineup'>
            <p>View Lineup</p>
        <div>
            <ul>{lineupItems}</ul>
        </div>
        <div>
          <SingleLineup onSubmit={this.formSubmitEvent} isEditing={isEditing} editId={editId}/>
        </div>
      </div>
    );
  }
}

export default ViewLineup;
