import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function SiteNav({ theme = 'dark' }: { theme?: 'dark' | 'light' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleMenu = () => setMenuOpen(o => !o)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav${theme === 'light' ? ' nav--light' : ''}${scrolled ? ' nav--scrolled' : ''}`}>
      <a href="/" className="nav-logo">
        <img src="/logo.webp" alt="Xero" height="28" />
      </a>

      <div className={`nav-menu${menuOpen ? ' active' : ''}`}>
        <ul className="nav-links">
          <li className="nav-has-dropdown">
            <span className="nav-services-trigger">
              <span>Services</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="nav-dropdown">
              <div className="nav-dropdown-inner">
                <Link to="/services/software-development" className="nav-dd-item">Software Development</Link>
                <Link to="/services/web-development" className="nav-dd-item">Web Development</Link>
                <Link to="/services/digital-transformation" className="nav-dd-item">Automation Development</Link>
                <Link to="/services/branding" className="nav-dd-item">Branding</Link>
                <Link to="/services/marketing" className="nav-dd-item">Marketing</Link>
                <Link to="/services/proposal-development" className="nav-dd-item">Proposal Development</Link>
              </div>
            </div>
          </li>
          <li className="nav-has-dropdown">
            <span className="nav-services-trigger">
              <span>Industries</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="nav-dropdown">
              <div className="nav-dropdown-inner">
                <Link to="/industries" className="nav-dd-item">All Industries</Link>
                <Link to="/industries/aviation" className="nav-dd-item">Aviation</Link>
              </div>
            </div>
          </li>
          <li><Link to="/clients">Clients</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/blog">Blogs</Link></li>
        </ul>
        <div className="nav-actions">
          <Link to="/contact" className="btn-contact" aria-label="Contact us">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <polyline points="2,4 12,13 22,4"/>
            </svg>
            Contact
          </Link>
        </div>
      </div>

      <button
        className={`menu-toggle${menuOpen ? ' active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
      </button>
    </nav>
  )
}
