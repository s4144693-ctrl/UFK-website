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

      {/* ── Campaign Journey — editorial light section ── */}
      <section className="mk-journey">
        {/* Section intro */}
        <div className="mk-journey-intro">
          <p className="mk-journey-eyebrow">Our Process</p>
          <h2 className="mk-journey-h2">Six stages from audit<br />to results.</h2>
        </div>

        {/* ── 1 / 6 — Campaign Audit ── */}
        <div className="mk-row mk-row--normal">
          <div className="mk-row-text">
            <div className="mk-step-counter"><span className="mk-step-n">1</span><span className="mk-step-total">/6</span></div>
            <h3 className="mk-row-title">Campaign Audit</h3>
            <p className="mk-row-desc">Analyse existing channel performance, identify budget waste, and benchmark against competitors.</p>
            <div className="mk-row-tags">
              <span className="mk-tag">Channel Analysis</span>
              <span className="mk-tag">Benchmarking</span>
              <span className="mk-tag">Budget Review</span>
            </div>
          </div>
          <div className="mk-row-visual">
            <div className="mk-audit-visual">
              {/* Pinned note card */}
              <div className="mk-pin-card mk-pin-card--main">
                <div className="mk-pin" />
                <div className="mk-pin-label">Performance Review</div>
                <div className="mk-bar-row">
                  <span className="mk-bar-name">Search</span>
                  <div className="mk-bar-track"><div className="mk-bar-fill" style={{width:'78%', background:'rgba(100,160,80,0.7)'}}/></div>
                  <span className="mk-bar-val">78%</span>
                </div>
                <div className="mk-bar-row">
                  <span className="mk-bar-name">Social</span>
                  <div className="mk-bar-track"><div className="mk-bar-fill" style={{width:'54%', background:'rgba(120,160,90,0.5)'}}/></div>
                  <span className="mk-bar-val">54%</span>
                </div>
                <div className="mk-bar-row">
                  <span className="mk-bar-name">Display</span>
                  <div className="mk-bar-track"><div className="mk-bar-fill" style={{width:'32%', background:'rgba(200,200,100,0.5)'}}/></div>
                  <span className="mk-bar-val">32%</span>
                </div>
              </div>
              {/* Benchmark sticky */}
              <div className="mk-sticky mk-sticky--1">
                <div className="mk-sticky-dot mk-sticky-dot--red"/>
                Waste identified<br/><strong>−£4.2k/mo</strong>
              </div>
              {/* Competitor sheet */}
              <div className="mk-sheet mk-sheet--1">
                <div className="mk-sheet-label">Competitor Gap</div>
                <svg width="90" height="44" viewBox="0 0 90 44">
                  <polyline points="0,36 18,28 36,32 54,14 72,20 90,8" fill="none" stroke="rgba(100,160,80,0.5)" strokeWidth="2"/>
                  <polyline points="0,40 18,38 36,36 54,30 72,34 90,28" fill="none" stroke="rgba(180,180,140,0.4)" strokeWidth="1.5" strokeDasharray="4 3"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* ── 2 / 6 — Growth Strategy ── */}
        <div className="mk-row mk-row--reversed">
          <div className="mk-row-visual">
            <div className="mk-strategy-visual">
              {/* Media planning board */}
              <div className="mk-board">
                <div className="mk-board-header">90-Day Roadmap</div>
                {['Month 1','Month 2','Month 3'].map((m,i) => (
                  <div key={m} className="mk-board-row">
                    <span className="mk-board-month">{m}</span>
                    <div className="mk-board-bar" style={{width:`${55+i*18}%`, opacity: 0.6+i*0.15}}/>
                  </div>
                ))}
              </div>
              {/* KPI chip stack */}
              <div className="mk-kpi-stack">
                {[
                  {label:'Target CPA', val:'£18'},
                  {label:'ROAS Goal', val:'4.2×'},
                  {label:'CAC', val:'−22%'},
                ].map(k => (
                  <div key={k.label} className="mk-kpi-chip">
                    <span className="mk-kpi-label">{k.label}</span>
                    <span className="mk-kpi-val">{k.val}</span>
                  </div>
                ))}
              </div>
              {/* Channel mix donut placeholder */}
              <div className="mk-donut-wrap">
                <svg viewBox="0 0 80 80" width="80" height="80">
                  <circle cx="40" cy="40" r="28" fill="none" stroke="rgba(220,230,210,0.6)" strokeWidth="12"/>
                  <circle cx="40" cy="40" r="28" fill="none" stroke="rgba(100,160,80,0.7)" strokeWidth="12"
                    strokeDasharray="52 124" strokeDashoffset="-31" strokeLinecap="round"/>
                  <circle cx="40" cy="40" r="28" fill="none" stroke="rgba(140,190,110,0.5)" strokeWidth="12"
                    strokeDasharray="36 140" strokeDashoffset="-83" strokeLinecap="round"/>
                  <text x="40" y="44" textAnchor="middle" fontSize="10" fill="rgba(60,80,50,0.8)" fontWeight="600">Mix</text>
                </svg>
              </div>
            </div>
          </div>
          <div className="mk-row-text">
            <div className="mk-step-counter"><span className="mk-step-n">2</span><span className="mk-step-total">/6</span></div>
            <h3 className="mk-row-title">Growth Strategy</h3>
            <p className="mk-row-desc">Define KPIs and target CPA/ROAS, build channel-mix recommendations, set a 90-day growth roadmap.</p>
            <div className="mk-row-tags">
              <span className="mk-tag">KPI Setting</span>
              <span className="mk-tag">Channel Mix</span>
              <span className="mk-tag">90-Day Plan</span>
            </div>
          </div>
        </div>

        {/* ── 3 / 6 — Creative Build ── */}
        <div className="mk-row mk-row--normal">
          <div className="mk-row-text">
            <div className="mk-step-counter"><span className="mk-step-n">3</span><span className="mk-step-total">/6</span></div>
            <h3 className="mk-row-title">Creative Build</h3>
            <p className="mk-row-desc">Write high-converting ad copy, design creative assets, configure tracking and attribution.</p>
            <div className="mk-row-tags">
              <span className="mk-tag">Ad Copy</span>
              <span className="mk-tag">Creative Assets</span>
              <span className="mk-tag">Attribution</span>
            </div>
          </div>
          <div className="mk-row-visual">
            <div className="mk-creative-visual">
              {/* Layered ad cards */}
              <div className="mk-ad-card mk-ad-card--back"/>
              <div className="mk-ad-card mk-ad-card--mid">
                <div className="mk-ad-label">Version B</div>
                <div className="mk-ad-headline">Grow 3× faster.</div>
                <div className="mk-ad-cta-chip">Learn More →</div>
              </div>
              <div className="mk-ad-card mk-ad-card--front">
                <div className="mk-ad-label mk-ad-label--active">✓ Winner</div>
                <div className="mk-ad-headline">Scale what works.</div>
                <div className="mk-ad-cta-chip mk-ad-cta-chip--green">Start Free →</div>
              </div>
              {/* Tracking pixel annotation */}
              <div className="mk-annotation">
                <div className="mk-annotation-line"/>
                <div className="mk-annotation-text">Pixel ✓<br/>Conv. tracked</div>
              </div>
              {/* Copy snippet */}
              <div className="mk-copy-snippet">
                <span className="mk-copy-cursor">|</span>
                "Turn clicks into customers"
              </div>
            </div>
          </div>
        </div>

        {/* ── 4 / 6 — Campaign Launch ── */}
        <div className="mk-row mk-row--reversed">
          <div className="mk-row-visual">
            <div className="mk-launch-visual">
              {/* Launch sequence */}
              <div className="mk-launch-board">
                <div className="mk-launch-header">
                  <span className="mk-launch-dot mk-launch-dot--green"/>
                  Live — 72h Monitor
                </div>
                {[
                  {ch:'Google Ads',  st:'Active', pct:94},
                  {ch:'Meta Ads',    st:'Active', pct:87},
                  {ch:'LinkedIn',    st:'Active', pct:76},
                ].map(c => (
                  <div key={c.ch} className="mk-launch-row">
                    <span className="mk-launch-ch">{c.ch}</span>
                    <div className="mk-launch-track">
                      <div className="mk-launch-fill" style={{width:`${c.pct}%`}}/>
                    </div>
                    <span className="mk-launch-status">{c.st}</span>
                  </div>
                ))}
              </div>
              {/* Conv tracking badge */}
              <div className="mk-conv-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(80,140,60,0.9)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Conversion Tracking Airtight
              </div>
              {/* 72h sparkline */}
              <div className="mk-sparkline-wrap">
                <span className="mk-spark-label">Impressions / 72h</span>
                <svg width="120" height="36" viewBox="0 0 120 36">
                  <polyline points="0,30 20,26 40,20 60,16 80,10 100,6 120,2"
                    fill="none" stroke="rgba(100,160,80,0.6)" strokeWidth="2"/>
                  <polyline points="0,30 20,26 40,20 60,16 80,10 100,6 120,2"
                    fill="rgba(100,160,80,0.08)" strokeWidth="0"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="mk-row-text">
            <div className="mk-step-counter"><span className="mk-step-n">4</span><span className="mk-step-total">/6</span></div>
            <h3 className="mk-row-title">Campaign Launch</h3>
            <p className="mk-row-desc">Go live across all channels, monitor the first 72 hours, confirm conversion tracking is airtight.</p>
            <div className="mk-row-tags">
              <span className="mk-tag">Go Live</span>
              <span className="mk-tag">72h Monitor</span>
              <span className="mk-tag">Conversion QA</span>
            </div>
          </div>
        </div>

        {/* ── 5 / 6 — Optimise & Scale ── */}
        <div className="mk-row mk-row--normal">
          <div className="mk-row-text">
            <div className="mk-step-counter"><span className="mk-step-n">5</span><span className="mk-step-total">/6</span></div>
            <h3 className="mk-row-title">Optimise & Scale</h3>
            <p className="mk-row-desc">Weekly bid and budget adjustments, A/B test creatives and landing pages, expand winning audiences.</p>
            <div className="mk-row-tags">
              <span className="mk-tag">A/B Testing</span>
              <span className="mk-tag">Bid Optimisation</span>
              <span className="mk-tag">Audience Scaling</span>
            </div>
          </div>
          <div className="mk-row-visual">
            <div className="mk-optimise-visual">
              {/* A/B test cards */}
              <div className="mk-ab-wrap">
                <div className="mk-ab-card">
                  <div className="mk-ab-label">A</div>
                  <div className="mk-ab-metric">CTR 2.1%</div>
                  <div className="mk-ab-bar" style={{width:'42%', background:'rgba(180,180,140,0.4)'}}/>
                </div>
                <div className="mk-ab-divider">vs</div>
                <div className="mk-ab-card mk-ab-card--win">
                  <div className="mk-ab-label mk-ab-label--win">B ✓</div>
                  <div className="mk-ab-metric">CTR 3.8%</div>
                  <div className="mk-ab-bar" style={{width:'76%', background:'rgba(100,160,80,0.6)'}}/>
                </div>
              </div>
              {/* Bid adjustment chart */}
              <div className="mk-bid-chart">
                <div className="mk-bid-label">Weekly Bid Adjustments</div>
                <svg width="160" height="48" viewBox="0 0 160 48">
                  {[0,1,2,3,4,5,6,7].map((i) => {
                    const heights = [20,28,18,35,24,40,30,44]
                    return <rect key={i} x={i*20+2} y={48-heights[i]} width="14" height={heights[i]}
                      rx="3" fill={i===7?'rgba(100,160,80,0.7)':'rgba(160,170,140,0.3)'}/>
                  })}
                </svg>
              </div>
              {/* Audience expansion ring */}
              <div className="mk-audience-note">
                <div className="mk-aud-ring"/>
                <span>Lookalike ×3 expanded</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 6 / 6 — Report & Refine ── */}
        <div className="mk-row mk-row--reversed mk-row--last">
          <div className="mk-row-visual">
            <div className="mk-report-visual">
              {/* Executive dashboard card */}
              <div className="mk-dash-card">
                <div className="mk-dash-header">
                  <span>Monthly ROI Report</span>
                  <span className="mk-dash-date">Oct 2026</span>
                </div>
                <div className="mk-dash-kpis">
                  {[
                    {label:'Revenue', val:'£184k', up:true},
                    {label:'ROAS', val:'5.1×', up:true},
                    {label:'CPA', val:'£14.2', up:false},
                  ].map(k => (
                    <div key={k.label} className="mk-dash-kpi">
                      <span className="mk-dash-kpi-label">{k.label}</span>
                      <span className="mk-dash-kpi-val">{k.val}</span>
                      <span className={`mk-dash-arrow ${k.up ? 'mk-dash-arrow--up' : 'mk-dash-arrow--down'}`}>{k.up ? '↑' : '↓'}</span>
                    </div>
                  ))}
                </div>
                {/* Attribution flow */}
                <div className="mk-attr-row">
                  {['Search','Social','Email'].map((src,i) => (
                    <div key={src} className="mk-attr-item">
                      <div className="mk-attr-bar" style={{height:`${30+i*12}px`}}/>
                      <span>{src}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Forward-looking annotation */}
              <div className="mk-fwd-note">
                <div className="mk-fwd-arrow">→</div>
                <div className="mk-fwd-text">Next 30-day<br/>recommendations ready</div>
              </div>
            </div>
          </div>
          <div className="mk-row-text">
            <div className="mk-step-counter"><span className="mk-step-n">6</span><span className="mk-step-total">/6</span></div>
            <h3 className="mk-row-title">Report & Refine</h3>
            <p className="mk-row-desc">Monthly executive dashboard with clear ROI, attribution data, and forward-looking recommendations.</p>
            <div className="mk-row-tags">
              <span className="mk-tag">ROI Dashboard</span>
              <span className="mk-tag">Attribution</span>
              <span className="mk-tag">Recommendations</span>
            </div>
          </div>
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
