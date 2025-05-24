<<<<<<< HEAD
=======

>>>>>>> 813d0fd0065b6f839cbd5b9921e4616d9d2a780c
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Coins, Users, FileText, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { performSearch, SearchItem, groupSearchResults } from '@/services/SearchService';

interface SearchDropdownProps {
  expanded?: boolean;
  onExpand?: () => void;
  placeholder?: string;
  darkMode?: boolean;
  className?: string;
  filterTypes?: Array<SearchItem['type']>;
}

const SearchDropdown = ({
  expanded = true,
  onExpand,
  placeholder = "Search courses, coins, or mentors...",
  darkMode = false,
  className = "",
  filterTypes
}: SearchDropdownProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [results, setResults] = useState<SearchItem[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Handle search as user types
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const searchResults = performSearch(searchQuery, filterTypes);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [searchQuery, filterTypes]);

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

  // Handle search submission
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    const searchResults = performSearch(searchQuery);
    
    if (searchResults.length > 0) {
      // Navigate to the first result
      navigate(searchResults[0].route);
    } else {
      // Navigate to search results page with query
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
    
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleSelectResult = (route: string) => {
    navigate(route);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  // Group results by type for display
  const groupedResults = groupSearchResults(results);

  // Determine text and background colors based on darkMode
  const textColor = darkMode ? "text-white" : "text-gray-700";
  const bgColor = darkMode ? "bg-royal-dark/50" : "bg-white";
  const borderColor = darkMode ? "border-royal-light/30" : "border-gray-300";
  const focusBorderColor = darkMode ? "focus:border-gold" : "focus:border-royal";
  const placeholderColor = darkMode ? "placeholder:text-gray-400" : "placeholder:text-gray-500";
  
  const dropdownBgColor = darkMode ? "bg-royal-dark" : "bg-white";
  const dropdownTextColor = darkMode ? "text-white" : "text-gray-700";
  const dropdownHoverBgColor = darkMode ? "hover:bg-royal" : "hover:bg-gray-100";

  const getIconForType = (type: SearchItem['type']) => {
    switch (type) {
      case 'course':
        return <BookOpen className="h-4 w-4 text-gray-500 mr-2" />;
      case 'coin':
        return <Coins className="h-4 w-4 text-gray-500 mr-2" />;
      case 'mentor':
        return <Users className="h-4 w-4 text-gray-500 mr-2" />;
      case 'article':
        return <FileText className="h-4 w-4 text-gray-500 mr-2" />;
      case 'category':
        return <Menu className="h-4 w-4 text-gray-500 mr-2" />;
      default:
        return <Search className="h-4 w-4 text-gray-500 mr-2" />;
    }
  };

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
      <AnimatePresence>
        {expanded && showSuggestions && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full left-0 right-0 mt-1 p-2 ${dropdownBgColor} rounded-md shadow-lg border border-gray-200 z-50`}
          >
            {!searchQuery ? (
              <div className={`py-2 px-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                Start typing to search...
              </div>
            ) : results.length === 0 ? (
              <div className={`py-2 px-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                No results found for "{searchQuery}"
              </div>
            ) : (
              <>
                {groupedResults.category.length > 0 && (
                  <div className="mb-2">
                    <div className={`px-3 py-1 text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase`}>
                      Categories
                    </div>
                    {groupedResults.category.map(item => (
                      <div
                        key={item.id}
                        className={`px-3 py-2 ${dropdownHoverBgColor} rounded-md cursor-pointer flex items-center ${dropdownTextColor}`}
                        onClick={() => handleSelectResult(item.route)}
                      >
                        {getIconForType(item.type)}
                        <span className="font-medium">{item.title}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {groupedResults.course.length > 0 && (
                  <div className="mb-2">
                    <div className={`px-3 py-1 text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase`}>
                      Courses
                    </div>
                    {groupedResults.course.map(item => (
                      <div
                        key={item.id}
                        className={`px-3 py-2 ${dropdownHoverBgColor} rounded-md cursor-pointer flex items-center ${dropdownTextColor}`}
                        onClick={() => handleSelectResult(item.route)}
                      >
                        {getIconForType(item.type)}
                        <span>{item.title}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {groupedResults.coin.length > 0 && (
                  <div className="mb-2">
                    <div className={`px-3 py-1 text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase`}>
                      Coins
                    </div>
                    {groupedResults.coin.map(item => (
                      <div
                        key={item.id}
                        className={`px-3 py-2 ${dropdownHoverBgColor} rounded-md cursor-pointer flex items-center ${dropdownTextColor}`}
                        onClick={() => handleSelectResult(item.route)}
                      >
                        {getIconForType(item.type)}
                        <span>{item.title}</span>
                      </div>
                    ))}
                  </div>
                )}

                {groupedResults.mentor.length > 0 && (
                  <div className="mb-2">
                    <div className={`px-3 py-1 text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase`}>
                      Mentors
                    </div>
                    {groupedResults.mentor.map(item => (
                      <div
                        key={item.id}
                        className={`px-3 py-2 ${dropdownHoverBgColor} rounded-md cursor-pointer flex items-center ${dropdownTextColor}`}
                        onClick={() => handleSelectResult(item.route)}
                      >
                        {getIconForType(item.type)}
                        <span>{item.title}</span>
                      </div>
                    ))}
                  </div>
                )}

                {groupedResults.article.length > 0 && (
                  <div className="mb-2">
                    <div className={`px-3 py-1 text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase`}>
                      Articles
                    </div>
                    {groupedResults.article.map(item => (
                      <div
                        key={item.id}
                        className={`px-3 py-2 ${dropdownHoverBgColor} rounded-md cursor-pointer flex items-center ${dropdownTextColor}`}
                        onClick={() => handleSelectResult(item.route)}
                      >
                        {getIconForType(item.type)}
                        <span>{item.title}</span>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

<<<<<<< HEAD
export default SearchDropdown; 
=======
export default SearchDropdown;
>>>>>>> 813d0fd0065b6f839cbd5b9921e4616d9d2a780c
