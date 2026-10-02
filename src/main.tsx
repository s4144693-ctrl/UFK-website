import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import AboutPage from './AboutPage.tsx'
import ContactPage from './ContactPage.tsx'
import BlogPage from './BlogPage.tsx'
import IndustriesPage from './IndustriesPage.tsx'
import ClientsPage from './ClientsPage.tsx'
import MarketeamPage from './MarketeamPage.tsx'
import ProjectsPage from './ProjectsPage.tsx'
import ProjectDetailPage from './ProjectDetailPage.tsx'
import ServiceDetailPage from './ServiceDetailPage'
import ProposalPage from './ProposalPage'
import AviationIndustryPage from './AviationIndustryPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/industries/aviation" element={<AviationIndustryPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/marketeam" element={<MarketeamPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/services/proposal-development" element={<ProposalPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
