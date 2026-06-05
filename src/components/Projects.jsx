import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SiGithub } from 'react-icons/si'
import {
  HiArrowTopRightOnSquare,
  HiBolt,
  HiCodeBracketSquare,
  HiLockClosed,
  HiSparkles,
} from 'react-icons/hi2'
import projects from '../data/projects'

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 },
  }),
}

function ProjectCard({ project, index }) {
  const {
    title,
    category,
    status,
    description,
    impact,
    metrics,
    tags,
    github,
    demoUrl,
    featured,
    accent,
  } = project

  return (
    <motion.article
      custom={index}
      variants={fadeUp}
      className={`project-card ${featured ? 'project-card-featured' : ''}`}
      style={{ '--project-accent': accent }}
    >
      <div className="project-card-noise" aria-hidden="true" />
      <div className="project-card-top">
        <span className="project-category">
          <HiCodeBracketSquare size={14} />
          {category}
        </span>
        <span className="project-status">{status}</span>
      </div>

      <div className="project-heading">
        <h3>{title}</h3>
        {featured && (
          <span className="project-featured-mark" aria-label="Featured project">
            <HiSparkles size={13} />
            Featured
          </span>
        )}
      </div>

      <p className="project-description">{description}</p>

      <div className="project-impact">
        <HiBolt size={14} />
        <span>{impact}</span>
      </div>

      <div className="project-metrics" aria-label={`${title} highlights`}>
        {metrics.map((metric) => (
          <span key={metric}>{metric}</span>
        ))}
      </div>

      <div className="project-tags">
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="project-actions">
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="project-action project-action-primary"
          aria-label={`Open ${title} on GitHub`}
        >
          <SiGithub size={15} />
          GitHub
        </a>
        {demoUrl ? (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-action project-action-demo"
            aria-label={`Open live demo for ${title}`}
          >
            <HiArrowTopRightOnSquare size={15} />
            Live demo
          </a>
        ) : (
          <span className="project-action project-action-muted">
            <HiLockClosed size={14} />
            Demo soon
          </span>
        )}
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const featuredCount = projects.filter((project) => project.featured).length
  const liveCount = projects.filter((project) => project.demoUrl).length

  return (
    <>
      <div className="section-divider" />
      <section id="projects" className="projects-section">
        <div className="project-backdrop" aria-hidden="true" />

        <div className="section-container" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="projects-header"
          >
            <div>
              <span className="label-editorial">03 / PRODUCT LAB</span>
              <h2 className="section-heading">
                GitHub-backed <span className="gradient-text">Projects</span>
              </h2>
              <div className="section-rule" />
              <p>
                A curated selection of the AI systems, full-stack products, research pilots,
                and immersive web builds I have shipped or pushed recently.
              </p>
            </div>

            <div className="project-summary-panel" aria-label="Project summary">
              <div>
                <strong>{featuredCount}</strong>
                <span>featured builds</span>
              </div>
              <div>
                <strong>{projects.length}</strong>
                <span>curated repos</span>
              </div>
              <div>
                <strong>{liveCount}</strong>
                <span>live demos</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="projects-grid"
          >
            {projects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="projects-footer"
          >
            <a
              href="https://github.com/kumarswamyg2005"
              target="_blank"
              rel="noopener noreferrer"
              className="project-action project-action-wide"
            >
              <SiGithub size={16} />
              Explore the full GitHub profile
              <HiArrowTopRightOnSquare size={15} />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
