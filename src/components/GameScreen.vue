<template>
  <div class="container">
    <h1>Find the Shiny Pokemon</h1>
    <div>
      <div
        id="img-container"
        class="box"
        v-for="n in numberOfSprites"
        :key="n"
        v-on:click="onSpriteClick(pokeArray[n - 1])"
      >

          <img
          v-show="loaded === pokeArray.length"
            v-bind:src="pokeArray[n - 1].url"
            alt="pokemon sprite to guess"
            :key="pokeArray[n - 1].url"
            v-on:load="test(n)"
          />
          <img src="../assets/loading.gif" alt="loading icon" v-show="loaded !== pokeArray.length">
        <div v-show="loaded === pokeArray.length" v-if="showNames">{{ pokeArray[n - 1].name }}</div>
      </div>
      <div></div>
      <span>{{ round }}</span>
      /
      <span>{{ maxRound }}</span>
    </div>
    <div>Correct guesses: {{ numberCorrectGuesses }}</div>
    <div @change="savePrefToLocalStorage()">
      <b-checkbox v-model="showNames">Show Names</b-checkbox>
    </div>
  </div>
</template>

<script>
import PokeService from "@/services/PokeService.js";
import Vue from 'vue';

export default {
  data() {
    return {
      loaded: 0,
      range: [],
      numberOfSprites: 5,
      pokeArray: 
      [
        {
          url: null,
          name: 'bruh',
          shiny: null
        },
        {
          url: null,
          name: 'bruh',
          shiny: null
        },
        {
          url: null,
          name: 'bruh',
          shiny: null
        },
        {
          url: null,
          name: 'bruh',
          shiny: null
        },
        {
          url: null,
          name: 'bruh',
          shiny: null
        }
      ],
      shinyLocation: -1,
      maxRound: 10,
      round: 1,
      numberCorrectGuesses: 0,
      showNames: false,
    };
  },
  created() {
    console.log(this.pokeArray);
    this.generatePokemonNumberRange();
    this.generatePokeArray();
    if (localStorage.getItem("showNames")) {
      this.showNames = localStorage.getItem("showNames");
    }
  },
  methods: {
    test(n) {
      console.log('img loaded', n, this.loaded,  new Date().getMilliseconds());
      this.loaded++;
    },
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

      this.pokeArray = [
        {
          url: 'require(../assets/logo.png)',
          name: 'bruh',
          shiny: null
        },
        {
          url: 'require(../assets/logo.png)',
          name: 'bruh',
          shiny: null
        },
        {
          url: 'require(../assets/logo.png)',
          name: 'bruh',
          shiny: null
        },
        {
          url: 'require(../assets/logo.png)',
          name: 'bruh',
          shiny: null
        },
        {
          url: 'require(../assets/logo.png)',
          name: 'bruh',
          shiny: null
        }
      ]

      this.loaded = 0;
      const chosenPokemon = [];
      this.shinyLocation = Math.floor(Math.random() * this.numberOfSprites);
      for (let i = 0; i < this.numberOfSprites; i++) {
        chosenPokemon.push(this.findUniqueNumber(chosenPokemon));
        if (i === this.shinyLocation) {
          PokeService.getPokemonInformation(chosenPokemon[i]).then(
            (response) => {
              Vue.set(this.pokeArray, i, ({
                url: response.data.sprites.front_shiny,
                shiny: true,
                name: response.data.name,
              }))
            }
          );
        } else {
          PokeService.getPokemonInformation(chosenPokemon[i]).then(
            (response) => {
              Vue.set(this.pokeArray, i, ({
                url: response.data.sprites.front_default,
                shiny: false,
                name: response.data.name,
              }))
            }
          );
        }
      }
    },
    generatePokemonNumberRange() {
      const activeRegions = this.$route.params.regions.filter(
        (region) => region.isActive
      );
      activeRegions.forEach((region) => {
        const pokeNumberRange = Array.from(
          { length: region.numberRange[1] - region.numberRange[0] + 1 },
          (_, i) => i + region.numberRange[0]
        );
        this.range = this.range.concat(pokeNumberRange);
      });
    },
    savePrefToLocalStorage() {
      localStorage.setItem("showNames", this.showNames);
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
  position: relative;
}

#img-container:hover {
  background-color: rgba(238, 238, 238, 0.527);
  box-shadow: none;
}
</style>