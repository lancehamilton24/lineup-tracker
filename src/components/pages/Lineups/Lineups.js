import React from 'react';
import './Lineups.scss';
import LineupItem from '../LineupItem/LineupItem';
// import authRequests from '../../../helpers/data/authRequests';
import LineupForm from '../LineupForm/LineupForm';
import lineupRequests from '../../../helpers/data/lineupRequests';
import lineupShape from '../../../helpers/propz/lineupShape';

class Lineups extends React.Component {
  state = {
    lineups: [],
  }

  static propTypes = {
    lineup: lineupShape.lineupShape,
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

  render() {
    const {
      lineups,
    } = this.state;

    const lineupItems = lineups.map(lineup => (
      <LineupItem
        lineup={lineup}
        key={lineup.id}
        deleteSingleLineup={this.deleteOne}
      />
    ));


    return (
      <div className='lineups'>
        <div className="row">
        <LineupForm onSubmit={this.formSubmitLineups} />
        </div>
        <div className="existingLineups">{lineupItems}</div>
      </div>
    );
  }
}

export default Lineups;
