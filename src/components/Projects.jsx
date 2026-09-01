import { SiGithub } from 'react-icons/si'
import { HiArrowUpRight } from 'react-icons/hi2'
import Benchmark from './Benchmark'
import { PerimeterDiagram, DesignDenDiagram } from './Diagrams'

const PROJECTS = [
  {
    name: 'Perimeter',
    kind: 'LLM agent security',
    body: [
      'An LLM agent that reads a malicious web page will usually do what the page tells it to. The instructions arrive as data and get executed as intent, and the model has no way to tell the difference.',
      'Perimeter sits between the agent and its tools as a transparent MCP proxy. Every tool call passes through capability scoping and taint tracking, so data that came from an untrusted source can’t reach a tool it was never allowed to touch.',
      'I didn’t want to take my own word for it, so I wrote the attack suite before the defense — 213 payloads, 9 techniques, five delivery surfaces — and ran the four arms beside this.',
      'The result I didn’t expect: the classifier’s unique contribution on top of containment is zero. Everything DeBERTa caught, capability bounding had already caught, and containment also stops the nine attacks detection misses entirely. Bounding what a compromised agent can reach beats trying to recognise hostile text — and it costs a hundredth of the latency.',
    ],
    results: [
      { label: 'Blocked', value: <><em>213 / 213</em> payloads</> },
      { label: 'Benign completion', value: '99%' },
      { label: 'Quality gate', value: '71 tests · mypy strict · CI' },
    ],
    diagram: 'perimeter',
    stack: ['Python', 'MCP', 'DeBERTa', 'ONNX Runtime', 'Docker', 'pytest'],
    github: 'https://github.com/kumarswamyg2005/Perimeter',
  },
  {
    name: 'SeatLock',
    kind: 'Concurrency · ticketing',
    body: [
      'Two people click the same seat in the same millisecond. Exactly one of them should get it, and the other should be told clearly — not silently double-booked and refunded a week later.',
      'SeatLock holds an atomic Redis TTL lock for the duration of checkout and backs it with a PostgreSQL SELECT … FOR UPDATE transaction. The second lock isn’t redundant: if Redis drops a key, the database is still the thing that decides, so a cache failure costs latency instead of correctness.',
      'There’s a concurrency lab built into the app that fires simultaneous requests at a single seat, so you can watch the 200 and the 409 resolve against each other in under 5 ms rather than take my word for it.',
    ],
    results: [
      { label: 'Concurrent load', value: <><em>Zero</em> double-bookings</> },
      { label: 'Race resolution', value: 'Under 5 ms' },
      { label: 'Failure mode', value: 'Redis down → still correct' },
    ],
    shots: [
      { src: '/work/seatlock-seat_map.png', w: 1600, h: 902, alt: 'SeatLock’s stadium seat map: available seats in green, seats held by another checkout dimmed, booked seats disabled.' },
      { src: '/work/seatlock-concurrency_lab.png', w: 1600, h: 902, alt: 'The in-app concurrency lab, showing two simultaneous claims on one seat resolving to a 200 and a 409.' },
    ],
    caption: 'The seat map, and the lab that races two claims at a single seat.',
    stack: ['React', 'TypeScript', 'Node.js', 'Prisma', 'PostgreSQL', 'Redis', 'Stripe'],
    github: 'https://github.com/kumarswamyg2005/SeatLock',
  },
  {
    name: 'DesignDen',
    kind: 'Full-stack commerce',
    body: [
      'A storefront for custom clothing, where the customer designs the garment in a Three.js studio and five different roles — customer, designer, manager, delivery, admin — each get the dashboard their part of the order actually needs.',
      'Product queries were the bottleneck once the catalogue grew. Profiling pointed at unindexed filter paths rather than raw volume, so the fix was 14 targeted MongoDB indexes plus a Redis layer in front of the hot reads: 97% off query latency.',
      'Shipped behind a Docker and GitHub Actions pipeline gated on 84 Jest tests.',
    ],
    results: [
      { label: 'Query latency', value: <><em>−97%</em></> },
      { label: 'Role dashboards', value: '5' },
      { label: 'CI gate', value: '84 Jest tests' },
    ],
    diagram: 'designden',
    stack: ['React', 'Redux Toolkit', 'Express', 'MongoDB', 'Redis', 'Three.js', 'Docker'],
    github: 'https://github.com/kumarswamyg2005/Designden',
  },
  {
    name: 'Unity Stream',
    kind: 'WebXR · built at Cymax',
    body: [
      'The VR streaming platform I built during my Cymax internship. 360° video plays in the browser through WebXR and A-Frame, so a session starts from a link instead of an install.',
      'Media is encrypted with AES-256 through the WebCrypto API, and the session manager holds multiple headsets on a synchronized broadcast state so a room watches the same frame.',
    ],
    results: [
      { label: 'Media', value: 'AES-256 via WebCrypto' },
      { label: 'Session', value: 'Multi-headset sync' },
      { label: 'Delivery', value: 'In-browser, no install' },
    ],
    shots: [{ src: '/work/unitystream.png', w: 1600, h: 1000, alt: 'Unity Stream’s sign-in screen: a split dark layout with the session entry form on the right.' }],
    caption: 'Session entry — a headset joins from a link, with no install.',
    stack: ['React', 'Vite', 'A-Frame', 'WebXR', 'WebCrypto'],
    github: 'https://github.com/kumarswamyg2005/BTP-website-',
    demo: 'https://btp-website-sage.vercel.app',
  },
]

const MORE = [
  ['Helix', 'repo archaeology in 3D', 'https://github.com/kumarswamyg2005/Helix'],
  ['GhostDoc', 'screen recordings → docs', 'https://github.com/kumarswamyg2005/GhostDoc'],
  ['SynthLab', 'synthetic tabular data', 'https://github.com/kumarswamyg2005/SynthLab'],
  ['LegacyLift', 'legacy code migration', 'https://github.com/kumarswamyg2005/LegacyAi'],
  ['ClaimFlow', 'medical claim adjudication', 'https://github.com/kumarswamyg2005/claim_flow'],
  ['Narrato', 'multi-voice audiobooks', 'https://github.com/kumarswamyg2005/Narrato'],
  ['BankLoan-AI', 'loan risk + SHAP', 'https://github.com/kumarswamyg2005/BankLoan-AI'],
  ['CropScan', 'crop disease, 38 classes', 'https://github.com/kumarswamyg2005/Crop-Disease-Detector'],
  ['StockSensei', 'market signal dashboard', 'https://github.com/kumarswamyg2005/StockSense-Ai'],
  ['Real-Air', 'city air-quality forecasts', 'https://github.com/kumarswamyg2005/Real-Air-Real-time-Air-Quality-Health-Risk-Predictor'],
  ['AI Skin Clinic', 'dermatology triage on-device', 'https://github.com/kumarswamyg2005/AI_Skin_Clinic'],
  ['Temporal Calibration', 'LLM confidence vs. cutoff', 'https://github.com/kumarswamyg2005/temporal-calib-pilot'],
]

function Figure({ project }) {
  const { diagram, shots, caption } = project

  if (diagram === 'perimeter') {
    return (
      <div className="work-figure work-figure-diagram">
        <Benchmark />
        <figure>
          <PerimeterDiagram />
          <figcaption>What every tool call passes through to earn that 0.34 ms.</figcaption>
        </figure>
      </div>
    )
  }
  if (diagram === 'designden') {
    return (
      <figure className="work-figure work-figure-diagram">
        <DesignDenDiagram />
        <figcaption>The read path behind the 97% — cache first, indexed fallback.</figcaption>
      </figure>
    )
  }
  if (!shots) return null

  return (
    <figure className="work-figure">
      {shots.map(({ src, w, h, alt }) => (
        <img
          key={src}
          className="shot"
          src={src}
          alt={alt}
          width={w}
          height={h}
          loading="lazy"
          decoding="async"
        />
      ))}
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

function Project({ project, index }) {
  const { name, kind, body, results, stack, github, demo } = project
  const hasFigure = Boolean(project.diagram || project.shots)

  return (
    <article
      className={`work-item ${hasFigure ? '' : 'work-item-plain'}`}
      data-reveal
    >
      <div className="work-body">
        <span className="work-index" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <header className="project-head">
          <h3 className="project-name">{name}</h3>
          <span className="project-kind">{kind}</span>
        </header>

        {body.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}

        <dl className="results">
          {results.map((r) => (
            <div key={r.label}>
              <dt>{r.label}</dt>
              <dd>{r.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="tags">
          {stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <div className="project-links">
          <a href={github} target="_blank" rel="noopener noreferrer">
            <SiGithub size={14} />
            Source
          </a>
          {demo && (
            <a href={demo} target="_blank" rel="noopener noreferrer">
              <HiArrowUpRight size={14} />
              Live demo
            </a>
          )}
        </div>
      </div>

      <Figure project={project} />
    </article>
  )
}

export default function Projects() {
  return (
    <>
      <section id="projects" className="work">
        <h2 className="section-label work-label" data-reveal>Selected work</h2>
        {PROJECTS.map((project, i) => (
          <Project key={project.name} project={project} index={i} />
        ))}
      </section>

      <section className="section">
        <h2 className="section-label" data-reveal>Also built</h2>
        <div className="section-body" data-reveal>
          <ul className="more">
            {MORE.map(([name, blurb, href]) => (
              <li key={name}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {name}
                </a>
                <span> — {blurb}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
