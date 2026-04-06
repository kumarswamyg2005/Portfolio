import { useEffect, useRef } from 'react'

// 12 ember particles — orange/red, float upward
const EMBERS = [
  { size: 3, left:  6, bottom: 12, delay:  0, duration: 12, rise: -130, sway:  35 },
  { size: 2, left: 18, bottom: 22, delay:  3, duration:  9, rise: -110, sway: -28 },
  { size: 4, left: 28, bottom:  8, delay:  7, duration: 14, rise: -140, sway:  50 },
  { size: 2, left: 40, bottom: 18, delay:  1, duration: 11, rise: -120, sway: -40 },
  { size: 3, left: 52, bottom:  5, delay:  5, duration: 16, rise: -150, sway:  22 },
  { size: 2, left: 63, bottom: 25, delay:  9, duration: 10, rise: -100, sway: -55 },
  { size: 4, left: 72, bottom: 14, delay:  2, duration: 13, rise: -135, sway:  45 },
  { size: 3, left: 83, bottom:  9, delay:  6, duration: 15, rise: -125, sway: -32 },
  { size: 2, left: 91, bottom: 20, delay:  4, duration:  8, rise: -105, sway:  60 },
  { size: 3, left: 35, bottom: 30, delay: 11, duration: 17, rise: -145, sway: -20 },
  { size: 2, left: 57, bottom: 15, delay:  8, duration: 12, rise: -115, sway:  38 },
  { size: 4, left: 77, bottom:  6, delay: 10, duration: 18, rise: -160, sway: -48 },
]

export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const pos     = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { x: pos.x, y: pos.y }
    let rafId

    const show = () => { dot.style.opacity = '1'; ring.style.opacity = '1' }
    const hide = () => { dot.style.opacity = '0'; ring.style.opacity = '0' }
    const onMove = (e) => { pos.x = e.clientX; pos.y = e.clientY; show() }

    const onOver = (e) => {
      if (e.target.closest('a, button, [data-hover]')) {
        dot.style.width  = '10px'; dot.style.height = '10px'
        ring.style.width = '44px'; ring.style.height = '44px'
        ring.style.borderColor = 'rgba(193,18,31,0.8)'
      }
    }
    const onOut = (e) => {
      if (e.target.closest('a, button, [data-hover]')) {
        dot.style.width  = '6px'; dot.style.height = '6px'
        ring.style.width = '32px'; ring.style.height = '32px'
        ring.style.borderColor = 'rgba(193,18,31,0.4)'
      }
    }

    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.13
      ringPos.y += (pos.y - ringPos.y) * 0.13
      dot.style.transform  = `translate(${pos.x}px,${pos.y}px) translate(-50%,-50%)`
      ring.style.transform = `translate(${ringPos.x}px,${ringPos.y}px) translate(-50%,-50%)`
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    document.addEventListener('mousemove',   onMove, { passive: true })
    document.addEventListener('mouseleave',  hide)
    document.addEventListener('mouseenter',  show)
    document.addEventListener('pointerover', onOver)
    document.addEventListener('pointerout',  onOut)
    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove',   onMove)
      document.removeEventListener('mouseleave',  hide)
      document.removeEventListener('mouseenter',  show)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout',  onOut)
    }
  }, [])

  return (
    <>
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Ember particles — rise from bottom */}
      {EMBERS.map((e, i) => (
        <div
          key={i}
          className="ember-particle"
          style={{
            width:  e.size,
            height: e.size,
            left:   `${e.left}%`,
            bottom: `${e.bottom}%`,
            background: i % 3 === 0
              ? `rgba(250,163,7,0.9)`
              : i % 3 === 1
              ? `rgba(232,93,4,0.9)`
              : `rgba(193,18,31,0.9)`,
            opacity: 0.22,
            animationDuration: `${e.duration}s`,
            animationDelay:    `${e.delay}s`,
            '--ember-rise': `${e.rise}vh`,
            '--ember-sway': `${e.sway}px`,
          }}
        />
      ))}

      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
        style={{
          width: 6, height: 6,
          borderRadius: '50%',
          backgroundColor: '#c1121f',
          opacity: 0,
          boxShadow: '0 0 10px rgba(193,18,31,0.9), 0 0 20px rgba(193,18,31,0.5)',
          transition: 'width 0.2s, height 0.2s, opacity 0.3s',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none will-change-transform"
        style={{
          width: 32, height: 32,
          borderRadius: '50%',
          border: '1.5px solid rgba(193,18,31,0.4)',
          opacity: 0,
          transition: 'width 0.2s, height 0.2s, opacity 0.3s, border-color 0.2s',
        }}
      />
    </>
  )
}
