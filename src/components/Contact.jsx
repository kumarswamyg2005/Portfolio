import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiEnvelope, HiPhone } from 'react-icons/hi2'
import { SiGithub } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa6'

const CONTACT_ITEMS = [
  {
    icon: HiEnvelope,
    label: 'Email',
    value: 'nagakumaraswamy.g23@iiits.in',
    href:  'mailto:nagakumaraswamy.g23@iiits.in',
    color: '#c1121f',
  },
  {
    icon: HiPhone,
    label: 'Phone',
    value: '+91 8688219055',
    href:  'tel:+918688219055',
    color: '#faa307',
  },
  {
    icon: SiGithub,
    label: 'GitHub',
    value: 'kumarswamyg2005',
    href:  'https://github.com/kumarswamyg2005',
    color: '#9e9484',
  },
  {
    icon: FaLinkedinIn,
    label: 'LinkedIn',
    value: 'Add your LinkedIn',
    href:  'https://linkedin.com/in/',
    color: '#00b4d8',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.34, 1.56, 0.64, 1], delay: i * 0.1 },
  }),
}

export default function Contact() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <>
      <div className="section-divider" />
      <section id="contact" className="pt-20 pb-28 relative" style={{ background: 'var(--bg-secondary)' }}>

        {/* Dying embers — warm crimson from center */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div style={{
            position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
            width: '750px', height: '500px', borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(193,18,31,0.055) 0%, rgba(232,93,4,0.02) 45%, transparent 68%)',
            filter: 'blur(70px)',
          }} />
        </div>

        <div className="section-container" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3 mb-5"
          >
            <span className="label-editorial">連絡 · GET IN TOUCH</span>
            <h2
              className="font-display font-extrabold tracking-tight"
              style={{ fontSize: 'clamp(2rem,5vw,3.25rem)', lineHeight: '1.1', color: 'var(--text-primary)' }}
            >
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <div style={{ height: '1px', width: '48px', background: 'linear-gradient(90deg, var(--flame-red), transparent)' }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-base max-w-xl mb-10"
            style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}
          >
            I'm currently open to{' '}
            <span style={{ color: 'var(--text-primary)' }}>internships</span>,{' '}
            <span style={{ color: 'var(--text-primary)' }}>collaborations</span>, and{' '}
            <span style={{ color: 'var(--text-primary)' }}>freelance projects</span>. If you have an
            idea or opportunity you'd like to discuss — my inbox is always open.
          </motion.p>

          {/* Contact cards — ember hover */}
          <motion.div
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {CONTACT_ITEMS.map(({ icon: Icon, label, value, href, color }, idx) => (
              <motion.a
                key={label}
                custom={idx}
                variants={fadeUp}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group glass flex flex-col gap-4 p-5 rounded-sm"
                style={{
                  border: '1px solid var(--border-subtle)',
                  transition: 'border-color 0.35s ease, box-shadow 0.35s ease, background 0.35s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${color}28`
                  e.currentTarget.style.boxShadow = `0 0 28px rgba(250,163,7,0.09), 0 0 50px ${color}07, 0 12px 40px rgba(0,0,0,0.5)`
                  e.currentTarget.style.background = 'rgba(15,10,8,0.75)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = ''
                  e.currentTarget.style.boxShadow = ''
                  e.currentTarget.style.background = ''
                }}
              >
                <div
                  className="w-10 h-10 rounded-sm flex items-center justify-center"
                  style={{
                    backgroundColor: `${color}10`,
                    border: `1px solid ${color}20`,
                    color,
                    transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), color 0.3s ease',
                  }}
                >
                  <Icon size={20} className="group-hover:-translate-y-1" style={{ transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)' }} />
                </div>

                <div>
                  <p className="font-jp text-[10px] uppercase mb-1" style={{ color: 'var(--text-muted)', letterSpacing: '0.18em' }}>
                    {label}
                  </p>
                  <p className="font-display font-medium text-sm truncate" style={{ color: 'rgba(232,224,208,0.75)', transition: 'color 0.2s ease' }}>
                    {value}
                  </p>
                </div>

                <div
                  className="h-px w-0 group-hover:w-full mt-auto"
                  style={{
                    background: `linear-gradient(90deg, ${color}55, ${color}18)`,
                    transition: 'width 0.45s cubic-bezier(0.16,1,0.3,1)',
                  }}
                />
              </motion.a>
            ))}
          </motion.div>

          {/* CTA — flame sweep */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex justify-center"
          >
            <a
              href="mailto:nagakumaraswamy.g23@iiits.in"
              className="btn-flame btn-shimmer px-10 py-4 rounded-sm font-display font-bold tracking-widest"
              style={{
                background: 'var(--flame-red)',
                color: '#fff',
                fontSize: '0.9rem',
                letterSpacing: '0.12em',
                boxShadow: '0 0 28px rgba(193,18,31,0.35)',
                transition: 'box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 0 50px rgba(193,18,31,0.6), 0 0 90px rgba(232,93,4,0.2)'
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 0 28px rgba(193,18,31,0.35)'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              Say Hello →
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
