<template>
  <div class="container">
    <site-header />
    <h3>
      Final score
    </h3>
    <p>{{ $route.params.numberOfCorrectGuesses }} correct out of {{ $route.params.numberOfQuestions }}</p>
    <p>Completed in {{ formatTime($route.params.completionTime) }}</p>

    <p v-if="isNewHiscore">This is a new hiscore!</p>

    <router-link :to="{ name: 'Home' }">
      <b-button>Back to Start</b-button>
    </router-link>
  </div>
</template>

<script>
import SiteHeader from '../components/SiteHeader.vue';
import ScoreService from '../services/ScoreService.js';
export default {
  components: { SiteHeader },
  data() {
    return {
      isNewHiscore: false,
      isInHiScores: false,
      hiscoreStorage: 5,
    }
  },
  created() {
    this.checkHighScores();
  },
  methods: {
    checkHighScores() {
      const hiscore = JSON.parse(localStorage.getItem('hiscore'));
      // Log high score if none exist yet or if there is still room in high score storage
      if (hiscore.length < this.hiscoreStorage) { 
        this.logHighScore() 
      } else { 
        hiscore.forEach(element => {
          if (element.score < this.$route.params.numberOfCorrectGuesses) {
            this.isInHiScores = true;
          }
        });
      }
      if (this.isInHiScores) { this.logHighScore(); }
    },
    logHighScore() {
      const hiscore = JSON.parse(localStorage.getItem('hiscore'));
      const newHiscore =
        {
          name: "asdf",
          score: this.$route.params.numberOfCorrectGuesses,
          completionTime: this.$route.params.completionTime,
          regions: this.getRegions()
        }
      hiscore.push(newHiscore);
      this.sortHighScores(hiscore);
      // If the new high score is sorted to the beginning of the stored high scores, then
      //it is the highest score 
      if (hiscore[0] === newHiscore) { this.isNewHiscore = true; }

      newHiscore.completionTime /= 10;
      ScoreService.postHighScore(newHiscore)
    },
    sortHighScores(hiscore) {
      function compare(a, b) {
        if (a.score === b.score) { //sort based on time if scores are equal
          return a.completionTime > b.completionTime ? 1 : -1;
        }
        return a.score > b.score ? -1 : 1;
      }
      hiscore.sort(compare);
      if (hiscore.length > this.hiscoreStorage) { //Only store the top 5 hiscores, remove otherwise
        hiscore.pop();
      }
      localStorage.setItem('hiscore', JSON.stringify(hiscore));
    },
    getRegions() {
      const allRegions = JSON.parse(localStorage.getItem('regions'));
      return allRegions
      .filter((region) => region.isActive === true)
      .map((region) => region.name);
    }
  }
}
</script>

<style scoped>

.container {
  text-align: center;
}

h3 {
  font-size: 40px;
  font-weight: bold;
}

button {
  margin-top: 20px;
}

</style>