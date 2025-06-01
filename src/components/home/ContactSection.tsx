
import { motion } from 'framer-motion';
import { Phone, Instagram, Youtube, Twitter } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-royal font-playfair mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help you on your numismatic journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-royal/10 rounded-full mb-4">
              <Phone className="h-8 w-8 text-royal" />
            </div>
            <h3 className="text-xl font-bold text-royal mb-2">Phone</h3>
            <a 
              href="tel:+919876543210" 
              className="text-gray-600 hover:text-royal transition-colors"
            >
              +91-9876543210
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
              <Instagram className="h-8 w-8 text-pink-600" />
            </div>
            <h3 className="text-xl font-bold text-royal mb-2">Instagram</h3>
            <a 
              href="https://instagram.com/coinglobe" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-royal transition-colors"
            >
              @coinglobe
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <Youtube className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-royal mb-2">YouTube</h3>
            <a 
              href="https://youtube.com/@coinglobe" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-royal transition-colors"
            >
              youtube.com/@coinglobe
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Twitter className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-royal mb-2">Twitter</h3>
            <a 
              href="https://twitter.com/coinglobe_official" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-royal transition-colors"
            >
              @coinglobe_official
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
