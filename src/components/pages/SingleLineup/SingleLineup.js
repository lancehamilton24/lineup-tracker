// import React from 'react';
// import lineupShape from '../../../helpers/propz/lineupShape';
// // import authRequests from '../../../helpers/data/authRequests';
// import playerRequests from '../../../helpers/data/playerRequests';
// import './SingleLineup.scss';

// class SingleLineup extends React.Component {
//   static propTypes = {
//     lineup: lineupShape.lineupShape,
//   }

//   lineupSelectEvent = (id) => {
//     this.setState({
//       selectedLineupId: id,
//     });
//   }

//   getPlayers = (lineupId) => {
//     playerRequests.getPlayersByLineupId(lineupId)
//       .then((lineups) => {
//         this.setState({ lineups });
//       });
//   };

//   componentDidMount() {
//     this.getPlayers();
//   }

//   render() {
//     const { lineup } = this.props;
//     return (
//       <div className="building col">
//         <div className="row">
//           <h1>Hello</h1>
//           <h2>{lineup.name}</h2>
//         </div>
//       </div>
//     );
//   }
// }

// export default SingleLineup;
