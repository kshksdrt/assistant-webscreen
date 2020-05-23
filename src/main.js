import { createApp } from 'vue';
import App from './App.vue'
import store from './store'

import '@/assets/styles.css'
import 'material-icons-font/material-icons-font.css'

// Usage examples
// <i class="material-icons">face</i>
// <i class="material-icons md-48">face</i>
// <i class="material-icons md-dark">face</i>
// <i class="material-icons md-48 md-dark md-inactive">face</i>
// <i class="material-icons md-light md-inactive">face</i>

// List of icons
// https://material.io/resources/icons/?style=baseline

createApp(App).use(store).mount('#app')
