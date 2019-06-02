import React from 'react';
import PropTypes from 'prop-types';
import LineupItem from '../../LineupItem/LineupItem';
import './Lineup.scss';
import lineupShape from '../../../helpers/propz/lineupShape';

class Lineup extends React.Component {
  static propTypes = {
    lineups: PropTypes.arrayOf(lineupShape.lineupShape),
    deleteSingleLineup: PropTypes.func,
    passLineupToEdit: PropTypes.func,
    onLineupSelection: PropTypes.func,
  }

  render() {
    const {
      lineups,
      onLineupSelection,
      deleteSingleLineup,
      passLineupToEdit,
    } = this.props;

    const lineupItems = lineups.map(lineup => (
      <LineupItem
        lineup={lineup}
        deleteSingleLineup={deleteSingleLineup}
        key={lineup.id}
        passLineupToEdit={passLineupToEdit}
        onSelect={onLineupSelection}
      />
    ));
    return (
      <div className='lineups'>
        <h3>Lineups</h3>
        <ul>{lineupItems}</ul>
      </div>
    );
  }
}

export default Lineup;
