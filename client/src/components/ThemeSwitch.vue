<template>
  <div>
    <button v-on:click='toggleTheme()'>theme</button>
  </div>
</template>

<script>
export default {

  methods: {
    toggleTheme: function() {
      const currentTheme = localStorage.getItem("theme");

      if (!currentTheme || currentTheme === "light") {
        document.body.setAttribute("theme", "dark")
        this.saveThemeToLocalStorage("dark")
      } else if (currentTheme === "dark") {
        document.body.setAttribute("theme", "light")
        this.saveThemeToLocalStorage("light")
      }
    },
    saveThemeToLocalStorage: function(theme) {
      localStorage.setItem("theme", theme)
    }
  }
  
}
</script>

<style scoped>

</style>