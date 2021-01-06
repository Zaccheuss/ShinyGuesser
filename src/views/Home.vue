<template>
  <div class="home">
    <div class="button-container">
      <b-button v-on:click="navigateToGame()" type="is-primary">Start Game</b-button>
    </div>
    <div id="options">
      <div class="field" v-for="region in regions" :key="region.name" @change="saveRegionsToLocalStorage()"> 
        <b-checkbox v-model="region.isActive">{{ region.name }}</b-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    };
  },
  created() {
    if (localStorage.getItem('regions')) {
      this.regions = JSON.parse(localStorage.getItem('regions'));
    }
  },
  methods: {
    saveRegionsToLocalStorage: function() {
      localStorage.setItem('regions', JSON.stringify(this.regions));
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

#options {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start; /* line up checkboxes */
  align-self: center; /* center options on page */
}
</style>