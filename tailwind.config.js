/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-void':      '#020408',
        dark:           '#06090f',
        'dark-2':       '#080c14',
        'dark-card':    '#0a0f1a',
        'flame-red':    '#c1121f',
        'flame-orange': '#e85d04',
        'flame-gold':   '#faa307',
        'water-blue':   '#0077b6',
        'water-cyan':   '#00b4d8',
        'water-light':  '#90e0ef',
        'text-hi':      '#e8e0d0',
        'text-mid':     '#9e9484',
        muted:          '#9e9484',
        'muted-lo':     '#5a5248',
      },
      fontFamily: {
        display: ['"Shippori Mincho"', '"Noto Serif JP"', 'serif'],
        body:    ['"Inter"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        jp:      ['"Noto Serif JP"', 'serif'],
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring':   'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'premium':  'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      animation: {
        'orb-drift-1':   'orb-drift-1 22s ease-in-out infinite',
        'orb-drift-2':   'orb-drift-2 28s ease-in-out infinite',
        'orb-drift-3':   'orb-drift-3 19s ease-in-out infinite',
        'featured-glow': 'featured-glow 3s ease-in-out infinite',
        'scroll-bounce': 'ember-fall 2.4s ease-in-out infinite',
        'flame-flicker': 'flame-flicker 1.8s ease-in-out infinite',
      },
      keyframes: {
        'orb-drift-1': {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':      { transform: 'translate(50px,-35px) scale(1.07)' },
          '66%':      { transform: 'translate(-25px,45px) scale(0.97)' },
        },
        'orb-drift-2': {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '40%':      { transform: 'translate(-60px,55px) scale(1.05)' },
          '70%':      { transform: 'translate(45px,-65px) scale(1.1)' },
        },
        'orb-drift-3': {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '50%':      { transform: 'translate(35px,28px) scale(1.06)' },
        },
        'featured-glow': {
          '0%,100%': { boxShadow: '0 0 6px rgba(250,163,7,0.55), inset 0 0 6px rgba(250,163,7,0.1)' },
          '50%':      { boxShadow: '0 0 20px rgba(250,163,7,0.9), inset 0 0 10px rgba(250,163,7,0.25)' },
        },
        'ember-fall': {
          '0%,100%': { transform: 'translateY(0) rotate(-10deg)', opacity: '0.7' },
          '50%':      { transform: 'translateY(7px) rotate(10deg)', opacity: '0.3' },
        },
        'flame-flicker': {
          '0%,100%': { opacity: '1' },
          '50%':      { opacity: '0.75' },
        },
      },
    },
  },
  plugins: [],
}
