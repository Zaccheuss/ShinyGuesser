<template>
  <div>
    {{ time }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: 0,
      timer: null,
    }
  },
  created() {
    this.timer = setInterval( () => this.time++, 1000);
  }

}
</script>

<style>

</style>