import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-royal/5 py-20">
        <div className="text-center px-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-royal/10 text-royal rounded-full mb-6">
            <span className="font-bold text-3xl">404</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-playfair text-royal">Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
            The page you are looking for may have been moved or doesn't exist. 
            Let's get you back to exploring numismatics!
          </p>
          <Link to="/">
            <Button className="bg-royal hover:bg-royal-light text-white px-8 py-3">
              Return to Homepage
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
