import { useEffect, useRef, useState } from 'react'

const DESCRIPTION =
  'A 3D arcade cabinet with kumaraswamy.dev on its marquee. Its screen plays a demo of Perimeter: red, tainted tool calls fall from an untrusted page and stop at the proxy line, green clean calls pass through to the tools, and the counter climbs to 213 of 213 blocked.'

/**
 * Reserves the box, then lazy-loads three.js so the 3D never competes with
 * the text for first paint. No WebGL (or the chunk fails) → a still render.
 */
export default function Cabinet() {
  const host = useRef(null)
  const api = useRef(null)
  const [status, setStatus] = useState('loading')
  // Reduced motion starts on the result frame; the demo only runs if asked.
  const [paused, setPaused] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    let gone = false
    import('../three/cabinet.js')
      .then(({ mountCabinet }) => {
        if (gone) return
        api.current = mountCabinet(host.current, { reducedMotion: paused })
        setStatus('ready')
      })
      .catch(() => !gone && setStatus('fallback'))
    return () => {
      gone = true
      api.current?.dispose()
      api.current = null
    }
    // Mount once; `paused` is only the starting state here.
  }, [])

  useEffect(() => {
    api.current?.setPaused(paused)
  }, [paused])

  return (
    <div className="viewport" data-status={status}>
      <div ref={host} className="cabinet" role="img" aria-label={DESCRIPTION}>
        {status === 'fallback' && <img src="/cabinet.png" alt="" width="560" height="700" />}
      </div>
      <span className="viewport-label" aria-hidden="true">
        P1 · Perimeter demo
      </span>
      {status === 'ready' && (
        <>
          <button type="button" className="viewport-btn" onClick={() => setPaused((p) => !p)}>
            {paused ? 'Play demo' : 'Pause demo'}
          </button>
          <span className="viewport-hint" aria-hidden="true">
            Drag to spin
          </span>
        </>
      )}
    </div>
  )
}
