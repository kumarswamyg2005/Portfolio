import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * 3D perspective tilt wrapper with a moving glare highlight.
 * Tilt tracks the cursor; everything springs back on leave.
 */
export default function TiltCard({ children, max = 7, glare = true, className, style }) {
  const ref = useRef(null)
  const [hovering, setHovering] = useState(false)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spx = useSpring(px, { stiffness: 160, damping: 18 })
  const spy = useSpring(py, { stiffness: 160, damping: 18 })
  const rotateX = useTransform(spy, [0, 1], [max, -max])
  const rotateY = useTransform(spx, [0, 1], [-max, max])
  const glareBg = useTransform(
    [spx, spy],
    ([gx, gy]) =>
      `radial-gradient(circle at ${20 + gx * 60}% ${20 + gy * 60}%, rgba(255,255,255,0.10), transparent 55%)`,
  )

  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

  const onMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }
  const reset = () => { px.set(0.5); py.set(0.5); setHovering(false) }

  if (isTouch) return <div className={className} style={style}>{children}</div>

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={reset}
      style={{
        ...style,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 900,
      }}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden="true"
          className="tilt-glare"
          style={{ opacity: hovering ? 1 : 0, background: glareBg }}
        />
      )}
    </motion.div>
  )
}
