
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
import FloatingActionButton from "@/components/FloatingActionButton";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const { pathname, hash } = useLocation();

  // Scroll to top when navigating to the home page
  useEffect(() => {
    if (pathname === "/" && !hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedSections />
        <CoinAuthenticationFeature />
        <LatestSection />
        <FeaturedCourses />
        <TrustStats />
        <Testimonials />
        <ContactSection />
        <CallToAction />
      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default Index;
