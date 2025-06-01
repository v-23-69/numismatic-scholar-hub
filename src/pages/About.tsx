import { motion } from 'framer-motion';
import { Shield, Award, BookOpen, Users, Mail, Phone, Instagram } from 'lucide-react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

const About = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Scroll to top first
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Then scroll to specific section if query param exists
    const section = searchParams.get('section');
    if (section === 'authentication') {
      setTimeout(() => {
        const element = document.querySelector('[data-section="authentication"]');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, [searchParams]);

  const handleExploreCourses = () => {
    navigate('/courses');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-royal to-royal-light text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1 
                className="font-playfair text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                About NumismaticScholar
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                NumismaticScholar helps coin collectors learn, showcase, and connect.
                We offer educational video courses, a trusted marketplace for coins, 
                and a growing collector community.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button 
                  onClick={handleExploreCourses}
                  className="bg-gold text-royal hover:bg-gold-light"
                >
                  Explore Our Courses
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Mission Statement */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-playfair text-3xl font-bold text-royal mb-6">Our Mission</h2>
                <div className="relative">
                  <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent top-1/2 transform -translate-y-1/2"></div>
                </div>
              </div>
              
              <Card className="border-gold/20 mb-12">
                <CardContent className="p-8">
                  <blockquote className="italic text-xl text-center text-gray-700 font-playfair">
                    "To preserve numismatic history through education, foster a community of passionate collectors, and provide a trusted platform for the exchange of knowledge and coins."
                  </blockquote>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* What We Do */}
        <section className="py-16 bg-gray-50" data-section="authentication">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-playfair text-3xl font-bold text-royal mb-4">What We Do</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  NumismaticScholar is dedicated to serving the coin collecting community through three primary services:
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gold/10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-royal text-gold mb-4">
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-royal mb-3">Education</h3>
                  <p className="text-gray-700">
                    Expert-led courses that cover numismatic history, grading techniques, and investment strategies
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gold/10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-royal text-gold mb-4">
                    <Shield className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-royal mb-3">Marketplace</h3>
                  <p className="text-gray-700">
                    A trusted platform for collectors to buy and sell authenticated coins with full transparency
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gold/10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-royal text-gold mb-4">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-royal mb-3">Community</h3>
                  <p className="text-gray-700">
                    Connecting collectors through social platforms to share knowledge and build relationships
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Expert Coin Authentication Section */}
        <section className="py-16 bg-white" data-section="authentication">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-playfair text-3xl font-bold text-royal mb-4">Expert Coin Authentication</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Our professional authentication service provides comprehensive analysis of your coins using advanced techniques and expert knowledge.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gray-50 p-6 rounded-lg border border-gold/10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-royal text-gold mb-4">
                    <Upload className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-royal mb-3">Upload & Analyze</h3>
                  <p className="text-gray-700">
                    Upload clear photos of your coin and receive detailed expert analysis within 24 hours
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg border border-gold/10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-royal text-gold mb-4">
                    <Shield className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-royal mb-3">Authenticity Check</h3>
                  <p className="text-gray-700">
                    Get verification of authenticity, era identification, and material composition analysis
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg border border-gold/10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-royal text-gold mb-4">
                    <Award className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-royal mb-3">Expert Report</h3>
                  <p className="text-gray-700">
                    Receive a comprehensive PDF report with valuation, rarity assessment, and market insights
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-playfair text-3xl font-bold text-royal mb-4">Our Impact</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-royal/10 text-royal mb-3">
                    <Users className="h-6 w-6" />
                  </div>
                  <p className="text-3xl font-bold text-royal font-playfair">10,000+</p>
                  <p className="text-gray-600">Active Members</p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-royal/10 text-royal mb-3">
                    <Shield className="h-6 w-6" />
                  </div>
                  <p className="text-3xl font-bold text-royal font-playfair">1,500+</p>
                  <p className="text-gray-600">Verified Coins</p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-royal/10 text-royal mb-3">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <p className="text-3xl font-bold text-royal font-playfair">50+</p>
                  <p className="text-gray-600">Expert Courses</p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-royal/10 text-royal mb-3">
                    <Award className="h-6 w-6" />
                  </div>
                  <p className="text-3xl font-bold text-royal font-playfair">25+</p>
                  <p className="text-gray-600">Certified Mentors</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-16 bg-gray-50" data-section="community">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-playfair text-3xl font-bold text-royal mb-6">Our Community</h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of passionate collectors who share knowledge, showcase their collections, 
                and build lasting connections in the world of numismatics.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gold/10">
                  <h3 className="text-xl font-bold text-royal mb-3">Expert Forums</h3>
                  <p className="text-gray-700">Discuss rare finds and get expert opinions</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gold/10">
                  <h3 className="text-xl font-bold text-royal mb-3">Collection Showcase</h3>
                  <p className="text-gray-700">Share your prized coins with fellow enthusiasts</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gold/10">
                  <h3 className="text-xl font-bold text-royal mb-3">Trading Hub</h3>
                  <p className="text-gray-700">Connect with verified buyers and sellers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section id="contact" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-playfair text-3xl font-bold text-royal mb-4">Need Help? Get in Touch</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Our support team is here to help you with any questions about our courses, marketplace, or community features.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gold/10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-royal/10 text-royal mb-4">
                    <Phone className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-royal mb-2">Phone Support</h3>
                  <a href="tel:+919876543210" className="text-gray-600 hover:text-royal transition-colors">
                    +91-9876543210
                  </a>
                  <p className="text-sm text-gray-500 mt-2">Mon-Fri, 9AM-6PM IST</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gold/10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-royal/10 text-royal mb-4">
                    <Mail className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-royal mb-2">Email Support</h3>
                  <a href="mailto:support@coinglobe.in" className="text-gray-600 hover:text-royal transition-colors">
                    support@coinglobe.in
                  </a>
                  <p className="text-sm text-gray-500 mt-2">Response within 24 hours</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gold/10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 text-pink-600 mb-4">
                    <Instagram className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-royal mb-2">Social Media</h3>
                  <a href="https://wa.me/919876543210" className="text-gray-600 hover:text-royal transition-colors">
                    @coinglobe
                  </a>
                  <p className="text-sm text-gray-500 mt-2">Follow us for updates</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
