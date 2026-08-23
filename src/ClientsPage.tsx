import { useEffect, useRef } from 'react'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'
import MarketeamSection from './MarketeamSection'

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

export default function ClientsPage() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="cl-page">
      <SiteNav />

      {/* ── Marketeam hero (full-viewport, sits above clients content) ── */}
      <MarketeamSection />

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

      <SiteFooter />
    </div>
  )
}
