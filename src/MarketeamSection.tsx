import { useState, useEffect } from 'react'

/* ─── Count-up hook ─── */
function useCountUp(target: number, duration: number, startDelay: number) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let raf: number
    const tid = setTimeout(() => {
      const t0 = performance.now()
      const step = (now: number) => {
        const p = Math.min((now - t0) / duration, 1)
        const ease = 1 - Math.pow(1 - p, 3)
        setCount(Math.round(ease * target))
        if (p < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, startDelay)
    return () => { clearTimeout(tid); cancelAnimationFrame(raf) }
  }, [target, duration, startDelay])
  return count
}

/* ─── Data ─── */
const FULL_TEXT =
  'Unlock Top Marketing Talent You Thought Was Out of Reach \u2013 Now Just One Click Away!'
const SPLIT_AT = 67   // chars coloured #000; remainder #fff

const AVATAR_DATA = [
  { src: 'https://polo-pecan-73837341.figma.site/_assets/v11/aa51718fb3af3637e6d666b6543fc27a175fada6.png', angle: 270, radius: 177, size: 58,  br: 20, glow: '#A068FF', delay: 0.6 },
  { src: 'https://polo-pecan-73837341.figma.site/_assets/v11/ca755f7f93c1126fb8bdbf99ab364a33aa9ab272.png', angle: 60,  radius: 251, size: 58,  br: 50, glow: '#FFD60A', delay: 0.9 },
  { src: 'https://polo-pecan-73837341.figma.site/_assets/v11/dc01064c7093dcc32674876ee3cf5e41c4a485c6.png', angle: 180, radius: 251, size: 78,  br: 50, glow: '#FF6B9D', delay: 1.1 },
  { src: 'https://polo-pecan-73837341.figma.site/_assets/v11/d5470a58b02388336141575048720f19a50de832.png', angle: 300, radius: 251, size: 58,  br: 20, glow: '#4FC3F7', delay: 1.3 },
  { src: 'https://polo-pecan-73837341.figma.site/_assets/v11/018736aa5d0275c4ce56cfebaf2ae3007d81ca1e.png', angle: 130, radius: 325, size: 88,  br: 50, glow: '#FF6B9D', delay: 1.5 },
  { src: 'https://polo-pecan-73837341.figma.site/_assets/v11/c76d8a0b99676de31c014344bfaf75bad090758d.png', angle: 30,  radius: 399, size: 58,  br: 50, glow: '#A068FF', delay: 1.7 },
  { src: 'https://polo-pecan-73837341.figma.site/_assets/v11/7b1b5f039de7b54cc9913e96c1923c3b15a157fa.png', angle: 95,  radius: 399, size: 88,  br: 24, glow: '#FF9A3C', delay: 1.9 },
  { src: 'https://polo-pecan-73837341.figma.site/_assets/v11/9ae171d8895199349755c43fbff00e122221a027.png', angle: 220, radius: 399, size: 88,  br: 24, glow: '#FF6B9D', delay: 2.1 },
  { src: 'https://polo-pecan-73837341.figma.site/_assets/v11/926c9eb7b4bc1df846fa0e39f0b0dc3fefd80671.png', angle: 320, radius: 399, size: 58,  br: 50, glow: '#A068FF', delay: 2.3 },
]

const LOGOS = [
  'https://polo-pecan-73837341.figma.site/_assets/v11/1e7b0e6fcc016cd28aec5c68990118b8c54c35a5.svg',
  'https://polo-pecan-73837341.figma.site/_assets/v11/3eac03c183db2ae080d910159211c14843398b61.svg',
  'https://polo-pecan-73837341.figma.site/_assets/v11/17705a4c0023a0e5a99154dfb10582adbbf4260b.svg',
  'https://polo-pecan-73837341.figma.site/_assets/v11/0e5f442b09dc5c248e3e60d40a65505fb1887228.svg',
  'https://polo-pecan-73837341.figma.site/_assets/v11/63f99030ceb459e3c9ab9e429cfa2353491d3816.svg',
]

/* ─── Helper: compute avatar translate values ─── */
function avTranslate(angle: number, radius: number) {
  const rad = (angle * Math.PI) / 180
  const x = Math.cos(rad) * radius
  const y = Math.sin(rad) * radius
  const tx = x >= 0 ? `calc(-50% + ${x.toFixed(2)}px)` : `calc(-50% - ${Math.abs(x).toFixed(2)}px)`
  const ty = y >= 0 ? `calc(-50% + ${y.toFixed(2)}px)` : `calc(-50% - ${Math.abs(y).toFixed(2)}px)`
  return { tx, ty }
}

export default function MarketeamSection() {
  const [charCount, setCharCount] = useState(0)
  const count = useCountUp(20, 2000, 1200)
  const isDone = charCount >= FULL_TEXT.length

  /* Typewriter */
  useEffect(() => {
    if (isDone) return
    const delay = charCount === 0 ? 400 : 35
    const tid = setTimeout(() => setCharCount(c => c + 1), delay)
    return () => clearTimeout(tid)
  }, [charCount, isDone])

  const darkPart  = FULL_TEXT.slice(0, Math.min(charCount, SPLIT_AT))
  const lightPart = charCount > SPLIT_AT ? FULL_TEXT.slice(SPLIT_AT, charCount) : ''

  /* 4× logos for seamless ticker */
  const logoSet = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS]

  return (
    <section className="mk-section">
      {/* ── Hero body ── */}
      <div className="mk-hero-body">

        {/* Left */}
        <div className="mk-hero-left">
          <h2 className="mk-heading">
            <span className="mk-h-dark">{darkPart}</span>
            <span className="mk-h-light">{lightPart}</span>
            {!isDone && <span className="mk-cursor-blink" aria-hidden>|</span>}
          </h2>

          <div className="mk-btn-border-wrap">
            <a href="/contact" className="mk-btn-project">
              Start Project
              <svg
                width="18" height="18"
                viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="mk-pointer-row">
            {/* Cursor SVG */}
            <svg width="28" height="32" viewBox="0 0 28 32" fill="none">
              <path
                d="M4 2L4 26L9 20L13.5 30L16.5 28.5L12 18.5L20 18.5Z"
                fill="#A068FF"
                stroke="#A068FF"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </svg>
            <span className="mk-pointer-label">David</span>
          </div>
        </div>

        {/* Right – orbit circles */}
        <div className="mk-hero-right">
          <div className="mk-orbit-wrap">
            {/* Rings */}
            <div className="mk-ring mk-ring--0" />
            <div className="mk-ring mk-ring--1" />
            <div className="mk-ring mk-ring--2" />
            <div className="mk-ring mk-ring--3" />

            {/* Center count */}
            <div className="mk-orbit-center">
              <span className="mk-orbit-count">{count}k+</span>
              <span className="mk-orbit-label">Specialists</span>
            </div>

            {/* Avatars */}
            {AVATAR_DATA.map((av, i) => {
              const { tx, ty } = avTranslate(av.angle, av.radius)
              return (
                <div
                  key={i}
                  className="mk-avatar"
                  style={{
                    '--av-tx': tx,
                    '--av-ty': ty,
                    animationDelay: `${av.delay}s`,
                  } as React.CSSProperties}
                >
                  <img
                    src={av.src}
                    alt=""
                    style={{
                      width:        av.size,
                      height:       av.size,
                      borderRadius: av.br,
                      border:       `2px solid ${av.glow}99`,
                      boxShadow:    `0 0 18px ${av.glow}88, 0 0 40px ${av.glow}44`,
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Logo ticker ── */}
      <div className="mk-ticker-wrap">
        <div className="mk-ticker-inner">
          <div className="mk-ticker-track">
            {logoSet.map((src, i) => (
              <img key={i} src={src} alt="" className="mk-ticker-logo" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
