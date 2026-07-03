import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { onEgg, emitEgg, toast, confettiBurst, confettiCannons, barrelRoll } from '../lib/eggs'

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a',
]

const PARTY_EMOJI = ['🎉', '✨', '🪩', '🎈', '💜', '🚀', '⭐', '🎊', '🐱', '💫']

const JOKES = [
  'Why do programmers prefer dark mode? Because light attracts bugs.',
  "There are only 10 types of people: those who understand binary and those who don't.",
  "I would tell you a UDP joke, but you might not get it.",
  '99 little bugs in the code, 99 little bugs… take one down, patch it around — 127 little bugs in the code.',
  "A SQL query walks into a bar, goes up to two tables and asks: 'Can I JOIN you?'",
  "!false — it's funny because it's true.",
]

const ASCII_CAT = String.raw`
      /\_/\
     ( o.o )   < meow. you found me.
      > ^ <
`

function runCommand(raw, ctx) {
  const cmd = raw.trim().toLowerCase()
  if (!cmd) return []

  if (cmd === 'help') {
    return [
      'available commands:',
      '  whoami      — who is this guy',
      '  projects    — featured builds',
      '  skills      — the toolbox',
      '  contact     — reach out',
      '  joke        — random dev joke',
      '  coffee      — essential fuel',
      '  party       — 🎉',
      '  konami      — a hint',
      '  ls          — look around',
      '  clear       — clear screen',
      '  exit        — close terminal',
    ]
  }
  if (cmd === 'whoami') {
    return [
      'G.N. Kumaraswamy — B.Tech CSE @ IIIT Sri City.',
      'Builds AI products, agent systems & full-stack ML platforms.',
      'Status: open to internships & cool problems.',
    ]
  }
  if (cmd === 'projects') {
    return [
      '★ Helix       — 3D repository archaeology platform',
      '★ GhostDoc    — screen-recording → documentation agents',
      '★ SynthLab    — synthetic tabular data lab',
      '★ LegacyLift  — AI legacy-code modernization',
      '★ ClaimFlow   — VLM insurance claims adjudication',
      '★ Narrato     — multi-voice AI audiobook studio',
      "…and 10 more. scroll the page, it's prettier there.",
    ]
  }
  if (cmd === 'skills') {
    return [
      'python · javascript · react · fastapi · pytorch · tensorflow',
      'three.js · node · mongodb · opencv · pandas · tailwind',
      'currently exploring: rust & reinforcement learning',
    ]
  }
  if (cmd === 'contact') {
    return [
      'email    → nagakumaraswamy.g23@iiits.in',
      'github   → github.com/kumarswamyg2005',
      'linkedin → naga-kumaraswamy-gurram',
    ]
  }
  if (cmd === 'joke') return [JOKES[Math.floor(Math.random() * JOKES.length)]]
  if (cmd === 'coffee') return ['☕ brewing…', 'done. productivity +42%.']
  if (cmd === 'party') { ctx.party(); return ['🎉 let there be party.'] }
  if (cmd === 'konami') return ['try: ↑ ↑ ↓ ↓ ← → ← → B A  (on the page, not here)']
  if (cmd === 'ls') return ['projects/  skills/  secrets/  cat.png']
  if (cmd === 'cat cat.png' || cmd === 'cat') return [ASCII_CAT]
  if (cmd === 'ls secrets' || cmd === 'ls secrets/' || cmd === 'cd secrets') {
    return ['permission denied. some things stay hidden 😏']
  }
  if (cmd === 'sudo hire-me' || cmd === 'hire-me' || cmd === 'sudo hire me') {
    ctx.hire()
    return ['✔ excellent decision. opening mail client…']
  }
  if (cmd.startsWith('sudo')) return ["nice try. you don't have root here 😏"]
  if (cmd === 'rm -rf /' || cmd.startsWith('rm ')) return ['🛑 absolutely not. this portfolio took effort.']
  if (cmd === 'clear') { ctx.clear(); return null }
  if (cmd === 'exit') { ctx.exit(); return null }
  if (cmd === 'vim') return ["you're now stuck in vim. just kidding — type 'exit'."]
  if (cmd === 'pwd') return ['/home/gnk/portfolio/you-are-here']
  return [`command not found: ${cmd} — try 'help'`]
}

function Terminal({ open, onClose }) {
  const [history, setHistory] = useState([
    "gnk-terminal v1.0 — you found the secret shell 🕵️",
    "type 'help' to get started.",
  ])
  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const bodyRef = useRef(null)

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80)
  }, [open])

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight })
  }, [history])

  const submit = (e) => {
    e.preventDefault()
    const ctx = {
      clear: () => setHistory([]),
      exit: onClose,
      party: () => emitEgg('party'),
      hire: () => {
        confettiBurst()
        setTimeout(() => { window.location.href = 'mailto:nagakumaraswamy.g23@iiits.in' }, 600)
      },
    }
    const out = runCommand(input, ctx)
    if (out !== null) setHistory((h) => [...h, `❯ ${input}`, ...out])
    setInput('')
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="egg-terminal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="egg-terminal"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="loader-titlebar">
              <span className="loader-dot" style={{ background: '#ff5f57' }} onClick={onClose} data-cursor="pointer" />
              <span className="loader-dot" style={{ background: '#febc2e' }} />
              <span className="loader-dot" style={{ background: '#28c840' }} />
              <span className="loader-title">gnk@portfolio — zsh · press ` to close</span>
            </div>
            <div className="egg-terminal-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
              {history.map((line, i) => (
                <pre key={i} className={line.startsWith('❯') ? 'term-cmd' : 'term-out'}>{line}</pre>
              ))}
              <form onSubmit={submit} className="term-input-row">
                <span className="term-prompt">❯</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="terminal input"
                />
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function EmojiRain({ active }) {
  const [drops, setDrops] = useState([])

  useEffect(() => {
    if (!active) { setDrops([]); return }
    setDrops(
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        emoji: PARTY_EMOJI[i % PARTY_EMOJI.length],
        left: Math.random() * 100,
        delay: Math.random() * 2.2,
        duration: 2.6 + Math.random() * 2,
        size: 18 + Math.random() * 20,
      })),
    )
  }, [active])

  if (!active) return null
  return (
    <div className="emoji-rain" aria-hidden="true">
      {drops.map((d) => (
        <span
          key={d.id}
          style={{
            left: `${d.left}%`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
            fontSize: d.size,
          }}
        >
          {d.emoji}
        </span>
      ))}
    </div>
  )
}

export default function EasterEggs() {
  const [toasts, setToasts] = useState([])
  const [party, setParty] = useState(false)
  const [termOpen, setTermOpen] = useState(false)
  const konamiIdx = useRef(0)
  const partyTimer = useRef(null)

  const pushToast = useCallback(({ message, emoji }) => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t.slice(-2), { id, message, emoji }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200)
  }, [])

  const startParty = useCallback(() => {
    document.documentElement.classList.add('party-mode')
    setParty(true)
    confettiCannons()
    toast('PARTY MODE ACTIVATED', '🪩')
    clearTimeout(partyTimer.current)
    partyTimer.current = setTimeout(() => {
      document.documentElement.classList.remove('party-mode')
      setParty(false)
    }, 9000)
  }, [])

  // Console greeting for the curious
  useEffect(() => {
    const art = `
%c
   ██████╗ ███╗   ██╗██╗  ██╗
  ██╔════╝ ████╗  ██║██║ ██╔╝
  ██║  ███╗██╔██╗ ██║█████╔╝
  ██║   ██║██║╚██╗██║██╔═██╗
  ╚██████╔╝██║ ╚████║██║  ██╗
   ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝
`
    console.log(art, 'color:#818cf8; font-weight:bold;')
    console.log(
      '%cHey, you look like someone who reads source code. I like you already. 🕵️',
      'color:#2dd4bf; font-size:13px; font-weight:600;',
    )
    console.log(
      "%cEaster eggs: press ` for a secret terminal · Konami code for party mode · click the logo 5× · pet the cat in the footer.\n→ nagakumaraswamy.g23@iiits.in",
      'color:#94a3b8; font-size:12px;',
    )
  }, [])

  // Global key handling: Konami code + backtick terminal
  useEffect(() => {
    const onKey = (e) => {
      const typing = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)

      if (e.key === '`' && !typing) {
        e.preventDefault()
        setTermOpen((v) => !v)
        return
      }
      if (e.key === '`') { setTermOpen((v) => !v); return }
      if (e.key === 'Escape') setTermOpen(false)
      if (typing) return

      const expected = KONAMI[konamiIdx.current]
      if (e.key === expected || e.key.toLowerCase() === expected) {
        konamiIdx.current += 1
        if (konamiIdx.current === KONAMI.length) {
          konamiIdx.current = 0
          startParty()
        }
      } else {
        konamiIdx.current = e.key === KONAMI[0] ? 1 : 0
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [startParty])

  // Bus events from other components
  useEffect(() => onEgg((type, payload) => {
    if (type === 'toast') pushToast(payload)
    if (type === 'party') startParty()
    if (type === 'barrel-roll') barrelRoll()
    if (type === 'confetti') confettiBurst(payload?.x, payload?.y)
  }), [pushToast, startParty])

  return (
    <>
      <Terminal open={termOpen} onClose={() => setTermOpen(false)} />
      <EmojiRain active={party} />
      {party && <div className="party-frame" aria-hidden="true" />}

      <div className="toast-stack" role="status" aria-live="polite">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              className="egg-toast"
              initial={{ opacity: 0, y: 24, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.94 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="egg-toast-emoji">{t.emoji}</span>
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}
