<template>
  <div>
    <!-- Icons -->
    <div
    v-if="type == 'icons'"
    class="grid bg-gray-100 rounded"
    :class="userConfig['gridWidth'] == 5 ? 'grid-cols-5' : 'grid-cols-6'"
    >
      <div v-for="icon in items" :key="icon.index" @click="clicked(icon.command)">
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
      <div v-if="editMode" @click="editIconClicked" class="text-center hover:bg-gray-200 p-3">
        <i class="material-icons text-gray-500 h-1 pt-2">edit</i>
      </div>
    </div>
    <!-- Buttons -->
    <div
    v-if="type == 'buttons'"
    class="flex flex-wrap mt-2"
    >
      <div v-for="button in items" :key="button.index" class="flex flex-wrap">
        <div
        class="flex flex-row hover:bg-indigo-200 rounded-full px-1 h-auto mr-3 mb-3"
        :class="button.color"
        @click="clicked(button.command)"
        >
          <i v-if="button.type == 'svg'" class="self-center material-icons m-2">
            <p class="text-sm text-white">
              {{ button.icon }}
            </p>
          </i>
          <div class="self-center w-auto mr-2">
            <p class="text-xs text-white">
              {{ button.label }}
            </p>
          </div>
        </div>
      </div>
      <div v-if="editMode" @click="addButtonClicked" class="bg-gray-100 flex flex-row hover:bg-gray-200 rounded-full px-1 h-auto mr-3 mb-3">
        <i class="self-center material-icons m-2">
          <p class="text-sm text-black">add</p>
        </i>
        <div class="self-center w-auto mr-2">
          <p class="text-xs text-black">Add buttons</p>
        </div>
      </div>
      <div v-if="editMode" @click="editButtonClicked" class="bg-gray-100 flex flex-row hover:bg-gray-200 rounded-full px-1 h-auto mr-3 mb-3">
        <i class="self-center material-icons m-2">
          <p class="text-sm text-black">edit</p>
        </i>
        <div class="self-center w-auto mr-2">
          <p class="text-xs text-black">Edit buttons</p>
        </div>
      </div>
    </div>
    <!-- Add item modal -->
    <modal v-if="addModal == true" @close="closeAddModal">
      <p class="text-md font-bold pt-2 pb-3">Add {{ addModalMode }} to your group</p>
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
          <a href="https://material.io/resources/icons/?style=baseline" class="text-blue-500">material icons</a>
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
        <div v-if="addModalMode == 'buttons'">
          <p class="text-sx font-medium mb-3">Color</p>
          <div class="flex flex-row flex-wrap">
            <div
            v-for="color in buttonColors"
            :key="color"
            :class="color"
            class="flex mr-3 mb-3 h-8 w-8 rounded-full"
            @click="addModalInputs.color = color"
            >
              <i class="material-icons text-white self-center pl-2" v-if="addModalInputs.color == color">
                <p class="text-xs">
                  check
                </p>
              </i>
            </div>
          </div>
        </div>
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
    <!-- Edit item modal -->
    <modal v-if="removeModal" @close="closeRemoveModal">
      <div v-for="item in items" :key="item.index" class="mb-1">
        <div class="grid grid-cols-2">
          <div class="flex flex-row px-2">
            <i class="self-center material-icons">{{item.icon}}</i>
            <p class="self-center px-4 text-xs">{{item.label}}</p>
          </div>
          <div class="flex flex-row-reverse">
            <i class="self-center material-icons focus:bg-gray-100 hover:bg-gray-100 focus:bg-gray-100 hover:bg-gray-100 p-2" @click="removeConfirm(item.label)">delete</i>
            <i class="self-center material-icons focus:bg-gray-100 hover:bg-gray-100 focus:bg-gray-100 hover:bg-gray-100 p-2" @click="moveItemDown(groupName, item.label)" v-if="items.indexOf(item) != items.length-1">arrow_drop_down</i>
            <i class="self-center material-icons focus:bg-gray-100 hover:bg-gray-100 focus:bg-gray-100 hover:bg-gray-100 p-2" @click="moveItemUp(groupName, item.label)" v-if="items.indexOf(item) != 0">arrow_drop_up</i>
          </div>
        </div>

      </div>
    </modal>
    <!-- Command link -->
    <a
    v-show="true == false"
    :href="'autotoolscommand://assistant=:=shortcut=:=' + command"
    ref="go"
    ></a>
  </div>
</template>

<script>
import modal from "@/components/reusable/Modal.vue";
import materialIconslist from '@/materialIcons.js'

export default {
  name: "Items",
  components: { modal, },
  props: ["items", "groupName", "type"],
  data() {
    return {
      command: "",
      addModal: false,
      addModalMode: '',
      addModalInputs: {
        type: 'svg',
        icon: '',
        color: 'bg-indgo-500',
        label: '',
        command:''
      },
      removeModal: false,
      addInputError: false,
      iconError: false,
      buttonColors: [
        'bg-red-500', 
        'bg-purple-500', 
        'bg-deep-purple-500', 
        'bg-indigo-500', 
        'bg-blue-500', 
        'bg-teal-500', 
        'bg-green-500', 
        'bg-light-green-500', 
        'bg-orange-500', 
        'bg-deep-orange-500', 
      ]
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
      this.addModalMode = 'icons'
    },
    editIconClicked() {
      this.removeModal = true;
      this.addModalMode = ''
    },
    addButtonClicked() {
      this.addModal = true;
      this.addModalMode = 'buttons'
    },
    editButtonClicked() {
      this.removeModal = true;
      this.addModalMode = ''
    },
    moveItemDown (groupName, itemLabel) {
      this.$store.commit('moveItemDown', {groupName, itemLabel})
    },
    moveItemUp (groupName, itemLabel) {
      this.$store.commit('moveItemUp', {groupName, itemLabel})
    },
    addConfirm() {
      const self = this
      self.addInputError = false
      self.iconError = false

      const { type='svg', icon='face', color='bg-indigo-500', label='', command='' } = self.addModalInputs

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
      payload['iconObject'] = { type, icon, color, label, command }
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