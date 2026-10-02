import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NeatGradient } from '@firecms/neat'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'
import BlogPreviewSection from './BlogPreviewSection'
import AviationSection from './AviationSection'
import TestimonialsSection from './TestimonialsSection'

const TECH_LOGOS = [
  'tech1.png','tech2.png','tech3.png','tech4.png','tech5.png',
  'tech6.png','tech7.png','tech8.png','tech9.png','tech10.png',
  'tech11.png','tech12.png','tech13.png','tech14.png','tech15.png',
]

/* ── One full set of tech logos ── */
function BrandSet() {
  return (
    <div className="brands-set">
      {TECH_LOGOS.map(src => (
        <img key={src} src={`/${src}`} alt="" draggable={false} className="brand-item brand-item--logo" />
      ))}
    </div>
  )
}


/* ── Global Footprint section ── */
const GF_STATS = [
  { value: '154+',  label: 'Clients Worldwide'  },
  { value: '15+',   label: 'Industries Served'  },
  { value: '200+',  label: 'Projects Delivered' },
  { value: '98%',   label: 'Success Rate'       },
]


/*
 * Positions are % of the globe image itself (6030 × 2681 px).
 * The .gf-globe-wrap div matches the image's exact rendered size,
 * so left/top % land precisely on the correct landmass at any viewport width.
 */
const GLOBE_PINS = [
  { name: 'USA',       pinX: 18.5, pinY: 32.4 },
  { name: 'UK',        pinX: 52.0, pinY: 15.6 },
  { name: 'Dubai',     pinX: 61.2, pinY: 24.8 },
  { name: 'Qatar',     pinX: 62.3, pinY: 25.2 },
  { name: 'India',     pinX: 70.0, pinY: 31.3 },
  { name: 'Australia', pinX: 86.5, pinY: 70.0 },
]

/* Route: USA → UK → Dubai → India → Australia (static base rails) */
const GLOBE_CONNECTIONS = [
  [0, 1], // USA → UK
  [1, 2], // UK → Dubai
  [2, 4], // Dubai → India
  [4, 5], // India → Australia
]

/* Single compound path for the one traveling beam */
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

function GlobalFootprintSection() {
  return (
    <section className="gf-section">
      {/* Section heading */}
      <div className="gf-heading-wrap">
        <p className="gf-label">Global Presence</p>
        <h2 className="gf-heading">
          Building a global footprint<br />
          <span className="gf-heading-em">delivering world class setup</span>
        </h2>
      </div>

      {/* Two-card row */}
      <div className="gf-cards">

        {/* ── Left card — Globe image ── */}
        <div className="gf-card gf-card--globe">
          <div className="gf-globe-inner">
            {/*
              .gf-globe-wrap mirrors the image's rendered position & aspect ratio
              (bottom-aligned, 115% wide, aspect 6030:2681).
              Pins inside use left/top % of this wrapper = % of the image.
            */}
            <div className="gf-globe-wrap">
              <img
                src="/global-presence.png"
                className="gf-globe-img"
                alt="Global presence map"
                draggable={false}
              />

              {/* Animated connection lines */}
              <svg
                className="gf-globe-lines"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Static faint base rails for every segment */}
                {GLOBE_CONNECTIONS.map(([fi, ti], i) => {
                  const f  = GLOBE_PINS[fi]
                  const t  = GLOBE_PINS[ti]
                  const cx = (f.pinX + t.pinX) / 2
                  const cy = Math.min(f.pinY, t.pinY) - Math.abs(t.pinX - f.pinX) * 0.22
                  return <path key={i} d={`M ${f.pinX} ${f.pinY} Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${t.pinX} ${t.pinY}`} className="gf-line-base" />
                })}
                {/* ONE beam traveling the full route and back */}
                <g>
                  <path d={ROUTE_PATH} className="gf-line-glow" pathLength="100" />
                  <path d={ROUTE_PATH} className="gf-line-core" pathLength="100" />
                </g>
              </svg>

              {GLOBE_PINS.map((p, i) => (
                <div
                  key={p.name}
                  className="gf-map-pin"
                  style={{
                    left: `${p.pinX}%`,
                    top:  `${p.pinY}%`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Location chips */}
          <div className="gf-locations">
            {GLOBE_CHIPS.map((name, i) => (
              <div key={name} className="gf-location-chip" style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="gf-pin-dot" />
                {name}
              </div>
            ))}
          </div>

        </div>

        {/* ── Right card — Stats / content ── */}
        <div className="gf-card gf-card--content">
          {/* Inner grid */}
          <div className="gf-card-grid" aria-hidden="true" />
          {/* Top-left glow */}
          <div className="gf-card-glow" aria-hidden="true" />

          {/* Top icon */}
          <div className="gf-card-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 3L3 10V22L16 29L29 22V10Z" stroke="var(--accent)" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M3 10L16 17L29 10" stroke="var(--accent)" strokeWidth="1.5"/>
              <line x1="16" y1="17" x2="16" y2="29" stroke="var(--accent)" strokeWidth="1.5"/>
            </svg>
          </div>

          {/* Glass content panel */}
          <div className="gf-panel">
            <p className="gf-panel-label">Our Reach</p>
            <h3 className="gf-panel-h3">
              From ambitious startups<br />
              <strong>to global enterprises</strong><br />
              we deliver results
            </h3>
            <p className="gf-panel-sub">
              UFK partners with forward-thinking businesses across the globe, delivering
              the same commitment to quality, innovation, and excellence — regardless of
              industry, location, or scale.
            </p>
          </div>

          {/* Stats grid */}
          <div className="gf-stats-grid">
            {GF_STATS.map(s => (
              <div key={s.label} className="gf-stat">
                <span className="gf-stat-val">{s.value}</span>
                <span className="gf-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

/* ── Slideshow background for a card ── */
const FSTC_SLIDES = [
  '/fstc-cover.webp',
  '/fstc-2.webp',
  '/fstc-3.webp',
  '/fstc-6.webp',
  '/fstc-5.webp',
  '/fstc-7.webp',
  '/fstc-8.webp',
]

function SlideshowBg({ images, interval = 800, fit = 'cover' }: { images: string[], interval?: number, fit?: 'cover' | 'contain' }) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % images.length), interval)
    return () => clearInterval(id)
  }, [images.length, interval])

  return (
    <>
      {images.map((src, i) => (
        <div
          key={src}
          className={`fw-card-bg fw-slide-bg${i === idx ? ' fw-slide-bg--active' : ''}`}
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: fit,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: i === idx ? 1 : 0,
            transition: 'opacity 0.6s ease',
            position: 'absolute',
            inset: 0,
          }}
        />
      ))}
    </>
  )
}

/* ── Featured Work section ── */
function FeaturedWork() {
  const navigate = useNavigate()

  const photoStyle = (src: string): React.CSSProperties => ({
    backgroundImage: `url(${src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  })

  return (
    <section className="featured-work" id="projects">
      <div className="fw-header">
        <h2 className="fw-title">Featured Work <span className="fw-diamond">◆</span></h2>
        <button className="fw-view-all" onClick={() => navigate('/projects')}>
          View All Projects
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Row 1: large left + small right */}
      <div className="fw-row fw-row--split">
        <article className="fw-card fw-card--large" onClick={() => navigate('/projects/23')} style={{ cursor: 'pointer', background: 'linear-gradient(170deg, #e2e2e2 0%, #b8b8b8 100%)' }}>
          <SlideshowBg images={FSTC_SLIDES} interval={2000} fit="cover" />
          <div className="fw-card-overlay" />
          <div className="fw-card-body">
            <h3 className="fw-card-title">FSTC</h3>
          </div>
          <div className="fw-card-meta">
            <span className="fw-client">Aviation Academy</span>
            <div className="fw-tags">
              <span className="fw-tag">Web Development</span>
              <span className="fw-tag">Development</span>
            </div>
          </div>
        </article>

        <article className="fw-card fw-card--small" onClick={() => navigate('/projects/30')} style={{ cursor: 'pointer' }}>
          <div className="fw-card-bg" style={photoStyle('/obba-1.webp')} />
          <div className="fw-card-overlay" />
          <div className="fw-card-body">
            <h3 className="fw-card-title fw-card-title--sm">OBBA</h3>
          </div>
          <div className="fw-card-meta">
            <span className="fw-client">Brand Identity</span>
            <div className="fw-tags">
              <span className="fw-tag">Branding</span>
            </div>
          </div>
        </article>
      </div>

      {/* Row 2: full-width */}
      <div className="fw-row">
        <article className="fw-card fw-card--full" onClick={() => navigate('/projects/38')} style={{ cursor: 'pointer' }}>
          <div className="fw-card-bg" style={{ ...photoStyle('/sme-cover.jpg'), backgroundPosition: '50% 30%' }} />
          <div className="fw-card-overlay" />
          <div className="fw-card-body">
            <h3 className="fw-card-title">SME BUSINESS</h3>
          </div>
          <div className="fw-card-meta">
            <span className="fw-client">Brand Identity</span>
            <div className="fw-tags">
              <span className="fw-tag">Branding</span>
              <span className="fw-tag">Corporate</span>
            </div>
          </div>
        </article>
      </div>

      {/* Row 3: three equal cards */}
      <div className="fw-row fw-row--thirds">
        <article className="fw-card" onClick={() => navigate('/projects/22')} style={{ cursor: 'pointer' }}>
          <div className="fw-card-bg" style={photoStyle('/qila-01.webp')} />
          <div className="fw-card-overlay" />
          <div className="fw-card-body">
            <h3 className="fw-card-title fw-card-title--sm">THE QILA</h3>
          </div>
          <div className="fw-card-meta">
            <span className="fw-client">Hotel & Banquet</span>
            <div className="fw-tags">
              <span className="fw-tag">Brand Identity</span>
            </div>
          </div>
        </article>

        <article className="fw-card" onClick={() => navigate('/projects/21')} style={{ cursor: 'pointer' }}>
          <div className="fw-card-bg" style={photoStyle('/avyanna-cover.webp')} />
          <div className="fw-card-overlay" />
          <div className="fw-card-body">
            <h3 className="fw-card-title fw-card-title--sm">AVYANNA AVIATION</h3>
          </div>
          <div className="fw-card-meta">
            <span className="fw-client">Aviation Academy</span>
            <div className="fw-tags">
              <span className="fw-tag">Web Development</span>
            </div>
          </div>
        </article>

        <article className="fw-card" onClick={() => navigate('/projects/24')} style={{ cursor: 'pointer' }}>
          <div className="fw-card-bg" style={photoStyle('/vfti-cover.webp')} />
          <div className="fw-card-overlay" />
          <div className="fw-card-body">
            <h3 className="fw-card-title fw-card-title--sm">VFTI</h3>
          </div>
          <div className="fw-card-meta">
            <span className="fw-client">Pilot Training</span>
            <div className="fw-tags">
              <span className="fw-tag">Web Development</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

/* TestimonialsSection imported from TestimonialsSection.tsx */

/* ─────────────────────────────────────────────────────
   RESULTS SECTION
───────────────────────────────────────────────────── */
const RESULTS_STATS = [
  { num: 2,   prefix: '',  suffix: 'M+',  label: 'Monthly Organic Visitors' },
  { num: 1,   prefix: '',  suffix: 'M+',  label: 'Monthly Search Impressions' },
  { num: 200, prefix: '',  suffix: '+',   label: 'Lead Generation for Clients' },
  { num: 172, prefix: '₹', suffix: 'CR+', label: 'Business Generated for Clients' },
]

function StatCounter({ num, prefix, suffix, label }: { num: number; prefix: string; suffix: string; label: string }) {
  const [count, setCount] = useState(0)
  const ref     = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 2000
          const startTime = performance.now()
          const tick = (now: number) => {
            const t    = Math.min((now - startTime) / duration, 1)
            const ease = 1 - Math.pow(1 - t, 3) // easeOutCubic
            setCount(Math.round(ease * num))
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [num])

  return (
    <div ref={ref} className="rs-stat">
      <span className="rs-stat-value">{prefix}{count}{suffix}</span>
      <span className="rs-stat-label">{label}</span>
    </div>
  )
}

const RESULTS_GRADIENT_CONFIG = {
  colors: [
    { color: '#010506', enabled: true },
    { color: '#b2ff59', enabled: false },
    { color: '#239E58', enabled: true },
    { color: '#01423E', enabled: true },
    { color: '#446C2A', enabled: true },
  ],
  speed: 4,
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

/* ─────────────────────────────────────────────────────────────
   NEAT GRADIENT CARD SECTION
───────────────────────────────────────────────────────────── */
const NEAT_CARD_CONFIG = {
  colors: [
    { color: '#031712', enabled: true  },
    { color: '#000000', enabled: true  },
    { color: '#304138', enabled: true  },
    { color: '#135E47', enabled: true  },
    { color: '#334333', enabled: true  },
    { color: '#FF9A9E', enabled: false },
  ],
  speed: 5,
  horizontalPressure: 3,
  verticalPressure: 4,
  waveFrequencyX: 2,
  waveFrequencyY: 3,
  waveAmplitude: 5,
  secondaryWaveEnabled: false,
  secondaryWaveFrequencyX: 3,
  secondaryWaveFrequencyY: 3,
  secondaryWaveAmplitude: 5,
  secondaryWaveSpeed: 0.6,
  secondaryWaveAngle: 1,
  shadows: 1,
  highlights: 5,
  colorBrightness: 1,
  colorSaturation: 7,
  wireframe: false,
  antialias: false,
  colorBlending: 10,
  backgroundColor: '#000000',
  backgroundAlpha: 1,
  grainScale: 0,
  grainSparsity: 0,
  grainIntensity: 0.125,
  grainSpeed: 1.9,
  resolution: 1,
  yOffset: 0,
  yOffsetWaveMultiplier: 4,
  yOffsetColorMultiplier: 4,
  yOffsetFlowMultiplier: 4,
  flowDistortionA: 1.5,
  flowDistortionB: 0.8,
  flowScale: 1.6,
  flowEase: 0.32,
  flowEnabled: true,
  enableProceduralTexture: false,
  transparentTextureVoid: false,
  textureMode: 'bitmap' as const,
  bakeEdgeSoftness: 1,
  textureVoidLikelihood: 0.29,
  textureVoidWidthMin: 120,
  textureVoidWidthMax: 420,
  textureBandDensity: 2.9,
  textureColorBlending: 0.06,
  textureSeed: 536,
  textureEase: 0.5,
  proceduralBackgroundColor: '#775454',
  textureShapeTriangles: 20,
  textureShapeCircles: 15,
  textureShapeBars: 15,
  textureShapeSquiggles: 10,
  domainWarpEnabled: false,
  domainWarpIntensity: 0,
  domainWarpScale: 3,
  vignetteIntensity: 0,
  vignetteRadius: 0.8,
  fresnelEnabled: false,
  fresnelPower: 2,
  fresnelIntensity: 0.5,
  fresnelColor: '#FFFFFF',
  iridescenceEnabled: false,
  iridescenceIntensity: 0.5,
  iridescenceSpeed: 1,
  prismEdgeEnabled: false,
  prismEdgeIntensity: 0.5,
  prismEdgeThinness: 3,
  prismEdgeSpread: 1,
  prismEdgeSpeed: 0.5,
  prismEdgeRipple: 1,
  bloomIntensity: 0,
  bloomThreshold: 0.7,
  chromaticAberration: 0,
  shapeType: 'plane' as const,
  shapeRotationX: 0, shapeRotationY: 0, shapeRotationZ: 0,
  shapeAutoRotateSpeedX: 0, shapeAutoRotateSpeedY: 0,
  sphereRadius: 15,
  torusRadius: 15,
  torusTube: 5,
  cylinderRadius: 10,
  cylinderHeight: 40,
  planeBend: 0,
  planeTwist: 0,
  silhouetteFade: 0.25,
  cylinderFade: 0.08,
  ribbonFade: 0.05,
  flatShading: true,
  cameraLock: true,
  cameraX: 0, cameraY: 0, cameraZ: 0,
  cameraRotationX: 0, cameraRotationY: 0, cameraRotationZ: 0,
  cameraZoom: 1,
}

const NGC_SERVICES = [
  { num: '01', title: 'Digital Product & Software Development',
    items: ['Software Development', 'Mobile App Development', 'Web App Development', 'UI/UX Design', 'API & System Integrations'] },
  { num: '02', title: 'AI, Automation & Cloud',
    items: ['AI Development', 'AI Chatbots', 'AI Workflow Automation / RPA', 'Cloud Solutions', 'DevOps'] },
  { num: '03', title: 'Branding, Creative & Digital Marketing',
    items: ['Branding & Design', 'Social Media Marketing', 'Content & Creative Design', 'Search Engine Optimisation', 'Digital Campaigns'] },
  { num: '04', title: 'Industry & Enterprise Solutions',
    items: ['Healthcare EHR Solutions', 'Aviation Solutions', 'Enterprise Platforms', 'Custom Business Solutions'] },
  { num: '05', title: 'Business & Proposal Development',
    items: ['Proposal Development', 'RFP / RFQ Responses', 'Capability Statements', 'Business & Technical Proposals', 'U.S. Market & Business Support'] },
]

function NeatGradientCardSection() {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [visibleIdx, setVisibleIdx] = useState(0)
  const [fading, setFading]   = useState(false)
  const [openIdx, setOpenIdx] = useState<number | null>(0)   // mobile accordion

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gradient = new NeatGradient({ ref: canvas, ...NEAT_CARD_CONFIG })
    const onScroll = () => { gradient.yOffset = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { gradient.destroy(); window.removeEventListener('scroll', onScroll) }
  }, [])

  const handleHover = (i: number) => {
    if (i === activeIdx) return
    setFading(true)
    setTimeout(() => {
      setVisibleIdx(i)
      setActiveIdx(i)
      setFading(false)
    }, 180)
  }

  const svc = NGC_SERVICES[visibleIdx]

  return (
    <section className="ngc-section">

      {/* ── DESKTOP layout ── */}
      <div className="ngc-inner ngc-desktop">

        {/* Left — services list */}
        <div className="ngc-services">
          <p className="ngc-label">Our Clients</p>
          <h2 className="ngc-heading">Solutions That Move<br />Businesses Forward</h2>
          {NGC_SERVICES.map((s, i) => (
            <div
              key={s.num}
              className={`ngc-item${i === activeIdx ? ' active' : ''}`}
              onClick={() => handleHover(i)}
            >
              <span className="ngc-item-num">{s.num}</span>
              <span className="ngc-item-title">{s.title}</span>
              <span className="ngc-item-arrow">→</span>
            </div>
          ))}
        </div>

        {/* Right — gradient card with laptop */}
        <div className="ngc-card">
          <div className="ngc-canvas-clip">
            <canvas ref={canvasRef} aria-hidden="true" className="ngc-canvas" />
          </div>
          <div className={`ngc-card-num${fading ? ' fading' : ''}`}>{svc.num}</div>
          <ul className={`ngc-card-items${fading ? ' fading' : ''}`}>
            {svc.items.map(item => <li key={item}>{item}</li>)}
          </ul>
          <div className="ngc-laptop-wrap">
            <img src="/laptop2.png" alt="" draggable={false} className="ngc-laptop-img" />
            <div className={`ngc-screen-title-wrap${fading ? ' fading' : ''}`}>
              <p className="ngc-screen-title">{svc.title}</p>
            </div>
          </div>
        </div>

      </div>

      {/* ── MOBILE layout — accordion ── */}
      <div className="ngc-mobile">
        <p className="ngc-label">Our Clients</p>
        <h2 className="ngc-mob-heading">Solutions That Move<br />Businesses Forward</h2>

        <div className="ngc-mob-list">
          {NGC_SERVICES.map((s, i) => {
            const isOpen = openIdx === i
            return (
              <div
                key={s.num}
                className={`ngc-mob-item${isOpen ? ' ngc-mob-item--open' : ''}`}
                onClick={() => setOpenIdx(isOpen ? null : i)}
              >
                <div className="ngc-mob-header">
                  <span className="ngc-mob-num">{s.num}</span>
                  <span className="ngc-mob-title">{s.title}</span>
                  <span className="ngc-mob-chevron">{isOpen ? '−' : '+'}</span>
                </div>
                {isOpen && (
                  <ul className="ngc-mob-items">
                    {s.items.map(item => (
                      <li key={item} className="ngc-mob-sub">{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      </div>

    </section>
  )
}

function ResultsSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gradient = new NeatGradient({ ref: canvas, ...RESULTS_GRADIENT_CONFIG })
    return () => { gradient.destroy() }
  }, [])

  return (
    <section className="rs-section">
      {/* NeatGradient canvas background */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div className="rs-inner">

        {/* Left — text */}
        <div className="rs-copy">
          <p className="rs-label">Proven Impact</p>
          <h2 className="rs-heading">
            Results That<br />
            <span className="rs-heading-em">Speak for Themselves</span>
          </h2>
          <p className="rs-sub">
            Across all our clients — 2M+ monthly organic visitors, 1M+ monthly
            search impressions, 200+ leads generated, and ₹172CR+ in business
            revenue created. We build digital growth that delivers real,
            measurable outcomes.
          </p>
        </div>

        {/* Right — stat grid */}
        <div className="rs-stats">
          {RESULTS_STATS.map((s) => (
            <StatCounter key={s.label} {...s} />
          ))}
        </div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────
   FAQ SECTION
───────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What services does your agency offer?',
    a: 'We offer end-to-end digital services including brand strategy, UI/UX design, web and mobile development, and ongoing product support. Whether you need a full build from scratch or help scaling an existing product, we cover the entire spectrum.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Project timelines vary by scope. A brand identity engagement typically takes 3–4 weeks, a landing page 1–2 weeks, and a full product build 8–16 weeks. We\'ll give you a detailed timeline estimate during our initial discovery call.',
  },
  {
    q: 'Do you work with startups as well as established businesses?',
    a: 'Absolutely. We work with early-stage startups that need to move fast and validate ideas, as well as established companies looking to modernise their digital presence or launch new products. Our process adapts to where you are.',
  },
  {
    q: 'What does your design and development process look like?',
    a: 'We follow a four-phase process: Discovery (research, goals, constraints), Design (wireframes, prototypes, brand), Development (agile sprints, regular demos), and Launch (QA, deployment, handoff). You\'re involved and informed at every stage.',
  },
  {
    q: 'How do we get started working with you?',
    a: 'Simply fill out the contact form above or drop us a message. We\'ll schedule a no-obligation discovery call to understand your project, share our thinking, and determine whether we\'re the right fit. From there we\'ll send a tailored proposal.',
  },
]

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)
  const toggle = (i: number) => setOpen(prev => prev === i ? null : i)

  return (
    <section className="faq-section">
      <div className="faq-inner">

        {/* Left — heading */}
        <div className="faq-left">
          <p className="faq-label">FAQ</p>
          <h2 className="faq-heading">Questions<br />we get asked</h2>
          <p className="faq-sub">
            Can't find what you're looking for?{' '}
            <a href="/contact" className="faq-link">Reach out directly</a> and we'll get back within 24 hours.
          </p>
        </div>

        {/* Right — accordion */}
        <div className="faq-list">
          {FAQS.map((item, i) => (
            <div
              key={i}
              className={`faq-item${open === i ? ' faq-item--open' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => toggle(i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <span className="faq-icon" aria-hidden="true">
                  {open === i ? '−' : '+'}
                </span>
              </button>
              <div className="faq-answer-wrap">
                <p className="faq-answer">{item.a}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────
   GRADIENT BANNER SECTION
───────────────────────────────────────────────────── */
function GradientBannerSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const outerRef  = useRef<HTMLDivElement>(null)
  const hand1Ref  = useRef<HTMLImageElement>(null)
  const hand2Ref  = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gradient = new NeatGradient({ ref: canvas, ...NEAT_CARD_CONFIG, speed: 2 })
    return () => { gradient.destroy() }
  }, [])

  /* Smooth ease-in/out parallax via RAF + lerp */
  useEffect(() => {
    let raf: number
    let cur1  = -100  // translateX% for left hand
    let cur2  =  100  // translateX% for right hand
    let curSc =  0.95 // scale (both hands share same p)
    let curSat   = 0    // saturate() 0→1
    let curBright = 0.05 // brightness() 0.05→1

    const getTargets = () => {
      const outer = outerRef.current
      if (!outer) return { t1: -100, t2: 100, p: 0 }
      const rect = outer.getBoundingClientRect()
      const VH   = window.innerHeight
      const raw  = (VH - rect.top) / (VH * 0.88)
      const p    = Math.max(0, Math.min(1, raw))
      return {
        t1: -100 + p * 75,  // left hand:  -100% → -25%
        t2:  100 - p * 67,  // right hand:  100% →  33%
        p,
      }
    }

    const tick = () => {
      const { t1, t2, p } = getTargets()
      const L = 0.07
      cur1   += (t1 - cur1)   * L
      cur2   += (t2 - cur2)   * L
      // scale: 0.95 at start → 1.05 at end
      curSc  += (0.95 + p * 0.10 - curSc)  * L
      // saturate + brightness: ramp starts at p=0.65, completes at p=1 — wider window = smoother
      const reveal = Math.max(0, Math.min(1, (p - 0.65) / 0.35))
      curSat    += (reveal - curSat)                 * 0.05
      curBright += (0.05 + reveal * 0.95 - curBright) * 0.05

      const sc  = curSc.toFixed(3)
      const sat = curSat.toFixed(3)
      const br  = curBright.toFixed(3)
      const flt = `saturate(${sat}) brightness(${br})`
      if (hand1Ref.current) {
        hand1Ref.current.style.transform = `translateX(${cur1}%) scale(${sc})`
        hand1Ref.current.style.filter    = flt
      }
      if (hand2Ref.current) {
        hand2Ref.current.style.transform = `translateX(${cur2}%) scale(${sc})`
        hand2Ref.current.style.filter    = flt
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div ref={outerRef} className="gb-outer">
      {/* Left hand — upper-left, arm exits at viewport left edge */}
      <img ref={hand1Ref} src="/hand1.png" alt="" draggable={false} className="gb-hand gb-hand--left" />
      {/* Right hand — lower-right, arm exits at viewport right edge */}
      <img ref={hand2Ref} src="/hand2.png" alt="" draggable={false} className="gb-hand gb-hand--right" />
      <section className="gb-section">
      <div className="gb-card">
        {/* NeatGradient canvas — same config as Our Services card */}
        <canvas ref={canvasRef} aria-hidden="true" className="gb-neat-canvas" />

        {/* Content */}
        <div className="gb-content">
          <p className="gb-eyebrow">Proposal Development</p>
          <h2 className="gb-heading">
            Turn Opportunities Into<br />
            <span className="gb-heading-em">Winning Proposals</span>
          </h2>
          <p className="gb-body">
            Entering new markets and competing for contracts requires more than a well-written document.
            UFK Solutions helps businesses develop strategic, compelling, and professionally structured
            proposals that clearly communicate their capabilities, value, and competitive advantage.
          </p>
          <div className="gb-chips-marquee">
            {/* Row 1 — scrolls left */}
            <div className="gb-marquee-track gb-marquee-track--left">
              {['Government & Commercial Proposals', 'RFP / RFQ Response Development', 'Proposal Strategy & Planning', 'Capability Statements',
                'Government & Commercial Proposals', 'RFP / RFQ Response Development', 'Proposal Strategy & Planning', 'Capability Statements'].map((c, i) => (
                <span key={i} className="gb-chip">{c}</span>
              ))}
            </div>
            {/* Row 2 — scrolls right */}
            <div className="gb-marquee-track gb-marquee-track--right">
              {['Business & Technical Proposals', 'U.S. Market Opportunity Support', 'Proposal Content & Presentation', 'Business & Technical Proposals', 'U.S. Market Opportunity Support', 'Proposal Content & Presentation'].map((c, i) => (
                <span key={i} className="gb-chip">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      </section>
    </div>
  )
}

export default function App() {
  // ── Refs for animation ──────────────────────────────────────────────────
  const heroCardRef  = useRef<HTMLElement>(null)
  const brandsRef    = useRef<HTMLDivElement>(null)
  const pipelineRef  = useRef<HTMLDivElement>(null)
  const nodeStackRef = useRef<HTMLDivElement>(null)
  const nodeXRef     = useRef<HTMLDivElement>(null)
  const nodeShieldRef= useRef<HTMLDivElement>(null)
  const beamGlowRef  = useRef<SVGPathElement>(null)
  const beamCoreRef  = useRef<SVGPathElement>(null)
  const gradientRef  = useRef<SVGLinearGradientElement>(null)
  const splashRef    = useRef<HTMLDivElement>(null)
  const neatCanvasRef = useRef<HTMLCanvasElement>(null)
  // ── NeatGradient background ─────────────────────────────────────────────
  useEffect(() => {
    const canvas = neatCanvasRef.current
    if (!canvas) return
    const gradient = new NeatGradient({
      ref: canvas,
      colors: [
        { color: '#010104', enabled: true },
        { color: '#00313F', enabled: true },
        { color: '#038F59', enabled: true },
        { color: '#1B231B', enabled: true },
        { color: '#067552', enabled: true },
        { color: '#FF9A9E', enabled: false },
      ],
      speed: 6,
      horizontalPressure: 3,
      verticalPressure: 4,
      waveFrequencyX: 2,
      waveFrequencyY: 3,
      waveAmplitude: 5,
      shadows: 1,
      highlights: 5,
      colorBrightness: 1,
      colorSaturation: 7,
      wireframe: false,
      antialias: false,
      colorBlending: 8,
      backgroundColor: '#142014',
      backgroundAlpha: 1,
      grainScale: 0,
      grainSparsity: 0,
      grainIntensity: 0.15,
      grainSpeed: 1,
      resolution: 1,
      yOffset: 1050,
      yOffsetWaveMultiplier: 4,
      yOffsetColorMultiplier: 4,
      yOffsetFlowMultiplier: 4,
      flowDistortionA: 0,
      flowDistortionB: 0,
      flowScale: 1,
      flowEase: 0,
      flowEnabled: true,
      enableProceduralTexture: false,
      transparentTextureVoid: false,
      textureVoidLikelihood: 0.45,
      textureVoidWidthMin: 200,
      textureVoidWidthMax: 486,
      textureBandDensity: 2.15,
      textureColorBlending: 0.01,
      textureSeed: 333,
      textureEase: 0.5,
      proceduralBackgroundColor: '#000000',
      textureShapeTriangles: 20,
      textureShapeCircles: 15,
      textureShapeBars: 15,
      textureShapeSquiggles: 10,
      domainWarpEnabled: false,
      domainWarpIntensity: 0,
      domainWarpScale: 3,
      vignetteIntensity: 0,
      vignetteRadius: 0.8,
      fresnelEnabled: false,
      fresnelPower: 2,
      fresnelIntensity: 0.5,
      fresnelColor: '#FFFFFF',
      iridescenceEnabled: false,
      iridescenceIntensity: 0.5,
      iridescenceSpeed: 1,
      bloomIntensity: 0,
      bloomThreshold: 0.7,
      chromaticAberration: 0,
      shapeType: 'plane',
      shapeRotationX: -1.54,
      shapeRotationY: -0.09,
      shapeRotationZ: 0,
      shapeAutoRotateSpeedX: 0,
      shapeAutoRotateSpeedY: 0,
      sphereRadius: 15,
      torusRadius: 15,
      torusTube: 5,
      cylinderRadius: 10,
      cylinderHeight: 40,
      planeBend: 0,
      planeTwist: 0,
      silhouetteFade: 0.25,
      cylinderFade: 0.08,
      ribbonFade: 0.05,
      flatShading: true,
      cameraLock: true,
      cameraX: 0,
      cameraY: 0,
      cameraZ: 0,
      cameraRotationX: 0,
      cameraRotationY: 0,
      cameraRotationZ: 0,
      cameraZoom: 1,
    })

    const onScroll = () => { gradient.yOffset = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      gradient.destroy()
    }
  }, [])

  // ── Hero card scroll-shrink + brands fade-in animation ──────────────────
  useEffect(() => {
    const card   = heroCardRef.current
    const canvas = card?.parentElement as HTMLElement | null
    const brands = brandsRef.current
    if (!card || !canvas) return

    const onScroll = () => {
      const sy       = window.scrollY
      void (window.innerWidth <= 768) // isMobile unused

      // Hero animation range = scroll needed for canvas to fully pass viewport
      const heroRange    = Math.max(canvas.offsetHeight - window.innerHeight, 1)
      const heroProgress = Math.min(sy / heroRange, 1)

      const scale = 1 - heroProgress * 0.12
      card.style.transform    = `scale(${scale})`
      card.style.borderRadius = `${heroProgress * 24}px`

      // Brands fade in + slide up over 200px after hero animation ends
      if (brands) {
        const brandsProgress = Math.min(Math.max((sy - heroRange) / 200, 0), 1)
        brands.style.opacity   = `${brandsProgress}`
        brands.style.transform = `translateY(${(1 - brandsProgress) * 24}px)`
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Beam animation — requestAnimationFrame state machine ────────────────
  useEffect(() => {
    const pipeline   = pipelineRef.current
    const nodeStack  = nodeStackRef.current
    const nodeX      = nodeXRef.current
    const nodeShield = nodeShieldRef.current
    const beamGlow   = beamGlowRef.current
    const beamCore   = beamCoreRef.current
    const gradient   = gradientRef.current
    const splash     = splashRef.current

    if (!pipeline || !nodeStack || !nodeX || !nodeShield ||
        !beamGlow || !beamCore || !gradient || !splash) return

    // Recompute the two-segment path from node centres relative to pipeline
    const updatePath = () => {
      const pRect  = pipeline.getBoundingClientRect()
      const sRect  = nodeStack.getBoundingClientRect()
      const xRect  = nodeX.getBoundingClientRect()
      const shRect = nodeShield.getBoundingClientRect()

      const startX = sRect.left  + sRect.width  / 2 - pRect.left
      const startY = sRect.top   + sRect.height / 2 - pRect.top
      const midX   = xRect.left  + xRect.width  / 2 - pRect.left
      const midY   = xRect.top   + xRect.height / 2 - pRect.top
      const endX   = shRect.left + shRect.width  / 2 - pRect.left
      const endY   = shRect.top  + shRect.height / 2 - pRect.top

      const d = `M ${startX},${startY} L ${midX},${midY} L ${endX},${endY}`
      beamGlow.setAttribute('d', d)
      beamCore.setAttribute('d', d)
    }

    window.addEventListener('resize', updatePath)
    updatePath()

    // ── State machine ────────────────────────────────────────────────────
    type Phase = 'p1' | 'splash' | 'p2' | 'idle'
    let phase: Phase = 'p1'
    let lastChange   = performance.now()
    let rafId: number

    const HALF_W = 5   // gradient window half-width in % units

    const tick = (now: number) => {
      const elapsed = now - lastChange

      if (phase === 'p1') {
        // percentage: 0 → 0.5  over 800 ms
        const t          = Math.min(elapsed / 800, 1)
        const percentage = t * 0.5
        const center     = percentage * 100

        gradient.setAttribute('x1', (center - HALF_W) + '%')
        gradient.setAttribute('x2', (center + HALF_W) + '%')
        gradient.setAttribute('y1', '0%')
        gradient.setAttribute('y2', '0%')

        // Left node lights up while beam is still near it
        if (percentage < 0.4) {
          nodeStack.classList.add('active')
        } else {
          nodeStack.classList.remove('active')
        }

        if (t >= 1) {
          // Beam arrives at center — trigger splash
          nodeStack.classList.remove('active')
          beamGlow.style.opacity = '0'
          beamCore.style.opacity = '0'
          splash.classList.add('animate')
          phase      = 'splash'
          lastChange = now
        }

      } else if (phase === 'splash') {
        // Wait 800 ms for splash animation, then continue
        if (elapsed >= 800) {
          splash.classList.remove('animate')
          beamGlow.style.opacity = '0.6'
          beamCore.style.opacity = '1'
          phase      = 'p2'
          lastChange = now
        }

      } else if (phase === 'p2') {
        // percentage: 0.5 → 1.0  over 800 ms
        const t          = Math.min(elapsed / 800, 1)
        const percentage = 0.5 + t * 0.5
        const center     = percentage * 100

        gradient.setAttribute('x1', (center - HALF_W) + '%')
        gradient.setAttribute('x2', (center + HALF_W) + '%')
        gradient.setAttribute('y1', '0%')
        gradient.setAttribute('y2', '0%')

        // Right node lights up as beam approaches it
        if (percentage > 0.6) {
          nodeShield.classList.add('active')
        }

        if (t >= 1) {
          nodeShield.classList.remove('active')
          phase      = 'idle'
          lastChange = now
        }

      } else {
        // idle — pause 1 s then restart
        if (elapsed >= 1000) {
          phase      = 'p1'
          lastChange = now
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', updatePath)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          NAVBAR
      ═══════════════════════════════════════════════════════ */}
      <SiteNav />

      {/* ═══════════════════════════════════════════════════════
          HERO CARD
      ═══════════════════════════════════════════════════════ */}
      <div className="hero-scroll-canvas">
      <section className="hero-card" ref={heroCardRef}>
        {/* NeatGradient animated background */}
        <canvas
          ref={neatCanvasRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none',
            transform: 'scale(1.2)',
          }}
        />

        {/* Grid overlay — only visible inside the arc via mask */}
        <div className="hero-grid" />

        {/* ── ICON PIPELINE ────────────────────────────────── */}
        <div className="icon-pipeline" ref={pipelineRef}>

          {/* Beam SVG — absolutely covers the pipeline */}
          <svg
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: 0, top: 0,
              width: '100%', height: '100%',
              overflow: 'visible',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          >
            <defs>
              {/* Glow filter for the thick beam path */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Sliding gradient — x1/x2 animated by JS */}
              <linearGradient
                id="beam-gradient"
                gradientUnits="userSpaceOnUse"
                ref={gradientRef}
                x1="-5%" x2="5%"
                y1="0%"  y2="0%"
              >
                <stop offset="0%"   stopColor="#b2ff59" stopOpacity="0"   />
                <stop offset="20%"  stopColor="#b2ff59" stopOpacity="0.8" />
                <stop offset="50%"  stopColor="#b2ff59" stopOpacity="1"   />
                <stop offset="80%"  stopColor="#b2ff59" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#b2ff59" stopOpacity="0"   />
              </linearGradient>
            </defs>

            {/* Glow layer */}
            <path
              ref={beamGlowRef}
              stroke="url(#beam-gradient)"
              strokeWidth="2"
              fill="none"
              filter="url(#glow)"
              style={{ opacity: 0.6 }}
            />
            {/* Core layer */}
            <path
              ref={beamCoreRef}
              stroke="url(#beam-gradient)"
              strokeWidth="0.8"
              fill="none"
            />
          </svg>

          {/* ── Left node: Layers icon ── */}
          <div
            className="icon-node node-light-right"
            id="node-stack"
            ref={nodeStackRef}
          >
            <svg
              viewBox="0 0 24 24" width="23" height="23"
              fill="none"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>

          {/* Left connector */}
          <div className="pipeline-line" />

          {/* ── Center: splash + Xero X node ── */}
          <div className="node-center-wrap">
            <div className="splash" ref={splashRef} />
            <div
              className="icon-node-center"
              id="node-x"
              ref={nodeXRef}
            >
              {/* Brand bird icon */}
              <img src="/white-bird.png" alt="UFK" width="28" height="28" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
            </div>
          </div>

          {/* Right connector */}
          <div className="pipeline-line right" />

          {/* ── Right node: Shield-check icon ── */}
          <div
            className="icon-node node-light-left"
            id="node-shield"
            ref={nodeShieldRef}
          >
            <svg
              viewBox="0 0 24 24" width="23" height="23"
              fill="none"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
        </div>

        {/* ── HERO TEXT ─────────────────────────────────────── */}
        <div className="hero-content">
          <h1 className="hero-heading">
            Engineering Digital Experiences
            <strong>That Move Businesses Forward</strong>
          </h1>
          <p className="hero-sub">
            Transforming Ideas Into Scalable Digital Solutions
          </p>
          <div className="hero-actions">
            <a href="/projects" className="btn-cta">View Projects</a>
            <a href="/clients" className="btn-outline">Our Clients</a>
          </div>
        </div>
      </section>
      </div>

      {/* ═══════════════════════════════════════════════════════
          BRANDS MARQUEE
      ═══════════════════════════════════════════════════════ */}
      <div className="brands" ref={brandsRef}>
        <div className="brands-heading">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" rx="1.5"/>
            <rect x="14" y="3" width="7" height="7" rx="1.5"/>
            <rect x="3" y="14" width="7" height="7" rx="1.5"/>
            <rect x="14" y="14" width="7" height="7" rx="1.5"/>
          </svg>
          Powered by Technology
        </div>
        {/* Single track — two BrandSet copies sit side-by-side for seamless loop */}
        <div className="brands-track">
          <BrandSet />
          <BrandSet />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          FEATURED WORK
      ═══════════════════════════════════════════════════════ */}
      <FeaturedWork />

      {/* ═══════════════════════════════════════════════════════
          AVIATION SOLUTIONS
      ═══════════════════════════════════════════════════════ */}
      <AviationSection />

      {/* ═══════════════════════════════════════════════════════
          GRADIENT BANNER
      ═══════════════════════════════════════════════════════ */}
      <GradientBannerSection />

      {/* ═══════════════════════════════════════════════════════
          SERVICES
      ═══════════════════════════════════════════════════════ */}
      <NeatGradientCardSection />

      {/* ═══════════════════════════════════════════════════════
          GLOBAL FOOTPRINT
      ═══════════════════════════════════════════════════════ */}
      <GlobalFootprintSection />

      {/* ═══════════════════════════════════════════════════════
          RESULTS
      ═══════════════════════════════════════════════════════ */}
      <ResultsSection />

      {/* ═══════════════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════════════ */}
      <TestimonialsSection />

      {/* ═══════════════════════════════════════════════════════
          BLOG PREVIEW
      ═══════════════════════════════════════════════════════ */}
      <BlogPreviewSection />

      {/* ═══════════════════════════════════════════════════════
          CTA — "Let's Build Something Exceptional"
      ═══════════════════════════════════════════════════════ */}
      <section className="cta-discuss">

        {/* Center glow */}
        <div className="cta-glow" aria-hidden="true" />

        {/* Content */}
        <div className="cta-inner">

          {/* Left — copy */}
          <div className="cta-copy">
            <p className="cta-label">Get In Touch</p>
            <h2 className="cta-heading">Let's Build Something<br />Exceptional</h2>
            <p className="cta-sub">
              Whether you're launching a new brand, building a digital product, or scaling your business,
              we'd love to hear about your vision. Share your project with us, and we'll get back to you shortly.
            </p>
            <p className="cta-trust">
              <span className="cta-trust-dot" aria-hidden="true" />
              We typically respond within 24 business hours.
            </p>
          </div>

          {/* Right — form */}
          <form className="cta-form" onSubmit={e => e.preventDefault()}>

            <div className="cta-form-row">
              <div className="cta-field">
                <label className="cta-field-label">Full Name</label>
                <input className="cta-input" type="text" placeholder="Alex Sterling" />
              </div>
              <div className="cta-field">
                <label className="cta-field-label">Email Address</label>
                <input className="cta-input" type="email" placeholder="alex@company.io" />
              </div>
            </div>

            <div className="cta-field">
              <label className="cta-field-label">
                Company <span className="cta-optional">Optional</span>
              </label>
              <input className="cta-input" type="text" placeholder="Your company name" />
            </div>

            <div className="cta-field">
              <label className="cta-field-label">Tell us about your project</label>
              <textarea
                className="cta-textarea"
                rows={5}
                placeholder="Tell us about your project, goals, timeline, or any questions you have..."
              />
            </div>

            <button type="submit" className="cta-submit">
              Send Enquiry →
            </button>

          </form>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════════ */}
      <FaqSection />

      {/* ═══════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════ */}
      <SiteFooter />
    </>
  )
}
