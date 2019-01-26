import React from 'react';
import PropTypes from 'prop-types';
// import lineupShape from '../../../helpers/propz/lineupShape';
import LineupItem from '../../LineupItem/LineupItem';
import './ViewLineup.scss';
import lineupRequests from '../../../helpers/data/lineupRequests';
import authRequests from '../../../helpers/data/authRequests';
import lineupShape from '../../../helpers/propz/lineupShape';


class ViewLineup extends React.Component {
  state = {
    lineups: [],
    selectedLineupId: -1,
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

  componentDidMount() {
    this.getLineups();
  }
  
  render() {
    const {
      lineups,
      onLineupSelection,
      selectedLineupId,
    } = this.state;

    const selectedLineup = lineups.find(lineup => lineup.id === selectedLineupId) || { nope: 'nope' };
    console.log(selectedLineup);
    const lineupItems = lineups.map(lineup => (
      <LineupItem
      lineup={lineup}
      key={lineup.id}
      onSelect={onLineupSelection}
      />
    ));

    return (
      <div className='ViewLineup'>
            <p>View Lineup</p>
        <div>
            <ul>{lineupItems}</ul>
        </div>
      </div>
    );
  }
}

export default ViewLineup;
