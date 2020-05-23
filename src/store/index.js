import Vuex from 'vuex'

export default Vuex.createStore({
  state: {
    production: true,
    editMode: false,
    darkMode: false,
    changesSaved: true,
    userConfig: {
      groups: [
        {
          name: 'Test group',
          type: 'icon',
          items: [
            {
              type: 'svg',
              icon: 'face',
              label: 'testing',
              command: 'Youtube'
            },
          ]
        },
      ],
      gridWidth: 6,
    },
  },
  mutations: {
    editToggle (state) {
      state.editMode = !state.editMode
    },
    storeUserConfig (state, payload) {
      state.userConfig = payload
    },
    newGroup (state, payload) {
      const { name, type } = payload
      if (state.userConfig.groups == undefined) state.userConfig['groups'] = []
      state.userConfig.groups.push({name, type, items: []})
    },
    removeGroup (state, groupName) {
      state.userConfig.groups = state.userConfig.groups.filter(x => {
        return x.name != groupName
      })
    },
    newIcon (state, payload) {
      const group = state.userConfig.groups.find(x => {
        return payload.groupName == x.name
      })
      group.items.push(payload.iconObject)
      state.changesSaved = false
    },
    removeIcon (state, payload) {
      let group = state.userConfig.groups.find(x => {
        return payload.groupName == x.name
      })
      group.items = group.items.filter(x => {
        return x.label != payload.label
      })
      state.changesSaved = false
    },
    saveChanges (state) {
      state.changesSaved = true
    },
    toggleGridWidth (state) {
      const gridWidth = state.userConfig['gridWidth']
      if (!gridWidth) state.userConfig['gridWidth'] = 6
      if (gridWidth == 6) state.userConfig['gridWidth'] = 5
      if (gridWidth == 5) state.userConfig['gridWidth'] = 6
    }
  },
  actions: {
  },
  modules: {
  }
})
