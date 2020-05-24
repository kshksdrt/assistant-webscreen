export default {
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
  moveGroupUp (state, payload) {
    const index = state.userConfig.groups.findIndex(x => {
      return x.name == payload
    })
    state.userConfig.groups.move(index, index-1)
  },
  moveGroupDown (state, payload) {
    const index = state.userConfig.groups.findIndex(x => {
      return x.name == payload
    })
    state.userConfig.groups.move(index, index+1)
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
  moveItemUp (state, payload) {
    const group = state.userConfig.groups.find(x => {
      return payload.groupName == x.name
    })
    const index = group.items.findIndex(x => {
      return payload.itemLabel == x.label
    })
    group.items.move(index, index - 1)
  },
  moveItemDown (state, payload) {
    const group = state.userConfig.groups.find(x => {
      return payload.groupName == x.name
    })
    const index = group.items.findIndex(x => {
      return payload.itemLabel == x.label
    })
    group.items.move(index, index + 1)
  },
  saveChanges (state) {
    state.changesSaved = true
  },
  toggleGridWidth (state) {
    const gridWidth = state.userConfig['gridWidth']
    if (!gridWidth) state.userConfig['gridWidth'] = 6
    if (gridWidth == 6) state.userConfig['gridWidth'] = 5
    if (gridWidth == 5) state.userConfig['gridWidth'] = 6
  },
}

Array.prototype.move = function (from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
};
