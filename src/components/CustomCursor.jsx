import { useEffect, useRef, useState } from 'react'

/**
 * Custom cursor: a solid dot that sticks to the pointer plus a lagging
 * ring that grows over interactive elements. Desktop pointers only —
 * touch devices keep their native behavior.
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return
    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')

    const pos = { x: -100, y: -100 }
    const ring = { x: -100, y: -100 }
    let hovering = false
    let raf

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`
    }

    const onOver = (e) => {
      hovering = !!e.target.closest('a, button, [data-cursor="pointer"], input, textarea')
      if (ringRef.current) ringRef.current.classList.toggle('cursor-ring-hover', hovering)
    }

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.16
      ring.y += (pos.y - ring.y) * 0.16
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    raf = requestAnimationFrame(loop)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div className="grain-overlay" />
      {enabled && (
        <>
          <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
          <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
        </>
      )}
    </>
  )
}
