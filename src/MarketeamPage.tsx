import { useEffect, useRef, useState } from 'react'
import SiteNav from './SiteNav'

/* ─── Typewriter hook ─── */
function useTypewriter(words: string[], speed = 60, pause = 1800) {
  const [displayed, setDisplayed] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIdx]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && charIdx < word.length) {
      timeout = setTimeout(() => setCharIdx(i => i + 1), speed)
    } else if (!deleting && charIdx === word.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(i => i - 1), speed / 2)
    } else {
      setDeleting(false)
      setWordIdx(i => (i + 1) % words.length)
    }

    setDisplayed(word.slice(0, charIdx))
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return displayed
}

/* ─── Count-up hook ─── */
function useCountUp(target: number, duration = 2200, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const elapsed = ts - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

/* ─── Avatar data ─── */
const AVATARS = [
  { src: 'https://i.pravatar.cc/72?img=1',  orbit: 0, angle: 0,    delay: 0.1 },
  { src: 'https://i.pravatar.cc/72?img=2',  orbit: 0, angle: 180,  delay: 0.2 },
  { src: 'https://i.pravatar.cc/72?img=3',  orbit: 1, angle: 60,   delay: 0.3 },
  { src: 'https://i.pravatar.cc/72?img=4',  orbit: 1, angle: 240,  delay: 0.4 },
  { src: 'https://i.pravatar.cc/72?img=5',  orbit: 2, angle: 30,   delay: 0.5 },
  { src: 'https://i.pravatar.cc/72?img=6',  orbit: 2, angle: 150,  delay: 0.6 },
  { src: 'https://i.pravatar.cc/72?img=7',  orbit: 2, angle: 270,  delay: 0.7 },
  { src: 'https://i.pravatar.cc/72?img=8',  orbit: 3, angle: 45,   delay: 0.8 },
  { src: 'https://i.pravatar.cc/72?img=9',  orbit: 3, angle: 165,  delay: 0.9 },
  { src: 'https://i.pravatar.cc/72?img=10', orbit: 3, angle: 285,  delay: 1.0 },
]

/* orbit radii in px (for 720px container → center = 360) */
const ORBIT_RADII = [176, 250, 324, 398]

/* ─── Logo ticker data ─── */
const LOGOS = [
  { name: 'Notion',    color: '#f0f5f0' },
  { name: 'Figma',     color: '#f0f5f0' },
  { name: 'Slack',     color: '#f0f5f0' },
  { name: 'Linear',    color: '#f0f5f0' },
  { name: 'Vercel',    color: '#f0f5f0' },
  { name: 'Stripe',    color: '#f0f5f0' },
  { name: 'HubSpot',   color: '#f0f5f0' },
  { name: 'Webflow',   color: '#f0f5f0' },
]

const TYPEWRITER_WORDS = [
  'Marketing Talent',
  'Brand Strategists',
  'Growth Experts',
  'Creative Teams',
]

export default function MarketeamPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [countStarted, setCountStarted] = useState(false)
  const count = useCountUp(20000, 2200, countStarted)
  const typed = useTypewriter(TYPEWRITER_WORDS)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  /* start count-up when hero enters view */
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setCountStarted(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const formatCount = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k+` : `${n}`

  return (
    <div className="mt-page">
      <SiteNav />

      {/* ── Hero ── */}
      <section className="mt-hero" ref={heroRef}>
        {/* bg glow blobs */}
        <div className="mt-blob mt-blob--tl" />
        <div className="mt-blob mt-blob--br" />

        {/* Left column */}
        <div className="mt-hero-left">
          <div className="mt-badge">Talent Platform</div>

          <h1 className="mt-hero-h1">
            Unlock Top{' '}
            <span className="mt-typewriter">
              {typed}
              <span className="mt-cursor" aria-hidden="true">|</span>
            </span>
            <br />
            for Your Brand
          </h1>

          <p className="mt-hero-sub">
            Connect with vetted marketing professionals — from brand strategists
            to performance marketers — ready to scale your business from day one.
          </p>

          <div className="mt-hero-actions">
            {/* Animated border button */}
            <a href="/contact" className="mt-btn-primary">
              <span>Start a Project</span>
            </a>
            <a href="#how" className="mt-btn-ghost">
              See how it works
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="mt-hero-stats">
            <div className="mt-hero-stat">
              <span className="mt-hero-stat-val">98%</span>
              <span className="mt-hero-stat-label">Match rate</span>
            </div>
            <div className="mt-hero-stat-divider" />
            <div className="mt-hero-stat">
              <span className="mt-hero-stat-val">48h</span>
              <span className="mt-hero-stat-label">Avg. placement</span>
            </div>
            <div className="mt-hero-stat-divider" />
            <div className="mt-hero-stat">
              <span className="mt-hero-stat-val">120+</span>
              <span className="mt-hero-stat-label">Industries</span>
            </div>
          </div>
        </div>

        {/* Right column — orbit */}
        <div className="mt-hero-right">
          <div className="mt-orbit-wrap">
            {/* Concentric rings */}
            {ORBIT_RADII.map((r, i) => (
              <div
                key={r}
                className={`mt-ring mt-ring--${i}`}
                style={{ width: r * 2, height: r * 2 }}
              />
            ))}

            {/* Center count */}
            <div className="mt-orbit-center">
              <span className="mt-orbit-count">{formatCount(count)}</span>
              <span className="mt-orbit-label">Marketers</span>
            </div>

            {/* Avatars placed on orbits */}
            {AVATARS.map((av, idx) => {
              const r = ORBIT_RADII[av.orbit]
              const rad = (av.angle * Math.PI) / 180
              const cx = Math.cos(rad) * r
              const cy = Math.sin(rad) * r
              return (
                <div
                  key={idx}
                  className="mt-avatar"
                  style={{
                    '--av-x': `${cx}px`,
                    '--av-y': `${cy}px`,
                    animationDelay: `${av.delay}s`,
                  } as React.CSSProperties}
                >
                  <img src={av.src} alt="" />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="mt-how" id="how">
        <p className="mt-section-label">How It Works</p>
        <h2 className="mt-section-h2">Talent, matched in 3 steps</h2>
        <div className="mt-steps">
          {[
            { n: '01', title: 'Share Your Brief', desc: 'Tell us about your project, timeline, and the skills you need. Takes less than 5 minutes.' },
            { n: '02', title: 'We Match You',     desc: 'Our team hand-picks marketers from our vetted network that fit your exact requirements.' },
            { n: '03', title: 'Start Working',    desc: 'Kick off within 48 hours. Scale up or down as your needs evolve — no lock-in.' },
          ].map(s => (
            <div key={s.n} className="mt-step">
              <span className="mt-step-num">{s.n}</span>
              <h3 className="mt-step-title">{s.title}</h3>
              <p className="mt-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section className="mt-services">
        <p className="mt-section-label">What We Offer</p>
        <h2 className="mt-section-h2">Every marketing discipline, covered</h2>
        <div className="mt-services-grid">
          {[
            { icon: '◈', title: 'Brand Strategy',       desc: 'Positioning, messaging frameworks, competitive differentiation.' },
            { icon: '◉', title: 'Performance Marketing', desc: 'Paid search, social ads, CRO — growth you can measure.' },
            { icon: '◎', title: 'Content & SEO',         desc: 'Long-form content, technical SEO, organic acquisition engines.' },
            { icon: '⬡', title: 'Social Media',          desc: 'Community management, creator strategy, viral campaigns.' },
            { icon: '◆', title: 'Email & CRM',           desc: 'Lifecycle automation, segmentation, retention programs.' },
            { icon: '◇', title: 'Analytics & Data',      desc: 'Attribution modelling, dashboards, insight reports.' },
          ].map(sv => (
            <div key={sv.title} className="mt-service-card">
              <div className="mt-service-icon">{sv.icon}</div>
              <h3 className="mt-service-title">{sv.title}</h3>
              <p className="mt-service-desc">{sv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Logo ticker ── */}
      <div className="mt-ticker-wrap">
        <p className="mt-ticker-label">Trusted by teams at</p>
        <div className="mt-ticker">
          <div className="mt-ticker-track">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div key={i} className="mt-ticker-item">
                <span className="mt-ticker-name">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <section className="mt-cta">
        <div className="mt-cta-blob" />
        <p className="mt-cta-sub">Ready to grow?</p>
        <h2 className="mt-cta-h2">
          Your next marketing hire<br />
          <span className="mt-cta-accent">is already waiting.</span>
        </h2>
        <a href="/contact" className="mt-btn-primary mt-btn-primary--large">
          <span>Get Started Free</span>
        </a>
        <p className="mt-cta-note">No commitment. First match within 48 hours.</p>
      </section>
    </div>
  )
}
