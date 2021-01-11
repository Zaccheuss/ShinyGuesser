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
  created() {
    this.timer = setInterval( () => this.time++, 100);
  }

}
</script>

<style>

</style>