import {defer} from 'lodash'

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
    el.addEventListener('touchstart', () => pos(el))

    el.addEventListener('touchmove', (evt) => {
      if (el.offsetHeight < el.scrollHeight)
        evt._isScroller = true
    })

    el.addEventListener('scroll', () => pos(el))
  },
  inserted: el => defer(() => el.scrollTop = 1)
}
