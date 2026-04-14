import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiArrowDown } from 'react-icons/fi'
import { SiGithub } from 'react-icons/si'
import useTypewriter from '../hooks/useTypewriter'

const ROLES = [
  'Full-Stack Web Apps',
  'AI / ML Systems',
  'Deep Learning Models',
  'Open Source Tools',
]

// Subtle floating particles — indigo/neutral
function ParticleCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let particles = [], animId

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }

    class Particle {
      constructor() { this.reset(true) }
      reset(initial = false) {
        this.x     = Math.random() * canvas.width
        this.y     = initial ? Math.random() * canvas.height : canvas.height + 5
        this.r     = Math.random() * 1.2 + 0.3
        this.vx    = (Math.random() - 0.5) * 0.12
        this.vy    = -(Math.random() * 0.25 + 0.08)
        this.alpha = Math.random() * 0.18 + 0.05
        const t    = Math.random()
        this.color = t < 0.5 ? `rgba(99,102,241,${this.alpha})` :
                     t < 0.8 ? `rgba(129,140,248,${this.alpha})` :
                                `rgba(45,212,191,${this.alpha * 0.8})`
      }
      update() {
        this.x += this.vx; this.y += this.vy
        if (this.y < -10) this.reset()
      }
      draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = this.color; ctx.fill()
      }
    }

    const init = () => {
      resize()
      particles = Array.from(
        { length: Math.min(50, Math.floor((canvas.width * canvas.height) / 16000)) },
        () => new Particle()
      )
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      animId = requestAnimationFrame(draw)
    }
    init(); draw()
    window.addEventListener('resize', init, { passive: true })
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', init) }
  }, [])
  return <canvas ref={canvasRef} id="particle-canvas" className="absolute inset-0 w-full h-full" />
}

export default function Hero() {
  const role = useTypewriter(ROLES, 75, 40, 2200)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg-void)' }}
    >
      {/* Background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 100% 80% at 50% -5%, #0a0a18 0%, #070710 60%, #050508 100%)',
        }} />
        {/* Indigo glow — bottom left */}
        <div className="animate-orb-drift-1 absolute rounded-full" style={{
          bottom: '-25%', left: '-8%',
          width: '750px', height: '650px',
          background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.1) 0%, rgba(79,70,229,0.04) 40%, transparent 70%)',
          filter: 'blur(65px)',
        }} />
        {/* Teal glow — top right */}
        <div className="animate-orb-drift-2 absolute rounded-full" style={{
          top: '-20%', right: '-6%',
          width: '680px', height: '680px',
          background: 'radial-gradient(ellipse at center, rgba(45,212,191,0.08) 0%, rgba(20,184,166,0.03) 45%, transparent 70%)',
          filter: 'blur(70px)',
        }} />
        {/* Soft purple mid */}
        <div className="animate-orb-drift-3 absolute rounded-full" style={{
          top: '30%', left: '40%',
          width: '500px', height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(60,40,120,0.05) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
        <div className="absolute bottom-0 left-0 right-0 h-48" style={{
          background: 'linear-gradient(to top, var(--bg-primary), transparent)',
        }} />
      </div>

      <ParticleCanvas />

      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.045) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        maskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <div className="section-container relative z-10 flex flex-col items-center text-center gap-6 pt-28 pb-20">

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-md"
          style={{
            border: '1px solid rgba(99,102,241,0.3)',
            background: 'rgba(99,102,241,0.06)',
            color: 'rgba(129,140,248,0.9)',
            fontSize: '12px',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.08em',
          }}
        >
          <span
            className="animate-pulse-dot w-1.5 h-1.5 rounded-full"
            style={{
              background: 'var(--accent)',
              boxShadow: '0 0 7px rgba(99,102,241,0.9)',
              flexShrink: 0,
            }}
          />
          Available for opportunities
        </motion.div>

        {/* Hero name */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="font-display leading-[1.05]"
          style={{ fontSize: 'clamp(3.2rem, 9vw, 5.8rem)', letterSpacing: '0.02em' }}
        >
          <span
            className="block font-display font-semibold"
            style={{
              color: 'var(--teal)',
              fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
              letterSpacing: '0.1em',
              textShadow: '0 0 30px rgba(45,212,191,0.4)',
              marginBottom: '0.08em',
            }}
          >G.N.</span>
          <span className="hero-name-accent">Kumaraswamy</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="h-9 sm:h-10 flex items-center justify-center"
        >
          <p className="font-body text-xl sm:text-2xl font-light" style={{ color: 'var(--text-secondary)' }}>
            I build{' '}
            <span className="font-medium" style={{ color: 'var(--accent-light)' }}>
              {role}
            </span>
            <span className="block-cursor" aria-hidden="true" />
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg font-body text-base sm:text-lg"
          style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}
        >
          B.Tech CSE · 3rd Year · IIIT Sri City — crafting intelligent systems
          and seamless interfaces that push boundaries.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 mt-2"
        >
          {/* View My Work */}
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="btn-accent btn-shimmer px-8 py-3.5 rounded-md font-display font-semibold text-sm tracking-wide"
            style={{
              background: 'var(--accent)',
              color: '#fff',
              boxShadow: '0 0 22px rgba(99,102,241,0.35)',
              transition: 'box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              letterSpacing: '0.06em',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 0 40px rgba(99,102,241,0.55), 0 0 70px rgba(99,102,241,0.2)'
              e.currentTarget.style.transform = 'scale(1.04)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 0 22px rgba(99,102,241,0.35)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            View My Work
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/kumarswamyg2005"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer px-8 py-3.5 rounded-md font-display font-semibold text-sm tracking-wide flex items-center gap-2 justify-center"
            style={{
              border: '1px solid rgba(45,212,191,0.3)',
              color: 'rgba(226,232,240,0.7)',
              letterSpacing: '0.06em',
              transition: 'border-color 0.3s, color 0.3s, box-shadow 0.3s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(45,212,191,0.55)'
              e.currentTarget.style.color = 'var(--teal)'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(45,212,191,0.15)'
              e.currentTarget.style.transform = 'scale(1.04)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(45,212,191,0.3)'
              e.currentTarget.style.color = 'rgba(226,232,240,0.7)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            <SiGithub size={16} />
            GitHub
          </a>
        </motion.div>

        {/* Tech marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.9 }}
          className="w-full mt-4 pt-8"
          style={{ borderTop: '1px solid rgba(99,102,241,0.1)' }}
        >
          <p style={{
            fontSize: '10px',
            fontFamily: 'var(--font-mono)',
            color: 'rgba(148,163,184,0.35)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '14px',
          }}>
            Technologies I work with
          </p>
          <div className="marquee-outer">
            <div className="marquee-track">
              {[
                'React', 'Python', 'TensorFlow', 'Node.js', 'FastAPI', 'PyTorch',
                'Flask', 'MongoDB', 'OpenCV', 'Tailwind CSS', 'Express', 'Pandas',
                'React', 'Python', 'TensorFlow', 'Node.js', 'FastAPI', 'PyTorch',
                'Flask', 'MongoDB', 'OpenCV', 'Tailwind CSS', 'Express', 'Pandas',
              ].map((tech, i) => (
                <span
                  key={i}
                  className="flex items-center font-body text-xs whitespace-nowrap"
                  style={{ color: 'rgba(148,163,184,0.4)' }}
                >
                  <span
                    className="px-5"
                    style={{ transition: 'color 0.25s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgba(129,140,248,0.8)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(148,163,184,0.4)'}
                  >{tech}</span>
                  <span style={{ color: 'rgba(99,102,241,0.2)', fontSize: '8px' }}>·</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'rgba(99,102,241,0.4)' }}
      >
        <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(148,163,184,0.4)' }}>
          Scroll
        </span>
        <FiArrowDown size={13} className="animate-scroll-bounce" />
      </motion.div>
    </section>
  )
}
