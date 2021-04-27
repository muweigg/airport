import {defer} from 'lodash'
import MobileDetect from 'mobile-detect'

const md = new MobileDetect(window.navigator.userAgent);
const iOS = md.os();

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

const platform = {'iOS': true}

export default {
  bind: (el, binding, vnode) => {
    if (!platform[iOS]) return;

    el.classList.add('disabled-rebound');

    el.addEventListener('touchstart', () => pos(el))

    el.addEventListener('touchmove', (evt) => {
      if (el.offsetHeight < el.scrollHeight)
        evt._isScroller = true
    })

    el.addEventListener('scroll', () => pos(el))
  },
  inserted: el => {
    if (!platform[iOS]) return;

    defer(() => el.scrollTop = 1)
  }
}
