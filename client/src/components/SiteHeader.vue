<template>
  <div>
    <header>
    <h1>Pokemon Shiny Finder</h1>
    <p>Test your Pokemon knowledge by choosing the shiny Pokemon</p>
    <hr>
    </header>
    <theme-switch />
  </div>
</template>

<script>
import ThemeSwitch from "./ThemeSwitch.vue"
export default {
  components: { ThemeSwitch },
  mounted() {
      const currentTheme = localStorage.getItem("theme");
      document.body.setAttribute("theme", currentTheme);


  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Oleo+Script&display=swap');

  h1 {
    font-family: 'Oleo Script', cursive;
    font-size: 70px;
    margin-bottom: -20px;
    padding-bottom: 0px;
  }

  p {
    margin-top: 0px;
    padding-top: 0px;
    color: gray;
  }

  hr {
    margin-top: 4px;
    margin-bottom: 4px;
  }

  div {
    margin-right: 6px;
    margin-left: 6px;
  }

  @media screen and (max-width: 1020px) {
    h1 {
      font-size: 11vw;
      line-height: 40px;
      margin-top: 4px;
      margin-bottom: 0px;
    }

    header {
      padding-top: 0px;
      padding-bottom: 0px;
    }

    /* hide tagline on mobile */
    p {
      display: none;
    }

    hr {
      display: none;
    }
  }
</style>