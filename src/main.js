import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {screen} from './subscribes'

import '@/js/directives'
import '@/assets/css/common.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

screen.subscribe(isPortrait => {
  const vw = window[!isPortrait ? 'innerWidth' : 'innerHeight'],
    vh = window[!isPortrait ? 'innerHeight' : 'innerWidth']
  document.documentElement.style.setProperty('--rvw', `${vw}px`)
  document.documentElement.style.setProperty('--rvh', `${vh}px`)
});

window.addEventListener('resize', () => {
  const vh = window.innerHeight
  document.documentElement.style.setProperty('--vh', `${vh}px`)
});

const event = document.createEvent('Event')
event.initEvent('resize', true, true)
window.dispatchEvent(event)

document.body.addEventListener('touchmove', function(evt) {
  //In this case, the default behavior is scrolling the body, which
  //would result in an overflow.  Since we don't want that, we preventDefault.
  if(!evt._isScroller) {
    evt.preventDefault()
  }
}, {passive: false})
