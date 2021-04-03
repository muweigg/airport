
import '@/assets/css/common.scss'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.addEventListener('resize', () => {
  // const isPortrait = window.matchMedia("(orientation: portrait)").matches
  const vh = window.innerHeight
  document.documentElement.style.setProperty('--vh', `${vh}px`)
});

const event = document.createEvent('Event')
event.initEvent('resize', true, true)
window.dispatchEvent(event)
