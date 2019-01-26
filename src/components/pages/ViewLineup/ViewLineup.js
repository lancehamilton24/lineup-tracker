import React from 'react';
// import lineupShape from '../../../helpers/propz/lineupShape';
import LineupItem from '../../LineupItem/LineupItem';
import './ViewLineup.scss';
import lineupRequests from '../../../helpers/data/lineupRequests';
import authRequests from '../../../helpers/data/authRequests';

class ViewLineup extends React.Component {
  state = {
    lineups: [],
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
    } = this.state;

    const lineupItems = lineups.map(lineup => (
      <LineupItem
      lineup={lineup}
      key={lineup.id}
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
