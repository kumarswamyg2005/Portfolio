import { SiGithub } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa6'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <div className="section-divider" />

      {/* Forge glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '600px', height: '200px',
          background: 'radial-gradient(ellipse at center top, rgba(193,18,31,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="section-container relative z-10 pt-16 pb-10">

        <div className="mb-12">
          <p className="label-editorial mb-5" style={{ color: 'rgba(193,18,31,0.55)' }}>
            What are you waiting for
          </p>
          <h2
            className="font-display font-extrabold tracking-tight leading-[1.05]"
            style={{ fontSize: 'clamp(2.4rem,6vw,5.5rem)', color: 'rgba(232,224,208,0.85)' }}
          >
            Let's build something<br />
            <span className="gradient-text">remarkable.</span>
          </h2>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="mailto:nagakumaraswamy.g23@iiits.in"
              className="btn-flame btn-shimmer px-7 py-3 rounded-sm font-display font-bold text-sm tracking-widest"
              style={{
                background: 'var(--flame-red)',
                color: '#fff',
                letterSpacing: '0.12em',
                boxShadow: '0 0 22px rgba(193,18,31,0.35)',
                transition: 'box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 0 38px rgba(193,18,31,0.6)'
                e.currentTarget.style.transform = 'scale(1.04)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 0 22px rgba(193,18,31,0.35)'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              Say Hello →
            </a>
            <span className="font-body text-sm" style={{ color: 'rgba(90,82,72,0.65)' }}>
              nagakumaraswamy.g23@iiits.in
            </span>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-7"
          style={{ borderTop: '1px solid rgba(193,18,31,0.08)' }}
        >
          {/* Wordmark */}
          <span className="font-display font-bold text-sm tracking-widest flex items-baseline gap-1 select-none" style={{ color: 'rgba(232,224,208,0.22)', letterSpacing: '0.1em' }}>
            GNK
            <span className="font-jp" style={{ color: 'rgba(250,163,7,0.2)', fontSize: '10px', marginLeft: '3px' }}>剣</span>
          </span>

          {/* Copyright */}
          <p className="font-body text-xs tracking-wide order-last sm:order-none" style={{ color: 'rgba(90,82,72,0.5)' }}>
            <span className="font-jp" style={{ color: 'rgba(250,163,7,0.28)', marginRight: '5px', fontSize: '11px' }}>作</span>
            ⚔ Forged by G.N. Kumaraswamy · {year}
          </p>

          {/* Social */}
          <div className="flex items-center gap-5">
            {[
              { href: 'https://github.com/kumarswamyg2005', icon: SiGithub, size: 16, hoverColor: 'var(--flame-orange)' },
              { href: 'https://www.linkedin.com/in/naga-kumaraswamy-gurram-a374833b0/', icon: FaLinkedinIn, size: 15, hoverColor: 'var(--water-cyan)' },
            ].map(({ href, icon: Icon, size, hoverColor }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'rgba(158,148,132,0.35)', transition: 'color 0.2s ease, transform 0.2s cubic-bezier(0.34,1.56,0.64,1)' }}
                onMouseEnter={e => { e.currentTarget.style.color = hoverColor; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(158,148,132,0.35)'; e.currentTarget.style.transform = 'translateY(0)' }}
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
