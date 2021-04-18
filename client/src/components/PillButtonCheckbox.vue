<template>
  <div>
    <div
      class="pill disable-highlighting"
      v-on:click="toggleState()"
      :class="checked ? 'checked' : 'unchecked'"
    >
      {{ displayText }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
    };
  },
  props: ["displayText"],
  methods: {
    toggleState() {
      this.checked = !this.checked;
    },
  },
};
</script>
<style scoped>
.pill {
  display: inline-block;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 40px;
  cursor: pointer;
  border: #714dd2 solid 2px;
}

.unchecked {
  background-color: white;
}

.unchecked:hover {
  background-color: rgba(238, 238, 238, 0.527);
}

.checked {
  background-color: #714dd2;
  color: white;
}

.checked:hover {
  background-color: #8d75cf;
  color: white;
}

.disable-highlighting {
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
}
</style>
