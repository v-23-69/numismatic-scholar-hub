
import { motion } from 'framer-motion';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const TermsOfService = () => {
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
                Terms of Service
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
                <h2 className="text-2xl font-bold text-royal mb-4">Acceptance of Terms</h2>
                <p className="text-gray-600">
                  By accessing and using NumismaticScholar, you acknowledge that you have read, 
                  understood, and agree to be bound by these Terms of Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-royal mb-4">Use of Service</h2>
                <p className="text-gray-600 mb-4">
                  You may use our service only for lawful purposes and in accordance with these Terms. 
                  You agree not to use the service in any way that violates any applicable laws or regulations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-royal mb-4">User Accounts</h2>
                <p className="text-gray-600">
                  When you create an account with us, you must provide information that is accurate, 
                  complete, and current at all times. You are responsible for safeguarding the password 
                  and all activities that occur under your account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-royal mb-4">Contact Information</h2>
                <p className="text-gray-600">
                  For questions about these Terms of Service, please contact us at 
                  legal@numismaticscholar.com
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

export default TermsOfService;
