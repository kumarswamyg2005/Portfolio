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
    <section id="experience" className="stage wrap" aria-labelledby="experience-title">
      <header className="stage-head">
        <span className="stage-tag">Stage 1</span>
        <h2 id="experience-title">Experience</h2>
        <p className="stage-note">Two internships · both shipped to real users</p>
      </header>

      <div className="saves">
        {ROLES.map((role, i) => (
          <article key={role.org} className="save frame">
            <p className="save-bar">
              <span className="save-slot">Save {String(i + 1).padStart(2, '0')}</span>
              <span>
                {role.period} · {role.location}
              </span>
            </p>
            <h3 className="save-org">{role.org}</h3>
            <p className="save-role">{role.title}</p>
            {role.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <ul className="tags" aria-label="Stack">
              {role.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
