import {defer} from 'lodash'
import MobileDetect from 'mobile-detect'

const md = new MobileDetect(window.navigator.userAgent)
const iOS = md.os()

const platform = {'iOS': true}

// document.body.addEventListener('touchmove', (evt) => {
//   if (!evt._isScroller) {
//     evt.preventDefault()
//   }
// }, {passive: false})

function pos(el) {
  const top = el.scrollTop
    , totalScroll = el.scrollHeight
    , currentScroll = top + el.offsetHeight
  if (top === 0) {
    el.scrollTop = 1
  } else if (currentScroll === totalScroll) {
    el.scrollTop = top - 1
  }
}

export default {
  bind: (el, binding, vnode) => {
    if (!platform[iOS]) return

    el.classList.add('disabled-rebound')

    el.addEventListener('touchstart', () => pos(el))

    el.addEventListener('touchmove', (e) => {
      if (el.offsetHeight < el.scrollHeight) {
        e._isScroller = true
      } else {
        e.preventDefault()
      }
    })

    el.addEventListener('scroll', () => pos(el))
  },
  inserted: el => {
    if (!platform[iOS]) return

    defer(() => el.scrollTop = 1)
  }
}
