import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

/* Shared mutable state — written by window listeners, read inside useFrame.
   Kept outside React state so the render loop never re-renders the tree. */
const pointer = { x: 0, y: 0 }
const scroll = { progress: 0 }

// Section accent colors the scene drifts through as you scroll
const SECTION_COLORS = ['#6366f1', '#2dd4bf', '#a78bfa', '#38bdf8', '#fb7185']

// One-time check: is a WebGL context actually obtainable in this browser?
// Returns false when hardware acceleration is off, the GPU is blocklisted,
// or the context is otherwise refused — so we can skip the canvas entirely.
function detectWebGL() {
  if (typeof window === 'undefined') return false
  if (!window.WebGLRenderingContext) return false
  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    return !!gl
  } catch {
    return false
  }
}

function useSceneListeners() {
  useEffect(() => {
    const onMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scroll.progress = max > 0 ? window.scrollY / max : 0
    }
    onScroll()
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
}

// Soft round sprite so points render as glowing dots instead of squares
function useDotTexture() {
  return useMemo(() => {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    grad.addColorStop(0, 'rgba(255,255,255,1)')
    grad.addColorStop(0.4, 'rgba(255,255,255,0.5)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, size, size)
    const tex = new THREE.CanvasTexture(canvas)
    tex.needsUpdate = true
    return tex
  }, [])
}

function StarField({ count = 1600, reduced }) {
  const ref = useRef()
  const matRef = useRef()
  const dot = useDotTexture()
  const colorA = useMemo(() => new THREE.Color(), [])

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Shell of stars around the camera, biased away from dead center
      const r = 14 + Math.random() * 34
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.75
      arr[i * 3 + 2] = r * Math.cos(phi) - 10
    }
    return arr
  }, [count])

  useFrame((state, delta) => {
    if (!ref.current || reduced) return
    ref.current.rotation.y += delta * 0.015
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x, pointer.y * 0.06 + scroll.progress * 0.5, 0.03,
    )
    ref.current.rotation.z = THREE.MathUtils.lerp(
      ref.current.rotation.z, pointer.x * 0.04, 0.03,
    )
    // Tint drifts through the section palette as you scroll
    const t = scroll.progress * (SECTION_COLORS.length - 1)
    const i = Math.min(Math.floor(t), SECTION_COLORS.length - 2)
    colorA.set(SECTION_COLORS[i]).lerp(new THREE.Color(SECTION_COLORS[i + 1]), t - i)
    if (matRef.current) matRef.current.color.lerp(colorA.clone().lerp(new THREE.Color('#cdd6ff'), 0.6), 0.05)
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        map={dot}
        color="#aab4ff"
        size={0.14}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function HeroOrb({ reduced }) {
  const group = useRef()
  const wire = useRef()
  const distortMat = useRef()
  const target = useMemo(() => new THREE.Color(SECTION_COLORS[0]), [])

  useFrame((state, delta) => {
    if (!group.current) return
    const p = scroll.progress
    // Rises out of frame as you scroll past the hero, and eases back in near contact
    const heroPhase = Math.min(p * 4.2, 1)
    const contactPhase = Math.max(0, (p - 0.82) / 0.18)
    group.current.position.y = heroPhase * 7 - contactPhase * 8.4
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, pointer.x * 0.7, 0.04)
    group.current.rotation.y += delta * 0.12
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * 0.25, 0.05)

    const t = p * (SECTION_COLORS.length - 1)
    const i = Math.min(Math.floor(t), SECTION_COLORS.length - 2)
    target.set(SECTION_COLORS[i]).lerp(new THREE.Color(SECTION_COLORS[i + 1]), t - i)
    if (distortMat.current) distortMat.current.color.lerp(target, 0.04)
    if (wire.current) wire.current.material.color.lerp(target, 0.04)
  })

  return (
    <group ref={group}>
      <Float speed={reduced ? 0 : 1.6} rotationIntensity={0.5} floatIntensity={1.1}>
        {/* Outer wireframe shell */}
        <mesh ref={wire} scale={2.35}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#6366f1" wireframe transparent opacity={0.14} />
        </mesh>
        {/* Inner living blob */}
        <mesh scale={1.35}>
          <icosahedronGeometry args={[1, 5]} />
          <MeshDistortMaterial
            ref={distortMat}
            color="#6366f1"
            roughness={0.18}
            metalness={0.65}
            distort={reduced ? 0 : 0.42}
            speed={reduced ? 0 : 2.2}
            transparent
            opacity={0.92}
          />
        </mesh>
      </Float>
    </group>
  )
}

const DRIFTERS = [
  { geo: 'torus', pos: [-5.4, 2.6, -4], scale: 0.55, speed: 0.35 },
  { geo: 'octa', pos: [5.8, -2.2, -6], scale: 0.7, speed: 0.5 },
  { geo: 'box', pos: [-6.5, -3.4, -8], scale: 0.6, speed: 0.28 },
  { geo: 'torus', pos: [6.4, 3.4, -9], scale: 0.8, speed: 0.42 },
  { geo: 'octa', pos: [-3.8, -5.2, -5], scale: 0.45, speed: 0.6 },
  { geo: 'box', pos: [4.2, 5.6, -7], scale: 0.5, speed: 0.33 },
  { geo: 'torus', pos: [0.5, -7.2, -10], scale: 0.9, speed: 0.24 },
]

function Drifter({ geo, pos, scale, speed, reduced }) {
  const ref = useRef()
  const seed = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state, delta) => {
    if (!ref.current || reduced) return
    const t = state.clock.elapsedTime
    ref.current.rotation.x += delta * speed
    ref.current.rotation.y += delta * speed * 0.7
    // Depth-based parallax: farther shapes scroll slower
    const depthFactor = 1 + pos[2] * -0.06
    ref.current.position.y = pos[1] + Math.sin(t * 0.4 + seed) * 0.5 + scroll.progress * 14 * (1 / depthFactor)
    ref.current.position.x = pos[0] + pointer.x * (0.4 / depthFactor) + Math.cos(t * 0.3 + seed) * 0.3
  })

  return (
    <mesh ref={ref} position={pos} scale={scale}>
      {geo === 'torus' && <torusGeometry args={[1, 0.32, 10, 28]} />}
      {geo === 'octa' && <octahedronGeometry args={[1, 0]} />}
      {geo === 'box' && <boxGeometry args={[1.2, 1.2, 1.2]} />}
      <meshStandardMaterial color="#818cf8" wireframe transparent opacity={0.16} />
    </mesh>
  )
}

function CameraRig({ reduced }) {
  useFrame((state) => {
    if (reduced) return
    const cam = state.camera
    cam.position.x = THREE.MathUtils.lerp(cam.position.x, pointer.x * 0.5, 0.03)
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, pointer.y * 0.3 - scroll.progress * 1.2, 0.03)
    cam.lookAt(0, 0, 0)
  })
  return null
}

export default function Scene3D() {
  useSceneListeners()
  const [reduced, setReduced] = useState(false)
  const [supported] = useState(detectWebGL)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // No WebGL → render nothing; the CSS gradient background stands in.
  if (!supported) return null

  return (
    <div className="scene3d-wrap" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.55} />
        <pointLight position={[6, 6, 6]} intensity={90} color="#818cf8" />
        <pointLight position={[-6, -4, 4]} intensity={60} color="#2dd4bf" />

        <CameraRig reduced={reduced} />
        <StarField count={isMobile ? 700 : 1600} reduced={reduced} />
        <HeroOrb reduced={reduced} />
        {!isMobile && DRIFTERS.map((d, i) => <Drifter key={i} {...d} reduced={reduced} />)}
        {!reduced && (
          <Sparkles count={isMobile ? 30 : 70} scale={[16, 10, 8]} size={2.2} speed={0.35} opacity={0.55} color="#a5b4fc" />
        )}
      </Canvas>
    </div>
  )
}
