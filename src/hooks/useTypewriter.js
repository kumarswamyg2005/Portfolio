import { useState, useEffect, useRef } from 'react'

/**
 * Typewriter hook — cycles through an array of strings.
 * @param {string[]} words   – Array of strings to cycle
 * @param {number}   speed   – ms per character when typing
 * @param {number}   del     – ms per character when deleting
 * @param {number}   pause   – ms to pause at full word before deleting
 */
export default function useTypewriter(words, speed = 80, del = 45, pause = 1800) {
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase]         = useState('typing')  // 'typing' | 'pausing' | 'deleting'
  const wordIdx = useRef(0)

  useEffect(() => {
    const word = words[wordIdx.current]

    if (phase === 'typing') {
      if (displayed.length < word.length) {
        const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), speed)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('deleting'), pause)
        return () => clearTimeout(t)
      }
    }

    if (phase === 'deleting') {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), del)
        return () => clearTimeout(t)
      } else {
        wordIdx.current = (wordIdx.current + 1) % words.length
        setPhase('typing')
      }
    }
  }, [displayed, phase, words, speed, del, pause])

  return displayed
}
