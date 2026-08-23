import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'
import { PROJECTS } from './lib/projectsData'

/* ─── Scaled iframe for full-site preview ─── */
function SiteEmbed({ url, accent }: { url: string; accent: string }) {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const NATURAL_W = 1440   // desktop viewport width the site is designed for
  const NATURAL_H = 8000   // generous height to capture the full page scroll

  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const update = () => {
      const s = el.clientWidth / NATURAL_W
      setScale(s)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={wrapRef}
      className="pd-embed-outer"
      style={{ height: NATURAL_H * scale }}
    >
      <iframe
        ref={iframeRef}
        src={url}
        title="Project site preview"
        className="pd-embed-iframe"
        style={{
          width:            NATURAL_W,
          height:           NATURAL_H,
          transform:        `scale(${scale})`,
          transformOrigin:  'top left',
          pointerEvents:    'none',
          border:           'none',
        }}
        sandbox="allow-scripts allow-same-origin"
      />
      {/* Subtle accent glow at the bottom edge */}
      <div
        className="pd-embed-glow"
        style={{ background: `linear-gradient(to top, ${accent}18, transparent)` }}
      />
    </div>
  )
}

/* ─── Branding image gallery ─── */
function BrandingGallery({ images, layout = 'default', gridPairStart }: { images: string[], layout?: 'default' | 'first-full-then-2col' | '2col-then-full' | 'full-then-wide-pair', gridPairStart?: number }) {
  if (layout === 'full-then-wide-pair') {
    const pairIdx = gridPairStart ?? images.length - 2
    const before = images.slice(0, pairIdx)
    const pair   = images.slice(pairIdx, pairIdx + 2)
    const after  = images.slice(pairIdx + 2)
    const renderItem = (src: string, i: number) => (src.endsWith('.mp4') || src.endsWith('.m3u8'))
      ? <video src={src} autoPlay muted loop playsInline className="pd-gallery-img" style={{ width: '100%', display: 'block', borderRadius: '12px' }} onCanPlay={e => { (e.target as HTMLVideoElement).playbackRate = 2 }} />
      : <img src={src} alt={`Project image ${i + 1}`} className="pd-gallery-img" />
    return (
      <div className="pd-gallery">
        {before.map((src, i) => (
          <div key={i} className="pd-gallery-item">{renderItem(src, i)}</div>
        ))}
        <div className="pd-gallery-2col pd-gallery-2col--wide-left">
          {pair.map((src, i) => (
            <div key={i} className="pd-gallery-item">{renderItem(src, before.length + i)}</div>
          ))}
        </div>
        {after.map((src, i) => (
          <div key={i} className="pd-gallery-item">{renderItem(src, before.length + 2 + i)}</div>
        ))}
      </div>
    )
  }

  if (layout === '2col-then-full') {
    const [first, second, ...tail] = images
    return (
      <div className="pd-gallery">
        {(first || second) && (
          <div className="pd-gallery-2col">
            {[first, second].filter(Boolean).map((src, i) => (
              <div key={i} className="pd-gallery-item">
                <img src={src} alt={`Project image ${i + 1}`} className="pd-gallery-img" />
              </div>
            ))}
          </div>
        )}
        {tail.map((src, i) => (
          <div key={i} className="pd-gallery-item">
            <img src={src} alt={`Project image ${i + 3}`} className="pd-gallery-img" />
          </div>
        ))}
      </div>
    )
  }

  if (layout === 'first-full-then-2col') {
    const [first, second, third, ...tail] = images
    return (
      <div className="pd-gallery">
        <div className="pd-gallery-item">
          <img src={first} alt="Project image 1" className="pd-gallery-img" />
        </div>
        {(second || third) && (
          <div className="pd-gallery-2col pd-gallery-2col--crop">
            {[second, third].filter(Boolean).map((src, i) => (
              <div key={i} className="pd-gallery-item pd-gallery-item--fixed-h">
                <img src={src} alt={`Project image ${i + 2}`} className="pd-gallery-img pd-gallery-img--cover" />
              </div>
            ))}
          </div>
        )}
        {tail.map((src, i) => (
          <div key={i} className="pd-gallery-item">
            <img src={src} alt={`Project image ${i + 4}`} className="pd-gallery-img" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="pd-gallery">
      {images.map((src, i) => (
        <div key={i} className="pd-gallery-item">
          {(src.endsWith('.mp4') || src.endsWith('.m3u8')) ? (
            <video src={src} autoPlay muted loop playsInline className="pd-gallery-img" style={{ width: '100%', display: 'block', borderRadius: '12px' }} onCanPlay={e => { (e.target as HTMLVideoElement).playbackRate = 2 }} />
          ) : (
            <img src={src} alt={`Project image ${i + 1}`} className="pd-gallery-img" />
          )}
        </div>
      ))}
    </div>
  )
}

/* ─── Placeholder screenshot slots ─── */
function PlaceholderAssets() {
  const blocks = [
    { label: 'Screenshot 1', w: 'full' },
    { label: 'Screenshot 2', w: 'half' },
    { label: 'Screenshot 3', w: 'half' },
    { label: 'Screenshot 4', w: 'half' },
    { label: 'Screenshot 5', w: 'half' },
  ]
  return (
    <div className="pd-placeholder-grid">
      {blocks.map((b) => (
        <div
          key={b.label}
          className={`pd-placeholder-block pd-placeholder-block--${b.w}`}
        >
          <div className="pd-placeholder-inner">
            <div className="pd-placeholder-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                <rect x="3" y="3" width="18" height="18" rx="3"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
            <p className="pd-placeholder-label">{b.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Page ─── */
export default function ProjectDetailPage() {
  const { id }   = useParams<{ id: string }>()
  const navigate = useNavigate()
  const project  = PROJECTS.find(p => String(p.id) === id)

  /* Scroll to top on mount */
  useEffect(() => { window.scrollTo(0, 0) }, [id])

  /* Override body background for this page */
  useEffect(() => {
    const prev = document.body.style.background
    document.body.style.background = project?.pageBg ?? '#ffffff'
    return () => { document.body.style.background = prev }
  }, [project?.pageBg])

  if (!project) {
    return (
      <div style={{ background: '#020d05', minHeight: '100vh', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}>Project not found</p>
          <button className="pd-back-btn" onClick={() => navigate('/projects')}>← Back to Projects</button>
        </div>
      </div>
    )
  }

  return (
    <div className={`pd-page${project.wideSpacing ? ' pd-page--wide' : ''}`} style={project.pageBg ? { background: project.pageBg } : undefined}>
      <SiteNav theme="light" />

      {/* ── Back breadcrumb ── */}
      <div className="pd-breadcrumb">
        <button className="pd-back-btn" onClick={() => navigate('/projects')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          All Projects
        </button>
      </div>

      {/* ── Project header ── */}
      <header className="pd-header">
        <div className="pd-header-inner">
          <div className="pd-header-meta">
            <span className="pd-header-category" style={{ color: project.accent }}>
              {project.category}
            </span>
            <span className="pd-header-sep" />
            <span className="pd-header-year">{project.year}</span>
          </div>
          <h1 className="pd-header-title">{project.title}</h1>
          <p className="pd-header-desc">{project.desc}</p>
          <div className="pd-header-tags">
            {project.tags.map(t => (
              <span key={t} className="pd-header-tag" style={{ borderColor: `${project.accent}40`, color: project.accent }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="pd-main">

        {/* Cover image */}
        <section className="pd-cover-section">
          {project.image ? (
            <div className="pd-cover-wrap">
              <img
                src={project.image}
                alt={`${project.title} cover`}
                className="pd-cover-img"
                style={project.coverZoom ? {
                  transform: `scale(${project.coverZoom})`,
                  transformOrigin: 'center center',
                } : undefined}
              />
              <div
                className="pd-cover-border"
                style={{ borderColor: `${project.accent}28` }}
              />
            </div>
          ) : (
            <div
              className="pd-cover-placeholder"
              style={{ background: project.gradient }}
            >
              <span style={{ color: project.accent, fontSize: '1rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {project.title}
              </span>
            </div>
          )}
        </section>

        {/* Post-cover image */}
        {project.postCoverImage && (
          <section className="pd-cover-section">
            <div className="pd-cover-wrap">
              <img src={project.postCoverImage} alt={`${project.title} mockup`} className="pd-cover-img" />
              <div className="pd-cover-border" style={{ borderColor: `${project.accent}28` }} />
            </div>
          </section>
        )}

        {/* Video */}
        {project.video && (
          <section className="pd-cover-section">
            <div className="pd-cover-wrap">
              <video
                src={project.video}
                autoPlay
                muted
                loop
                playsInline
                className="pd-cover-img"
                style={{ width: '100%', display: 'block', borderRadius: '12px' }}
                onCanPlay={e => { (e.target as HTMLVideoElement).playbackRate = 1 }}
              />
              <div
                className="pd-cover-border"
                style={{ borderColor: `${project.accent}28` }}
              />
            </div>
          </section>
        )}

        {/* Placeholder text below cover */}
        <section className="pd-intro-section">
          <p className="pd-intro-line">
            A showcase of the complete design and development work delivered for {project.title} — spanning strategy, visual identity, and implementation.
          </p>
          <p className="pd-intro-line pd-intro-line--muted">
            Scroll down to explore the full scope of the project, from initial concepts through to the final live experience.
          </p>
        </section>

        {/* Assets */}
        <section className="pd-assets-section">
          {project.siteUrl && <SiteEmbed url={project.siteUrl} accent={project.accent} />}
          {project.images && <BrandingGallery images={project.images} layout={project.imageLayout} gridPairStart={project.gridPairStart} />}
          {!project.images && <PlaceholderAssets />}
        </section>

      </main>

      <SiteFooter />
    </div>
  )
}
