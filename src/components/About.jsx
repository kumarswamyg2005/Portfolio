import { LINKS } from './Footer'

const STACK = [
  ['Languages', 'Python · TypeScript · JavaScript · SQL'],
  ['Frontend',  'React · Next.js · Redux Toolkit · Three.js · Tailwind · Vite'],
  ['Backend',   'Node.js · Express · FastAPI · Socket.io · REST · JWT'],
  ['Data',      'PostgreSQL · MongoDB · Redis · Prisma · PostGIS'],
  ['LLM / AI',  'MCP · prompt-injection defense · RAG · vector search · ONNX Runtime · evals'],
  ['Infra',     'Docker · GitHub Actions · pytest · Jest · Stripe · Vercel'],
]

export default function About() {
  return (
    <>
      <section id="about" className="section">
        <h2 className="section-label" data-reveal>About</h2>
        <div className="section-body prose" data-reveal>
          <p>
            I’m in the final year of a Computer Science degree at IIIT Sri City,
            graduating in <strong>May 2027</strong>. Before that I did two
            internships, both remote, both ending with something in front of real
            users rather than a demo branch.
          </p>
          <p>
            What I’ve gotten most out of is measurement. Writing a defense is
            easy and it always feels like it works; building the thing that tries
            to defeat it is where you find out. The benchmark I wrote for
            Perimeter told me the first two versions of my own policy engine had
            holes in them, which is the only reason the third one doesn’t.
          </p>
          <p>
            Right now I’m most interested in the places where product engineering
            and security meet — agent containment, access control on data that
            actually matters, and correctness under concurrency.
          </p>
          {/* Add a line here about what you do away from the keyboard —
              it's the one thing on this page only you can write. */}
          <p>
            Easiest way to reach me is{' '}
            <a className="link" href={`mailto:${LINKS.email}`}>email</a>.
          </p>
        </div>
      </section>

      <section className="section">
        <h2 className="section-label" data-reveal>Stack</h2>
        <div className="section-body" data-reveal>
          <dl className="stack">
            {STACK.map(([group, items]) => (
              <div className="stack-row" key={group}>
                <dt>{group}</dt>
                <dd>{items}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  )
}
