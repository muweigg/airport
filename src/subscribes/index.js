import {BehaviorSubject} from 'rxjs'
import {distinctUntilChanged} from 'rxjs/operators'

const isPortrait = window.matchMedia("(orientation: portrait)").matches
export const screen = new BehaviorSubject(isPortrait).pipe(distinctUntilChanged())
window.addEventListener('resize',
  () => screen.next(window.matchMedia("(orientation: portrait)").matches))
