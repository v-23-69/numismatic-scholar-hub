
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Shield, Award, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-royal text-white">
      <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 border-b border-white/10 pb-12">
          <div className="flex flex-col items-center text-center">
            <Shield className="h-8 w-8 text-gold mb-3" />
            <h4 className="font-bold text-lg">100% Secure</h4>
            <p className="text-sm text-white/70">SSL Protected Checkout</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <Award className="h-8 w-8 text-gold mb-3" />
            <h4 className="font-bold text-lg">Expert Verified</h4>
            <p className="text-sm text-white/70">Master Numismatists</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <Globe className="h-8 w-8 text-gold mb-3" />
            <h4 className="font-bold text-lg">Global Community</h4>
            <p className="text-sm text-white/70">40+ Countries</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <Mail className="h-8 w-8 text-gold mb-3" />
            <h4 className="font-bold text-lg">24/7 Support</h4>
            <p className="text-sm text-white/70">Always Here to Help</p>
          </div>
        </div>
        
        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-royal font-bold text-lg">NS</span>
              </div>
              <span className="font-playfair font-bold text-xl">NumismaticScholar</span>
            </div>
            <p className="text-sm text-white/70 mb-4">
              The trusted home for coin knowledge, collecting, and community — bringing together enthusiasts, experts, and institutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-gold transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/courses" className="text-white/70 hover:text-gold transition-colors">Courses</Link></li>
              <li><Link to="/coins-market" className="text-white/70 hover:text-gold transition-colors">Marketplace</Link></li>
              <li><Link to="/mentors" className="text-white/70 hover:text-gold transition-colors">Mentors</Link></li>
              <li><Link to="/community" className="text-white/70 hover:text-gold transition-colors">Community</Link></li>
              <li><Link to="/articles" className="text-white/70 hover:text-gold transition-colors">Articles & Blog</Link></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/legal/privacy-policy" className="text-white/70 hover:text-gold transition-colors">Privacy Policy</Link></li>
              <li><Link to="/legal/terms-of-service" className="text-white/70 hover:text-gold transition-colors">Terms of Service</Link></li>
              <li><Link to="/legal/refund-policy" className="text-white/70 hover:text-gold transition-colors">Refund Policy</Link></li>
              <li><Link to="/legal/verification-process" className="text-white/70 hover:text-gold transition-colors">Verification Process</Link></li>
              <li><Link to="/legal/cookie-policy" className="text-white/70 hover:text-gold transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="text-white/70 mb-4">Have questions or need assistance? Reach out to our team.</p>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-white/70">📞 +91-9876543210</p>
              <p className="text-sm text-white/70">📧 support@numismaticscholar.com</p>
              <p className="text-sm text-white/70">📱 @coinglobe</p>
            </div>
            <Link 
              to="/contact" 
              className="inline-flex items-center px-4 py-2 bg-gold text-royal font-medium rounded-md hover:bg-gold-light transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center pt-8 border-t border-white/10">
          <p className="text-sm text-white/70">
            © {currentYear} NumismaticScholar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
