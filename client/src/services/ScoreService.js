import axios from 'axios';

const api = process.env.VUE_APP_HIGH_SCORE_API_URL;
console.log(api);

export default {

  getHighScores(regions) {
    return axios.get(api + '/scores', { params: { regions }})
  },

  postHighScore(score) {
    return axios.post(api + '/scores', score);
  }
}