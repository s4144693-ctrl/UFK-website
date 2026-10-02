import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'
import AviationSection from './AviationSection'

/* ─── Sectors ─── */
const SECTORS = [
  {
    num: '01',
    name: 'Flight Training Academies',
    desc: 'We help pilot training academies attract serious, qualified aspirants through targeted Meta campaigns, admissions content and structured lead tracking. Every enquiry is captured, organised and handed over for quick follow-up.',
    tags: ['Meta Campaigns', 'Admissions Content', 'Lead Tracking', 'CPL Funnels'],
  },
  {
    num: '02',
    name: 'Cabin Crew & Aviation Institutes',
    desc: 'For cabin crew, ground staff and aviation management institutes, we create content that showcases training, placements and student success. Our campaigns keep your batches full and your brand visible all year round.',
    tags: ['Training Content', 'Placement Showcases', 'Batch Filling', 'Brand Visibility'],
  },
  {
    num: '03',
    name: 'Charter & Aviation Operators',
    desc: 'We position charter operators and aviation service providers as reliable, premium choices. From brand content to targeted outreach, we help you reach corporate and private clients who value safety and service.',
    tags: ['Brand Positioning', 'Corporate Outreach', 'Premium Content', 'Private Clients'],
  },
  {
    num: '04',
    name: 'Aviation Proposals & Reports',
    desc: 'We prepare clear, professional proposals, profiles and reports for aviation businesses seeking partnerships, approvals or funding, so your ideas are presented with the credibility they deserve.',
    tags: ['Business Proposals', 'Partnership Profiles', 'Funding Reports', 'DGCA Documentation'],
  },
]

/* ─── Aviation projects ─── */
const AV_PROJECTS = [
  {
    id: 23,
    title: 'FSTC',
    client: 'Flight Simulation Technique Centre',
    tags: ['Web Development', 'Development'],
    image: '/fstc-cover.webp',
  },
  {
    id: 24,
    title: 'VFTI',
    client: 'Vision Flying Training Institute',
    tags: ['Web Development', 'Development'],
    image: '/vfti-cover.webp',
  },
  {
    id: 21,
    title: 'Avyanna Aviation',
    client: 'Aviation Academy',
    tags: ['Web Development', 'Development'],
    image: '/avyanna-cover.webp',
  },
]

/* ─── Aviation testimonials ─── */
const AV_TESTIMONIALS = [
  {
    name: 'Parth Gupta',
    role: 'Vision Flying Training Institute',
    quote: 'UFK Solutions has been a reliable end-to-end digital partner for VFTI. From our website and server management to SEO and social media, they handle everything with professionalism and consistency. Their understanding of our requirements and quick support has made our digital operations much more seamless.',
    accent: '#b2ff59',
    photo: '/VFTI.png',
  },
  {
    name: 'Shardul Seth',
    role: "Avyanna Aviation Academy · India's only A-Rated FTO",
    quote: "Over the past three years, our association with UFK Solutions has been a great experience. They have played an important role in strengthening Avyanna's digital presence, from developing a modern, high-quality website to providing reliable IT and technical support. What we particularly value is their consistent support, responsiveness, and ability to turn our requirements into effective digital solutions.",
    accent: '#4ade80',
    photo: '/avyanna.png',
  },
  {
    name: 'FSTC Team',
    role: 'Flight Simulation Technique Centre',
    quote: 'Working with UFK Solutions has been an excellent experience. They truly understand the aviation industry and the specific needs of a pilot training organisation. From our website to our digital presence, the quality and professionalism of their work has been consistently impressive.',
    accent: '#60a5fa',
    photo: '/fstc-cover.webp',
  },
]

export default function AviationIndustryPage() {
  const [active, setActive] = useState<number | null>(null)
  const navigate = useNavigate()

  return (
    <div className="ind-page">
      <SiteNav />

      {/* ── Hero ── */}
      <section className="ind-hero">
        <p className="ind-hero-label">Industries We Serve · Aviation</p>
        <h1 className="ind-hero-h1">
          Aviation solutions built on<br />
          <span className="ind-hero-accent">trust, precision and ambition</span>
        </h1>
        <p className="ind-hero-sub">
          Aviation is a field where credibility and clarity matter most. We shape our
          campaigns, content and proposals around long decision cycles, high-value
          admissions and the standards your audience expects.
        </p>
      </section>

      {/* ── Sectors grid ── */}
      <div className="ind-grid-wrap">
        <div className="ind-grid ind-grid--two">
          {SECTORS.map((s, i) => (
            <div
              key={s.num}
              className={`ind-card${active === i ? ' ind-card--active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="ind-card-top">
                <span className="ind-num">{s.num}</span>
              </div>
              <h3 className="ind-name">{s.name}</h3>
              <p className="ind-desc">{s.desc}</p>
              <div className="ind-tags">
                {s.tags.map(t => (
                  <span key={t} className="ind-tag">{t}</span>
                ))}
              </div>
              <div className="ind-card-arrow">→</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Aviation Solutions section (from home) ── */}
      <AviationSection />

      {/* ── Aviation Projects ── */}
      <section className="av-ind-projects">
        <div className="av-ind-projects-header">
          <div>
            <p className="av-ind-label">Our Work</p>
            <h2 className="av-ind-h2">Aviation Projects</h2>
          </div>
          <button className="fw-view-all" onClick={() => navigate('/projects')}>
            View All Projects
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="av-ind-proj-grid">
          {AV_PROJECTS.map(p => (
            <article
              key={p.id}
              className="av-ind-proj-card"
              onClick={() => navigate(`/projects/${p.id}`)}
            >
              <div
                className="av-ind-proj-img"
                style={{ backgroundImage: `url(${p.image})` }}
              />
              <div className="fw-card-overlay" />
              <div className="av-ind-proj-body">
                <h3 className="av-ind-proj-title">{p.title}</h3>
                <div className="av-ind-proj-meta">
                  <span className="fw-client">{p.client}</span>
                  <div className="fw-tags">
                    {p.tags.map(t => <span key={t} className="fw-tag">{t}</span>)}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Aviation Testimonials ── */}
      <div className="av-ind-testi-wrap">
      <section className="av-ind-testi">
        <div className="av-ind-testi-heading">
          <p className="av-ind-label">Client Stories</p>
          <h2 className="av-ind-h2">What our aviation clients say</h2>
        </div>
        <div className="av-ind-testi-grid">
          {AV_TESTIMONIALS.map(t => (
            <div
              key={t.name}
              className="av-ind-testi-card"
            >
              {/* Accent glow blob */}
              <div
                className="av-ind-testi-blob"
                style={{ background: `radial-gradient(ellipse 90% 75% at 45% 85%, ${t.accent} 0%, ${t.accent}88 30%, transparent 72%)` }}
              />
              {/* Quote */}
              <p className="av-ind-testi-quote">"{t.quote}"</p>
              {/* Author row */}
              <div className="av-ind-testi-author">
                {t.photo && (
                  <div
                    className="av-ind-testi-avatar"
                    style={{ backgroundImage: `url(${t.photo})` }}
                  />
                )}
                <div>
                  <p className="av-ind-testi-name">{t.name}</p>
                  <p className="av-ind-testi-role" style={{ color: t.accent }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>

      {/* ── CTA ── */}
      <div className="ind-cta">
        <p className="ind-cta-sub">Ready to grow your aviation brand?</p>
        <h2 className="ind-cta-h2">Let's build a campaign around<br />the way your students decide.</h2>
        <a href="/contact" className="ind-cta-btn">
          Get in touch
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <SiteFooter />
    </div>
  )
}
