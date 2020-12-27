<template>
  <div class="container">
    Final score
    <p>{{ $route.params.numberOfCorrectGuesses }} correct out of {{ $route.params.numberOfQuestions }}</p>
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