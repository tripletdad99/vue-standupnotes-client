<template>
    <v-navigation-drawer
      v-bind:width="223"
      v-model="showNavDrawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click="routeTo('home')">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- <v-list-tile @click="routeTo('')">
          <v-list-tile-action>
            <v-icon>speaker_notes</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>New Standup</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> -->
        <v-list-tile @click="routeTo('about')">
          <v-list-tile-action>
            <v-icon>info</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
  export default {
    data: () => ({
      // drawer: null
    }),
    computed: {
      showNavDrawer () {
        return this.$store.getters.showNavDrawer
      }
    },
    methods: {
        routeTo: function (path) {
            console.log(path)
            this.$router.push(path)
        }
    }
  }
</script>

<style>

</style>
