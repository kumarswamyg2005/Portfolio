import { useEffect } from 'react'
import Header from './components/Header'
import Intro from './components/Intro'
import Experience from './components/Experience'
import Projects from './components/Projects'
import About from './components/About'
import Footer from './components/Footer'

/**
 * One page, top to bottom. The only motion on the site is a fade-in as
 * sections enter the viewport — handled here with a single observer
 * rather than a motion library.
 */
function useRevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

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
      '%ckumaraswamy.dev',
      'font: 600 14px ui-monospace, Menlo, monospace; color: #8aae1f',
    )
    console.log(
      [
        "Since you're in here — the ablation this whole page is built around:",
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
        'Hiring? nagakumaraswamy.g23@iiits.in — and T flips the theme.',
      ].join('\n'),
    )
  }, [])
}

export default function App() {
  useRevealOnScroll()
  useConsoleNote()

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main" className="wrap">
        <Intro />
        <Experience />
        <Projects />
        <About />
      </main>
      <Footer />
    </>
  )
}
