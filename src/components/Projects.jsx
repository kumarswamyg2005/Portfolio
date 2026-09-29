import { SiGithub } from 'react-icons/si'
import { HiArrowUpRight } from 'react-icons/hi2'
import Benchmark from './Benchmark'
import { PerimeterDiagram, DesignDenDiagram, ForewarnDiagram } from './Diagrams'

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
    name: 'Forewarn',
    kind: 'Serverless AWS · guarded AI',
    body: [
      'Weather services warn whole regions in the language of a bulletin, and the people most exposed to heat, flooding and storms often never read them. Forewarn takes the forecast for one exact place, turns it into one of four risk levels using fixed rules anyone can read, and writes three to five practical actions for a chosen group — outdoor workers, farmers, older people, parents.',
      'An AI model writes the wording, but it never decides the level or adds a fact. Its output is schema-checked, every numeral has to match the forecast or the place’s emergency number, and the text must be plain English. On any failure, including a timeout, the page shows hand-written advice rather than an error.',
      'The backend is serverless AWS, all in CDK v2. Authorization lives in the database query, the five-place quota is a DynamoDB transaction — a test fires ten creates at once and exactly one wins — and a CDK assertion test fails the build if any role grants Resource: "*". Each of the threat model’s 16 invariants maps to a test.',
    ],
    results: [
      { label: 'Test suite', value: <><em>163</em> tests</> },
      { label: 'Threat model', value: '16 invariants, each tested' },
      { label: 'Quota race', value: '10 parallel → exactly 1' },
    ],
    shots: [{ src: '/work/forewarn.png', w: 1600, h: 1042, alt: 'Three Forewarn phone screens: the list of places, Mumbai at the Watch level for strong wind with advice groups to choose from, and the printable notice with India’s emergency numbers.' }],
    caption: 'Pick a place, get one level and a few actions, print it as a notice.',
    diagram: 'forewarn',
    stack: ['TypeScript', 'React', 'AWS CDK v2', 'Lambda', 'DynamoDB', 'Cognito', 'Bedrock'],
    github: 'https://github.com/kumarswamyg2005/Forewarn',
  },
]

const MORE = [
  ['SeatLock', 'concurrent seat booking, zero double-bookings', 'https://github.com/kumarswamyg2005/SeatLock'],
  ['Unity Stream', 'WebXR streaming, built at Cymax', 'https://github.com/kumarswamyg2005/BTP-website-'],
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

const DIAGRAMS = {
  perimeter: [PerimeterDiagram, 'What every tool call passes through to earn that 0.34 ms.'],
  designden: [DesignDenDiagram, 'The read path behind the 97% — cache first, indexed fallback.'],
  forewarn: [ForewarnDiagram, 'The model writes the words; code decides the level and checks every number.'],
}

function Figure({ project }) {
  const { diagram, shots, caption } = project
  const [Diagram, diagramCaption] = DIAGRAMS[diagram] ?? []

  return (
    <div className="quest-figure">
      {diagram === 'perimeter' && <Benchmark />}
      {shots && (
        <figure className="plate frame">
          {shots.map(({ src, w, h, alt }) => (
            <img key={src} className="shot" src={src} alt={alt} width={w} height={h} loading="lazy" decoding="async" />
          ))}
          <figcaption>{caption}</figcaption>
        </figure>
      )}
      {Diagram && (
        <figure className="plate frame">
          <Diagram />
          <figcaption>{diagramCaption}</figcaption>
        </figure>
      )}
    </div>
  )
}

function Project({ project, index }) {
  const { name, kind, body, results, stack, github, demo } = project

  return (
    <article className="quest" id={name.toLowerCase().replace(/\s+/g, '-')} aria-labelledby={`q-${index}`}>
      <div className="quest-body">
        <p className="quest-meta">
          <span className="quest-num">Quest {String(index + 1).padStart(2, '0')}</span>
          <span>{kind}</span>
        </p>
        <h3 className="quest-name" id={`q-${index}`}>
          {name}
        </h3>

        {body.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}

        <dl className="loot">
          {results.map((r) => (
            <div key={r.label}>
              <dt>{r.label}</dt>
              <dd>{r.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="tags" aria-label="Stack">
          {stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <div className="quest-links">
          <a className="btn btn-small" href={github} target="_blank" rel="noopener noreferrer">
            <SiGithub size={15} aria-hidden="true" />
            Source
          </a>
          {demo && (
            <a className="btn btn-small" href={demo} target="_blank" rel="noopener noreferrer">
              <HiArrowUpRight size={15} aria-hidden="true" />
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
    <section id="projects" className="stage wrap" aria-labelledby="projects-title">
      <header className="stage-head">
        <span className="stage-tag">Stage 2</span>
        <h2 id="projects-title">Projects</h2>
        <p className="stage-note">Three featured · fourteen side quests</p>
      </header>

      {PROJECTS.map((project, i) => (
        <Project key={project.name} project={project} index={i} />
      ))}

      <div className="side">
        <h3 className="side-title">Side quests</h3>
        <ul className="side-list">
          {MORE.map(([name, blurb, href]) => (
            <li key={name}>
              <a href={href} target="_blank" rel="noopener noreferrer">
                <span className="side-name">{name}</span>
                <span className="side-dots" aria-hidden="true" />
                <span className="side-blurb">{blurb}</span>
                <HiArrowUpRight className="side-arrow" size={15} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
