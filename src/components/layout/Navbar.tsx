import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, ShoppingCart, LogIn, Heart, ChevronDown, TrendingUp, Package } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import SearchDropdown from '@/components/search/SearchDropdown';
import { useWishlist } from '@/context/WishlistContext';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useSellerAccess } from '@/hooks/useSellerAccess';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { user, isLoading } = useSupabaseAuth();
  const { isSellerAllowed } = useSellerAccess();
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

  // Get user's first name for dashboard naming
  const getUserFirstName = () => {
    if (!user) return '';
    const fullName = user.user_metadata?.full_name || user.user_metadata?.name || '';
    return fullName.split(' ')[0] || 'User';
  };

  // Handle navigation with scroll-to-top for same page
  const handleNavClick = (path: string) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(path);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Coins Market", path: "/coins-market" },
    { name: "Verify Your Coins", path: "/verify-coins" },
    { name: "Community", path: "/community" },
  ];

  // Close dropdowns when clicking outside or on navigation
  useEffect(() => {
    const handleClickOutside = () => {
      setAboutDropdownOpen(false);
      setProfileDropdownOpen(false);
    };

    if (aboutDropdownOpen || profileDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [aboutDropdownOpen, profileDropdownOpen]);

  // Close dropdowns on route change
  useEffect(() => {
    setAboutDropdownOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

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
                className={`px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
                  isActive 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {link.name}
              </button>
            );
          })}
          
          {/* About Dropdown */}
          <div className="relative">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setAboutDropdownOpen(!aboutDropdownOpen);
              }}
              className={`px-4 py-2 rounded-xl transition-all duration-300 font-medium flex items-center gap-1 ${
                location.pathname === '/about' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              About
              <ChevronDown className={`h-4 w-4 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {aboutDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavClick('/about');
                    setAboutDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  About Us
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavClick('/mentors');
                    setAboutDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  Mentors
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavClick('/articles');
                    setAboutDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  Articles & Blog
                </button>
              </div>
            )}
          </div>
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
          
          <Link to="/cart" className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 relative">
            <ShoppingCart className="h-5 w-5" />
            {purchaseCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-xs text-white rounded-full h-4 w-4 flex items-center justify-center">
                {purchaseCount}
              </span>
            )}
          </Link>
          
          {isLoading ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
          ) : user ? (
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileDropdownOpen(!profileDropdownOpen);
                }}
                className="flex items-center"
              >
                <Avatar className="h-8 w-8">
                  {user.user_metadata?.avatar_url ? (
                    <AvatarImage src={user.user_metadata.avatar_url} alt="Profile" />
                  ) : (
                    <AvatarFallback className="bg-royal text-white">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  )}
                </Avatar>
              </button>
              
              {profileDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavClick('/profile');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <User className="h-4 w-4 mr-3" />
                    My Profile
                  </button>
                  <div className="border-t border-gray-200 my-2"></div>
                  
                  {/* Only show Seller Dashboard for authorized users */}
                  {isSellerAllowed && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavClick('/seller-dashboard');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center"
                    >
                      <TrendingUp className="h-4 w-4 mr-3" />
                      Seller Dashboard
                    </button>
                  )}
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavClick('/buyer-dashboard');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <Package className="h-4 w-4 mr-3" />
                    {getUserFirstName()}'s Dashboard
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/authenticate">
              <Button variant="outline" className="border-royal text-royal hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors duration-200 rounded-xl">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:flex lg:hidden items-center space-x-3">
          <Link to="/wishlist" className="p-2 text-gray-500 hover:text-royal relative">
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-xs text-white rounded-full h-4 w-4 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="p-2 text-gray-500 hover:text-royal relative">
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
              className="block w-full text-left px-3 py-2 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              {link.name}
            </button>
          ))}
          
          <button 
            onClick={() => {
              handleNavClick('/about');
              toggleNav();
            }}
            className="block w-full text-left px-3 py-2 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            About
          </button>
          
          <button 
            onClick={() => {
              handleNavClick('/mentors');
              toggleNav();
            }}
            className="block w-full text-left px-3 py-2 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            Mentors
          </button>
          
          <button 
            onClick={() => {
              handleNavClick('/articles');
              toggleNav();
            }}
            className="block w-full text-left px-3 py-2 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            Articles & Blog
          </button>
          
          {user && (
            <>
              <div className="border-t border-gray-200 my-2"></div>
              
              {/* Only show Seller Dashboard for authorized users */}
              {isSellerAllowed && (
                <button 
                  onClick={() => {
                    handleNavClick('/seller-dashboard');
                    toggleNav();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  Seller Dashboard
                </button>
              )}
              
              <button 
                onClick={() => {
                  handleNavClick('/buyer-dashboard');
                  toggleNav();
                }}
                className="block w-full text-left px-3 py-2 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                {getUserFirstName()}'s Dashboard
              </button>
            </>
          )}
          
          <div className="mt-4 flex space-x-2 px-3">
            {user ? (
              <Link to="/profile" className="w-full">
                <Button className="w-full bg-royal hover:bg-blue-600 text-white transition-colors rounded-xl">
                  <User className="h-4 w-4 mr-2" />
                  My Profile
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/authenticate" className="w-1/2">
                  <Button variant="outline" className="w-full border-royal text-royal hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors rounded-xl">
                    Sign In
                  </Button>
                </Link>
                <Link to="/authenticate?tab=register" className="w-1/2">
                  <Button className="w-full bg-royal hover:bg-blue-600 text-white transition-colors rounded-xl">
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
