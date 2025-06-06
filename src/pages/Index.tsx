
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedSections from "@/components/home/FeaturedSections";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import Testimonials from "@/components/home/Testimonials";
import TrustStats from "@/components/home/TrustStats";
import CallToAction from "@/components/home/CallToAction";
import CoinAuthenticationFeature from "@/components/home/CoinAuthenticationFeature";
import LatestSection from "@/components/home/LatestSection";
import ContactSection from "@/components/home/ContactSection";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Handle anchor scrolling for contact section
    if (location.hash === '#contact') {
      setTimeout(() => {
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <div id="featured-sections">
          <FeaturedSections />
        </div>
        <CoinAuthenticationFeature />
        <LatestSection />
        <FeaturedCourses />
        <TrustStats />
        <Testimonials />
        <ContactSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
