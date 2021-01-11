<template>
  <div class="container">
    Final score
    <p>{{ $route.params.numberOfCorrectGuesses }} correct out of {{ $route.params.numberOfQuestions }}</p>
    <p>Completed in: {{ $route.params.completionTime }}</p>

    <router-link :to="{ name: 'Home' }">
      <b-button>Back to Start</b-button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>

<style scoped>

.container {
  text-align: center;
}

</style>