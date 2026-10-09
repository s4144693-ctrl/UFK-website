import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'

/* ── Animated counter ─────────────────────────────────────────────────────── */
function AnimatedStat({ raw }: { raw: string }) {
  // Parse: "200+" → { num: 200, suffix: '+' }, "94%" → { num: 94, suffix: '%' }, "48h" → { num: 48, suffix: 'h' }
  const match = raw.match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1]) : 0
  const suffix = match ? match[2] : ''

  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1600
          const start = performance.now()
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return <div ref={ref} className="pd-stat-num">{count}{suffix}</div>
}

/* ── Data ─────────────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    num: '01',
    title: 'Federal Proposal Development',
    desc: 'End-to-end development for GSA, DoD, USAID, EPA and other federal agencies — from strategy through final compliant submission.',
    tags: ['FAR/DFARS', 'Technical Volumes', 'Compliance'],
    wide: true,
  },
  {
    num: '02',
    title: 'RFP / RFQ / IFB Analysis',
    desc: 'Strategic solicitation analysis to decode requirements, identify win themes, and map your competitive positioning before a single word is written.',
    tags: ['Requirements Parsing', 'Win Themes'],
    wide: true,
  },
  {
    num: '03',
    title: 'Technical & Management Volumes',
    desc: 'Compelling technical and management narratives that demonstrate capability, approach, and value to evaluators.',
    tags: ['Technical Approach', 'Management Plans'],
    wide: false,
  },
  {
    num: '04',
    title: 'Compliance Matrix Development',
    desc: 'Detailed cross-reference matrices proving every requirement is addressed — no gaps, no deficiencies.',
    tags: ['Compliance Tracking', 'Gap Analysis'],
    wide: false,
  },
  {
    num: '05',
    title: 'Executive Summaries',
    desc: 'Concise, persuasive summaries that capture decision-maker attention and frame your entire proposal narrative.',
    tags: ['Win Themes', 'Messaging Strategy'],
    wide: false,
  },
  {
    num: '06',
    title: 'Past Performance & Corporate Experience',
    desc: 'Compelling performance narratives and corporate experience documentation that prove track record and capability.',
    tags: ['Performance Narratives', 'References'],
    wide: false,
  },
  {
    num: '07',
    title: 'Staffing & Key Personnel',
    desc: 'Compelling bios, resumes, and staffing plans for key personnel that demonstrate the right people for the job.',
    tags: ['Bios & Resumes', 'Org Charts'],
    wide: false,
  },
  {
    num: '08',
    title: 'Price / Cost Proposal Support',
    desc: 'Strategic development of competitive, compliant price proposals that balance cost competitiveness with margin protection.',
    tags: ['Cost Analysis', 'Pricing Strategy'],
    wide: false,
  },
  {
    num: '09',
    title: 'Proposal Editing & Production',
    desc: 'Professional editing, formatting, design and production ensuring your proposal looks exceptional and meets every submission requirement.',
    tags: ['Editing', 'Design', 'Formatting'],
    wide: false,
  },
  {
    num: '10',
    title: 'Capture & Pre-Solicitation Support',
    desc: 'Strategic capture planning and pre-solicitation activities to position your organisation for success before the RFP is ever released.',
    tags: ['Capture Planning', 'Market Research'],
    wide: false,
  },
]

const WHY = [
  'Deep Government Procurement Expertise — years navigating federal compliance requirements',
  'Proven Track Record — hundreds of successful proposals across agencies and industries',
  'Win-Focused Strategy — every proposal built around a clear win theme',
  'Full-Service Capabilities — capture planning through final production',
  'Expert Team — experienced proposal managers, writers, and technical experts',
  'Quality Commitment — multiple review cycles before every submission',
]

const APPROACH = [
  {
    num: '01',
    title: 'Expert Review',
    desc: 'Deep dive into your solicitation and organisation to develop comprehensive strategy recommendations.',
  },
  {
    num: '02',
    title: 'Collaborative Development',
    desc: 'Work closely with your team to craft compelling, compliant responses that reflect your true capabilities.',
  },
  {
    num: '03',
    title: 'Quality Assurance',
    desc: 'Rigorous review cycles ensure compliance, clarity, and compelling messaging before final submission.',
  },
  {
    num: '04',
    title: 'Continuous Improvement',
    desc: 'Post-award debriefs and feedback incorporation to steadily improve proposal success rates.',
  },
]

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function ProposalPage() {
  return (
    <div className="pd-page">
      <SiteNav />

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="pd-hero">
        {/* ambient glow */}
        <div className="pd-hero-glow" />

        <div className="pd-hero-left">
          <span className="pd-badge">Proposal Development</span>
          <h1 className="pd-h1">
            <span className="pd-h1-line">Win Your Next</span>
            <span className="pd-h1-accent">Government Contract.</span>
          </h1>
          <p className="pd-hero-desc">
            Winning proposals demand strategy, expertise, and meticulous execution.
            We combine deep compliance knowledge and proposal strategy to create
            submissions that capture attention — and win awards.
          </p>
          <div className="pd-hero-btns">
            <Link to="/contact" className="pd-btn-primary">Start a Proposal →</Link>
          </div>
        </div>

        <div className="pd-hero-right">
          {/* Document mockup */}
          <div className="pd-doc-wrap">
            <div className="pd-doc">
              <div className="pd-doc-header">
                <div className="pd-doc-logo-row">
                  <div className="pd-doc-logo-sq" />
                  <div className="pd-doc-logo-lines">
                    <div className="pd-dline pd-dline--lg" />
                    <div className="pd-dline pd-dline--sm" />
                  </div>
                </div>
                <div className="pd-doc-badge-chip">PROPOSAL RESPONSE</div>
              </div>
              <div className="pd-doc-divider" />
              <div className="pd-doc-body">
                <div className="pd-doc-section-label">Technical Volume</div>
                <div className="pd-dline pd-dline--full" />
                <div className="pd-dline pd-dline--90" />
                <div className="pd-dline pd-dline--75" />
                <div className="pd-doc-section-label" style={{ marginTop: '14px' }}>Management Approach</div>
                <div className="pd-dline pd-dline--full" />
                <div className="pd-dline pd-dline--80" />
                <div className="pd-doc-checks">
                  <div className="pd-check"><span className="pd-check-icon">✓</span> FAR Compliant</div>
                  <div className="pd-check"><span className="pd-check-icon">✓</span> All Requirements Met</div>
                  <div className="pd-check"><span className="pd-check-icon">✓</span> Executive Summary</div>
                </div>
              </div>
              <div className="pd-doc-footer">
                <div className="pd-doc-status">
                  <span className="pd-doc-dot" />
                  Ready for Submission
                </div>
                <div className="pd-doc-page">pg. 1 of 48</div>
              </div>
            </div>

            {/* Floating win-rate chip */}
            <div className="pd-float-chip pd-float-chip--top">
              <div className="pd-chip-num" style={{fontSize:'0.95rem'}}>One of the Best</div>
              <div className="pd-chip-label">Ranked Proposal</div>
            </div>
            <div className="pd-float-chip pd-float-chip--bottom">
              <div className="pd-chip-num">200+</div>
              <div className="pd-chip-label">Projects Delivered</div>
            </div>
          </div>
        </div>
      </section>


      {/* ══ SERVICES GRID ═════════════════════════════════════════════════════ */}
      <section className="pd-services-section">
        <div className="pd-services-head">
          <span className="pd-eyebrow">10 CORE SERVICES</span>
          <h2 className="pd-section-h2">End-to-End Proposal Support</h2>
          <p className="pd-section-sub">
            From the moment a solicitation drops to the day you submit — we cover every stage.
          </p>
        </div>

        {/* Row 1 — two wide flagship cards */}
        <div className="pd-grid-row pd-grid-row--2col">
          {SERVICES.filter(s => s.wide).map(s => (
            <div className="pd-scard pd-scard--wide" key={s.num}>
              <div className="pd-scard-num">{s.num}</div>
              <h3 className="pd-scard-title">{s.title}</h3>
              <p className="pd-scard-desc">{s.desc}</p>
              <div className="pd-scard-tags">
                {s.tags.map(t => <span className="pd-tag" key={t}>{t}</span>)}
              </div>
              <div className="pd-scard-arrow">→</div>
            </div>
          ))}
        </div>

        {/* Row 2 — three medium cards */}
        <div className="pd-grid-row pd-grid-row--3col">
          {SERVICES.slice(2, 5).map(s => (
            <div className="pd-scard" key={s.num}>
              <div className="pd-scard-num">{s.num}</div>
              <h3 className="pd-scard-title">{s.title}</h3>
              <p className="pd-scard-desc">{s.desc}</p>
              <div className="pd-scard-tags">
                {s.tags.map(t => <span className="pd-tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>

        {/* Row 3 — three medium cards */}
        <div className="pd-grid-row pd-grid-row--3col">
          {SERVICES.slice(5, 8).map(s => (
            <div className="pd-scard" key={s.num}>
              <div className="pd-scard-num">{s.num}</div>
              <h3 className="pd-scard-title">{s.title}</h3>
              <p className="pd-scard-desc">{s.desc}</p>
              <div className="pd-scard-tags">
                {s.tags.map(t => <span className="pd-tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>

        {/* Row 4 — two medium cards */}
        <div className="pd-grid-row pd-grid-row--2col-narrow">
          {SERVICES.slice(8, 10).map(s => (
            <div className="pd-scard pd-scard--mid" key={s.num}>
              <div className="pd-scard-num">{s.num}</div>
              <h3 className="pd-scard-title">{s.title}</h3>
              <p className="pd-scard-desc">{s.desc}</p>
              <div className="pd-scard-tags">
                {s.tags.map(t => <span className="pd-tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ APPROACH ══════════════════════════════════════════════════════════ */}
      <section className="pd-approach-section">
        <div className="pd-approach-head">
          <span className="pd-eyebrow">OUR PROCESS</span>
          <h2 className="pd-section-h2">How We Work With You</h2>
        </div>
        <div className="pd-approach-steps">
          {APPROACH.map((step, i) => (
            <div className="pd-step" key={step.num}>
              <div className="pd-step-num">{step.num}</div>
              {i < APPROACH.length - 1 && <div className="pd-step-line" />}
              <h3 className="pd-step-title">{step.title}</h3>
              <p className="pd-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ WHY US ════════════════════════════════════════════════════════════ */}
      <section className="pd-why-section">
        <div className="pd-why-left">
          <span className="pd-eyebrow">WHY CHOOSE US</span>
          <h2 className="pd-why-h2">
            Proposal expertise<br />
            <span className="pd-why-accent">that wins contracts.</span>
          </h2>
          <p className="pd-why-sub">
            We don't just write proposals — we build winning strategies grounded
            in compliance knowledge, evaluator psychology, and competitive positioning.
          </p>
          <Link to="/contact" className="pd-btn-primary" style={{ marginTop: '32px', display: 'inline-flex' }}>
            Discuss Your Proposal →
          </Link>
        </div>
        <div className="pd-why-right">
          {WHY.map((item, i) => (
            <div className="pd-why-item" key={i}>
              <span className="pd-why-check">✓</span>
              <span className="pd-why-text">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════════════════════ */}
      <section className="pd-cta-section">
        <div className="pd-cta-glow" />
        <div className="pd-cta-inner">
          <span className="pd-eyebrow" style={{ color: 'rgba(178,255,89,0.7)' }}>GET STARTED</span>
          <h2 className="pd-cta-h2">Win Your Next Proposal.</h2>
          <p className="pd-cta-sub">
            Partner with us for expert proposal development that positions your
            organisation for success. Contact us today to discuss your needs.
          </p>
          <div className="pd-hero-btns" style={{ justifyContent: 'center' }}>
            <Link to="/contact" className="pd-btn-primary">Start a Conversation →</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
