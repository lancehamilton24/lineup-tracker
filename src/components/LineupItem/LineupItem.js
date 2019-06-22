import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import lineupShape from '../../helpers/propz/lineupShape';
import './LineupItem.scss';

class LineupItem extends React.Component {
  static propTypes = {
    lineup: lineupShape.lineupShape,
    deleteSingleLineup: PropTypes.func,
    passLineupToEdit: PropTypes.func,
  }

  deleteLineup = (e) => {
    e.preventDefault();
    const { deleteSingleLineup, lineup } = this.props;
    deleteSingleLineup(lineup.id);
  }

  editLineup = (e) => {
    e.preventDefault();
    const { passLineupToEdit, lineup } = this.props;
    passLineupToEdit(lineup.id);
  }

  render() {
    const { lineup } = this.props;

    return (
      <div className="lineupCards card">
        <div className="card-body">
        <span className="col-3">{lineup.name}</span>
        <Button outline color="info" onClick={this.editLineup}>Edit</Button>
        <Button outline color="info" onClick={this.deleteLineup}>Delete</Button>
        </div>
      </div>
    );
  }
}

export default LineupItem;
