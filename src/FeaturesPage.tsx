import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const BENEFITS = [
  {
    label: 'Streamline Integrations',
    desc:  'Connect your existing stack in minutes. Our SDK drops into any environment — cloud, hybrid, or on-prem — without rearchitecting your pipeline.',
    accent: '#b2ff59',
    graphic: (
      <div className="fp-benefit-graphic fp-benefit-graphic--green">
        <div className="fp-circuit">
          {[0,1,2,3,4,5].map(i => <div key={i} className="fp-circuit-node" style={{ '--i': i } as React.CSSProperties} />)}
          <div className="fp-circuit-line fp-circuit-line--h" />
          <div className="fp-circuit-line fp-circuit-line--v" />
        </div>
        <div className="fp-badge-stack">
          <span className="fp-badge">REST</span>
          <span className="fp-badge">gRPC</span>
          <span className="fp-badge">GraphQL</span>
        </div>
      </div>
    ),
  },
  {
    label: 'Military-Grade Encryption',
    desc:  'AES-256 at rest, TLS 1.3 in transit, and end-to-end encrypted channels — your data is protected at every touchpoint, with zero configuration.',
    accent: '#a0c4ff',
    graphic: (
      <div className="fp-benefit-graphic fp-benefit-graphic--blue">
        <div className="fp-shield-rings">
          <div className="fp-ring fp-ring-1" />
          <div className="fp-ring fp-ring-2" />
          <div className="fp-ring fp-ring-3" />
          <svg className="fp-shield-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
      </div>
    ),
  },
  {
    label: 'Real-Time Monitoring',
    desc:  'Live anomaly detection, posture scoring, and automated alerting keep your security posture visible and responsive around the clock.',
    accent: '#ffb340',
    graphic: (
      <div className="fp-benefit-graphic fp-benefit-graphic--amber">
        <div className="fp-pulse-rings">
          <div className="fp-pulse-ring fp-pr-1" />
          <div className="fp-pulse-ring fp-pr-2" />
          <div className="fp-pulse-ring fp-pr-3" />
        </div>
        <svg className="fp-monitor-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      </div>
    ),
  },
]

const STEPS = [
  {
    num: '01',
    title: 'Discover & Strategize',
    desc: 'We conduct a deep-dive threat-surface assessment across your infrastructure, data flows, and identity layers. The output: a prioritised risk register and a clear architecture blueprint.',
    cta: 'Start assessment →',
    graphic: (
      <div className="fp-step-mockup fp-step-mockup--scan">
        <div className="fp-mock-header">
          <span className="fp-mock-dot fp-dot-red" /><span className="fp-mock-dot fp-dot-yellow" /><span className="fp-mock-dot fp-dot-green" />
          <span className="fp-mock-title">threat-scan.sh</span>
        </div>
        <div className="fp-mock-body">
          <p className="fp-mock-line"><span className="fp-cl-green">$</span> <span className="fp-cl-muted">xero scan --deep --output report.json</span></p>
          <p className="fp-mock-line fp-mock-line--indent"><span className="fp-cl-yellow">→</span> Mapping attack surface…</p>
          <p className="fp-mock-line fp-mock-line--indent"><span className="fp-cl-yellow">→</span> Analysing data flows…</p>
          <p className="fp-mock-line fp-mock-line--indent"><span className="fp-cl-green">✓</span> <span className="fp-cl-white">14 vectors identified</span></p>
          <p className="fp-mock-line fp-mock-line--indent"><span className="fp-cl-green">✓</span> <span className="fp-cl-white">Blueprint generated</span></p>
          <p className="fp-mock-line"><span className="fp-cl-green">$</span> <span className="fp-mock-cursor" /></p>
        </div>
      </div>
    ),
  },
  {
    num: '02',
    title: 'Design & Develop',
    desc: 'Our engineers architect zero-trust pipelines tailored to your stack and compliance requirements. From key management systems to ZK-proof layers — every component purpose-built.',
    cta: 'View architecture →',
    graphic: (
      <div className="fp-step-mockup fp-step-mockup--arch">
        <div className="fp-arch-nodes">
          <div className="fp-arch-node fp-an-top">Client</div>
          <div className="fp-arch-line fp-arch-line--down" />
          <div className="fp-arch-node fp-an-mid fp-an-accent">ZK Layer</div>
          <div className="fp-arch-line fp-arch-line--down" />
          <div className="fp-arch-node fp-an-bot">HSM Vault</div>
          <div className="fp-arch-badge">AES-256 ✓</div>
        </div>
      </div>
    ),
  },
  {
    num: '03',
    title: 'Launch & Optimize',
    desc: 'Zero-downtime rollout with full audit trails, automated key rotation, and continuous red-team reviews. We stay on after launch — monitoring, adapting, and hardening as threats evolve.',
    cta: 'See deployment →',
    graphic: (
      <div className="fp-step-mockup fp-step-mockup--launch">
        <div className="fp-launch-stats">
          <div className="fp-stat-row">
            <span className="fp-stat-label">Uptime</span>
            <span className="fp-stat-val fp-stat-green">99.99%</span>
          </div>
          <div className="fp-stat-bar-wrap">
            <div className="fp-stat-bar" style={{ width: '99%' }} />
          </div>
          <div className="fp-stat-row" style={{ marginTop: '20px' }}>
            <span className="fp-stat-label">Key Rotations</span>
            <span className="fp-stat-val">2,481</span>
          </div>
          <div className="fp-stat-bar-wrap">
            <div className="fp-stat-bar fp-stat-bar--blue" style={{ width: '78%' }} />
          </div>
          <div className="fp-stat-row" style={{ marginTop: '20px' }}>
            <span className="fp-stat-label">Threats Blocked</span>
            <span className="fp-stat-val fp-stat-green">100%</span>
          </div>
          <div className="fp-stat-bar-wrap">
            <div className="fp-stat-bar" style={{ width: '100%' }} />
          </div>
        </div>
      </div>
    ),
  },
]

const FEATURES = [
  { icon: '🔐', title: 'End-to-End Encryption',    desc: 'AES-256 + TLS 1.3. Every byte protected, end to end.' },
  { icon: '🗝️', title: 'Key Management',            desc: 'Full lifecycle — generate, rotate, revoke — with HSM backing.' },
  { icon: '👁️', title: 'Zero-Knowledge Proofs',     desc: 'Verify identity and integrity without revealing sensitive data.' },
  { icon: '🛡️', title: 'Zero-Trust Architecture',   desc: 'Never trust, always verify — across every service boundary.' },
  { icon: '📊', title: 'Compliance Reporting',      desc: 'SOC 2, ISO 27001, GDPR — automated posture and audit trails.' },
  { icon: '⚡', title: 'Sub-millisecond Latency',   desc: 'Cryptographic operations that never slow your critical path.' },
]

const TESTIMONIALS = [
  { quote: "Xero cut our compliance audit time in half. The audit trail is immaculate and our team loves how invisible it all is.", name: 'Sarah Chen', role: 'CTO, NexaCloud' },
  { quote: "We went from 'encryption is on the roadmap' to fully deployed in a single sprint. Truly impressive engineering.", name: 'Marcus Webb', role: 'VP Engineering, Vaultline' },
  { quote: "The ZK-proof integration gave us privacy features we thought were years away. Now they're live in production.", name: 'Priya Desai', role: 'Head of Product, Kryptos' },
  { quote: "Key rotation used to be a stressful quarterly exercise. With Xero it runs automatically — we don't even think about it.", name: 'Tom Hartley', role: 'Platform Lead, Riven Systems' },
  { quote: "Our enterprise clients specifically ask about our security stack now. Xero has become a genuine competitive advantage.", name: 'Amelia Park', role: 'CEO, Clearpath AI' },
  { quote: "Best-in-class documentation and a team that actually responds. Deployment was smooth, support is even better.", name: 'Dev Patel', role: 'Staff Engineer, Orion Labs' },
]

const NEWS = [
  {
    date: '12 May, 2026',
    tag: 'Deep Dive',
    title: 'How Zero-Knowledge Proofs Are Reshaping Identity Verification in 2026',
    excerpt: 'A technical breakdown of how modern ZK systems can verify user claims without ever touching the underlying data — and why enterprises are moving fast.',
  },
  {
    date: '03 May, 2026',
    tag: 'Product',
    title: 'Announcing Automated Key Rotation v2 — Smarter, Faster, Fully Auditable',
    excerpt: 'Our new rotation engine handles HSM-backed keys at scale with adaptive scheduling, collision detection, and zero service interruption.',
  },
]

/* ─────────────────────────────────────────────
   ANIMATION HELPERS
───────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.65, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function FeaturesPage() {
  return (
    <div className="fp-page">
      <SiteNav />

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="fp-hero">
        {/* Glow */}
        <div className="fp-hero-glow" />

        <FadeIn className="fp-hero-inner">
          <span className="fp-pill">Platform Features</span>
          <h1 className="fp-hero-h1">
            Security infrastructure<br />that feels like magic
          </h1>
          <p className="fp-hero-sub">
            Every layer hardened. Every key managed. Every identity verified —
            without adding friction to your team or your users.
          </p>
          <div className="fp-hero-btns">
            <a href="/contact" className="fp-btn-primary">Get Started Free</a>
            <button className="fp-btn-ghost">Watch Demo</button>
          </div>
        </FadeIn>

        {/* Hero interface mockup */}
        <FadeIn delay={0.2} className="fp-hero-mockup-wrap">
          <div className="fp-hero-mockup">
            <div className="fp-mock-header">
              <span className="fp-mock-dot fp-dot-red" /><span className="fp-mock-dot fp-dot-yellow" /><span className="fp-mock-dot fp-dot-green" />
              <span className="fp-mock-title">xero-dashboard</span>
            </div>
            <div className="fp-hero-dashboard">
              <div className="fp-dash-sidebar">
                {['Overview','Keys','Encryption','ZK Proofs','Audit Log'].map((l,i) => (
                  <div key={l} className={`fp-dash-nav-item${i === 0 ? ' active' : ''}`}>{l}</div>
                ))}
              </div>
              <div className="fp-dash-main">
                <div className="fp-dash-stats-row">
                  {[
                    { v: '99.99%', l: 'Uptime' },
                    { v: '2.4M',   l: 'Keys Managed' },
                    { v: '0',      l: 'Breaches' },
                    { v: '<1ms',   l: 'Latency' },
                  ].map(s => (
                    <div key={s.l} className="fp-dash-stat">
                      <span className="fp-dash-stat-val">{s.v}</span>
                      <span className="fp-dash-stat-label">{s.l}</span>
                    </div>
                  ))}
                </div>
                <div className="fp-dash-chart">
                  {[40,65,45,80,60,90,55,75,85,70,95,88].map((h, i) => (
                    <div key={i} className="fp-dash-bar" style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="fp-dash-activity">
                  {['Key rotation complete', 'Anomaly detected — blocked', 'ZK proof verified', 'Audit log exported'].map((e, i) => (
                    <div key={i} className="fp-dash-event">
                      <span className={`fp-dash-dot ${i === 1 ? 'fp-dash-dot--warn' : 'fp-dash-dot--ok'}`} />
                      {e}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════════════
          BENEFITS — 3 cards
      ══════════════════════════════════════════ */}
      <section className="fp-section fp-benefits-section">
        <FadeIn className="fp-section-header">
          <span className="fp-pill">Why Xero</span>
          <h2 className="fp-section-h2">Simplify and accelerate<br />your security posture</h2>
          <p className="fp-section-sub">Three pillars that keep your infrastructure protected without slowing you down.</p>
        </FadeIn>

        <div className="fp-benefits-grid">
          {BENEFITS.map((b, i) => (
            <FadeIn key={b.label} delay={i * 0.1} className="fp-benefit-card">
              {b.graphic}
              <div className="fp-benefit-body">
                <h3 className="fp-benefit-title" style={{ color: b.accent }}>{b.label}</h3>
                <p className="fp-benefit-desc">{b.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS — 3 alternating steps
      ══════════════════════════════════════════ */}
      <section className="fp-section fp-hiw-section">
        <FadeIn className="fp-section-header">
          <span className="fp-pill">How It Works</span>
          <h2 className="fp-section-h2">This is how it works</h2>
          <p className="fp-section-sub">A structured engagement from unknown risk to hardened, continuously monitored infrastructure.</p>
        </FadeIn>

        <div className="fp-steps-wrap">
          {STEPS.map((step, i) => {
            const isEven = i % 2 === 0
            return (
              <FadeIn key={step.num} delay={0.05} className={`fp-step-row ${isEven ? 'fp-step-row--normal' : 'fp-step-row--reverse'}`}>
                {/* Text side */}
                <div className="fp-step-text">
                  <span className="fp-step-num">{step.num}</span>
                  <h3 className="fp-step-title">{step.title}</h3>
                  <p className="fp-step-desc">{step.desc}</p>
                  <button className="fp-step-cta">{step.cta}</button>
                </div>
                {/* Graphic side */}
                <div className="fp-step-graphic-wrap">
                  {step.graphic}
                </div>
              </FadeIn>
            )
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURES GRID
      ══════════════════════════════════════════ */}
      <section className="fp-section fp-features-section">
        <FadeIn className="fp-section-header">
          <span className="fp-pill">Core Features</span>
          <h2 className="fp-section-h2">Everything you need to<br />unlock excellence</h2>
          <p className="fp-section-sub">The complete cryptographic toolkit — built for teams that can't afford to compromise.</p>
          <a href="/contact" className="fp-btn-primary" style={{ marginTop: '8px' }}>Get Started for Free</a>
        </FadeIn>

        <div className="fp-features-grid">
          {FEATURES.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.07} className="fp-feature-card">
              <span className="fp-feature-icon">{f.icon}</span>
              <h3 className="fp-feature-title">{f.title}</h3>
              <p className="fp-feature-desc">{f.desc}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className="fp-section fp-testimonials-section">
        <FadeIn className="fp-section-header">
          <span className="fp-pill">Testimonials</span>
          <h2 className="fp-section-h2">Loved by teams that<br />scale fast</h2>
        </FadeIn>

        <div className="fp-testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={(i % 3) * 0.1} className="fp-testimonial-card">
              {/* Quote mark */}
              <svg className="fp-quote-icon" width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 20V12.5C0 5.6 3.73 1.4 11.2 0L12.6 2.5C9.33 3.43 7.47 5.37 7 8.3H12V20H0ZM16 20V12.5C16 5.6 19.73 1.4 27.2 0L28 2.5C24.73 3.43 22.87 5.37 22.4 8.3H28V20H16Z" fill="rgba(74,222,128,0.25)"/>
              </svg>
              <p className="fp-testimonial-quote">"{t.quote}"</p>
              <div className="fp-testimonial-author">
                <div className="fp-author-avatar">{t.name.charAt(0)}</div>
                <div>
                  <p className="fp-author-name">{t.name}</p>
                  <p className="fp-author-role">{t.role}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          NEWS & INSIGHTS
      ══════════════════════════════════════════ */}
      <section className="fp-section fp-news-section">
        <FadeIn className="fp-news-header">
          <div>
            <span className="fp-pill">News & Insight</span>
            <h2 className="fp-section-h2" style={{ marginTop: '16px' }}>Latest from Xero</h2>
          </div>
          <a href="/blog" className="fp-view-more">View more insights →</a>
        </FadeIn>

        <div className="fp-news-grid">
          {NEWS.map((n, i) => (
            <FadeIn key={n.title} delay={i * 0.1} className="fp-news-card">
              {/* Visual placeholder */}
              <div className="fp-news-image">
                <div className="fp-news-image-glow" />
                <span className="fp-news-image-tag">{n.tag}</span>
              </div>
              <div className="fp-news-body">
                <p className="fp-news-date">{n.date}</p>
                <h3 className="fp-news-title">{n.title}</h3>
                <p className="fp-news-excerpt">{n.excerpt}</p>
                <a href="/blog" className="fp-news-read-more">Read more →</a>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
