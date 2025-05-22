
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { getFilteredSuggestions, getBestMatchRoute, getRouteFromSuggestion, SearchSuggestion } from '@/services/SearchService';

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

  const { courses, coins, categories, pages } = getFilteredSuggestions(searchQuery);
  const hasResults = courses.length > 0 || coins.length > 0 || categories.length > 0 || pages.length > 0;

  // Handle search submission
  const handleSearch = (term: string = searchQuery) => {
    if (!term.trim()) return;
    
    const bestMatchRoute = getBestMatchRoute(term);
    if (bestMatchRoute) {
      navigate(bestMatchRoute);
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  // Handle clicking a suggestion
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    const route = getRouteFromSuggestion(suggestion);
    navigate(route);
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
              {pages.length > 0 && (
                <div className="mb-2">
                  <div className={`px-3 py-1 text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase`}>
                    Pages
                  </div>
                  {pages.map(page => (
                    <div
                      key={page.id}
                      className={`px-3 py-2 ${dropdownHoverBgColor} rounded-md cursor-pointer flex items-center ${dropdownTextColor}`}
                      onClick={() => handleSuggestionClick(page)}
                    >
                      <span className="font-medium">{page.title}</span>
                    </div>
                  ))}
                </div>
              )}
            
              {categories.length > 0 && (
                <div className="mb-2">
                  <div className={`px-3 py-1 text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase`}>
                    Categories
                  </div>
                  {categories.map(category => (
                    <div
                      key={category.id}
                      className={`px-3 py-2 ${dropdownHoverBgColor} rounded-md cursor-pointer flex items-center ${dropdownTextColor}`}
                      onClick={() => handleSuggestionClick(category)}
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
                      onClick={() => handleSuggestionClick(course)}
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
                      onClick={() => handleSuggestionClick(coin)}
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
