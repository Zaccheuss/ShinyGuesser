<template>
  <div class="home">
    <router-link :to="{ name: 'Game' }">
      <b-button type="is-primary">Start Game</b-button>
    </router-link>
    <form>
      <input type="checkbox" id="region1" name="region1" value="region1" />
      <label for="region1">Kanto</label><br />
      <input type="checkbox" id="region2" name="region2" value="region2" />
      <label for="region2">Johto</label><br />
      <input type="checkbox" id="region3" name="region3" value="region3" />
      <label for="region3">Hoenn</label><br />
      <input type="checkbox" id="region4" name="region4" value="region4" />
      <label for="region4">Sinnoh</label><br />
      <input type="checkbox" id="region5" name="region5" value="region5" />
      <label for="region5">Unova</label><br />
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
// import GameScreen from "@/components/GameScreen.vue";

export default {
  components: {
    // GameScreen,
  },
  name: "Home",
};
</script>

<style lang="stylus" scoped>
</style>