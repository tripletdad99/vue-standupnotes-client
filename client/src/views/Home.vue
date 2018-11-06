<template>
  <v-layout>
    <v-flex xs12>
      <standup-list></standup-list>
    </v-flex>
    <v-flex>
      <standup-dialog></standup-dialog>
    </v-flex>    
  </v-layout>
  
</template>

<script>
  import StandupList from '../components/StandupList.vue'
  import StandupDialog from '../components/StandupDialog.vue'

  export default {
    data: () => ({
            
    }),
    props: {
      source: String
    },
    components: {
      StandupList,
      StandupDialog
    }
  }
</script>
