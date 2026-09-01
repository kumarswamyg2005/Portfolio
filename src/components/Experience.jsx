const ROLES = [
  {
    org: 'Krea University',
    title: 'Full Stack Developer Intern',
    period: 'May — Aug 2026',
    location: 'Remote',
    body: [
      'Shipped the pilot release of PRISM, a health-research data management platform, from schema design through to the production UI. Researchers run live data collection on it.',
      'The records are medical, so access control was the hard part rather than an afterthought: I designed the role-based permission model and the multi-factor verification around it, working to what India’s DPDP Act 2023 requires of personal health data.',
    ],
    stack: ['React', 'FastAPI', 'PostgreSQL', 'RBAC', 'MFA'],
  },
  {
    org: 'Cymax',
    title: 'Full Stack Developer Intern',
    period: 'Jan — Apr 2026',
    location: 'Remote',
    body: [
      'Built Unity Stream, a VR streaming platform that runs immersive sessions in the browser across several headset targets — no native app to install.',
      'Stream and session data is encrypted with AES-256 via WebCrypto, and the session manager keeps concurrent headsets on the same broadcast state.',
    ],
    stack: ['React', 'A-Frame / WebXR', 'WebCrypto', 'Vite'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="section-stack">
      <h2 className="section-label" data-reveal>Experience</h2>

      {ROLES.map((role, i) => (
        <article
          key={role.org}
          className="role"
          data-reveal
          style={{ transitionDelay: `${i * 70}ms` }}
        >
          {/* dates live in the left rail — the gutter earns its keep */}
          <div className="role-when">
            <span className="role-period">{role.period}</span>
            <span className="role-place">{role.location}</span>
          </div>

          <div className="role-main">
            <h3 className="role-org">
              {role.org}
              <span className="role-title">{role.title}</span>
            </h3>
            {role.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <ul className="tags">
              {role.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </section>
  )
}
