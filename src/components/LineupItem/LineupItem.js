import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import lineupShape from '../../helpers/propz/lineupShape';

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

    const lineupEditDeleteBtn = () => {
      return (
      <div>
        <span className="editLineup col">
          <Button outline color="info" onClick={this.editLineup}>
            Edit
              </Button>
        </span>
        <span className="deleteLineup col">
          <Button outline color="danger" onClick={this.deleteLineup}>
            Delete
              </Button>
        </span>
      </div>
      );
    };

    const lineupPage = () => {
      if (lineup.name === 0) {
        return (
          <h1>No data</h1>
        );
      }
      return (
        <div className="lineupCards card">
            <h2 onClick={this.lineupClick}>{lineup.name}</h2>
            {lineupEditDeleteBtn()}
        </div>
      );
    };

    return (
      <div>
        {lineupPage()}
      </div>
    );
  }
}

export default LineupItem;