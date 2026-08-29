import { motion } from 'motion/react'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen" style={{ background: '#04090d' }}>

      <SiteNav />

      {/* ── Hero ── */}
      <div className="relative w-full overflow-hidden" style={{ height: '100vh' }}>

        {/* Video background layer */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
          <video
            src="/bg-about.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-1000"
          />
        </div>

        {/* Left-side fade so text is always legible */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(6,12,6,0.85) 0%, rgba(6,12,6,0.5) 45%, transparent 75%)',
            zIndex: 2,
          }}
        />

        {/* ── Text content ── */}
        <div
          className="absolute flex flex-col justify-center"
          style={{
            top: 0, bottom: 0, left: 0,
            width: '54%',
            padding: '0 0 0 clamp(32px, 6vw, 96px)',
            zIndex: 10,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '580px' }}
          >
            {/* Label pill */}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                width: 'fit-content',
                borderRadius: '999px',
                padding: '8px 18px',
                background: 'rgba(74,222,128,0.08)',
                border: '1px solid rgba(74,222,128,0.18)',
                color: '#038f59',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              About Us
            </span>

            {/* Heading */}
            <h1
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.025em',
                color: '#f0f5f0',
              }}
            >
              Foundation of the<br />new digital epoch
            </h1>

            {/* Subtext */}
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.035rem',
                lineHeight: 1.65,
                color: 'rgba(240,245,240,0.55)',
                maxWidth: '460px',
              }}
            >
              Designing products, powering ecosystems and laying the foundation of a
              decentralized web for enterprises, builders and communities alike.
            </p>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                width: 'fit-content',
                background: '#038f59',
                color: '#04090d',
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                fontWeight: 600,
                padding: '14px 36px',
                borderRadius: '999px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Contact Us
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* ── Journey / Roadmap ── */}
      <section className="abj-section">

        {/* Header */}
        <div className="abj-header">
          <p className="abj-label">Our Journey</p>
          <h2 className="abj-heading">Where We've Been,<br />Where We're Going</h2>
        </div>

        {/* Track */}
        <div className="abj-track">

          {/* Shared horizontal rule */}
          <div className="abj-rule" aria-hidden="true" />

          {/* Column 1 — 2021 */}
          <div className="abj-col">
            <div className="abj-col-top" />
            <div className="abj-dot" aria-hidden="true"><div className="abj-dot-inner" /></div>
            <div className="abj-col-bottom">
              <span className="abj-period">2021</span>
              <h3 className="abj-col-title">Founded</h3>
              <p className="abj-col-desc">Born as a boutique design studio with a mission to craft digital experiences that actually move the needle for ambitious brands.</p>
            </div>
          </div>

          {/* Column 2 — 2022 */}
          <div className="abj-col">
            <div className="abj-col-top" />
            <div className="abj-dot" aria-hidden="true"><div className="abj-dot-inner" /></div>
            <div className="abj-col-bottom">
              <span className="abj-period">2022</span>
              <h3 className="abj-col-title">Full-Stack Expansion</h3>
              <p className="abj-col-desc">Grew from design into full-stack development, onboarding our first enterprise clients and launching complex web and mobile platforms.</p>
            </div>
          </div>

          {/* Column 3 — NOW (active) */}
          <div className="abj-col abj-col--active">
            <div className="abj-col-top abj-col-top--active">
              <span className="abj-now-badge">We are Here</span>
              <h3 className="abj-now-title">Scaling Impact</h3>
              <p className="abj-now-desc">Delivering measurable growth — 200K+ monthly visitors, 1M+ search impressions, and high-impact digital systems for global clients.</p>
            </div>
            <div className="abj-dot abj-dot--active" aria-hidden="true"><div className="abj-dot-inner" /></div>
            <div className="abj-col-bottom">
              <span className="abj-period">2024</span>
              <h3 className="abj-col-title">Present</h3>
            </div>
          </div>

          {/* Column 4 — Future */}
          <div className="abj-col">
            <div className="abj-col-top" />
            <div className="abj-dot" aria-hidden="true"><div className="abj-dot-inner" /></div>
            <div className="abj-col-bottom">
              <span className="abj-period">2025+</span>
              <h3 className="abj-col-title">Global Reach</h3>
              <p className="abj-col-desc">Expanding into new markets and industries — building the infrastructure for the next generation of digital-first businesses worldwide.</p>
            </div>
          </div>

        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
