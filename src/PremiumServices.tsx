import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    num: '01',
    title: 'Digital Product & Software Development',
    items: ['Software Development', 'Mobile App Development', 'Web App Development', 'UI/UX Design', 'API & System Integrations'],
    screen: ['Digital Product &', 'Software Development'],
  },
  {
    num: '02',
    title: 'AI, Automation & Cloud',
    items: ['AI Development', 'AI Chatbots', 'AI Workflow Automation / RPA', 'Cloud Solutions', 'DevOps'],
    screen: ['AI, Automation', '& Cloud'],
  },
  {
    num: '03',
    title: 'Branding, Creative & Digital Marketing',
    items: ['Branding & Design', 'Social Media Marketing', 'Content & Creative Design', 'Search Engine Optimisation', 'Digital Campaigns'],
    screen: ['Branding, Creative', '& Digital Marketing'],
  },
  {
    num: '04',
    title: 'Industry & Enterprise Solutions',
    items: ['Healthcare EHR Solutions', 'Aviation Solutions', 'Enterprise Platforms', 'Custom Business Solutions'],
    screen: ['Industry &', 'Enterprise Solutions'],
  },
  {
    num: '05',
    title: 'Business & Proposal Development',
    items: ['Proposal Development', 'RFP / RFQ Responses', 'Capability Statements', 'Business & Technical Proposals', 'U.S. Market & Business Support'],
    screen: ['Business & Proposal', 'Development'],
  },
]

const GAP = 100

export default function PremiumServicesSection() {
  const sectionRef    = useRef<HTMLElement>(null)
  const trackRef      = useRef<HTMLDivElement>(null)
  const panelRefs     = useRef<(HTMLDivElement | null)[]>([])
  const screenTextRef = useRef<HTMLDivElement>(null)
  const dotsRef       = useRef<(HTMLDivElement | null)[]>([])

  const [activeIdx, setActiveIdx]     = useState(0)
  const [screenLines, setScreenLines] = useState(SERVICES[0].screen)

  const activeIdxRef = useRef(0)
  const animatedRef  = useRef(new Set<number>())

  const animateLaptopScreen = (idx: number) => {
    const el = screenTextRef.current
    if (!el) return
    gsap.to(el, {
      y: -10, opacity: 0, filter: 'blur(4px)', duration: 0.2, ease: 'power2.in',
      onComplete: () => {
        setScreenLines(SERVICES[idx].screen)
        gsap.fromTo(el,
          { y: 10, opacity: 0, filter: 'blur(4px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.3, ease: 'power3.out', clearProps: 'filter' },
        )
      },
    })
  }

  useEffect(() => {
    const section = sectionRef.current
    const track   = trackRef.current
    if (!section || !track) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const isMobile = window.innerWidth < 768
    if (isMobile) return

    const panels = panelRefs.current.filter((p): p is HTMLDivElement => p !== null)
    if (panels.length === 0) return

    const vw     = window.innerWidth
    const vh     = window.innerHeight
    const panelW = panels[0].offsetWidth

    section.style.height = `${vh * 5.5}px`

    // Centre panel-0 on load
    const startX = vw / 2 - panelW / 2
    const endX   = startX - 4 * (panelW + GAP)

    gsap.set(track, { x: startX })

    const updatePanels = (currentX: number) => {
      let bestIdx  = 0
      let bestProx = 0

      panels.forEach((panel, i) => {
        const centre = currentX + i * (panelW + GAP) + panelW / 2
        const dist   = Math.abs(centre - vw / 2)
        const prox   = Math.max(0, 1 - dist / (panelW * 0.82))

        // Inactive panels: dimmed + scaled down
        gsap.set(panel, {
          opacity: 0.2 + prox * 0.8,
          scale:   0.90 + prox * 0.10,
        })

        // Green card fades in behind active panel
        const bg = panel.querySelector<HTMLElement>('.svc-panel-bg')
        if (bg) gsap.set(bg, { opacity: prox > 0.4 ? (prox - 0.4) / 0.6 : 0 })

        if (prox > bestProx) { bestProx = prox; bestIdx = i }

        // Staggered text animation on enter
        if (prox > 0.58 && !animatedRef.current.has(i)) {
          const targets = [
            panel.querySelector('.svc-num'),
            ...Array.from(panel.querySelectorAll('.svc-items li')),
            panel.querySelector('.svc-category-title'),
          ].filter(Boolean)
          gsap.fromTo(targets,
            { y: 20, opacity: 0, filter: 'blur(4px)' },
            { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.05, duration: 0.45, ease: 'power3.out', clearProps: 'filter' },
          )
          animatedRef.current.add(i)
        } else if (prox < 0.25) {
          animatedRef.current.delete(i)
        }
      })

      dotsRef.current.forEach((d, i) => d?.classList.toggle('active', i === bestIdx))

      if (bestIdx !== activeIdxRef.current) {
        activeIdxRef.current = bestIdx
        setActiveIdx(bestIdx)
        animateLaptopScreen(bestIdx)
      }
    }

    updatePanels(startX)

    const st = ScrollTrigger.create({
      trigger: section,
      start:   'top top',
      end:     'bottom bottom',
      scrub:   1.2,
      snap: {
        snapTo:   1 / 4,
        duration: { min: 0.3, max: 0.8 },
        ease:     'power2.inOut',
      },
      onUpdate(self) {
        const x = gsap.utils.interpolate(startX, endX, self.progress)
        gsap.set(track, { x })
        updatePanels(x)
      },
    })

    return () => {
      st.kill()
      section.style.height = ''
      gsap.set(track, { clearProps: 'x' })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="svc-section" ref={sectionRef}>
      <div className="svc-sticky">
        <div className="svc-inner">

          {/* Section heading */}
          <div className="svc-header">
            <p className="svc-label">Our Services</p>
            <h2 className="svc-heading">Solutions That Move Businesses Forward</h2>
          </div>

          {/* Horizontal moving track */}
          <div className="svc-track-wrap">
            <div className="svc-track" ref={trackRef}>
              {SERVICES.map((svc, i) => (
                <div
                  key={svc.num}
                  className="svc-panel"
                  ref={el => { panelRefs.current[i] = el }}
                >
                  {/* Green gradient card — behind text, extends to meet laptop */}
                  <div className="svc-panel-bg" aria-hidden="true" />

                  {/* Upper content: number left, items right */}
                  <div className="svc-panel-top">
                    <span className="svc-num">{svc.num}</span>
                    <ul className="svc-items">
                      {svc.items.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  </div>

                  {/* Category title — dimmed on inactive */}
                  <p className="svc-category-title">{svc.title}</p>

                  {/* Spacer so the laptop overlaps the bottom of this panel */}
                  <div className="svc-panel-spacer" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>

          {/* Laptop — stationary, centred, overlaps panel bottom */}
          <div className="svc-laptop-wrap">
            <div className="svc-laptop">
              <img src="/laptop.png" alt="" draggable={false} />
              <div className="svc-screen">
                <div className="svc-screen-text" ref={screenTextRef}>
                  {screenLines.map((line, i) => (
                    <span key={i} className="svc-screen-line">{line}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Progress dots */}
          <div className="svc-dots">
            {SERVICES.map((_, i) => (
              <div
                key={i}
                className={`svc-dot${i === activeIdx ? ' active' : ''}`}
                ref={el => { dotsRef.current[i] = el }}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
