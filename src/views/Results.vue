<template>
  <div class="container">
    Final score
    <p>{{ $route.params.numberOfCorrectGuesses }} correct out of {{ $route.params.numberOfQuestions }}</p>
    <p>Completed in: {{ formatTime($route.params.completionTime) }}</p>

    <p v-if="isNewHiscore">This is a new hiscore!</p>

    <router-link :to="{ name: 'Home' }">
      <b-button>Back to Start</b-button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isNewHiscore: false,
      hiscoreStorage: 5,
    }
  },
  created() {
    this.checkHighScores();
  },
  methods: {
    checkHighScores() {
      const hiscore = JSON.parse(localStorage.getItem('hiscore'));
      console.log(hiscore);
      // Log high score if none exist yet or if there is still room in high score storage
      if (hiscore.length < this.hiscoreStorage) { 
        this.logHighScore() 
      } else { 
        hiscore.forEach(element => {
          if (element.score < this.$route.params.numberOfCorrectGuesses) {
            this.logHighScore();
          }
        });
      }
    },
    logHighScore() {
      const hiscore = JSON.parse(localStorage.getItem('hiscore'));
      const newHiscore =
        {
          score: this.$route.params.numberOfCorrectGuesses,
          completionTime: this.$route.params.completionTime
        }
      hiscore.push(newHiscore);
      this.sortHighScores(hiscore);
      // If the new high score is sorted to the beginning of the stored high scores, then
      //it is the highest score 
      if (hiscore[0] === newHiscore) { this.isNewHiscore = true; }
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
    }
  }
}
</script>

<style scoped>

.container {
  text-align: center;
}

</style>