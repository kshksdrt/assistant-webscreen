<template>
  <div>
    <div class="grid bg-gray-100 rounded" :class="userConfig['gridWidth'] == 5 ? 'grid-cols-5' : 'grid-cols-6'">
      <div v-for="icon in icons" :key="icon.index" @click="clicked(icon.command)">
        <div class="text-center hover:bg-gray-200 p-3">
          <i v-if="icon.type == 'svg'" class="material-icons">{{ icon.icon }}</i>
          <div class="w-auto">
            <p class="text-xs truncate">
              {{ icon.label }}
            </p>
          </div>
        </div>
      </div>
      <div v-if="editMode" @click="addIconClicked" class="text-center hover:bg-gray-200 p-3">
        <i class="material-icons text-gray-500 h-1 pt-2">add_circle</i>
      </div>
      <div v-if="editMode" @click="removeIconClicked" class="text-center hover:bg-gray-200 p-3">
        <i class="material-icons text-gray-500 h-1 pt-2">remove_circle</i>
      </div>
    </div>
    <a
      v-show="true == false"
      :href="'autotoolscommand://assistant=:=shortcut=:=' + command"
      ref="go"
    ></a>
    <modal v-if="addModal == true" @close="closeAddModal">
      <div class="flex flex-col">
        <div class="flex flex-no-wrap mb-2 mt-3">
          <i class="material-icons rounded-l-md flex-grow-0 bg-gray-300 px-3 py-3 w-12 overflow-hidden">{{ addModalInputs.icon == '' ? 'face' : addModalInputs.icon }}</i>
          <input
            autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
            class="rounded-l-none bg-gray-100 outline-none hover:bg-gray-200 focus:bg-gray-200 rounded-md py-3 px-2 text-sm block w-full appearance-none leading-normal"
            placeholder="Choose icon (for example, 'email')" v-model="addModalInputs.icon"
          >
        </div>
        <p class="text-xs pb-2">
          Only
          <a href="https://material.io/resources/icons/?style=baseline">material icons</a>
          allowed.
        </p>
        <input
          class="mb-2 bg-gray-100 outline-none hover:bg-gray-200 focus:bg-gray-200 rounded-md py-3 px-2 text-sm block w-full appearance-none leading-normal"
          placeholder="Label" v-model="addModalInputs.label"
        >
        <input
          class="mb-2 bg-gray-100 outline-none hover:bg-gray-200 focus:bg-gray-200 rounded-md py-3 px-2 text-sm block w-full appearance-none leading-normal"
          placeholder="Launch command to be sent on tap" v-model="addModalInputs.command"
        >
        <p class="text-red-500 text-xs" v-if="addInputError">Empty fields found</p>
        <p class="text-red-500 text-xs" v-if="iconError">Invalid icon</p>
        <button
          class="self-end mt-5 bg-indigo-500 focus:outline-none hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded uppercase"
          @click="addConfirm"
        >
          Save
        </button>
      </div>
    </modal>
    <modal v-if="removeModal" @close="closeRemoveModal">
      <div v-for="icon in icons" :key="icon.index">
        <div class="flex flex-row p-4 focus:bg-gray-100 hover:bg-gray-100" @click="removeConfirm(icon.label)">
          <i class="material-icons">{{icon.icon}}</i>
          <p class="px-4">{{icon.label}}</p>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import modal from "@/components/reusable/Modal.vue";
import materialIconslist from '@/materialIcons.js'

export default {
  name: "Icons",
  components: { modal, },
  props: ["icons", "groupName"],
  data() {
    return {
      command: "",
      addModal: false,
      addModalInputs: {
        type: 'svg',
        icon: '',
        label: '',
        command:''
      },
      removeModal: false,
      addInputError: false,
      iconError: false,
      buttonClassConstructor: {
        
      }
    };
  },
  computed: {
    editMode () {
      return this.$store.state.editMode
    },
    userConfig() {
      return this.$store.state.userConfig
    }
  },
  methods: {
    async clicked(command) {
      this.command = command;
      await new Promise(resolve => setTimeout(resolve, 100))
      this.$refs.go.click();
    },
    addIconClicked() {
      this.addModal = true;
    },
    removeIconClicked() {
      this.removeModal = true;
    },
    addConfirm() {
      const self = this
      self.addInputError = false
      self.iconError = false

      const { type='svg', icon='face', label='', command='' } = self.addModalInputs

      if ([type, icon, label, command].includes('')) {
        self.addInputError = true
        return
      }
      if (!materialIconslist.includes(icon)) {
        self.iconError = true
        return
      }

      let payload = {}
      payload['groupName'] = self.groupName
      payload['iconObject'] = { type, icon, label, command }
      self.closeAddModal()
      self.$store.commit('newIcon', payload)
    },
    removeConfirm (label) {
      const self = this
      if (label == undefined) {
        self.closeRemoveModal()
        return
      }

      let payload = {}
      payload['groupName'] = self.groupName
      payload['label'] = label
      self.closeRemoveModal()
      self.$store.commit('removeIcon', payload)
    },
    closeAddModal() {
      this.addModalInputs.type = 'svg'
      this.addModalInputs.icon = ''
      this.addModalInputs.label = ''
      this.addModalInputs.command = ''
      this.addInputError = false
      this.addModal = false;
    },
    closeRemoveModal() {
      this.removeModal = false;
    },
  }
};
</script>