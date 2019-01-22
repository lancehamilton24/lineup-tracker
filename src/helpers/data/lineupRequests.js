import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllLineups = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/lineups.json`)
    .then((result) => {
      const lineupObject = result.data;
      const lineupArray = [];
      if (lineupObject != null) {
        Object.keys(lineupObject).forEach((lineupId) => {
          lineupObject[lineupId].id = lineupId;
          lineupArray.push(lineupObject[lineupId]);
        });
      }
      resolve(lineupArray);
    })
    .catch((error) => {
      reject(error);
    });
});

export default {
  getAllLineups,
};
