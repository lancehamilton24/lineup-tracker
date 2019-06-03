// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// import lineupShape from '../../../helpers/propz/lineupShape';
// import authRequests from '../../../helpers/data/authRequests';

// import './LineupItem.scss';

// class LineupItem extends Component {
//   static propTypes = {
//     lineup: lineupShape.lineupShape,
//     deleteSingleLineup: PropTypes.func,
//     passLineupToEdit: PropTypes.func,
//   }

//   deleteEvent = (e) => {
//     e.preventDefault();
//     const { deleteSingleLineup, lineup } = this.props;
//     deleteSingleLineup(lineup.id);
//   }

//   editEvent = (e) => {
//     e.preventDefault();
//     const { passLineupToEdit, lineup } = this.props;
//     passLineupToEdit(lineup.id);
//   }

//   lineupClick = (e) => {
//     e.stopPropogation();
//     const { lineup, onSelect } = this.props;
//     onSelect(lineup.id);
//   }

//   render() {
//     const { lineup } = this.props;
//     const uid = authRequests.getCurrentUid();

//     const makeButtons = () => {
//       if (lineup.uid === uid) {
//         return (
//           <div>
//             <span className="col">
//               <Button className="btn btn-default" onClick={this.editEvent}>
//                 Edit
//               </Button>
//             </span>
//             <span className="col">
//               <Button className="btn btn-default" onClick={this.deleteEvent}>
//                 Delete
//               </Button>
//             </span>
//           </div>
//         );
//       }
//       return <span className="col-2"></span>;
          
//       };
//       return (
//         <div>
//           <li className="lineup-item" onClick={this.lineupClick}>
//             <span className="col-7">{lineup.name}</span>
//             {makeButtons()}
//           </li>
//         </div>
//       );
//     }
//   }

//   export default LineupItem;