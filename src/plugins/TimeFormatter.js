export default {
  install(Vue, options) {
    console.log(options);

    Vue.mixin({
      methods: {
        formatTime: value => {
          let milliseconds = value % 10;
          let seconds = Math.floor((value / 10) % 60);
          let minutes = Math.floor((value / 10 / 60) % 60);
          return `${minutes}:${seconds}.${milliseconds}`;
        }
      }
    });
  }
}