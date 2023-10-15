<template>
  <div>
    <p v-if="activeRegions.length === 0">Select a region to load high scores</p>
    <p v-else-if="loading">Loading...</p>
    <p v-else-if="errorMessage">{{ errorMessage }}</p>
    <div v-else class="table">
      <table>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">name</th>
            <th scope="col">score</th>
            <th scope="col">time</th>
            <th scope="col">date</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(score, index) in highScores"
            :key="score.id"
          >
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ score.name }}</td>
            <td>{{ score.score }}</td>
            <td>{{ formatTime(score.completion_time) }}</td>
            <td>{{ score.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ScoreService from "../services/ScoreService.js";

export default {
  data() {
    return {
      highScores: [],
      loading: true,
      errorMessage: undefined
    };
  },
  computed: {
    activeRegions() {
      return this.$store.getters.getActiveRegions;
    },
  },
  watch: {
    activeRegions() {
      this.getHighScores();
    },
  },
  created() {
    this.getHighScores();
  },
  methods: {
    async getHighScores() {
      if (this.highScores.length < 0) return
      try { 
        await ScoreService.getHighScores(this.activeRegions).then((response) => {
          this.highScores = response.data;
        });
        this.errorMessage = undefined
      } catch (e) {
        this.errorMessage = 'There was an error loading the high scores'
        console.error('Problem getting high scores', e)
      } finally {
        this.loading = false
      }
    },
  },
};
</script>

<style scoped>

.table {
  border: 2px gainsboro solid;
  border-radius: 12px;
}

</style>
