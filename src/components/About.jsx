import {
  SiDocker, SiExpress, SiFastapi, SiGithubactions, SiJavascript, SiJest, SiJsonwebtokens,
  SiModelcontextprotocol, SiMongodb, SiNextdotjs, SiNodedotjs, SiOnnx, SiPostgresql, SiPrisma,
  SiPytest, SiPython, SiReact, SiRedis, SiRedux, SiSocketdotio, SiStripe, SiTailwindcss,
  SiThreedotjs, SiTypescript, SiVercel, SiVite,
} from 'react-icons/si'

/* Items without a brand mark get the pixel glyph in CSS. */
const STACK = [
  ['Languages', [['Python', SiPython], ['TypeScript', SiTypescript], ['JavaScript', SiJavascript], ['SQL']]],
  ['Frontend', [['React', SiReact], ['Next.js', SiNextdotjs], ['Redux Toolkit', SiRedux], ['Three.js', SiThreedotjs], ['Tailwind', SiTailwindcss], ['Vite', SiVite]]],
  ['Backend', [['Node.js', SiNodedotjs], ['Express', SiExpress], ['FastAPI', SiFastapi], ['Socket.io', SiSocketdotio], ['REST'], ['JWT', SiJsonwebtokens]]],
  ['Data', [['PostgreSQL', SiPostgresql], ['MongoDB', SiMongodb], ['Redis', SiRedis], ['Prisma', SiPrisma], ['PostGIS']]],
  ['LLM / AI', [['MCP', SiModelcontextprotocol], ['Prompt-injection defense'], ['RAG'], ['Vector search'], ['ONNX Runtime', SiOnnx], ['Evals']]],
  ['Infra', [['Docker', SiDocker], ['GitHub Actions', SiGithubactions], ['pytest', SiPytest], ['Jest', SiJest], ['Stripe', SiStripe], ['Vercel', SiVercel]]],
]

const SHEET = [
  ['Class', 'Full-stack engineer'],
  ['School', 'IIIT Sri City · Computer Science'],
  ['Level', 'Final year · graduating May 2027'],
  ['Seeking', '2027 new-grad software roles'],
  ['Focus', 'Agent containment · access control · concurrency'],
]

export default function About() {
  return (
    <>
      <section id="stack" className="stage wrap" aria-labelledby="stack-title">
        <header className="stage-head">
          <span className="stage-tag">Stage 3</span>
          <h2 id="stack-title">Stack</h2>
          <p className="stage-note">Inventory · what I reach for</p>
        </header>

        <div className="inventory">
          {STACK.map(([group, items]) => (
            <div className="inv-row" key={group}>
              <h3 className="inv-group">{group}</h3>
              <ul className="inv-slots">
                {items.map(([name, Icon]) => (
                  <li key={name} className="slot">
                    {Icon ? <Icon aria-hidden="true" /> : <span className="slot-glyph" aria-hidden="true" />}
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="stage wrap" aria-labelledby="about-title">
        <header className="stage-head">
          <span className="stage-tag">Stage 4</span>
          <h2 id="about-title">About</h2>
          <p className="stage-note">Player one</p>
        </header>

        <div className="about">
          <div className="prose">
            <p>
              I’m in the final year of a Computer Science degree at IIIT Sri City, graduating in{' '}
              <strong>May 2027</strong>. Before that I did two internships, both remote, both ending
              with something in front of real users rather than a demo branch.
            </p>
            <p>
              What I’ve gotten most out of is measurement. Writing a defense is easy and it always
              feels like it works; building the thing that tries to defeat it is where you find out.
              The benchmark I wrote for Perimeter told me the first two versions of my own policy
              engine had holes in them, which is the only reason the third one doesn’t.
            </p>
            <p>
              Right now I’m most interested in the places where product engineering and security
              meet — agent containment, access control on data that actually matters, and
              correctness under concurrency.
            </p>
            {/* Add a line here about what you do away from the keyboard —
                it's the one thing on this page only you can write. */}
          </div>

          <div className="sheet frame">
            <p className="sheet-title">Character sheet</p>
            <dl>
              {SHEET.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  )
}
