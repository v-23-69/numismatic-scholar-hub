// Types for search suggestions
export interface SearchSuggestion {
  id: string;
  title: string;
  type: 'course' | 'coin' | 'category' | 'page';
  path?: string;
}

// Sample data for search suggestions
const coursesSuggestions: SearchSuggestion[] = [
  { id: "course-1", title: "Ancient Coin Authentication", type: 'course' },
  { id: "course-2", title: "Modern Collectible Grading", type: 'course' },
  { id: "course-3", title: "European Coinage History", type: 'course' },
  { id: "course-4", title: "Numismatic Photography", type: 'course' },
  { id: "course-5", title: "Investing in Rare Coins", type: 'course' },
];
  
const coinsSuggestions: SearchSuggestion[] = [
  { id: "coin-1", title: "1854 Gold Double Eagle", type: 'coin' },
  { id: "coin-2", title: "Ancient Roman Denarius", type: 'coin' },
  { id: "coin-3", title: "Mughal Empire Gold Mohur", type: 'coin' },
  { id: "coin-4", title: "Byzantine Solidus", type: 'coin' },
  { id: "coin-5", title: "Canadian Gold Maple Leaf", type: 'coin' },
];

// General categories for quick navigation
const categories: SearchSuggestion[] = [
  { id: "courses", title: "Courses", type: 'category', path: "/courses" },
  { id: "coins", title: "Coins", type: 'category', path: "/coins" },
  { id: "marketplace", title: "Verify Your Coins", type: 'category', path: "/marketplace" },
  { id: "community", title: "Community", type: 'category', path: "/community" },
  { id: "mentors", title: "Mentors", type: 'category', path: "/mentors" },
  { id: "articles", title: "Articles", type: 'category', path: "/articles" },
];

// Pages for navigation
const pages: SearchSuggestion[] = [
  { id: "home", title: "Home", type: 'page', path: "/" },
  { id: "about", title: "About", type: 'page', path: "/about" },
  { id: "profile", title: "Profile", type: 'page', path: "/profile" },
  { id: "wishlist", title: "Wishlist", type: 'page', path: "/wishlist" },
  { id: "purchases", title: "My Purchases", type: 'page', path: "/purchases" },
];

/**
 * Fuzzy search function - returns true if the haystack contains the needle
 * with some tolerance for typos and partial matches
 */
export const fuzzyMatch = (needle: string, haystack: string): boolean => {
  if (!needle) return false;
  
  const needleLower = needle.toLowerCase();
  const haystackLower = haystack.toLowerCase();
  
  // Exact match or contains match
  if (haystackLower.includes(needleLower)) return true;
  
  // Prefix match (e.g. "cour" matches "courses")
  if (haystackLower.startsWith(needleLower)) return true;
  
  // Allow for one letter to be missing or wrong
  if (needle.length > 2) {
    let matches = 0;
    const minMatches = Math.floor(needle.length * 0.7); // At least 70% should match
    
    for (let i = 0; i < needle.length; i++) {
      if (haystackLower.includes(needleLower[i])) {
        matches++;
      }
    }
    
    if (matches >= minMatches) return true;
  }
  
  return false;
};

/**
 * Get filtered suggestions based on search query with fuzzy logic
 */
export const getFilteredSuggestions = (query: string): {
  courses: SearchSuggestion[];
  coins: SearchSuggestion[];
  categories: SearchSuggestion[];
  pages: SearchSuggestion[];
} => {
  if (!query.trim()) {
    return {
      courses: [],
      coins: [],
      categories: [],
      pages: []
    };
  }
  
  const queryLower = query.toLowerCase().trim();
  
  // Special prefixes to prioritize certain categories
  if (queryLower.startsWith("cour")) {
    return {
      courses: coursesSuggestions.filter(course => 
        fuzzyMatch(queryLower.replace("cour", ""), course.title)
      ),
      coins: [],
      categories: categories.filter(cat => cat.id === "courses"),
      pages: []
    };
  } else if (queryLower.startsWith("coi")) {
    return {
      courses: [],
      coins: coinsSuggestions.filter(coin => 
        fuzzyMatch(queryLower.replace("coi", ""), coin.title)
      ),
      categories: categories.filter(cat => cat.id === "coins" || cat.title.toLowerCase().includes("coin")),
      pages: []
    };
  }
  
  // Otherwise, search across all categories with fuzzy matching
  return {
    courses: coursesSuggestions.filter(course => 
      fuzzyMatch(queryLower, course.title)
    ),
    coins: coinsSuggestions.filter(coin => 
      fuzzyMatch(queryLower, coin.title)
    ),
    categories: categories.filter(cat => 
      fuzzyMatch(queryLower, cat.title) ||
      fuzzyMatch(queryLower, cat.id)
    ),
    pages: pages.filter(page => 
      fuzzyMatch(queryLower, page.title)
    )
  };
};

/**
 * Get the best matching route for a given search query
 */
export const getBestMatchRoute = (query: string): string | null => {
  const queryLower = query.toLowerCase().trim();
  if (!queryLower) return null;
  
  // Check for direct category matches
  for (const category of categories) {
    if (
      category.title.toLowerCase() === queryLower ||
      category.id.toLowerCase() === queryLower ||
      fuzzyMatch(queryLower, category.title) ||
      fuzzyMatch(queryLower, category.id)
    ) {
      return category.path || null;
    }
  }
  
  // Check for direct page matches
  for (const page of pages) {
    if (
      page.title.toLowerCase() === queryLower ||
      fuzzyMatch(queryLower, page.title)
    ) {
      return page.path || null;
    }
  }
  
  // Special case prefixes
  if (queryLower.startsWith("cour")) {
    return "/courses";
  }
  
  if (queryLower.startsWith("coi")) {
    return "/coins";
  }
  
  // If no direct match but contains "coin", route to coins page
  if (queryLower.includes("coin")) {
    return "/coins";
  }
  
  // If no direct match but contains "course", route to courses page
  if (queryLower.includes("course")) {
    return "/courses";
  }
  
  // Default to search results
  return `/search?q=${encodeURIComponent(query)}`;
};

/**
 * Convert a search suggestion to its corresponding route
 */
export const getRouteFromSuggestion = (suggestion: SearchSuggestion): string => {
  if (suggestion.path) {
    return suggestion.path;
  }
  
  switch (suggestion.type) {
    case 'course':
      return `/courses/${suggestion.id}`;
    case 'coin':
      return `/coins/${suggestion.id}`;
    case 'category':
      return `/${suggestion.id}`;
    case 'page':
      return `/${suggestion.id}`;
    default:
      return '/';
  }
};
