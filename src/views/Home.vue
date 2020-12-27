<template>
  <div class="home">
    <div class="button-container">
      <router-link :to="{ name: 'Game' }">
        <b-button type="is-primary">Start Game</b-button>
      </router-link>
    </div>
    <section id="options">
      <div class="field">
        <b-checkbox>Kanto</b-checkbox>
      </div>
      <div class="field">
        <b-checkbox>Johto</b-checkbox>
      </div>
      <div class="field">
        <b-checkbox>Hoenn</b-checkbox>
      </div>
      <div class="field">
        <b-checkbox>Sinnoh</b-checkbox>
      </div>
      <div class="field">
        <b-checkbox>Unova</b-checkbox>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
div {
  text-align: center;
}

.button-container {
  margin-top: 20px;
  margin-bottom: 20px;
}

</style>