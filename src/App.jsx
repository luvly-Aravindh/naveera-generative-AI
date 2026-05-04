import TopBar    from './components/TopBar.jsx'
import Navbar    from './components/Navbar.jsx'
import Hero      from './components/Hero.jsx'
import PainPoints from './components/PainPoints.jsx'
import LeadForm from './components/LeadForm.jsx'
import { VideoSection, Testimonials, Services, Results } from './components/sections1.jsx'
import { Process, TrustBadges, Comparison, FAQ, FinalCTA, Footer } from './components/sections2.jsx'

export default function App() {
  return (
    <div className="min-h-screen" style={{ background:'#F8FAFC' }}>
      <TopBar />
      {/* <Navbar /> */}
      <main>
        <Hero />
        <PainPoints />
        <VideoSection />
        <Testimonials />
        <Services />
        <Results />
        <Process />
        <TrustBadges />
        <Comparison />
        <LeadForm />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
