import axios from 'axios';
import apiKeys from '../apiKeys';
// import lineupRequests from './lineupRequests';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllPlayers = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/players.json`)
    .then((result) => {
      const playerObject = result.data;
      const playerArray = [];
      if (playerObject != null) {
        Object.keys(playerObject).forEach((playerId) => {
          playerObject[playerId].id = playerId;
          playerArray.push(playerObject[playerId]);
        });
      }
      resolve(playerArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getPlayersByLineupId = lineupId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/players.json?orderBy="lineupId"&equalTo="${lineupId}"`)
    .then((result) => {
      const playerObject = result.data;
      const playerArray = [];
      if (playerObject != null) {
        Object.keys(playerObject).forEach((playerId) => {
          playerObject[playerId].id = playerId;
          playerArray.push(playerObject[playerId].lineupId);
        });
      }
      resolve(playerArray);
    })
    .catch((error) => {
      reject(error);
    });
});

// const getPlayersByLineupId = () => new Promise((resolve, reject) => {
//   let lineups = [];
//   lineupRequests.getAllLineups()
//     .then((lineupz) => {
//       lineups = lineupz;
//       getAllPlayers()
//         .then((plyrs) => {
//           const players = plyrs.map(plyr => Object.assign({ ...plyr, ...lineups.find(x => x.lineupId === plyr.lineupId)}));
//           resolve(players);
//         });
//     })
//     .catch(err => reject(err));
// });

export default {
  getAllPlayers,
  getPlayersByLineupId,
};
