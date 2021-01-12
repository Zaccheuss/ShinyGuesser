<template>
  <div class="container">
    Final score
    <p>{{ $route.params.numberOfCorrectGuesses }} correct out of {{ $route.params.numberOfQuestions }}</p>
    <p>Completed in: {{ $route.params.completionTime }}</p>

    <p v-if="newHiscore">This is a new hiscore!</p>

    <router-link :to="{ name: 'Home' }">
      <b-button>Back to Start</b-button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newHiscore: false,
    }
  },
  created() {
    this.checkHighScores();
  },
  methods: {
    checkHighScores() {
      if (localStorage.getItem('hiscore')) {
        const hiscore = JSON.parse(localStorage.getItem('hiscore'));
        console.log('bruh', hiscore.score, this.$route.params.numberOfCorrectGuesses);
        if (hiscore.score < this.$route.params.numberOfCorrectGuesses) {
          console.log('new hiscore');
          this.logNewHighScore();
        }
      } else { // If nothing is found in localstorage, log the current score as the highscore
        this.logNewHighScore();
      }
    },
    logNewHighScore() {
      this.newHiscore = true;
      const hiscore = {
          score: this.$route.params.numberOfCorrectGuesses,
          completionTime: this.$route.params.completionTime
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