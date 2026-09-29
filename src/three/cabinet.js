/**
 * The hero's arcade cabinet. Plain three.js (no R3F) so the lazy chunk is
 * just three + this file. Built from primitives — no model files to fetch.
 *
 * The scene renders into a low-res target, then one full-screen pass applies
 * ordered (Bayer) dithering and upscales with nearest filtering. That pass is
 * the whole "game render" look and costs well under a millisecond.
 *
 * The screen runs an attract-mode demo of Perimeter: red tainted tool calls
 * stop at the proxy line, green clean calls pass through to the tools, and the
 * counter climbs to 213/213 — the real benchmark number, nothing invented.
 */
import * as THREE from 'three'

const GOLD = '#ffc629'
const RED = '#ff5a52'
const GREEN = '#45d483'
const INK = '#f4efe2'
const DISPLAY = '"Jersey 10", ui-monospace, monospace'
const TOTAL = 213
const PIXEL = 2 // CSS px per rendered pixel

/* ── screen: the Perimeter demo, drawn on a 2D canvas ─────────────────── */

function createDemo() {
  // Low native resolution on purpose: after the dither pass the screen is
  // only ~90 px wide, so everything on it is big and blocky enough to read.
  const W = 192
  const H = 136 // matches the screen plane, 5.3 × 3.74
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  const LANES = [24, 52, 80, 108, 136, 164].map((x) => x - 5)
  const TOP = 44
  const PROXY = 94
  const TOOLS = 116
  let calls = []
  let sparks = []
  let blocked = 0
  let spawnRed = 0
  let spawnGreen = 0.6
  let banner = 0
  let toolFlash = [0, 0, 0]

  function reset() {
    calls = []
    sparks = []
    blocked = 0
    banner = 0
  }

  function update(dt) {
    if (banner === Infinity) reset() // resuming from the reduced-motion still
    if (banner > 0) {
      banner -= dt
      if (banner <= 0) reset()
      return
    }
    spawnRed -= dt
    spawnGreen -= dt
    // ~6 payloads a second: 213 lands in a bit over half a minute.
    if (spawnRed <= 0 && blocked + calls.filter((c) => c.bad).length < TOTAL) {
      spawnRed = 0.12 + Math.random() * 0.1
      calls.push({ x: LANES[(Math.random() * LANES.length) | 0], y: TOP, v: 34 + Math.random() * 18, bad: true })
    }
    if (spawnGreen <= 0) {
      spawnGreen = 0.8 + Math.random() * 0.6
      calls.push({ x: LANES[(Math.random() * LANES.length) | 0], y: TOP, v: 30, bad: false })
    }
    for (const c of calls) {
      c.y += c.v * dt
      if (c.bad && c.y >= PROXY - 10) {
        c.dead = true
        blocked++
        for (let i = 0; i < 4; i++) {
          sparks.push({ x: c.x + 4, y: PROXY - 4, vx: (Math.random() - 0.5) * 80, vy: -24 - Math.random() * 40, t: 0.35 })
        }
      } else if (!c.bad && c.y >= TOOLS - 8) {
        c.dead = true
        toolFlash[Math.min(2, Math.floor((c.x / W) * 3))] = 0.35
      }
    }
    calls = calls.filter((c) => !c.dead)
    for (const s of sparks) {
      s.x += s.vx * dt
      s.y += s.vy * dt
      s.vy += 200 * dt
      s.t -= dt
    }
    sparks = sparks.filter((s) => s.t > 0)
    toolFlash = toolFlash.map((t) => Math.max(0, t - dt))
    if (blocked >= TOTAL) banner = 3.2
  }

  function text(str, x, y, size, color, align = 'left') {
    ctx.font = `${size}px ${DISPLAY}`
    ctx.textAlign = align
    ctx.fillStyle = color
    ctx.fillText(str, x, y)
  }

  function draw() {
    ctx.fillStyle = '#0a0f0b'
    ctx.fillRect(0, 0, W, H)

    // score: the only text that has to survive the dither
    text(`${String(blocked).padStart(3, '0')}/${TOTAL}`, W / 2, 34, 40, GOLD, 'center')

    // proxy line — thick, dashed, gold
    ctx.fillStyle = GOLD
    for (let x = 6; x < W - 6; x += 12) ctx.fillRect(x, PROXY, 8, 4)

    // tools row
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = toolFlash[i] > 0 ? GREEN : '#2c3a31'
      ctx.fillRect(14 + i * 60, TOOLS, 44, 12)
    }

    // calls: red = tainted, green = clean
    for (const c of calls) {
      ctx.fillStyle = c.bad ? RED : GREEN
      ctx.fillRect(c.x, c.y, 10, 10)
    }
    ctx.fillStyle = RED
    for (const s of sparks) ctx.fillRect(s.x, s.y, 3, 3)

    if (banner > 0) {
      ctx.fillStyle = '#0a0f0b'
      ctx.fillRect(0, 44, W, 48)
      text('ALL BLOCKED', W / 2, 80, 36, GREEN, 'center')
    }

    // scanlines
    ctx.fillStyle = 'rgba(0,0,0,0.18)'
    for (let y = 0; y < H; y += 3) ctx.fillRect(0, y, W, 1)
  }

  // The static frame used under reduced motion: the result, not the race.
  function finalFrame() {
    reset()
    blocked = TOTAL
    banner = Infinity
    draw()
  }

  return { canvas, update, draw, finalFrame, reset }
}

function createMarquee() {
  // Same aspect as the marquee panel (6.4 × 2.3) so the lettering isn't stretched.
  const W = 512
  const H = 184
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#16140f'
  ctx.fillRect(0, 0, W, H)
  // pixel rules top and bottom
  ctx.fillStyle = GOLD
  for (let x = 8; x < W - 8; x += 16) {
    ctx.fillRect(x, 16, 8, 6)
    ctx.fillRect(x + 8, H - 22, 8, 6)
  }
  const label = 'KUMARASWAMY.DEV'
  ctx.font = `100px ${DISPLAY}`
  const size = Math.min(120, (100 * (W - 56)) / ctx.measureText(label).width)
  ctx.font = `${size}px ${DISPLAY}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = GOLD
  ctx.fillText(label, W / 2, H / 2 + 4)
  return canvas
}

/* Side art: charcoal panel, a gold "T-molding" stroke following the profile,
   and a big pixel K. Drawn in shape units so it lands on the extrude cap. */
function createSideArt(points, bounds) {
  const S = 40 // texture px per world unit
  const w = bounds.max.x - bounds.min.x
  const h = bounds.max.y - bounds.min.y
  const canvas = document.createElement('canvas')
  canvas.width = Math.ceil(w * S)
  canvas.height = Math.ceil(h * S)
  const ctx = canvas.getContext('2d')
  const tx = (p) => [(p.x - bounds.min.x) * S, (bounds.max.y - p.y) * S]

  ctx.fillStyle = '#2e2b25'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.beginPath()
  points.forEach((p, i) => (i ? ctx.lineTo(...tx(p)) : ctx.moveTo(...tx(p))))
  ctx.closePath()
  ctx.strokeStyle = GOLD
  ctx.lineWidth = 22
  ctx.lineJoin = 'miter'
  ctx.stroke()

  // pixel "K", 5x7 cells
  const K = ['10001', '10010', '10100', '11000', '10100', '10010', '10001']
  const cell = 22
  const ox = canvas.width * 0.5 - (cell * 5) / 2 - 20
  const oy = canvas.height * 0.36
  ctx.fillStyle = GOLD
  K.forEach((row, r) =>
    [...row].forEach((on, c) => on === '1' && ctx.fillRect(ox + c * cell, oy + r * cell, cell - 3, cell - 3)),
  )
  // three stripes low on the panel
  ;[RED, GOLD, GREEN].forEach((color, i) => {
    ctx.fillStyle = color
    ctx.fillRect(0, canvas.height * 0.7 + i * 26, canvas.width, 12)
  })

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.magFilter = THREE.NearestFilter
  // ExtrudeGeometry cap UVs are raw shape coordinates; map them to 0..1.
  tex.repeat.set(1 / w, 1 / h)
  tex.offset.set(-bounds.min.x / w, -bounds.min.y / h)
  return tex
}

/* ── the cabinet ─────────────────────────────────────────────────────── */

function buildCabinet(screenTex, marqueeTex) {
  const cab = new THREE.Group()
  const mat = (color, extra) => new THREE.MeshStandardMaterial({ color, roughness: 0.75, metalness: 0.05, flatShading: true, ...extra })
  const body = mat('#2a2722')
  const trim = mat(GOLD, { roughness: 0.5 })
  const black = mat('#0c0c0b')

  const HALF = 3.2 // half the inner width
  const SIDE = 0.3

  // Side profile in (z, y): back → front, bottom → top.
  const profile = [
    [-3, 0], [3.2, 0], [3.2, 6.9], [4.5, 7.5], [4.3, 8.1], [2.5, 8.7],
    [1.4, 13.1], [2.4, 13.5], [2.4, 15.8], [-3, 15.8],
  ].map(([z, y]) => new THREE.Vector2(z, y))
  const shape = new THREE.Shape(profile)
  const sideGeo = new THREE.ExtrudeGeometry(shape, { depth: SIDE, bevelEnabled: false })
  sideGeo.computeBoundingBox()
  const art = createSideArt(profile, { min: new THREE.Vector2(-3, 0), max: new THREE.Vector2(4.5, 15.8) })
  // The right panel's outer cap sees the shape from behind, so its art is
  // mirrored in u to keep the K reading the right way round.
  const artR = art.clone()
  artR.repeat.x = -art.repeat.x
  artR.offset.x = 4.5 / 7.5
  artR.needsUpdate = true
  for (const s of [-1, 1]) {
    // caps get the art, edges are the gold T-molding
    const side = new THREE.Mesh(sideGeo, [mat('#ffffff', { map: s > 0 ? artR : art }), trim])
    side.rotation.y = -Math.PI / 2 // shape x → world z
    side.position.x = s > 0 ? HALF + SIDE : -HALF
    cab.add(side)
  }

  const box = (w, h, d, m, x, y, z, rx = 0) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m)
    mesh.position.set(x, y, z)
    mesh.rotation.x = rx
    cab.add(mesh)
    return mesh
  }
  const W = HALF * 2

  // Surface between two profile points, inset slightly inside the sides.
  const panel = (a, b, m, thick = 0.2, w = W) => {
    const dz = b[0] - a[0]
    const dy = b[1] - a[1]
    const len = Math.hypot(dz, dy)
    const mesh = box(w, thick, len, m, 0, (a[1] + b[1]) / 2, (a[0] + b[0]) / 2)
    mesh.rotation.x = Math.atan2(dy, dz) * -1
    return mesh
  }

  box(W, 6.9, 0.2, body, 0, 3.45, 3.1) // lower front
  box(W, 0.6, 0.3, black, 0, 0.3, 3.3) // kick plate
  // coin door
  box(2.4, 2.6, 0.12, mat('#3a3731', { metalness: 0.4, roughness: 0.45 }), 0, 3.6, 3.24)
  for (const x of [-0.55, 0.55]) {
    box(0.42, 0.62, 0.08, new THREE.MeshBasicMaterial({ color: RED }), x, 3.95, 3.32)
    box(0.08, 0.36, 0.1, black, x, 3.95, 3.36)
  }

  // control panel: top surface gold, front lip dark
  panel([4.3, 8.1], [2.5, 8.7], trim, 0.2)
  panel([3.2, 6.9], [4.5, 7.5], body, 0.2)
  box(W, 0.6, 0.2, body, 0, 7.8, 4.42, 0.12)

  // joystick + buttons sit on the slope; place them in a tilted group
  const cp = new THREE.Group()
  cp.position.set(0, 8.46, 3.4)
  cp.rotation.x = Math.atan2(0.6, 1.8)
  cab.add(cp)
  const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.9, 6), mat('#c9c4b8', { metalness: 0.6, roughness: 0.3 }))
  stick.position.set(-1.6, 0.45, 0)
  cp.add(stick)
  const ball = new THREE.Mesh(new THREE.IcosahedronGeometry(0.34, 1), mat(RED, { roughness: 0.4 }))
  ball.position.set(-1.6, 0.95, 0)
  cp.add(ball)
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.08, 8), black)
  base.position.set(-1.6, 0.04, 0)
  cp.add(base)
  ;[[0.2, RED], [1.05, GREEN], [1.9, INK]].forEach(([x, color]) => {
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.27, 0.16, 10), mat(color, { roughness: 0.35 }))
    b.position.set(x, 0.1, -0.1)
    cp.add(b)
  })

  // screen bezel + screen (unlit so it glows at full brightness)
  const bezel = panel([2.5, 8.7], [1.4, 13.1], black, 0.12)
  const screenLen = Math.hypot(1.1, 4.4)
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(W - 1.1, screenLen - 0.8),
    new THREE.MeshBasicMaterial({ map: screenTex }),
  )
  // The bezel's local −y faces the player and its +z runs up the screen, so
  // turning the plane +90° about x puts its face out and its top up.
  screen.rotation.x = Math.PI / 2
  screen.position.y = -0.07
  bezel.add(screen)

  // marquee (lit) and the header box around it
  box(W, 2.3, 0.1, new THREE.MeshBasicMaterial({ map: marqueeTex }), 0, 14.65, 2.42)
  box(W + 0.02, 0.2, 0.9, black, 0, 13.45, 2.0) // shelf under the marquee
  box(W, 0.2, 5.4, body, 0, 15.7, -0.3) // top
  box(W, 15.8, 0.2, body, 0, 7.9, -2.9) // back

  return { cab, screen }
}

/* ── dither pass ──────────────────────────────────────────────────────── */

const ditherMaterial = new THREE.ShaderMaterial({
  uniforms: { tScene: { value: null }, uRes: { value: new THREE.Vector2() } },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tScene;
    uniform vec2 uRes;
    varying vec2 vUv;
    float bayer2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
    float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
    void main() {
      vec4 texel = texture2D(tScene, vUv);
      vec3 c = pow(max(texel.rgb, 0.0), vec3(1.0 / 2.2)); // linear → display
      float b = bayer4(vUv * uRes);
      const float L = 6.0; // levels per channel
      c = floor(c * (L - 1.0) + b) / (L - 1.0);
      // Dithered alpha, so the shadow goes pixel too. Thresholds are centred
      // ((i + 0.5) / 16) so a near-zero alpha draws nothing instead of a
      // stray dot in every 4×4 cell.
      float a = step(b + 0.5 / 16.0, texel.a);
      gl_FragColor = vec4(c * a, a);
    }
  `,
  depthTest: false,
  depthWrite: false,
})

/* ── mount ────────────────────────────────────────────────────────────── */

export function mountCabinet(host, { reducedMotion = false, onFrame } = {}) {
  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  renderer.domElement.setAttribute('aria-hidden', 'true')
  host.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(26, 1, 1, 200)

  const demo = createDemo()
  const screenTex = new THREE.CanvasTexture(demo.canvas)
  screenTex.colorSpace = THREE.SRGBColorSpace
  screenTex.anisotropy = 4
  const marqueeTex = new THREE.CanvasTexture(createMarquee())
  marqueeTex.colorSpace = THREE.SRGBColorSpace
  marqueeTex.anisotropy = 4

  const { cab } = buildCabinet(screenTex, marqueeTex)
  const rig = new THREE.Group() // rig rotates; cab stays centred on its footprint
  cab.position.set(0, 0, -0.6)
  rig.add(cab)
  scene.add(rig)

  // pixel shadow on the floor
  const sh = document.createElement('canvas')
  sh.width = sh.height = 64
  const shc = sh.getContext('2d')
  const g = shc.createRadialGradient(32, 32, 4, 32, 32, 32)
  g.addColorStop(0, 'rgba(0,0,0,0.55)')
  g.addColorStop(1, 'rgba(0,0,0,0)')
  shc.fillStyle = g
  shc.fillRect(0, 0, 64, 64)
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(13, 11),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sh), transparent: true, depthWrite: false }),
  )
  shadow.rotation.x = -Math.PI / 2
  shadow.position.y = 0.01
  rig.add(shadow)

  scene.add(new THREE.HemisphereLight('#fff4dc', '#3a342a', 1.4))
  const key = new THREE.DirectionalLight('#fff8ec', 2.6)
  key.position.set(12, 16, 14)
  scene.add(key)
  const fill = new THREE.DirectionalLight('#ffe2a0', 0.8)
  fill.position.set(-10, 6, 8)
  scene.add(fill)
  const glow = new THREE.PointLight('#8dffb9', 18, 9, 2) // screen spill onto the controls
  glow.position.set(0, 9.6, 4.2)
  rig.add(glow)

  const rt = new THREE.WebGLRenderTarget(1, 1, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    type: THREE.HalfFloatType,
  })
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), ditherMaterial)
  const quadScene = new THREE.Scene()
  quadScene.add(quad)
  const quadCam = new THREE.Camera()
  ditherMaterial.uniforms.tScene.value = rt.texture

  function resize() {
    const w = Math.max(1, host.clientWidth)
    const h = Math.max(1, host.clientHeight)
    renderer.setSize(w, h, false)
    rt.setSize(Math.ceil(w / PIXEL), Math.ceil(h / PIXEL))
    ditherMaterial.uniforms.uRes.value.set(Math.ceil(w / PIXEL), Math.ceil(h / PIXEL))
    camera.aspect = w / h
    // Keep the whole cabinet in frame on tall (mobile) and wide boxes alike.
    const fit = Math.max(1, 0.8 / camera.aspect)
    camera.position.set(9 * fit, 13, 41 * fit)
    camera.lookAt(0, 8.1, 0)
    camera.updateProjectionMatrix()
    frame(true)
  }

  /* motion state */
  const REST = -0.38
  let yaw = REST
  let targetYaw = REST
  let tilt = 0
  let targetTilt = 0
  let dragging = false
  let lastX = 0
  let idleTimer = 0
  let paused = reducedMotion
  let visible = true
  let raf = 0
  let last = performance.now()
  let fontReady = false

  function render() {
    rig.rotation.y = yaw
    rig.rotation.x = tilt
    renderer.setRenderTarget(rt)
    renderer.render(scene, camera)
    renderer.setRenderTarget(null)
    renderer.render(quadScene, quadCam)
  }

  function settled() {
    return Math.abs(targetYaw - yaw) < 0.001 && Math.abs(targetTilt - tilt) < 0.001
  }

  function frame(once = false) {
    const now = performance.now()
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    if (!paused && fontReady) {
      demo.update(dt)
      demo.draw()
      screenTex.needsUpdate = true
    }
    if (!dragging && now > idleTimer) targetYaw = REST
    yaw += (targetYaw - yaw) * Math.min(1, dt * 6)
    tilt += (targetTilt - tilt) * Math.min(1, dt * 6)
    render()
    onFrame?.()
    if (once) return
    raf = 0
    if (visible && !document.hidden && (!paused || dragging || !settled())) {
      raf = requestAnimationFrame(() => frame())
    }
  }

  function kick() {
    if (!raf && visible && !document.hidden) {
      last = performance.now()
      raf = requestAnimationFrame(() => frame())
    }
  }

  /* input: drag to spin, hover to lean */
  const el = renderer.domElement
  const onDown = (e) => {
    dragging = true
    lastX = e.clientX
    el.setPointerCapture?.(e.pointerId)
    kick()
  }
  const onMove = (e) => {
    if (dragging) {
      targetYaw += (e.clientX - lastX) * 0.012
      lastX = e.clientX
      idleTimer = performance.now() + 2500
    } else if (e.pointerType === 'mouse') {
      const r = el.getBoundingClientRect()
      targetTilt = ((e.clientY - r.top) / r.height - 0.5) * 0.08
    }
    kick()
  }
  const onUp = () => {
    dragging = false
    idleTimer = performance.now() + 2500
    kick()
  }
  const onLeave = () => {
    targetTilt = 0
    kick()
  }
  el.addEventListener('pointerdown', onDown)
  el.addEventListener('pointermove', onMove)
  el.addEventListener('pointerup', onUp)
  el.addEventListener('pointercancel', onUp)
  el.addEventListener('pointerleave', onLeave)

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    kick()
  })
  io.observe(host)
  const onVis = () => kick()
  document.addEventListener('visibilitychange', onVis)
  const ro = new ResizeObserver(resize)
  ro.observe(host)

  // The demo is drawn in Jersey 10; wait for it (briefly) so text isn't a fallback face.
  const font = document.fonts?.load(`20px ${DISPLAY}`) ?? Promise.resolve()
  Promise.race([font, new Promise((r) => setTimeout(r, 1500))]).then(() => {
    fontReady = true
    marqueeTex.image = createMarquee()
    marqueeTex.needsUpdate = true
    if (paused) demo.finalFrame()
    else demo.draw()
    screenTex.needsUpdate = true
    frame(true)
    kick()
  })

  resize()

  return {
    setPaused(p) {
      paused = p
      kick()
    },
    dispose() {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onUp)
      el.removeEventListener('pointerleave', onLeave)
      scene.traverse((o) => {
        o.geometry?.dispose()
        const m = o.material
        for (const mm of Array.isArray(m) ? m : m ? [m] : []) {
          mm.map?.dispose()
          mm.dispose()
        }
      })
      rt.dispose()
      renderer.dispose()
      el.remove()
    },
  }
}
