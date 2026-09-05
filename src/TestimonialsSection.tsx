import { useState, useEffect, useRef } from 'react'

const TESTIMONIALS = [
  {
    name: 'Yomi Denzel',
    role: 'E-Commerce 2.0',
    quote: 'Xero completely transformed how we protect customer data. Their zero-trust pipeline reduced our attack surface by 80% in the first quarter — results I never thought were possible.',
    bg: 'linear-gradient(155deg, #0e1f12 0%, #060e08 100%)',
    accent: '#038f59',
  },
  {
    name: 'Timothée Moiroux',
    role: 'Investissement Immo',
    quote: 'Building my real estate portfolio in parallel with my studies demanded airtight financial security. Xero delivered infrastructure I could trust at every step of the journey.',
    bg: 'linear-gradient(155deg, #0d1628 0%, #08101e 100%)',
    accent: '#6080ff',
  },
  {
    name: 'David Sequeira',
    role: 'Closing',
    quote: 'From discovery to launch the team was surgical. Our key management scales across 40+ regions with zero incidents. Genuinely world-class execution every single time.',
    bg: 'linear-gradient(155deg, #160d28 0%, #0d081a 100%)',
    accent: '#a060ff',
  },
  {
    name: 'Manuel Ravier',
    role: 'Investissement Immobilier',
    quote: "The quarterly red-team reviews alone have been invaluable. Xero found and patched vulnerabilities we didn't even know existed — before anyone could exploit them.",
    bg: 'linear-gradient(155deg, #1a1408 0%, #100e06 100%)',
    accent: '#d08840',
  },
  {
    name: 'Sarah Mitchell',
    role: 'CEO, NexaFlow',
    quote: 'Enterprise-grade security without the enterprise overhead. Compliance audits now take days instead of months. The ROI was evident within the very first sprint.',
    bg: 'linear-gradient(155deg, #081e1e 0%, #061414 100%)',
    accent: '#40c8b8',
  },
  {
    name: 'James Okafor',
    role: 'CTO, VaultKit',
    quote: 'Their cryptographic layers passed every compliance audit on the first try. These are professionals who understand enterprise security at the deepest architectural level.',
    bg: 'linear-gradient(155deg, #180d22 0%, #10081a 100%)',
    accent: '#c050d0',
  },
  {
    name: 'Priya Sharma',
    role: 'Founder, CipherAI',
    quote: 'Zero-downtime rollout on a live platform with millions of users. Xero delivered exactly that — flawless execution, cryptographic integrity, and absolutely zero surprises.',
    bg: 'linear-gradient(155deg, #200e0e 0%, #140808 100%)',
    accent: '#e05040',
  },
  {
    name: 'Amara Chen',
    role: 'CISO, Orion Finance',
    quote: 'Automated key rotation and continuous monitoring freed our security team to focus on strategy instead of firefighting. An absolute game-changer for our security posture.',
    bg: 'linear-gradient(155deg, #0e1c0e 0%, #081208 100%)',
    accent: '#80d040',
  },
]

const T_VISIBLE = 4
const T_GAP     = 20

export default function TestimonialsSection() {
  const [index, setIndex]   = useState(0)
  const [cardW, setCardW]   = useState(0)
  const viewportRef         = useRef<HTMLDivElement>(null)
  const maxIndex            = TESTIMONIALS.length - T_VISIBLE
  const step                = cardW + T_GAP

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const update = () => {
      setCardW((el.offsetWidth - (T_VISIBLE - 1) * T_GAP) / T_VISIBLE)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i >= maxIndex ? 0 : i + 1))
    }, 3500)
    return () => clearInterval(id)
  }, [maxIndex])

  const prev = () => setIndex(i => Math.max(0, i - 1))
  const next = () => setIndex(i => Math.min(maxIndex, i + 1))

  return (
    <section className="testi-section">

      <div className="testi-top-row">
        <div className="testi-heading-group">
          <h2 className="testi-h2">Partnered with most of the</h2>
          <p className="testi-h2-em">top people at each industry</p>
        </div>
        <div className="testi-controls">
          <button className="testi-arrow" onClick={prev} disabled={index === 0} aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button className="testi-arrow" onClick={next} disabled={index === maxIndex} aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="testi-viewport" ref={viewportRef}>
        <div
          className="testi-track"
          style={{
            transform:  `translateX(${-(index * step)}px)`,
            transition: cardW ? 'transform 0.55s cubic-bezier(0.4,0,0.2,1)' : 'none',
            gap:        `${T_GAP}px`,
          }}
        >
          {TESTIMONIALS.map(t => (
            <div
              key={t.name}
              className="testi-card"
              style={{ background: t.bg, width: cardW || undefined }}
            >
              <div className="testi-card-grid" />
              <div
                className="testi-card-glow"
                style={{ background: `radial-gradient(ellipse 100% 55% at 50% 115%, ${t.accent}2e 0%, transparent 65%)` }}
              />
              <div className="testi-card-face">
                <div className="testi-badge">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="testi-face-label">
                  <p className="testi-face-name">{t.name}</p>
                  <p className="testi-face-role" style={{ color: t.accent }}>{t.role}</p>
                </div>
              </div>
              <div className="testi-hover-panel">
                <p className="testi-hp-name">{t.name}</p>
                <p className="testi-hp-role" style={{ color: t.accent }}>{t.role}</p>
                <p className="testi-hp-quote">{t.quote}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="testi-dots">
        {Array.from({ length: maxIndex + 1 }, (_, i) => (
          <button
            key={i}
            className={`testi-dot${i === index ? ' testi-dot--active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Page ${i + 1}`}
          />
        ))}
      </div>

    </section>
  )
}
