import { useState, useEffect, useRef } from 'react'

const TESTIMONIALS = [
  {
    name: 'Parth Gupta',
    role: 'Vision Flying Training Institute',
    quote: 'UFK Solutions has been a reliable end-to-end digital partner for VFTI. From our website and server management to SEO and social media, they handle everything with professionalism and consistency. Their understanding of our requirements and quick support has made our digital operations much more seamless.',
    bg: 'linear-gradient(155deg, #0e1f12 0%, #060e08 100%)',
    accent: '#b2ff59',
    photo: '/VFTI.png',
  },
  {
    name: 'Shardul Seth',
    role: 'Avyanna Aviation Academy · India\'s only A-Rated FTO',
    quote: 'Over the past three years, our association with UFK Solutions has been a great experience. They have played an important role in strengthening Avyanna\'s digital presence, from developing a modern, high-quality website to providing reliable IT and technical support. What we particularly value is their consistent support, responsiveness, and ability to turn our requirements into effective digital solutions.',
    bg: 'linear-gradient(155deg, #0d1a0f 0%, #071009 100%)',
    accent: '#4ade80',
    photo: '/avyanna.png',
  },
  {
    name: 'Burhan Mir',
    role: 'VIBGYOR Travels',
    quote: 'We have been working with UFK Solutions for our travel website and social media for the last three years, and the experience has been great. We haven\'t faced any downtime with the website so far, which has been really good for us. They are responsive, understand our requirements well, and are good at what they do.',
    bg: 'linear-gradient(155deg, #0d1628 0%, #08101e 100%)',
    accent: '#60a5fa',
    photo: '/VIBGYOR.jpeg',
  },
  {
    name: 'Abrar Khan',
    role: 'BTC Travels',
    quote: 'We have been working with UFK Solutions for our website, social media, branding and regular maintenance. They have been handling our digital work well and are always available when we need any changes or support. Overall, we\'ve had a good experience working with their team.',
    bg: 'linear-gradient(155deg, #1a1408 0%, #100e06 100%)',
    accent: '#fbbf24',
    photo: '/BTC.jpeg',
  },
  {
    name: 'Ashwajeet Shetty',
    role: 'Locale Shack Cafe',
    quote: 'UFK has been handling our branding for more than a year now and we can\'t think of anyone else. They are hardworking, creative and, most importantly, have a lot of patience. Thanks for creating our Logo, Menu Card, Visiting Card, Website, and more — keep doing the great job!',
    bg: 'linear-gradient(155deg, #1c0f08 0%, #110906 100%)',
    accent: '#fb923c',
    photo: '',
  },
  {
    name: 'Sourav Dey',
    role: 'Co-Founder, Pacific Consulting',
    quote: 'We\'ve been working with UFK Solutions since 2021, and it\'s been a seamless experience. They handle all our social media content, website development, and branding with precision, perfectly capturing our brand essence. Their prompt responses and swift action make them a standout choice. We highly recommend UFK Solutions for any business looking to elevate its presence.',
    bg: 'linear-gradient(155deg, #081e1e 0%, #061414 100%)',
    accent: '#2dd4bf',
    photo: '/pacific-souravdey.png',
  },
  {
    name: 'Sheikh Bashir Ahmed',
    role: 'Founder, The Kaisar Group of Hotels',
    quote: 'UFK Solutions transformed our social media presence with remarkable results. Their commitment to our brand identity, prompt posting, and exceptional engagement sets them apart. They\'re not just service providers — they\'re invaluable partners in our digital journey.',
    bg: 'linear-gradient(155deg, #180d22 0%, #10081a 100%)',
    accent: '#c084fc',
    photo: '/KAISER.jpeg',
  },
  {
    name: 'Jatin Paul Singh',
    role: 'Founder, Nets',
    quote: 'Working with UFK Solutions has been a delight. They are very professional when it comes to taking notes on client requirements. From website designing to editing and understanding the content, they are very focused on the job. They handle all queries and provide options to solve them, making it easier to get work done.',
    bg: 'linear-gradient(155deg, #0e1c0e 0%, #081208 100%)',
    accent: '#86efac',
    photo: '/nets%20india.png',
  },
]

const T_GAP = 20

export default function TestimonialsSection() {
  const [index, setIndex]        = useState(0)
  const [cardW, setCardW]        = useState(0)
  const [visible, setVisible]    = useState(4)
  const viewportRef              = useRef<HTMLDivElement>(null)

  const maxIndex = TESTIMONIALS.length - visible
  const step     = cardW + T_GAP

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const update = () => {
      const isMobile = window.innerWidth <= 768
      const v = isMobile ? 2 : 4
      setVisible(v)
      setCardW((el.offsetWidth - (v - 1) * T_GAP) / v)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Reset index when visible count changes to avoid out-of-bounds
  useEffect(() => {
    setIndex(0)
  }, [visible])

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
          <h2 className="testi-h2">Read what our clients</h2>
          <p className="testi-h2-em">have to say about our work</p>
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
              {/* Photo background layer */}
              {t.photo && (
                <div className="testi-card-photo" style={{ backgroundImage: `url(${t.photo})` }} />
              )}
              {/* Dark colour overlay over photo */}
              {t.photo && (
                <div className="testi-card-photo-overlay" />
              )}
              <div className="testi-card-grid" />
              <div
                className="testi-card-glow"
                style={{ background: `radial-gradient(ellipse 100% 55% at 50% 115%, ${t.accent}2e 0%, transparent 65%)` }}
              />
              <div className="testi-card-face">
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
