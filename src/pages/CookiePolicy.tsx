
import { motion } from 'framer-motion';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-royal/5 py-10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-4xl font-bold text-royal font-playfair mb-4">
                Cookie Policy
              </h1>
              <p className="text-gray-600">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </motion.div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gold/10"
          >
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-royal mb-4">What Are Cookies</h2>
                <p className="text-gray-600">
                  Cookies are small text files that are stored on your device when you visit our website. 
                  They help us recognize your device and provide you with a better browsing experience.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-royal mb-4">How We Use Cookies</h2>
                <p className="text-gray-600 mb-4">We use cookies for various purposes, including:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Essential cookies to operate the website and provide our services</li>
                  <li>Authentication cookies to remember your login status</li>
                  <li>Preference cookies to remember your settings and preferences</li>
                  <li>Analytics cookies to understand how visitors interact with our website</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-royal mb-4">Managing Cookies</h2>
                <p className="text-gray-600">
                  Most web browsers allow you to control cookies through their settings. You can 
                  typically delete existing cookies, block certain types of cookies, or set your 
                  browser to notify you when cookies are being sent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-royal mb-4">Contact Us</h2>
                <p className="text-gray-600">
                  If you have any questions about our use of cookies, please contact us at 
                  cookies@numismaticscholar.com
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
