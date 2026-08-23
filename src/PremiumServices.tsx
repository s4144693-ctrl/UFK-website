import { useRef, useEffect, useState } from 'react'
import { motion } from 'motion/react'

/* ─────────────────────────────────────────────────────────────
   SHARED UTIL
───────────────────────────────────────────────────────────── */
function setupCanvas(canvas: HTMLCanvasElement) {
  const dpr    = Math.min(window.devicePixelRatio || 1, 2)
  const parent = canvas.parentElement!
  const fit = () => {
    canvas.width  = Math.round(parent.offsetWidth  * dpr)
    canvas.height = Math.round(parent.offsetHeight * dpr)
  }
  fit()
  const ro = new ResizeObserver(fit)
  ro.observe(parent)
  return { dpr, disconnect: () => ro.disconnect() }
}

const CANVAS_STYLE: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  display: 'block',
}

/* ─────────────────────────────────────────────────────────────
   PALETTE HELPERS  (Cards 1 & 2)
───────────────────────────────────────────────────────────── */
const cDim    = (a: number) => `rgba(34,197,94,${a})`
const cMid    = (a: number) => `rgba(74,222,128,${a})`
const cBright = (a: number) => `rgba(134,239,172,${a})`

/* Shared canvas prop — hover state reference */
type CanvasProps = { hoveredRef?: React.RefObject<boolean> }

/* ─────────────────────────────────────────────────────────────
   CARD 1 — WIREFRAME TORUS
───────────────────────────────────────────────────────────── */
function TorusCanvas({ hoveredRef: _ }: CanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx    = canvas.getContext('2d')!
    const { dpr, disconnect } = setupCanvas(canvas)

    const R = 0.52, r = 0.22

    const particles = Array.from({ length: 36 }, () => ({
      u:     Math.random() * Math.PI * 2,
      v:     Math.random() * Math.PI * 2,
      speed: 0.0126 + Math.random() * 0.0112,
    }))

    const torusXYZ = (u: number, v: number) => ({
      x: (R + r * Math.cos(v)) * Math.cos(u),
      y:  r * Math.sin(v),
      z: (R + r * Math.cos(v)) * Math.sin(u),
    })

    const project = (
      x: number, y: number, z: number,
      cosX: number, sinX: number, rotY: number,
    ) => {
      const w = canvas.width, h = canvas.height
      const y1 = y * cosX - z * sinX
      const z1 = y * sinX + z * cosX
      const cY = Math.cos(rotY), sY = Math.sin(rotY)
      const x2 = x * cY + z1 * sY
      const z2 = -x * sY + z1 * cY
      const scale = Math.min(w, h) * 0.462
      const s = scale / (1 + z2 / 3.8)
      return { sx: w / 2 + x2 * s, sy: h / 2 + y1 * s, z: z2 }
    }

    const drawLine = (
      pts: Array<{ u: number; v: number }>,
      baseOpacity: number,
      isFront: boolean,
      cosX: number, sinX: number, rotY: number,
    ) => {
      let avgZ = 0
      const proj = pts.map(p => {
        const tp = torusXYZ(p.u, p.v)
        const pr = project(tp.x, tp.y, tp.z, cosX, sinX, rotY)
        avgZ += pr.z
        return pr
      })
      avgZ /= pts.length
      const a = Math.max(0.035, baseOpacity + Math.max(0, avgZ) * 0.28)
      ctx.strokeStyle = isFront ? cBright(a) : cMid(a * 0.85)
      ctx.beginPath()
      proj.forEach((p, i) => (i === 0 ? ctx.moveTo(p.sx, p.sy) : ctx.lineTo(p.sx, p.sy)))
      ctx.stroke()
    }

    const SEGS = 72
    let rotY = 0, time = 0, last = 0, rafId: number

    const draw = (ts: number) => {
      const dt = Math.min((ts - last) / 1000, 0.05)
      last = ts; time += dt
      rotY += dt * 0.28

      const tiltX = 0.36 + Math.sin(time * 0.231) * 0.13
      const cosX  = Math.cos(tiltX), sinX = Math.sin(tiltX)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.lineWidth = 0.75
      for (let ui = 0; ui < 28; ui++) {
        const u = (ui / 28) * Math.PI * 2
        drawLine(
          Array.from({ length: SEGS + 1 }, (_, vi) => ({ u, v: (vi / SEGS) * Math.PI * 2 })),
          0.11, false, cosX, sinX, rotY,
        )
      }

      ctx.lineWidth = 0.95
      for (let vi = 0; vi < 14; vi++) {
        const v = (vi / 14) * Math.PI * 2
        drawLine(
          Array.from({ length: SEGS + 1 }, (_, ui) => ({ u: (ui / SEGS) * Math.PI * 2, v })),
          0.22, true, cosX, sinX, rotY,
        )
      }

      particles.forEach(p => {
        p.u = (p.u + p.speed * dt * 60) % (Math.PI * 2)
        const tp   = torusXYZ(p.u, p.v)
        const proj = project(tp.x, tp.y, tp.z, cosX, sinX, rotY)
        const depth = Math.max(0, (proj.z + 1.2) / 2.4)
        ctx.beginPath()
        ctx.arc(proj.sx, proj.sy, (1.0 + depth * 2.4) * dpr * 0.48, 0, Math.PI * 2)
        ctx.fillStyle = cBright(0.45 + depth * 0.55)
        ctx.fill()
      })

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(rafId); disconnect() }
  }, [])

  return <canvas ref={ref} style={CANVAS_STYLE} />
}

/* ─────────────────────────────────────────────────────────────
   CARD 2 — ISOMETRIC LAYERS  (collapse → expand loop)
───────────────────────────────────────────────────────────── */
function IsometricCanvas({ hoveredRef: _ }: CanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx    = canvas.getContext('2d')!
    const { disconnect } = setupCanvas(canvas)

    const N = 6, W = 92, D = 62, GAP = 40, TH = 9, GRID_DIVS = 5

    const iso = (wx: number, wy: number, wz: number) => {
      const w = canvas.width, h = canvas.height
      const scale = Math.min(w, h) / 500
      return {
        x: w * 0.5  + (wx - wz) * Math.cos(Math.PI / 6) * scale,
        y: h * 0.52 + ((wx + wz) * Math.sin(Math.PI / 6) - wy) * scale,
      }
    }

    const quad = (
      a: {x:number;y:number}, b: {x:number;y:number},
      c: {x:number;y:number}, d: {x:number;y:number},
      fill: string, stroke: string,
    ) => {
      ctx.beginPath()
      ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
      ctx.lineTo(c.x, c.y); ctx.lineTo(d.x, d.y)
      ctx.closePath()
      ctx.fillStyle = fill; ctx.fill()
      ctx.strokeStyle = stroke; ctx.lineWidth = 0.9; ctx.stroke()
    }

    let dashOffset = 0, time = 0, last = 0, rafId: number

    const draw = (ts: number) => {
      const dt = Math.min((ts - last) / 1000, 0.05)
      last = ts; time += dt
      dashOffset = (dashOffset + dt * 20) % 24

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const yScale = (1 + Math.sin(time * 1.6 - Math.PI / 2)) / 2

      for (let l = N - 1; l >= 0; l--) {
        const frac = l / (N - 1)
        const yTop = (l - N / 2 + 0.5) * GAP * yScale
        const yBot = yTop - TH
        const baseA = 0.07 + frac * 0.20

        const TL  = iso(-W, yTop, -D), TR  = iso( W, yTop, -D)
        const TRf = iso( W, yTop,  D), TLf = iso(-W, yTop,  D)
        const BL  = iso(-W, yBot, -D), BR  = iso( W, yBot, -D)
        const BRf = iso( W, yBot,  D), BLf = iso(-W, yBot,  D)

        quad(TR, TRf, BRf, BR,   'transparent', cMid(baseA + 0.10))
        quad(TLf, TL, BL, BLf,   'transparent', cMid(baseA + 0.08))
        quad(TL, TR, TRf, TLf,   'transparent', cBright(baseA + 0.15))

        if (l === N - 1) {
          for (let gi = 1; gi < GRID_DIVS; gi++) {
            for (let gj = 1; gj < GRID_DIVS; gj++) {
              const gx  = -W + (gi / GRID_DIVS) * W * 2
              const gz  = -D + (gj / GRID_DIVS) * D * 2
              const dot = iso(gx, yTop, gz)
              ctx.beginPath()
              ctx.arc(dot.x, dot.y, 1.4, 0, Math.PI * 2)
              ctx.fillStyle = cBright(0.70)
              ctx.fill()
            }
          }
        }

        if (l < N - 1) {
          const yNextTop  = ((l + 1) - N / 2 + 0.5) * GAP * yScale
          const connAlpha = (baseA + 0.08) * yScale
          if (connAlpha > 0.005) {
            ctx.setLineDash([4, 7])
            ctx.lineDashOffset = -dashOffset
            ctx.strokeStyle    = cMid(connAlpha)
            ctx.lineWidth      = 0.7
            ;[
              [iso(-W, yTop, -D), iso(-W, yNextTop, -D)],
              [iso( W, yTop, -D), iso( W, yNextTop, -D)],
              [iso( W, yTop,  D), iso( W, yNextTop,  D)],
              [iso(-W, yTop,  D), iso(-W, yNextTop,  D)],
            ].forEach(([a, b]) => {
              ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
            })
            ctx.setLineDash([])
            ctx.lineDashOffset = 0
          }
        }
      }

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(rafId); disconnect() }
  }, [])

  return <canvas ref={ref} style={CANVAS_STYLE} />
}

/* ─────────────────────────────────────────────────────────────
   CARD 3 — ISOMETRIC TOWER SKYLINE
   White wireframe columns that rise/fall independently in a
   slow, staggered sine-wave pattern — like a live data
   visualiser or architectural model.
───────────────────────────────────────────────────────────── */
function IsometricBarCanvas({ hoveredRef }: CanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx    = canvas.getContext('2d')!
    const { dpr, disconnect } = setupCanvas(canvas)

    const COLS   = 3,  ROWS = 3
    const CW     = 28, CD   = 22     // cell dimensions (world units)
    const TW     = 18, TD   = 14     // tower footprint
    const COS30  = Math.cos(Math.PI / 6)
    // Centre the grid at world origin
    const OX     = ((COLS - 1) * CW) / 2
    const OZ     = ((ROWS - 1) * CD) / 2

    // Per-tower constants — generated once, stable across frames
    const towers = Array.from({ length: COLS * ROWS }, (_, i) => {
      const col  = i % COLS
      const row  = Math.floor(i / COLS)
      const minH = 15 + Math.random() * 20          // 15–35 base height
      const addH = 32 + Math.random() * 58          // 32–90 animation range
      return {
        col, row, minH, addH,
        // Cycle time 8–12.5 s (0.50–0.79 rad/s)
        speed: 0.50 + Math.random() * 0.29,
        // Diagonal wave: columns advance phase left→right, rows front→back
        phase: col * 1.10 + row * 0.80,
      }
    // Painter's algorithm: draw far (low col+row) first
    }).sort((a, b) => (a.col + a.row) - (b.col + b.row))

    // Floating particles — drift above the skyline like Cards 1 & 2
    const spread = { x: (COLS - 1) * CW * 0.7, z: (ROWS - 1) * CD * 0.7 }
    const floatDots = Array.from({ length: 12 }, () => ({
      x:     (Math.random() - 0.5) * spread.x * 2,
      baseY: 55 + Math.random() * 55,         // world-height above ground
      z:     (Math.random() - 0.5) * spread.z * 2,
      bob:   0.28 + Math.random() * 0.32,     // bob frequency (rad/s)
      phase: Math.random() * Math.PI * 2,
      size:  0.9 + Math.random() * 1.2,       // world-space radius
      bright: Math.random() > 0.5,            // alternate cBright / cMid
    }))

    /** Project a world point → screen pixel (with subtle Y-axis rotation) */
    const pt = (wx: number, wy: number, wz: number, rot: number, cx: number, cy: number, sc: number) => {
      const rx = wx * Math.cos(rot) - wz * Math.sin(rot)
      const rz = wx * Math.sin(rot) + wz * Math.cos(rot)
      return {
        x: cx + (rx - rz) * COS30 * sc,
        y: cy + (rx + rz) * 0.5   * sc - wy * sc,
      }
    }

    /** Draw a closed polygon outline at the given alpha */
    const outline = (pts: Array<{x: number; y: number}>, a: number, colorFn: (a: number) => string = cBright) => {
      if (a < 0.012) return
      ctx.beginPath()
      pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)))
      ctx.closePath()
      ctx.strokeStyle = colorFn(Math.min(1, a))
      ctx.stroke()
    }

    let time = 0, last = 0, rafId: number

    const draw = (ts: number) => {
      const dt = Math.min((ts - last) / 1000, 0.05)
      last = ts; time += dt

      const w  = canvas.width, h = canvas.height
      // Scale so the structure fills ~65% of the smaller canvas dimension
      const sc = Math.min(w, h) / 290
      const cx = w * 0.50
      const cy = h * 0.62          // sit slightly below centre so towers rise into upper half

      // Subtle oscillating rotation ±2.5° over ~20 s
      const rot = Math.sin(time * 0.32) * 0.0436

      const isHovered  = hoveredRef?.current ?? false
      const ampMult    = isHovered ? 1.20 : 1.00     // +20% amplitude on hover
      const lineAlpha  = isHovered ? 1.00 : 0.80     // brighter lines on hover

      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = 0.9

      towers.forEach(t => {
        // Height oscillates between minH and (minH + addH) via sine
        const sinV = 0.5 + 0.5 * Math.sin(time * t.speed + t.phase)
        const hVal = t.minH + t.addH * sinV * ampMult

        const x0 = t.col * CW - OX,  x1 = x0 + TW
        const z0 = t.row * CD - OZ,  z1 = z0 + TD

        const p = (wx: number, wy: number, wz: number) => pt(wx, wy, wz, rot, cx, cy, sc)

        // 8 corners: top (t) and bottom (b), back-left (A), back-right (B),
        //            front-right (C), front-left (D)
        const At = p(x0, hVal, z0),  Bt = p(x1, hVal, z0)
        const Ct = p(x1, hVal, z1),  Dt = p(x0, hVal, z1)
        const _Ab = p(x0, 0,    z0),  Bb = p(x1, 0,    z0)
        const Cb = p(x1, 0,    z1),  Db = p(x0, 0,    z1)

        // Depth cue: towers closer to viewer (higher col+row) render brighter
        const depth = (t.col + t.row) / (COLS + ROWS - 2)  // 0 = far, 1 = near
        const a     = lineAlpha * (0.38 + depth * 0.46)

        // Three visible faces in standard isometric perspective
        outline([At, Bt, Ct, Dt],   a * 1.00, cBright)   // top face — most lit
        outline([Bt, Ct, Cb, Bb],   a * 0.72, cMid)      // right face (screen-right)
        outline([Dt, Ct, Cb, Db],   a * 0.55, cDim)      // front face (screen-left, most shadowed)
      })

      // Floating dots above the skyline — matches particle style of Cards 1 & 2
      floatDots.forEach(d => {
        const bobY  = d.baseY + Math.sin(time * d.bob + d.phase) * 7
        const sp    = pt(d.x, bobY, d.z, rot, cx, cy, sc)
        const pulse = 0.5 + 0.5 * Math.sin(time * d.bob * 1.4 + d.phase)
        const alpha = 0.30 + pulse * 0.50
        const r     = d.size * sc * dpr * 0.38
        ctx.beginPath()
        ctx.arc(sp.x, sp.y, r, 0, Math.PI * 2)
        ctx.fillStyle = d.bright ? cBright(alpha) : cMid(alpha * 0.85)
        ctx.fill()
      })

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(rafId); disconnect() }
  }, [hoveredRef])

  return <canvas ref={ref} style={CANVAS_STYLE} />
}

/* ─────────────────────────────────────────────────────────────
   SERVICE CARD
───────────────────────────────────────────────────────────── */
const CARDS: Array<{ num: string; title: string; desc: string; Canvas: React.ComponentType<CanvasProps> }> = [
  { num: '01', title: 'Branding & Logo Development',
    desc: 'Craft memorable brands that stand out — from visual identity systems and logo design to full brand guidelines built for consistency at every touchpoint.',
    Canvas: TorusCanvas },
  { num: '02', title: 'Web & Application Development',
    desc: 'Build scalable websites, apps, and digital platforms engineered for performance, flexibility, and seamless user experience from first click to conversion.',
    Canvas: IsometricCanvas },
  { num: '03', title: 'Digital Marketing & IT Solutions',
    desc: 'Grow your business with data-driven marketing, cloud infrastructure, enterprise integrations, and technology solutions that compound over time.',
    Canvas: IsometricBarCanvas },
]

function ServiceCard({ num, title, desc, Canvas }: (typeof CARDS)[number]) {
  const [hovered, setHovered]  = useState(false)
  const hoveredRef = useRef(false)

  const onHoverStart = () => { hoveredRef.current = true;  setHovered(true)  }
  const onHoverEnd   = () => { hoveredRef.current = false; setHovered(false) }

  return (
    <motion.div
      className="ps-card"
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      animate={{ y: hovered ? -8 : 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        className="ps-glow"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        aria-hidden
      />

      <div className="ps-illustration">
        <Canvas hoveredRef={hoveredRef} />
      </div>

      <div className="ps-body">
        <span className="ps-num">{num}</span>
        <motion.h3
          className="ps-title"
          animate={{ color: hovered ? '#ffffff' : 'rgba(255,255,255,0.82)' }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {title}
        </motion.h3>
        <p className="ps-desc">{desc}</p>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   SECTION
───────────────────────────────────────────────────────────── */
export default function PremiumServicesSection() {
  return (
    <section className="ps-section">
      <div className="ps-inner">
        <div className="ps-header">
          <p className="ps-label">Our Services</p>
          <h2 className="ps-heading">
            Solutions That Move<br />
            Businesses Forward
          </h2>
        </div>
        <div className="ps-grid">
          {CARDS.map(c => <ServiceCard key={c.num} {...c} />)}
        </div>
      </div>
    </section>
  )
}
