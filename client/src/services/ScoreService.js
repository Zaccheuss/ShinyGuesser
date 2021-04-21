import axios from 'axios';

const api = 'http://localhost:3000';

export default {

  getHighScores(regions) {
    return axios.get(api + '/scores', { params: { regions }})
  },

  postHighScore(score) {
    return axios.post(api + '/scores', score);
  }
}