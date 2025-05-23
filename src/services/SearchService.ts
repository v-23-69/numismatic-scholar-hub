// Search data interfaces
export interface SearchItem {
  id: string;
  title: string;
  description?: string;
  type: 'course' | 'coin' | 'category' | 'mentor' | 'article';
  route: string;
  image?: string;
  tags?: string[];
}

// Sample data - in a real app, this would come from API calls
export const searchData: SearchItem[] = [
  // Courses
  { id: 'course-1', title: 'Ancient Coin Authentication', description: 'Learn to authenticate ancient coins', type: 'course', route: '/courses/ancient-coin-authentication', tags: ['ancient', 'authentication', 'coins'] },
  { id: 'course-2', title: 'Modern Collectible Grading', description: 'Master modern coin grading', type: 'course', route: '/courses/modern-collectible-grading', tags: ['modern', 'grading', 'collectible'] },
  { id: 'course-3', title: 'European Coinage History', description: 'Explore European coin history', type: 'course', route: '/courses/european-coinage-history', tags: ['european', 'history', 'coinage'] },
  { id: 'course-4', title: 'Numismatic Photography', description: 'Capture perfect coin images', type: 'course', route: '/courses/numismatic-photography', tags: ['photography', 'numismatic'] },
  { id: 'course-5', title: 'Investing in Rare Coins', description: 'Strategic coin investments', type: 'course', route: '/courses/investing-in-rare-coins', tags: ['investing', 'rare', 'coins'] },
  
  // Coins
  { id: 'coin-1', title: '1854 Gold Double Eagle', description: 'Historical American gold coin', type: 'coin', route: '/coins-market/1854-gold-double-eagle', tags: ['gold', 'american', 'eagle'] },
  { id: 'coin-2', title: 'Ancient Roman Denarius', description: 'Silver coin from Roman Empire', type: 'coin', route: '/coins-market/ancient-roman-denarius', tags: ['roman', 'ancient', 'silver'] },
  { id: 'coin-3', title: 'Mughal Empire Gold Mohur', description: 'Historical Indian gold coin', type: 'coin', route: '/coins-market/mughal-empire-gold-mohur', tags: ['mughal', 'gold', 'indian'] },
  { id: 'coin-4', title: 'Byzantine Solidus', description: 'Gold coin from Byzantine Empire', type: 'coin', route: '/coins-market/byzantine-solidus', tags: ['byzantine', 'gold', 'empire'] },
  { id: 'coin-5', title: 'Canadian Gold Maple Leaf', description: 'Modern bullion investment coin', type: 'coin', route: '/coins-market/canadian-gold-maple-leaf', tags: ['canadian', 'gold', 'maple'] },
  
  // Categories
  { id: 'cat-1', title: 'Courses', description: 'Expert-led numismatic education', type: 'category', route: '/courses', tags: ['education', 'learning'] },
  { id: 'cat-2', title: 'Coins Market', description: 'Buy and sell authenticated coins', type: 'category', route: '/coins-market', tags: ['market', 'trading', 'coins'] },
  { id: 'cat-3', title: 'Community', description: 'Connect with fellow collectors', type: 'category', route: '/community', tags: ['forum', 'discussion', 'social'] },
  { id: 'cat-4', title: 'Mentors', description: 'Learn from numismatic experts', type: 'category', route: '/mentors', tags: ['expert', 'guidance'] },
  { id: 'cat-5', title: 'Verify Your Coins', description: 'Get expert authentication', type: 'category', route: '/verify-coins', tags: ['authentication', 'verification', 'expert'] },
  
  // Mentors
  { id: 'mentor-1', title: 'Dr. Eleanor Blackwood', description: 'Ancient Roman specialist', type: 'mentor', route: '/mentors/dr-eleanor-blackwood', tags: ['roman', 'expert', 'ancient'] },
  { id: 'mentor-2', title: 'James Thompson', description: 'Gold coin authentication expert', type: 'mentor', route: '/mentors/james-thompson', tags: ['gold', 'authentication'] },
  
  // Articles
  { id: 'article-1', title: 'The History of the Dollar', description: 'Evolution of American currency', type: 'article', route: '/articles/history-of-dollar', tags: ['dollar', 'american', 'history'] },
  { id: 'article-2', title: 'Identifying Counterfeits', description: 'Spotting fake coins', type: 'article', route: '/articles/identifying-counterfeits', tags: ['counterfeit', 'authentication', 'fake'] },
];

/**
 * Performs a search across all searchable content
 * @param query The search query
 * @param types Optional filter by content types
 * @returns Filtered search results
 */
export const performSearch = (
  query: string,
  types?: Array<SearchItem['type']>
): SearchItem[] => {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) return [];
  
  return searchData.filter(item => {
    // Filter by type if specified
    if (types && !types.includes(item.type)) {
      return false;
    }
    
    // Search in title
    if (item.title.toLowerCase().includes(normalizedQuery)) {
      return true;
    }
    
    // Search in description
    if (item.description && item.description.toLowerCase().includes(normalizedQuery)) {
      return true;
    }
    
    // Search in tags
    if (item.tags && item.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))) {
      return true;
    }
    
    // Fuzzy matching for prefixes
    // For example, "cour" should match "courses"
    if (item.type === 'category' && item.title.toLowerCase().startsWith(normalizedQuery.slice(0, 2))) {
      return true;
    }
    
    return false;
  });
};

/**
 * Gets the best matching route for a search query
 * Useful for navigation when user presses Enter in the search box
 */
export const getBestMatchRoute = (query: string): string | null => {
  const results = performSearch(query);
  
  if (results.length === 0) {
    return null;
  }
  
  // Prioritize exact matches
  const exactMatch = results.find(item => 
    item.title.toLowerCase() === query.toLowerCase()
  );
  
  if (exactMatch) {
    return exactMatch.route;
  }
  
  // If no exact match, check for category matches first
  const categoryMatch = results.find(item => item.type === 'category');
  
  if (categoryMatch) {
    return categoryMatch.route;
  }
  
  // Otherwise return first result
  return results[0].route;
};

/**
 * Group search results by type
 */
export const groupSearchResults = (results: SearchItem[]) => {
  const grouped: Record<SearchItem['type'], SearchItem[]> = {
    course: [],
    coin: [],
    category: [],
    mentor: [],
    article: []
  };
  
  results.forEach(item => {
    grouped[item.type].push(item);
  });
  
  return grouped;
};
