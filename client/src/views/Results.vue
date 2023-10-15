<template>
  <div>
    <site-header />
    <h3>
      Final score
    </h3>
    <p>{{ $route.params.numberOfCorrectGuesses }} correct out of {{ $route.params.numberOfQuestions }}</p>
    <p>Completed in {{ formatTime($route.params.completionTime) }}</p>

      <div class="high-score-container">
        <b-checkbox v-model="saveHighScorePref">Save High Score</b-checkbox>
        <div class="container" v-if="saveHighScorePref">
          <div class="input-label">Name</div>
          <b-field horizontal>
              <b-input v-model="highScoreName"></b-input>
          </b-field>
        </div>
        <div v-if="saveHighScorePref">
          <div class="field-subtext error" v-if="error">Name must not be empty</div> 
          <div class="field-subtext" v-else>Score will be saved automatically upon returning Home</div>
        </div>
      </div>

      <b-button 
        v-on:click="logHighScore()"
      >Back to Start</b-button>
  </div>
</template>

<script>
import SiteHeader from "../components/SiteHeader.vue";
import ScoreSerivce from "@/services/ScoreService.js";
export default {
  components: { SiteHeader },
  data() {
    return {
      highScoreName: "",
      saveHighScorePref: true,
      error: false
    }
  },
  created() {
    if (localStorage.getItem("highScoreName")) {
      this.highScoreName = JSON.parse(localStorage.getItem("highScoreName"));
    }
    if (localStorage.getItem("saveHighScorePref")) {
      this.saveHighScorePref = JSON.parse(localStorage.getItem("saveHighScorePref"));
    }
  },
  methods: {
    logHighScore() {
      this.error = false
      if (this.saveHighScorePref) {
        if (this.highScoreName === '') {
          this.error = true
          return
        }
        const newHiscore =
        {
          name: this.highScoreName,
          score: this.$route.params.numberOfCorrectGuesses,
          completionTime: this.$route.params.completionTime,
          regions: this.getRegions()
        }

        try {
          ScoreSerivce.postHighScore(newHiscore).then(() => {
            this.$router.push( {name: "Home"} )
          })
        } catch (e) {
          console.error("Problem posting high score", e)
        } finally {
          this.$router.push( {name: "Home"} )
        }
      } else {
        this.$router.push( {name: "Home"} )

        if (this.saveHighScorePref) {
          localStorage.setItem("highScoreName", JSON.stringify(this.highScoreName));
          localStorage.setItem("saveHighScorePref", JSON.stringify(this.saveHighScorePref));
          this.$store.commit("highScoreName", this.highScoreName);
          this.$store.commit("saveHighScorePref", this.saveHighScorePref);
        }
      }
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
h3 {
  font-size: 40px;
  font-weight: bold;
}

button {
  margin-top: 20px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5em;
}

.input-label {
  color: var(--text-primary-color);
}

.high-score-container {
  margin-top: 1em;
}

.field-subtext {
  color: var(--text-secondary-color);
  size: 0.9em;
}

.error {
  color: red;
}

</style>
