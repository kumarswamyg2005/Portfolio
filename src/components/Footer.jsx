export const LINKS = {
  email:    'nagakumaraswamy.g23@iiits.in',
  github:   'https://github.com/kumarswamyg2005',
  linkedin: 'https://www.linkedin.com/in/naga-kumaraswamy-gurram-a374833b0/',
  resume:   '/resume.pdf',
}

/* 10×10 pixel coin: O outline, G gold, L highlight, D shade. */
const COIN = [
  '...OOOO...',
  '.OOGGGGOO.',
  '.OLLGGGDO.',
  'OLLGGDGGDO',
  'OLGGGDGGDO',
  'OGGGGDGGDO',
  'OGGGGDGDDO',
  '.OGGGGGDO.',
  '.OODDDDOO.',
  '...OOOO...',
]

function Coin() {
  return (
    <svg className="coin" viewBox="0 0 10 10" shapeRendering="crispEdges" aria-hidden="true">
      {COIN.flatMap((row, y) =>
        [...row].map((c, x) => (c === '.' ? null : <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" className={`coin-${c}`} />)),
      )}
    </svg>
  )
}

const MENU = [
  { label: 'Yes — email me', note: LINKS.email, href: `mailto:${LINKS.email}` },
  { label: 'GitHub', note: 'github.com/kumarswamyg2005', href: LINKS.github, external: true },
  { label: 'LinkedIn', note: 'Naga Kumaraswamy Gurram', href: LINKS.linkedin, external: true },
  { label: 'Résumé', note: 'PDF, one page', href: LINKS.resume, external: true },
]

export default function Footer() {
  return (
    <footer>
      <section id="contact" className="continue wrap" aria-labelledby="contact-title">
        <div className="continue-head">
          <Coin />
          <h2 id="contact-title" className="continue-title">
            Continue?
          </h2>
          <p className="continue-sub">
            Hiring for 2027 new-grad roles? Email is the easiest way to reach me.
          </p>
        </div>

        <ul className="menu">
          {MENU.map(({ label, note, href, external }) => (
            <li key={label}>
              <a href={href} {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
                <span className="menu-label">{label}</span>
                <span className="menu-note">{note}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="wrap">
        <div className="colophon">
          <span>© {new Date().getFullYear()} Gurram Naga Kumaraswamy</span>
          <span>Built with React, Vite and three.js</span>
          <span>
            Press <kbd>T</kbd> for night / day
          </span>
        </div>
      </div>
    </footer>
  )
}
