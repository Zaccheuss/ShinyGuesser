<template>
  <div>
    <p v-if="highScores.length === 0">
      No High Scores For These Regions
    </p>
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
    };
  },
  created() {
    this.getHighScores();
  },
  computed: {
    activeRegions() {
      return this.$store.getters.getActiveRegions;
    },
  },
  methods: {
    getHighScores() {
      ScoreService.getHighScores(this.activeRegions).then((response) => {
        this.highScores = response.data;
      });
    },
  },
  watch: {
    activeRegions() {
      this.getHighScores();
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
