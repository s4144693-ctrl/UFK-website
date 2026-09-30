import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'

/* ─── All real client logos ─── */
const CLIENTS = [
  { file: 'asset-41.png', name: 'Avyanna Aviation' },
  { file: 'asset-60.png', name: 'Vision Flying Training' },
  { file: 'asset-59.png', name: 'Adani Defence & FSTC' },
  { file: 'asset-34.png', name: 'ArZan Energy' },
  { file: 'asset-55.png', name: 'JKMSF' },
  { file: 'asset-47.png', name: 'BizLaw' },
  { file: 'asset-38.png', name: 'Pacific Consulting' },
  { file: 'asset-40.png', name: 'Nets' },
  { file: 'asset-37.png', name: 'Abid Builders' },
  { file: 'asset-27.png', name: 'KMD Jewellers' },
  { file: 'asset-35.png', name: 'Marilyn Resort' },
  { file: 'asset-44.png', name: 'The Grand Kaisar' },
  { file: 'asset-48.png', name: 'The Kaisar' },
  { file: 'asset-58.png', name: 'The Qila' },
  { file: 'asset-43.png', name: 'Le Garden Banquets' },
  { file: 'logo-1.png',   name: 'Dreamland Vows' },
  { file: 'asset-52.png', name: 'Zareef' },
  { file: 'asset-45.png', name: 'House Of Nur' },
  { file: 'asset-42.png', name: 'Daljit Sudan' },
  { file: 'asset-49.png', name: 'The Sarai' },
  { file: 'logo-9.png',   name: 'The Silver Woods' },
  { file: 'logo-4.png',   name: 'Wanderlust Cottages' },
  { file: 'asset-32.png', name: 'The Locale Shack' },
  { file: 'asset-31.png', name: 'Nirvana Holidays' },
  { file: 'asset-51.png', name: 'BTC Travels' },
  { file: 'asset-53.png', name: 'Shikara Travels' },
  { file: 'asset-50.png', name: 'Sea & Sky Travel' },
  { file: 'asset-56.png', name: 'Vibgyor Travels' },
  { file: 'logo-8.png',   name: 'The Navigator' },
  { file: 'asset-36.png', name: 'Abyad' },
  { file: 'asset-30.png', name: 'Veggie Delight' },
  { file: 'asset-33.png', name: 'Flavour Hub' },
  { file: 'asset-46.png', name: 'Rolls Rice' },
  { file: 'asset-57.png', name: 'Tiffin Aaw' },
  { file: 'asset-29.png', name: 'One Stop' },
  { file: 'asset-39.png', name: 'Pashm-e-Kash' },
  { file: 'logo-5.png',   name: 'OBBA' },
  { file: 'logo-6.png',   name: 'Hyémath Kashmir' },
  { file: 'asset-54.png', name: 'Exceptional Academy' },
  { file: 'logo-3.png',   name: 'QUL' },
  { file: 'logo-10.png',  name: 'Value Agra' },
  { file: 'logo-7.png',   name: 'Coral Quartz' },
  { file: 'logo2.png',    name: 'Nifty Focus' },
  { file: 'asset-28.png', name: 'EH' },
]

const STATS = [
  { value: '44+',  label: 'Clients Served' },
  { value: '340+', label: 'Projects Delivered' },
  { value: '98%',  label: 'Retention Rate' },
  { value: '8+',   label: 'Years in Business' },
]

const TESTIMONIALS = [
  {
    quote: 'Working with this team completely transformed how we present ourselves to the market. The rebrand drove a 40% increase in inbound leads within three months.',
    author: 'Ravi Sharma',
    role: 'CEO, ArZan Energy',
    initials: 'RS',
  },
  {
    quote: "They don't just execute — they think strategically. Our platform launched ahead of schedule and exceeded every performance benchmark we set.",
    author: 'Aamir Bhat',
    role: 'Director, Avyanna Aviation Academy',
    initials: 'AB',
  },
  {
    quote: 'The digital presence they built for Nirvana Holidays has been a game-changer. We went from near-zero online presence to our best booking season ever.',
    author: 'Tariq Mir',
    role: 'Founder, Nirvana Holidays',
    initials: 'TM',
  },
]

export default function ClientsPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="cl2-page">
      <SiteNav theme="light" />

      {/* ══ HERO + ICON CLOUD ═══════════════════════════════════════════════ */}
      <section className="cl2-hero-wall">
        <div className="cl2-hero-inner">

          {/* Left: text */}
          <div className="cl2-hero-text">
            <span className="cl2-eyebrow">Our Clients</span>
            <h1 className="cl2-h1">
              Trusted by<br />
              <span className="cl2-h1-dim">44+ brands</span>
            </h1>
            <p className="cl2-hero-desc">
              From aviation and hospitality to food, retail and government — we
              partner with businesses that have big ambitions and the drive to
              achieve them.
            </p>
            <Link to="/contact" className="cl2-hero-btn">
              Work with us →
            </Link>
          </div>

          {/* Right: icon grid */}
          <div className="cl2-icon-cloud">
            {CLIENTS.map((c, i) => (
              <div
                key={c.file}
                className="cl2-icon-card"
                style={{ '--ci': i } as React.CSSProperties}
              >
                <div className="cl2-icon-img-wrap">
                  <img
                    src={`/clients/${c.file}`}
                    alt={c.name}
                    className="cl2-icon-img"
                    loading="lazy"
                  />
                </div>
                <span className="cl2-icon-name">{c.name}</span>
              </div>
            ))}
          </div>

        </div>
        {/* Bottom fade overlay */}
        <div className="cl2-wall-fade" />
      </section>

      {/* ══ STATS BAND ════════════════════════════════════════════════════════ */}
      <div className="cl2-stats-band">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="cl2-stat"
            style={{ borderLeft: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.08)' }}
          >
            <div className="cl2-stat-num">{s.value}</div>
            <div className="cl2-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ══ TESTIMONIALS ══════════════════════════════════════════════════════ */}
      <section className="cl2-testi-section">
        <div className="cl2-testi-head">
          <span className="cl2-section-eyebrow">CLIENT STORIES</span>
          <h2 className="cl2-section-h2">What our clients say</h2>
        </div>
        <div className="cl2-testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="cl2-testi-card">
              <div className="cl2-testi-quote-mark">"</div>
              <p className="cl2-testi-quote">{t.quote}</p>
              <div className="cl2-testi-author">
                <div className="cl2-testi-avatar">{t.initials}</div>
                <div>
                  <div className="cl2-testi-name">{t.author}</div>
                  <div className="cl2-testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════════════════════ */}
      <section className="cl2-cta-section">
        <div className="cl2-cta-inner">
          <span className="cl2-section-eyebrow" style={{ color: '#b2ff59' }}>GET STARTED</span>
          <h2 className="cl2-cta-h2">Ready to join them?</h2>
          <p className="cl2-cta-sub">
            Let's build something remarkable together. Tell us about your project.
          </p>
          <Link to="/contact" className="cl2-cta-btn">Start a Conversation →</Link>
        </div>
      </section>

      <div className="cl2-footer-wrap">
        <SiteFooter />
      </div>
    </div>
  )
}
