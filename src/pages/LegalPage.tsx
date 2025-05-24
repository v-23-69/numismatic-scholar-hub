
import { motion } from 'framer-motion';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type LegalPageProps = {
  type: 'privacy' | 'terms' | 'refund' | 'verification' | 'cookie';
}

const LegalPage = ({ type }: LegalPageProps) => {
  const getTitle = () => {
    switch(type) {
      case 'privacy': return 'Privacy Policy';
      case 'terms': return 'Terms of Service';
      case 'refund': return 'Refund Policy';
      case 'verification': return 'Verification Process';
      case 'cookie': return 'Cookie Policy';
      default: return '';
    }
  };
  
  const getContent = () => {
    switch(type) {
      case 'privacy': 
        return (
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-bold text-royal mb-4">1. Information We Collect</h3>
              <p>We collect various types of information from our users when they interact with our platform, including:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Personal information such as name, email address, and contact details</li>
                <li>Account information necessary for authentication</li>
                <li>Transaction and payment details when you purchase courses or services</li>
                <li>Content you upload, including images of coins for verification</li>
                <li>Usage data and interaction with our platform</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-xl font-bold text-royal mb-4">2. How We Use Your Information</h3>
              <p>We use the collected information for various purposes, including:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Providing and maintaining our services</li>
                <li>Processing transactions and sending related information</li>
                <li>Sending administrative information and important notifications</li>
                <li>Improving and personalizing your experience on our platform</li>
                <li>Analyzing usage patterns to enhance our offerings</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-xl font-bold text-royal mb-4">3. Data Storage and Security</h3>
              <p>
                NumismaticScholar uses Supabase for secure data storage. We implement appropriate
                technical and organizational measures to protect your personal information against
                unauthorized or unlawful processing, accidental loss, destruction, or damage.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-bold text-royal mb-4">4. Your Rights</h3>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Access and receive a copy of your personal data</li>
                <li>Rectify inaccurate or incomplete personal data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Data portability under certain circumstances</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-xl font-bold text-royal mb-4">5. Contact Information</h3>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
                <br />
                Email: privacy@numismaticscholar.com
                <br />
                Address: NumismaticScholar, New Delhi, India
              </p>
            </section>
          </div>
        );
        
      case 'terms': 
        return (
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-bold text-royal mb-4">1. Acceptance of Terms</h3>
              <p>
                By accessing and using NumismaticScholar, you acknowledge that you have read, understood, 
                and agree to be bound by these Terms of Service. If you do not agree with any part of these
                terms, please do not use our platform.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-bold text-royal mb-4">2. User Accounts</h3>
              <p>
                To access certain features of the platform, you may be required to create an account.
                You are responsible for maintaining the confidentiality of your account credentials
                and for all activities that occur under your account.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-bold text-royal mb-4">3. Content and Conduct</h3>
              <p>
                You retain ownership of any content you upload to NumismaticScholar, but grant us a 
                non-exclusive license to use, display, and store such content for the purpose of providing
                our services. You agree not to upload content that violates any third-party rights or
                applicable laws.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-bold text-royal mb-4">4. Payment Terms</h3>
              <p>
                Payments for courses and verification services are processed securely through our payment
                processors. Prices are subject to change, but changes will not affect prior purchases.
                All payments are final except as provided in our Refund Policy.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-bold text-royal mb-4">5. Termination</h3>
              <p>
                We reserve the right to suspend or terminate your account for violations of these terms
                or for any other reason at our discretion. You may also terminate your account at any time.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-bold text-royal mb-4">6. Disclaimer of Warranties</h3>
              <p>
                NumismaticScholar is provided on an "as is" and "as available" basis. We make no 
                warranties, express or implied, regarding the reliability, accuracy, or availability
                of the platform.
              </p>
            </section>
          </div>
        );
        
      case 'refund': 
        return (
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-bold text-royal mb-4">1. Course Refunds</h3>
              <p>
                We offer a 7-day satisfaction guarantee for all courses purchased on NumismaticScholar.
                If you are unsatisfied with a course, you may request a full refund within 7 days of purchase,
                provided you have not completed more than 25% of the course content.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-bold text-royal mb-4">2. Verification Service Refunds</h3>
              <p>
                Our coin verification services are non-refundable once the verification process has begun.
                If we are unable to verify a coin due to insufficient information or image quality, we will
                offer one opportunity to resubmit with better information at no additional cost.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-bold text-royal mb-4">3. Subscription Refunds</h3>
              <p>
                Subscription plans may be canceled at any time, but refunds are not provided for partial
                billing periods. When you cancel, you will continue to have access until the end of your
                current billing cycle.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-bold text-royal mb-4">4. How to Request a Refund</h3>
              <p>
                To request a refund, please contact our support team at refunds@numismaticscholar.com
                with your order details and reason for the refund request. We aim to process all refund
                requests within 5 business days.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-bold text-royal mb-4">5. Refund Method</h3>
              <p>
                Refunds will be issued using the original payment method used for the purchase.
                Processing times may vary depending on your payment provider, typically 5-10 business days.
              </p>
            </section>
          </div>
        );
        
      case 'verification': 
        return (
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-bold text-royal mb-4">1. Verification Overview</h3>
              <p>
                Our coin verification service provides professional authentication and assessment of coins
                by numismatic experts. The verification process includes authentication, grading, and
                valuation of your coins.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-bold text-royal mb-4">2. Submission Requirements</h3>
              <p>To ensure accurate verification, please provide:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>High-resolution images of both sides of the coin</li>
                <li>Close-up images of any distinctive marks or features</li>
                <li>Information about the coin's origin if known</li>
                <li>Any relevant historical documentation (if available)</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-xl font-bold text-royal mb-4">3. Verification Process</h3>
              <ol className="list-decimal list-inside mt-2 space-y-2">
                <li>Upload clear images of your coins through our secure platform</li>
                <li>Our experts conduct a thorough examination of the images</li>
                <li>Authentication is performed against historical records and known characteristics</li>
                <li>A detailed report is prepared including authentication, grade, and estimated value</li>
                <li>The report is delivered to your account within 24 hours</li>
              </ol>
            </section>
            
            <section>
              <h3 className="text-xl font-bold text-royal mb-4">4. Expert Qualifications</h3>
              <p>
                Our verification team consists of experts with a minimum of 10 years of experience in
                numismatics, many of whom have worked with prestigious institutions and auction houses.
                Each verification is reviewed by at least two experts before a report is issued.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-bold text-royal mb-4">5. Verification Report</h3>
              <p>Each verification report includes:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Authentication determination</li>
                <li>Origin and era confirmation</li>
                <li>Material composition analysis</li>
                <li>Condition grade on industry standard scale</li>
                <li>Estimated market value range</li>
                <li>Detailed explanation of findings</li>
                <li>Digital certificate of verification</li>
              </ul>
            </section>
          </div>
        );
        
      case 'cookie': 
        return (
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-bold text-royal mb-4">1. What Are Cookies</h3>
              <p>
                Cookies are small text files that are stored on your device when you visit our website.
                They help us recognize your device and provide you with a better browsing experience.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-bold text-royal mb-4">2. How We Use Cookies</h3>
              <p>We use cookies for various purposes, including:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Essential cookies to operate the website and provide our services</li>
                <li>Authentication cookies to remember your login status</li>
                <li>Preference cookies to remember your settings and preferences</li>
                <li>Analytics cookies to understand how visitors interact with our website</li>
                <li>Marketing cookies to deliver relevant advertisements</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-xl font-bold text-royal mb-4">3. Cookie Duration</h3>
              <p>
                Cookies on our website may be session cookies (temporary cookies that expire when you close
                your browser) or persistent cookies (cookies that remain on your device for a specified period).
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-bold text-royal mb-4">4. Third-Party Cookies</h3>
              <p>
                Some cookies are placed by third parties on our behalf. These third parties may include
                analytics providers, payment processors, and advertising networks. These third parties
                may use cookies, web beacons, and similar technologies to collect information about your
                use of our website.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-bold text-royal mb-4">5. Managing Cookies</h3>
              <p>
                Most web browsers allow you to control cookies through their settings. You can typically
                delete existing cookies, block certain types of cookies, or set your browser to notify
                you when cookies are being sent. Please note that disabling cookies may affect the
                functionality of our website and services.
              </p>
            </section>
          </div>
        );
        
      default:
        return <p>Content not available.</p>;
    }
  };

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
                {getTitle()}
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
            {getContent()}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPage;
