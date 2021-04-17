<template>
  <div>
    High Score Component
    <pill-button-checkbox value="Kanto"></pill-button-checkbox>
  </div>

</template>

<script>
import PillButtonCheckbox from './PillButtonCheckbox.vue';
export default {
  components: { PillButtonCheckbox },
  data() {
    return {
    }
  },
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