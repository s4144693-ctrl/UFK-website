import React, { useEffect, useRef, useState } from 'react'
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


const STATS = [
  { prefix: '',  value: 2,   suffix: 'M+',   label: 'Monthly Organic Visitors' },
  { prefix: '',  value: 1,   suffix: 'M+',   label: 'Monthly Search Impressions' },
  { prefix: '',  value: 200, suffix: '+',    label: 'Lead Generation for Clients' },
  { prefix: '₹', value: 172, suffix: 'CR+',  label: 'Business Generated for Clients' },
]

function useCountUp(target: number, duration: number, triggered: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!triggered) return
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [triggered, target, duration])
  return count
}

function StatCard({ prefix, value, suffix, label, triggered }: {
  prefix: string; value: number; suffix: string; label: string; triggered: boolean
}) {
  const count = useCountUp(value, 1600, triggered)
  return (
    <div className="abu-stat-card">
      <span className="abu-stat-num">{prefix}{count}{suffix}</span>
      <span className="abu-stat-label">{label}</span>
    </div>
  )
}

export default function AboutPage() {
  const introCanvasRef = useRef<HTMLCanvasElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsTriggered, setStatsTriggered] = useState(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsTriggered(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

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

          <div className="abu-intro-right" ref={statsRef}>
            {STATS.map((s, i) => (
              <StatCard key={i} {...s} triggered={statsTriggered} />
            ))}
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

          <div className="abj-col">
            <div className="abj-col-top" />
            <div className="abj-dot" aria-hidden="true"><div className="abj-dot-inner" /></div>
            <div className="abj-col-bottom">
              <span className="abj-period">2025</span>
              <h3 className="abj-col-title">Leading Partnerships</h3>
              <p className="abj-col-desc">Partnered with FSTC by Adani and Vision Flying Training Institute, one of India's fastest-growing FTOs. Also partnered with a US-based magazine publisher, extending our work into the publishing and media space.</p>
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
