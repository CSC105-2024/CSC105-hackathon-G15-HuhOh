import CtaSection from '@/components/Landing/CtaSection'
import FeaturesSection from '@/components/Landing/FeaturesSection'
import FooterSection from '@/components/Landing/FooterSection'
import HeroSection from '@/components/Landing/HeroSection'
import LandingNavBar from '@/components/Landing/LandingNavBar'
import TrendingSection from '@/components/Landing/TrendingSection'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <LandingNavBar />
      <HeroSection />
      <TrendingSection />
      <FeaturesSection />
      <CtaSection />
      <FooterSection />
    </div>
  )
}

export default LandingPage
