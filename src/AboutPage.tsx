import React, { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { NeatGradient } from '@firecms/neat'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'

const INTRO_GRADIENT_CONFIG = {
  colors: [
    { color: '#010506', enabled: true },
    { color: '#b2ff59', enabled: false },
    { color: '#239E58', enabled: true },
    { color: '#01423E', enabled: true },
    { color: '#446C2A', enabled: true },
  ],
  speed: 1.5,
  horizontalPressure: 3,
  verticalPressure: 4,
  waveFrequencyX: 10,
  waveFrequencyY: 0,
  waveAmplitude: 10,
  shadows: 5,
  highlights: 10,
  colorBrightness: 1,
  colorSaturation: 2,
  wireframe: false,
  antialias: false,
  colorBlending: 9,
  backgroundColor: '#000000',
  backgroundAlpha: 1,
  grainScale: 2,
  grainSparsity: 0,
  grainIntensity: 0.05,
  grainSpeed: 1,
  resolution: 0.5,
  yOffset: 3169,
  yOffsetWaveMultiplier: 1.5,
  yOffsetColorMultiplier: 7.8,
  yOffsetFlowMultiplier: 9.3,
  flowDistortionA: 3.7,
  flowDistortionB: 1.4,
  flowScale: 2.9,
  flowEase: 0.32,
  flowEnabled: true,
  enableProceduralTexture: false,
  domainWarpEnabled: false,
  vignetteIntensity: 0,
  vignetteRadius: 0.8,
  fresnelEnabled: false,
  bloomIntensity: 0,
  bloomThreshold: 0.7,
  chromaticAberration: 0,
  shapeType: 'plane' as const,
  shapeRotationX: 0,
  shapeRotationY: 0,
  shapeRotationZ: 0,
  shapeAutoRotateSpeedX: 0,
  shapeAutoRotateSpeedY: 0,
  flatShading: true,
  cameraLock: true,
  cameraX: 0,
  cameraY: 0,
  cameraZ: 0,
  cameraRotationX: 0,
  cameraRotationY: 0,
  cameraRotationZ: 0,
  cameraZoom: 1,
}

const GLOBE_PINS = [
  { name: 'USA',       pinX: 18.5, pinY: 32.4 },
  { name: 'UK',        pinX: 52.0, pinY: 15.6 },
  { name: 'Dubai',     pinX: 61.2, pinY: 24.8 },
  { name: 'Qatar',     pinX: 62.3, pinY: 25.2 },
  { name: 'India',     pinX: 70.0, pinY: 31.3 },
  { name: 'Australia', pinX: 86.5, pinY: 70.0 },
]

const GLOBE_CONNECTIONS = [
  [0, 1],
  [1, 2],
  [2, 4],
  [4, 5],
]

function buildRoutePath(): string {
  const segs = GLOBE_CONNECTIONS.map(([fi, ti]) => {
    const f  = GLOBE_PINS[fi]
    const t  = GLOBE_PINS[ti]
    const cx = (f.pinX + t.pinX) / 2
    const cy = Math.min(f.pinY, t.pinY) - Math.abs(t.pinX - f.pinX) * 0.22
    return `Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${t.pinX} ${t.pinY}`
  })
  const start = GLOBE_PINS[GLOBE_CONNECTIONS[0][0]]
  return `M ${start.pinX} ${start.pinY} ` + segs.join(' ')
}

const ROUTE_PATH = buildRoutePath()
const GLOBE_CHIPS = ['USA', 'United Kingdom', 'Dubai', 'Qatar', 'India', 'Australia']

const VALUES_ILLUSTRATED = [
  {
    title: 'Quality over quantity',
    desc: 'We choose our partners carefully so we can deliver our very best for each one.',
    svg: (
      <svg viewBox="0 0 440 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <radialGradient id="q-chrome" cx="36%" cy="30%" r="62%">
            <stop offset="0%"   stopColor="#f2f7f2"/>
            <stop offset="22%"  stopColor="#c8d8c0"/>
            <stop offset="50%"  stopColor="#5a7a50"/>
            <stop offset="78%"  stopColor="#1a2e18"/>
            <stop offset="100%" stopColor="#060d05"/>
          </radialGradient>
          <radialGradient id="q-lime-refl" cx="66%" cy="70%" r="34%">
            <stop offset="0%"   stopColor="#b2ff59" stopOpacity="0.48"/>
            <stop offset="100%" stopColor="#b2ff59" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="q-matte-a" cx="38%" cy="30%" r="65%">
            <stop offset="0%"   stopColor="#525252"/>
            <stop offset="55%"  stopColor="#252525"/>
            <stop offset="100%" stopColor="#0f0f0f"/>
          </radialGradient>
          <radialGradient id="q-matte-b" cx="42%" cy="34%" r="60%">
            <stop offset="0%"   stopColor="#3e3e3e"/>
            <stop offset="50%"  stopColor="#1e1e1e"/>
            <stop offset="100%" stopColor="#0c0c0c"/>
          </radialGradient>
          <radialGradient id="q-floor" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#000" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#000" stopOpacity="0"/>
          </radialGradient>
          <filter id="q-soft"><feGaussianBlur stdDeviation="2.5"/></filter>
          <filter id="q-glow"><feGaussianBlur stdDeviation="8"/></filter>
        </defs>
        <rect width="440" height="300" fill="#04090d"/>
        {/* floor shadow */}
        <ellipse cx="218" cy="284" rx="140" ry="11" fill="url(#q-floor)"/>
        {/* matte spheres */}
        <circle cx="82"  cy="210" r="36"  fill="url(#q-matte-a)"/>
        <circle cx="132" cy="262" r="22"  fill="url(#q-matte-b)" opacity="0.85"/>
        <circle cx="348" cy="194" r="30"  fill="url(#q-matte-a)"/>
        <circle cx="340" cy="258" r="20"  fill="url(#q-matte-b)" opacity="0.8"/>
        {/* main polished sphere */}
        <circle cx="218" cy="178" r="95"  fill="url(#q-chrome)"/>
        <circle cx="218" cy="178" r="95"  fill="url(#q-lime-refl)"/>
        {/* soft spec halo */}
        <ellipse cx="178" cy="132" rx="30" ry="20" fill="white" opacity="0.55" filter="url(#q-soft)"/>
        {/* sharp spec dot */}
        <ellipse cx="181" cy="136" rx="13" ry="9"  fill="white" opacity="0.92"/>
        <circle  cx="176" cy="131" r="5"            fill="white" opacity="1"/>
        {/* secondary micro-spec */}
        <ellipse cx="268" cy="228" rx="9"  ry="6"  fill="white" opacity="0.16"/>
        {/* lime rim glow */}
        <circle cx="218" cy="178" r="95" fill="none" stroke="#b2ff59" strokeWidth="1" opacity="0.18"/>
      </svg>
    ),
  },
  {
    title: 'Integrity',
    desc: 'We are honest, transparent and accountable in everything we do.',
    svg: (
      <svg viewBox="0 0 440 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="i-top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#d0ddd0" stopOpacity="0.18"/>
            <stop offset="100%" stopColor="#8aaa8a" stopOpacity="0.10"/>
          </linearGradient>
          <linearGradient id="i-left" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#3a5a3a" stopOpacity="0.22"/>
            <stop offset="100%" stopColor="#1a2e1a" stopOpacity="0.14"/>
          </linearGradient>
          <linearGradient id="i-right" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#223022" stopOpacity="0.18"/>
            <stop offset="100%" stopColor="#0e180e" stopOpacity="0.12"/>
          </linearGradient>
          <filter id="i-glow"><feGaussianBlur stdDeviation="5"/></filter>
        </defs>
        <rect width="440" height="300" fill="#04090d"/>

        {/* outer cube — vertices */}
        {/* A(220,52) B(148,92) C(292,92) D(220,132) E(148,212) F(292,212) G(220,252) */}

        {/* faces — frosted glass fills */}
        <polygon points="220,52 292,92 220,132 148,92"   fill="url(#i-top)"/>
        <polygon points="148,92 148,212 220,252 220,132"  fill="url(#i-left)"/>
        <polygon points="292,92 292,212 220,252 220,132"  fill="url(#i-right)"/>

        {/* face edge highlights */}
        <polygon points="220,52 292,92 220,132 148,92"   fill="none" stroke="rgba(200,230,200,0.35)" strokeWidth="1"/>
        <polygon points="148,92 148,212 220,252 220,132"  fill="none" stroke="rgba(200,230,200,0.18)" strokeWidth="1"/>
        <polygon points="292,92 292,212 220,252 220,132"  fill="none" stroke="rgba(200,230,200,0.18)" strokeWidth="1"/>

        {/* bright top edges */}
        <line x1="220" y1="52"  x2="292" y2="92"  stroke="rgba(240,255,240,0.70)" strokeWidth="1.2"/>
        <line x1="220" y1="52"  x2="148" y2="92"  stroke="rgba(240,255,240,0.60)" strokeWidth="1.2"/>
        <line x1="292" y1="92"  x2="220" y2="132" stroke="rgba(240,255,240,0.45)" strokeWidth="1"/>
        <line x1="148" y1="92"  x2="220" y2="132" stroke="rgba(240,255,240,0.45)" strokeWidth="1"/>
        {/* vertical edges */}
        <line x1="148" y1="92"  x2="148" y2="212" stroke="rgba(200,230,200,0.40)" strokeWidth="1"/>
        <line x1="292" y1="92"  x2="292" y2="212" stroke="rgba(200,230,200,0.28)" strokeWidth="1"/>
        <line x1="220" y1="132" x2="220" y2="252" stroke="rgba(200,230,200,0.20)" strokeWidth="0.8"/>
        {/* bottom edges */}
        <line x1="148" y1="212" x2="220" y2="252" stroke="rgba(200,230,200,0.28)" strokeWidth="1"/>
        <line x1="292" y1="212" x2="220" y2="252" stroke="rgba(200,230,200,0.22)" strokeWidth="1"/>
        <line x1="148" y1="212" x2="292" y2="212" stroke="rgba(200,230,200,0.14)" strokeWidth="0.8" strokeDasharray="none"/>

        {/* inner cube — half size, centred  */}
        {/* ia(220,112) ib(185,132) ic(255,132) id(220,152) ie(185,192) if(255,192) ig(220,212) */}
        <polygon points="220,112 255,132 220,152 185,132" fill="rgba(178,255,89,0.04)"/>
        <line x1="220" y1="112" x2="255" y2="132" stroke="#b2ff59" strokeWidth="0.7" opacity="0.55"/>
        <line x1="220" y1="112" x2="185" y2="132" stroke="#b2ff59" strokeWidth="0.7" opacity="0.55"/>
        <line x1="255" y1="132" x2="220" y2="152" stroke="#b2ff59" strokeWidth="0.7" opacity="0.45"/>
        <line x1="185" y1="132" x2="220" y2="152" stroke="#b2ff59" strokeWidth="0.7" opacity="0.45"/>
        <line x1="185" y1="132" x2="185" y2="192" stroke="#b2ff59" strokeWidth="0.7" opacity="0.40"/>
        <line x1="255" y1="132" x2="255" y2="192" stroke="#b2ff59" strokeWidth="0.7" opacity="0.35"/>
        <line x1="220" y1="152" x2="220" y2="212" stroke="#b2ff59" strokeWidth="0.7" opacity="0.30"/>
        <line x1="185" y1="192" x2="220" y2="212" stroke="#b2ff59" strokeWidth="0.7" opacity="0.35"/>
        <line x1="255" y1="192" x2="220" y2="212" stroke="#b2ff59" strokeWidth="0.7" opacity="0.30"/>
        <line x1="185" y1="192" x2="255" y2="192" stroke="#b2ff59" strokeWidth="0.7" opacity="0.28"/>

        {/* lime glow on inner top vertex */}
        <circle cx="220" cy="112" r="4" fill="#b2ff59" opacity="0.7"/>
        <circle cx="220" cy="112" r="10" fill="#b2ff59" opacity="0.15" filter="url(#i-glow)"/>

        {/* top vertex bright dot */}
        <circle cx="220" cy="52" r="2.5" fill="white" opacity="0.9"/>
      </svg>
    ),
  },
  {
    title: 'Innovation',
    desc: 'We keep learning, adapting and building with the latest tools and technologies.',
    svg: (
      <svg viewBox="0 0 440 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="in-slab" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#888" />
            <stop offset="30%"  stopColor="#ccc" />
            <stop offset="52%"  stopColor="#e8e8e8"/>
            <stop offset="70%"  stopColor="#b0b0b0"/>
            <stop offset="100%" stopColor="#4a4a4a"/>
          </linearGradient>
          <linearGradient id="in-ribbon-a" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#b8c8b8"/>
            <stop offset="50%"  stopColor="#8aaa8a"/>
            <stop offset="100%" stopColor="#3a5a3a"/>
          </linearGradient>
          <linearGradient id="in-ribbon-b" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#4a6a4a"/>
            <stop offset="60%"  stopColor="#c0d0c0"/>
            <stop offset="100%" stopColor="#e0e8e0"/>
          </linearGradient>
          <linearGradient id="in-top-face" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#d8e8d8"/>
            <stop offset="100%" stopColor="#8aaa8a"/>
          </linearGradient>
          <filter id="in-soft"><feGaussianBlur stdDeviation="3"/></filter>
          <filter id="in-glow"><feGaussianBlur stdDeviation="7"/></filter>
        </defs>
        <rect width="440" height="300" fill="#04090d"/>

        {/* metallic slab — left side */}
        {/* front face */}
        <rect x="42" y="108" width="130" height="84" fill="url(#in-slab)" rx="2"/>
        {/* top face (slight 3D) */}
        <polygon points="42,108 172,108 182,96 52,96" fill="url(#in-top-face)"/>
        {/* right side face */}
        <polygon points="172,108 182,96 182,180 172,192" fill="#3a4a3a"/>
        {/* edge highlights */}
        <line x1="42"  y1="108" x2="172" y2="108" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2"/>
        <line x1="42"  y1="108" x2="42"  y2="192" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8"/>
        <line x1="52"  y1="96"  x2="182" y2="96"  stroke="rgba(255,255,255,0.55)" strokeWidth="1"/>
        {/* brushed lines on slab face */}
        {[116,124,132,140,148,156,164,172,180].map((y, i) => (
          <line key={i} x1="42" y1={y} x2="172" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.7"/>
        ))}

        {/* transition zone — morphing paths */}
        <path d="M172 108 C210 108 220 90 260 72" stroke="rgba(200,220,200,0.55)" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M172 150 C215 150 228 148 265 132" stroke="rgba(180,200,180,0.40)" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M172 192 C218 192 235 200 268 228" stroke="rgba(160,185,160,0.30)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M182  96 C222  96 235  78 270  62" stroke="rgba(220,240,220,0.45)" strokeWidth="1.5" strokeLinecap="round"/>

        {/* fluid ribbon — right side */}
        <path d="M260,72 C290,58 330,52 390,58 L390,90 C330,84 295,92 268,112 Z"
              fill="url(#in-ribbon-a)" opacity="0.9"/>
        <path d="M265,132 C298,118 338,116 395,122 L395,154 C338,148 302,152 270,168 Z"
              fill="url(#in-ribbon-b)" opacity="0.85"/>
        <path d="M268,228 C300,218 342,222 398,232 L398,252 C342,244 302,242 270,248 Z"
              fill="url(#in-ribbon-a)" opacity="0.6"/>

        {/* ribbon edge highlights */}
        <path d="M260,72 C290,58 330,52 390,58" stroke="rgba(240,255,240,0.65)" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M265,132 C298,118 338,116 395,122" stroke="rgba(240,255,240,0.50)" strokeWidth="1" strokeLinecap="round"/>
        <path d="M268,228 C300,218 342,222 398,232" stroke="rgba(240,255,240,0.35)" strokeWidth="0.8" strokeLinecap="round"/>

        {/* lime accent at transition */}
        <circle cx="215" cy="130" r="4" fill="#b2ff59" opacity="0.85"/>
        <circle cx="215" cy="130" r="12" fill="#b2ff59" opacity="0.12" filter="url(#in-glow)"/>
      </svg>
    ),
  },
  {
    title: 'Partnership',
    desc: "We work as an extension of our clients' teams, not as a distant vendor.",
    svg: (
      <svg viewBox="0 0 440 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="p-form-a" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#d0ddd0"/>
            <stop offset="40%"  stopColor="#8aaa8a"/>
            <stop offset="100%" stopColor="#2a3e2a"/>
          </linearGradient>
          <linearGradient id="p-form-b" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#b2ff59" stopOpacity="0.6"/>
            <stop offset="40%"  stopColor="#6a9a6a"/>
            <stop offset="100%" stopColor="#1e301e"/>
          </linearGradient>
          <linearGradient id="p-inner-a" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#1a2a1a"/>
            <stop offset="100%" stopColor="#0a120a"/>
          </linearGradient>
          <filter id="p-glow"><feGaussianBlur stdDeviation="9"/></filter>
          <filter id="p-soft"><feGaussianBlur stdDeviation="3"/></filter>
        </defs>
        <rect width="440" height="300" fill="#04090d"/>

        {/* Form A — large silver arch, top-left to bottom-right */}
        {/* Outer ring */}
        <path d="M 90,60 A 120,120 0 1 1 350,240" stroke="url(#p-form-a)" strokeWidth="38" fill="none" strokeLinecap="round"/>
        {/* Inner cutout to create 3D ring illusion */}
        <path d="M 90,60 A 120,120 0 1 1 350,240" stroke="url(#p-inner-a)" strokeWidth="22" fill="none" strokeLinecap="round"/>
        {/* Highlight on top edge */}
        <path d="M 90,60 A 120,120 0 1 1 350,240" stroke="rgba(240,250,240,0.55)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>

        {/* Form B — lime-tinted arch, mirrored */}
        <path d="M 350,60 A 120,120 0 1 0 90,240" stroke="url(#p-form-b)" strokeWidth="36" fill="none" strokeLinecap="round"/>
        <path d="M 350,60 A 120,120 0 1 0 90,240" stroke="url(#p-inner-a)" strokeWidth="20" fill="none" strokeLinecap="round"/>
        <path d="M 350,60 A 120,120 0 1 0 90,240" stroke="rgba(178,255,89,0.35)" strokeWidth="1" fill="none" strokeLinecap="round"/>

        {/* Intersection glow */}
        <circle cx="220" cy="150" r="18" fill="#b2ff59" opacity="0.18" filter="url(#p-glow)"/>
        <circle cx="220" cy="150" r="6"  fill="#b2ff59" opacity="0.55"/>
        <circle cx="220" cy="150" r="3"  fill="white"   opacity="0.9"/>

        {/* End cap highlights */}
        <circle cx="90"  cy="60"  r="6" fill="rgba(240,255,240,0.7)"/>
        <circle cx="350" cy="240" r="5" fill="rgba(240,255,240,0.5)"/>
        <circle cx="350" cy="60"  r="5" fill="rgba(178,255,89,0.6)"/>
        <circle cx="90"  cy="240" r="4" fill="rgba(178,255,89,0.5)"/>
      </svg>
    ),
  },
  {
    title: 'Results',
    desc: 'We measure our success by the growth and impact we create for our clients.',
    svg: (
      <svg viewBox="0 0 440 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="r-face-top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#d0dcd0"/>
            <stop offset="100%" stopColor="#7a9a7a"/>
          </linearGradient>
          <linearGradient id="r-face-left" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#3a5a3a"/>
            <stop offset="100%" stopColor="#1e301e"/>
          </linearGradient>
          <linearGradient id="r-face-right" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#2a3e2a"/>
            <stop offset="100%" stopColor="#141e14"/>
          </linearGradient>
          <radialGradient id="r-sphere" cx="36%" cy="30%" r="62%">
            <stop offset="0%"   stopColor="#d8ff90"/>
            <stop offset="35%"  stopColor="#b2ff59"/>
            <stop offset="70%"  stopColor="#5a8a20"/>
            <stop offset="100%" stopColor="#1a2a08"/>
          </radialGradient>
          <radialGradient id="r-floor" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#000" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#000" stopOpacity="0"/>
          </radialGradient>
          <filter id="r-glow"><feGaussianBlur stdDeviation="10"/></filter>
          <filter id="r-soft"><feGaussianBlur stdDeviation="2"/></filter>
        </defs>
        <rect width="440" height="300" fill="#04090d"/>
        <ellipse cx="260" cy="284" rx="150" ry="10" fill="url(#r-floor)"/>

        {/* Step 1 — lowest, leftmost  dx=38 dy_s=22 dy_v=28 */}
        <polygon points="62,232 100,210 138,232 100,254" fill="url(#r-face-top)"/>
        <polygon points="62,232 62,260 100,282 100,254" fill="url(#r-face-left)"/>
        <polygon points="138,232 138,260 100,282 100,254" fill="url(#r-face-right)"/>
        <line x1="62" y1="232" x2="138" y2="232" stroke="rgba(240,255,240,0.6)" strokeWidth="1"/>
        <line x1="62" y1="232" x2="100" y2="210" stroke="rgba(240,255,240,0.7)" strokeWidth="1"/>
        <line x1="100" y1="210" x2="138" y2="232" stroke="rgba(240,255,240,0.5)" strokeWidth="1"/>

        {/* Step 2 */}
        <polygon points="130,196 168,174 206,196 168,218" fill="url(#r-face-top)"/>
        <polygon points="130,196 130,252 168,274 168,218" fill="url(#r-face-left)"/>
        <polygon points="206,196 206,252 168,274 168,218" fill="url(#r-face-right)"/>
        <line x1="130" y1="196" x2="206" y2="196" stroke="rgba(240,255,240,0.6)" strokeWidth="1"/>
        <line x1="130" y1="196" x2="168" y2="174" stroke="rgba(240,255,240,0.7)" strokeWidth="1"/>
        <line x1="168" y1="174" x2="206" y2="196" stroke="rgba(240,255,240,0.5)" strokeWidth="1"/>

        {/* Step 3 */}
        <polygon points="198,160 236,138 274,160 236,182" fill="url(#r-face-top)"/>
        <polygon points="198,160 198,244 236,266 236,182" fill="url(#r-face-left)"/>
        <polygon points="274,160 274,244 236,266 236,182" fill="url(#r-face-right)"/>
        <line x1="198" y1="160" x2="274" y2="160" stroke="rgba(240,255,240,0.6)" strokeWidth="1"/>
        <line x1="198" y1="160" x2="236" y2="138" stroke="rgba(240,255,240,0.7)" strokeWidth="1"/>
        <line x1="236" y1="138" x2="274" y2="160" stroke="rgba(240,255,240,0.5)" strokeWidth="1"/>

        {/* Step 4 — highest */}
        <polygon points="266,124 304,102 342,124 304,146" fill="url(#r-face-top)"/>
        <polygon points="266,124 266,236 304,258 304,146" fill="url(#r-face-left)"/>
        <polygon points="342,124 342,236 304,258 304,146" fill="url(#r-face-right)"/>
        <line x1="266" y1="124" x2="342" y2="124" stroke="rgba(240,255,240,0.65)" strokeWidth="1.2"/>
        <line x1="266" y1="124" x2="304" y2="102" stroke="rgba(240,255,240,0.75)" strokeWidth="1.2"/>
        <line x1="304" y1="102" x2="342" y2="124" stroke="rgba(240,255,240,0.55)" strokeWidth="1.1"/>

        {/* lime sphere on top */}
        <circle cx="304" cy="72" r="28" fill="url(#r-sphere)"/>
        {/* glow beneath sphere */}
        <circle cx="304" cy="72" r="28" fill="#b2ff59" opacity="0.2" filter="url(#r-glow)"/>
        {/* specular */}
        <ellipse cx="292" cy="60" rx="9" ry="6" fill="white" opacity="0.7" filter="url(#r-soft)"/>
        <circle  cx="290" cy="58" r="3.5" fill="white" opacity="0.9"/>
        {/* connect sphere to step */}
        <line x1="304" y1="100" x2="304" y2="102" stroke="rgba(178,255,89,0.4)" strokeWidth="1.5"/>
      </svg>
    ),
  },
]

const JOURNEY = [
  {
    year: '2020',
    title: 'The Beginning',
    desc: 'UFK Solutions was registered in India and began working with international clients, including a Microsoft partner company. Strong early projects helped bring many more development opportunities on board.',
    active: false,
  },
  {
    year: '2021',
    title: 'Full-stack CRM Development',
    desc: 'We expanded into full-stack CRM development, building custom systems that help businesses manage leads, customers and operations in one place.',
    active: false,
  },
  {
    year: '2022',
    title: 'Trusted Outsourced Partner',
    desc: 'We collaborated with leading marketing companies, including Globally, as an outsourced development and delivery partner.',
    active: false,
  },
  {
    year: '2023',
    title: 'Digital Marketing & Branding',
    desc: 'We expanded into digital marketing and branding, helping businesses build strong identities and grow their audience online.',
    active: false,
  },
  {
    year: '2024',
    title: 'Aviation Benchmark & Going Global',
    desc: 'We entered the aviation industry by partnering with Avyanna Aviation Academy — India\'s only A-rated Flying Training Organisation. We designed and developed their world-class website, setting a benchmark in the Indian aviation industry. The same year, we began operations in the USA, Dubai, the UK and Qatar.',
    active: false,
    highlight: 'Aviation · USA · Dubai · UK · Qatar',
  },
  {
    year: '2025',
    title: 'Leading Partnerships',
    desc: 'We partnered with FSTC by Adani and Vision Flying Training Institute, one of India\'s fastest-growing FTOs. We also partnered with a US-based magazine publisher, extending our work into the publishing and media space.',
    active: false,
  },
  {
    year: '2026',
    title: 'SaaS, AI Automation & Beyond',
    desc: 'UFK Solutions expanded into a SaaS development company, building software products that help businesses work smarter and scale faster. We launched AI automation, Microsoft 365 migration and RPA development services — helping organisations automate repetitive work, modernise their systems and move to the cloud.',
    active: true,
    highlight: 'SaaS · AI · RPA · Microsoft 365',
  },
]

const WHY = [
  {
    title: 'Proven in demanding industries',
    desc: "Trusted by India's leading flight training organisations, where credibility and precision matter most.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    title: 'Technology & marketing under one roof',
    desc: 'From CRMs and SaaS products to branding and campaigns, everything is built to work together.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    title: 'Global experience',
    desc: 'Years of work with international clients and partners across five countries.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    title: 'Personal attention',
    desc: 'A selective client approach means you always get our full focus, every time.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
]


export default function AboutPage() {
  const introCanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = introCanvasRef.current
    if (!canvas) return
    const gradient = new NeatGradient({ ref: canvas, ...INTRO_GRADIENT_CONFIG })
    return () => { gradient.destroy() }
  }, [])

  return (
    <div className="w-full min-h-screen" style={{ background: '#04090d' }}>

      <SiteNav />

      {/* ── Hero ── */}
      <div className="relative w-full overflow-hidden" style={{ height: '100vh' }}>
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
          <video
            src="/bg-about.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-1000"
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(4,9,13,0.90) 0%, rgba(4,9,13,0.55) 45%, transparent 75%)',
            zIndex: 2,
          }}
        />
        <div
          className="absolute flex flex-col justify-center"
          style={{ top: 0, bottom: 0, left: 0, width: '54%', padding: '0 0 0 clamp(32px, 6vw, 96px)', zIndex: 10 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '580px' }}
          >
            <span
              style={{
                display: 'inline-flex', alignItems: 'center', width: 'fit-content',
                borderRadius: '999px', padding: '8px 18px',
                background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.18)',
                color: '#b2ff59', fontSize: '0.72rem', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
              }}
            >
              About Us
            </span>
            <h1
              style={{
                fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.025em', color: '#f0f5f0',
              }}
            >
              Technology, branding<br />and digital growth
            </h1>
            <p
              style={{
                fontFamily: 'Inter, sans-serif', fontSize: '1.035rem', lineHeight: 1.65,
                color: 'rgba(240,245,240,0.55)', maxWidth: '460px',
              }}
            >
              From India to the world — building CRMs, SaaS products, brand identities and
              campaigns for businesses across industries since 2020.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ width: 'fit-content' }}>
              <Link
                to="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center',
                  background: '#b2ff59', color: '#04090d',
                  fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 600,
                  padding: '14px 36px', borderRadius: '999px', textDecoration: 'none',
                }}
              >
                Work With Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Who We Are ── */}
      <section className="abu-intro-section">
        {/* NeatGradient animated background */}
        <canvas
          ref={introCanvasRef}
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
        />
        {/* dot grid overlay */}
        <div className="abu-intro-dots" />

        <div className="abu-intro-inner">
          <div className="abu-intro-left">
            <p className="abu-section-label">Who We Are</p>
            <h2 className="abu-intro-heading">
              A Partner That<br />
              <span className="abu-intro-heading-em">Grows With You</span>
            </h2>
            <p className="abu-intro-body">
              UFK Solutions is a technology, branding and digital marketing company that has grown from
              India to the world. Since 2020, we have built CRMs, SaaS products and websites, run
              marketing campaigns and created brand identities for businesses across industries.
            </p>
            <p className="abu-intro-body" style={{ marginTop: '14px' }}>
              We are deliberately selective about the clients we work with — taking on fewer partners
              so we can give each one the attention, depth and care their brand deserves.
            </p>
          </div>

          <div className="abu-intro-right">
            <div className="abu-stat-card">
              <span className="abu-stat-num">2M+</span>
              <span className="abu-stat-label">Monthly Organic Visitors</span>
            </div>
            <div className="abu-stat-card">
              <span className="abu-stat-num">1M+</span>
              <span className="abu-stat-label">Monthly Search Impressions</span>
            </div>
            <div className="abu-stat-card">
              <span className="abu-stat-num">200+</span>
              <span className="abu-stat-label">Lead Generation for Clients</span>
            </div>
            <div className="abu-stat-card">
              <span className="abu-stat-num">₹172CR+</span>
              <span className="abu-stat-label">Business Generated for Clients</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Journey / Roadmap ── */}
      <section className="abj-section">

        <div className="abj-header">
          <p className="abj-label">Our Journey</p>
          <h2 className="abj-heading">Where We've Been,<br />Where We're Going</h2>
        </div>

        <div className="abj-track">
          <div className="abj-rule" aria-hidden="true" />

          <div className="abj-col">
            <div className="abj-col-top" />
            <div className="abj-dot" aria-hidden="true"><div className="abj-dot-inner" /></div>
            <div className="abj-col-bottom">
              <span className="abj-period">2020</span>
              <h3 className="abj-col-title">Founded</h3>
              <p className="abj-col-desc">Registered in India, working with international clients including a Microsoft partner company from day one.</p>
            </div>
          </div>

          <div className="abj-col">
            <div className="abj-col-top" />
            <div className="abj-dot" aria-hidden="true"><div className="abj-dot-inner" /></div>
            <div className="abj-col-bottom">
              <span className="abj-period">2024</span>
              <h3 className="abj-col-title">Aviation & Global Expansion</h3>
              <p className="abj-col-desc">Set a benchmark in Indian aviation with Avyanna Academy and expanded to the USA, Dubai, the UK and Qatar.</p>
            </div>
          </div>

          <div className="abj-col abj-col--active">
            <div className="abj-col-top abj-col-top--active">
              <span className="abj-now-badge">We are Here</span>
              <h3 className="abj-now-title">Scaling Impact</h3>
              <p className="abj-now-desc">Delivering measurable growth — 200K+ monthly visitors, 1M+ search impressions, and high-impact digital systems for global clients.</p>
            </div>
            <div className="abj-dot abj-dot--active" aria-hidden="true"><div className="abj-dot-inner" /></div>
            <div className="abj-col-bottom">
              <span className="abj-period">2026</span>
              <h3 className="abj-col-title">Present</h3>
            </div>
          </div>

          <div className="abj-col">
            <div className="abj-col-top" />
            <div className="abj-dot" aria-hidden="true"><div className="abj-dot-inner" /></div>
            <div className="abj-col-bottom">
              <span className="abj-period">2027+</span>
              <h3 className="abj-col-title">Global Reach</h3>
              <p className="abj-col-desc">Expanding into new markets and industries — building the infrastructure for the next generation of digital-first businesses worldwide.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── Our Values (merged) ── */}
      <section className="abv-section">
        <div className="abv-inner">

          <p className="abu-section-label">Our Values</p>

          {/* Top row: headline left, mission+vision right */}
          <div className="abv-top-row">

            <div className="abv-left">
              <h2 className="abv-headline">
                Built with purpose.<br />
                <span className="abv-headline-em">Driven by your success.</span>
              </h2>
              <p className="abv-support">
                We bring technology, creativity and strategy together to help
                businesses grow with confidence.
              </p>
            </div>

            <div className="abv-right">
              <div className="abv-mv-block">
                <span className="abv-mv-label">Our Mission</span>
                <p className="abv-mv-body">
                  Help businesses grow through reliable technology, meaningful
                  brands and measurable results.
                </p>
              </div>
              <div className="abv-mv-block">
                <span className="abv-mv-label">Our Vision</span>
                <p className="abv-mv-body">
                  Become a globally trusted technology and branding partner,
                  creating work that makes a lasting difference.
                </p>
              </div>
            </div>

          </div>

          {/* Tags row */}
          <div className="abv-tags">
            {[
              'Quality over quantity',
              'Integrity in every decision',
              'Always moving forward',
              'Your team, extended',
              'Results that matter',
            ].map(tag => (
              <span key={tag} className="abv-tag">{tag}</span>
            ))}
          </div>

        </div>
      </section>

      {/* ── Global Presence ── */}
      <section className="abu-globe-section">
        <div className="abu-globe-inner">
          <p className="abu-section-label" style={{ marginBottom: '12px' }}>Global Presence</p>
          <h2 className="abu-vals-heading" style={{ marginBottom: '40px' }}>
            Building a global footprint,<br />delivering world-class work
          </h2>
          <div className="gf-card gf-card--globe">
            <div className="gf-globe-inner">
              <div className="gf-globe-wrap">
                <img src="/global-presence.png" className="gf-globe-img" alt="Global presence map" draggable={false} />
                <svg className="gf-globe-lines" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                  {GLOBE_CONNECTIONS.map(([fi, ti], i) => {
                    const f  = GLOBE_PINS[fi]
                    const t  = GLOBE_PINS[ti]
                    const cx = (f.pinX + t.pinX) / 2
                    const cy = Math.min(f.pinY, t.pinY) - Math.abs(t.pinX - f.pinX) * 0.22
                    return <path key={i} d={`M ${f.pinX} ${f.pinY} Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${t.pinX} ${t.pinY}`} className="gf-line-base" />
                  })}
                  <g>
                    <path d={ROUTE_PATH} className="gf-line-glow" pathLength="100" />
                    <path d={ROUTE_PATH} className="gf-line-core" pathLength="100" />
                  </g>
                </svg>
                {GLOBE_PINS.map((p, i) => (
                  <div key={p.name} className="gf-map-pin" style={{ left: `${p.pinX}%`, top: `${p.pinY}%`, animationDelay: `${i * 0.5}s` }} />
                ))}
              </div>
            </div>
            <div className="abu-globe-countries">
              {[
                { name: 'India',          flag: '🇮🇳' },
                { name: 'USA',            flag: '🇺🇸' },
                { name: 'Dubai',          flag: '🇦🇪' },
                { name: 'United Kingdom', flag: '🇬🇧' },
                { name: 'Qatar',          flag: '🇶🇦' },
                { name: 'Australia',      flag: '🇦🇺' },
              ].map(c => (
                <div key={c.name} className="abu-globe-country">
                  <span className="abu-globe-flag">{c.flag}</span>
                  <span className="abu-globe-cname">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose UFK ── */}
      <section className="abu-why-section">
        <div className="abu-why-inner">
          <div className="abu-why-header">
            <p className="abu-section-label">Why Choose Us</p>
            <h2 className="abu-vals-heading">Built different,<br />by design</h2>
          </div>
          <div className="abu-why-cols">
            {WHY.map((w, i) => (
              <div
                key={i}
                className="abu-why-col"
                style={{ '--delay': `${i * 0.1}s` } as React.CSSProperties}
              >
                <span className="abu-why-num">0{i + 1}</span>
                <h3 className="abu-why-col-title">{w.title}</h3>
                <p className="abu-why-col-desc">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof — Arch Montage + Testimonials ── */}
      <section className="absp-section">

        {/* 8-column arch */}
        <div className="absp-arch-outer">
          <div className="absp-arch">

            {/* Col 1 — outermost left */}
            <div className="absp-col absp-col--1">
              <div className="absp-tile"><img src="/sarai-1.webp" alt="Sarai" loading="lazy"/></div>
              <div className="absp-tile"><img src="/abyad-1.webp" alt="Abyad" loading="lazy"/></div>
              <div className="absp-tile"><img src="/flavourhub-05.webp" alt="Flavour Hub" loading="lazy"/></div>
            </div>

            {/* Col 2 */}
            <div className="absp-col absp-col--2">
              <div className="absp-tile"><img src="/avyanna-ss.webp" alt="Avyanna" loading="lazy"/></div>
              <div className="absp-tile"><img src="/vfti-ss1.webp" alt="VFTI" loading="lazy"/></div>
              <div className="absp-tile"><img src="/VFTI.png" alt="VFTI" loading="lazy"/></div>
            </div>

            {/* Col 3 — inner left */}
            <div className="absp-col absp-col--3">
              <div className="absp-tile absp-tile--port"><img src="/avyanna-cover.webp" alt="Avyanna cover" loading="lazy"/></div>
            </div>

            {/* Col 4 — center left */}
            <div className="absp-col absp-col--4">
              <div className="absp-tile absp-tile--port"><img src="/vfti-cover.webp" alt="VFTI cover" loading="lazy"/></div>
            </div>

            {/* Col 5 — center right */}
            <div className="absp-col absp-col--5">
              <div className="absp-tile absp-tile--port"><img src="/sarai-cover.webp" alt="Sarai cover" loading="lazy"/></div>
            </div>

            {/* Col 6 — inner right */}
            <div className="absp-col absp-col--6">
              <div className="absp-tile absp-tile--port"><img src="/wte-cover.webp" alt="WTE cover" loading="lazy"/></div>
            </div>

            {/* Col 7 */}
            <div className="absp-col absp-col--7">
              <div className="absp-tile"><img src="/avyanna.png" alt="Avyanna" loading="lazy"/></div>
              <div className="absp-tile"><img src="/pacific-souravdey.png" alt="Pacific Consulting" loading="lazy"/></div>
              <div className="absp-tile"><img src="/KAISER.jpeg" alt="Grand Kaisar" loading="lazy"/></div>
            </div>

            {/* Col 8 — outermost right */}
            <div className="absp-col absp-col--8">
              <div className="absp-tile"><img src="/BTC.jpeg" alt="BTC Travels" loading="lazy"/></div>
              <div className="absp-tile"><img src="/VIBGYOR.jpeg" alt="VIBGYOR" loading="lazy"/></div>
              <div className="absp-tile"><img src="/nets%20india.png" alt="Nets India" loading="lazy"/></div>
            </div>

          </div>

          {/* Heading sits in the arch opening, overlaid at bottom-center */}
          <div className="absp-arch-label">
            <span className="absp-pill">Testimonials</span>
            <h2 className="absp-heading">
              Trusted by businesses<br />
              <span className="absp-heading-em">across industries</span>
            </h2>
          </div>
        </div>

        {/* 3 open testimonials — no card backgrounds */}
        <div className="absp-testi-row">

          <div className="absp-testi">
            <div className="absp-stars">★★★★★</div>
            <p className="absp-quote">"UFK Solutions has been a reliable end-to-end digital partner. From our website and server management to SEO and social media, they handle everything with professionalism and consistency. Their quick support has made our digital operations much more seamless."</p>
            <div className="absp-author">
              <div className="absp-avatar"><img src="/VFTI.png" alt="Parth Gupta"/></div>
              <div className="absp-author-text">
                <span className="absp-name">Parth Gupta</span>
                <span className="absp-role">Vision Flying Training Institute</span>
              </div>
            </div>
          </div>

          <div className="absp-testi">
            <div className="absp-stars">★★★★★</div>
            <p className="absp-quote">"Over the past three years, our association with UFK Solutions has been a great experience. They played a key role in strengthening Avyanna's digital presence — from a world-class website to reliable IT support. Their responsiveness and ability to deliver makes them stand out."</p>
            <div className="absp-author">
              <div className="absp-avatar"><img src="/avyanna.png" alt="Shardul Seth"/></div>
              <div className="absp-author-text">
                <span className="absp-name">Shardul Seth</span>
                <span className="absp-role">Avyanna Aviation Academy</span>
              </div>
            </div>
          </div>

          <div className="absp-testi">
            <div className="absp-stars">★★★★★</div>
            <p className="absp-quote">"We've been working with UFK Solutions since 2021 and it's been a seamless experience. They handle all our social media, website development and branding with precision — perfectly capturing our brand essence. Their prompt responses and swift action make them a standout choice."</p>
            <div className="absp-author">
              <div className="absp-avatar"><img src="/pacific-souravdey.png" alt="Sourav Dey"/></div>
              <div className="absp-author-text">
                <span className="absp-name">Sourav Dey</span>
                <span className="absp-role">Co-Founder, Pacific Consulting</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Our Promise ── */}
      <section className="abu-promise-section">
        <div className="abu-promise-inner">
          <div className="abu-promise-glow" />
          <p className="abu-section-label" style={{ textAlign: 'center', marginBottom: '24px' }}>Our Promise</p>
          <h2 className="abu-promise-heading">
            Clear strategy. Quality work.<br />Measurable results.
          </h2>
          <p className="abu-promise-body">
            Whether it's a website, a CRM, a SaaS product or a campaign — every project gets the same
            commitment from us. Let's build something great together.
          </p>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: '#b2ff59', color: '#04090d',
                fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 600,
                padding: '16px 40px', borderRadius: '999px', textDecoration: 'none',
              }}
            >
              Start a Conversation
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
