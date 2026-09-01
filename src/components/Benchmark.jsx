/**
 * Perimeter's four-arm ablation, verbatim from the repo's README table.
 * A real <table> so the numbers are the content and the bars are decoration —
 * screen readers and copy-paste get the data, not a picture of it.
 */
const ARMS = [
  { arm: 'No proxy',        note: 'baseline',              success: 100.0, p95: '—' },
  { arm: 'Detection only',  note: 'DeBERTa + heuristics',  success: 4.2,   p95: '+34.2 ms' },
  { arm: 'Containment',     note: 'policy + taint',        success: 0.0,   p95: '+0.34 ms', win: true },
  { arm: 'Full',            note: 'both',                  success: 0.0,   p95: '+30.7 ms' },
]

export default function Benchmark() {
  return (
    <figure className="bench">
      <table>
        <caption>
          Indirect-injection success by arm — lower is better
        </caption>
        <thead>
          <tr>
            <th scope="col">Arm</th>
            <th scope="col">Injection success</th>
            <th scope="col">Added p95</th>
          </tr>
        </thead>
        <tbody>
          {ARMS.map(({ arm, note, success, p95, win }) => (
            <tr key={arm} className={win ? 'bench-win' : undefined}>
              <th scope="row">
                {arm}
                <span>{note}</span>
              </th>
              <td className="bench-plot">
                <span className="bench-track" aria-hidden="true">
                  <span className="bench-bar" style={{ width: `${success}%` }} />
                </span>
                <span className="bench-value">{success.toFixed(1)}%</span>
              </td>
              <td className="bench-p95">{p95}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <figcaption>
        213 payloads · 9 techniques · 1,264 trials. Containment blocks 213/213 at
        1/100th the latency of the classifier — and the classifier’s unique
        contribution on top of it is zero.
      </figcaption>
    </figure>
  )
}
