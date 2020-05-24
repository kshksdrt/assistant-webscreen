<template>
  <div class="container">
    <div v-for="group in groups" :key="group.index" class="mb-5">
      <!-- Group title bar -->
      <div class="grid grid-cols-2">
        <div class="flex flex-row mb-2">
          <i
          class="material-icons self-center p-2"
          v-if="groups.indexOf(group) != 0 && editMode"
          @click="moveGroupUp(group.name)"
          >
            <p class="text-sm">arrow_drop_up</p>
          </i>
          <i
          class="material-icons self-center p-2"
          v-if="groups.indexOf(group) != groups.length-1 && editMode"
          @click="moveGroupDown(group.name)"
          >
            <p class="text-sm">arrow_drop_down</p>
          </i>
          <p class="font-medium text-xs uppercase text-gray-700 self-center" v-if="editMode || group.type != 'buttons'">{{ group.name }}</p>
        </div>
        <div class="flex flex-row-reverse p-2">
          <i
            class="material-icons text-xs text-gray-700"
            @click="removeGroup(group.name)"
            v-if="editMode"
          >delete</i>
        </div>
      </div>
      <!-- List -->
      <div>
        <Items :items="group.items" :groupName="group.name" :type="group.type"/>
      </div>
    </div>
    <!-- Add new group button -->
    <div
    class="self-end mt-3 outline-none hover:bg-gray-200 outline-none text-gray-500 text-sm font-medium py-2 px-2 rounded uppercase"
    @click="newGroupClicked"
    v-if="editMode"
    >
      +  New group
    </div>
    <!-- Add group modal -->
    <modal v-if="modalVisibility" @close="modalOff">
      <input
        class="mb-2 bg-gray-100 outline-none hover:bg-gray-200 focus:bg-gray-200 rounded-md px-2 pt-4 pb-3 text-sm block w-full appearance-none leading-normal"
        placeholder="Group name" v-model="modalInputs.name"
      >
      <div class="flex flex-row mt-5">
        <p class="mr-3 self-center">Type:</p>
        <div
        v-for="type in groupTypes" :key="type"
        class="self-center text-black text-sm hover:bg-gray-50 font-regular py-1 px-2 mx-1 rounded-sm text-xs font-medium uppercase"
        :class="{'bg-indigo-50' : type == modalInputs.type}"
        @click="modalInputs.type = type"
        >
          {{ type }}
        </div>
      </div>
      <p class="text-red-500" v-if="inputError">Empty fields found</p>
      <div class="flex flex-row-reverse">
        <button
          class="self-end mt-5 bg-indigo-500 focus:outline-none hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded uppercase"
          @click="newGroupConfirm"
        >
          Save
        </button>
      </div>
    </modal>
  </div>
</template>

<script>
import Items from '@/components/reusable/Items.vue'
import modal from "@/components/reusable/Modal.vue"

export default {
  name: 'Groups',
  components: { Items, modal, },
  props: ['groups'],
  data () {
    return {
      modalVisibility: false,
      modalInputs: {
        name: '',
        type: 'icons'
      },
      groupTypes: ['icons', 'buttons'],
      inputError: false
    }
  },
  computed: {
    editMode () {
      return this.$store.state.editMode
    }
  },
  methods: {
    modalOn () {
      this.modalVisibility = true
    },
    modalOff () {
      this.modalInputs.name = ''
      this.modalInputs.type = 'icons'
      this.inputError = false
      this.modalVisibility = false
    },
    newGroupClicked () {
      this.modalOn()
      this.inputError = false
    },
    newGroupConfirm () {
      const self = this
      self.inputError = false

      const { name='', type='' } = self.modalInputs

      if ([type, name].includes('')) {
        self.inputError = true
        return
      }

      const payload = {name, type}
      console.log(payload)
      self.modalOff()
      self.$store.commit('newGroup', payload)
    },
    removeGroup (name) {
      this.$store.commit('removeGroup', name)
    },
    moveGroupDown (name) {
      this.$store.commit('moveGroupDown', name)
    },
    moveGroupUp (name) {
      this.$store.commit('moveGroupUp', name)
    }
  }
}
</script>