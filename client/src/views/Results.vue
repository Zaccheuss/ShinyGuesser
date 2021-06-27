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
    <p v-if="this.isHighScore">This is a new high score</p>
    <p v-else>You did not place in the top ten score for this region</p>

    <b-field label="Name" class=name-input label-position="on-border">
      <b-input v-model="name"></b-input>
    </b-field>

    <router-link :to="{ name: 'Home' }">
      <b-button @click="logHighScore()">Submit Score</b-button>
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
      name: null,
      isHighScore: false,
      score: null,
      completionTime: null,
    };
  },
  created() {
    this.name = localStorage.getItem("name");
    this.score = this.$route.params.numberOfCorrectGuesses;
    this.completionTime = this.$route.params.completionTime;
    this.checkIfHighScore();
  },
    computed: {
    activeRegions() {
      return this.$store.getters.getActiveRegions;
    },
  },
  methods: {
    // Always log the score in the database regardless of if is in the top ten or not in case fraudulent scores
    // ever need to be removed
    logHighScore() {
      if (this.score > 0) {
        const newHiscore = {
          name: this.name,
          score: this.score,
          completionTime: this.completionTime,
          regions: this.$store.getters.getActiveRegions,
        };
        ScoreService.postHighScore(newHiscore);
      }
    },
    checkIfHighScore() {
      ScoreService.getHighScores(this.activeRegions).then((response) => {
        console.log(response.data, response.data.length < 10);

        const lowestHighScore = response.data[response.data.length - 1];

        if (response.data.length < 10 || lowestHighScore.score < this.score) { 
          this.isHighScore = true;
        } else if (lowestHighScore.score === this.score) {
          if (this.completionTime < lowestHighScore.completionTime) {
            this.isHighScore = true;
          }
        }
      });
    }
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
