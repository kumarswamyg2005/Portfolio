import { useCallback, useEffect, useRef, useState } from 'react'
import { SiGithub } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa6'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'
import { LINKS } from './Footer'

/** The pre-paint script in index.html has already set data-theme. */
function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || 'dark',
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    // Keep mobile browser chrome on the same tone as the page.
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'light' ? '#fbfbfa' : '#0a0b09')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* private mode — the toggle still works for this session */
    }
  }, [theme])

  // Cross-fade the whole page for the length of the swap, then take the class
  // back off so it doesn't sit on every element overriding hover timings.
  const fade = useRef()
  useEffect(() => () => clearTimeout(fade.current), [])

  // Stable identity so the keyboard listener below binds once.
  const toggle = useCallback(() => {
    document.documentElement.classList.add('theme-switching')
    clearTimeout(fade.current)
    fade.current = setTimeout(
      () => document.documentElement.classList.remove('theme-switching'),
      360,
    )
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return [theme, toggle]
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [theme, toggleTheme] = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // T flips the theme. There is no text input on the page to steal the key.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 't' && e.key !== 'T') return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      toggleTheme()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggleTheme])

  return (
    <header className="header" data-scrolled={scrolled}>
      <div className="wrap header-inner">
        <a href="#main" className="header-mark">
          kumaraswamy<span>.dev</span>
        </a>

        <nav className="header-nav" aria-label="Sections">
          <a className="nav-text" href="#experience">Experience</a>
          <a className="nav-text" href="#projects">Projects</a>
          <a className="nav-text" href="#about">About</a>
          <a
            className="icon-link"
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <SiGithub size={16} />
          </a>
          <a
            className="icon-link"
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={16} />
          </a>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            title="Toggle theme (T)"
            aria-keyshortcuts="t"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {/* keyed so React remounts it and the swap-in animation replays */}
            <span className="theme-icon" key={theme}>
              {theme === 'dark' ? <HiOutlineSun size={15} /> : <HiOutlineMoon size={15} />}
            </span>
          </button>
        </nav>
      </div>
    </header>
  )
}
