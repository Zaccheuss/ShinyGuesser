<template>
  <div>
    <pill-button-checkbox
      class="test"
      v-for="value in values"
      :key="value.name"
      :displayText="value.name"
    ></pill-button-checkbox>
  </div>
</template>

<script>
import PillButtonCheckbox from "./PillButtonCheckbox.vue";
export default {
  components: { PillButtonCheckbox },
  data() {
    return {
      checked: false,
    };
  },
  props: ["values"],
  methods: {
    toggleState() {},
  },
};
</script>
<style scoped>
  /* div {
    background-color: hotpink;
    display: flex;
    flex-wrap: wrap;
  } */
  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 350px;
  }

  .test {
    margin: 5px 5px 0 0;
  }
</style>
