import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    regions: [2],
    showNames: null,
    name: null,
  },
  mutations: {
    initiliazeDataStore() {
      this.state.regions = JSON.parse(localStorage.getItem("regions"));
      this.state.showNames = JSON.parse(localStorage.getItem("showNames"));
      this.state.name = JSON.parse(localStorage.getItem("name"));
    },
    updateRegions(state, payload) {
      this.state.regions = payload;
    },
    updateShowNames(state, payload) {
      this.state.showNames = payload;
    }
  },
  getters: {
    getActiveRegions: state => {
      return state.regions
        .filter(region => region.isActive)
        .map(region => region.name);
    }
  }
})
