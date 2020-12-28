import axios from 'axios';

const spriteApi = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
const pokeApi = 'https://pokeapi.co/api/v2'

export default {
  getSprite(number) {
    return axios.get(`${spriteApi}/${number}.png`);
  },

  getShinySprite(number) {
    return axios.get(`${spriteApi}/shiny/${number}.png`);
  },

  getPokemonInformation(number) {
    return axios.get(`${pokeApi}/pokemon/${number}`)
  },

}