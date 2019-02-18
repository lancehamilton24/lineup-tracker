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
    const makeButtons = () => (
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

    return (
      <div className="lineupCards card">
      <div className="text-center card-header">
        <span className="col-3" onClick={this.lineupClick}>{lineup.name}</span>
      </div>
      <div class="card-body">
  </div>
      <div className="card-footer text-muted">
      {makeButtons()}
      </div>
      </div>
    );
  }
}

export default LineupItem;
