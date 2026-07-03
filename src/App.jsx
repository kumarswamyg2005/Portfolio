import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import Scene3D from './components/Scene3D'
import SceneBoundary from './components/SceneBoundary'
import ScrollProgress from './components/ScrollProgress'
import CustomCursor from './components/CustomCursor'
import EasterEggs from './components/EasterEggs'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { initSmoothScroll } from './lib/scroll'

export default function App() {
  const [booted, setBooted] = useState(false)

  useEffect(() => {
    initSmoothScroll()
  }, [])

  return (
    <>
      {/* 3D background renders immediately so the GPU warms up behind the loader.
          Boundary + WebGL detection guarantee a canvas failure never blanks the page. */}
      <SceneBoundary>
        <Scene3D />
      </SceneBoundary>

      {!booted && <LoadingScreen onDone={() => setBooted(true)} />}

      {booted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CustomCursor />
          <ScrollProgress />
          <Navbar />

          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>

          <Footer />
          <EasterEggs />
        </motion.div>
      )}
    </>
  )
}
