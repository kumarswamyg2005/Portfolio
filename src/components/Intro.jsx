import { HiArrowDownTray, HiEnvelope } from 'react-icons/hi2'
import { SiGithub } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa6'
import Cabinet from './Cabinet'
import { LINKS } from './Footer'

/* Four real numbers, straight from the projects below — an arcade
   high-score table is just a list of someone's best results. */
const SCORES = [
  { rank: '1st', score: '213/213', what: 'injection payloads blocked', where: 'Perimeter' },
  { rank: '2nd', score: '0', what: 'double-bookings under concurrent load', where: 'SeatLock' },
  { rank: '3rd', score: '−97%', what: 'product query latency', where: 'DesignDen' },
  { rank: '4th', score: '2', what: 'internships, both shipped to real users', where: 'Krea · Cymax' },
]

/**
 * Above the fold, so it animates once on load instead of on scroll. `--i` is
 * each element's place in the reading order; index.css turns it into a delay.
 */
export default function Intro() {
  return (
    <>
      <section className="hero wrap" aria-labelledby="hero-name">
        <p className="hero-status" data-enter style={{ '--i': 0 }}>
          <span className="status-dot" aria-hidden="true" />
          Open to 2027 new-grad roles
          <span className="hero-status-sep" aria-hidden="true">·</span>
          <span>IIIT Sri City, graduating May 2027</span>
        </p>

        <h1 className="hero-name" id="hero-name">
          <span data-enter style={{ '--i': 1 }}>Gurram Naga</span>
          <span data-enter style={{ '--i': 2 }}>
            <span className="hero-name-mark">Kumaraswamy</span>
          </span>
        </h1>

        <p className="hero-lead" data-enter style={{ '--i': 3 }}>
          I build full-stack platforms, and I spend a lot of time trying to break the ones I
          build.
        </p>

        <div className="hero-actions" data-enter style={{ '--i': 4 }}>
          <a className="btn btn-primary" href={`mailto:${LINKS.email}`}>
            <HiEnvelope size={17} aria-hidden="true" />
            Get in touch
          </a>
          <a className="btn" href={LINKS.resume} target="_blank" rel="noopener noreferrer">
            <HiArrowDownTray size={17} aria-hidden="true" />
            Résumé
          </a>
          <a className="btn btn-icon" href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <SiGithub size={18} aria-hidden="true" />
          </a>
          <a className="btn btn-icon" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn size={18} aria-hidden="true" />
          </a>
        </div>

        <div className="hero-stage" data-enter style={{ '--i': 5 }}>
          <Cabinet />
        </div>

        <div className="hero-body" data-enter style={{ '--i': 6 }}>
          <p>
            Over two internships I shipped a health-research data platform for researchers at
            Krea University and a VR streaming product at Cymax — both from schema design through
            to the UI people actually used.
          </p>
          <p>
            The rest of my time goes to a narrower question: what an LLM agent does when the web
            page it just read tells it to do something else. That turned into{' '}
            <a className="link" href="#perimeter">
              Perimeter
            </a>
            , and into a habit of not trusting a defense until I have the benchmark that tries to
            defeat it.
          </p>
        </div>
      </section>

      <section className="scores wrap" aria-labelledby="scores-title">
        <h2 className="scores-title" id="scores-title">
          Hi-scores
        </h2>
        <ol className="scores-list">
          {SCORES.map((s) => (
            <li key={s.rank}>
              <span className="scores-rank">{s.rank}</span>
              <span className="scores-score">{s.score}</span>
              <span className="scores-what">
                {s.what}
                <span className="scores-where">{s.where}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
