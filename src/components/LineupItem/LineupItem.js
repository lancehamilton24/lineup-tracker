import React from 'react';
import PropTypes from 'prop-types';

import lineupShape from '../../helpers/propz/lineupShape';
// import authRequests from '../../helpers/data/authRequests';

import './LineupItem.scss';

class LineupItem extends React.Component {
  static propTypes = {
    lineup: lineupShape.lineupShape,
    onListingSelection: PropTypes.func,
  }

  lineupClick = (e) => {
    e.stopPropagation();
    const { lineup } = this.props;
    console.log(lineup.id);
  }

  render() {
    const { lineup } = this.props;
    // const uid = authRequests.getCurrentUid();

    return (
      <li className="lineup-item text-center" onClick={this.lineupClick}>
        <span className="col-7">{lineup.name}</span>
      </li>
    );
  }
}

export default LineupItem;
