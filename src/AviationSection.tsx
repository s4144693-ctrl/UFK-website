import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const OFFERINGS = [
  'DGCA Guideline-Based Websites',
  'Aviation Marketing & Branding',
  'Aviation SEO & Digital Visibility',
  'Aviation Content Creation',
  'Sales Funnel Development',
  'CPL Student Sales Funnels',
  'Optimized Aviation Business Solutions',
]

export default function AviationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const planeRef   = useRef<HTMLImageElement>(null)
  const bgRef      = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const section = sectionRef.current
    const plane   = planeRef.current
    const bg      = bgRef.current
    if (!section || !plane || !bg) return

    // Set initial transform state
    gsap.set(plane, { x: -200, y: 30, scale: 0.96 })
    gsap.set(bg,    { x: 0 })

    if (prefersReduced) return

    // quickTo targets — these are the "glide" functions
    const DURATION = 1.5
    const EASE     = 'power3.out'

    const setPlaneX     = gsap.quickTo(plane, 'x',     { duration: DURATION, ease: EASE })
    const setPlaneY     = gsap.quickTo(plane, 'y',     { duration: DURATION, ease: EASE })
    const setPlaneScale = gsap.quickTo(plane, 'scale', { duration: DURATION, ease: EASE })

    // ScrollTrigger drives the target values via onUpdate
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate(self) {
        const p = self.progress  // 0 → 1

        // Plane: x from -200px → max +220px (capped), y from +30px → -40px, scale 0.96 → 1.08
        const rawX        = -200 + p * 800
        const targetX     = Math.min(rawX, 220)
        const targetY     =   30 + p * -70
        const targetScale = 0.96 + p * 0.12

        setPlaneX(targetX)
        setPlaneY(targetY)
        setPlaneScale(targetScale)
      },
    })

    return () => {
      st.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="av-section">
      {/* Background */}
      <div ref={bgRef} className="av-bg" />

      {/* Plane PNG */}
      <img
        ref={planeRef}
        src="/aviation-plane2.png"
        alt=""
        aria-hidden="true"
        className="av-plane"
      />

      {/* Content */}
      <div className="av-content">
        <div className="av-text">
          <p className="av-label">Built on Aviation. Driven by Experience.</p>
          <h2 className="av-heading">Aviation Solutions</h2>
          <p className="av-sub">
            We provide specialized digital, creative, and strategic solutions for aviation
            businesses, flight schools, training organizations, and industry partners.
          </p>
        </div>

        <div className="av-offerings">
          <p className="av-offerings-label">What We Offer</p>
          <ul className="av-list">
            {OFFERINGS.map(item => (
              <li key={item} className="av-list-item">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
