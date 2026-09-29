import { useEffect, useRef, useState } from 'react'

/**
 * Perimeter's four-arm ablation, verbatim from the repo's README table.
 * A real <table> so the numbers are the content and the bars are decoration —
 * screen readers and copy-paste get the data, not a picture of it.
 * Styled as a boss fight: each bar is how much of the 213-payload attack got
 * through that arm. The bar widths are exact; the segments are only a mask.
 */
const ARMS = [
  { arm: 'No proxy', note: 'baseline', success: 100.0, p95: '—' },
  { arm: 'Detection only', note: 'DeBERTa + heuristics', success: 4.2, p95: '+34.2 ms' },
  { arm: 'Containment', note: 'policy + taint', success: 0.0, p95: '+0.34 ms', win: true },
  { arm: 'Full', note: 'both', success: 0.0, p95: '+30.7 ms' },
]

/* Bars fill once, when the table first comes into view — the one scroll-timed
   motion on the page, because it's the one piece of data worth arriving at. */
function useFirstView() {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!('IntersectionObserver' in window)) return setSeen(true)
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        setSeen(true)
        io.disconnect()
      },
      { rootMargin: '0px 0px -20% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, seen]
}

export default function Benchmark() {
  const [ref, seen] = useFirstView()

  return (
    <figure className="boss frame" ref={ref} data-seen={seen}>
      <div className="boss-head">
        <span className="boss-tag">Boss fight</span>
        <span className="boss-foe">213 payloads · 9 techniques · 1,264 trials</span>
      </div>
      <table>
        <caption>Indirect-injection success by arm — lower is better</caption>
        <thead>
          <tr>
            <th scope="col">Arm</th>
            <th scope="col">Injection success</th>
            <th scope="col">Added p95</th>
          </tr>
        </thead>
        <tbody>
          {ARMS.map(({ arm, note, success, p95, win }, i) => (
            <tr key={arm} className={win ? 'boss-win' : undefined} style={{ '--row': i }}>
              <th scope="row">
                {arm}
                <span>{note}</span>
              </th>
              <td className="boss-plot">
                <span className="hp" aria-hidden="true">
                  <span className="hp-fill" style={{ width: `${success}%` }} />
                </span>
                <span className="boss-value">
                  {success.toFixed(1)}%{win && <span className="boss-badge">Best</span>}
                </span>
              </td>
              <td className="boss-p95">{p95}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption>
        Containment blocks 213/213 at 1/100th the latency of the classifier — and the classifier’s
        unique contribution on top of it is zero.
      </figcaption>
    </figure>
  )
}
