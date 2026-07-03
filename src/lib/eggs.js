import confetti from 'canvas-confetti'

/* Tiny event bus so any component (navbar logo, footer cat, terminal)
   can trigger easter-egg behavior rendered by <EasterEggs />. */
const listeners = new Set()

export function onEgg(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function emitEgg(type, payload) {
  listeners.forEach((fn) => fn(type, payload))
}

export function toast(message, emoji = '✨') {
  emitEgg('toast', { message, emoji })
}

export function confettiBurst(x = 0.5, y = 0.5) {
  confetti({
    particleCount: 90,
    spread: 75,
    startVelocity: 38,
    origin: { x, y },
    colors: ['#6366f1', '#2dd4bf', '#a78bfa', '#fb7185', '#f59e0b', '#38bdf8'],
    disableForReducedMotion: true,
  })
}

export function confettiCannons() {
  const end = Date.now() + 1200
  const frame = () => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.75 },
      colors: ['#6366f1', '#2dd4bf', '#fb7185', '#f59e0b'],
      disableForReducedMotion: true,
    })
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.75 },
      colors: ['#a78bfa', '#38bdf8', '#fb7185', '#f59e0b'],
      disableForReducedMotion: true,
    })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  frame()
}

/** Spins <main> a full 360° around the current viewport center. */
export function barrelRoll() {
  const main = document.querySelector('main')
  if (!main || main.classList.contains('barrel-rolling')) return
  main.style.transformOrigin = `50% ${window.scrollY + window.innerHeight / 2}px`
  main.classList.add('barrel-rolling')
  setTimeout(() => {
    main.classList.remove('barrel-rolling')
    main.style.transformOrigin = ''
  }, 1400)
}
