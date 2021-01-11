<template>
  <div>
    {{ formattedTime }}
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
  computed: {
    formattedTime: function() {
      let milliseconds = this.time % 10;
      let seconds = Math.floor((this.time / 10) % 60);
      let minutes = Math.floor((this.time / 10 / 60) % 60);
      return `${minutes}:${seconds}.${milliseconds}`;
    }
  },
  methods: {
    onTick() {
      this.time++;
      this.$emit('onTick', this.formattedTime);
    }
  },
  created() {
    this.timer = setInterval( () => this.onTick(), 100);
  }

}
</script>

<style>

</style>