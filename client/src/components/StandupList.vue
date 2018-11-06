<template>
  <v-layout row>
    <v-flex>
      <v-card>
        <v-list>
          <template v-for="(note, index) in notes">
            <v-divider
                v-if="index > 0"              
                :key="'divider-' + index"
            ></v-divider>
            <v-card 
                v-bind:key="'note-' + index" class="text-lg-left"
            >
                <v-card-title><strong>{{ note.teamMember }} - {{ formatDT(note.createdOn) }}</strong></v-card-title>
                <v-card-text class="pt-0 pb-2"><strong>Project:</strong> {{note.project}}</v-card-text>
                <v-card-text class="pt-0 pb-2"><strong>Yesterday:</strong> {{note.workYesterday}}</v-card-text>
                <v-card-text class="pt-0"><strong>Today:</strong> {{note.workToday}}</v-card-text>
                <v-card-text class="pt-0"><strong>Impediments:</strong> {{note.impedements}}</v-card-text>
            </v-card>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import moment from 'moment'

  export default {
    computed: {
      notes () {
        return this.$store.getters.notes
      }
    },
    data () {
      return {       
      }
    },
    methods: {
      getStandups: function () {
        this.$store.dispatch('getStandups')
      },
      formatDT: function (dt) {
        return moment(dt).format("MMM Do, YYYY (h:mm a)")
      }
    },
    mounted: async function () {      
      await this.getStandups()
    }
  }
</script>

<style>

</style>
