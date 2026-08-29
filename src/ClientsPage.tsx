import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { NeatGradient } from '@firecms/neat'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'

/* ─── Data ─── */
const STATS = [
  { value: '120+', label: 'Clients Worldwide' },
  { value: '98%',  label: 'Retention Rate' },
  { value: '340+', label: 'Projects Delivered' },
  { value: '8yrs', label: 'In Business' },
]

const CLIENTS = [
  { name: 'NexaFlow',     industry: 'SaaS / Productivity',        initials: 'NF' },
  { name: 'VaultKit',     industry: 'Cybersecurity',               initials: 'VK' },
  { name: 'Orbis Health', industry: 'Healthcare & Wellness',       initials: 'OH' },
  { name: 'Prism Labs',   industry: 'Fintech',                     initials: 'PL' },
  { name: 'Crestline',    industry: 'Real Estate & PropTech',      initials: 'CL' },
  { name: 'Edura',        industry: 'EdTech',                      initials: 'ED' },
  { name: 'Stackbase',    industry: 'Developer Tools',             initials: 'SB' },
  { name: 'Lumio',        industry: 'E-commerce / Retail',         initials: 'LM' },
  { name: 'Terrafund',    industry: 'Impact Investing',            initials: 'TF' },
  { name: 'Cognify',      industry: 'AI / Machine Learning',       initials: 'CG' },
  { name: 'Bloom & Co',   industry: 'Consumer Goods',              initials: 'BC' },
  { name: 'Axiom Sport',  industry: 'Sports & Fitness',            initials: 'AS' },
]

const TESTIMONIALS = [
  {
    quote: 'Working with this team completely transformed how we present ourselves to the market. The rebrand drove a 40% increase in inbound leads within three months.',
    author: 'Sarah K.',
    role: 'CEO, NexaFlow',
    initials: 'SK',
  },
  {
    quote: "They don't just execute — they think strategically. Our new platform launched ahead of schedule and exceeded every performance benchmark we set.",
    author: 'Marcus T.',
    role: 'CTO, Prism Labs',
    initials: 'MT',
  },
  {
    quote: 'The digital marketing strategy they built for us has been a game-changer. We went from 2k to 50k monthly visitors in under six months.',
    author: 'Priya R.',
    role: 'Head of Growth, Edura',
    initials: 'PR',
  },
]

const ACCENT_SHADES = [
  'rgba(74,222,128,0.15)',
  'rgba(34,197,94,0.12)',
  'rgba(74,222,128,0.08)',
  'rgba(34,197,94,0.18)',
]

const NEAT_CONFIG = {
  colors: [
    { color: '#010506', enabled: true },
    { color: '#7CDC59', enabled: true },
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
  yOffset: 1723,
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
  shapeRotationX: 0, shapeRotationY: 0, shapeRotationZ: 0,
  shapeAutoRotateSpeedX: 0, shapeAutoRotateSpeedY: 0,
  flatShading: true,
  cameraLock: true,
  cameraX: 0, cameraY: 0, cameraZ: 0,
  cameraRotationX: 0, cameraRotationY: 0, cameraRotationZ: 0,
  cameraZoom: 1,
}

const FEATURED_PROJECTS = [
  { id: 23, title: 'FSTC',             year: '2025', image: '/fstc-cover.webp'    },
  { id: 24, title: 'VFTI',             year: '2025', image: '/vfti-cover.webp'    },
  { id: 22, title: 'The Qila',         year: '2025', image: '/qila-01.webp'       },
  { id: 30, title: 'Obba',             year: '2025', image: '/obba-1.webp'        },
  { id: 34, title: 'Nirvana Holidays', year: '2025', image: '/nirvana-cover.webp' },
  { id: 21, title: 'Avyanna Aviation', year: '2025', image: '/avyanna-cover.webp' },
]

/* ─── Single gradient card ─── */
function GradientCard({ seed = 0 }: { seed?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    // Slightly vary yOffset per card so each looks distinct
    const gradient = new NeatGradient({
      ref: canvas,
      ...NEAT_CONFIG,
      yOffset: NEAT_CONFIG.yOffset + seed * 800,
    })
    return () => { gradient.destroy() }
  }, [seed])

  return (
    <div className="cl-grad-card">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', borderRadius: 'inherit' }}
      />
    </div>
  )
}

export default function ClientsPage() {
  const navigate = useNavigate()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="cl-page">
      <SiteNav />

      {/* ── Hero ── */}
      <section className="cl-hero">
        <p className="cl-hero-label">Our Clients</p>
        <h1 className="cl-hero-h1">
          Trusted by teams<br />
          <span className="cl-hero-accent">building what's next</span>
        </h1>
        <p className="cl-hero-sub">
          From early-stage startups to established enterprises, we partner with
          businesses that have big ambitions and the drive to achieve them.
        </p>
      </section>

      {/* ── Stats ── */}
      <div className="cl-stats">
        {STATS.map(s => (
          <div key={s.label} className="cl-stat">
            <span className="cl-stat-val">{s.value}</span>
            <span className="cl-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── 3 Gradient Cards ── */}
      <div className="cl-grad-section">
        <GradientCard seed={0} />
        <GradientCard seed={1} />
        <GradientCard seed={2} />
      </div>

      {/* ── Client logo grid ── */}
      <div className="cl-logos-wrap">
        <h2 className="cl-section-title">Companies we've worked with</h2>
        <div className="cl-logos-grid">
          {CLIENTS.map((c, i) => (
            <div
              key={c.name}
              className="cl-logo-card"
              style={{ '--accent-bg': ACCENT_SHADES[i % ACCENT_SHADES.length] } as React.CSSProperties}
            >
              <div className="cl-logo-initials">{c.initials}</div>
              <div className="cl-logo-info">
                <span className="cl-logo-name">{c.name}</span>
                <span className="cl-logo-industry">{c.industry}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Testimonials ── */}
      <div className="cl-testi-wrap">
        <h2 className="cl-section-title">What our clients say</h2>
        <div className="cl-testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="cl-testi-card">
              <div className="cl-testi-quote-mark">"</div>
              <p className="cl-testi-quote">{t.quote}</p>
              <div className="cl-testi-author">
                <div className="cl-testi-avatar">{t.initials}</div>
                <div>
                  <div className="cl-testi-name">{t.author}</div>
                  <div className="cl-testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="cl-cta">
        <p className="cl-cta-sub">Ready to join them?</p>
        <h2 className="cl-cta-h2">Let's build something<br />great together.</h2>
        <a href="/contact" className="cl-cta-btn">
          Start a project
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* ── Featured Projects (bottom) ── */}
      <div className="cl-projects-wrap">
        <div className="cl-projects-header">
          <h2 className="cl-section-title">Featured Work</h2>
          <button className="cl-projects-view-all" onClick={() => navigate('/projects')}>
            View All Projects ↗
          </button>
        </div>
        <div className="pj-grid cl-pj-grid">
          {FEATURED_PROJECTS.map(p => (
            <div
              key={p.id}
              className="pj-item"
              onClick={() => navigate(`/projects/${p.id}`)}
            >
              <div className="pj-label-row">
                <span className="pj-label-title">↗ {p.title}</span>
                <span className="pj-label-year">{p.year}</span>
              </div>
              <div
                className="pj-thumb"
                style={{ backgroundImage: `url(${p.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="pj-thumb-overlay" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
