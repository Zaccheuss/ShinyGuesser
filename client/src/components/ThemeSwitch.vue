<template>
  <div>
    <b-field>
      <b-switch 
        v-model="darkTheme" 
        v-on:input='toggleTheme()'
      >
        {{ darkTheme ? "Light" : "Dark" }}
      </b-switch>
    </b-field>
  </div>
</template>

<script>
export default {
  mounted() {
    const currentTheme = localStorage.getItem("theme")
    this.darkTheme = currentTheme === "dark";
  },
  data() {
    return {
      darkTheme: true
    }
  },
  methods: {
    toggleTheme: function() {
      const currentTheme = localStorage.getItem("theme");
      let themeSwitch;

      if (!currentTheme || currentTheme === "light") {
        themeSwitch = "dark";
      } else if (currentTheme === "dark") {
        themeSwitch = "light";
      }

      document.body.setAttribute("theme", themeSwitch)
      this.darkTheme = themeSwitch === "dark";
      this.saveThemeToLocalStorage(themeSwitch)
    },
    saveThemeToLocalStorage: function(theme) {
      localStorage.setItem("theme", theme)
    }
  }
  
}
</script>

<style scoped>

</style>