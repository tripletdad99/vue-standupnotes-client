<template>
    <v-content class="pa-0">
    <v-btn
      class="mt-3"
      fab
      top
      right
      color="red"
      dark
      fixed
      @click="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          Create New Standup Note
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 sm6 d-flex>
              <v-select
                prepend-icon="person"
                :items="teamMembers"
                item-text="name"
                item-value="_id"
                label="Team Member"
                v-model="note.teamMemberId"
                outline
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6 d-flex>
              <v-select
                prepend-icon="settings_applications"
                :items="projects"
                item-text="name"
                item-value="name"
                label="Project"
                v-model="note.project"
                outline
              ></v-select>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                v-model="note.workYesterday"
                name="workYesterday"
                label="Work yesterday"
                prepend-icon="date_range"
                placeholder="The work you completed yesterday"
                rows=3
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                v-model="note.workToday"
                name="workToday"
                label="Work today"
                prepend-icon="today"
                placeholder="The work you plan on doing today"
                rows=3
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="note.impediment"
                prepend-icon="block"
                placeholder="Impediments Experienced"                
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>          
          <v-spacer></v-spacer>
          <v-btn flat 
            color="primary" 
            @click="dialog = false">Cancel</v-btn>
          <v-btn flat 
            @click="saveStandup" 
            :disabled="!noteIsValid">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-content>
</template>

<script>
export default {
  computed: {
    projects () {
      return this.$store.getters.projects
    },
    teamMembers () {
      return this.$store.getters.teamMembers
    },
    noteIsValid () {
      return (this.note.teamMemberId && 
        this.note.project && 
        this.note.workYesterday && 
        this.note.workToday)
    }
  },
  data: () => ({
    dialog: null,
    note: {
      teamMemberId: null,
      teamMember: null,
      project: null,
      workYesterday: null,
      workToday: null,
      impediment: null
    }
  }),
  methods: {
    saveStandup: function () {
      // Get the team member's name from their Id...
      this.note.teamMember = this.getTeamMemberNameById(this.note.teamMemberId)
      this.$store.dispatch('saveStandup', this.note)
      this.dialog = false
    },
    getTeamMemberNameById: function (id) {
      let tm = this.teamMembers.find(tm => tm._id == id)
      if (tm) {
        return tm.name
      }
      return ''
    }
  }
}
</script>

<style>

</style>
