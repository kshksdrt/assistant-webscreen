import Vuex from 'vuex'
import mutations from './mutations'

export default Vuex.createStore({
  state: {
    production: true,
    editMode: false,
    changesSaved: true,
    userConfig: {
      groups: [
        {
          name: 'Button group',
          type: 'buttons',
          items: [
            {
              type: 'svg',
              icon: 'email',
              color: 'bg-indigo-500',
              label: 'Send email',
              command: 'email'
            },
            {
              type: 'svg',
              icon: 'alarm',
              color: 'bg-indigo-500',
              label: 'Set an alarm',
              command: 'alarm'
            },
          ]
        },
        {
          name: 'Icon group',
          type: 'icons',
          items: [
            {
              type: 'svg',
              icon: 'face',
              color: 'bg-indigo-500',
              label: 'testing',
              command: 'Youtube'
            },
            {
              type: 'svg',
              icon: 'email',
              color: 'bg-indigo-500',
              label: 'tgdft',
              command: 'email'
            },
            {
              type: 'svg',
              icon: 'edit',
              color: 'bg-indigo-500',
              label: 'tgfdhbh',
              command: 'alarm'
            },
            {
              type: 'svg',
              icon: 'delete',
              color: 'bg-indigo-500',
              label: 'fdhthb',
              command: 'email'
            },
            {
              type: 'svg',
              icon: 'remove',
              color: 'bg-indigo-500',
              label: 'gyhdtdf',
              command: 'alarm'
            },
            {
              type: 'svg',
              icon: 'web',
              color: 'bg-indigo-500',
              label: 'gdftbhdf',
              command: 'email'
            },
            {
              type: 'svg',
              icon: 'alarm',
              color: 'bg-indigo-500',
              label: 'tddddddgf',
              command: 'alarm'
            },
          ]
        },
      ],
      gridWidth: 5,
    },
  },
  mutations,
})
