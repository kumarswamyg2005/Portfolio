import { SiGithub } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa6'
import { HiPaperAirplane } from 'react-icons/hi2'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <div className="section-divider" />

      {/* Subtle footer wash */}
      <div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(56,189,248,0.08), rgba(251,113,133,0.04), transparent)',
        }}
      />

      <div className="section-container relative z-10 pt-16 pb-10">

        <div className="mb-12">
          <p className="label-editorial mb-5" style={{ opacity: 0.5 }}>
            What are you waiting for
          </p>
          <h2
            className="footer-heading font-display font-extrabold leading-[1.05]"
            style={{ color: 'rgba(226,232,240,0.88)' }}
          >
            Let's build something<br />
            <span className="gradient-text">remarkable.</span>
          </h2>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="mailto:nagakumaraswamy.g23@iiits.in"
              className="btn-accent btn-shimmer inline-flex items-center gap-2 px-7 py-3 rounded-md font-display font-bold text-sm tracking-wide"
              style={{
                background: 'var(--accent)',
                color: '#fff',
                letterSpacing: '0.06em',
                boxShadow: '0 0 22px rgba(99,102,241,0.35)',
                transition: 'box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 0 38px rgba(99,102,241,0.55)'
                e.currentTarget.style.transform = 'scale(1.04)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 0 22px rgba(99,102,241,0.35)'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <HiPaperAirplane size={15} />
              Say Hello
            </a>
            <span className="font-body text-sm" style={{ color: 'rgba(148,163,184,0.45)' }}>
              nagakumaraswamy.g23@iiits.in
            </span>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-7"
          style={{ borderTop: '1px solid rgba(99,102,241,0.08)' }}
        >
          {/* Wordmark */}
          <span className="font-display font-bold text-sm tracking-widest select-none" style={{ color: 'rgba(226,232,240,0.2)', letterSpacing: '0.1em' }}>
            GNK
          </span>

          {/* Copyright */}
          <p className="font-body text-xs tracking-wide order-last sm:order-none" style={{ color: 'rgba(148,163,184,0.4)' }}>
            Built by G.N. Kumaraswamy · {year}
          </p>

          {/* Social */}
          <div className="flex items-center gap-5">
            {[
              { href: 'https://github.com/kumarswamyg2005', icon: SiGithub, size: 16, hoverColor: 'var(--accent-light)' },
              { href: 'https://www.linkedin.com/in/naga-kumaraswamy-gurram-a374833b0/', icon: FaLinkedinIn, size: 15, hoverColor: 'var(--teal)' },
            ].map(({ href, icon: Icon, size, hoverColor }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'rgba(148,163,184,0.3)', transition: 'color 0.2s ease, transform 0.2s cubic-bezier(0.34,1.56,0.64,1)' }}
                onMouseEnter={e => { e.currentTarget.style.color = hoverColor; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(148,163,184,0.3)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <Icon size={size} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
