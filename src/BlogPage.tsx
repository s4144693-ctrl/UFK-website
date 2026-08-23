import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'
import { useBlogPosts } from './lib/blogData'

/* ── Corner brackets ── */
function CornerBrackets() {
  return (
    <>
      <span className="bl-corner bl-tl" />
      <span className="bl-corner bl-tr" />
      <span className="bl-corner bl-bl" />
      <span className="bl-corner bl-br" />
    </>
  )
}

/* ── Video wrapper with hover effects ── */
function VideoCard({ src, aspectRatio = false }: { src: string; aspectRatio?: boolean }) {
  return (
    <div className={`bl-video-wrapper${aspectRatio ? ' bl-aspect' : ''}`}>
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="bl-video"
      />
      <div className="bl-overlay" />
      <div className="bl-plus-circle">
        <span className="bl-plus-icon">+</span>
      </div>
      <CornerBrackets />
    </div>
  )
}

/* ── Category badge ── */
function CategoryBadge({ label, color }: { label: string; color: string }) {
  return (
    <span className="bl-badge" style={{ background: color }}>
      {label}
    </span>
  )
}

/* ── Main Blog Page ── */
export default function BlogPage() {
  const { posts, loading } = useBlogPosts()

  const featured = posts.find(p => p.type === 'featured')
  const grid     = posts.filter(p => p.type === 'grid')

  return (
    <div className="bl-page">
      <SiteNav />

      <div className="bl-container">

        {/* ── Header ── */}
        <div className="bl-header-top">
          <span className="bl-section-badge">Blog</span>
          <h1 className="bl-heading">Behind the lens</h1>
        </div>

        <div className="bl-header-bottom">
          <p className="bl-subtitle">
            Thoughts, insights, and stories from my photography journey. Take a peek
            into my creative process and recent projects.
          </p>
          <button className="bl-view-all">View all posts</button>
        </div>

        {/* ── Featured post ── */}
        {loading ? (
          <div className="bl-skeleton bl-skeleton-featured" />
        ) : featured ? (
          <div className="bl-featured">
            {/* Left — video */}
            <VideoCard src={featured.video_url} />

            {/* Right — content */}
            <div className="bl-featured-content">
              {featured.badge && (
                <span className="bl-must-read">{featured.badge}</span>
              )}
              <h2 className="bl-featured-title">{featured.title}</h2>
              {featured.description && (
                <p className="bl-featured-desc">{featured.description}</p>
              )}
              <div className="bl-featured-footer">
                {featured.author && (
                  <span className="bl-author">{featured.author}</span>
                )}
                <CategoryBadge label={featured.category} color={featured.category_color} />
              </div>
            </div>
          </div>
        ) : null}

        {/* ── Grid posts ── */}
        {loading ? (
          <div className="bl-grid">
            {[1, 2, 3].map(i => <div key={i} className="bl-skeleton bl-skeleton-card" />)}
          </div>
        ) : (
          <div className="bl-grid">
            {grid.map(post => (
              <article key={post.id} className="bl-card">
                <VideoCard src={post.video_url} aspectRatio />
                <div className="bl-card-footer">
                  <h3 className="bl-card-title">{post.title}</h3>
                  <CategoryBadge label={post.category} color={post.category_color} />
                </div>
              </article>
            ))}
          </div>
        )}

      </div>

      <SiteFooter />
    </div>
  )
}
