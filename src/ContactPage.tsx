import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'

/* Scoped styles — inline styles can't target ::placeholder */
const FIELD_STYLES = `
  .cp-field input::placeholder,
  .cp-field textarea::placeholder { color: rgba(255,255,255,0.22); }
  .cp-field textarea { font-family: inherit; }
`

/* ─────────────────────────────────────────────
   BRAND TOKENS
───────────────────────────────────────────── */
const ACCENT  = '#D7FF3F'
const BG      = '#0A0A0A'
const PANEL   = '#0F0F0F'

/* ─────────────────────────────────────────────
   STEP — vertical progress indicator
───────────────────────────────────────────── */
function Step({ n, label, active }: { n: number; label: string; active: boolean }) {
  return (
    <motion.div
      whileHover={{ x: active ? 0 : 3 }}
      transition={{ duration: 0.18 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '13px 16px',
        borderRadius: '16px',
        background: active ? 'rgba(215,255,63,0.10)' : 'rgba(255,255,255,0.04)',
        border:     active ? '1px solid rgba(215,255,63,0.28)' : '1px solid rgba(255,255,255,0.07)',
        boxShadow:  active ? '0 0 24px rgba(215,255,63,0.09)' : 'none',
      }}
    >
      {/* Badge */}
      <div style={{
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '11px',
        fontWeight: '700',
        background: active ? ACCENT : 'rgba(255,255,255,0.07)',
        color:      active ? BG     : 'rgba(255,255,255,0.28)',
        boxShadow:  active ? '0 0 14px rgba(215,255,63,0.45)' : 'none',
      }}>
        {n}
      </div>
      <span style={{
        fontSize:    '14px',
        fontWeight:  '500',
        letterSpacing: '-0.01em',
        color: active ? ACCENT : 'rgba(255,255,255,0.38)',
      }}>
        {label}
      </span>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   FIELD — premium dark input / textarea
───────────────────────────────────────────── */
function Field({
  label, placeholder, type = 'text', optional = false, rows,
}: {
  label: string; placeholder: string; type?: string; optional?: boolean; rows?: number
}) {
  const [focused, setFocused] = useState(false)

  const base: React.CSSProperties = {
    width:        '100%',
    background:   'rgba(255,255,255,0.04)',
    border:       focused ? '1px solid rgba(215,255,63,0.40)' : '1px solid rgba(255,255,255,0.08)',
    borderRadius: '14px',
    padding:      '13px 16px',
    color:        '#fff',
    fontSize:     '14px',
    lineHeight:   '1.5',
    outline:      'none',
    boxShadow:    focused
      ? '0 0 0 3px rgba(215,255,63,0.08), inset 0 1px 3px rgba(0,0,0,0.35)'
      : 'inset 0 1px 3px rgba(0,0,0,0.35)',
    transition:   'border-color 0.2s ease, box-shadow 0.2s ease',
    resize:       'none',
  }

  return (
    <motion.div
      className="cp-field"
      whileHover={{ y: -1 }}
      transition={{ duration: 0.14 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}
    >
      <label style={{
        fontSize:      '12px',
        fontWeight:    '500',
        letterSpacing: '0.025em',
        color:         '#9A9A9A',
        userSelect:    'none',
      }}>
        {label}
        {optional && (
          <span style={{ marginLeft: '6px', color: 'rgba(255,255,255,0.22)', fontWeight: '400' }}>
            Optional
          </span>
        )}
      </label>

      {rows ? (
        <textarea
          rows={rows}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...base, minHeight: `${rows * 44}px` }}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...base, height: '48px' }}
        />
      )}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0  },
}
const stagger = (delay = 0) => ({
  show: { transition: { staggerChildren: 0.10, delayChildren: delay } },
})

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function ContactPage() {
  const [btnHov, setBtnHov] = useState(false)

  /* Parallax — background image drifts slightly with mouse */
  const panelRef = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const bgX = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 80, damping: 20 })
  const bgY = useSpring(useTransform(my, [-0.5, 0.5], [-10, 10]), { stiffness: 80, damping: 20 })

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = panelRef.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - r.left) / r.width  - 0.5)
    my.set((e.clientY - r.top)  / r.height - 0.5)
  }
  const onMouseLeave = () => { mx.set(0); my.set(0) }

  return (
    <div style={{ background: BG, minHeight: '100vh', width: '100%' }}>
      <style>{FIELD_STYLES}</style>
      <SiteNav />

      {/* ── Outer shell ── */}
      <div style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        minHeight:      'calc(100vh - 80px)',
        padding:        '80px 20px 40px',
      }}>

        {/* ── Card pair — 92vw wide, up to 1680px ── */}
        <div style={{
          display:   'flex',
          width:     '92vw',
          maxWidth:  '1680px',
          height:    'calc(100vh - 100px)',
          minHeight: '680px',
          gap:       '20px',
        }}>

          {/* ══════════════════════════════════════════
              LEFT PANEL
          ══════════════════════════════════════════ */}
          <motion.div
            ref={panelRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0  }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width:        '48%',
              flexShrink:   0,
              borderRadius: '32px',
              overflow:     'hidden',
              position:     'relative',
            }}
          >
            {/* Background image with parallax */}
            <motion.div
              style={{
                position:           'absolute',
                inset:              '-20px',
                backgroundImage:    "url('/contact-bg.webp')",
                backgroundSize:     '75%',
                backgroundPosition: 'center',
                x: bgX,
                y: bgY,
              }}
            />

            {/* Gradient scrim — darkens bottom for legibility */}
            <div style={{
              position: 'absolute',
              inset:    0,
              background: `
                linear-gradient(to top,
                  rgba(10,10,10,0.92) 0%,
                  rgba(10,10,10,0.58) 38%,
                  rgba(10,10,10,0.18) 72%,
                  transparent        100%
                )
              `,
            }} />

            {/* Content — pinned to bottom */}
            <motion.div
              variants={stagger(0.30)}
              initial="hidden"
              animate="show"
              style={{
                position:       'relative',
                zIndex:         2,
                height:         '100%',
                display:        'flex',
                flexDirection:  'column',
                justifyContent: 'flex-end',
                padding:        '56px',
              }}
            >
              {/* Logo */}
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.55 }}
                style={{ marginBottom: '28px' }}
              >
                <img
                  src="/logo.webp"
                  alt="UFK Solutions"
                  style={{ height: '30px', filter: 'brightness(0) invert(1)' }}
                />
              </motion.div>

              {/* Heading + sub */}
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.55 }}
                style={{ marginBottom: '32px' }}
              >
                <h1 style={{
                  fontSize:      'clamp(34px, 3.2vw, 48px)',
                  fontWeight:    '700',
                  color:         '#ffffff',
                  lineHeight:    '1.06',
                  letterSpacing: '-0.03em',
                  marginBottom:  '14px',
                }}>
                  Get In<br />Touch
                </h1>
                <p style={{
                  fontSize:  '15px',
                  color:     'rgba(255,255,255,0.52)',
                  lineHeight:'1.65',
                  maxWidth:  '360px',
                }}>
                  Let's build something exceptional together. Tell us about your project and we'll get back to you shortly.
                </p>
              </motion.div>

              {/* Steps */}
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.55 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
              >
                <Step n={1} label="Share your details"        active={true}  />
                <Step n={2} label="Tell us about your project" active={false} />
                <Step n={3} label="We'll get back to you"     active={false} />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ══════════════════════════════════════════
              RIGHT PANEL
          ══════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0  }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.10 }}
            style={{
              flex:           1,
              borderRadius:   '32px',
              background:     PANEL,
              border:         '1px solid rgba(255,255,255,0.06)',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              overflow:       'hidden',
              padding:        '60px 72px',
            }}
          >
            <motion.div
              variants={stagger(0.40)}
              initial="hidden"
              animate="show"
              style={{ width: '100%', maxWidth: '400px' }}
            >

              {/* Header */}
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                style={{ marginBottom: '32px' }}
              >
                <h2 style={{
                  fontSize:      '27px',
                  fontWeight:    '600',
                  color:         '#ffffff',
                  letterSpacing: '-0.025em',
                  marginBottom:  '8px',
                }}>
                  Send a Message
                </h2>
                <p style={{ fontSize: '14px', color: '#9A9A9A', lineHeight: '1.55' }}>
                  Fill in your details and we'll get back to you shortly.
                </p>
              </motion.div>

              {/* Form fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                {/* Name row */}
                <motion.div
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}
                >
                  <Field label="First Name" placeholder="Alex" />
                  <Field label="Last Name"  placeholder="Sterling" />
                </motion.div>

                <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
                  <Field label="Email" placeholder="alex@company.io" type="email" />
                </motion.div>

                <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
                  <Field label="Company" placeholder="Your company name" optional />
                </motion.div>

                <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
                  <Field label="Message" placeholder="Tell us about your project, goals, and timeline…" rows={4} />
                </motion.div>

                {/* CTA */}
                <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
                  <motion.button
                    onHoverStart={() => setBtnHov(true)}
                    onHoverEnd={()   => setBtnHov(false)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.985 }}
                    style={{
                      width:          '100%',
                      height:         '52px',
                      borderRadius:   '14px',
                      background:     ACCENT,
                      color:          '#000000',
                      fontWeight:     '600',
                      fontSize:       '15px',
                      letterSpacing:  '-0.01em',
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      gap:            '8px',
                      border:         'none',
                      cursor:         'pointer',
                      boxShadow:      btnHov
                        ? '0 0 40px rgba(215,255,63,0.50), 0 8px 28px rgba(0,0,0,0.45)'
                        : '0 0 18px rgba(215,255,63,0.22), 0 4px 16px rgba(0,0,0,0.38)',
                      transition:     'box-shadow 0.28s ease',
                    }}
                  >
                    Send Message
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </motion.button>
                </motion.div>

                {/* Footer link */}
                <motion.p
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  style={{
                    textAlign:  'center',
                    fontSize:   '13px',
                    color:      'rgba(255,255,255,0.28)',
                    marginTop:  '2px',
                  }}
                >
                  Already in touch?{' '}
                  <Link
                    to="/"
                    style={{
                      color:          ACCENT,
                      opacity:        0.80,
                      textDecoration: 'none',
                      fontWeight:     '500',
                    }}
                  >
                    Return home
                  </Link>
                </motion.p>

              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
