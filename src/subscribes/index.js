import {BehaviorSubject, timer} from 'rxjs'

const isPortrait = window.matchMedia("(orientation: portrait)").matches
export const screen = new BehaviorSubject(isPortrait)
window.addEventListener('resize',
  () => screen.next(window.matchMedia("(orientation: portrait)").matches))
