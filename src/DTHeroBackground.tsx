/**
 * DTHeroBackground — Three.js point-cloud terrain
 *
 * Single THREE.Points with BufferGeometry + custom GLSL shader.
 * No spheres, no post-processing, no shadows.
 * Pauses on hidden tab, respects prefers-reduced-motion.
 */

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/* ─── Seeded pseudo-random ──────────────────────────────────────────────── */
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* ─── Vertex shader ─────────────────────────────────────────────────────── */
const VERT = /* glsl */ `
uniform float uTime;
uniform float uMX;       // smoothed mouse -1..1
uniform float uMY;
uniform float uPulseX;   // pulse front world-x  (-20 → +20)
uniform float uPulseI;   // pulse envelope 0..1

attribute float aOpa;    // base per-particle opacity
attribute float aChaos;  // 0=structured  1=chaotic

varying float vOpa;
varying float vGreen;

// --- 2-octave value noise ---
float h(vec2 p){
  p = fract(p * vec2(127.1,311.7));
  p += dot(p, p + 19.19);
  return fract(p.x * p.y);
}
float vn(vec2 p){
  vec2 i=floor(p), f=fract(p);
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(h(i),h(i+vec2(1,0)),u.x),
             mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x),u.y);
}
float fbm(vec2 p){
  return vn(p)*0.60 + vn(p*2.1+1.7)*0.30 + vn(p*4.3+3.2)*0.10;
}

void main() {
  vec3 pos = position;
  float t = uTime * 0.15;

  // ── displacement ──
  float wave =
    sin(pos.x * 0.40 + t * 1.0) * 0.65 +
    sin(pos.z * 0.33 + t * 0.75) * 0.50 +
    sin((pos.x + pos.z) * 0.22 + t * 0.55) * 0.40;

  float nx = pos.x * 0.15 + t * 0.35;
  float nz = pos.z * 0.15 + t * 0.22;
  float chaosV = (fbm(vec2(nx,nz)) - 0.5) * 3.0
               + (fbm(vec2(nx*2.0+4.0, nz*2.0)) - 0.5) * 1.5;

  float dy = mix(wave, chaosV, aChaos);

  // ── green pulse lift ──
  float pDist = abs(pos.x - uPulseX);
  float pFall = smoothstep(4.5, 0.0, pDist);
  dy += pFall * 0.9;

  // ── subtle mouse tilt ──
  dy += uMX * pos.z * 0.010 + uMY * pos.x * 0.006;

  pos.y += dy;

  // ── opacity: edge vignette ──
  float ex = clamp(1.0 - abs(pos.x / 17.0), 0.0, 1.0);
  float ez = clamp(1.0 - abs(pos.z / 13.0), 0.0, 1.0);
  float edge = ex * ez;

  vOpa   = aOpa * mix(0.3, 1.0, edge);
  vGreen = pFall * uPulseI;

  gl_Position  = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

  // Correct perspective point sizing uses gl_Position.w
  float sz = (380.0 / gl_Position.w) * mix(1.4, 2.8, edge);
  gl_PointSize = clamp(sz, 1.0, 5.5);
}
`

/* ─── Fragment shader ───────────────────────────────────────────────────── */
const FRAG = /* glsl */ `
varying float vOpa;
varying float vGreen;

void main() {
  vec2  uv = gl_PointCoord - 0.5;
  float d  = dot(uv, uv);
  if (d > 0.25) discard;

  float alpha = (1.0 - d * 3.5) * vOpa;

  // off-white/silver  →  acid green (#A7FF3F)
  vec3 grey  = vec3(0.78, 0.82, 0.76);
  vec3 green = vec3(0.655, 1.0, 0.247);
  vec3 col   = mix(grey, green, vGreen);

  gl_FragColor = vec4(col * alpha, alpha);  // premultiplied for additive blend
}
`

/* ─── Density by device ─────────────────────────────────────────────────── */
function density() {
  const w = window.innerWidth
  if (w < 640)  return { cols: 44, rows: 34 }   // ≈ 1 496
  if (w < 1024) return { cols: 68, rows: 50 }   // ≈ 3 400
  return              { cols: 96, rows: 66 }     // ≈ 6 336
}

export default function DTHeroBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    /* ── reduced-motion: simple static canvas fallback ── */
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      const sc = document.createElement('canvas')
      sc.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;'
      el.appendChild(sc)
      const resize = () => {
        sc.width = el.clientWidth; sc.height = el.clientHeight
        const ctx = sc.getContext('2d')!
        const r = mulberry32(42)
        for (let i = 0; i < 800; i++) {
          ctx.beginPath()
          ctx.arc(r() * sc.width, r() * sc.height, 1.4, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(180,190,175,${r() * 0.25 + 0.05})`
          ctx.fill()
        }
      }
      resize()
      window.addEventListener('resize', resize)
      return () => { window.removeEventListener('resize', resize); sc.remove() }
    }

    /* ── get real dimensions (use getBoundingClientRect for reliability) ── */
    const rect = el.getBoundingClientRect()
    const W    = rect.width  || window.innerWidth
    const H    = rect.height || window.innerHeight

    /* ── renderer ── */
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'low-power',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(W, H)
    renderer.setClearColor(0x000000, 0)
    const canvas = renderer.domElement
    canvas.style.cssText =
      'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;display:block;'
    el.appendChild(canvas)

    /* ── scene & camera ── */
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 300)
    // Shift the viewpoint down so the terrain sits in the lower half of the hero
    camera.position.set(0, 10, 22)
    camera.lookAt(0, -2, 0)

    /* ── geometry ── */
    const { cols, rows } = density()
    const count  = cols * rows
    const pos    = new Float32Array(count * 3)
    const opa    = new Float32Array(count)
    const chaos  = new Float32Array(count)
    const rand   = mulberry32(77)

    const W3 = 36  // world-space grid width
    const D3 = 26  // world-space grid depth
    let idx = 0
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = -W3 / 2 + c * (W3 / (cols - 1))
        const z = -D3 / 2 + r * (D3 / (rows - 1))
        pos[idx * 3]     = x
        pos[idx * 3 + 1] = 0
        pos[idx * 3 + 2] = z

        // Edge vignette baked into base opacity
        const ex = 1 - Math.abs(x / (W3 / 2))
        const ez = 1 - Math.abs(z / (D3 / 2))
        const edge = Math.min(ex, ez)
        opa[idx] = 0.55 + rand() * 0.40

        // Left = chaotic, right = structured
        chaos[idx] = Math.max(0, Math.min(1, 0.5 - x / W3 + (rand() - 0.5) * 0.3))

        idx++
      }
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos,   3))
    geo.setAttribute('aOpa',     new THREE.BufferAttribute(opa,   1))
    geo.setAttribute('aChaos',   new THREE.BufferAttribute(chaos, 1))

    /* ── uniforms ── */
    const uniforms = {
      uTime:   { value: 0 },
      uMX:     { value: 0 },
      uMY:     { value: 0 },
      uPulseX: { value: -25 },  // starts off-screen left
      uPulseI: { value: 0 },
    }

    const mat = new THREE.ShaderMaterial({
      vertexShader:   VERT,
      fragmentShader: FRAG,
      uniforms,
      transparent: true,
      blending:    THREE.AdditiveBlending,  // particles add light on dark bg
      depthWrite:  false,
      depthTest:   false,
    })

    const points = new THREE.Points(geo, mat)
    points.position.y = 0
    scene.add(points)

    /* ── mouse ── */
    let tmx = 0, tmy = 0, cmx = 0, cmy = 0
    const onMouse = (e: MouseEvent) => {
      tmx = (e.clientX / window.innerWidth  - 0.5) * 2
      tmy = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    /* ── resize ── */
    const onResize = () => {
      const r2 = el.getBoundingClientRect()
      const W2 = r2.width || window.innerWidth
      const H2 = r2.height || window.innerHeight
      renderer.setSize(W2, H2)
      camera.aspect = W2 / H2
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    /* ── pulse state ──
       Travel: x = -20 → +20 over 5 s.  Pause: 20 s.  Cycle: 25 s total.
    ── */
    const PULSE_SPEED  = 8   // world units per second
    const PULSE_TRAVEL = 40
    const PAUSE_SECS   = 20
    let pulseTime = 0  // time within current cycle

    /* ── animation ── */
    let raf: number
    let prevNow = performance.now()
    let hidden  = false

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      if (hidden) return

      const dt = Math.min((now - prevNow) / 1000, 0.05)
      prevNow  = now

      uniforms.uTime.value += dt

      // mouse lerp
      cmx += (tmx - cmx) * 0.035
      cmy += (tmy - cmy) * 0.035
      uniforms.uMX.value = cmx
      uniforms.uMY.value = cmy

      // camera subtle sway
      camera.position.x = cmx * 1.5
      camera.position.y = 10 - cmy * 0.5
      camera.lookAt(0, -2, 0)

      // pulse
      pulseTime += dt
      const cycleLen = PULSE_TRAVEL / PULSE_SPEED + PAUSE_SECS
      const phase = pulseTime % cycleLen
      const travelling = phase * PULSE_SPEED < PULSE_TRAVEL
      if (travelling) {
        const front = -20 + phase * PULSE_SPEED
        uniforms.uPulseX.value = front
        const frac = (front + 20) / PULSE_TRAVEL
        uniforms.uPulseI.value = Math.sin(frac * Math.PI) * 0.8
      } else {
        uniforms.uPulseX.value = 100   // park off-screen
        uniforms.uPulseI.value = 0
      }

      renderer.render(scene, camera)
    }

    raf = requestAnimationFrame(tick)

    /* ── page visibility ── */
    const onVis = () => { hidden = document.hidden }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVis)
      renderer.dispose()
      geo.dispose()
      mat.dispose()
      canvas.remove()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
    />
  )
}
