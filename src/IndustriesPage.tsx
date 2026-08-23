import { useEffect, useState } from 'react'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'

/* ─── Data ─── */
const INDUSTRIES = [
  {
    num: '01',
    name: 'Technology & SaaS',
    desc: 'From early-stage startups to enterprise software, we build brands and digital products that communicate complexity with clarity — and scale without friction.',
    tags: ['Product Design', 'SaaS Branding', 'Developer Tools', 'B2B Platforms'],
    stat: '60+',
    statLabel: 'Tech clients served',
  },
  {
    num: '02',
    name: 'Retail & E-commerce',
    desc: 'We help retail brands convert browsers into buyers — through high-performance storefronts, compelling visual identity, and growth-focused digital marketing.',
    tags: ['Shopify Development', 'Brand Identity', 'Paid Ads', 'UX Optimisation'],
    stat: '3.2×',
    statLabel: 'Avg. conversion lift',
  },
  {
    num: '03',
    name: 'Finance & Fintech',
    desc: 'Trust is the product. We craft authoritative brand identities and compliant digital experiences for fintech disruptors and traditional financial institutions alike.',
    tags: ['Brand Strategy', 'Compliance UX', 'Web Applications', 'SEO'],
    stat: '40+',
    statLabel: 'Fintech projects delivered',
  },
  {
    num: '04',
    name: 'Healthcare & Wellness',
    desc: 'We create human-centred digital experiences for healthcare providers, wellness brands, and medtech companies — balancing empathy, clarity, and regulation.',
    tags: ['UI/UX Design', 'Patient Portals', 'Brand Identity', 'Content Strategy'],
    stat: '28+',
    statLabel: 'Healthcare brands built',
  },
  {
    num: '05',
    name: 'Real Estate & PropTech',
    desc: 'We help real estate agencies and property technology platforms stand out with premium branding, immersive web experiences, and lead-generating marketing systems.',
    tags: ['Luxury Branding', 'CRM Integration', 'Landing Pages', 'Social Media'],
    stat: '85%',
    statLabel: 'Client retention rate',
  },
  {
    num: '06',
    name: 'Education & EdTech',
    desc: 'Engaging learning experiences start with great design. We partner with EdTech platforms and institutions to build digital products students actually want to use.',
    tags: ['LMS Development', 'Brand Identity', 'Mobile Apps', 'Growth Marketing'],
    stat: '1M+',
    statLabel: 'Students reached',
  },
]

export default function IndustriesPage() {
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="ind-page">
      <SiteNav />

      {/* ── Hero ── */}
      <section className="ind-hero">
        <p className="ind-hero-label">Industries We Serve</p>
        <h1 className="ind-hero-h1">
          Deep expertise across<br />
          <span className="ind-hero-accent">every sector</span>
        </h1>
        <p className="ind-hero-sub">
          We've partnered with businesses across industries — bringing the same
          commitment to quality, strategy, and execution no matter the domain.
        </p>
      </section>

      {/* ── Grid ── */}
      <div className="ind-grid-wrap">
        <div className="ind-grid">
          {INDUSTRIES.map((ind, i) => (
            <div
              key={ind.num}
              className={`ind-card${active === i ? ' ind-card--active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="ind-card-top">
                <span className="ind-num">{ind.num}</span>
                <span className="ind-stat">
                  <strong>{ind.stat}</strong>
                  <small>{ind.statLabel}</small>
                </span>
              </div>
              <h3 className="ind-name">{ind.name}</h3>
              <p className="ind-desc">{ind.desc}</p>
              <div className="ind-tags">
                {ind.tags.map(t => (
                  <span key={t} className="ind-tag">{t}</span>
                ))}
              </div>
              <div className="ind-card-arrow">→</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="ind-cta">
        <p className="ind-cta-sub">Don't see your industry?</p>
        <h2 className="ind-cta-h2">We work with ambitious businesses<br />of every kind.</h2>
        <a href="/contact" className="ind-cta-btn">
          Let's talk
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <SiteFooter />
    </div>
  )
}
