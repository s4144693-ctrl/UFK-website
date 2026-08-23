import { useEffect, useRef, useState } from 'react'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'
import PremiumServicesSection from './PremiumServices'
import BlogPreviewSection from './BlogPreviewSection'

/* ── One full set of brand logos ── */
function BrandSet() {
  return (
    <div className="brands-set">
      <div className="brand-item">
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="currentColor"/>
          <path fill="var(--bg)" d="M8 9h8v2H8zm0 4h6v2H8z"/>
        </svg>
        Expedia
      </div>
      <div className="brand-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="7"  r="4"  />
          <circle cx="5"  cy="16" r="3.5"/>
          <circle cx="19" cy="16" r="3.5"/>
        </svg>
        asana
      </div>
      <div className="brand-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <line x1="4" y1="8"  x2="20" y2="8" />
          <line x1="4" y1="12" x2="12" y2="12"/>
          <line x1="4" y1="16" x2="20" y2="16"/>
        </svg>
        zenefits
      </div>
      <div className="brand-item">
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="15.5" cy="8.5" r="2.5" fill="currentColor"/>
          <circle cx="8.5"  cy="8.5" r="2"   fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="10.5" y1="8.5"  x2="13"   y2="8.5" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="8.5"  y1="10.5" x2="8.5"  y2="17"  stroke="currentColor" strokeWidth="1.5"/>
          <line x1="15.5" y1="11"   x2="15.5" y2="17"  stroke="currentColor" strokeWidth="1.5"/>
        </svg>
        <span>HubSp<span className="hubspot-dot"/>t</span>
      </div>
      <div className="brand-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9"/>
          <line x1="12"  y1="3"    x2="12"  y2="21"  />
          <line x1="3"   y1="12"   x2="21"  y2="12"  />
          <line x1="5.5" y1="5.5"  x2="18.5" y2="18.5"/>
          <line x1="18.5" y1="5.5" x2="5.5"  y2="18.5"/>
        </svg>
        loom
      </div>
      <div className="brand-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M6 8c0-1.7 1.4-2.5 3.5-2.5 2.8 0 4.5 1.4 4.5 1.4"/>
          <path d="M18 16c0 1.7-1.4 2.5-3.5 2.5C11.7 18.5 10 17 10 17"/>
          <path d="M6 8c0 2 2 3 5 3.5s5 1.5 5 3.5"/>
        </svg>
        Stripe
      </div>
      <div className="brand-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 3L22 20H2L12 3Z"/>
        </svg>
        Vercel
      </div>
      <div className="brand-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <rect x="8" y="3"  width="8" height="6" rx="2"/>
          <rect x="8" y="9"  width="8" height="6" rx="2"/>
          <rect x="8" y="15" width="4" height="6" rx="2"/>
          <circle cx="16" cy="12" r="3"/>
        </svg>
        Figma
      </div>
      <div className="brand-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"/>
        </svg>
        GitHub
      </div>
      <div className="brand-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4 4.5C4 3.67 4.67 3 5.5 3h8.75l5.75 5.5V19.5c0 .83-.67 1.5-1.5 1.5h-13C4.67 21 4 20.33 4 19.5v-15zm9 0v5h4.5L13 4.5z"/>
        </svg>
        Notion
      </div>
      <div className="brand-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="8.5"  cy="6"    r="2.5"/>
          <circle cx="15.5" cy="18"   r="2.5"/>
          <circle cx="18"   cy="8.5"  r="2.5"/>
          <circle cx="6"    cy="15.5" r="2.5"/>
          <rect x="6.5"  y="3.5"  width="4" height="9" rx="2"/>
          <rect x="13.5" y="11.5" width="4" height="9" rx="2"/>
          <rect x="11.5" y="6.5"  width="9" height="4" rx="2"/>
          <rect x="3.5"  y="13.5" width="9" height="4" rx="2"/>
        </svg>
        Slack
      </div>
      <div className="brand-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M3.5 14.5L9.5 20.5L20.5 3.5L3.5 14.5Z"/>
          <path d="M3.5 14.5L9.5 20.5L3.5 20.5L3.5 14.5Z" fill="var(--bg)"/>
        </svg>
        Linear
      </div>
      <div className="brand-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
          strokeLinejoin="round" aria-hidden="true">
          <path d="M6 2h12l1 5H5L6 2z"/>
          <path d="M5 7l1 13h12l1-13"/>
          <line x1="12" y1="7" x2="12" y2="20"/>
          <circle cx="9"  cy="21" r="1" fill="currentColor" stroke="none"/>
          <circle cx="15" cy="21" r="1" fill="currentColor" stroke="none"/>
        </svg>
        Shopify
      </div>
      <div className="brand-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M11.5 3.5C8 8 6 11 6 14a6 6 0 0012 0c0-3-2-6-5.5-10.5-.3-.4-.7-.4-1 0z"/>
          <ellipse cx="12" cy="18" rx="3" ry="1.5" fill="var(--bg)" opacity="0.6"/>
        </svg>
        Atlassian
      </div>
      <div className="brand-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="9"  cy="9"  r="1.8" fill="var(--bg)"/>
          <circle cx="15" cy="9"  r="1.8" fill="var(--bg)"/>
          <circle cx="9"  cy="15" r="1.8" fill="var(--bg)"/>
          <circle cx="15" cy="15" r="1.8" fill="var(--bg)"/>
        </svg>
        Twilio
      </div>
    </div>
  )
}


/* ── Global Footprint section ── */
const GF_STATS = [
  { value: '15+',   label: 'Clients Worldwide' },
  { value: '10+',   label: 'Industries Served'  },
  { value: '340+',  label: 'Projects Delivered' },
  { value: '98%',   label: 'Retention Rate'     },
]

const GF_CLIENTS = [
  'NexaFlow', 'VaultKit', 'Orbis Health', 'Prism Labs',
  'Crestline', 'Edura', 'Stackbase', 'Lumio',
  'Terrafund', 'Cognify', 'Bloom & Co', 'Axiom Sport',
  'CipherAI',  'Orion Finance', 'TerraDynamics',
]

/* Countries: geographic lon/lat and initial visual offset on this particular globe video */
const GLOBE_COUNTRIES = [
  // lon/lat = true geographic coords; latAdjust = visual nudge (+ = up, - = down)
  { name: 'USA',       lon: -100, lat:  38, latAdjust:  8 },   // shift up
  { name: 'UAE',       lon:   55, lat:  24, latAdjust:  9 },   // shift up
  { name: 'India',     lon:   78, lat:  22, latAdjust:  0 },
  { name: 'Australia', lon:  134, lat: -25, latAdjust: -9 },   // shift down
]

/*
 * CALIBRATION — tune these two constants to align tags with the actual video.
 *
 * INITIAL_LON_OFFSET_DEG: the longitude (°) that is facing the camera at the
 *   very first frame of the video. For example if frame-0 shows Africa/Europe,
 *   set this to ~20. If it shows the Americas, set to ~-80.
 *   Positive = shift tags eastward. Negative = shift tags westward.
 *
 * GLOBE_TILT_DEG: axial tilt of the globe in the video (0 = equator is flat,
 *   23.5 = realistic Earth tilt). Adjust if the equator appears slanted.
 */
const INITIAL_LON_OFFSET_DEG = 20   // ← tune: longitude at frame 0
const GLOBE_TILT_DEG          = 10  // ← tune: visual axial tilt

function GlobalFootprintSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const tagRefs  = useRef<(HTMLDivElement | null)[]>([])
  const rafRef   = useRef<number>(0)

  /* Slow video to 70% speed */
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const setRate = () => { v.playbackRate = 0.7 }
    setRate()
    v.addEventListener('play',     setRate)
    v.addEventListener('ratechange', setRate)
    return () => {
      v.removeEventListener('play',     setRate)
      v.removeEventListener('ratechange', setRate)
    }
  }, [])

  /* Animate tags locked to video.currentTime — guaranteed same pace as globe */
  useEffect(() => {
    const tiltRad   = (GLOBE_TILT_DEG * Math.PI) / 180
    const initRad   = (INITIAL_LON_OFFSET_DEG * Math.PI) / 180
    const cosTilt   = Math.cos(tiltRad)
    const sinTilt   = Math.sin(tiltRad)

    const tick = () => {
      const v = videoRef.current
      if (!v || !v.duration) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      /*
       * Derive rotation angle directly from the video's own playhead.
       * This is frame-perfect: the tags move exactly as fast as the globe,
       * including the 0.7× slowdown and any seek/loop behaviour.
       */
      const progress = v.currentTime / v.duration          // 0 → 1
      const rotAngle = progress * Math.PI * 2 + initRad    // radians, eastward

      GLOBE_COUNTRIES.forEach((c, i) => {
        const el = tagRefs.current[i]
        if (!el) return

        const lonRad = (c.lon * Math.PI) / 180
        /* Apply per-country vertical nudge on top of true latitude */
        const latRad = ((c.lat + c.latAdjust) * Math.PI) / 180

        /* Longitude relative to current front-facing meridian */
        const theta = lonRad - rotAngle

        /* 3-D cartesian on unit sphere */
        const x0 =  Math.sin(theta) * Math.cos(latRad)
        const y0 = -Math.sin(latRad)
        const z0 =  Math.cos(theta) * Math.cos(latRad)

        /* Apply axial tilt (rotate around screen-X axis) */
        const y3 = y0 * cosTilt - z0 * sinTilt
        const z3 = y0 * sinTilt + z0 * cosTilt
        const x3 = x0

        /*
         * Only show the tag when the country is clearly on the front hemisphere.
         * Threshold z3 > 0.18 means the tag becomes visible only after crossing
         * ~80° of the front face — hides near the horizon / back of globe.
         * The 0.22-wide ramp gives a quick but smooth fade-in.
         */
        const opacity = z3 > 0.18
          ? Math.min(1, (z3 - 0.18) / 0.22)
          : 0

        /* Perspective scale */
        const scale = 0.78 + z3 * 0.22

        /* 2-D projection inside the globe-inner div */
        const left = 50 + x3 * 36
        const top  = 50 + y3 * 32

        el.style.left           = `${left}%`
        el.style.top            = `${top}%`
        el.style.opacity        = `${opacity}`
        el.style.transform      = `translate(-50%, -50%) scale(${scale})`
        el.style.zIndex         = z3 > 0 ? '4' : '1'
        el.style.pointerEvents  = opacity > 0 ? 'auto' : 'none'
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

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

        {/* ── Left card — Globe video ── */}
        <div className="gf-card gf-card--globe">
          <div className="gf-globe-inner">
            <video
              ref={videoRef}
              className="gf-globe-video"
              src="/globe.mp4"
              autoPlay
              muted
              loop
              playsInline
            />

            {/* Animated country tags — positions driven by rAF loop above */}
            {GLOBE_COUNTRIES.map((c, i) => (
              <div
                key={c.name}
                ref={el => { tagRefs.current[i] = el }}
                className="gf-pin gf-pin--orbit"
                style={{ opacity: 0 }}   /* rAF sets real value on first frame */
              >
                <span className="gf-pin-dot" />
                {c.name}
              </div>
            ))}
          </div>

          {/* Client ticker at bottom of card */}
          <div className="gf-client-ticker">
            <div className="gf-client-track">
              {[...GF_CLIENTS, ...GF_CLIENTS].map((name, i) => (
                <span key={i} className="gf-client-chip">{name}</span>
              ))}
            </div>
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
              Xero partners with forward-thinking businesses across every continent,
              bringing the same commitment to quality no matter the scale or sector.
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

/* ── Featured Work section ── */
function FeaturedWork() {
  return (
    <section className="featured-work" id="projects">
      <div className="fw-header">
        <h2 className="fw-title">Featured Work <span className="fw-diamond">◆</span></h2>
        <button className="fw-view-all">View All Projects ↗</button>
      </div>

      {/* Row 1: large left + small right */}
      <div className="fw-row fw-row--split">
        <article className="fw-card fw-card--large">
          <div className="fw-card-bg fw-bg-nexaflow" />
          <div className="fw-card-overlay" />
          <div className="fw-card-body">
            <h3 className="fw-card-title">NEXAFLOW</h3>
          </div>
          <div className="fw-card-meta">
            <span className="fw-client">Digital Platform</span>
            <div className="fw-tags">
              <span className="fw-tag">Web Design</span>
              <span className="fw-tag">Development</span>
            </div>
          </div>
        </article>

        <article className="fw-card fw-card--small">
          <div className="fw-card-bg fw-bg-vaultkit" />
          <div className="fw-card-overlay" />
          <div className="fw-card-body">
            <h3 className="fw-card-title fw-card-title--sm">VAULTKIT</h3>
          </div>
          <div className="fw-card-meta">
            <span className="fw-client">Cybersecurity Brand</span>
            <div className="fw-tags">
              <span className="fw-tag">Brand Identity</span>
              <span className="fw-tag">Web Design</span>
            </div>
          </div>
        </article>
      </div>

      {/* Row 2: full-width */}
      <div className="fw-row">
        <article className="fw-card fw-card--full">
          <div className="fw-card-bg fw-bg-terra" />
          <div className="fw-card-overlay fw-card-overlay--terra" />
          <div className="fw-card-body fw-card-body--center">
            <h3 className="fw-card-title fw-card-title--xl">TERRA<br />DYNAMICS</h3>
          </div>
          <div className="fw-card-meta">
            <span className="fw-client">Terra Dynamics</span>
            <div className="fw-tags">
              <span className="fw-tag">Brand Identity</span>
              <span className="fw-tag">Motion & 3D</span>
            </div>
          </div>
        </article>
      </div>

      {/* Row 3: three equal cards */}
      <div className="fw-row fw-row--thirds">
        <article className="fw-card">
          <div className="fw-card-bg fw-bg-enzo" />
          <div className="fw-card-overlay" />
          <div className="fw-card-body">
            <h3 className="fw-card-title fw-card-title--sm">ENZO DIGITAL</h3>
          </div>
          <div className="fw-card-meta">
            <span className="fw-client">Creative Agency</span>
            <div className="fw-tags">
              <span className="fw-tag">Web Design & Dev</span>
            </div>
          </div>
        </article>

        <article className="fw-card">
          <div className="fw-card-bg fw-bg-cipher" />
          <div className="fw-card-overlay" />
          <div className="fw-card-body">
            <h3 className="fw-card-title fw-card-title--sm">CIPHER AI</h3>
          </div>
          <div className="fw-card-meta">
            <span className="fw-client">AI Platform</span>
            <div className="fw-tags">
              <span className="fw-tag">Brand Identity</span>
              <span className="fw-tag">Motion & 3D</span>
            </div>
          </div>
        </article>

        <article className="fw-card">
          <div className="fw-card-bg fw-bg-orion" />
          <div className="fw-card-overlay" />
          <div className="fw-card-body">
            <h3 className="fw-card-title fw-card-title--sm">ORION FINANCE</h3>
          </div>
          <div className="fw-card-meta">
            <span className="fw-client">FinTech</span>
            <div className="fw-tags">
              <span className="fw-tag">Web Design & Dev</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

/* ── Testimonials data ── */
const TESTIMONIALS = [
  {
    name: 'Yomi Denzel',
    role: 'E-Commerce 2.0',
    quote: 'Xero completely transformed how we protect customer data. Their zero-trust pipeline reduced our attack surface by 80% in the first quarter — results I never thought were possible.',
    bg: 'linear-gradient(155deg, #0e1f12 0%, #060e08 100%)',
    accent: '#4ade80',
  },
  {
    name: 'Timothée Moiroux',
    role: 'Investissement Immo',
    quote: 'Building my real estate portfolio in parallel with my studies demanded airtight financial security. Xero delivered infrastructure I could trust at every step of the journey.',
    bg: 'linear-gradient(155deg, #0d1628 0%, #08101e 100%)',
    accent: '#6080ff',
  },
  {
    name: 'David Sequeira',
    role: 'Closing',
    quote: 'From discovery to launch the team was surgical. Our key management scales across 40+ regions with zero incidents. Genuinely world-class execution every single time.',
    bg: 'linear-gradient(155deg, #160d28 0%, #0d081a 100%)',
    accent: '#a060ff',
  },
  {
    name: 'Manuel Ravier',
    role: 'Investissement Immobilier',
    quote: 'The quarterly red-team reviews alone have been invaluable. Xero found and patched vulnerabilities we didn\'t even know existed — before anyone could exploit them.',
    bg: 'linear-gradient(155deg, #1a1408 0%, #100e06 100%)',
    accent: '#d08840',
  },
  {
    name: 'Sarah Mitchell',
    role: 'CEO, NexaFlow',
    quote: 'Enterprise-grade security without the enterprise overhead. Compliance audits now take days instead of months. The ROI was evident within the very first sprint.',
    bg: 'linear-gradient(155deg, #081e1e 0%, #061414 100%)',
    accent: '#40c8b8',
  },
  {
    name: 'James Okafor',
    role: 'CTO, VaultKit',
    quote: 'Their cryptographic layers passed every compliance audit on the first try. These are professionals who understand enterprise security at the deepest architectural level.',
    bg: 'linear-gradient(155deg, #180d22 0%, #10081a 100%)',
    accent: '#c050d0',
  },
  {
    name: 'Priya Sharma',
    role: 'Founder, CipherAI',
    quote: 'Zero-downtime rollout on a live platform with millions of users. Xero delivered exactly that — flawless execution, cryptographic integrity, and absolutely zero surprises.',
    bg: 'linear-gradient(155deg, #200e0e 0%, #140808 100%)',
    accent: '#e05040',
  },
  {
    name: 'Amara Chen',
    role: 'CISO, Orion Finance',
    quote: 'Automated key rotation and continuous monitoring freed our security team to focus on strategy instead of firefighting. An absolute game-changer for our security posture.',
    bg: 'linear-gradient(155deg, #0e1c0e 0%, #081208 100%)',
    accent: '#80d040',
  },
]

const T_VISIBLE = 4
const T_GAP     = 20   /* px gap between cards */

function TestimonialsSection() {
  const [index, setIndex]   = useState(0)
  const [cardW, setCardW]   = useState(0)
  const viewportRef         = useRef<HTMLDivElement>(null)
  const maxIndex            = TESTIMONIALS.length - T_VISIBLE
  const step                = cardW + T_GAP

  /* Compute card width from viewport */
  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const update = () => {
      setCardW((el.offsetWidth - (T_VISIBLE - 1) * T_GAP) / T_VISIBLE)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  /* Auto-scroll every 3.5 s */
  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i >= maxIndex ? 0 : i + 1))
    }, 3500)
    return () => clearInterval(id)
  }, [maxIndex])

  const prev = () => setIndex(i => Math.max(0, i - 1))
  const next = () => setIndex(i => Math.min(maxIndex, i + 1))

  return (
    <section className="testi-section">

      {/* ── Top row: heading left + arrows right ── */}
      <div className="testi-top-row">
        <div className="testi-heading-group">
          <h2 className="testi-h2">Partnered with most of the</h2>
          <p className="testi-h2-em">top people at each industry</p>
        </div>
        <div className="testi-controls">
          <button
            className="testi-arrow"
            onClick={prev}
            disabled={index === 0}
            aria-label="Previous"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button
            className="testi-arrow"
            onClick={next}
            disabled={index === maxIndex}
            aria-label="Next"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── Cards viewport ── */}
      <div className="testi-viewport" ref={viewportRef}>
        <div
          className="testi-track"
          style={{
            transform:  `translateX(${-(index * step)}px)`,
            transition: cardW ? 'transform 0.55s cubic-bezier(0.4,0,0.2,1)' : 'none',
            gap:        `${T_GAP}px`,
          }}
        >
          {TESTIMONIALS.map(t => (
            <div
              key={t.name}
              className="testi-card"
              style={{ background: t.bg, width: cardW || undefined }}
            >
              {/* Subtle dot grid */}
              <div className="testi-card-grid" />

              {/* Accent bottom glow */}
              <div
                className="testi-card-glow"
                style={{ background: `radial-gradient(ellipse 100% 55% at 50% 115%, ${t.accent}2e 0%, transparent 65%)` }}
              />

              {/* DEFAULT state — initials badge + name/role */}
              <div className="testi-card-face">
                <div className="testi-badge">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="testi-face-label">
                  <p className="testi-face-name">{t.name}</p>
                  <p className="testi-face-role" style={{ color: t.accent }}>{t.role}</p>
                </div>
              </div>

              {/* HOVER state — slides up */}
              <div className="testi-hover-panel">
                <p className="testi-hp-name">{t.name}</p>
                <p className="testi-hp-role" style={{ color: t.accent }}>{t.role}</p>
                <p className="testi-hp-quote">{t.quote}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Dot indicators ── */}
      <div className="testi-dots">
        {Array.from({ length: maxIndex + 1 }, (_, i) => (
          <button
            key={i}
            className={`testi-dot${i === index ? ' testi-dot--active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Page ${i + 1}`}
          />
        ))}
      </div>

    </section>
  )
}

/* ─────────────────────────────────────────────────────
   RESULTS SECTION
───────────────────────────────────────────────────── */
const RESULTS_STATS = [
  { value: '200K+',  label: 'Monthly Organic Visitors' },
  { value: '1M+',    label: 'Monthly Search Impressions' },
  { value: '300+',   label: 'Qualified Leads / Month' },
  { value: '5×',     label: 'Average ROI on Ad Spend' },
]

function ResultsSection() {
  return (
    <section className="rs-section">
      <div className="rs-inner">

        {/* Left — text */}
        <div className="rs-copy">
          <p className="rs-label">Proven Impact</p>
          <h2 className="rs-heading">
            Results That<br />
            <span className="rs-heading-em">Speak for Themselves</span>
          </h2>
          <p className="rs-sub">
            From 200 to 200,000+ monthly organic visitors, 1M+ monthly search
            impressions, 300+ qualified leads every month, and high-impact aviation
            marketing funnels — we build digital growth that delivers measurable
            business outcomes.
          </p>
        </div>

        {/* Right — stat grid */}
        <div className="rs-stats">
          {RESULTS_STATS.map(({ value, label }) => (
            <div key={label} className="rs-stat">
              <span className="rs-stat-value">{value}</span>
              <span className="rs-stat-label">{label}</span>
            </div>
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
  // ── Hero card scroll-shrink + brands fade-in animation ──────────────────
  useEffect(() => {
    const card   = heroCardRef.current
    const canvas = card?.parentElement as HTMLElement | null
    const brands = brandsRef.current
    if (!card || !canvas) return

    const onScroll = () => {
      const sy = window.scrollY

      // Hero animation range = scroll needed for canvas to fully pass viewport
      const heroRange = Math.max(canvas.offsetHeight - window.innerHeight, 1)
      const heroProgress = Math.min(sy / heroRange, 1)

      // Scale 1.0 → 0.7 = 15% inset on every side simultaneously
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
        {/* Liquid animated blobs — create organic green motion in bg */}
        <div className="hero-blob hero-blob-1" aria-hidden="true" />
        <div className="hero-blob hero-blob-2" aria-hidden="true" />
        <div className="hero-blob hero-blob-3" aria-hidden="true" />
        <div className="hero-blob hero-blob-4" aria-hidden="true" />

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
                <stop offset="0%"   stopColor="#22c55e" stopOpacity="0"   />
                <stop offset="20%"  stopColor="#22c55e" stopOpacity="0.8" />
                <stop offset="50%"  stopColor="#86efac" stopOpacity="1"   />
                <stop offset="80%"  stopColor="#4ade80" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#4ade80" stopOpacity="0"   />
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
              {/* Xero multi-cut X logotype */}
              <svg viewBox="0 0 40 40" width="32" height="32" fill="white">
                <path d="
                  M 11 8
                  L 20 18.5
                  L 29 8
                  L 32 11
                  L 22 20
                  L 32 29
                  L 29 32
                  L 20 21.5
                  L 11 32
                  L 8  29
                  L 18 20
                  L 8  11
                  Z
                " />
              </svg>
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
            <a href="#" className="btn-cta">View Projects</a>
            <a href="#" className="btn-outline">Explore Services</a>
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
          Trusted By
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
          SERVICES
      ═══════════════════════════════════════════════════════ */}
      <PremiumServicesSection />

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
