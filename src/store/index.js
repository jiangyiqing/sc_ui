import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playerName: {
      a: "",
      b: ""
    },
    playerA: {
        credit: 0,
        creditUsed: 0,
        tubePh: 0,
        water: 0
    },
    playerB: {
      credit: 0,
      creditUsed: 0,
      tubePh: 0,
      water: 0
  },
    currentRound: 0,
    currentPlayer: "",
    totalRound: 0
  },
  getters: {
    getPlayerName: (state) => (id) => {
      return state.playerName[id]
    },
    getPlayerA: (state) => {
      // get current player
      return state.playerA
    },
    getPlayerB: (state) => {
      // get current player
      return state.playerB
    }
  },
  mutations: {
    setPlayerName: (state, id, name) => {
      // set player data
      state.playerName[id] = name
    }
  },
  actions: {
  },
  modules: {
  }
})
