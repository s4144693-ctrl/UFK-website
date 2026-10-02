import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'
import { PROJECTS } from './lib/projectsData'

const CATEGORIES = ['All', 'Web Development', 'Brand Design', 'Publication Design']

/* ─── Card ─── */
function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const [hovered, setHovered] = useState(false)
  const navigate  = useNavigate()
  const hasImage  = Boolean(project.image)

  return (
    <div
      className="pj-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/projects/${project.id}`)}
    >
      {/* Label row above thumbnail */}
      <div className="pj-label-row">
        <span className="pj-label-title">↗ {project.title}</span>
        <span className="pj-label-year">{project.year}</span>
      </div>

      {/* Thumbnail */}
      <div
        className="pj-thumb"
        style={hasImage
          ? { backgroundImage: `url(${project.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : { background: project.gradient }
        }
      >
        {/* Hover overlay */}
        <div
          className="pj-thumb-overlay"
          style={{ opacity: hovered ? 1 : 0 }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

/* ─── Page ─── */
export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter)

  return (
    <div style={{ background: '#04090d', minHeight: '100vh', width: '100%' }}>
      <SiteNav />

      {/* Hero header */}
      <div className="pj-hero">
        <div className="pj-hero-inner">
          <p className="pj-hero-label">Our Work</p>
          <h1 className="pj-hero-heading">
            Projects That<br />
            <span className="pj-hero-em">Define Results</span>
          </h1>
          <p className="pj-hero-sub">
            A curated selection of digital products, brand systems, and marketing
            campaigns we've crafted for ambitious clients across every industry.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="pj-filters">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`pj-filter-btn${activeFilter === cat ? ' pj-filter-btn--active' : ''}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="pj-grid-wrap">
        <div className="pj-grid">
          {filtered.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
