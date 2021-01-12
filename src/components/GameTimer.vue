<template>
  <div>
    {{ formatTime(time) }}
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
  methods: {
    onTick() {
      this.time++;
      this.$emit('onTick', this.time);
    }
  },
  created() {
    this.timer = setInterval( () => this.onTick(), 100);
  }

}
</script>

<style>

</style>