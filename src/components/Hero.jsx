import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiArrowDown } from 'react-icons/fi'
import { SiGithub } from 'react-icons/si'
import useTypewriter from '../hooks/useTypewriter'
import Magnetic from './Magnetic'
import { scrollToSection } from '../lib/scroll'
import { confettiBurst, toast } from '../lib/eggs'

const ROLES = [
  'AI Product Systems',
  'Agentic Developer Tools',
  'Full-Stack ML Platforms',
  'Immersive Web Experiences',
]

const NAME = 'Kumaraswamy'

const TECH_MARQUEE = [
  'React', 'Python', 'TensorFlow', 'Three.js', 'Node.js', 'FastAPI', 'PyTorch',
  'Flask', 'MongoDB', 'OpenCV', 'Tailwind CSS', 'Express', 'Pandas',
]

function AnimatedName() {
  const onDoubleClick = (e) => {
    confettiBurst(e.clientX / window.innerWidth, e.clientY / window.innerHeight)
    toast('You found the sparkles!', '🎇')
  }

  return (
    <span
      className="hero-name-letters"
      onDoubleClick={onDoubleClick}
      title="psst — double-click me"
    >
      {NAME.split('').map((ch, i) => (
        <motion.span
          key={i}
          className="hero-letter"
          style={{ animationDelay: `${i * 0.18}s` }}
          initial={{ opacity: 0, y: 46, rotateX: -80 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: 0.45 + i * 0.045,
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

export default function Hero() {
  const role = useTypewriter(ROLES, 75, 40, 2200)
  const sectionRef = useRef(null)

  // Content drifts up + fades as the 3D orb flies off
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -140])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Readability vignette over the 3D scene */}
      <div className="hero-vignette" aria-hidden="true" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="section-container w-full min-w-0 relative z-10 flex flex-col items-center text-center gap-6 pt-28 pb-20"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-md hero-badge"
        >
          <span className="animate-pulse-dot w-1.5 h-1.5 rounded-full hero-badge-dot" />
          Available for opportunities
        </motion.div>

        {/* Hero name */}
        <h1 className="hero-title font-display leading-[1.05]">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="hero-initials block font-display font-semibold"
          >
            G.N.
          </motion.span>
          <AnimatedName />
        </h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="h-9 sm:h-10 flex items-center justify-center"
        >
          <p className="font-body text-xl sm:text-2xl font-light" style={{ color: 'var(--text-secondary)' }}>
            I build{' '}
            <span className="font-medium" style={{ color: 'var(--accent-light)' }}>{role}</span>
            <span className="block-cursor" aria-hidden="true" />
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="hero-description font-body text-base sm:text-lg"
          style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}
        >
          B.Tech CSE · 3rd Year · IIIT Sri City — shipping AI products, agent
          systems, and polished full-stack interfaces from idea to working repo.
        </motion.p>

        {/* CTAs — magnetic */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 mt-2"
        >
          <Magnetic>
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); scrollToSection('#projects') }}
              className="btn-accent btn-shimmer hero-cta-primary px-8 py-3.5 rounded-md font-display font-semibold text-sm tracking-wide"
            >
              View My Work
            </a>
          </Magnetic>

          <Magnetic>
            <a
              href="https://github.com/kumarswamyg2005"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer hero-cta-ghost px-8 py-3.5 rounded-md font-display font-semibold text-sm tracking-wide flex items-center gap-2 justify-center"
            >
              <SiGithub size={16} />
              GitHub
            </a>
          </Magnetic>
        </motion.div>

        {/* Tech marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.9 }}
          className="w-full mt-4 pt-8"
          style={{ borderTop: '1px solid rgba(99,102,241,0.12)' }}
        >
          <p className="hero-marquee-label">Technologies I work with</p>
          <div className="marquee-outer">
            <div className="marquee-track">
              {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, i) => (
                <span key={i} className="flex items-center font-body text-xs whitespace-nowrap marquee-item">
                  <span className="px-5">{tech}</span>
                  <span style={{ color: 'rgba(99,102,241,0.25)', fontSize: '8px' }}>·</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => scrollToSection('#about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hero-scroll-hint"
        aria-label="Scroll to about section"
      >
        <span>Scroll</span>
        <FiArrowDown size={13} className="animate-scroll-bounce" />
      </motion.button>
    </section>
  )
}
