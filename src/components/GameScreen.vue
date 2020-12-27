<template>
  <div class="container">
    <h1>Find the Shiny Pokemon</h1>

    <div
      id="img-container"
      class="box"
      v-for="pokemon in pokeArray"
      :key="pokemon.url"
      v-on:click="onSpriteClick(pokemon)"
    >
      <img v-bind:src="pokemon.url" alt="pokemon sprite to guess" />
    </div>
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
      range: [],
      numberOfSprites: 5,
      pokeArray: [],
      shinyLocation: -1,
      maxRound: 10,
      round: 1,
      numberCorrectGuesses: 0,
    };
  },
  created() {
    const activeRegions = this.$route.params.regions.filter(region => region.isActive);
    activeRegions.forEach(region => {
      const pokeNumberRange = Array.from({length: region.numberRange[1] - region.numberRange[0] + 1}, 
        (_, i) => i + region.numberRange[0]);
      this.range = this.range.concat(pokeNumberRange);
    });
    this.generatePokeArray();

  },
  methods: {
    // Find a unique number given an array of numbers and a range
    findUniqueNumber: function (chosenNumbers) {
      let number;
      do {
        number = this.range[Math.floor(Math.random() * this.range.length)];
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
            numberOfQuestions: this.maxRound,
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

#img-container {
  margin: 50px 20px 50px 0;
  display: inline-block;
}

#img-container:hover {
  background-color: rgba(238, 238, 238, 0.527);
}
</style>