<template>
  <div class="header-contents">
    <header>
      <h1>Pokemon Shiny Finder</h1>
      <p>Test your Pokemon knowledge by choosing the shiny Pokemon</p>
      <hr>
    </header>
    <theme-switch class="theme-switch" />
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

  .theme-switch {
    position: absolute;
    top: 1em;
    right: 1em;
  }

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

    .theme-switch {
      top: 4.25em;
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