<template>
  <div class="container" id="mainView">
    <div class="grid grid-cols-2 p-4 shadow-md">
      <div class="flex flex-row ml-2">
        <p class="font-bold text-md">Assistant</p>
      </div>
      <div class="flex flex-row-reverse mr-2">
        <i class="material-icons pl-5" @click="settingsModal = true">settings</i>
        <i class="material-icons pl-5" @click="$store.commit('editToggle')">{{ editMode ? 'done' : 'edit' }}</i>
        <p class="text-green-600 text-xs self-center" v-if="!changesSaved">Saving to device...</p>
      </div>
    </div>
    <div class="m-5">
      <Search/>
      <hr class="mb-5">
      <Groups :groups="userConfig.groups"/>
      <modal v-if="settingsModal" @close="settingsModal = false">
        <ConfigViewer/>
        <hr class="mt-2">
        <div class="mt-4">
          <p class="text-md font-bold py-1">Settings</p>
          <div class="grid grid-cols-5 hover:bg-gray-100 pr-2" @click="toggleGridWidth">
            <div class="col-span-4">
              <p class="text-md py-2">Grid width</p>
            </div>
            <div class="col-span-1">
              <p class="text-md py-2 text-right">{{userConfig['gridWidth']}}</p>
            </div>
          </div>
          <div class="hover:bg-gray-100 pr-2">
            <p class="text-md py-2">Email developer</p>
          </div>
        </div>
      </modal>
    </div>
    <a
      v-show="true == false"
      :href="'autotoolscommand://assistant=:=saveconfig=:=' + JSON.stringify(userConfig)"
      ref="go"
    ></a>
  </div>
</template>

<script>
import ConfigViewer from '@/components/ConfigViewer.vue'
import Search from '@/components/Search.vue'
import Groups from '@/components/reusable/Groups.vue'
import Modal from '@/components/reusable/Modal.vue'

export default {
  name: 'MainView',
  components: { ConfigViewer, Search, Groups, Modal, },
  data () {
    return {
      settingsModal: false
    }
  },
  computed: {
    production () {
      return this.$store.state.production
    },
    userConfig () {
      return this.$store.state.userConfig
    },
    changesSaved () {
      return this.$store.state.changesSaved
    },
    editMode () {
      return this.$store.state.editMode
    }
  },
  async mounted () {
    console.log(`Dev mode is ${!this.production}`)
    let subscribe = this.$store.subscribe(async (mutation, state) => {
      const changes = ['newGroup', 'removeGroup', 'newIcon', 'removeIcon', 'toggleGridWidth' ]
      state.changesSaved = false
      await new Promise(resolve => setTimeout(resolve, 1000))
      state.changesSaved = true
      if(changes.includes(mutation.type)) this.saveChanges()
    })
  },
  methods: {
    toggleGridWidth () {
      this.$store.commit('toggleGridWidth')
    },
    saveChanges () {
      this.$refs.go.click()
    }
  }
}
</script>
