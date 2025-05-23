import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, BookOpen, User, ShoppingCart, LogIn } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { CommandDialog } from "@/components/ui/command";
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Initialize Supabase client only if environment variables are available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a placeholder or mock auth state when Supabase isn't configured
const useAuthState = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Only attempt to initialize Supabase if we have the required credentials
    if (supabaseUrl && supabaseAnonKey) {
      const initSupabase = async () => {
        try {
          // Dynamically import Supabase only when needed
          const { createClient } = await import('@supabase/supabase-js');
          // Enable session persistence with autoRefreshToken set to true
          const supabase = createClient(supabaseUrl, supabaseAnonKey, {
            auth: {
              persistSession: true,
              autoRefreshToken: true,
            }
          });
          
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
    } else {
      console.warn("Supabase environment variables are not set.");
      setLoading(false);
    }
  }, [toast]);
  
  return { user, loading };
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCommandDialogOpen, setIsCommandDialogOpen] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { user, loading } = useAuthState();
  
  const navigate = useNavigate();

  const toggleNav = () => setIsOpen(!isOpen);
  const toggleSearch = () => {
    setSearchActive(!searchActive);
    if (!searchActive) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  // Sample search data categories
  const coursesSuggestions = [
    { id: "course-1", title: "Ancient Coin Authentication" },
    { id: "course-2", title: "Modern Collectible Grading" },
    { id: "course-3", title: "European Coinage History" },
    { id: "course-4", title: "Numismatic Photography" },
    { id: "course-5", title: "Investing in Rare Coins" },
  ];
  
  const coinsSuggestions = [
    { id: "coin-1", title: "1854 Gold Double Eagle" },
    { id: "coin-2", title: "Ancient Roman Denarius" },
    { id: "coin-3", title: "Mughal Empire Gold Mohur" },
    { id: "coin-4", title: "Byzantine Solidus" },
    { id: "coin-5", title: "Canadian Gold Maple Leaf" },
  ];
  
  // General categories for quick navigation
  const categories = [
    { id: "courses", title: "Courses", path: "/courses" },
    { id: "coins", title: "Verify Your Coins", path: "/marketplace" },
    { id: "community", title: "Community", path: "/community" },
    { id: "mentors", title: "Mentors", path: "/mentors" },
  ];
  
  // Filter suggestions based on search query
  const getFilteredSuggestions = () => {
    const query = searchQuery.toLowerCase();
    
    // If query starts with specific prefixes, prioritize those categories
    if (query.startsWith("cour")) {
      return {
        courses: coursesSuggestions.filter(course => 
          course.title.toLowerCase().includes(query.replace("cour", ""))
        ),
        coins: [],
        categories: categories.filter(cat => cat.id === "courses")
      };
    } else if (query.startsWith("coin")) {
      return {
        courses: [],
        coins: coinsSuggestions.filter(coin => 
          coin.title.toLowerCase().includes(query.replace("coin", ""))
        ),
        categories: categories.filter(cat => cat.id === "coins")
      };
    }
    
    // Otherwise, search across all categories
    return {
      courses: coursesSuggestions.filter(course => 
        course.title.toLowerCase().includes(query)
      ),
      coins: coinsSuggestions.filter(coin => 
        coin.title.toLowerCase().includes(query)
      ),
      categories: categories.filter(cat => 
        cat.title.toLowerCase().includes(query)
      )
    };
  };
  
  const { courses, coins, categories: filteredCategories } = getFilteredSuggestions();

  // Handle search submission
  const handleSearch = (term: string) => {
    // First check if it's a category match
    const categoryMatch = categories.find(cat => 
      cat.title.toLowerCase() === term.toLowerCase()
    );
    
    if (categoryMatch) {
      navigate(categoryMatch.path);
      setSearchQuery('');
      setShowSearchSuggestions(false);
      return;
    }
    
    // Otherwise, navigate to search results
    navigate(`/search?q=${encodeURIComponent(term)}`);
    setSearchQuery('');
    setShowSearchSuggestions(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Verify Your Coins", path: "/marketplace" },
    { name: "Community", path: "/community" },
    { name: "About", path: "/about" },
  ];
  
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setShowSearchSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
              className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Search and User Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <div className="relative">
            <div className={`transition-all duration-300 ${searchActive ? 'w-64' : 'w-10'} overflow-hidden flex items-center border rounded-full`}>
              <button 
                onClick={toggleSearch}
                className="p-2 text-gray-500 hover:text-royal"
              >
                <Search className="h-5 w-5" />
              </button>
              <input 
                ref={searchInputRef}
                type="text" 
                placeholder="Search courses, coins, mentors..." 
                className={`${searchActive ? 'w-full px-2 py-1' : 'w-0'} outline-none transition-all duration-300`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearchSuggestions(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery) {
                    handleSearch(searchQuery);
                  }
                }}
              />
              {searchActive && searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {/* Search Suggestions Popover */}
            {searchActive && showSearchSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-1 p-2 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                {searchQuery.length === 0 ? (
                  <div className="py-2 px-3 text-sm text-gray-500">
                    Start typing to search...
                  </div>
                ) : (
                  <>
                    {filteredCategories.length > 0 && (
                      <div className="mb-2">
                        <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">
                          Categories
                        </div>
                        {filteredCategories.map(category => (
                          <div
                            key={category.id}
                            className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer flex items-center"
                            onClick={() => {
                              navigate(category.path);
                              setSearchQuery('');
                              setShowSearchSuggestions(false);
                            }}
                          >
                            <span className="font-medium">{category.title}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {courses.length > 0 && (
                      <div className="mb-2">
                        <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">
                          Courses
                        </div>
                        {courses.map(course => (
                          <div
                            key={course.id}
                            className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer flex items-center"
                            onClick={() => {
                              navigate(`/courses/${course.id}`);
                              setSearchQuery('');
                              setShowSearchSuggestions(false);
                            }}
                          >
                            <BookOpen className="h-4 w-4 text-gray-500 mr-2" />
                            <span>{course.title}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {coins.length > 0 && (
                      <div>
                        <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">
                          Coins
                        </div>
                        {coins.map(coin => (
                          <div
                            key={coin.id}
                            className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer flex items-center"
                            onClick={() => {
                              navigate(`/marketplace/${coin.id}`);
                              setSearchQuery('');
                              setShowSearchSuggestions(false);
                            }}
                          >
                            <ShoppingCart className="h-4 w-4 text-gray-500 mr-2" />
                            <span>{coin.title}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {courses.length === 0 && coins.length === 0 && filteredCategories.length === 0 && (
                      <div className="py-2 px-3 text-sm text-gray-500">
                        No results found
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
          
          <Link to="/cart" className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute top-0 right-0 bg-gold text-xs text-white rounded-full h-4 w-4 flex items-center justify-center">2</span>
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
          <button onClick={toggleSearch} className="p-2 text-gray-500 hover:text-royal">
            <Search className="h-5 w-5" />
          </button>
          <button onClick={toggleNav} className="p-2 text-gray-500 hover:text-royal">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Search */}
      <div className={`${searchActive ? 'block' : 'hidden'} md:hidden px-4 py-2 border-b`}>
        <div className="flex items-center border rounded-full px-3 py-1">
          <Search className="h-4 w-4 text-gray-500 mr-2" />
          <input 
            type="text" 
            placeholder="Search courses, coins, mentors..." 
            className="w-full outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery) {
                handleSearch(searchQuery);
              }
            }}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
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

      {/* Command Dialog for Search */}
      <CommandDialog open={isCommandDialogOpen} onOpenChange={setIsCommandDialogOpen}>
        <CommandInput 
          placeholder="Search courses, coins, mentors..." 
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {searchQuery && (
            <>
              <CommandGroup heading="Courses">
                {courses.map(course => (
                  <CommandItem 
                    key={course.id}
                    onSelect={() => {
                      navigate(`/courses/${course.id}`);
                      setIsCommandDialogOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>{course.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandGroup heading="Coins">
                {coins.map(coin => (
                  <CommandItem 
                    key={coin.id}
                    onSelect={() => {
                      navigate(`/marketplace/${coin.id}`);
                      setIsCommandDialogOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    <span>{coin.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </header>
  );
};

export default Navbar;
