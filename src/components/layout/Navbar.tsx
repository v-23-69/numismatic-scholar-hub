
import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, BookOpen, User, ShoppingCart, LogIn, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { CommandDialog } from "@/components/ui/command";
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { ConfigContext } from "@/App";
import EnhancedSearchBar from '@/components/search/EnhancedSearchBar';
import { useWishlist } from '@/context/WishlistContext';

// Create a more reliable auth state hook
const useAuthState = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { supabaseClient, supabaseConfigured } = useContext(ConfigContext);

  useEffect(() => {
    // Only attempt to check auth if we have Supabase configured
    if (supabaseClient && supabaseConfigured) {
      setLoading(true);
      
      const checkAuthStatus = async () => {
        try {
          const { data } = await supabaseClient.auth.getSession();
          setUser(data.session?.user || null);
          setLoading(false);
          
          const { data: authListener } = supabaseClient.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
          });
          
          return () => {
            authListener.subscription.unsubscribe();
          };
        } catch (error) {
          console.error("Failed to check auth status:", error);
          toast({
            title: "Authentication Error",
            description: "Could not connect to authentication service.",
            variant: "destructive"
          });
          setLoading(false);
        }
      };
      
      checkAuthStatus();
    } else {
      setLoading(false);
    }
  }, [supabaseClient, supabaseConfigured, toast]);
  
  return { user, loading };
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [isCommandDialogOpen, setIsCommandDialogOpen] = useState(false);
  const { user, loading } = useAuthState();
  const { wishlist } = useWishlist();
  
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

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Coins", path: "/coins" },
    { name: "Verify Your Coins", path: "/marketplace" },
    { name: "Community", path: "/community" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gold/10">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-10 w-10 bg-royal rounded-full flex items-center justify-center">
            <span className="text-gold font-bold text-xl">NS</span>
          </div>
          <span className="font-playfair text-royal font-bold text-xl tracking-tight">NumismaticScholar</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="px-3 py-2 text-gray-700 nav-link-blue"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Search and User Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <div className="relative">
            {/* Enhanced Search Bar for desktop */}
            <EnhancedSearchBar
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
        <div className="md:hidden flex items-center space-x-3">
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
            <Search className="h-5 w-5" />
          </button>
          <button onClick={toggleNav} className="p-2 text-gray-500 hover:text-royal">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Search */}
      <div className={`${searchActive ? 'block' : 'hidden'} md:hidden px-4 py-2 border-b`}>
        <EnhancedSearchBar expanded={true} />
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white shadow-md border-b`}>
        <div className="px-2 pt-2 pb-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              onClick={toggleNav}
            >
              {link.name}
            </Link>
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
