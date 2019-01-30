import React from 'react';
import PropTypes from 'prop-types';
// import playerRequests from '../../helpers/data/playerRequests';
import lineupShape from '../../helpers/propz/lineupShape';
// import authRequests from '../../helpers/data/authRequests';

import './LineupItem.scss';

class LineupItem extends React.Component {
  static propTypes = {
    lineup: lineupShape.lineupShape,
    deleteSingleLineup: PropTypes.func,
    onListingSelection: PropTypes.func,
  }

  lineupClick = (e) => {
    e.stopPropagation();
    const { loadSelectedLineup, lineup } = this.props;
    // const getLineupPlayers = (lineupId) => {
    //   console.log(playerRequests.getPlayersByLineupId(lineupId));
    // };

    loadSelectedLineup(lineup.id);
    console.log(lineup.id);
  }

  deleteLineup = (e) => {
    e.preventDefault();
    const { deleteSingleLineup, lineup } = this.props;
    deleteSingleLineup(lineup.id);
  }

  render() {
    const { lineup } = this.props;
    // const uid = authRequests.getCurrentUid();
    const makeButtons = () => (
          <div>
            <span className="col">
              <button className="btn btn-default" onClick={this.deleteLineup}>
              </button>
            </span>
          </div>
    );

    return (
      <li className="lineup-item text-center" onClick={this.lineupClick}>
        <span className="col-7">{lineup.name}</span>
        {makeButtons()}
      </li>
    );
  }
}

export default LineupItem;
