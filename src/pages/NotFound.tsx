
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Check if this is a search query that failed
  const isSearchQuery = location.pathname === "/search" || location.search.includes("q=");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-royal/5 py-20">
        <div className="text-center px-4 max-w-xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-royal/10 text-royal rounded-full mb-6">
            {isSearchQuery ? (
              <Search className="h-10 w-10" />
            ) : (
              <span className="font-bold text-3xl">404</span>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-playfair text-royal">
            {isSearchQuery ? "No Search Results" : "Page Not Found"}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            {isSearchQuery 
              ? "We couldn't find any results that match your search query. Try different keywords or browse our categories."
              : "The page you are looking for may have been moved or doesn't exist. Let's get you back to exploring numismatics!"
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="bg-royal hover:bg-royal-light text-white px-8 py-3 w-full sm:w-auto">
                <Home className="mr-2 h-4 w-4" />
                Return to Homepage
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              className="border-royal text-royal hover:bg-royal hover:text-white hover:border-royal transition-colors px-8 py-3 w-full sm:w-auto"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
          
          {isSearchQuery && (
            <div className="mt-10 text-left px-4">
              <h2 className="text-xl font-semibold mb-4 text-royal">Popular Categories</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Link to="/courses" className="p-3 border border-gray-200 rounded-md hover:border-royal hover:bg-royal/5 transition-colors">
                  <h3 className="font-medium text-royal">Courses</h3>
                  <p className="text-sm text-gray-600">Learn numismatics from experts</p>
                </Link>
                <Link to="/coins" className="p-3 border border-gray-200 rounded-md hover:border-royal hover:bg-royal/5 transition-colors">
                  <h3 className="font-medium text-royal">Coins</h3>
                  <p className="text-sm text-gray-600">Explore our coin collection</p>
                </Link>
                <Link to="/marketplace" className="p-3 border border-gray-200 rounded-md hover:border-royal hover:bg-royal/5 transition-colors">
                  <h3 className="font-medium text-royal">Verify Coins</h3>
                  <p className="text-sm text-gray-600">Get your coins authenticated</p>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
