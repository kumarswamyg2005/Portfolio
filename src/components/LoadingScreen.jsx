import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BOOT_LINES = [
  { text: '> initializing portfolio v2.0 ...', delay: 90 },
  { text: '> loading 3d engine ............ ok', delay: 260 },
  { text: '> compiling shaders ............ ok', delay: 240 },
  { text: '> brewing coffee ............... ☕', delay: 300 },
  { text: '> hiding easter eggs ........... 🤫', delay: 280 },
  { text: '> ready. welcome aboard.', delay: 320 },
]

export default function LoadingScreen({ onDone }) {
  const [lines, setLines] = useState([])
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)
  const doneRef = useRef(false)

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    setExiting(true)
    setTimeout(onDone, 650)
  }

  useEffect(() => {
    let cancelled = false
    const timers = []
    let acc = 200
    BOOT_LINES.forEach((line, i) => {
      acc += line.delay
      timers.push(setTimeout(() => {
        if (cancelled) return
        setLines((prev) => [...prev, line.text])
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100))
        if (i === BOOT_LINES.length - 1) timers.push(setTimeout(finish, 480))
      }, acc))
    })
    return () => { cancelled = true; timers.forEach(clearTimeout) }
  }, [])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          className="loader-screen"
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          onClick={finish}
        >
          <div className="loader-terminal">
            <div className="loader-titlebar">
              <span className="loader-dot" style={{ background: '#ff5f57' }} />
              <span className="loader-dot" style={{ background: '#febc2e' }} />
              <span className="loader-dot" style={{ background: '#28c840' }} />
              <span className="loader-title">gnk@portfolio — boot</span>
            </div>
            <div className="loader-body">
              {lines.map((l, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {l}
                </motion.p>
              ))}
              <span className="loader-cursor" />
            </div>
            <div className="loader-progress-track">
              <motion.div
                className="loader-progress-fill"
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.35 }}
              />
            </div>
            <p className="loader-skip">click anywhere to skip</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
