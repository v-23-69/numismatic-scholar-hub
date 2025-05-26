
import { motion } from 'framer-motion';
import { Shield, Award, BookOpen, Users, Phone, Mail, Instagram } from 'lucide-react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FloatingActionButton from "@/components/FloatingActionButton";

const About = () => {
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
                <Button className="bg-gold text-royal hover:bg-gold-light">
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
        <section className="py-16 bg-gray-50">
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
        
        {/* Contact Section */}
        <section id="contact" className="py-16 bg-gradient-to-b from-royal/5 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-playfair text-3xl font-bold text-royal mb-4">Contact Support</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Have questions about our services or need assistance with your account? Our support team is here to help.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gold/10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-royal/10 text-royal mb-4">
                    <Phone className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-royal mb-2">Phone</h3>
                  <a href="tel:+919876543210" className="text-gray-700 hover:text-royal">
                    +91-9876543210
                  </a>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gold/10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-royal/10 text-royal mb-4">
                    <Mail className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-royal mb-2">Email</h3>
                  <a href="mailto:support@coinglobe.in" className="text-gray-700 hover:text-royal">
                    support@coinglobe.in
                  </a>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gold/10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 text-pink-600 mb-4">
                    <Instagram className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-royal mb-2">Instagram</h3>
                  <a href="https://instagram.com/coinglobe" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-royal">
                    @coinglobe
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default About;
