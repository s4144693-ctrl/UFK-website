import { motion } from 'motion/react'
import { Music2, Globe, Share2, PlayCircle, Camera } from 'lucide-react'

const LINKS = {
  Discover: [
    'Labs & Workshops',
    'Deep Dive Series',
    'Global Circle',
    'Resource Vault',
    'Future Roadmap',
  ],
  'The Mission': [
    'Origin Story',
    'The Collective',
    'Newsroom Hub',
    'Join the Team',
  ],
  Concierge: [
    'Get in Touch',
    'Legal Privacy',
    'User Agreement',
    'Report Concern',
  ],
}

export default function SiteFooter() {
  return (
    /* ── Outer wrapper: mesh gradient stage ── */
    <div className="footer-stage">

      {/* Animated green mesh blobs */}
      <div className="footer-blob footer-blob-1" />
      <div className="footer-blob footer-blob-2" />
      <div className="footer-blob footer-blob-3" />

      {/* Glass card */}
      <motion.footer
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
        className="liquid-glass footer-card"
      >
        {/* ── Top Grid ── */}
        <div className="footer-top-grid">

          {/* Brand column */}
          <div className="footer-brand-col">
            <div className="footer-logo">
              <img src="/logo.png" alt="Xero" height="36" style={{ height: '36px', width: 'auto', display: 'block' }} />
            </div>
            <p className="footer-desc">
              Designing products, powering ecosystems and laying the foundation of a
              decentralized web for enterprises, builders and communities alike.
            </p>
          </div>

          {/* Links columns */}
          <div className="footer-links-grid">
            {Object.entries(LINKS).map(([heading, items]) => (
              <div key={heading} className="footer-link-col">
                <p className="footer-link-heading">{heading}</p>
                <ul>
                  {items.map(item => (
                    <li key={item}>
                      <a href="#" className="footer-link">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="footer-bottom">
          <p className="footer-credit">Curated by @GotInGeorgiG</p>
          <div className="footer-socials">
            <span className="footer-social-label">Join the Journey:</span>
            <div className="footer-social-icons">
              {[Music2, Globe, Share2, PlayCircle, Camera].map((Icon, i) => (
                <a key={i} href="#" className="footer-social-icon">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
