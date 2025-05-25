
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <section className="py-16 bg-royal text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mb-8 md:mb-0"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
              Ready to Join Our Distinguished Community?
            </h2>
            <p className="text-white/80 text-lg mb-6">
              Start your numismatic journey today. Register for free and gain access to courses, 
              marketplace, and our active community of enthusiasts and experts.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/community">
                <Button className="bg-gold hover:bg-gold-light text-royal font-medium px-8 py-6 text-lg">
                  Join Now
                </Button>
              </Link>
              <Link to="/courses">
                <Button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-6 text-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-royal-light p-8 rounded-lg border border-white/10 w-full md:w-auto"
          >
            <h3 className="text-2xl font-bold mb-4 font-playfair">Newsletter</h3>
            <p className="text-white/80 mb-4">
              Subscribe to our newsletter for the latest updates on courses, coins, and community events.
            </p>
            <form className="space-y-4">
              <div>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-gold text-white placeholder-white/50"
                />
              </div>
              <Link to="/subscribe">
                <Button className="w-full bg-gold hover:bg-gold-light text-royal font-medium">
                  Subscribe
                </Button>
              </Link>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
