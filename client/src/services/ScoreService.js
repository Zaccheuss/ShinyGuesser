import axios from 'axios';

const api = 'http://localhost:3000';

export default {
  postHighScore(score) {
    console.log(score);
    return axios.post(api + '/scores', score);
  }
}