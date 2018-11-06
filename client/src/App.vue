<template>
  <v-app id="inspire">
    <navigation></navigation>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="toggleNavDrawer"></v-toolbar-side-icon>
      <v-toolbar-title>Virtual Standup Notes</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-select
        prepend-icon="person"
        :items="teamMembers"
        item-text="name"
        item-value="_id"
        label="Filter by team member"
        v-on:change="filterByTeamMember"
      ></v-select>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer color="indigo" app class="pl-2">
      <span class="white--text">Pluralsight - Fundamentals of Mongoose.js for Node and MongoDB</span>
    </v-footer>
  </v-app>
</template>

<script>
import Navigation from './components/Navigation.vue' 

export default { 
  data: () => ({
    
  }),
  computed: {
      teamMembers () {
        let team = this.$store.getters.teamMembers
        team.unshift({"_id": "0", "name": "Show All"})

        return team
      }
    },
  components: {
    Navigation
  }, 
  methods: {
    getProjects: function () {
      this.$store.dispatch('getProjects')
    },
    getTeamMembers: function () {
      this.$store.dispatch('getTeamMembers')
    },
    toggleNavDrawer: function () {
      this.$store.dispatch('toggleNavDrawer')
    },
    filterByTeamMember: function (teamMemberId) {      
      if (teamMemberId === "0") {
        this.$store.dispatch('getStandups')
      }
      else {
        this.$store.dispatch('getStandupsByTeamMemberId', teamMemberId)
      }      
    }    
  },
  mounted: async function () {
    await this.getProjects()
    await this.getTeamMembers()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
