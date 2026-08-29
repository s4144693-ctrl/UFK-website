import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SiteNav({ theme = 'dark' }: { theme?: 'dark' | 'light' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => setMenuOpen(o => !o)

  return (
    <nav className={`nav${theme === 'light' ? ' nav--light' : ''}`}>
      <a href="/" className="nav-logo">
        <img src="/logo.webp" alt="Xero" height="28" />
      </a>

      <div className={`nav-menu${menuOpen ? ' active' : ''}`}>
        <ul className="nav-links">
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/industries">Industries</Link></li>
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
