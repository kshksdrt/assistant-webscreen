<template>
  <div class="container">
    <div v-for="group in groups" :key="group.index" class="mb-5">
      <!-- Group title bar -->
      <div class="grid grid-cols-2 mb-2">
        <div class="flex flex-row">
          <p class="font-medium text-sm uppercase text-gray-700 self-center">{{ group.name }}</p>
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
      <div v-if="group.type == 'icon'">
        <Icons :icons="group.items" :groupName="group.name"/>
      </div>
    </div>
    <!-- Add new group -->
    <div class="outline-none" v-if="editMode">
      <button
        class="self-end mt-3 outline-none hover:bg-gray-200 outline-none text-gray-500 text-sm font-medium py-2 px-2 rounded uppercase"
        @click="newGroupClicked"
      >
        +  New group
      </button>
    </div>
    <modal v-if="modalVisibility" @close="modalOff">
      <input
        class="mb-2 bg-gray-100 outline-none hover:bg-gray-200 focus:bg-gray-200 rounded-md px-2 pt-4 pb-3 text-sm block w-full appearance-none leading-normal"
        placeholder="Group name" v-model="modalInputs.name"
      >
      <div class="flex flex-row mt-5">
        <p class="mr-3">Type:</p>
        <button
          v-for="type in groupTypes" :key="type"
          class="text-black text-sm font-regular py-1 px-2 rounded-sm lowercase"
          :class="{'bg-gray-100' : type == modalInputs.type}"
          @click="modalInputs.type == type"
        >
          {{ type }}
        </button>
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
import Icons from '@/components/reusable/Icons.vue'
import modal from "@/components/reusable/Modal.vue"

export default {
  name: 'Groups',
  components: { Icons, modal, },
  props: ['groups'],
  data () {
    return {
      modalVisibility: false,
      modalInputs: {
        name: '',
        type: 'icon'
      },
      groupTypes: ['icon'],
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
      this.modalInputs.type = 'icon'
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
    }
  }
}
</script>