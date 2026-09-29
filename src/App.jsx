import { useEffect } from 'react'
import Header from './components/Header'
import Intro from './components/Intro'
import Experience from './components/Experience'
import Projects from './components/Projects'
import About from './components/About'
import Footer from './components/Footer'

/**
 * For anyone who opens devtools. Numbers are the same four arms the page
 * renders — if you change one, change it in Benchmark.jsx too.
 * Module-level flag: StrictMode mounts twice in dev.
 */
let noted = false
function useConsoleNote() {
  useEffect(() => {
    if (noted) return
    noted = true
    console.log(
      '%c KUMARASWAMY.DEV %c player 1 ready',
      'font: 600 13px ui-monospace, Menlo, monospace; background: #ffc629; color: #141209; padding: 2px 4px',
      'font: 13px ui-monospace, Menlo, monospace; color: #9a9588',
    )
    console.log(
      [
        "Since you're in here — the ablation the cabinet's demo is built on:",
        '',
        '  Arm                            Success   Added p95',
        '  No proxy (baseline)             100.0%           —',
        '  Detection only (DeBERTa)          4.2%    +34.2 ms',
        '  Containment (policy + taint)      0.0%    +0.34 ms',
        '  Full (both)                       0.0%    +30.7 ms',
        '',
        '  213 payloads · 9 techniques · 1,264 trials.',
        "  The classifier's unique contribution on top of containment is zero,",
        '  and containment costs a hundredth of the latency.',
        '  github.com/kumarswamyg2005/Perimeter',
        '',
        'Hiring? nagakumaraswamy.g23@iiits.in — and T flips night/day.',
      ].join('\n'),
    )
  }, [])
}

export default function App() {
  useConsoleNote()

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Intro />
        <Experience />
        <Projects />
        <About />
      </main>
      <Footer />
    </>
  )
}
