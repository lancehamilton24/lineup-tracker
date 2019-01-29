import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
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

  // lineupClick = (e) => {
  //   e.stopPropagation();
  //   const { lineup } = this.props;
  //   const getLineupPlayers = (lineupId) => {
  //     console.log(playerRequests.getPlayersByLineupId(lineupId));
  //   };
  
  //   getLineupPlayers(lineup.id);
  //   console.log(lineup.id);
  // }

  editLineup = (e) => {
    e.preventDefault();
    const { passLineupToEdit, lineup } = this.props;
    passLineupToEdit(lineup.id);
  }

  deleteLineup = (e) => {
    e.preventDefault();
    const { deleteSingleLineup, lineup } = this.props;
    deleteSingleLineup(lineup.id);
  }

  render() {
    const { lineup } = this.props;
    // const uid = authRequests.getCurrentUid();
    const makeButtons = () => {
      return (
          <div>
            <span className="col">
              <Button className="btn btn-default" onClick={this.deleteLineup}>Delete</Button>
            </span>
            <span className="col">
              <Button className="btn btn-default" onClick={this.editLineup}>Edit</Button>
            </span>
          </div>
      );
    };

    return (
      <li className="lineup-item text-center">
        <span className="col-7" onClick={this.props.loadSelectedLineup}>{lineup.name}</span>
        {makeButtons()}
      </li>
    );
  }
}

export default LineupItem;
