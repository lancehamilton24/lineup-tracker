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

const deleteLineup = lineupId => axios.delete(`${firebaseUrl}/lineups/${lineupId}.json`);

const postRequest = newLineupName => axios.post(`${firebaseUrl}/lineups.json`, newLineupName);

const getSingleLineup = lineupId => axios.get(`${firebaseUrl}/lineups/${lineupId}.json`);

const updateLineup = (lineupId, lineup) => axios.put(`${firebaseUrl}/lineups/${lineupId}.json`, lineup);

export default {
  getAllLineups,
  deleteLineup,
  postRequest,
  getSingleLineup,
  updateLineup,
};
