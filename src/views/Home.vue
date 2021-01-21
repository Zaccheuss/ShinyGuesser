<template>
  <div class="home">
    <site-header />
    <div class="button-container">
      <b-button v-on:click="navigateToGame()" type="is-primary">Start Game</b-button>
    </div>
    <div class="game-info">
      <div id="options">
        <h3 class="bold-text">Options</h3>
        <div id="checkboxes">
          <div class="field" v-for="region in regions" :key="region.name" @change="saveRegionsToLocalStorage()">
            <b-checkbox v-model="region.isActive">{{ region.name }}</b-checkbox>
          </div>
          <hr>
          <div @change="savePrefToLocalStorage()" id="checkbox-container">
            <b-checkbox v-model="showNames">Show<br>Names</b-checkbox>
          </div>
        </div>
      </div>
      <div id="high-scores">
        <h3 class="bold-text">High Scores</h3>
        <p v-if="hiscores.length === 0">
          You don't have any high scores yet.
        </p>
        <div v-else>
          <ol>
            <li v-for="score in hiscores" :key="score.completionTime + score.score"> 
              {{ score.score }} correct in {{ formatTime(score.completionTime) }}
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SiteHeader from '../components/SiteHeader.vue';
export default {
  components: { SiteHeader },
  name: "Home",
  data() {
    return {
      // ranges are inclusive, both sides
      regions: [
        {
          name: 'Kanto',
          isActive: false,
          games: ['Red', 'Blue'],
          numberRange: [1, 151]
        },
        {
          name: 'Johto',
          isActive: false,
          games: ['Gold', 'Silver'],
          numberRange: [152, 251]
        },
        {
          name: 'Hoenn',
          isActive: false,
          games: ['Ruby', 'Sapphire'],
          numberRange: [252, 386]
        },
        {
          name: 'Sinnoh',
          isActive: false,
          games: ['Diamond', 'Pearl'],
          numberRange: [387, 493]
        },
        {
          name: 'Unova',
          isActive: false,
          games: ['Diamond', 'Pearl'],
          numberRange: [494, 649]
        },
        {
          name: 'Kalos',
          isActive: false,
          games: ['Black', 'White'],
          numberRange: [650, 721]
        },
        {
          name: 'Alola',
          isActive: false,
          games: ['X', 'Y'],
          numberRange: [722, 809]
        },
        {
          name: 'Galar',
          isActive: false,
          games: ['Sun', 'Moon'],
          numberRange: [810, 898]
        }
      ],
      hiscores: [],
      showNames: false
    };
  },
  created() {
    if (localStorage.getItem('regions')) {
      this.regions = JSON.parse(localStorage.getItem('regions'));
    }
    if (localStorage.getItem('hiscore')) {
      this.hiscores = JSON.parse(localStorage.getItem('hiscore'));
    } else {
      localStorage.setItem('hiscore', JSON.stringify([]))
    }
    if (localStorage.getItem('showNames')) {
      localStorage.getItem('showNames') === 'true' ? this.showNames = true : this.showNames = false;
    }
  },
  methods: {
    saveRegionsToLocalStorage: function() {
      localStorage.setItem('regions', JSON.stringify(this.regions));
    },
    savePrefToLocalStorage() {
      localStorage.setItem("showNames", this.showNames);
    },
    navigateToGame: function() {
      // Check to make sure at least one region is checked
      if (!this.regions.some(region => region.isActive)) {
        alert('One or more regions must be selected');
      } else {
        this.$router.push({ name: 'Game', params: {regions: this.regions}})
      }
    }
  }
};
</script>

<style scoped>
div {
  text-align: center;
}

.button-container {
  margin-top: 20px;
  margin-bottom: 20px;
}

.home {
  display: flex;
  flex-direction: column;
}

.game-info {
  display: flex;
  justify-content: center;
}

.bold-text {
  font-size: 20px;
  padding-bottom: 12px;
  font-weight: bold;
}

#high-scores {
  /* background-color: blanchedalmond; */
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#options {
  /* background-color: cadetblue; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 250px;
}

#checkboxes {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

#checkboxes .field:last-of-type {
  margin-bottom: -6px;
}

hr {
  background-color: whitesmoke;
  width: 88px;
  margin: 0px;
  margin-bottom: 8px;
  margin-top: 8px;
}

</style>