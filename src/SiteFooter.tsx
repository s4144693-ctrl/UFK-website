import { motion } from 'motion/react'
import { Link } from 'react-router-dom'

const LINKS = {
  Company: [
    { label: 'About Us',    to: '/about' },
    { label: 'Projects',    to: '/clients' },
    { label: 'Industries',  to: '/industries' },
    { label: 'Clients',     to: '/clients' },
    { label: 'Contact',     to: '/contact' },
  ],
  Services: [
    { label: 'Branding & Design',      to: '/services/branding' },
    { label: 'Digital Marketing',       to: '/services/marketing' },
    { label: 'Web & App Development',  to: '/services/development' },
    { label: 'Proposal Writing',        to: '/services/proposals' },
    { label: 'Aviation Services',       to: '/services/aviation' },
    { label: 'SME Support',             to: '/services/sme' },
  ],
  Contact: [
    { label: 'Get in Touch',     to: '/contact' },
    { label: 'Book a Call',      to: '/contact' },
    { label: 'Start a Project',  to: '/contact' },
  ],
}

const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4.5"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

export default function SiteFooter({ light = false }: { light?: boolean }) {
  const inner = (
    <div className="footer-stage">
      <div className="footer-blob footer-blob-1" />
      <div className="footer-blob footer-blob-2" />
      <div className="footer-blob footer-blob-3" />

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
              <img src="/logo.webp" alt="UFK Solutions" height="36" style={{ height: '36px', width: 'auto', display: 'block' }} />
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
                    <li key={item.label}>
                      <Link to={item.to} className="footer-link">{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="footer-bottom">
          <p className="footer-credit">Made with love by UFK Solutions</p>
          <div className="footer-socials">
            <span className="footer-social-label">Join the Journey:</span>
            <div className="footer-social-icons">
              <a href="https://www.instagram.com/ufksolutions" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                <InstagramIcon />
              </a>
              <a href="https://www.linkedin.com/company/ufksolutions" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )

  if (!light) return inner

  return (
    <div className="footer-light-wrap">
      {inner}
    </div>
  )
}
