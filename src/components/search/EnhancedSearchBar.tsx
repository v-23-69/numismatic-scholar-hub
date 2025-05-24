import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";

// Sample data for search suggestions
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

interface EnhancedSearchBarProps {
  className?: string;
  placeholder?: string;
  darkMode?: boolean;
  expanded?: boolean;
  onExpand?: () => void;
}

const EnhancedSearchBar = ({
  className = "",
  placeholder = "Search courses, coins, or mentors...",
  darkMode = false,
  expanded = false,
  onExpand
}: EnhancedSearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Handle clicking outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current && 
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter suggestions based on search query with fuzzy logic
  const getFilteredSuggestions = () => {
    const query = searchQuery.toLowerCase().trim();
    
    if (!query) {
      return {
        courses: [],
        coins: [],
        categories: []
      };
    }
    
    // If query starts with specific prefixes, prioritize those categories
    if (query.startsWith("cour")) {
      return {
        courses: coursesSuggestions.filter(course => 
          course.title.toLowerCase().includes(query.replace("cour", ""))
        ),
        coins: [],
        categories: categories.filter(cat => cat.id === "courses")
      };
    } else if (query.startsWith("coi")) {
      return {
        courses: [],
        coins: coinsSuggestions.filter(coin => 
          coin.title.toLowerCase().includes(query.replace("coi", ""))
        ),
        categories: categories.filter(cat => cat.id === "coins" || cat.title.toLowerCase().includes("coin"))
      };
    }
    
    // Otherwise, search across all categories with fuzzy matching
    return {
      courses: coursesSuggestions.filter(course => 
        course.title.toLowerCase().includes(query)
      ),
      coins: coinsSuggestions.filter(coin => 
        coin.title.toLowerCase().includes(query)
      ),
      categories: categories.filter(cat => 
        cat.title.toLowerCase().includes(query) ||
        cat.id.toLowerCase().includes(query)
      )
    };
  };

  const { courses, coins, categories: filteredCategories } = getFilteredSuggestions();
  const hasResults = courses.length > 0 || coins.length > 0 || filteredCategories.length > 0;

  // Handle search submission
  const handleSearch = (term: string = searchQuery) => {
    if (!term.trim()) return;
    
    // First check if it's a category match
    const categoryMatch = categories.find(cat => 
      cat.title.toLowerCase() === term.toLowerCase() ||
      cat.id.toLowerCase() === term.toLowerCase()
    );
    
    if (categoryMatch) {
      navigate(categoryMatch.path);
      setSearchQuery('');
      setShowSuggestions(false);
      return;
    }
    
    // Otherwise, navigate to search results
    navigate(`/search?q=${encodeURIComponent(term)}`);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  // Determine text and background colors based on darkMode
  const textColor = darkMode ? "text-white" : "text-gray-700";
  const bgColor = darkMode ? "bg-royal-dark/50" : "bg-white";
  const borderColor = darkMode ? "border-royal-light/30" : "border-gray-300";
  const focusBorderColor = darkMode ? "focus:border-gold" : "focus:border-royal";
  const placeholderColor = darkMode ? "placeholder:text-gray-400" : "placeholder:text-gray-500";
  
  const dropdownBgColor = darkMode ? "bg-royal-dark" : "bg-white";
  const dropdownTextColor = darkMode ? "text-white" : "text-gray-700";
  const dropdownHoverBgColor = darkMode ? "hover:bg-royal" : "hover:bg-gray-100";

  return (
    <div 
      ref={searchContainerRef}
      className={`relative ${className}`}
    >
      <div className={`flex items-center rounded-full ${borderColor} border ${expanded ? 'w-full' : 'w-12 md:w-auto'} overflow-hidden transition-all duration-300`}>
        <button 
          onClick={() => {
            if (onExpand) onExpand();
            setTimeout(() => {
              searchInputRef.current?.focus();
            }, 100);
          }}
          className={`p-3 ${darkMode ? 'text-gold' : 'text-gray-500'} hover:text-royal`}
        >
          <Search className="h-5 w-5" />
        </button>
        
        <input 
          ref={searchInputRef}
          type="text" 
          placeholder={placeholder}
          className={`${expanded ? 'w-full px-2 py-2' : 'w-0 md:w-full md:px-2 md:py-2'} outline-none transition-all duration-300 ${bgColor} ${textColor} ${placeholderColor}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        
        {expanded && searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="p-3 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      {/* Search Suggestions Dropdown */}
      {expanded && showSuggestions && (
        <div className={`absolute top-full left-0 right-0 mt-1 p-2 ${dropdownBgColor} rounded-md shadow-lg border border-gray-200 z-50`}>
          {!searchQuery ? (
            <div className={`py-2 px-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
              Start typing to search...
            </div>
          ) : !hasResults ? (
            <div className={`py-2 px-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
              No results found for "{searchQuery}"
            </div>
          ) : (
            <>
              {filteredCategories.length > 0 && (
                <div className="mb-2">
                  <div className={`px-3 py-1 text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase`}>
                    Categories
                  </div>
                  {filteredCategories.map(category => (
                    <div
                      key={category.id}
                      className={`px-3 py-2 ${dropdownHoverBgColor} rounded-md cursor-pointer flex items-center ${dropdownTextColor}`}
                      onClick={() => {
                        navigate(category.path);
                        setSearchQuery('');
                        setShowSuggestions(false);
                      }}
                    >
                      <span className="font-medium">{category.title}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {courses.length > 0 && (
                <div className="mb-2">
                  <div className={`px-3 py-1 text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase`}>
                    Courses
                  </div>
                  {courses.map(course => (
                    <div
                      key={course.id}
                      className={`px-3 py-2 ${dropdownHoverBgColor} rounded-md cursor-pointer flex items-center ${dropdownTextColor}`}
                      onClick={() => {
                        navigate(`/courses/${course.id}`);
                        setSearchQuery('');
                        setShowSuggestions(false);
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
                  <div className={`px-3 py-1 text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase`}>
                    Coins
                  </div>
                  {coins.map(coin => (
                    <div
                      key={coin.id}
                      className={`px-3 py-2 ${dropdownHoverBgColor} rounded-md cursor-pointer flex items-center ${dropdownTextColor}`}
                      onClick={() => {
                        navigate(`/marketplace/${coin.id}`);
                        setSearchQuery('');
                        setShowSuggestions(false);
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{coin.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          
          <div className="mt-2 pt-2 border-t border-gray-200 flex justify-end">
            <Button 
              variant="ghost" 
              className="text-xs"
              onClick={() => setShowSuggestions(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedSearchBar;
