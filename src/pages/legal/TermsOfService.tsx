
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-royal/5 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-royal font-playfair mb-8 text-center">
                Terms of Service
              </h1>
              
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-royal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-royal font-bold text-2xl">📋</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Coming Soon...
                  </h2>
                  <p className="text-gray-600 max-w-md mx-auto">
                    We are currently preparing our terms of service. 
                    This page will contain the rules and guidelines for using our platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
