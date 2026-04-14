import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useActiveSection from '../hooks/useActiveSection'

const LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
]
const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)
  const active = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleNav = (href) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background:           scrolled ? 'rgba(7,7,16,0.92)' : 'transparent',
        backdropFilter:       scrolled ? 'blur(20px) saturate(140%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(140%)' : 'none',
        borderBottom:         scrolled ? '1px solid rgba(99,102,241,0.12)' : '1px solid transparent',
        padding:              scrolled ? '14px 0' : '22px 0',
        transition: 'background 0.4s ease, padding 0.4s ease, border-color 0.4s',
      }}
    >
      <div className="section-container flex items-center justify-between">

        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNav('#hero') }}
          className="logo-appear select-none flex items-baseline gap-1"
          aria-label="Home"
        >
          <span className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
            GNK
          </span>
          <span
            style={{
              color: 'var(--accent)',
              fontSize: '11px',
              opacity: 0.7,
              marginLeft: '2px',
              fontFamily: 'var(--font-mono)',
            }}
          >.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map(({ label, href }) => {
            const id       = href.replace('#', '')
            const isActive = active === id
            return (
              <a
                key={href}
                href={href}
                onClick={(e) => { e.preventDefault(); handleNav(href) }}
                className={`nav-link font-body text-sm font-medium ${isActive ? 'is-active' : ''}`}
                style={{
                  color:      isActive ? 'var(--accent-light)' : 'var(--text-secondary)',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'var(--text-primary)' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)' }}
              >
                {label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px"
                    style={{
                      background: 'linear-gradient(90deg, var(--accent), var(--accent-light))',
                    }}
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
              </a>
            )
          })}
          <a
            href="mailto:nagakumaraswamy.g23@iiits.in"
            className="hire-me-btn px-5 py-1.5 rounded-md font-body text-sm font-medium"
          >
            Hire Me
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {[
            open ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 },
            open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 },
            open ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 },
          ].map((anim, i) => (
            <motion.span
              key={i}
              animate={anim}
              className="block w-5 h-0.5 rounded origin-center"
              style={{ background: 'var(--accent)' }}
            />
          ))}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(7,7,16,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(99,102,241,0.12)' }}
          >
            <nav className="flex flex-col px-6 py-7 gap-5">
              {LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNav(href) }}
                  className="font-body text-base font-medium"
                  style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-light)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  {label}
                </a>
              ))}
              <a
                href="mailto:nagakumaraswamy.g23@iiits.in"
                className="hire-me-btn self-start px-5 py-2 rounded-md font-body text-sm font-medium"
              >
                Hire Me
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
