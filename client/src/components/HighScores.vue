<template>
  <div>
    High Score Component
    <pill-button-group :values="regions"></pill-button-group>
  </div>

</template>

<script>
import PillButtonGroup from './PillButtonGroup.vue';
export default {
  components: { PillButtonGroup },
  data() {
    return {
    }
  },
  props: ["regions"],
  created() {
  }
}
</script>

<style scoped>

.pill-checkbox {
  border-radius: 40px;
  background-color: blue;
}

</style>