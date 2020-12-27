<template>
  <div class="container">
    <h1>Find the Shiny Pokemon</h1>
    <img
      v-for="pokemon in pokeArray"
      :key="pokemon"
      v-bind:src="pokemon.url"
      alt="pokemon sprite to guess"
      v-on:click="onSpriteClick(pokemon)"
    />
    <div>
      <span>{{ round }}</span>
      /
      <span>{{ maxRound }}</span>
    </div>
    <div>Correct guesses: {{ numberCorrectGuesses }}</div>
  </div>
</template>

<script>
import PokeService from "@/services/PokeService.js";

export default {
  data() {
    return {
      range: [0, 893],
      numberOfSprites: 5,
      pokeArray: [],
      shinyLocation: -1,
      maxRound: 10,
      round: 1,
      numberCorrectGuesses: 0,
    };
  },
  created() {
    this.generatePokeArray();
  },
  methods: {
    // Find a unique number given an array of numbers and a range
    findUniqueNumber: function (chosenNumbers) {
      let number;
      do {
        number =
          1 + this.range[0] + Math.floor(Math.random() * this.range[1] + 1);
      } while (chosenNumbers.includes(number));
      return number;
    },
    onSpriteClick(pokemon) {
      if (pokemon.shiny) this.numberCorrectGuesses++;
      if (this.round === 10) {
        this.$router.push({
          name: "Results",
          params: {
            numberOfCorrectGuesses: this.numberCorrectGuesses,
            numberOfQuestions: this.maxRound
          },
        });
      }
      this.round++;
      this.generatePokeArray();
    },
    generatePokeArray() {
      this.pokeArray = [];
      const chosenPokemon = [];
      this.shinyLocation = Math.floor(Math.random() * this.numberOfSprites);
      for (let i = 0; i < this.numberOfSprites; i++) {
        chosenPokemon.push(this.findUniqueNumber(chosenPokemon));

        if (i === this.shinyLocation) {
          PokeService.getShinySprite(chosenPokemon[i]).then((response) => {
            this.pokeArray.push({ url: response.config.url, shiny: true });
          });
        } else {
          PokeService.getSprite(chosenPokemon[i]).then((response) => {
            this.pokeArray.push({ url: response.config.url, shiny: false });
          });
        }
      }
    },
  },
};
</script>

<style scoped>

.container {
  text-align: center;
}

</style>