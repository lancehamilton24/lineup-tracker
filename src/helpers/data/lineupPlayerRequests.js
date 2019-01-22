// import lineupRequests from './lineupRequests';
// import playerRequests from './playerRequests';

// const getLineupsAndPlayers = lineupId => new Promise((resolve, reject) => {
//   let allLineups = [];
//   lineupRequests.getAllLineups()
//     .then((lineupz) => {
//       allLineups = lineupz;
//       playerRequests.getAllPlayers(lineupId).then((playersArray) => {
//         playersArray.push(lineupId);
//         const lineupsToKeep = allLineups.filter(f => playersArray.includes(f.lineupId));
//         resolve(lineupsToKeep);
//       });
//     })
//     .catch(err => reject(err));
// });

// export default { getLineupsAndPlayers };
