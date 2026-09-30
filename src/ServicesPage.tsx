import { useEffect, useRef, useState } from 'react'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'
import ClassicServicesSection from './ClassicServicesSection'
import TestimonialsSection from './TestimonialsSection'

/* ─────────────────────────────────────────────────────────
   DATA — 7 main categories (stacking scroll cards)
───────────────────────────────────────────────────────── */
const SERVICES = [
  {
    num: '01',
    title: 'Digital Solutions',
    items: [
      'Software Development',     'Web App Development',
      'Mobile App Development',   'Cloud & DevOps',
      'AI Development',           'AI Workflow Automation',
    ],
  },
  {
    num: '02',
    title: 'Creative & Branding',
    items: [
      'Branding & Designing',   'UI/UX Design',
      'Brand Identity System',  'Visual Strategy',
      'Digital Experiences',    'Creative Content',
    ],
  },
  {
    num: '03',
    title: 'Marketing & Growth',
    items: [
      'Social Media Marketing',     'Search Engine Optimisation',
      'Performance Campaigns',      'AI Chatbot & AI',
      'Content Strategy',           'Growth Analytics',
    ],
  },
  {
    num: '04',
    title: 'Business & Proposal Development',
    items: [
      'Govt & Commercial Proposals',  'RFP / RFQ Responses',
      'Capability Statements',        'Business Documentation',
      'Proposal Strategy & Planning', 'U.S. Market Support',
    ],
  },
  {
    num: '05',
    title: 'Aviation Solutions',
    items: [
      'DGCA-Aligned Websites',      'Aviation Marketing & Branding',
      'Aviation SEO & Visibility',  'Aviation Content Creation',
      'CPL Student Sales Funnels',  'Aviation Business Consulting',
    ],
  },
  {
    num: '06',
    title: 'App Development',
    items: [
      'iOS & Android Apps',              'Cross-Platform Applications',
      'UI/UX Design & Prototyping',      'Business & Enterprise Apps',
      'API & Third-Party Integrations',  'App Maintenance & Optimization',
    ],
  },
  {
    num: '07',
    title: 'U.S. Market & Business Support',
    items: [
      'U.S. Market Entry Strategy',    'Business Setup & Compliance',
      'U.S. Proposal Development',     'Strategic Documentation',
      'Partner & Network Development', 'Operational Support',
    ],
  },
]

/* ─────────────────────────────────────────────────────────
   ALL SPECIFIC SERVICES — detail grid
───────────────────────────────────────────────────────── */
const ALL_SERVICES = [
  {
    title: 'Software Development',
    desc: 'Custom software built to solve real business problems — from internal tools to enterprise platforms designed for performance and long-term scale.',
  },
  {
    title: 'Mobile App Development',
    desc: 'Native and cross-platform mobile apps crafted for seamless user experience across iOS and Android, turning your ideas into powerful digital products.',
  },
  {
    title: 'Web App Development',
    desc: 'Full-stack web applications that power business operations, streamline workflows, and deliver fast, modern digital experiences.',
  },
  {
    title: 'UI/UX Design',
    desc: 'Intuitive interfaces and thoughtful user experiences designed to engage users, reduce friction, and keep your product performing at its best.',
  },
  {
    title: 'Cloud & DevOps',
    desc: 'Scalable cloud infrastructure, CI/CD pipelines, and DevOps practices that keep your systems reliable, secure, and ready for growth.',
  },
  {
    title: 'AI Development',
    desc: 'Custom AI models, intelligent systems, and machine learning solutions tailored to your industry and specific business objectives.',
  },
  {
    title: 'AI Workflow Automation',
    desc: 'Robotic Process Automation and AI-driven workflows that eliminate repetitive tasks, cut costs, and significantly improve operational efficiency.',
  },
  {
    title: 'Branding & Designing',
    desc: 'End-to-end brand identity systems — from logo and visual language to brand guidelines — that make your business instantly recognizable.',
  },
  {
    title: 'Social Media Marketing',
    desc: 'Data-driven social media strategies, content, and campaigns that build your audience and drive real engagement across every platform.',
  },
  {
    title: 'Search Engine Optimisation',
    desc: 'Technical and content SEO strategies that improve your rankings, drive organic traffic, and make your business easier to find online.',
  },
  {
    title: 'AI Chatbot & AI',
    desc: 'Intelligent conversational AI and chatbot solutions that automate customer interactions, support, and lead capture around the clock.',
  },
  {
    title: 'Healthcare EHR Solutions',
    desc: 'Secure, compliant Electronic Health Record systems designed to streamline clinical workflows and improve patient care delivery.',
  },
  {
    title: 'Aviation Services',
    desc: 'Specialized digital, marketing, and strategic solutions built on deep aviation expertise — from flight schools to aviation enterprises.',
  },
  {
    title: 'Proposal Development',
    desc: 'Strategic, compelling proposal development that positions your capabilities effectively and helps you win government and commercial contracts.',
  },
]

const TICKS = 14  // total specific services

/* ─────────────────────────────────────────────────────────
   ABSTRACT CARD GRAPHICS
───────────────────────────────────────────────────────── */
function BrandGraphic() {
  return (
    <div className="sv-gfx sv-gfx--brand">
      <div className="sv-swatches">
        {['#b2ff59','#b2ff59','#00313f','#f0f5f0','#12313F','#06282B'].map((c, i) => (
          <div key={i} className="sv-swatch" style={{ background: c }} />
        ))}
      </div>
      <div className="sv-logo-mock">
        <div className="sv-logo-shape" />
        <div className="sv-logo-text-lines">
          <div className="sv-lline sv-lline--lg" />
          <div className="sv-lline sv-lline--sm" />
        </div>
      </div>
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
        <div className="sv-browser-bar">
          <div className="sv-bdot sv-bdot--r" />
          <div className="sv-bdot sv-bdot--y" />
          <div className="sv-bdot sv-bdot--g" />
          <div className="sv-burl" />
        </div>
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
      <div className="sv-stat-card">
        <div className="sv-stat-row">
          <span className="sv-stat-num">↑ 128%</span>
          <span className="sv-stat-badge">Organic Traffic</span>
        </div>
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

function DocumentGraphic() {
  return (
    <div className="sv-gfx sv-gfx--doc">
      <div className="sv-doc-card">
        <div className="sv-doc-header">
          <div className="sv-doc-badge">Proposal</div>
          <div className="sv-doc-status">Ready</div>
        </div>
        <div className="sv-doc-lines">
          <div className="sv-doc-line sv-doc-line--accent" style={{ width: '72%' }} />
          <div className="sv-doc-line" style={{ width: '100%' }} />
          <div className="sv-doc-line" style={{ width: '88%' }} />
          <div className="sv-doc-line sv-doc-line--muted" style={{ width: '60%' }} />
          <div className="sv-doc-line" style={{ width: '95%' }} />
          <div className="sv-doc-line" style={{ width: '78%' }} />
        </div>
        <div className="sv-doc-footer">
          <div className="sv-doc-chip">RFP Response</div>
          <div className="sv-doc-chip">Capability Statement</div>
        </div>
      </div>
    </div>
  )
}

function AviationGraphic() {
  return (
    <div className="sv-gfx sv-gfx--avi">
      <div className="sv-avi-card">
        <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="sv-avi-svg">
          <path d="M10 36L90 14L74 36L90 52L10 36Z" fill="rgba(178,255,89,0.10)" stroke="rgba(178,255,89,0.55)" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M30 36L10 45" stroke="rgba(178,255,89,0.35)" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="100" cy="18" r="3" fill="rgba(178,255,89,0.20)" stroke="rgba(178,255,89,0.40)" strokeWidth="1" />
          <circle cx="108" cy="30" r="2" fill="rgba(178,255,89,0.15)" stroke="rgba(178,255,89,0.30)" strokeWidth="1" />
        </svg>
        <div className="sv-avi-badges">
          <div className="sv-avi-badge">DGCA Approved</div>
          <div className="sv-avi-badge">EASA Aligned</div>
          <div className="sv-avi-badge">CPL Funnels</div>
        </div>
      </div>
    </div>
  )
}

function AppGraphic() {
  return (
    <div className="sv-gfx sv-gfx--app">
      <div className="sv-phone">
        <div className="sv-phone-notch" />
        <div className="sv-phone-screen">
          <div className="sv-app-topbar">
            <div className="sv-app-topbar-dot" />
            <div className="sv-app-topbar-line" />
          </div>
          <div className="sv-app-hero-block" />
          <div className="sv-app-rows">
            <div className="sv-app-row">
              <div className="sv-app-row-icon sv-app-row-icon--accent" />
              <div className="sv-app-row-lines">
                <div className="sv-app-row-line" style={{ width: '70%' }} />
                <div className="sv-app-row-line sv-app-row-line--muted" style={{ width: '45%' }} />
              </div>
            </div>
            <div className="sv-app-row">
              <div className="sv-app-row-icon" />
              <div className="sv-app-row-lines">
                <div className="sv-app-row-line" style={{ width: '60%' }} />
                <div className="sv-app-row-line sv-app-row-line--muted" style={{ width: '40%' }} />
              </div>
            </div>
          </div>
          <div className="sv-app-nav">
            {[1,2,3,4].map(i => <div key={i} className={`sv-app-nav-dot${i === 1 ? ' sv-app-nav-dot--active' : ''}`} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

function GlobeGraphic() {
  return (
    <div className="sv-gfx sv-gfx--globe">
      <div className="sv-globe-wrap">
        <div className="sv-globe-ring sv-globe-ring--1" />
        <div className="sv-globe-ring sv-globe-ring--2" />
        <div className="sv-globe-ring sv-globe-ring--3" />
        <div className="sv-globe-center">
          <span className="sv-globe-label">U.S.</span>
          <span className="sv-globe-sub">Market</span>
        </div>
      </div>
      <div className="sv-globe-chips">
        <div className="sv-globe-chip">Market Entry</div>
        <div className="sv-globe-chip">Business Setup</div>
        <div className="sv-globe-chip">U.S. Proposals</div>
      </div>
    </div>
  )
}

const GRAPHICS = [
  <WebGraphic />,
  <BrandGraphic />,
  <MarketingGraphic />,
  <DocumentGraphic />,
  <AviationGraphic />,
  <AppGraphic />,
  <GlobeGraphic />,
]

/* ─────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────── */
const N = SERVICES.length
// Each card gets one viewport of scroll budget for its entrance.
// Last card has no extra: outerH = N viewports, sticky holds for (N-1) viewports.
const SCROLL_PER_CARD = 100 // vh per card

export default function ServicesPage() {
  // Which cards have slid into view (triggered by scroll threshold)
  const [visible, setVisible] = useState<boolean[]>(() => {
    const a = Array(N).fill(false); a[0] = true; return a
  })
  const outerRef = useRef<HTMLDivElement>(null)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    const handleScroll = () => {
      const outer = outerRef.current
      if (!outer) return
      const outerTop = outer.getBoundingClientRect().top + window.scrollY
      const VH       = window.innerHeight
      const S        = window.scrollY - outerTop   // scroll within section

      // Card i triggers when scroll reaches 80% of its slot
      setVisible(SERVICES.map((_, i) =>
        i === 0 || S >= i * VH * 0.80
      ))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Total outer height = N viewports; sticky inner holds for (N-1) viewports,
  // so the last card is fully in view right before sticky releases — zero dead scroll.
  const outerH = `${N * SCROLL_PER_CARD}vh`

  return (
    <div className="sv-page">
      <SiteNav />

      {/* ── Hero ── */}
      <section className="sv-hero">
        <p className="sv-hero-label">Our Services</p>
        <h1 className="sv-hero-h1">
          From digital solutions<br />
          to <span className="sv-hero-accent">strategic growth</span>
        </h1>
        <p className="sv-hero-sub">
          From digital solutions to strategic business support, we offer a diverse
          range of services designed to help businesses build, grow, and scale.
        </p>
        <div className="sv-scroll-hint">
          <div className="sv-scroll-dot" />
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ── Stacking cards ── */}
      {/* Outer div provides scroll budget; sticky inner pins for the whole section */}
      <div ref={outerRef} className="sv-stack" style={{ height: outerH }}>
        <div className="sv-stack-inner">
          {SERVICES.map((svc, i) => (
            <div
              key={svc.num}
              className="sv-card"
              style={{
                zIndex: i + 1,
                transform: visible[i] ? 'translateY(0%)' : 'translateY(102%)',
                transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
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
      </div>

      {/* ── All Services Grid ── */}
      <section className="sv-grid-section">
        <div className="sv-grid-inner">
          <p className="sv-grid-eyebrow">What We Offer</p>
          <h2 className="sv-grid-title">Every service, in one place</h2>
          <p className="sv-grid-desc">
            A complete view of everything we do — spanning technology, design, marketing, and strategic support.
          </p>
          <div className="sv-services-grid">
            {ALL_SERVICES.map((s, i) => (
              <div key={s.title} className="sv-services-grid-item">
                <div className="sv-services-grid-num">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="sv-services-grid-title">{s.title}</h3>
                <p className="sv-services-grid-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Aviation Solutions ── */}
      <section className="sv-focus-section">
        <div className="sv-focus-inner">
          <div className="sv-focus-left">
            <p className="sv-focus-eyebrow">Aviation Solutions</p>
            <h2 className="sv-focus-title">Built on Aviation.<br />Driven by Experience.</h2>
            <p className="sv-focus-desc">
              Our aviation expertise gives us a deep understanding of the industry, its challenges,
              and the standards it demands. We provide specialized digital, creative, and strategic
              solutions for aviation businesses, flight schools, training organizations, and industry partners.
            </p>
            <p className="sv-focus-tagline">
              From regulatory-aligned digital platforms to powerful aviation brands, we help aviation
              businesses build stronger digital identities and create new opportunities.
            </p>
          </div>
          <div className="sv-focus-right">
            <p className="sv-focus-offer-label">What We Offer</p>
            <ul className="sv-focus-list">
              {[
                'DGCA Guideline-Based Websites',
                'Aviation Marketing & Branding',
                'Aviation SEO & Digital Visibility',
                'Aviation Content Creation',
                'Sales Funnel Development',
                'CPL Student Sales Funnels',
                'Optimized Aviation Business Solutions',
              ].map(item => (
                <li key={item} className="sv-focus-list-item">
                  <span className="sv-focus-bullet" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Proposal Development ── */}
      <section className="sv-focus-section sv-focus-section--alt">
        <div className="sv-focus-inner">
          <div className="sv-focus-left">
            <p className="sv-focus-eyebrow">Proposal Development</p>
            <h2 className="sv-focus-title">Turn Opportunities Into<br />Winning Proposals.</h2>
            <p className="sv-focus-desc">
              Entering new markets and competing for contracts requires more than a well-written document.
              UFK Solutions helps businesses develop strategic, compelling, and professionally structured
              proposals that clearly communicate their capabilities, value, and competitive advantage.
            </p>
            <p className="sv-focus-tagline">
              From government and commercial proposals to RFP/RFQ responses, capability statements,
              business proposals, and U.S. market opportunities — we help transform your ideas and expertise
              into proposals built to make an impact.
            </p>
          </div>
          <div className="sv-focus-right">
            <p className="sv-focus-offer-label">Our Proposal Development Services</p>
            <ul className="sv-focus-list">
              {[
                'Government & Commercial Proposals',
                'RFP / RFQ Response Development',
                'Proposal Strategy & Planning',
                'Capability Statements',
                'Business & Technical Proposals',
                'U.S. Market Opportunity Support',
                'Proposal Content & Presentation',
              ].map(item => (
                <li key={item} className="sv-focus-list-item">
                  <span className="sv-focus-bullet" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── App Development ── */}
      <section className="sv-focus-section">
        <div className="sv-focus-inner">
          <div className="sv-focus-left">
            <p className="sv-focus-eyebrow">App Development</p>
            <h2 className="sv-focus-title">Apps Built Around<br />Your Business.</h2>
            <p className="sv-focus-desc">
              We design and develop intuitive, scalable mobile applications that turn ideas into powerful
              digital products. From customer-facing apps to internal business platforms, we combine
              thoughtful UX, modern technology, and reliable development to create experiences that
              deliver real value.
            </p>
          </div>
          <div className="sv-focus-right">
            <p className="sv-focus-offer-label">Our App Development Services</p>
            <ul className="sv-focus-list">
              {[
                'iOS & Android App Development',
                'Cross-Platform Applications',
                'UI/UX Design & Prototyping',
                'Business & Enterprise Apps',
                'Customer & Service Applications',
                'API & Third-Party Integrations',
                'App Maintenance & Optimization',
              ].map(item => (
                <li key={item} className="sv-focus-list-item">
                  <span className="sv-focus-bullet" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ClassicServicesSection />
      <TestimonialsSection />
      <SiteFooter />
    </div>
  )
}
