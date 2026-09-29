import { useCallback, useEffect, useRef, useState } from 'react'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'

const THEME_BG = { dark: '#11110f', light: '#f3eee1' }

function apply(theme) {
  document.documentElement.dataset.theme = theme
  // Keep mobile browser chrome on the same tone as the page.
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_BG[theme])
  try {
    localStorage.setItem('theme', theme)
  } catch {
    /* private mode — the toggle still works for this session */
  }
}

/**
 * The pre-paint script in index.html has already set data-theme. The swap
 * is a view transition: the new theme grows as a circle out of the toggle,
 * so the cause and the effect sit in the same place. Browsers without view
 * transitions, and reduced motion, get an instant swap.
 */
function useTheme(button) {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark')

  const toggle = useCallback(() => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduce) {
      apply(next)
      setTheme(next)
      return
    }
    const r = button.current.getBoundingClientRect()
    const x = r.left + r.width / 2
    const y = r.top + r.height / 2
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    const t = document.startViewTransition(() => apply(next))
    setTheme(next)
    t.ready.then(() =>
      document.documentElement.animate(
        { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
        { duration: 420, easing: 'cubic-bezier(0.05, 0.7, 0.1, 1)', pseudoElement: '::view-transition-new(root)' },
      ),
    )
  }, [button])

  return [theme, toggle]
}

const NAV = [
  ['#experience', 'Experience'],
  ['#projects', 'Projects'],
  ['#stack', 'Stack'],
  ['#about', 'About'],
]

export default function Header() {
  const button = useRef(null)
  const [theme, toggleTheme] = useTheme(button)

  // T flips the theme. There is no text input on the page to steal the key.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 't' && e.key !== 'T') return
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return
      toggleTheme()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggleTheme])

  return (
    <header className="hud">
      <div className="wrap hud-inner">
        <a href="#main" className="hud-logo" aria-label="kumaraswamy.dev — back to top">
          <svg viewBox="0 0 9 9" aria-hidden="true" shapeRendering="crispEdges">
            <rect width="9" height="9" className="hud-logo-tile" />
            <path
              className="hud-logo-k"
              d="M2 1h1v7H2zM6 1h1v1H6zM5 2h1v1H5zM4 3h1v1H4zM3 4h1v1H3zM4 5h1v1H4zM5 6h1v1H5zM6 7h1v1H6z"
            />
          </svg>
          <span>
            kumaraswamy<span className="hud-logo-tld">.dev</span>
          </span>
        </a>

        <nav className="hud-nav" aria-label="Sections">
          {NAV.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="hud-actions">
          <a className="btn btn-small" href="#contact">
            Contact
          </a>
          <button
            ref={button}
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            title="Night / day (T)"
            aria-keyshortcuts="t"
            aria-label={`Switch to ${theme === 'dark' ? 'day' : 'night'} theme`}
          >
            {theme === 'dark' ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}
          </button>
        </div>
      </div>
    </header>
  )
}
