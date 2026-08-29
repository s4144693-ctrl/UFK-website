import { useEffect, useRef, useState } from 'react'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */
const SERVICES = [
  {
    num: '01',
    title: 'Branding & Logo Development',
    items: [
      'Brand Strategy',        'Visual Identity System',
      'Logo Design',           'Brand Guidelines',
      'Typography & Colour',   'Packaging & Collateral',
    ],
  },
  {
    num: '02',
    title: 'Web & Application Development',
    items: [
      'Website Design & Dev',  'Web Applications',
      'Mobile Apps',           'E-commerce Platforms',
      'CMS Integration',       'API Development',
    ],
  },
  {
    num: '03',
    title: 'Digital Marketing & IT Solutions',
    items: [
      'SEO & Content Strategy',  'Cloud Infrastructure',
      'Paid Advertising',        'System Integrations',
      'Social Media Management', 'Enterprise Technology',
    ],
  },
]

const TICKS = 9   // number of tick marks shown next to counter

/* ─────────────────────────────────────────────────────────
   ABSTRACT CARD GRAPHICS
───────────────────────────────────────────────────────── */
function BrandGraphic() {
  return (
    <div className="sv-gfx sv-gfx--brand">
      {/* Color swatches */}
      <div className="sv-swatches">
        {['#038f59','#038f59','#00313f','#f0f5f0','#12313F','#06282B'].map((c, i) => (
          <div key={i} className="sv-swatch" style={{ background: c }} />
        ))}
      </div>
      {/* Logo mock */}
      <div className="sv-logo-mock">
        <div className="sv-logo-shape" />
        <div className="sv-logo-text-lines">
          <div className="sv-lline sv-lline--lg" />
          <div className="sv-lline sv-lline--sm" />
        </div>
      </div>
      {/* Type specimen */}
      <div className="sv-type-specimen">
        <span className="sv-type-lg">Aa</span>
        <div className="sv-type-chars">
          {['A','B','C','D','E','F','G','H'].map(c => (
            <span key={c} className="sv-type-char">{c}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function WebGraphic() {
  return (
    <div className="sv-gfx sv-gfx--web">
      <div className="sv-browser">
        {/* Browser chrome */}
        <div className="sv-browser-bar">
          <div className="sv-bdot sv-bdot--r" />
          <div className="sv-bdot sv-bdot--y" />
          <div className="sv-bdot sv-bdot--g" />
          <div className="sv-burl" />
        </div>
        {/* Code lines */}
        <div className="sv-code-area">
          <div className="sv-code-line sv-cl--accent" style={{ width: '55%' }} />
          <div className="sv-code-line" style={{ width: '80%', paddingLeft: '16px' }} />
          <div className="sv-code-line sv-cl--muted" style={{ width: '65%', paddingLeft: '16px' }} />
          <div className="sv-code-line sv-cl--accent" style={{ width: '45%', paddingLeft: '32px' }} />
          <div className="sv-code-line" style={{ width: '70%', paddingLeft: '32px' }} />
          <div className="sv-code-line sv-cl--muted" style={{ width: '50%', paddingLeft: '16px' }} />
          <div className="sv-code-line" style={{ width: '30%' }} />
        </div>
      </div>
    </div>
  )
}

function MarketingGraphic() {
  const bars = [30, 52, 38, 68, 45, 82, 58, 95, 72, 110]
  return (
    <div className="sv-gfx sv-gfx--mkt">
      {/* Stat card */}
      <div className="sv-stat-card">
        <div className="sv-stat-row">
          <span className="sv-stat-num">↑ 128%</span>
          <span className="sv-stat-badge">Organic Traffic</span>
        </div>
        {/* Bar chart */}
        <div className="sv-chart">
          {bars.map((h, i) => (
            <div key={i} className="sv-bar-wrap">
              <div
                className={`sv-bar${i === bars.length - 1 ? ' sv-bar--hi' : ''}`}
                style={{ height: `${h}px` }}
              />
            </div>
          ))}
        </div>
        <div className="sv-chart-labels">
          {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct'].map(m => (
            <span key={m} className="sv-month">{m}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

const GRAPHICS = [<BrandGraphic />, <WebGraphic />, <MarketingGraphic />]

/* ─────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────── */
const CARD_VH   = 100   // card height in vh
const SPACER_VH = 100   // scroll distance between cards (reading time)
const N         = SERVICES.length

export default function ServicesPage() {
  const [covered, setCovered] = useState<boolean[]>(Array(N).fill(false))
  const outerRef = useRef<HTMLDivElement>(null)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  /* Track which cards are being covered by a card below */
  useEffect(() => {
    const handleScroll = () => {
      const outer = outerRef.current
      if (!outer) return
      const outerTop  = outer.getBoundingClientRect().top + window.scrollY
      const VH        = window.innerHeight
      const S         = window.scrollY - outerTop   // scroll within the stack

      const next = Array(N).fill(false)
      for (let i = 0; i < N - 1; i++) {
        // card[i+1] natural top within outer = (i+1) * (CARD_VH + SPACER_VH) vh
        const nextTop = (i + 1) * (CARD_VH + SPACER_VH) * VH / 100
        // card[i+1] enters viewport when S = nextTop - VH
        if (S >= nextTop - VH) next[i] = true
      }
      setCovered(next)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* Outer height: N cards + N spacers (last spacer = reading time for final card) */
  const outerH = `${N * (CARD_VH + SPACER_VH)}vh`

  return (
    <div className="sv-page">
      <SiteNav />

      {/* ── Hero intro ── */}
      <section className="sv-hero">
        <p className="sv-hero-label">What We Do</p>
        <h1 className="sv-hero-h1">
          Services built for<br />
          <span className="sv-hero-accent">modern businesses</span>
        </h1>
        <p className="sv-hero-sub">
          End-to-end solutions across branding, development, and growth —
          tailored to where your business is going.
        </p>
        <div className="sv-scroll-hint">
          <div className="sv-scroll-dot" />
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ── Stacking cards ── */}
      <div ref={outerRef} className="sv-stack" style={{ height: outerH }}>
        {SERVICES.map((svc, i) => (
          <div
            key={svc.num}
            className={`sv-card${covered[i] ? ' sv-card--covered' : ''}`}
            style={{ zIndex: i + 1 }}
          >
            {/* Blur / darken overlay that fades in when card gets covered */}
            <div className="sv-cover" aria-hidden="true" />

            {/* ── Title row ── */}
            <div className="sv-card-top">
              <div className="sv-title-wrap">
                <span className="sv-arrow">→</span>
                <h2 className="sv-card-title">{svc.title}</h2>
              </div>
              <div className="sv-counter">
                <span className="sv-counter-num">{svc.num}</span>
                <div className="sv-counter-sep" />
                <div className="sv-ticks">
                  {Array.from({ length: TICKS }, (_, j) => (
                    <div key={j} className="sv-tick" />
                  ))}
                </div>
              </div>
            </div>

            {/* ── Body: list + graphic ── */}
            <div className="sv-card-body">
              <div className="sv-card-left">
                <ul className="sv-items">
                  {svc.items.map(item => (
                    <li key={item} className="sv-item">
                      <span className="sv-item-bullet">○</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="sv-detail-btn">
                  View service details →
                </button>
              </div>
              <div className="sv-card-right">
                {GRAPHICS[i]}
              </div>
            </div>
          </div>
        ))}
      </div>

      <SiteFooter />
    </div>
  )
}
