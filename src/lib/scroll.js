import Lenis from 'lenis'

let lenis = null

export function initSmoothScroll() {
  if (lenis) return lenis
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true })
  const raf = (time) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
  return lenis
}

export function scrollToSection(hash) {
  const target = document.querySelector(hash)
  if (!target) return
  if (lenis) lenis.scrollTo(target, { offset: -70, duration: 1.4 })
  else target.scrollIntoView({ behavior: 'smooth' })
}
