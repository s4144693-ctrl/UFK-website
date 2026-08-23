import { Link } from 'react-router-dom'
import { useBlogPosts, type BlogPost } from './lib/blogData'

/* ── Category badge ── */
function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span className="bpv-badge" style={{ background: color }}>
      {label}
    </span>
  )
}

/* ── Single preview card ── */
function PreviewCard({ post }: { post: BlogPost }) {
  return (
    <Link to="/blog" className="bpv-card">
      {/* Video thumbnail */}
      <div className="bpv-thumb">
        <video
          src={post.video_url}
          autoPlay
          loop
          muted
          playsInline
          className="bpv-video"
        />
        <div className="bpv-overlay" />
        <Badge label={post.category} color={post.category_color} />
      </div>

      {/* Text */}
      <div className="bpv-body">
        <h3 className="bpv-title">{post.title}</h3>
        {post.description && (
          <p className="bpv-desc">{post.description}</p>
        )}
        <span className="bpv-read">Read more →</span>
      </div>
    </Link>
  )
}

/* ── Section ── */
export default function BlogPreviewSection() {
  const { posts, loading } = useBlogPosts()

  /* Show first 3 posts regardless of type */
  const preview = posts.slice(0, 3)

  return (
    <section className="bpv-section">
      {/* Header */}
      <div className="bpv-header">
        <div className="bpv-header-left">
          <p className="bpv-label">From Our Blog</p>
          <h2 className="bpv-heading">Insights &amp; Stories</h2>
        </div>
        <Link to="/blog" className="bpv-view-all">
          View all posts →
        </Link>
      </div>

      {/* Cards */}
      {loading ? (
        <div className="bpv-grid">
          {[1, 2, 3].map(i => (
            <div key={i} className="bpv-skeleton" />
          ))}
        </div>
      ) : (
        <div className="bpv-grid">
          {preview.map(post => (
            <PreviewCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  )
}
