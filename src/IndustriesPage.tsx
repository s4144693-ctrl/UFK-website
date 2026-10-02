import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'
import TestimonialsSection from './TestimonialsSection'

/* ─── Data ─── */
const INDUSTRIES = [
  {
    num: '01',
    name: 'Aviation',
    desc: 'Aviation is a field built on trust, precision and ambition, and its marketing needs the same care. UFK Solutions helps aviation academies, training institutes and operators reach the right students and clients with focused campaigns and professional content. We understand long decision cycles, high-value admissions and the importance of credibility.',
    tags: ['Flight Training Academies', 'Cabin Crew Institutes', 'Charter Operators', 'Aviation Proposals'],
    photo: '/AdobeStock_352497773.jpeg',
    link: '/industries/aviation',
  },
  {
    num: '02',
    name: 'Travel & Hospitality',
    desc: 'Travel and hospitality businesses sell experiences, and people choose them based on what they see and feel online. UFK Solutions creates visual, engaging content and well-timed campaigns that turn attention into bookings. We manage your social presence and keep your brand in front of travellers when they are ready to plan.',
    tags: ['Hotels & Resorts', 'Tourism Campaigns', 'Events & Entertainment', 'Enquiry Management'],
    photo: '/AdobeStock_2174510793.jpeg',
  },
  {
    num: '03',
    name: 'Health & Wellness',
    desc: 'In health and wellness, people look for trust before they make a choice. UFK Solutions helps care providers and wellness brands communicate with clarity, empathy and responsibility. Our content educates, reassures and guides people toward booking an appointment or joining a programme.',
    tags: ['Hospitals & Clinics', 'Gyms & Wellness Centres', 'Health Awareness', 'Patient Content'],
    photo: '/AdobeStock_690942416.jpeg',
  },
  {
    num: '04',
    name: 'Education & Social Impact',
    desc: 'Institutions and organisations that serve the public need to communicate clearly, consistently and with purpose. UFK Solutions helps schools, public bodies and non-profits reach students, citizens and supporters with campaigns that inform and inspire action.',
    tags: ['Schools & Colleges', 'Government Programmes', 'NGOs & Non-profits', 'Admissions Campaigns'],
    photo: '/campaign.png',
  },
  {
    num: '05',
    name: 'Business & Professional Services',
    desc: 'For professional and service-led businesses, reputation is everything. UFK Solutions helps firms present their expertise with credibility, build trust online and win new clients. We combine professional branding with well-crafted proposals and focused lead generation.',
    tags: ['Proposal Development', 'Banking & Finance', 'Legal & CA Firms', 'Technology Startups'],
    photo: '/business%20proposal.jpeg',
  },
  {
    num: '06',
    name: 'Retail, Property & Automotive',
    desc: 'Businesses that sell directly to customers need a steady flow of footfall, site visits and sales. UFK Solutions runs high-performing campaigns and eye-catching content that keep your products and offers in front of buyers. We track every lead so your sales team can close faster.',
    tags: ['Retail & E-commerce', 'Real Estate', 'Automotive Dealerships', 'Product Campaigns'],
    photo: '/property.jpeg',
  },
  {
    num: '07',
    name: 'Industry & Infrastructure',
    desc: 'Industrial and infrastructure businesses often do outstanding work that the market never sees. UFK Solutions helps these companies showcase their capabilities, build a strong brand and reach new buyers, partners and customers through professional content and B2B outreach.',
    tags: ['Manufacturing', 'Logistics & Transport', 'Energy & Solar', 'Agriculture'],
    photo: '/industry%20and%20infrastructure.png',
  },
  {
    num: '08',
    name: 'Publications & Media',
    desc: 'Great content deserves a great audience. UFK Solutions helps publishers, authors and media brands grow their readership, promote new releases and build a loyal community around their work. We combine creative promotion with a consistent digital presence.',
    tags: ['Book Publishers', 'Newspapers & Magazines', 'Authors & Writers', 'Digital Media'],
    photo: '/publication.png',
  },
]

export default function IndustriesPage() {
  const [active, setActive] = useState<number | null>(null)
  const navigate = useNavigate()

  return (
    <div className="ind-page">
      <SiteNav />

      {/* ── Hero ── */}
      <section className="ind-hero">
        <p className="ind-hero-label">Industries We Serve</p>
        <h1 className="ind-hero-h1">
          Deep expertise across<br />
          <span className="ind-hero-accent">every sector</span>
        </h1>
        <p className="ind-hero-sub">
          Every industry speaks to its audience differently. We shape our social media,
          advertising, content and proposal work around the way your customers think,
          search and decide.
        </p>
      </section>

      {/* ── Grid ── */}
      <div className="ind-grid-wrap">
        <div className="ind-grid">
          {INDUSTRIES.map((ind, i) => (
            <div
              key={ind.num}
              className={`ind-card${active === i ? ' ind-card--active' : ''}${ind.photo ? ' ind-card--has-photo' : ''}${ind.link ? ' ind-card--linked' : ''}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onClick={() => ind.link && navigate(ind.link)}
            >
              {ind.photo && (
                <>
                  <div className="ind-card-photo" style={{ backgroundImage: `url(${ind.photo})` }} />
                  <div className="ind-card-photo-overlay" />
                </>
              )}
              <div className="ind-card-top">
                <span className="ind-num">{ind.num}</span>
              </div>
              <h3 className="ind-name">{ind.name}</h3>
              <p className="ind-desc">{ind.desc}</p>
              <div className="ind-tags">
                {ind.tags.map(t => (
                  <span key={t} className="ind-tag">{t}</span>
                ))}
              </div>
              <div className="ind-card-arrow">→</div>
            </div>
          ))}
          {/* Filler to prevent empty grid cell showing border colour */}
          <div className="ind-card-filler" />
        </div>
      </div>

      {/* ── Testimonials ── */}
      <TestimonialsSection />

      {/* ── CTA ── */}
      <div className="ind-cta">
        <p className="ind-cta-sub">Don't see your industry?</p>
        <h2 className="ind-cta-h2">Our approach works across sectors.<br />Let's talk about growing your business.</h2>
        <a href="/contact" className="ind-cta-btn">
          Let's talk
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <SiteFooter />
    </div>
  )
}
