<template>
  <div id="timer">
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

<style scoped>

  #timer {
    padding-top: 20px;
    font-size: 20px;
  }

  @media screen and (max-width: 1020px) {
    #timer {
      margin-top: 0px;
      padding-top: 0px;
    }
  }

</style>