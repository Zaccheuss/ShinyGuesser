<template>
  <div class="container">
    Final score
    <p>{{ $route.params.numberOfCorrectGuesses }} correct out of {{ $route.params.numberOfQuestions }}</p>
    <p>Completed in: {{ $route.params.completionTime }}</p>

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
      this.logHighScore();
      const hiscore = JSON.parse(localStorage.getItem('hiscore'));
      hiscore.foreach(element => {
        if (element.score < this.$route.params.numberOfCorrectGuesses) {
          this.logHighScore();
        }
      });
    },
    logHighScore() {
      this.isNewHiscore = true;
      const hiscore = JSON.parse(localStorage.getItem('hiscore'));
      const newHiscore =
        {
          score: this.$route.params.numberOfCorrectGuesses,
          completionTime: this.$route.params.completionTime
        }
      hiscore.push(newHiscore);
      this.sortHighScores(hiscore);
    },
    sortHighScores(hiscore) {
      function compare(a, b) {
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