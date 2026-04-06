import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { SiGithub } from 'react-icons/si'
import { HiArrowTopRightOnSquare, HiLockClosed } from 'react-icons/hi2'
import projects from '../data/projects'

const PROJECT_META = {
  'stocksensei':      { color: '#c1121f', kanji: '株' }, // Flame — crimson
  'resume-builder':   { color: '#4a90d9', kanji: '履' }, // Wind — steel blue
  'sign-bridge':      { color: '#00b4d8', kanji: '橋' }, // Water — cyan
  'manga-translator': { color: '#faa307', kanji: '訳' }, // Thunder — gold
}

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show:   (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.34, 1.56, 0.64, 1], delay: i * 0.1 },
  }),
}

function ProjectCard({ project, index }) {
  const { id, title, description, tags, github, demoUrl, featured } = project
  const hasDemo = Boolean(demoUrl)
  const [tipped, setTipped] = useState(false)
  const meta  = PROJECT_META[id] || { color: '#c1121f', kanji: '技' }
  const color = meta.color

  return (
    <motion.article
      custom={index}
      variants={fadeUp}
      data-kanji={meta.kanji}
      className={`relative flex flex-col h-full p-6 ${featured ? 'project-card-featured' : 'project-card'}`}
    >
      {/* Gold seal featured badge */}
      {featured && (
        <div className="featured-badge absolute top-4 right-4" style={{ fontSize: '11px' }}>
          <span style={{ fontSize: '13px', lineHeight: 1 }}>★</span>
          <span style={{ fontSize: '9px', letterSpacing: '0.05em', fontFamily: 'var(--font-jp)' }}>特選</span>
        </div>
      )}

      {/* Top accent line */}
      <div
        className="h-0.5 w-full mb-5 rounded-full"
        style={{
          background: `linear-gradient(90deg, ${color} 0%, ${color}55 65%, transparent 100%)`,
          boxShadow: `0 0 8px ${color}40`,
          transition: 'box-shadow 0.4s ease',
        }}
      />

      <h3
        className="card-title font-display font-bold text-xl tracking-tight mb-3 pr-16"
        style={{ color: 'var(--text-primary)', transition: 'color 0.3s ease', letterSpacing: '0.02em' }}
      >
        {title}
      </h3>

      <p className="font-body text-sm flex-1" style={{ color: 'var(--text-secondary)', lineHeight: '1.75', position: 'relative', zIndex: 1 }}>
        {description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mt-5" style={{ position: 'relative', zIndex: 1 }}>
        {tags.map((tag) => (
          <span
            key={tag}
            className="tag-item"
            style={{ borderColor: `${color}20` }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6" style={{ position: 'relative', zIndex: 1 }}>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-shimmer flex items-center gap-2 px-4 py-2 rounded-sm font-body text-sm"
          style={{
            border: '1px solid rgba(255,255,255,0.07)',
            color: 'var(--text-secondary)',
            transition: 'border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = `${color}45`
            e.currentTarget.style.color = 'var(--text-primary)'
            e.currentTarget.style.boxShadow = `0 0 14px ${color}25`
            e.currentTarget.style.transform = 'scale(1.04)'
            const svg = e.currentTarget.querySelector('svg')
            if (svg) svg.style.transform = 'rotate(5deg)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
            e.currentTarget.style.color = 'var(--text-secondary)'
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.transform = 'scale(1)'
            const svg = e.currentTarget.querySelector('svg')
            if (svg) svg.style.transform = 'rotate(0deg)'
          }}
        >
          <SiGithub size={14} style={{ transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)', flexShrink: 0 }} />
          GitHub
        </a>

        {hasDemo ? (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer flex items-center gap-2 px-4 py-2 rounded-sm font-body text-sm"
            style={{
              background: `${color}10`,
              border: `1px solid ${color}40`,
              color: color,
              transition: 'background 0.3s ease, border-color 0.3s ease, color 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = color
              e.currentTarget.style.color = '#000'
              e.currentTarget.style.transform = 'scale(1.04)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = `${color}10`
              e.currentTarget.style.color = color
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            <HiArrowTopRightOnSquare size={14} />
            Live Demo
          </a>
        ) : (
          <button
            type="button"
            onClick={() => { setTipped(true); setTimeout(() => setTipped(false), 2000) }}
            className="btn-coming-soon relative flex items-center gap-2 px-4 py-2 font-body text-sm cursor-not-allowed select-none"
          >
            <HiLockClosed size={13} />
            <span className="font-jp" style={{ fontSize: '10px', opacity: 0.6 }}>任務未完</span>
            <AnimatePresence>
              {tipped && (
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-sm glass font-body text-xs"
                  style={{ color: 'var(--text-secondary)', border: '1px solid rgba(193,18,31,0.15)' }}
                >
                  Deploy link coming soon!
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        )}
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <>
      <div className="section-divider" />
      <section id="projects" className="py-28 relative" style={{ background: 'var(--bg-primary)' }}>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div style={{
            position: 'absolute', bottom: '25%', right: '-5%',
            width: '480px', height: '480px', borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(250,163,7,0.05) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }} />
        </div>

        <div className="section-container" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3 mb-16"
          >
            <span className="label-editorial">任務 · FEATURED PROJECTS</span>
            <h2
              className="font-display font-extrabold tracking-tight"
              style={{ fontSize: 'clamp(2rem,5vw,3.25rem)', lineHeight: '1.1', color: 'var(--text-primary)' }}
            >
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <div style={{ height: '1px', width: '48px', background: 'linear-gradient(90deg, var(--flame-red), transparent)' }} />
            <p className="font-body text-sm max-w-xl mt-1" style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              A selection of projects I've built — spanning AI/ML systems, full-stack apps, and developer tools.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="grid sm:grid-cols-2 gap-5"
          >
            {projects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12 flex justify-center"
          >
            <a
              href="https://github.com/kumarswamyg2005"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer flex items-center gap-2.5 px-6 py-3 rounded-sm font-body text-sm"
              style={{
                border: '1px solid rgba(193,18,31,0.2)',
                color: 'var(--text-secondary)',
                transition: 'border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(193,18,31,0.5)'
                e.currentTarget.style.color = 'var(--flame-orange)'
                e.currentTarget.style.boxShadow = '0 0 18px rgba(193,18,31,0.12)'
                e.currentTarget.style.transform = 'scale(1.03)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(193,18,31,0.2)'
                e.currentTarget.style.color = 'var(--text-secondary)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <SiGithub size={15} />
              See more on GitHub
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
