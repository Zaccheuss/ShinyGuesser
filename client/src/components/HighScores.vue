<template>
  <div>
    <p v-if="highScores.length === 0">
      No High Scores For These Regions
    </p>
    <div v-else>
      <ol>
        <li
          v-for="score in highScores"
          :key="score.name + score.score + score.date"
        >
          {{ score.name }} got {{ score.score }} points in {{ score.completion_time.milliseconds }}
        </li>
      </ol>
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
          console.log(response.data);
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

<style scoped></style>
