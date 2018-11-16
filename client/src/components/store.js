import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedDate: null,
    standupNotes: [],
    projects: [],
    teamMembers: [],
    showNavDrawer: false
  },
  getters: {
    notes: state => state.standupNotes,
    teamMembers: state => state.teamMembers,
    projects: state => state.projects,
    showNavDrawer: state => state.showNavDrawer
  },
  actions: {
    getStandups({ commit }) {
      Vue.axios.get('/standup')
        .then((resp) => {
          console.log('GET 12 newest standup notes', resp)
          let data = resp.data
          if (data && data.length > 0) {
            commit('standupNotes', data)
          }
        })
        .catch((err) => {
          console.log('Darn! There was an error getting the standup notes! ' + err)
        })
    },
    getStandupsByTeamMemberId({ commit }, teamMemberId) {
      Vue.axios.get('/standup/' + teamMemberId)
        .then((resp) => {          
          let data = resp.data
          if (data && data.length > 0) {
            commit('standupNotes', data)
          }
        })
        .catch((err) => {
          console.log('Darn! There was an error getting the standup notes! ' + err)
        })
    },
    saveStandup({ dispatch }, standup) {
      Vue.axios.post('/standup', standup)
      .then(() => {
        dispatch('getStandups')
      })
      .catch((err) => {
        console.log('Error saving standup note')
        console.log(err)
      })
    },
    getProjects({ commit }) {
      Vue.axios.get('/projects')
        .then((resp) => {
          console.log('GET list of active projects', resp)
          let data = resp.data
          if (data && data.length > 0) {
            commit('projects', data)
          }
        })
        .catch((err) => {
          console.log('There was an error getting the list of projects: ' + err)
        })
    },
    getTeamMembers({ commit }) {
      Vue.axios.get('/team')
        .then((resp) => {
          console.log('GET list of active team members', resp)
          let data = resp.data
          if (data && data.length > 0) {
            commit('teamMembers', data)
          }
        })
        .catch((err) => {
          console.log('There was an error getting the list of projects: ' + err)
        })
    },
    toggleNavDrawer({ commit }) {
      commit('toggleNavDrawer')
    }    
  },
  mutations: {
    standupNotes(state, data) {
      // Start by clearing the standup notes array...
      state.standupNotes = []
      
      if (data && data.length > 0) {
        data.forEach(note => {
          state.standupNotes.push(note)
        })
      }
      console.log('Standup Notes mutated: ', state.standupNotes)      
    },
    projects(state, data) {
      state.projects = []

      if (data && data.length > 0) {
        data.forEach(project => {
          state.projects.push(project)
        })
        console.log('Mutated projects state: ', state.projects)
      }
    },
    teamMembers(state, data) {
      state.teamMembers = []

      if (data && data.length > 0) {
        data.forEach(member => {
          state.teamMembers.push(member)
        })
        console.log('Mutated teamMembers state: ', state.teamMembers)
      }      
    },
    toggleNavDrawer(state) {
      state.showNavDrawer = !state.showNavDrawer
    }
  },
})
