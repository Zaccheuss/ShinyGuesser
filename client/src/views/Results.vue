<template>
  <div class="container">
    <site-header />
    <h3>
      Final score
    </h3>
    <p>
      {{ $route.params.numberOfCorrectGuesses }} correct out of
      {{ $route.params.numberOfQuestions }}
    </p>
    <p class="pad-bottom">Completed in {{ formatTime($route.params.completionTime) }}</p>

    <b-field label="Name" class=name-input label-position="on-border">
      <b-input v-model="name"></b-input>
    </b-field>

    <router-link :to="{ name: 'Home' }">
      <b-button @click="logHighScore()">Back to Start</b-button>
    </router-link>
  </div>
</template>

<script>
import SiteHeader from "../components/SiteHeader.vue";
import ScoreService from "../services/ScoreService.js";
export default {
  components: { SiteHeader },
  data() {
    return {
      name: null
    };
  },
  created() {
    this.name = localStorage.getItem("name");
  },
  methods: {
    logHighScore() {
      const newHiscore = {
        name: this.name,
        score: this.$route.params.numberOfCorrectGuesses,
        completionTime: this.$route.params.completionTime,
        regions: this.$store.getters.getActiveRegions,
      };
      ScoreService.postHighScore(newHiscore);
    },
  },
  watch: {
    name: function () {
      localStorage.setItem("name", this.name);
    }
  }
};
</script>

<style scoped>
.container {
  text-align: center;
}

.pad-bottom {
  margin-bottom: 20px;
}

.name-input {
  width: 25vw;
  margin: auto;
  display: block;
}

h3 {
  font-size: 40px;
  font-weight: bold;
}

button {
  margin-top: 10px;
}
</style>
