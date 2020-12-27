import axios from 'axios';

const spriteApi = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

export default {
  getSprite(number) {
    return axios.get(`${spriteApi}/${number}.png`);
  },

  getShinySprite(number) {
    return axios.get(`${spriteApi}/shiny/${number}.png`);
  }
}