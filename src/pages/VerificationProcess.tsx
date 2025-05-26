
import { motion } from 'framer-motion';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const VerificationProcess = () => {
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
                Verification Process
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
                <h2 className="text-2xl font-bold text-royal mb-4">Overview</h2>
                <p className="text-gray-600">
                  Our coin verification service provides professional authentication and assessment 
                  of coins by numismatic experts. The verification process includes authentication, 
                  grading, and valuation of your coins.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-royal mb-4">Submission Requirements</h2>
                <p className="text-gray-600 mb-4">To ensure accurate verification, please provide:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>High-resolution images of both sides of the coin</li>
                  <li>Close-up images of any distinctive marks or features</li>
                  <li>Information about the coin's origin if known</li>
                  <li>Any relevant historical documentation (if available)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-royal mb-4">Expert Qualifications</h2>
                <p className="text-gray-600">
                  Our verification team consists of experts with a minimum of 10 years of experience 
                  in numismatics. Each verification is reviewed by at least two experts before a 
                  report is issued.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-royal mb-4">Turnaround Time</h2>
                <p className="text-gray-600">
                  Most verifications are completed within 24 hours of submission. Complex cases 
                  may require additional time for thorough analysis.
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

export default VerificationProcess;
