import axios from 'axios';
import apiKeys from '../apiKeys';

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
          playerArray.push(playerObject[playerId]);
        });
      }
      resolve(playerArray);
    })
    .catch((error) => {
      reject(error);
    });
});

export default {
  getAllPlayers,
  getPlayersByLineupId,
};
