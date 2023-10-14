import axios from 'axios';

const api = process.env.VUE_APP_HIGH_SCORE_API_URL;
console.log(api);

export default {

  async getHighScores(regions) {
    return await axios.get(api + '/scores', { params: { regions }})
  },

  async postHighScore(score) {
    return await axios.post(api + '/scores', score);
  }
}
