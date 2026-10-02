import { useRef, useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { NeatGradient } from '@firecms/neat'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'
import DTHeroBackground from './DTHeroBackground'

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface SubService {
  title: string
  desc: string
}

interface Benefit {
  icon: string
  title: string
  desc: string
}

interface Stat {
  num: string
  label: string
}

interface ServiceData {
  label: string
  headline: string
  description: string
  color: string
  subServices: SubService[]
  benefits: Benefit[]
  process: string[]
  stats: Stat[]
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const services: Record<string, ServiceData> = {
  'software-development': {
    label: 'Software Development',
    headline: 'Custom Software That Scales With Your Ambition',
    description:
      'We engineer robust, future-ready software — from native mobile apps and cloud-native platforms to legacy transformations — built to perform at every stage of your growth.',
    color: '#b2ff59',
    subServices: [
      {
        title: 'iOS App Development',
        desc: 'We craft high-performance, pixel-perfect iOS applications that deliver seamless user experiences on every Apple device.',
      },
      {
        title: 'Android App Development',
        desc: 'Our Android apps are engineered for reliability and speed across the full spectrum of Android devices and OS versions.',
      },
      {
        title: 'Flutter Applications',
        desc: 'Build once, deploy everywhere — our Flutter specialists deliver beautiful cross-platform apps from a single codebase.',
      },
      {
        title: 'React Native Development',
        desc: 'We leverage React Native to ship truly native-feeling mobile apps with accelerated development timelines.',
      },
      {
        title: 'Enterprise Applications',
        desc: 'Scalable, secure enterprise software built to handle complex workflows, large data volumes, and diverse user roles.',
      },
      {
        title: 'Cloud Native Applications',
        desc: 'We design and build cloud-first applications leveraging microservices, containers, and serverless architectures.',
      },
      {
        title: 'ERP Software Solutions',
        desc: 'Custom or configurable ERP implementations that unify your operations, finance, and supply chain in one platform.',
      },
      {
        title: 'API Development',
        desc: 'Robust RESTful and GraphQL APIs designed for performance, security, and seamless third-party integrations.',
      },
      {
        title: 'Legacy Modernization',
        desc: 'We safely migrate aging systems to modern architectures, eliminating technical debt without disrupting operations.',
      },
      {
        title: 'E-commerce Solutions',
        desc: 'End-to-end e-commerce platforms built for conversion — from storefront UX to payment processing and order management.',
      },
      {
        title: 'App Maintenance & Support',
        desc: 'Ongoing monitoring, bug fixes, performance tuning, and feature updates to keep your application running at its best.',
      },
      {
        title: 'Cloud & DevOps',
        desc: 'CI/CD pipelines, infrastructure-as-code, and cloud provisioning that accelerate deployment and reduce operational overhead.',
      },
    ],
    benefits: [
      {
        icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
        title: 'End-to-End Ownership',
        desc: 'From architecture planning to post-launch support, we own every stage of the development lifecycle so you never have to stitch teams together.',
      },
      {
        icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
        title: 'Performance by Default',
        desc: 'Every application we build is stress-tested against real-world load conditions to ensure it performs flawlessly when it matters most.',
      },
      {
        icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
        title: 'Security First',
        desc: 'Security is baked into our engineering process — not added as an afterthought — covering authentication, encryption, and compliance.',
      },
    ],
    process: ['Discovery', 'Architecture', 'Development', 'QA & Testing', 'Deployment', 'Support'],
    stats: [
      { num: '150+', label: 'Apps Delivered' },
      { num: '99.9%', label: 'Uptime SLA' },
      { num: '40%', label: 'Faster Time-to-Market' },
      { num: '8 yrs', label: 'Engineering Experience' },
    ],
  },

  'web-development': {
    label: 'Web Development',
    headline: 'Web Experiences That Convert Visitors Into Customers',
    description:
      'From blazing-fast React applications to conversion-optimised e-commerce stores, we build web solutions that look stunning, load instantly, and drive measurable business results.',
    color: '#b2ff59',
    subServices: [
      {
        title: 'Angular Web Applications',
        desc: 'Enterprise-grade Angular applications with structured architecture, strong typing, and scalable module design.',
      },
      {
        title: 'React JS Websites & Web Apps',
        desc: 'Dynamic, component-driven React experiences that deliver app-like speed and interactivity on the web.',
      },
      {
        title: 'WordPress E-commerce',
        desc: 'Custom WooCommerce solutions with tailored themes, plugins, and payment integrations for seamless online selling.',
      },
      {
        title: 'Shopify E-commerce',
        desc: 'Beautiful, high-converting Shopify stores built with custom themes, app integrations, and performance optimisation.',
      },
      {
        title: 'Custom E-commerce Development',
        desc: 'Bespoke e-commerce platforms engineered from the ground up for businesses with unique workflow and scale requirements.',
      },
      {
        title: 'Web App Maintenance',
        desc: 'Regular updates, security patches, performance improvements, and feature additions to keep your web app competitive.',
      },
      {
        title: 'Cloud Hosting & Deployment',
        desc: 'Managed hosting on AWS, GCP, or Azure with auto-scaling, CDN integration, and zero-downtime deployment pipelines.',
      },
    ],
    benefits: [
      {
        icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
        title: 'Lightning Fast Performance',
        desc: 'Core Web Vitals-optimised builds with server-side rendering, code splitting, and CDN delivery for sub-second load times.',
      },
      {
        icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
        title: 'Pixel-Perfect Design',
        desc: 'Every interface is crafted to your brand guidelines with meticulous attention to typography, spacing, and responsive behaviour.',
      },
      {
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
        title: 'SEO Ready Architecture',
        desc: 'Semantic HTML, structured data, and technical SEO foundations built directly into the codebase for maximum search visibility.',
      },
    ],
    process: ['Brief & Scope', 'Wireframing', 'UI Design', 'Development', 'Testing', 'Launch'],
    stats: [
      { num: '200+', label: 'Websites Launched' },
      { num: '3x', label: 'Average Traffic Growth' },
      { num: '98', label: 'Avg Lighthouse Score' },
      { num: '5 yrs', label: 'Web Expertise' },
    ],
  },

  'digital-transformation': {
    label: 'Digital Transformation',
    headline: 'Automate the Ordinary. Focus on the Extraordinary.',
    description:
      'We help organisations reimagine their operations through AI, intelligent automation, and conversational technology — cutting costs, eliminating bottlenecks, and unlocking new revenue streams.',
    color: '#b2ff59',
    subServices: [
      {
        title: 'Chatbot Development',
        desc: 'Intelligent conversational agents that handle customer queries, qualify leads, and automate support around the clock.',
      },
      {
        title: 'RPA (Robotic Process Automation)',
        desc: 'We deploy software robots to replicate repetitive human tasks across any application, freeing your team for high-value work.',
      },
      {
        title: 'AI Development & Implementation',
        desc: 'Custom machine learning models and AI pipelines that extract actionable intelligence from your data and automate complex decisions.',
      },
    ],
    benefits: [
      {
        icon: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
        title: 'Measurable ROI',
        desc: 'Every automation initiative is mapped to a tangible business outcome — cost reduction, throughput increase, or error elimination.',
      },
      {
        icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
        title: 'Rapid Deployment',
        desc: 'Our proven implementation frameworks let us deploy production-ready automation solutions in weeks, not months.',
      },
      {
        icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
        title: 'Human-in-the-Loop Design',
        desc: 'We build AI systems with transparent decision trails and human override capabilities, ensuring trust and regulatory compliance.',
      },
    ],
    process: ['Process Audit', 'Use Case Design', 'Prototype', 'Integration', 'Training', 'Go Live'],
    stats: [
      { num: '70%', label: 'Avg Task Automation Rate' },
      { num: '3x', label: 'Productivity Gain' },
      { num: '50+', label: 'Automations Deployed' },
      { num: '24/7', label: 'Bot Uptime' },
    ],
  },

  'branding': {
    label: 'Branding',
    headline: 'Build a Brand People Remember — and Trust',
    description:
      'We create cohesive, compelling brand identities that communicate your values at a glance — spanning strategy, visual design, photography, and AI-powered creative production.',
    color: '#b2ff59',
    subServices: [
      {
        title: 'Graphic Design',
        desc: 'Striking visual assets — from marketing collateral and social media graphics to pitch decks — that make your brand impossible to ignore.',
      },
      {
        title: 'Video Reel Creation',
        desc: 'Cinematic brand reels and product videos crafted to captivate audiences and communicate your story in seconds.',
      },
      {
        title: 'Property Photography',
        desc: 'Professional real-estate and architectural photography that showcases spaces in their best light, driving inquiries and sales.',
      },
      {
        title: 'Script Writing',
        desc: 'Persuasive, on-brand scripts for videos, ads, and presentations that connect emotionally with your target audience.',
      },
      {
        title: 'Photo Post-Processing',
        desc: 'Expert retouching and colour grading that transforms raw images into polished, publication-ready visuals.',
      },
      {
        title: 'Product Photography',
        desc: 'Clean, conversion-focused product imagery optimised for e-commerce, catalogues, and advertising campaigns.',
      },
      {
        title: 'Brand Identity & Strategy',
        desc: 'Comprehensive brand foundations — logo, colour palette, typography, voice guidelines — built on market insight and brand strategy.',
      },
      {
        title: 'Stationery Design',
        desc: 'Beautifully designed business cards, letterheads, and office stationery that make a lasting first impression.',
      },
      {
        title: 'AI-Powered Design Solutions',
        desc: 'Generative AI workflows that accelerate creative production while maintaining brand consistency and quality standards.',
      },
    ],
    benefits: [
      {
        icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
        title: 'Strategy-Led Creativity',
        desc: 'Every creative decision is grounded in audience insight and competitive analysis — beauty with purpose.',
      },
      {
        icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
        title: 'Consistent Across Every Touchpoint',
        desc: 'We deliver brand guidelines and asset libraries that ensure your identity looks right everywhere — digital and print.',
      },
      {
        icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
        title: 'Fast Turnaround',
        desc: 'Streamlined creative workflows and dedicated project managers keep deliverables on schedule without sacrificing quality.',
      },
    ],
    process: ['Brand Audit', 'Strategy', 'Concepting', 'Design', 'Refinement', 'Delivery'],
    stats: [
      { num: '300+', label: 'Brand Projects' },
      { num: '95%', label: 'Client Satisfaction' },
      { num: '48h', label: 'First Concept Turnaround' },
      { num: '6 yrs', label: 'Creative Experience' },
    ],
  },

  'marketing': {
    label: 'Marketing',
    headline: 'Performance Marketing That Fills Your Pipeline',
    description:
      'We run data-driven campaigns across paid search, social, SEO, and AI-powered channels — optimising every pound of your budget to deliver qualified leads and measurable revenue growth.',
    color: '#b2ff59',
    subServices: [
      {
        title: 'Meta Ad Campaigns',
        desc: 'Targeted Facebook and Instagram campaigns that reach your ideal customer with compelling creative and precision audience segmentation.',
      },
      {
        title: 'Google Ads Campaigns',
        desc: 'High-intent search and display campaigns managed by certified specialists to maximise ROAS and minimise wasted spend.',
      },
      {
        title: 'SEO',
        desc: 'Technical, on-page, and off-page SEO strategies that build sustainable organic visibility and drive compounding traffic growth.',
      },
      {
        title: 'Email Marketing',
        desc: 'Automated email sequences and broadcast campaigns that nurture leads, recover abandoned carts, and drive repeat purchases.',
      },
      {
        title: 'AI-Powered Marketing',
        desc: 'Predictive audience modelling, dynamic creative optimisation, and AI-driven bidding strategies that outperform manual campaigns.',
      },
      {
        title: 'Google My Business Optimisation',
        desc: 'Complete GMB profile management that boosts local search rankings and drives walk-in traffic and phone enquiries.',
      },
      {
        title: 'AI Content Optimisation',
        desc: 'AI-assisted content strategies that identify high-value topics, optimise for search intent, and scale content production efficiently.',
      },
    ],
    benefits: [
      {
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
        title: 'Full-Funnel Visibility',
        desc: 'We track every campaign touchpoint from first impression to closed deal, giving you clear attribution and ROI reporting.',
      },
      {
        icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
        title: 'Agile Optimisation',
        desc: 'Weekly performance reviews and rapid creative iteration mean your campaigns continuously improve rather than plateau.',
      },
      {
        icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
        title: 'Integrated Strategy',
        desc: 'Paid, organic, email, and AI channels working in concert — no siloed tactics, just a cohesive growth engine.',
      },
    ],
    process: ['Audit', 'Strategy', 'Campaign Build', 'Launch', 'Optimise', 'Report'],
    stats: [
      { num: '4.2x', label: 'Average ROAS' },
      { num: '120+', label: 'Campaigns Managed' },
      { num: '60%', label: 'Avg Lead Cost Reduction' },
      { num: '3 yrs', label: 'PPC Expertise' },
    ],
  },
}

/* ═══════════════════════════════════════════════════════════════════════════
   1. SOFTWARE DEVELOPMENT
═══════════════════════════════════════════════════════════════════════════ */
function SoftwareDevPage({ data }: { data: ServiceData }) {
  const processDescs: Record<string, string> = {
    Discovery: 'Deep-dive sessions to understand your product vision, tech constraints, and user needs.',
    Architecture: 'System design blueprints, tech stack selection, and scalability planning before a single line is written.',
    Development: 'Agile sprints with daily standups, peer code reviews, and continuous integration from day one.',
    'QA & Testing': 'Automated test suites, load tests, and exploratory QA to ship software that holds under pressure.',
    Deployment: 'Zero-downtime releases via CI/CD pipelines, with rollback-ready infrastructure.',
    Support: 'Proactive monitoring, SLA-backed response times, and ongoing feature iteration post-launch.',
  }

  return (
    <div className="sw-page">
      <SiteNav />

      {/* ── Hero ── */}
      <section className="sw-hero">
        <div className="sw-hero-glow" aria-hidden="true" />
        <div className="sw-hero-left">
          <span className="sw-badge">Software Development</span>
          <h1 className="sw-h1">
            <span className="sw-h1-white">Custom Software</span>
            <span className="sw-h1-accent">That Scales</span>
            <span className="sw-h1-white">With You.</span>
          </h1>
          <p className="sw-desc">{data.description}</p>
          <div className="sw-hero-btns">
            <Link to="/contact" className="sdp-btn-primary">Start a Project →</Link>
          </div>
        </div>
        <div className="sw-hero-right">
          <div className="sw-laptop-wrap">
            <img src="/laptop.png" alt="Software product on laptop" className="sw-laptop-img" />
            <div className="sw-stat-card sw-stat-card-tl">
              <div className="sw-stat-card-num">150+</div>
              <div className="sw-stat-card-lbl">Apps Delivered</div>
            </div>
            <div className="sw-stat-card sw-stat-card-br">
              <div className="sw-stat-card-num">99.9%</div>
              <div className="sw-stat-card-lbl">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="sw-ticker-wrap" aria-hidden="true">
        <div className="sw-ticker-track">
          <span>SOFTWARE DEVELOPMENT · MOBILE APPS · ENTERPRISE SYSTEMS · API DEVELOPMENT · CLOUD &amp; DEVOPS · LEGACY MODERNISATION · SOFTWARE DEVELOPMENT · MOBILE APPS · ENTERPRISE SYSTEMS · API DEVELOPMENT · CLOUD &amp; DEVOPS · LEGACY MODERNISATION · </span>
        </div>
      </div>

      {/* ── Bento Grid ── */}
      <section className="sw-bento-section">
        <div className="sw-bento-inner">
          <span className="sdp-section-eyebrow">9 CAPABILITIES</span>
          <h2 className="sw-bento-h2">One team. Every layer of the stack.</h2>

          <div className="sw-bento-mosaic">

            {/* ① iOS & Android — hero tall card */}
            <div className="sw-bc sw-bc-ios">
              <div className="sw-bc-glow" />
              <div className="sw-bc-visual">
                <svg viewBox="0 0 200 280" fill="none" aria-hidden="true">
                  <g opacity="0.45" transform="rotate(-14 80 130)">
                    <rect x="22" y="18" width="82" height="148" rx="13" fill="rgba(22,22,24,0.92)" stroke="rgba(150,150,150,0.22)" strokeWidth="1.1"/>
                    <rect x="38" y="23" width="50" height="7" rx="3.5" fill="rgba(150,150,150,0.1)"/>
                    <rect x="30" y="40" width="66" height="48" rx="6" fill="rgba(150,150,150,0.06)"/>
                    <rect x="30" y="96" width="44" height="5" rx="2.5" fill="rgba(255,255,255,0.14)"/>
                    <rect x="30" y="105" width="58" height="3.5" rx="1.75" fill="rgba(255,255,255,0.08)"/>
                    <rect x="44" y="151" width="30" height="3" rx="1.5" fill="rgba(255,255,255,0.1)"/>
                  </g>
                  <rect x="70" y="28" width="92" height="164" rx="15" fill="rgba(18,18,20,0.97)" stroke="rgba(150,150,150,0.44)" strokeWidth="1.3"/>
                  <rect x="92" y="33" width="48" height="9" rx="4.5" fill="rgba(150,150,150,0.16)"/>
                  <rect x="78" y="52" width="76" height="58" rx="9" fill="rgba(150,150,150,0.08)" stroke="rgba(150,150,150,0.12)" strokeWidth="0.8"/>
                  <circle cx="116" cy="81" r="12" fill="rgba(150,150,150,0.18)" stroke="rgba(150,150,150,0.48)" strokeWidth="1"/>
                  <path d="M110 81l4 4L122 73" stroke="#b0b0b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="78" y="120" width="52" height="5" rx="2.5" fill="rgba(255,255,255,0.24)"/>
                  <rect x="78" y="129" width="70" height="4" rx="2" fill="rgba(255,255,255,0.11)"/>
                  <rect x="78" y="137" width="60" height="4" rx="2" fill="rgba(255,255,255,0.08)"/>
                  <rect x="78" y="150" width="20" height="20" rx="5" fill="rgba(150,150,150,0.1)" stroke="rgba(150,150,150,0.22)" strokeWidth="0.8"/>
                  <rect x="103" y="150" width="20" height="20" rx="5" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.09)" strokeWidth="0.8"/>
                  <rect x="128" y="150" width="20" height="20" rx="5" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.09)" strokeWidth="0.8"/>
                  <rect x="98" y="179" width="36" height="3.5" rx="1.75" fill="rgba(255,255,255,0.18)"/>
                </svg>
                <div className="sw-ios-badge">
                  <div className="sw-ios-badge-dots">
                    <div className="sw-ios-badge-dot" />
                    <div className="sw-ios-badge-dot" />
                    <div className="sw-ios-badge-dot sw-ios-badge-dot--lit" />
                  </div>
                  <div className="sw-ios-badge-stat">4.9 ★</div>
                  <div className="sw-ios-badge-lbl">App Store Rating</div>
                </div>
              </div>
              <div className="sw-bc-body">
                <span className="sw-bc-num">01</span>
                <h3 className="sw-bc-title">iOS &amp; Android Apps</h3>
                <p className="sw-bc-desc">Native mobile experiences engineered for speed, reliability, and delight across every device.</p>
              </div>
            </div>

            {/* ② Flutter Apps */}
            <div className="sw-bc sw-bc-flutter">
              <div className="sw-bc-glow" />
              <div className="sw-bc-visual sw-bc-visual--sm">
                <svg viewBox="0 0 140 100" fill="none" aria-hidden="true">
                  <rect x="6" y="20" width="60" height="72" rx="8" fill="rgba(22,22,24,0.85)" stroke="rgba(150,150,150,0.16)" strokeWidth="1" transform="rotate(-7 36 56)"/>
                  <rect x="44" y="12" width="60" height="72" rx="8" fill="rgba(22,22,24,0.9)" stroke="rgba(150,150,150,0.24)" strokeWidth="1" transform="rotate(5 74 48)"/>
                  <rect x="24" y="14" width="62" height="74" rx="8" fill="rgba(18,18,20,0.96)" stroke="rgba(150,150,150,0.4)" strokeWidth="1"/>
                  <rect x="32" y="23" width="46" height="28" rx="5" fill="rgba(150,150,150,0.07)"/>
                  <rect x="32" y="58" width="32" height="4" rx="2" fill="rgba(255,255,255,0.2)"/>
                  <rect x="32" y="66" width="46" height="3" rx="1.5" fill="rgba(255,255,255,0.1)"/>
                  <circle cx="114" cy="36" r="4" fill="rgba(150,150,150,0.35)" stroke="rgba(150,150,150,0.6)" strokeWidth="0.8"/>
                  <line x1="86" y1="47" x2="110" y2="37" stroke="rgba(150,150,150,0.16)" strokeWidth="0.8" strokeDasharray="3 2"/>
                </svg>
              </div>
              <div className="sw-bc-body">
                <span className="sw-bc-num">02</span>
                <h3 className="sw-bc-title">Flutter Apps</h3>
                <p className="sw-bc-desc">Single codebase, pixel-perfect on iOS &amp; Android.</p>
              </div>
            </div>

            {/* ③ React Native */}
            <div className="sw-bc sw-bc-rn">
              <div className="sw-bc-glow" />
              <div className="sw-bc-visual sw-bc-visual--sm">
                <svg viewBox="0 0 140 100" fill="none" aria-hidden="true">
                  <text x="10" y="58" fontFamily="Space Mono, monospace" fontSize="26" fill="rgba(150,150,150,0.32)" fontWeight="600">{"<"}</text>
                  <text x="108" y="58" fontFamily="Space Mono, monospace" fontSize="26" fill="rgba(150,150,150,0.32)" fontWeight="600">{"/>"}</text>
                  <rect x="46" y="12" width="48" height="78" rx="9" fill="rgba(18,18,20,0.96)" stroke="rgba(150,150,150,0.38)" strokeWidth="1.2"/>
                  <rect x="56" y="17" width="28" height="6" rx="3" fill="rgba(150,150,150,0.16)"/>
                  <rect x="52" y="30" width="36" height="24" rx="4" fill="rgba(150,150,150,0.07)"/>
                  <rect x="52" y="60" width="22" height="4" rx="2" fill="rgba(255,255,255,0.2)"/>
                  <rect x="52" y="68" width="32" height="3" rx="1.5" fill="rgba(255,255,255,0.1)"/>
                  <rect x="60" y="82" width="20" height="2.5" rx="1.25" fill="rgba(255,255,255,0.14)"/>
                </svg>
              </div>
              <div className="sw-bc-body">
                <span className="sw-bc-num">03</span>
                <h3 className="sw-bc-title">React Native</h3>
                <p className="sw-bc-desc">Native-feeling apps with accelerated timelines.</p>
              </div>
            </div>

            {/* ④ Enterprise & Cloud Apps — wide */}
            <div className="sw-bc sw-bc-enterprise">
              <div className="sw-bc-glow" />
              <div className="sw-bc-visual sw-bc-visual--wide">
                <svg viewBox="0 0 320 108" fill="none" aria-hidden="true">
                  <path d="M142 64 Q142 40 162 38 Q166 20 186 20 Q206 20 210 38 Q230 38 230 60 Q230 76 212 76 L162 76 Q142 76 142 64Z" fill="rgba(150,150,150,0.07)" stroke="rgba(150,150,150,0.28)" strokeWidth="1"/>
                  <circle cx="58" cy="54" r="18" fill="rgba(22,22,24,0.92)" stroke="rgba(150,150,150,0.28)" strokeWidth="1"/>
                  <path d="M51 54h14M58 47v14" stroke="rgba(150,150,150,0.52)" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="262" cy="54" r="18" fill="rgba(22,22,24,0.92)" stroke="rgba(150,150,150,0.28)" strokeWidth="1"/>
                  <rect x="255" y="48" width="14" height="12" rx="2.5" fill="none" stroke="rgba(150,150,150,0.5)" strokeWidth="1"/>
                  <path d="M258 48v-3a4 4 0 0 1 8 0v3" stroke="rgba(150,150,150,0.5)" strokeWidth="1" fill="none" strokeLinecap="round"/>
                  <circle cx="262" cy="54" r="2" fill="rgba(150,150,150,0.6)"/>
                  <circle cx="156" cy="94" r="13" fill="rgba(22,22,24,0.9)" stroke="rgba(150,150,150,0.22)" strokeWidth="1"/>
                  <ellipse cx="156" cy="90" rx="6" ry="2.5" stroke="rgba(150,150,150,0.4)" strokeWidth="1" fill="none"/>
                  <path d="M150 90v6c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-6" stroke="rgba(150,150,150,0.35)" strokeWidth="1" fill="none"/>
                  <circle cx="232" cy="94" r="13" fill="rgba(22,22,24,0.9)" stroke="rgba(150,150,150,0.22)" strokeWidth="1"/>
                  <rect x="226" y="88" width="12" height="12" rx="2" fill="none" stroke="rgba(150,150,150,0.4)" strokeWidth="1"/>
                  <path d="M229 94h6M232 91v6" stroke="rgba(150,150,150,0.45)" strokeWidth="1" strokeLinecap="round"/>
                  <line x1="76" y1="54" x2="142" y2="56" stroke="rgba(150,150,150,0.18)" strokeWidth="1" strokeDasharray="4 3"/>
                  <line x1="230" y1="56" x2="244" y2="54" stroke="rgba(150,150,150,0.18)" strokeWidth="1" strokeDasharray="4 3"/>
                  <line x1="186" y1="76" x2="160" y2="81" stroke="rgba(150,150,150,0.13)" strokeWidth="0.9" strokeDasharray="3 3"/>
                  <line x1="193" y1="76" x2="230" y2="81" stroke="rgba(150,150,150,0.13)" strokeWidth="0.9" strokeDasharray="3 3"/>
                  <circle cx="58" cy="42" r="4.5" fill="rgba(150,150,150,0.68)"/>
                  <circle cx="262" cy="42" r="4.5" fill="rgba(150,150,150,0.48)"/>
                </svg>
              </div>
              <div className="sw-bc-body">
                <span className="sw-bc-num">04</span>
                <h3 className="sw-bc-title">Enterprise &amp; Cloud Apps</h3>
                <p className="sw-bc-desc">Scalable, secure platforms for complex workflows — microservices, containers, serverless.</p>
              </div>
            </div>

            {/* ⑤ ERP Solutions */}
            <div className="sw-bc sw-bc-erp">
              <div className="sw-bc-glow" />
              <div className="sw-bc-visual sw-bc-visual--sm">
                <svg viewBox="0 0 140 100" fill="none" aria-hidden="true">
                  <rect x="10" y="10" width="48" height="36" rx="6" fill="rgba(22,22,24,0.92)" stroke="rgba(150,150,150,0.3)" strokeWidth="1"/>
                  <rect x="82" y="10" width="48" height="36" rx="6" fill="rgba(22,22,24,0.9)" stroke="rgba(150,150,150,0.2)" strokeWidth="1"/>
                  <rect x="10" y="56" width="48" height="36" rx="6" fill="rgba(22,22,24,0.9)" stroke="rgba(150,150,150,0.2)" strokeWidth="1"/>
                  <rect x="82" y="56" width="48" height="36" rx="6" fill="rgba(22,22,24,0.9)" stroke="rgba(150,150,150,0.28)" strokeWidth="1"/>
                  <text x="34" y="32" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fill="rgba(180,180,180,0.7)">Finance</text>
                  <text x="106" y="32" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fill="rgba(255,255,255,0.42)">Supply</text>
                  <text x="34" y="78" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fill="rgba(255,255,255,0.42)">HR</text>
                  <text x="106" y="78" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fill="rgba(255,255,255,0.42)">Ops</text>
                  <path d="M58 28 L82 28" stroke="rgba(150,150,150,0.38)" strokeWidth="1" strokeLinecap="round"/>
                  <path d="M78 25l4 3-4 3" stroke="rgba(150,150,150,0.38)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <line x1="34" y1="46" x2="34" y2="56" stroke="rgba(150,150,150,0.22)" strokeWidth="1"/>
                  <line x1="106" y1="46" x2="106" y2="56" stroke="rgba(150,150,150,0.18)" strokeWidth="1"/>
                  <line x1="58" y1="74" x2="82" y2="74" stroke="rgba(150,150,150,0.18)" strokeWidth="1"/>
                </svg>
              </div>
              <div className="sw-bc-body">
                <span className="sw-bc-num">05</span>
                <h3 className="sw-bc-title">ERP Solutions</h3>
                <p className="sw-bc-desc">Custom ERP unifying operations, finance, and supply chain.</p>
              </div>
            </div>

            {/* ⑥ API Development */}
            <div className="sw-bc sw-bc-api">
              <div className="sw-bc-glow" />
              <div className="sw-bc-visual sw-bc-visual--sm">
                <svg viewBox="0 0 140 100" fill="none" aria-hidden="true">
                  <circle cx="70" cy="50" r="20" fill="rgba(18,18,20,0.96)" stroke="rgba(150,150,150,0.44)" strokeWidth="1.2"/>
                  <text x="70" y="54" textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="8" fill="rgba(180,180,180,0.85)">API</text>
                  <circle cx="18" cy="26" r="11" fill="rgba(22,22,24,0.9)" stroke="rgba(150,150,150,0.22)" strokeWidth="1"/>
                  <text x="18" y="29" textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="5.5" fill="rgba(170,170,170,0.58)">GET</text>
                  <circle cx="18" cy="74" r="11" fill="rgba(22,22,24,0.9)" stroke="rgba(150,150,150,0.22)" strokeWidth="1"/>
                  <text x="18" y="78" textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="5" fill="rgba(170,170,170,0.52)">POST</text>
                  <circle cx="122" cy="26" r="11" fill="rgba(22,22,24,0.9)" stroke="rgba(150,150,150,0.18)" strokeWidth="1"/>
                  <text x="122" y="29" textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="5" fill="rgba(255,255,255,0.36)">REST</text>
                  <circle cx="122" cy="74" r="11" fill="rgba(22,22,24,0.9)" stroke="rgba(150,150,150,0.18)" strokeWidth="1"/>
                  <text x="122" y="77" textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="4.2" fill="rgba(255,255,255,0.36)">GraphQL</text>
                  <line x1="29" y1="31" x2="53" y2="42" stroke="rgba(150,150,150,0.2)" strokeWidth="0.9" strokeDasharray="3 2"/>
                  <line x1="29" y1="69" x2="53" y2="57" stroke="rgba(150,150,150,0.2)" strokeWidth="0.9" strokeDasharray="3 2"/>
                  <line x1="111" y1="31" x2="87" y2="42" stroke="rgba(150,150,150,0.14)" strokeWidth="0.9" strokeDasharray="3 2"/>
                  <line x1="111" y1="69" x2="87" y2="57" stroke="rgba(150,150,150,0.14)" strokeWidth="0.9" strokeDasharray="3 2"/>
                </svg>
              </div>
              <div className="sw-bc-body">
                <span className="sw-bc-num">06</span>
                <h3 className="sw-bc-title">API Development</h3>
                <p className="sw-bc-desc">Robust RESTful &amp; GraphQL APIs built for performance and scale.</p>
              </div>
            </div>

            {/* ⑦ Legacy Modernisation */}
            <div className="sw-bc sw-bc-legacy">
              <div className="sw-bc-glow" />
              <div className="sw-bc-visual sw-bc-visual--sm">
                <svg viewBox="0 0 140 100" fill="none" aria-hidden="true">
                  <rect x="6" y="26" width="48" height="48" rx="5" fill="rgba(22,22,24,0.88)" stroke="rgba(255,255,255,0.14)" strokeWidth="1"/>
                  <rect x="12" y="33" width="36" height="7" rx="2" fill="rgba(255,255,255,0.1)"/>
                  <rect x="12" y="44" width="36" height="7" rx="2" fill="rgba(255,255,255,0.07)"/>
                  <rect x="12" y="55" width="36" height="7" rx="2" fill="rgba(255,255,255,0.05)"/>
                  <circle cx="18" cy="36.5" r="2" fill="rgba(150,150,150,0.5)"/>
                  <path d="M58 50h24" stroke="rgba(150,150,150,0.52)" strokeWidth="1.6" strokeLinecap="round"/>
                  <path d="M77 45l6 5-6 5" stroke="rgba(150,150,150,0.52)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <path d="M88 64Q88 48 98 46Q101 36 112 36Q123 36 126 46Q136 46 136 60Q136 70 126 70L98 70Q88 70 88 64Z" fill="rgba(150,150,150,0.08)" stroke="rgba(150,150,150,0.38)" strokeWidth="1"/>
                  <circle cx="112" cy="53" r="5" fill="rgba(150,150,150,0.52)"/>
                  <path d="M109 53l2.5 2.5L115 47" stroke="rgba(18,18,20,0.9)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="sw-bc-body">
                <span className="sw-bc-num">07</span>
                <h3 className="sw-bc-title">Legacy Modernisation</h3>
                <p className="sw-bc-desc">Migrate aging systems to modern architectures safely.</p>
              </div>
            </div>

            {/* ⑧ E-commerce Platforms — wide */}
            <div className="sw-bc sw-bc-ecom">
              <div className="sw-bc-glow" />
              <div className="sw-bc-visual sw-bc-visual--wide">
                <svg viewBox="0 0 300 108" fill="none" aria-hidden="true">
                  <rect x="12" y="12" width="58" height="76" rx="8" fill="rgba(22,22,24,0.92)" stroke="rgba(150,150,150,0.24)" strokeWidth="1"/>
                  <rect x="18" y="17" width="46" height="34" rx="5" fill="rgba(150,150,150,0.07)"/>
                  <rect x="18" y="57" width="34" height="5" rx="2.5" fill="rgba(255,255,255,0.22)"/>
                  <rect x="18" y="66" width="26" height="4" rx="2" fill="rgba(150,150,150,0.48)"/>
                  <rect x="18" y="74" width="42" height="3" rx="1.5" fill="rgba(255,255,255,0.07)"/>
                  <rect x="78" y="20" width="52" height="68" rx="8" fill="rgba(22,22,24,0.88)" stroke="rgba(150,150,150,0.16)" strokeWidth="1"/>
                  <rect x="83" y="25" width="42" height="30" rx="5" fill="rgba(150,150,150,0.05)"/>
                  <rect x="83" y="61" width="30" height="5" rx="2.5" fill="rgba(255,255,255,0.18)"/>
                  <rect x="83" y="70" width="22" height="3.5" rx="2" fill="rgba(150,150,150,0.38)"/>
                  <circle cx="188" cy="52" r="28" fill="rgba(22,22,24,0.94)" stroke="rgba(150,150,150,0.3)" strokeWidth="1.2"/>
                  <path d="M177 42h4l5 15h12l4-9h-17" stroke="rgba(150,150,150,0.65)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <circle cx="194" cy="60" r="2.5" fill="rgba(150,150,150,0.72)"/>
                  <circle cx="203" cy="60" r="2.5" fill="rgba(150,150,150,0.72)"/>
                  <rect x="232" y="24" width="56" height="56" rx="9" fill="rgba(22,22,24,0.92)" stroke="rgba(150,150,150,0.22)" strokeWidth="1"/>
                  <text x="260" y="42" textAnchor="middle" fontFamily="sans-serif" fontSize="6.5" fill="rgba(255,255,255,0.3)">Conversion</text>
                  <rect x="238" y="47" width="44" height="5" rx="2.5" fill="rgba(255,255,255,0.06)"/>
                  <rect x="238" y="47" width="33" height="5" rx="2.5" fill="rgba(150,150,150,0.44)"/>
                  <text x="260" y="64" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fontWeight="700" fill="rgba(180,180,180,0.92)">↑ 74%</text>
                </svg>
              </div>
              <div className="sw-bc-body">
                <span className="sw-bc-num">08</span>
                <h3 className="sw-bc-title">E-commerce Platforms</h3>
                <p className="sw-bc-desc">End-to-end platforms built for conversion — from storefront to checkout.</p>
              </div>
            </div>

            {/* ⑨ Cloud & DevOps */}
            <div className="sw-bc sw-bc-devops">
              <div className="sw-bc-glow" />
              <div className="sw-bc-visual sw-bc-visual--sm">
                <svg viewBox="0 0 140 100" fill="none" aria-hidden="true">
                  <rect x="4" y="34" width="28" height="30" rx="6" fill="rgba(22,22,24,0.92)" stroke="rgba(150,150,150,0.3)" strokeWidth="1"/>
                  <text x="18" y="47" textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="6" fill="rgba(160,160,160,0.65)">{"</>"}</text>
                  <text x="18" y="56" textAnchor="middle" fontFamily="sans-serif" fontSize="5" fill="rgba(255,255,255,0.28)">Code</text>
                  <path d="M32 49h8" stroke="rgba(150,150,150,0.35)" strokeWidth="1" strokeLinecap="round"/>
                  <path d="M38 46l3 3-3 3" stroke="rgba(150,150,150,0.35)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <rect x="40" y="34" width="28" height="30" rx="6" fill="rgba(22,22,24,0.9)" stroke="rgba(150,150,150,0.2)" strokeWidth="1"/>
                  <path d="M48 54l4-9 4 5 2-3 4 7" stroke="rgba(150,150,150,0.5)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <text x="54" y="58" textAnchor="middle" fontFamily="sans-serif" fontSize="5" fill="rgba(255,255,255,0.28)">Build</text>
                  <path d="M68 49h8" stroke="rgba(150,150,150,0.35)" strokeWidth="1" strokeLinecap="round"/>
                  <path d="M74 46l3 3-3 3" stroke="rgba(150,150,150,0.35)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <rect x="76" y="34" width="28" height="30" rx="6" fill="rgba(22,22,24,0.9)" stroke="rgba(150,150,150,0.2)" strokeWidth="1"/>
                  <path d="M83 49l3.5 3.5L94 44" stroke="rgba(150,150,150,0.55)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  <text x="90" y="58" textAnchor="middle" fontFamily="sans-serif" fontSize="5" fill="rgba(255,255,255,0.28)">Test</text>
                  <path d="M104 49h8" stroke="rgba(150,150,150,0.35)" strokeWidth="1" strokeLinecap="round"/>
                  <path d="M110 46l3 3-3 3" stroke="rgba(150,150,150,0.35)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <rect x="112" y="34" width="24" height="30" rx="6" fill="rgba(150,150,150,0.11)" stroke="rgba(150,150,150,0.48)" strokeWidth="1"/>
                  <path d="M118 52l6-6 6 6M124 46v9" stroke="rgba(160,160,160,0.78)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="18" cy="76" r="3" fill="rgba(150,150,150,0.7)"/>
                  <circle cx="54" cy="76" r="3" fill="rgba(150,150,150,0.55)"/>
                  <circle cx="90" cy="76" r="3" fill="rgba(150,150,150,0.55)"/>
                  <circle cx="124" cy="76" r="3" fill="rgba(150,150,150,0.88)"/>
                  <line x1="21" y1="76" x2="51" y2="76" stroke="rgba(150,150,150,0.22)" strokeWidth="0.8"/>
                  <line x1="57" y1="76" x2="87" y2="76" stroke="rgba(150,150,150,0.22)" strokeWidth="0.8"/>
                  <line x1="93" y1="76" x2="121" y2="76" stroke="rgba(150,150,150,0.22)" strokeWidth="0.8"/>
                </svg>
              </div>
              <div className="sw-bc-body">
                <span className="sw-bc-num">09</span>
                <h3 className="sw-bc-title">Cloud &amp; DevOps</h3>
                <p className="sw-bc-desc">CI/CD pipelines and cloud provisioning that accelerate deployment.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="sw-process-section">
        <div className="sw-process-inner">
          <div className="sw-process-left">
            <h2 className="sw-process-editorial">HOW<br />WE<br />BUILD.</h2>
            <p className="sw-process-sub">A disciplined engineering process — from architecture decisions on day one to SLA-backed support after launch.</p>
          </div>
          <div className="sw-process-right">
            {data.process.map((step, i) => (
              <div className="sw-process-step" key={step}>
                <div className="sw-ps-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="sw-ps-name">{step}</div>
                <div className="sw-ps-desc">{processDescs[step] ?? ''}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sw-cta-section">
        <div className="sw-cta-overlay" aria-hidden="true" />
        <div className="sw-cta-inner">
          <div className="sw-cta-left">
            <h2 className="sw-cta-heading">A TEAM THAT SHIPS.</h2>
            <p className="sw-cta-sub">Stop waiting on estimates. Start shipping software that matters.</p>
            <Link to="/contact" className="sdp-btn-primary">Book a Free Consultation →</Link>
          </div>
          <div className="sw-cta-right">
            <div className="sw-proof-chip">
              <span className="sw-proof-check">✓</span>
              <span>Zero-downtime deployment</span>
            </div>
            <div className="sw-proof-chip">
              <span className="sw-proof-check">✓</span>
              <span>Agile in 2-week sprints</span>
            </div>
            <div className="sw-proof-chip">
              <span className="sw-proof-check">✓</span>
              <span>Post-launch SLA support</span>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

/* ── Animated counter ── */
function AnimatedStat({ num, label }: { num: string; label: string }) {
  // Parse numeric value and surrounding text: "200+" → { pre:'', val:200, suf:'+' }
  const match = num.match(/^([^\d]*)(\d+)([^\d]*)$/)
  const target  = match ? parseInt(match[2], 10) : 0
  const prefix  = match ? match[1] : ''
  const suffix  = match ? match[3] : num

  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true
        const duration = 1600
        const start = performance.now()
        const tick = (now: number) => {
          const elapsed = now - start
          const progress = Math.min(elapsed / duration, 1)
          // ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.round(eased * target))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <div className="wd-stat" ref={ref}>
      <div className="wd-stat-num">{prefix}{count}{suffix}</div>
      <div className="wd-stat-lbl">{label}</div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. WEB DEVELOPMENT
═══════════════════════════════════════════════════════════════════════════ */
const SLIDE_PROJECTS = [
  { image: '/nets-cover.webp',       title: 'NETS Energy',        category: 'Web Development' },
  { image: '/pacific-cover.webp',    title: 'Pacific Consulting',  category: 'Web Development' },
  { image: '/avyanna-cover.webp',    title: 'Avyanna Aviation',    category: 'Web Development' },
  { image: '/vfti-cover.webp',       title: 'VFTI',               category: 'Web Development' },
  { image: '/fstc-cover.webp',       title: 'FSTC',               category: 'Web Development' },
  { image: '/omarbazaz-cover.webp',  title: 'Omar Bazaz',         category: 'Web Development' },
]

function WebDevPage({ data }: { data: ServiceData }) {
  const neatCanvasRef = useRef<HTMLCanvasElement>(null)
  const ctaCanvasRef  = useRef<HTMLCanvasElement>(null)
  const [slideIdx, setSlideIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx(i => (i + 1) % SLIDE_PROJECTS.length)
    }, 3200)
    return () => clearInterval(timer)
  }, [])
  useEffect(() => {
    const canvas = neatCanvasRef.current
    if (!canvas) return
    const gradient = new NeatGradient({
      ref: canvas,
      colors: [
        { color: '#309F81', enabled: true },
        { color: '#050F0C', enabled: true },
        { color: '#A4DFA4', enabled: true },
        { color: '#1E5A4A', enabled: true },
        { color: '#6CC681', enabled: true },
      ],
      speed: 4,
      horizontalPressure: 3,
      verticalPressure: 4,
      waveFrequencyX: 10,
      waveFrequencyY: 0,
      waveAmplitude: 10,
      shadows: 5,
      highlights: 10,
      colorBrightness: 1,
      colorSaturation: 2,
      colorBlending: 9,
      backgroundColor: '#050F0C',
      backgroundAlpha: 1,
      grainScale: 2,
      grainSparsity: 0,
      grainIntensity: 0.05,
      grainSpeed: 1,
      resolution: 0.5,
      flowEnabled: true,
      flowDistortionA: 0.4,
      flowDistortionB: 2.6,
      flowScale: 1.9,
      flowEase: 0.94,
      wireframe: false,
      antialias: false,
    })
    const onScroll = () => { gradient.yOffset = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      gradient.destroy()
    }
  }, [])

  useEffect(() => {
    const canvas = ctaCanvasRef.current
    if (!canvas) return
    const ctaGradient = new NeatGradient({
      ref: canvas,
      colors: [
        { color: '#309F81', enabled: true },
        { color: '#050F0C', enabled: true },
        { color: '#A4DFA4', enabled: true },
        { color: '#1E5A4A', enabled: true },
        { color: '#6CC681', enabled: true },
      ],
      speed: 4,
      horizontalPressure: 3,
      verticalPressure: 4,
      waveFrequencyX: 10,
      waveFrequencyY: 0,
      waveAmplitude: 10,
      shadows: 5,
      highlights: 10,
      colorBrightness: 1,
      colorSaturation: 2,
      colorBlending: 9,
      backgroundColor: '#050F0C',
      backgroundAlpha: 1,
      grainScale: 2,
      grainSparsity: 0,
      grainIntensity: 0.05,
      grainSpeed: 1,
      resolution: 0.5,
      flowEnabled: true,
      flowDistortionA: 0.4,
      flowDistortionB: 2.6,
      flowScale: 1.9,
      flowEase: 0.94,
      wireframe: false,
      antialias: false,
    })
    const onScroll = () => { ctaGradient.yOffset = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      ctaGradient.destroy()
    }
  }, [])

  return (
    <div className="wd-page">
      <SiteNav />

      {/* ── Hero ── */}
      <section className="wd-hero">
        {/* Background layers */}
        <div className="wd-hero-dots" aria-hidden="true" />
        <div className="wd-hero-glow" aria-hidden="true" />
        <div className="wd-hero-glow-r" aria-hidden="true" />

        {/* ── Left — original UFK copy, unchanged ── */}
        <div className="wd-hero-left">
          <span className="wd-badge">Web Development</span>
          <h1 className="wd-h1">
            <span className="wd-h1-white">Web Experiences</span>
            <em className="wd-h1-accent">That Convert.</em>
          </h1>
          <p className="wd-desc">{data.description}</p>
          <div className="wd-hero-btns">
            <Link to="/contact" className="sdp-btn-primary">Start a Project →</Link>
          </div>
        </div>

        {/* ── Right — connected system illustration ── */}
        <div className="wd-hero-right">
          <div className="wd-cards-scene">

            {/* Subtle scene ambient glow */}
            <div className="wd-scene-glow" aria-hidden="true" />

            {/* Dashed connector lines — orthogonal L-shaped paths */}
            <svg className="wd-scene-svg" viewBox="0 0 648 620" fill="none" aria-hidden="true">
              {/* Icon row left-edge (422,147) → far left → down → main card top (340,210) */}
              <path d="M 422 147 L 310 147 L 310 210"
                    stroke="rgba(178,255,89,0.13)" strokeWidth="1.2" strokeDasharray="5 4" strokeLinecap="square"/>
              {/* Main card bottom-left (234,400) → left → far down → SEO card top (175,420) */}
              <path d="M 220 400 L 130 400 L 130 436 L 152 436"
                    stroke="rgba(178,255,89,0.16)" strokeWidth="1.3" strokeDasharray="6 4" strokeLinecap="square"/>
              {/* Main card bottom-right (414,400) → right → far down → growth card top (545,420) */}
              <path d="M 430 400 L 590 400 L 590 460 L 545 460"
                    stroke="rgba(178,255,89,0.18)" strokeWidth="1.4" strokeDasharray="6 4" strokeLinecap="square"/>
            </svg>

            {/* ① Lighthouse score pill — top right */}
            <div className="wd-sc-perf-card">
              <div className="wd-sc-perf-icon" aria-hidden="true">
                <svg viewBox="0 0 18 18" fill="none" width="13" height="13">
                  <circle cx="9" cy="9" r="7.5" stroke="#b2ff59" strokeWidth="1.4"/>
                  <path d="M5.5 9.5l2.5 2.5 4-5" stroke="#b2ff59" strokeWidth="1.4"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="wd-sc-perf-body">
                <span className="wd-sc-perf-label">Lighthouse Score</span>
                <div className="wd-sc-perf-bar-wrap">
                  <div className="wd-sc-perf-bar" />
                </div>
              </div>
              <span className="wd-sc-perf-num">98</span>
            </div>

            {/* ② Tech icon tiles row — below perf card */}
            <div className="wd-sc-icon-row">
              {/* Globe / Responsive */}
              <div className="wd-sc-icon-box">
                <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="rgba(178,255,89,0.78)" strokeWidth="1.4"/>
                  <path d="M3 12h18M12 3c-2 3-2.5 5.5-2.5 9s.5 6 2.5 9
                           M12 3c2 3 2.5 5.5 2.5 9s-.5 6-2.5 9"
                        stroke="rgba(178,255,89,0.78)" strokeWidth="1.4"/>
                </svg>
              </div>
              {/* Code brackets */}
              <div className="wd-sc-icon-box">
                <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
                  <path d="M8 9.5L4 12l4 2.5M16 9.5L20 12l-4 2.5M13.5 7l-3 10"
                        stroke="rgba(178,255,89,0.78)" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </div>
              {/* Layers */}
              <div className="wd-sc-icon-box">
                <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                        stroke="rgba(178,255,89,0.78)" strokeWidth="1.4"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* ③ Central code-window card */}
            <div className="wd-sc-main-card">
              <div className="wd-mc-titlebar" aria-hidden="true">
                <span className="wd-mc-dot wd-mc-dot--lit" />
                <span className="wd-mc-dot" />
                <span className="wd-mc-dot" />
              </div>
              <div className="wd-mc-code" aria-hidden="true">
                <span className="wd-mc-row wd-mc-muted">&lt;section&gt;</span>
                <span className="wd-mc-row">
                  &nbsp;&nbsp;<span className="wd-mc-accent">&lt;h1&gt;</span>
                </span>
                <span className="wd-mc-row wd-mc-white">&nbsp;&nbsp;&nbsp;&nbsp;Your Brand</span>
                <span className="wd-mc-row">
                  &nbsp;&nbsp;<span className="wd-mc-accent">&lt;/h1&gt;</span>
                </span>
                <span className="wd-mc-row wd-mc-muted">&lt;/section&gt;</span>
              </div>
            </div>

            {/* ④ Floating stat pill on connector */}
            <div className="wd-sc-stat-pill">↑ 3× Traffic</div>

            {/* ⑤ SEO search card — bottom left */}
            <div className="wd-sc-seo-card">
              <svg viewBox="0 0 24 24" fill="none" width="22" height="22" aria-hidden="true">
                <circle cx="10.5" cy="10.5" r="6.5" stroke="#b2ff59" strokeWidth="1.5"/>
                <path d="M16 16l3.5 3.5" stroke="#b2ff59" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M8.5 10.5h4M10.5 8.5v4" stroke="rgba(178,255,89,0.55)"
                      strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <span className="wd-sc-seo-lbl">SEO</span>
            </div>

            {/* ⑥ Analytics / Growth card — bottom right */}
            <div className="wd-sc-spark-card">
              <div className="wd-spark-inner" aria-hidden="true">
                <div className="wd-spark-bars">
                  <div className="wd-spark-bar" style={{ height: '38%' }} />
                  <div className="wd-spark-bar" style={{ height: '58%' }} />
                  <div className="wd-spark-bar" style={{ height: '44%' }} />
                  <div className="wd-spark-bar wd-spark-bar--hi" style={{ height: '80%' }} />
                  <div className="wd-spark-bar wd-spark-bar--hi" style={{ height: '100%' }} />
                </div>
                <span className="wd-spark-lbl">Growth</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Feature Strip ── */}
      <div className="wd-feature-strip">
        <div className="wd-feature-item">
          <span className="wd-fi-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
              <path d="M13 2L4.5 13.5H11L10 22L19.5 10H13L13 2Z" fill="rgba(178,255,89,0.15)" stroke="#b2ff59" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="wd-fi-title">Lightning Fast</span>
          <span className="wd-fi-sub">Sub-second load times, every time</span>
        </div>
        <div className="wd-feature-item wd-fi-border">
          <span className="wd-fi-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
              <circle cx="12" cy="12" r="9" stroke="#b2ff59" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="5" stroke="#b2ff59" strokeWidth="1.5" opacity="0.6"/>
              <circle cx="12" cy="12" r="2" fill="#b2ff59"/>
            </svg>
          </span>
          <span className="wd-fi-title">Conversion-Focused</span>
          <span className="wd-fi-sub">Every layout decision drives action</span>
        </div>
        <div className="wd-feature-item wd-fi-border">
          <span className="wd-fi-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
              <circle cx="11" cy="11" r="7" stroke="#b2ff59" strokeWidth="1.5"/>
              <path d="M16.5 16.5L21 21" stroke="#b2ff59" strokeWidth="2" strokeLinecap="round"/>
              <path d="M8.5 11h5M11 8.5v5" stroke="#b2ff59" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
            </svg>
          </span>
          <span className="wd-fi-title">SEO-Ready Architecture</span>
          <span className="wd-fi-sub">Built-in technical SEO foundations</span>
        </div>
      </div>

      {/* ── Services List ── */}
      <section className="wd-services-section">
        <div className="wd-services-inner">
          <div className="wd-services-left">
            <span className="sdp-section-eyebrow">Our Capabilities</span>
            <h2 className="wd-section-h2">Everything included in Web Development</h2>
            <p className="wd-services-desc">From single-page marketing sites to complex multi-tenant SaaS platforms, we cover every dimension of modern web development.</p>
          </div>
          <div className="wd-services-right">
            {data.subServices.map((svc, i) => (
              <div className="wd-service-row" key={svc.title}>
                <div className="wd-sr-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="wd-sr-body">
                  <div className="wd-sr-title">{svc.title}</div>
                  <div className="wd-sr-desc">{svc.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Built for Results ── */}
      <section className="wd-results-section">
        <div className="wd-results-inner">
          <div className="wd-results-img-card">
            <canvas ref={neatCanvasRef} aria-hidden="true" className="wd-neat-canvas" />
            {/* Project slideshow over gradient */}
            <div className="wd-slide-wrap">
              {SLIDE_PROJECTS.map((p, i) => (
                <div key={p.image} className={`wd-slide ${i === slideIdx ? 'wd-slide--active' : ''}`}>
                  <img src={p.image} alt={p.title} className="wd-slide-img" />
                </div>
              ))}
              <div className="wd-slide-caption">
                <span className="wd-slide-cat">{SLIDE_PROJECTS[slideIdx].category}</span>
                <span className="wd-slide-title">{SLIDE_PROJECTS[slideIdx].title}</span>
              </div>
              <div className="wd-slide-dots">
                {SLIDE_PROJECTS.map((_, i) => (
                  <button key={i} className={`wd-slide-dot ${i === slideIdx ? 'wd-slide-dot--active' : ''}`} onClick={() => setSlideIdx(i)} />
                ))}
              </div>
            </div>
          </div>
          <div className="wd-results-cards">
            {data.benefits.map((b) => (
              <div className="wd-benefit-card" key={b.title}>
                <div className="wd-bc-title">{b.title}</div>
                <div className="wd-bc-desc">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <div className="wd-stats-band">
        {data.stats.map((s) => (
          <AnimatedStat key={s.label} num={s.num} label={s.label} />
        ))}
      </div>

      {/* ── CTA ── */}
      <section className="wd-cta-section">
        <canvas ref={ctaCanvasRef} aria-hidden="true" className="wd-cta-canvas" />
        <div className="wd-cta-inner">
          <div className="wd-cta-left">
            <h2 className="wd-cta-h2">Ready to Launch?</h2>
            <p className="wd-cta-sub">Free discovery call. Detailed scope in 48 hours. Fixed-price delivery.</p>
            <Link to="/contact" className="sdp-btn-primary" style={{ marginTop: '28px', display: 'inline-flex' }}>Start Building →</Link>
          </div>
          <div className="wd-cta-right">
            <div className="wd-tech-grid">
              {[1, 2, 3, 4].map((n) => (
                <div className="wd-tech-logo" key={n}>
                  <img src={`/tech${n}.png`} alt={`Technology ${n}`} />
                </div>
              ))}
            </div>
            <div className="wd-tech-label">Powered by best-in-class tech</div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   3. DIGITAL TRANSFORMATION
═══════════════════════════════════════════════════════════════════════════ */
function DigitalTransformPage({ data }: { data: ServiceData }) {
  const processDescs: Record<string, string> = {
    'Process Audit': 'Map every workflow to identify automation candidates and calculate time/cost savings.',
    'Use Case Design': 'Prioritise automations by ROI and design the ideal future-state process.',
    'Prototype': 'Build a working proof-of-concept to validate feasibility and measure real performance.',
    'Integration': 'Connect the automation to your live systems with full error handling and monitoring.',
    'Training': 'Equip your team to manage, extend, and trust the automated workflows.',
    'Go Live': 'Deploy to production with SLA monitoring and a hypercare support period.',
  }

  return (
    <div className="dt-page">
      <SiteNav />

      {/* ── Hero ── */}
      <section className="dt-hero">
        <DTHeroBackground />
        <span className="dt-pill-badge">Digital Transformation</span>
        <h1 className="dt-h1">
          <span className="dt-h1-white">Automate the Ordinary.</span>
          <span className="dt-h1-accent">Focus on the Extraordinary.</span>
        </h1>
        <p className="dt-desc">{data.description}</p>
        <div className="dt-hero-btns">
          <Link to="/contact" className="sdp-btn-primary">Start Your Transformation →</Link>
        </div>
        <div className="dt-stat-bubbles">
          <div className="dt-stat-bubble">
            <span className="dt-sb-num">70%</span>
            <span className="dt-sb-lbl">Task Automation</span>
          </div>
          <div className="dt-stat-bubble">
            <span className="dt-sb-num">3x</span>
            <span className="dt-sb-lbl">Productivity</span>
          </div>
          <div className="dt-stat-bubble">
            <span className="dt-sb-num">24/7</span>
            <span className="dt-sb-lbl">Uptime</span>
          </div>
        </div>
      </section>

      {/* ── Panel 1: Chatbot ── */}
      <section className="dt-panel dt-panel-dark">
        <div className="dt-panel-inner">
          <div className="dt-panel-text">
            <div className="dt-panel-bignum">01</div>
            <h2 className="dt-panel-title">{data.subServices[0].title}</h2>
            <p className="dt-panel-desc">{data.subServices[0].desc}</p>
            <Link to="/contact" className="dt-panel-link">Learn more →</Link>
          </div>
          <div className="dt-panel-visual">
            <div className="dt-chat-wrap">
              {/* Depth layer — background glass card */}
              <div className="dt-chat-layer dt-chat-layer--back" />
              {/* Mid layer — context cards */}
              <div className="dt-chat-layer dt-chat-layer--mid">
                <div className="dt-ctx-card">
                  <span className="dt-ctx-dot" />CRM Record
                </div>
                <div className="dt-ctx-card dt-ctx-card--2">
                  <span className="dt-ctx-dot" />Order #2847
                </div>
              </div>
              {/* Main chat window */}
              <div className="dt-chat-window">
                {/* Header */}
                <div className="dt-chat-header">
                  <div className="dt-chat-avatar">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="rgba(178,255,89,0.9)" strokeWidth="2">
                      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                    </svg>
                  </div>
                  <div>
                    <div className="dt-chat-name">AI Assistant</div>
                    <div className="dt-chat-status"><span className="dt-status-dot"/>Online</div>
                  </div>
                  <div className="dt-chat-indicators">
                    <span className="dt-ind dt-ind--pulse" />
                    <span className="dt-ind" />
                    <span className="dt-ind" />
                  </div>
                </div>
                {/* Messages */}
                <div className="dt-chat-body">
                  <div className="dt-bubble dt-bubble-bot">
                    <span className="dt-bubble-tag">Support</span>
                    How can I help you today?
                  </div>
                  <div className="dt-bubble dt-bubble-user">I need to check my order status</div>
                  <div className="dt-bubble dt-bubble-bot">
                    <span className="dt-bubble-tag">CRM</span>
                    Found it! Order #2847 is out for delivery ✓
                  </div>
                  {/* Routing pills */}
                  <div className="dt-route-row">
                    <span className="dt-route-pill">→ Lead Qualify</span>
                    <span className="dt-route-pill dt-route-pill--active">→ Support</span>
                    <span className="dt-route-pill">→ Escalate</span>
                  </div>
                  <div className="dt-typing">
                    <span className="dt-dot-1"/><span className="dt-dot-2"/><span className="dt-dot-3"/>
                  </div>
                </div>
              </div>
              {/* Floating workflow tiles */}
              <div className="dt-chat-tile dt-chat-tile--1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(178,255,89,0.7)" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 13h4"/></svg>
                Automation
              </div>
              <div className="dt-chat-tile dt-chat-tile--2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(178,255,89,0.7)" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                Lead Qual
              </div>
              <div className="dt-chat-tile dt-chat-tile--3">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(178,255,89,0.7)" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.65 5.11 2 2 0 0 1 3.62 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.91a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17z"/></svg>
                Service
              </div>
              {/* AI core node */}
              <div className="dt-ai-core-node">
                <div className="dt-ai-core-ring"/>
                <div className="dt-ai-core-inner"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Panel 2: RPA ── */}
      <section className="dt-panel dt-panel-mid">
        <div className="dt-panel-inner dt-panel-reverse">
          <div className="dt-panel-visual">
            <div className="dt-rpa-wrap" aria-hidden="true">
              {/* Grid background */}
              <div className="dt-rpa-grid"/>
              {/* Input nodes — left column */}
              <div className="dt-rpa-col dt-rpa-col--in">
                {[
                  { icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8', label: 'Docs' },
                  { icon: 'M3 3h18v18H3z M3 9h18 M3 15h18 M9 3v18 M15 3v18', label: 'Sheet' },
                  { icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6', label: 'Email' },
                ].map((n, i) => (
                  <div key={n.label} className="dt-rpa-node" style={{ animationDelay: `${i * 0.3}s` }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(178,255,89,0.8)" strokeWidth="1.5" strokeLinecap="round"><path d={n.icon}/></svg>
                    <span>{n.label}</span>
                  </div>
                ))}
              </div>
              {/* Flow paths left → center */}
              <svg className="dt-rpa-paths dt-rpa-paths--left" viewBox="0 0 80 180" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="flowL" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(178,255,89,0.1)"/>
                    <stop offset="100%" stopColor="rgba(178,255,89,0.5)"/>
                  </linearGradient>
                </defs>
                <path d="M0 30 C40 30 40 90 80 90" stroke="url(#flowL)" strokeWidth="1.5" fill="none"/>
                <path d="M0 90 L80 90" stroke="url(#flowL)" strokeWidth="1.5" fill="none"/>
                <path d="M0 150 C40 150 40 90 80 90" stroke="url(#flowL)" strokeWidth="1.5" fill="none"/>
                <circle r="3" fill="#b2ff59" opacity="0.9"><animateMotion dur="2s" repeatCount="indefinite" path="M0 30 C40 30 40 90 80 90"/></circle>
                <circle r="3" fill="#b2ff59" opacity="0.9"><animateMotion dur="2.4s" repeatCount="indefinite" begin="0.4s" path="M0 90 L80 90"/></circle>
                <circle r="3" fill="#b2ff59" opacity="0.9"><animateMotion dur="2.8s" repeatCount="indefinite" begin="0.8s" path="M0 150 C40 150 40 90 80 90"/></circle>
              </svg>
              {/* Central engine */}
              <div className="dt-rpa-engine">
                <div className="dt-rpa-engine-ring dt-rpa-ring--outer"/>
                <div className="dt-rpa-engine-ring dt-rpa-ring--mid"/>
                <div className="dt-rpa-engine-core">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(178,255,89,0.95)" strokeWidth="1.5">
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
                  </svg>
                </div>
                <div className="dt-rpa-status-row">
                  <span className="dt-rpa-status dt-rpa-status--active"/>
                  <span className="dt-rpa-status"/>
                  <span className="dt-rpa-status"/>
                </div>
              </div>
              {/* Flow paths center → right */}
              <svg className="dt-rpa-paths dt-rpa-paths--right" viewBox="0 0 80 180" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="flowR" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(178,255,89,0.5)"/>
                    <stop offset="100%" stopColor="rgba(178,255,89,0.1)"/>
                  </linearGradient>
                </defs>
                <path d="M0 90 C40 90 40 30 80 30" stroke="url(#flowR)" strokeWidth="1.5" fill="none"/>
                <path d="M0 90 L80 90" stroke="url(#flowR)" strokeWidth="1.5" fill="none"/>
                <path d="M0 90 C40 90 40 150 80 150" stroke="url(#flowR)" strokeWidth="1.5" fill="none"/>
                <circle r="3" fill="#b2ff59" opacity="0.9"><animateMotion dur="2s" repeatCount="indefinite" path="M0 90 C40 90 40 30 80 30"/></circle>
                <circle r="3" fill="#b2ff59" opacity="0.9"><animateMotion dur="2.4s" repeatCount="indefinite" begin="0.2s" path="M0 90 L80 90"/></circle>
                <circle r="3" fill="#b2ff59" opacity="0.9"><animateMotion dur="2.8s" repeatCount="indefinite" begin="0.6s" path="M0 90 C40 90 40 150 80 150"/></circle>
              </svg>
              {/* Output nodes — right column */}
              <div className="dt-rpa-col dt-rpa-col--out">
                {[
                  { icon: 'M3 15a4 4 0 0 0 4 4h9a5 5 0 1 0-4.9-6H7a4 4 0 0 0-4 4z', label: 'Cloud' },
                  { icon: 'M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2z M8 2v4 M16 2v4 M2 10h20', label: 'CRM' },
                  { icon: 'M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5z M12 8v8 M8 12h8', label: 'DB' },
                ].map((n, i) => (
                  <div key={n.label} className="dt-rpa-node dt-rpa-node--out" style={{ animationDelay: `${i * 0.3 + 0.5}s` }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(178,255,89,0.8)" strokeWidth="1.5" strokeLinecap="round"><path d={n.icon}/></svg>
                    <span>{n.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="dt-panel-text">
            <div className="dt-panel-bignum">02</div>
            <h2 className="dt-panel-title">{data.subServices[1].title}</h2>
            <p className="dt-panel-desc">{data.subServices[1].desc}</p>
            <Link to="/contact" className="dt-panel-link">Learn more →</Link>
          </div>
        </div>
      </section>

      {/* ── Panel 3: AI ── */}
      <section className="dt-panel dt-panel-dark">
        <div className="dt-panel-inner">
          <div className="dt-panel-text">
            <div className="dt-panel-bignum">03</div>
            <h2 className="dt-panel-title">{data.subServices[2].title}</h2>
            <p className="dt-panel-desc">{data.subServices[2].desc}</p>
            <Link to="/contact" className="dt-panel-link">Learn more →</Link>
          </div>
          <div className="dt-panel-visual">
            <div className="dt-aidev-wrap" aria-hidden="true">
              <div className="dt-aidev-grid"/>
              <svg className="dt-aidev-svg" viewBox="0 0 340 280">
                <defs>
                  <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(178,255,89,0.35)"/>
                    <stop offset="100%" stopColor="rgba(178,255,89,0)"/>
                  </radialGradient>
                  <linearGradient id="pipeIn" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(178,255,89,0.05)"/>
                    <stop offset="100%" stopColor="rgba(178,255,89,0.45)"/>
                  </linearGradient>
                  <linearGradient id="pipeOut" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(178,255,89,0.45)"/>
                    <stop offset="100%" stopColor="rgba(178,255,89,0.05)"/>
                  </linearGradient>
                  <filter id="softGlow">
                    <feGaussianBlur stdDeviation="3" result="blur"/>
                    <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                  </filter>
                </defs>

                {/* ── Input data nodes (left) ── */}
                {[40, 100, 160, 220].map((y, i) => (
                  <g key={i}>
                    <rect x="8" y={y} width="52" height="34" rx="6"
                      fill="rgba(255,255,255,0.03)" stroke="rgba(178,255,89,0.2)" strokeWidth="1"/>
                    <rect x="8" y={y} width="4" height="34" rx="2" fill="rgba(178,255,89,0.3)"/>
                    <rect x="18" y={y+8} width="28" height="3" rx="1.5" fill="rgba(178,255,89,0.25)"/>
                    <rect x="18" y={y+15} width="20" height="2" rx="1" fill="rgba(255,255,255,0.1)"/>
                    <rect x="18" y={y+21} width="24" height="2" rx="1" fill="rgba(255,255,255,0.08)"/>
                    {/* flow line to core */}
                    <path d={`M60 ${y+17} C100 ${y+17} 110 140 140 140`}
                      stroke="url(#pipeIn)" strokeWidth="1.2" fill="none"/>
                    <circle r="2.5" fill="#b2ff59" opacity="0.85" filter="url(#softGlow)">
                      <animateMotion dur={`${1.8 + i * 0.3}s`} repeatCount="indefinite"
                        begin={`${i * 0.4}s`}
                        path={`M60 ${y+17} C100 ${y+17} 110 140 140 140`}/>
                    </circle>
                  </g>
                ))}

                {/* ── Central AI core ── */}
                {/* Glow halo */}
                <circle cx="170" cy="140" r="52" fill="url(#coreGlow)"/>
                {/* Outer ring */}
                <circle cx="170" cy="140" r="46" fill="none" stroke="rgba(178,255,89,0.15)" strokeWidth="1">
                  <animateTransform attributeName="transform" type="rotate" from="0 170 140" to="360 170 140" dur="20s" repeatCount="indefinite"/>
                </circle>
                <circle cx="170" cy="140" r="46" fill="none" stroke="rgba(178,255,89,0.3)" strokeWidth="1"
                  strokeDasharray="6 22">
                  <animateTransform attributeName="transform" type="rotate" from="0 170 140" to="360 170 140" dur="12s" repeatCount="indefinite"/>
                </circle>
                {/* Mid ring */}
                <circle cx="170" cy="140" r="34" fill="none" stroke="rgba(178,255,89,0.2)" strokeWidth="1"
                  strokeDasharray="4 14">
                  <animateTransform attributeName="transform" type="rotate" from="360 170 140" to="0 170 140" dur="8s" repeatCount="indefinite"/>
                </circle>
                {/* Core body */}
                <rect x="148" y="118" width="44" height="44" rx="10"
                  fill="rgba(12,25,14,0.9)" stroke="rgba(178,255,89,0.5)" strokeWidth="1.5"/>
                {/* Chip lines */}
                {[-8,-2,4,10].map((dy,i) => (
                  <line key={i} x1="155" y1={140+dy} x2="185" y2={140+dy}
                    stroke="rgba(178,255,89,0.18)" strokeWidth="0.8"/>
                ))}
                {/* Core pulse dot */}
                <circle cx="170" cy="140" r="7" fill="rgba(178,255,89,0.9)" filter="url(#softGlow)">
                  <animate attributeName="r" values="7;10;7" dur="2.5s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2.5s" repeatCount="indefinite"/>
                </circle>

                {/* ── Output modules (right) ── */}
                {[
                  { y: 50,  label: 'ML Model',  color: 'rgba(178,255,89,0.8)' },
                  { y: 110, label: 'Deploy',    color: 'rgba(178,255,89,0.6)' },
                  { y: 170, label: 'Analytics', color: 'rgba(178,255,89,0.7)' },
                  { y: 230, label: 'Decision',  color: 'rgba(178,255,89,0.5)' },
                ].map((m, i) => (
                  <g key={m.label}>
                    <path d={`M200 140 C230 140 220 ${m.y+14} 270 ${m.y+14}`}
                      stroke="url(#pipeOut)" strokeWidth="1.2" fill="none"/>
                    <circle r="2.5" fill="#b2ff59" opacity="0.85" filter="url(#softGlow)">
                      <animateMotion dur={`${1.6 + i * 0.35}s`} repeatCount="indefinite"
                        begin={`${i * 0.3}s`}
                        path={`M200 140 C230 140 220 ${m.y+14} 270 ${m.y+14}`}/>
                    </circle>
                    <rect x="270" y={m.y} width="62" height="28" rx="6"
                      fill="rgba(255,255,255,0.03)" stroke="rgba(178,255,89,0.22)" strokeWidth="1"/>
                    <circle cx="282" cy={m.y+14} r="4" fill="none" stroke={m.color} strokeWidth="1.5"/>
                    <circle cx="282" cy={m.y+14} r="1.5" fill={m.color}>
                      <animate attributeName="opacity" values="1;0.3;1" dur={`${1.5+i*0.4}s`} repeatCount="indefinite"/>
                    </circle>
                    <rect x="291" y={m.y+8} width="32" height="2.5" rx="1.2" fill="rgba(178,255,89,0.2)"/>
                    <rect x="291" y={m.y+14} width="22" height="2" rx="1" fill="rgba(255,255,255,0.1)"/>
                  </g>
                ))}

                {/* Neural mesh dots on core */}
                {[
                  [170,108],[152,128],[188,128],[148,152],[192,152],[160,162],[180,162]
                ].map(([cx,cy],i) => (
                  <circle key={i} cx={cx} cy={cy} r="1.8" fill="rgba(178,255,89,0.4)">
                    <animate attributeName="opacity" values="0.4;0.9;0.4" dur={`${1.2+i*0.2}s`} repeatCount="indefinite" begin={`${i*0.15}s`}/>
                  </circle>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline Process ── */}
      <section className="dt-process-section">
        <div className="dt-process-inner">
          <div className="dt-process-left">
            <span className="sdp-section-eyebrow">How We Work</span>
            <h2 className="dt-process-h2">How we transform your business</h2>
          </div>
          <div className="dt-timeline">
            {data.process.map((step, i) => (
              <div className="dt-tl-item" key={step}>
                <div className="dt-tl-spine">
                  <div className={`dt-tl-dot${i === data.process.length - 1 ? ' dt-tl-dot-last' : ''}`} />
                  {i < data.process.length - 1 && <div className="dt-tl-line" />}
                </div>
                <div className="dt-tl-content">
                  <div className="dt-tl-num">{String(i + 1).padStart(2, '0')}</div>
                  <div className="dt-tl-title">{step}</div>
                  <div className="dt-tl-desc">{processDescs[step] ?? ''}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="dt-cta-section">
        <h2 className="dt-cta-h2">TRANSFORM YOUR BUSINESS.</h2>
        <p className="dt-cta-sub">Drop your email and we'll send a personalised automation roadmap.</p>
        <div className="dt-cta-form">
          <input className="dt-cta-input" type="email" placeholder="your@email.com" />
          <Link to="/contact" className="sdp-btn-primary">Get Your Roadmap →</Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. BRANDING
═══════════════════════════════════════════════════════════════════════════ */
function BrandingPage({ data }: { data: ServiceData }) {
  return (
    <div className="br-page">
      <SiteNav />

      {/* ── Hero ── */}
      <section className="br-hero">
        <div className="br-hero-glow" aria-hidden="true" />
        <div className="br-hero-left">
          <span className="br-label">Branding</span>
          <h1 className="br-h1">
            <span className="br-h1-white">Build a Brand</span>
            <span className="br-h1-accent">People Remember.</span>
            <span className="br-h1-white">&amp; Trust.</span>
          </h1>
          <p className="br-desc">{data.description}</p>
          <div className="br-hero-btns">
            <Link to="/contact" className="sdp-btn-primary">Start Your Brand →</Link>
          </div>
        </div>
        <div className="br-hero-right">
          <div className="br-collage">
            <img src="/obba-1.webp" alt="Brand project Obba" className="br-col-img br-col-1" />
            <img src="/sarai-cover.webp" alt="Brand project Sarai" className="br-col-img br-col-2" />
            <img src="/flavourhub-cover.webp" alt="Brand project FlavourHub" className="br-col-img br-col-3" />
            <img src="/localshack-1.webp" alt="Brand project Local Shack" className="br-col-img br-col-4" />
          </div>
        </div>
      </section>

      {/* ── Creative Spectrum — GREEN SECTION ── */}
      <section className="br-spectrum-section">
        <div className="br-spectrum-inner">
          <div className="br-spectrum-left">
            <h2 className="br-spectrum-h2"><span style={{ color: '#005c2e' }}>Strategy</span> before aesthetics.</h2>
            <p className="br-spectrum-desc">Every brand we build starts with deep audience insight and competitive positioning. Beauty is the output, not the starting point.</p>
          </div>
          <div className="br-spectrum-right">
            <div className="br-mini-card">
              <div className="br-mini-title">Brand Audit</div>
              <div className="br-mini-desc">Deep competitive &amp; audience analysis</div>
            </div>
            <div className="br-mini-card">
              <div className="br-mini-title">Identity System</div>
              <div className="br-mini-desc">Logo, colour, type, iconography</div>
            </div>
            <div className="br-mini-card">
              <div className="br-mini-title">Brand Guidelines</div>
              <div className="br-mini-desc">Rules that scale across every touchpoint</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Masonry ── */}
      <section className="br-masonry-section">
        <div className="br-masonry-inner">
          <span className="sdp-section-eyebrow">What We Offer</span>
          <h2 className="br-masonry-h2">9 Creative Services</h2>
          <div className="br-masonry-grid">
            {data.subServices.map((svc, i) => (
              <div className={`br-ms-card${i === 0 ? ' br-ms-tall' : i === 1 ? ' br-ms-accent' : i === 6 ? ' br-ms-wide' : i === 8 ? ' br-ms-accent' : ''}${i === 2 || i === 3 || i === 7 ? ' br-ms-dark' : ''}`} key={svc.title}>
                <div className="br-ms-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="br-ms-title">{svc.title}</div>
                <div className="br-ms-desc">
                  {i === 7 ? <>Beautifully designed business cards, letterheads<br />and office stationery that make a lasting<br />first impression.</> : svc.desc}
                </div>
                <div className="br-ms-arrow">→</div>
                {i === 0 && (
                  <img src="/br-graphic-design.png" alt="" className="br-ms-card-img" aria-hidden="true" />
                )}
                {i === 1 && (
                  <img src="/br-video-reel.png" alt="" className="br-ms-card-img br-ms-card-img--reel" aria-hidden="true" />
                )}
                {i === 2 && (
                  <img src="/br-property-photo.png" alt="" className="br-ms-card-img br-ms-card-img--property" aria-hidden="true" />
                )}
                {i === 3 && (
                  <img src="/br-script-writing.png" alt="" className="br-ms-card-img br-ms-card-img--script" aria-hidden="true" />
                )}
                {i === 4 && (
                  <img src="/br-photo-processing.png" alt="" className="br-ms-card-img br-ms-card-img--photo" aria-hidden="true" />
                )}
                {i === 5 && (
                  <img src="/br-product-photo.png" alt="" className="br-ms-card-img br-ms-card-img--product" aria-hidden="true" />
                )}
                {i === 6 && (
                  <img src="/ass1@2x.png" alt="" className="br-ms-card-img br-ms-card-img--strategy" aria-hidden="true" />
                )}
                {i === 7 && (
                  <img src="/br-stationery.png" alt="" className="br-ms-card-img br-ms-card-img--stationery" aria-hidden="true" />
                )}
                {i === 8 && (
                  <img src="/br-ai-design.png" alt="" className="br-ms-card-img br-ms-card-img--ai" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hand Section ── */}
      <section className="br-hand-section">
        <div className="br-hand-inner">
          <div className="br-hand-img-wrap">
            <img src="/branding.png" alt="Human-led creativity" className="br-hand-img" />
          </div>
          <div className="br-hand-text">
            <h2 className="br-hand-h2">
              <span className="br-hand-accent">48h</span> First Concept Turnaround
            </h2>
            <p className="br-hand-desc">We move fast without cutting corners. Every brief gets a dedicated creative lead, a clear timeline, and concepts rooted in strategy — not guesswork.</p>
            <ul className="br-hand-list">
              <li>Tech startups seeking investor-ready branding</li>
              <li>Property &amp; real estate developers</li>
              <li>Consumer brands launching new product lines</li>
            </ul>
            <Link to="/contact" className="sdp-btn-primary" style={{ marginTop: '32px', display: 'inline-flex' }}>Start the Conversation →</Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="br-cta-section">
        <h2 className="br-cta-h2">Let's build something iconic.</h2>
        <p className="br-cta-sub">First concepts in 48 hours. No design-by-committee. Just bold, purposeful creative.</p>
        <div className="br-cta-btns">
          <Link to="/contact" className="sdp-btn-primary">Start the Conversation →</Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   5. MARKETING  — Upmind-inspired
═══════════════════════════════════════════════════════════════════════════ */
function MarketingPage({ data }: { data: ServiceData }) {
  const PROCESS_STEPS = [
    { num: '1', total: '6', title: 'Campaign Audit', desc: 'Analyse existing channel performance, identify budget waste, and benchmark against competitors.', shape: 'circle' },
    { num: '2', total: '6', title: 'Growth Strategy', desc: 'Define KPIs and target CPA/ROAS, build channel-mix recommendations, set a 90-day growth roadmap.', shape: 'ring' },
    { num: '3', total: '6', title: 'Creative Build', desc: 'Write high-converting ad copy, design creative assets, configure tracking and attribution.', shape: 'triangle' },
    { num: '4', total: '6', title: 'Campaign Launch', desc: 'Go live across all channels, monitor the first 72 hours, confirm conversion tracking is airtight.', shape: 'grid' },
    { num: '5', total: '6', title: 'Optimise & Scale', desc: 'Weekly bid and budget adjustments, A/B test creatives and landing pages, expand winning audiences.', shape: 'arc' },
    { num: '6', total: '6', title: 'Report & Refine', desc: 'Monthly executive dashboard with clear ROI, attribution data, and forward-looking recommendations.', shape: 'dot' },
  ]

  return (
    <div className="mk-page">
      <SiteNav />

      {/* ══ HERO — image background, overlaid text ══════════════════════════ */}
      <section className="mk2-hero">
        <div className="mk2-hero-bg" />
        <div className="mk2-hero-img" style={{ backgroundImage: 'url(/hero-marketing-bg.png)' }} />
        <div className="mk2-hero-overlay" />


        {/* Hand + folder image — right side */}
        <div className="mk2-hero-folder-wrap">
          <img src="/hand-folder.png" className="mk2-hero-hand" alt="" aria-hidden="true" />
          {/* Floating stat pills above the folder */}
          <div className="mk2-folder-pill mk2-folder-pill--1">
            <span className="mk2-fp-num">4.2x</span>
            <span className="mk2-fp-lbl">Average ROAS</span>
          </div>
          <div className="mk2-folder-pill mk2-folder-pill--2">
            <span className="mk2-fp-num">20+</span>
            <span className="mk2-fp-lbl">Industries Served</span>
          </div>
          <div className="mk2-folder-pill mk2-folder-pill--3">
            <span className="mk2-fp-num">$5M+</span>
            <span className="mk2-fp-lbl">Ad Spend Managed</span>
          </div>
        </div>

        <div className="mk2-hero-content">
          <p className="mk2-hero-above">Performance Marketing for ambitious brands</p>
          <h1 className="mk2-h1">
            Clear strategy.<br />
            Real results.<br />
            <em className="mk2-h1-em">Measurable growth.</em>
          </h1>
          <p className="mk2-hero-sub">
            We help brands harness data, creative, and AI to find their audience,
            cut acquisition costs, and make smarter decisions — at scale.
          </p>
          {/* Desktop only */}
          <div className="mk2-hero-btns--desktop">
            <Link to="/contact" className="mk2-btn-primary">Talk to a Strategist →</Link>
          </div>
        </div>

        {/* Mobile only — rendered after image in DOM order via flex order */}
        <div className="mk2-hero-btns--mobile">
          <Link to="/contact" className="mk2-btn-primary">Talk to a Strategist →</Link>
        </div>
      </section>

      {/* ══ STATS — removed ══════════════════════════════════════════════════ */}
      {false && <section className="mk2-stats-band">
        <div className="mk2-stats-inner">
          <div className="mk2-stat-item">
            <div className="mk2-stat-num">4.2x</div>
            <div className="mk2-stat-lbl">Average client ROAS</div>
          </div>
          <div className="mk2-stat-sep" />
          <div className="mk2-stat-item">
            <div className="mk2-stat-num">60%</div>
            <div className="mk2-stat-lbl">Avg lead cost reduction</div>
          </div>
          <div className="mk2-stat-sep" />
          <div className="mk2-stat-item">
            <div className="mk2-stat-num">$5M+</div>
            <div className="mk2-stat-lbl">Ad spend managed</div>
          </div>
        </div>
      </section>}

      {/* ══ WHO WE HELP — text left, dashboard card right ═══════════════════ */}
      <section className="mk2-about-section">
        <div className="mk2-about-left">
          <span className="mk2-eyebrow">· ABOUT US</span>
          <h2 className="mk2-about-h2">
            We help businesses make smarter marketing decisions
            and <strong>grow with clarity.</strong>
          </h2>
          <p className="mk2-about-desc">
            From data-led audience analysis to full-funnel campaign management,
            we combine strategy, creative, and technology to deliver marketing
            that compounds. Every campaign is measured, iterated, and built to scale.
          </p>
        </div>
        <div className="mk2-about-right">
          <div className="mk2-perf-card">
            <div className="mk2-perf-top">
              <span className="mk2-perf-label">Performance</span>
            </div>
            <div className="mk2-perf-big">
              <span className="mk2-perf-num">49%</span>
              <span className="mk2-perf-arrow">↑</span>
            </div>
            <div className="mk2-perf-bars">
              {[60,40,80,55,90].map((h,i) => (
                <div key={i} className="mk2-perf-bar-wrap">
                  <div className="mk2-perf-bar" style={{ height: `${h}%`, background: i === 4 ? '#b2ff59' : 'rgba(178,255,89,0.3)' }} />
                </div>
              ))}
            </div>
            <div className="mk2-perf-tags">
              <span className="mk2-ptag">Strategy</span>
              <span className="mk2-ptag mk2-ptag--active">AI-Powered</span>
              <span className="mk2-ptag">Full-Funnel</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES — sticky notes board ════════════════════════════════════ */}
      <section className="mk2-sticky-section">
        <div className="mk2-sticky-head">
          <span className="mk2-eyebrow">· SERVICES</span>
          <h2 className="mk2-sticky-h2">Expertise built on<br />insight &amp; experience</h2>
          <p className="mk2-sticky-sub">We deliver strategic results grounded in research, experience, and industry best practices.</p>
        </div>
        <div className="mk2-sticky-board">
          {data.subServices.slice(0, 7).map((svc, i) => (
            <div className={`mk2-note mk2-note--${i}`} key={svc.title}>
              <div className="mk2-note-pin" />
              <h3 className="mk2-note-title">{svc.title}</h3>
              <p className="mk2-note-desc">{svc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ HOW WE WORK — editorial light panels ════════════════════════════ */}
      <div className="mkp-journey">
        <div className="mkp-journey-intro">
          <p className="mkp-eyebrow">Our Process</p>
          <h2 className="mkp-journey-h2">Six stages from audit<br />to results.</h2>
        </div>

        {/* 1 / Campaign Audit */}
        <div className="mkp-row mkp-row--normal">
          <div className="mkp-text">
            <div className="mkp-counter"><span className="mkp-n">1</span><span className="mkp-total">/6</span></div>
            <h3 className="mkp-title">Campaign Audit</h3>
            <p className="mkp-desc">Analyse existing channel performance, identify budget waste, and benchmark against competitors.</p>
            <div className="mkp-tags"><span className="mkp-tag">Channel Analysis</span><span className="mkp-tag">Benchmarking</span><span className="mkp-tag">Budget Review</span></div>
          </div>
          <div className="mkp-visual">
            <div className="mkp-audit-wrap">
              <div className="mkp-card mkp-card--main">
                <div className="mkp-pin-dot"/><div className="mkp-card-lbl">Performance Review</div>
                {[{n:'Search',w:'76%',c:'rgba(80,140,55,0.65)'},{n:'Social',w:'52%',c:'rgba(110,160,70,0.5)'},{n:'Display',w:'31%',c:'rgba(180,190,100,0.5)'}].map(b=>(
                  <div key={b.n} className="mkp-bar-row"><span className="mkp-bar-nm">{b.n}</span><div className="mkp-bar-tr"><div className="mkp-bar-fl" style={{width:b.w,background:b.c}}/></div><span className="mkp-bar-vl">{b.w}</span></div>
                ))}
              </div>
              <div className="mkp-sticky mkp-sticky--rot1">
                <span className="mkp-sdot mkp-sdot--red"/>Waste: <strong>−£4.2k/mo</strong>
              </div>
              <div className="mkp-sheet mkp-sheet--rot2">
                <div className="mkp-sheet-lbl">Competitor Gap</div>
                <svg width="88" height="40" viewBox="0 0 88 40"><polyline points="0,34 22,26 44,30 66,12 88,6" fill="none" stroke="rgba(80,140,55,0.5)" strokeWidth="2"/><polyline points="0,38 22,35 44,32 66,26 88,22" fill="none" stroke="rgba(160,160,120,0.35)" strokeWidth="1.5" strokeDasharray="4 3"/></svg>
              </div>
            </div>
          </div>
        </div>

        {/* 2 / Growth Strategy */}
        <div className="mkp-row mkp-row--flip">
          <div className="mkp-visual">
            <div className="mkp-strategy-wrap">
              <div className="mkp-card mkp-card--board">
                <div className="mkp-card-lbl">90-Day Roadmap</div>
                {['Month 1','Month 2','Month 3'].map((m,i)=>(
                  <div key={m} className="mkp-board-row"><span className="mkp-bm">{m}</span><div className="mkp-bbar" style={{width:`${50+i*20}%`,opacity:0.55+i*0.15}}/></div>
                ))}
              </div>
              <div className="mkp-kpi-row">
                {[{l:'Target CPA',v:'£18'},{l:'ROAS Goal',v:'4.2×'},{l:'CAC',v:'−22%'}].map(k=>(
                  <div key={k.l} className="mkp-kpi"><span className="mkp-kl">{k.l}</span><span className="mkp-kv">{k.v}</span></div>
                ))}
              </div>
              <div className="mkp-donut">
                <svg viewBox="0 0 72 72" width="72" height="72">
                  <circle cx="36" cy="36" r="24" fill="none" stroke="rgba(210,220,195,0.6)" strokeWidth="10"/>
                  <circle cx="36" cy="36" r="24" fill="none" stroke="rgba(80,140,55,0.65)" strokeWidth="10" strokeDasharray="45 107" strokeDashoffset="-27" strokeLinecap="round"/>
                  <circle cx="36" cy="36" r="24" fill="none" stroke="rgba(130,180,90,0.45)" strokeWidth="10" strokeDasharray="30 122" strokeDashoffset="-72" strokeLinecap="round"/>
                  <text x="36" y="40" textAnchor="middle" fontSize="9" fill="rgba(50,80,35,0.7)" fontWeight="700">Mix</text>
                </svg>
              </div>
            </div>
          </div>
          <div className="mkp-text">
            <div className="mkp-counter"><span className="mkp-n">2</span><span className="mkp-total">/6</span></div>
            <h3 className="mkp-title">Growth Strategy</h3>
            <p className="mkp-desc">Define KPIs and target CPA/ROAS, build channel-mix recommendations, set a 90-day growth roadmap.</p>
            <div className="mkp-tags"><span className="mkp-tag">KPI Setting</span><span className="mkp-tag">Channel Mix</span><span className="mkp-tag">90-Day Plan</span></div>
          </div>
        </div>

        {/* 3 / Creative Build */}
        <div className="mkp-row mkp-row--normal">
          <div className="mkp-text">
            <div className="mkp-counter"><span className="mkp-n">3</span><span className="mkp-total">/6</span></div>
            <h3 className="mkp-title">Creative Build</h3>
            <p className="mkp-desc">Write high-converting ad copy, design creative assets, configure tracking and attribution.</p>
            <div className="mkp-tags"><span className="mkp-tag">Ad Copy</span><span className="mkp-tag">Creative Assets</span><span className="mkp-tag">Attribution</span></div>
          </div>
          <div className="mkp-visual">
            <div className="mkp-creative-wrap">
              <div className="mkp-adcard mkp-adcard--b3"/>
              <div className="mkp-adcard mkp-adcard--b2"><div className="mkp-adlbl">Version B</div><div className="mkp-adhl">Grow 3× faster.</div></div>
              <div className="mkp-adcard mkp-adcard--b1"><div className="mkp-adlbl mkp-adlbl--win">✓ Winner</div><div className="mkp-adhl">Scale what works.</div><div className="mkp-adcta">Start Free →</div></div>
              <div className="mkp-annot"><div className="mkp-annot-line"/><div className="mkp-annot-txt">Pixel ✓<br/>Conv. tracked</div></div>
              <div className="mkp-copy-note">"Turn clicks into customers"</div>
            </div>
          </div>
        </div>

        {/* 4 / Campaign Launch */}
        <div className="mkp-row mkp-row--flip">
          <div className="mkp-visual">
            <div className="mkp-launch-wrap">
              <div className="mkp-card mkp-card--launch">
                <div className="mkp-launch-hdr"><span className="mkp-ldot"/>Live — 72h Monitor</div>
                {[{ch:'Google Ads',pct:94},{ch:'Meta Ads',pct:87},{ch:'LinkedIn',pct:76}].map(c=>(
                  <div key={c.ch} className="mkp-lrow"><span className="mkp-lch">{c.ch}</span><div className="mkp-ltr"><div className="mkp-lfl" style={{width:`${c.pct}%`}}/></div><span className="mkp-lst">Active</span></div>
                ))}
              </div>
              <div className="mkp-conv-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(60,120,40,0.9)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Conversion Tracking Airtight
              </div>
              <div className="mkp-spark"><span className="mkp-spark-lbl">Impressions / 72h</span><svg width="110" height="32" viewBox="0 0 110 32"><polyline points="0,28 18,24 36,18 55,12 73,7 91,4 110,1" fill="none" stroke="rgba(80,140,55,0.6)" strokeWidth="2"/></svg></div>
            </div>
          </div>
          <div className="mkp-text">
            <div className="mkp-counter"><span className="mkp-n">4</span><span className="mkp-total">/6</span></div>
            <h3 className="mkp-title">Campaign Launch</h3>
            <p className="mkp-desc">Go live across all channels, monitor the first 72 hours, confirm conversion tracking is airtight.</p>
            <div className="mkp-tags"><span className="mkp-tag">Go Live</span><span className="mkp-tag">72h Monitor</span><span className="mkp-tag">Conversion QA</span></div>
          </div>
        </div>

        {/* 5 / Optimise & Scale */}
        <div className="mkp-row mkp-row--normal">
          <div className="mkp-text">
            <div className="mkp-counter"><span className="mkp-n">5</span><span className="mkp-total">/6</span></div>
            <h3 className="mkp-title">Optimise & Scale</h3>
            <p className="mkp-desc">Weekly bid and budget adjustments, A/B test creatives and landing pages, expand winning audiences.</p>
            <div className="mkp-tags"><span className="mkp-tag">A/B Testing</span><span className="mkp-tag">Bid Optimisation</span><span className="mkp-tag">Audience Scaling</span></div>
          </div>
          <div className="mkp-visual">
            <div className="mkp-optimise-wrap">
              <div className="mkp-ab">
                <div className="mkp-ab-card"><div className="mkp-ablbl">A</div><div className="mkp-abmet">CTR 2.1%</div><div className="mkp-abbar" style={{width:'42%',background:'rgba(170,175,140,0.4)'}}/></div>
                <span className="mkp-ab-vs">vs</span>
                <div className="mkp-ab-card mkp-ab-card--win"><div className="mkp-ablbl mkp-ablbl--win">B ✓</div><div className="mkp-abmet">CTR 3.8%</div><div className="mkp-abbar" style={{width:'76%',background:'rgba(80,140,55,0.6)'}}/></div>
              </div>
              <div className="mkp-card mkp-bid-card">
                <div className="mkp-card-lbl">Weekly Bid Adjustments</div>
                <svg width="150" height="44" viewBox="0 0 150 44">{[0,1,2,3,4,5,6,7].map(i=>{const h=[18,26,16,32,22,38,28,42][i];return<rect key={i} x={i*18+2} y={44-h} width="13" height={h} rx="3" fill={i===7?'rgba(80,140,55,0.7)':'rgba(150,165,130,0.3)'}/>})}</svg>
              </div>
              <div className="mkp-aud"><div className="mkp-aud-ring"/>Lookalike ×3 expanded</div>
            </div>
          </div>
        </div>

        {/* 6 / Report & Refine */}
        <div className="mkp-row mkp-row--flip mkp-row--last">
          <div className="mkp-visual">
            <div className="mkp-report-wrap">
              <div className="mkp-card mkp-card--dash">
                <div className="mkp-dash-hdr"><span>Monthly ROI Report</span><span className="mkp-dash-dt">Oct 2026</span></div>
                <div className="mkp-dash-kpis">
                  {[{l:'Revenue',v:'£184k',up:true},{l:'ROAS',v:'5.1×',up:true},{l:'CPA',v:'£14.2',up:false}].map(k=>(
                    <div key={k.l} className="mkp-dkpi"><span className="mkp-dkl">{k.l}</span><span className="mkp-dkv">{k.v}</span><span className={k.up?'mkp-up':'mkp-dn'}>{k.up?'↑':'↓'}</span></div>
                  ))}
                </div>
                <div className="mkp-attr">
                  {[{src:'Search',h:30},{src:'Social',h:42},{src:'Email',h:54}].map(a=>(
                    <div key={a.src} className="mkp-attr-col"><div className="mkp-attr-bar" style={{height:a.h}}/><span>{a.src}</span></div>
                  ))}
                </div>
              </div>
              <div className="mkp-fwd"><span className="mkp-fwd-arr">→</span><span>Next 30-day<br/>recommendations ready</span></div>
            </div>
          </div>
          <div className="mkp-text">
            <div className="mkp-counter"><span className="mkp-n">6</span><span className="mkp-total">/6</span></div>
            <h3 className="mkp-title">Report & Refine</h3>
            <p className="mkp-desc">Monthly executive dashboard with clear ROI, attribution data, and forward-looking recommendations.</p>
            <div className="mkp-tags"><span className="mkp-tag">ROI Dashboard</span><span className="mkp-tag">Attribution</span><span className="mkp-tag">Recommendations</span></div>
          </div>
        </div>
      </div>

      {/* dummy closing tag to satisfy old block removal */}
      {false && PROCESS_STEPS.map((step, _i) => (
        <section key={step.num} className="mk2-process-panel" style={{}}>
          <div className="mk2-process-left"/>
          <div className="mk2-process-right">
            {step.shape === 'dot' && (
              <svg className="mk2-shape" viewBox="0 0 200 200" fill="none">
                {[[100,100,60,60],[100,100,140,60],[100,100,160,130],[100,100,50,140]].map(([x1,y1,x2,y2],idx) => (
                  <line key={idx} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(178,255,89,0.15)" strokeWidth="1" />
                ))}
              </svg>
            )}
          </div>
        </section>
      ))}

      {/* ══ TESTIMONIAL ══════════════════════════════════════════════════════ */}
      <section className="mk2-testi-section">
        <div className="mk2-testi-inner">
          <p className="mk2-testi-quote">
            "They brought clarity to our marketing chaos — breaking down silos,
            cutting wasted spend by 58%, and delivering a pipeline that actually
            converts. The ROI was visible within the first sprint."
          </p>
          <div className="mk2-testi-author">
            <div className="mk2-testi-avatar">JO</div>
            <div>
              <div className="mk2-testi-name">James Okafor</div>
              <div className="mk2-testi-role">CEO, VaultKit</div>
            </div>
          </div>
          <div className="mk2-testi-nav">
            <button className="mk2-testi-btn" aria-label="Previous">‹</button>
            <button className="mk2-testi-btn" aria-label="Next">›</button>
          </div>
        </div>
      </section>


      {/* ══ CTA — landscape image bg ══════════════════════════════════════════ */}
      <section className="mk2-cta-section">
        <div className="mk2-cta-overlay" />
        <div className="mk2-cta-content">
          <h2 className="mk2-cta-h2">Ready to elevate<br />your business?</h2>
          <div className="mk2-cta-btns">
            <Link to="/contact" className="mk2-btn-primary">Book a Call →</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Main export — switch on slug
═══════════════════════════════════════════════════════════════════════════ */
export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const data = slug ? services[slug] : undefined

  if (!data) {
    return <Navigate to="/services" replace />
  }

  switch (slug) {
    case 'software-development':
      return <SoftwareDevPage data={data} />
    case 'web-development':
      return <WebDevPage data={data} />
    case 'digital-transformation':
      return <DigitalTransformPage data={data} />
    case 'branding':
      return <BrandingPage data={data} />
    case 'marketing':
      return <MarketingPage data={data} />
    default:
      return <Navigate to="/services" replace />
  }
}
