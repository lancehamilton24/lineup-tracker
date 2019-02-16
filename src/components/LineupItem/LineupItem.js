import React from 'react';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';
import { Button } from 'reactstrap';

// import playerRequests from '../../helpers/data/playerRequests';
import lineupShape from '../../helpers/propz/lineupShape';

// import authRequests from '../../helpers/data/authRequests';

import './LineupItem.scss';

class LineupItem extends React.Component {
  static propTypes = {
    player: lineupShape.playerShape,
    lineup: lineupShape.lineupShape,
    deleteSingleLineup: PropTypes.func,
    onLineupSelection: PropTypes.func,
  }

  lineupClick = (e) => {
    e.stopPropagation();
    const { loadSelectedLineup, lineup, onOpenModal } = this.props;
    // const getLineupPlayers = (lineupId) => {
    //   console.log(playerRequests.getPlayersByLineupId(lineupId));
    // };

    loadSelectedLineup(lineup.id);
    onOpenModal();
  }

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
    const makeButtons = () => (
          <div>
            <span className="col">
              <Button outline color="info" onClick={this.editLineup}>
                Edit
              </Button>
            </span>
            <span className="col">
              <Button outline color="danger" onClick={this.deleteLineup}>
              Delete
              </Button>
            </span>
          </div>
    );

    return (
      <div className="card">
      <div className="lineup-item text-center card-body">
        <span className="col-3" onClick={this.lineupClick}>{lineup.name}</span>
      </div>
      {makeButtons()}
      </div>
    );
  }
}

export default LineupItem;
