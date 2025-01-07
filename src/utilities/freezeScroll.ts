import canUseDOM from './canUseDOM'

export default function freezeScroll(freeze) {
  if (canUseDOM) {
    document.getElementsByTagName('html')[0].style.overflow = freeze ? 'hidden' : 'auto'
  }
}
