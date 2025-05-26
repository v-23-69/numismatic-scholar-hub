import { Link } from 'react-router-dom';
import { Instagram, Youtube, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-royal py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About Us section */}
        <div>
          <h3 className="font-bold text-white mb-4">About Us</h3>
          <p className="text-gray-300">
            NumismaticScholar is dedicated to providing high-quality education and resources for coin collectors.
          </p>
          <div className="mt-4 flex space-x-4">
            <a href="https://facebook.com/coinglobe" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://instagram.com/coinglobe" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://youtube.com/@coinglobe" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
              <Youtube className="h-5 w-5" />
            </a>
            <a href="https://twitter.com/coinglobe_official" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        {/* Quick Links section */}
        <div>
          <h3 className="font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/courses" className="text-gray-300 hover:text-white transition-colors">
                Courses
              </Link>
            </li>
             <li>
              <Link to="/coins-market" className="text-gray-300 hover:text-white transition-colors">
                Coins Market
              </Link>
            </li>
            <li>
              <Link to="/verify-coins" className="text-gray-300 hover:text-white transition-colors">
                Verify Your Coins
              </Link>
            </li>
            <li>
              <Link to="/community" className="text-gray-300 hover:text-white transition-colors">
                Community
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                About
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Support Links */}
        <div>
          <h3 className="font-bold text-white mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="/about#contact" className="text-gray-300 hover:text-white transition-colors">
                Contact Support
              </a>
            </li>
            <li>
              <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/refund-policy" className="text-gray-300 hover:text-white transition-colors">
                Refund Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-of-service" className="text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="font-bold text-white mb-4">Subscribe</h3>
          <p className="text-gray-300">
            Stay up to date with the latest courses, coin listings, and community news.
          </p>
          <div className="mt-4">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-2 rounded-md bg-royal-light text-white focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <button className="w-full mt-2 py-2 rounded-md bg-gold text-royal hover:bg-gold-light transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} NumismaticScholar. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
