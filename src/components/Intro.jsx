import { HiArrowDownTray, HiEnvelope } from 'react-icons/hi2'
import { LINKS } from './Footer'

/**
 * The intro is above the fold, so it animates once on load rather than going
 * through the scroll observer. `--i` is each element's place in the reading
 * order; index.css turns it into a delay.
 */
export default function Intro() {
  return (
    <section className="intro">
      {/* The name is the hero image. Both lines are 11 characters, so they
          set as one flush block at any size. */}
      <h1 className="intro-name">
        <span data-enter style={{ '--i': 0 }}>Gurram Naga</span>
        <span data-enter style={{ '--i': 1 }}>Kumaraswamy</span>
      </h1>

      <div className="intro-body">
        <p className="intro-lead" data-enter style={{ '--i': 3 }}>
          I build full-stack platforms, and I spend a lot of time trying to
          break the ones I build.
        </p>

        <p className="intro-meta" data-enter style={{ '--i': 4 }}>
          IIIT Sri City · final year, graduating May 2027 · open to 2027 new-grad roles
        </p>

        <p data-enter style={{ '--i': 5 }}>
          Over two internships I shipped a health-research data platform for
          researchers at Krea University and a VR streaming product at Cymax —
          both from schema design through to the UI people actually used.
        </p>

        <p data-enter style={{ '--i': 6 }}>
          The rest of my time goes to a narrower question: what an LLM agent
          does when the web page it just read tells it to do something else.
          That turned into <a className="link" href="#projects">Perimeter</a>,
          and into a habit of not trusting a defense until I have the benchmark
          that tries to defeat it.
        </p>

        <div className="intro-links" data-enter style={{ '--i': 7 }}>
          <a className="btn btn-primary" href={`mailto:${LINKS.email}`}>
            <HiEnvelope size={15} />
            Get in touch
          </a>
          <a className="btn" href={LINKS.resume} target="_blank" rel="noopener noreferrer">
            <HiArrowDownTray size={15} />
            Résumé
          </a>
        </div>
      </div>
    </section>
  )
}
