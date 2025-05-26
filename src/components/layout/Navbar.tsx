
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, ShoppingCart, LogIn, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import SearchDropdown from '@/components/search/SearchDropdown';
import { useWishlist } from '@/context/WishlistContext';
import supabase from '@/lib/supabaseClient';

// Create a placeholder or mock auth state when Supabase isn't configured
const useAuthState = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const initSupabase = async () => {
      try {
        setLoading(true);
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user || null);
        setLoading(false);
        
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user || null);
        });
        
        return () => {
          authListener.subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Failed to initialize Supabase:", error);
        toast({
          title: "Authentication Error",
          description: "Could not connect to authentication service.",
          variant: "destructive"
        });
        setLoading(false);
      }
    };
    
    initSupabase();
  }, [toast]);
  
  return { user, loading };
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const { user, loading } = useAuthState();
  const { wishlist } = useWishlist();
  const location = useLocation();
  
  const navigate = useNavigate();

  const toggleNav = () => setIsOpen(!isOpen);
  
  // Get count of purchases from localStorage
  const purchaseCount = (() => {
    try {
      const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
      return purchases.length;
    } catch {
      return 0;
    }
  })();

  // Handle navigation with scroll-to-top for same page
  const handleNavClick = (path: string) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(path);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Coins Market", path: "/coins-market" },
    { name: "Verify Your Coins", path: "/verify-coins" },
    { name: "Community", path: "/community" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gold/10">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => handleNavClick('/')} className="flex items-center space-x-2">
          <div className="h-10 w-10 bg-royal rounded-full flex items-center justify-center">
            <span className="text-gold font-bold text-xl">NS</span>
          </div>
          <span className="font-playfair text-royal font-bold text-xl tracking-tight">NumismaticScholar</span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <button 
                key={link.name} 
                onClick={() => handleNavClick(link.path)}
                className={`px-3 py-2 transition-all duration-300 relative ${
                  isActive 
                    ? 'text-royal font-medium' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {link.name}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-royal rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Search and User Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <div className="relative">
            {/* Enhanced Search Dropdown for desktop */}
            <SearchDropdown
              expanded={searchActive}
              onExpand={() => setSearchActive(!searchActive)}
            />
          </div>
          
          <Link to="/wishlist" className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 relative">
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-xs text-white rounded-full h-4 w-4 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          
          <Link to="/purchases" className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 relative">
            <ShoppingCart className="h-5 w-5" />
            {purchaseCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-xs text-white rounded-full h-4 w-4 flex items-center justify-center">
                {purchaseCount}
              </span>
            )}
          </Link>
          
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
          ) : user ? (
            <Link to="/profile" className="flex items-center">
              <Avatar className="h-8 w-8">
                {user.user_metadata?.avatar_url ? (
                  <AvatarImage src={user.user_metadata.avatar_url} alt="Profile" />
                ) : (
                  <AvatarFallback className="bg-royal text-white">
                    {user.email?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                )}
              </Avatar>
            </Link>
          ) : (
            <Link to="/authenticate">
              <Button variant="outline" className="border-royal text-royal hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors duration-200">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:flex lg:hidden items-center space-x-3">
          <Link to="/wishlist" className="p-2 text-gray-500 hover:text-royal">
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-xs text-white rounded-full h-4 w-4 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/purchases" className="p-2 text-gray-500 hover:text-royal">
            <ShoppingCart className="h-5 w-5" />
            {purchaseCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-xs text-white rounded-full h-4 w-4 flex items-center justify-center">
                {purchaseCount}
              </span>
            )}
          </Link>
          <button onClick={() => setSearchActive(!searchActive)} className="p-2 text-gray-500 hover:text-royal">
            <SearchDropdown expanded={false} onExpand={() => setSearchActive(true)} />
          </button>
          <button onClick={toggleNav} className="p-2 text-gray-500 hover:text-royal">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Search */}
      <div className={`${searchActive ? 'block' : 'hidden'} md:hidden px-4 py-2 border-b`}>
        <SearchDropdown expanded={true} />
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white shadow-md border-b`}>
        <div className="px-2 pt-2 pb-4">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => {
                handleNavClick(link.path);
                toggleNav();
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              {link.name}
            </button>
          ))}
          
          <div className="mt-4 flex space-x-2 px-3">
            {user ? (
              <Link to="/profile" className="w-full">
                <Button className="w-full bg-royal hover:bg-blue-600 text-white transition-colors">
                  <User className="h-4 w-4 mr-2" />
                  My Profile
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/authenticate" className="w-1/2">
                  <Button variant="outline" className="w-full border-royal text-royal hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors">
                    Sign In
                  </Button>
                </Link>
                <Link to="/authenticate?tab=register" className="w-1/2">
                  <Button className="w-full bg-royal hover:bg-blue-600 text-white transition-colors">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
