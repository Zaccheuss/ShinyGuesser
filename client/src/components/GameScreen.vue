<template>
  <div>
    <site-header v-if="!isMobile"/>
    <game-timer @onTick="handleTick($event)" />
    <div class="card-container">
      <div
        id="img-container"
        class="box"
        v-for="n in numberOfSprites"
        :key="n"
        :class="{ green: answerCorrect, red: answerIncorrect }"
        @animationend="
          answerCorrect = false;
          answerIncorrect = false;
        "
        v-on:click="onSpriteClick(pokeArray[n - 1])"
      >
        <img
          class="no-select"
          v-bind:src="pokeArray[n - 1].url"
          alt="pokemon sprite to guess"
          :key="pokeArray[n - 1].url"
          v-on:load="loaded++"
        />

        <div v-if="showNames">
          {{ pokeArray[n - 1].name }}
        </div>
      </div>
    </div>
      <div>
        <span>{{ round }}</span>
        /
        <span>{{ maxRound }}</span>
      </div>
    <div>Correct guesses: {{ numberCorrectGuesses }}</div>
    <div @change="savePrefToLocalStorage()" id="checkbox-container">
      <b-checkbox v-model="showNames">Show Names</b-checkbox>
    </div>
  </div>
</template>

<script>
import PokeService from "@/services/PokeService.js";
import GameTimer from "@/components/GameTimer.vue";
import SiteHeader from './SiteHeader.vue';

export default {
  components: { GameTimer, SiteHeader },
  data() {
    return {
      time: 0,
      loaded: 0,
      range: [],
      numberOfSprites: 5,
      pokeArray: 
      [
        {
          url: null,
          name: '',
          shiny: null
        },
        {
          url: null,
          name: '',
          shiny: null
        },
        {
          url: null,
          name: '',
          shiny: null
        },
        {
          url: null,
          name: '',
          shiny: null
        },
        {
          url: null,
          name: '',
          shiny: null
        }
      ],
      shinyLocation: -1,
      maxRound: 10,
      round: 1,
      numberCorrectGuesses: 0,
      showNames: false,
      answerCorrect: false,
      answerIncorrect: false,
      testImages: [],
      isMobile: false
    };
  },
  created() {
    this.generatePokemonNumberRange();
    this.cacheImages();
    this.isMobile = screen.width <= 760;
  },
  mounted() {
    this.showRound();
    if (localStorage.getItem('showNames')) {
      localStorage.getItem('showNames') === 'true' ? this.showNames = true : this.showNames = false;
    }
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
    onImageLoad() {
      this.loaded++;
    },
    onSpriteClick(pokemon) {
      if (pokemon.shiny) {
        this.numberCorrectGuesses++;
        this.answerCorrect = true;
      } else {
        this.answerIncorrect = true;
      }
      if (this.round === 10) {
        this.$router.push({
          name: "Results",
          params: {
            numberOfCorrectGuesses: this.numberCorrectGuesses,
            numberOfQuestions: this.maxRound,
            completionTime: this.time,
          },
        });
      }
      this.round++;
      this.showRound();
    },
    showRound() {
      this.pokeArray = this.testImages[this.round - 1];
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
    generateRound() {
      const chosenPokemon = [];
      const outputArray = [];
      this.shinyLocation = Math.floor(Math.random() * this.numberOfSprites);
      for (let i = 0; i < this.numberOfSprites; i++) {
        chosenPokemon.push(this.findUniqueNumber(chosenPokemon));
        PokeService.getPokemonInformation(chosenPokemon[i]).then(response => {
          const isShiny = i === this.shinyLocation;
          outputArray.push({
            url: isShiny ? response.data.sprites.front_shiny : response.data.sprites.front_default,
            shiny: isShiny,
            name: response.data.name 
          }); 
        });
      }      
      return outputArray;
    },
    cacheImages() {
      for (let i = 0; i < this.maxRound; i++) {
        this.testImages.push(this.generateRound());
      }
    },
    handleTick(time) {
      this.time = time;
    },
  },
};
</script>

<style scoped>
#img-container {
  margin: 20px 20px 20px 0;
  display: inline-block;
  position: relative;
  width: 136px;
  cursor: pointer;
}

#img-container:hover {
  background-color: rgba(238, 238, 238, 0.527);
  transition: box-shadow 100ms linear;
  box-shadow: none;
}

.green {
  animation: correct-move 600ms 1 ease;
}

.red {
  animation: wrong-move 650ms 1 ease;
}

.box {
  background-color: var(--tile-color);
  color: var(--text-primary-color);
}

@keyframes correct-move {
  from {
    background-color: green;
  }
  to {
    background-color: var(--tile-color);
  }
}

@keyframes wrong-move {
  from {
    background-color: red;
  }
  to {
    background-color: var(--tile-color);
  }
}

@media screen and (max-width: 1020px) {
 
  #img-container {
    width: 95vw;
    margin: 4px 0px 4px 0px;
    padding: 0px;
    height: 15vh;

    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .card-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    padding-top: 1vh;
  }

}

@media screen and (max-height: 675px) and (max-width: 1020px) {
  img {
    height: 12vh;
  }

  #img-container {
    height: 13vh;
  }
}
</style>