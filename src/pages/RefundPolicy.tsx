
import { motion } from 'framer-motion';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const RefundPolicy = () => {
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
                Refund Policy
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
                <h2 className="text-2xl font-bold text-royal mb-4">Course Refunds</h2>
                <p className="text-gray-600 mb-4">
                  We offer a 7-day satisfaction guarantee for all courses purchased on NumismaticScholar. 
                  If you are unsatisfied with a course, you may request a full refund within 7 days of purchase.
                </p>
                <p className="text-gray-600">
                  Refunds are available provided you have not completed more than 25% of the course content.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-royal mb-4">Verification Services</h2>
                <p className="text-gray-600">
                  Our coin verification services are non-refundable once the verification process has begun. 
                  If we are unable to verify a coin due to insufficient information, we will offer one 
                  opportunity to resubmit at no additional cost.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-royal mb-4">How to Request a Refund</h2>
                <p className="text-gray-600">
                  To request a refund, please contact our support team at refunds@numismaticscholar.com 
                  with your order details and reason for the refund request. We aim to process all 
                  refund requests within 5 business days.
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

export default RefundPolicy;
