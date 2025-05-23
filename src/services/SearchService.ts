
export interface SearchItem {
  id: number | string;
  title: string;
  description: string;
  type: 'course' | 'coin' | 'mentor' | 'article';
  route: string;
  tags?: string[];
}

// Mock data for search results
const searchData: SearchItem[] = [
  {
    id: 1,
    title: 'Introduction to Ancient Coins',
    description: 'Learn the basics of ancient coin collecting and history.',
    type: 'course',
    route: '/courses/1',
    tags: ['Ancient', 'Beginners', 'History']
  },
  {
    id: 2,
    title: 'Gold Aureus of Augustus',
    description: 'A rare gold coin from the reign of Augustus, first Roman Emperor.',
    type: 'coin',
    route: '/coins-market/2',
    tags: ['Gold', 'Roman', 'Imperial']
  },
  {
    id: 3,
    title: 'Dr. Marcus Aurelius',
    description: 'Expert in Roman Imperial coinage with 20+ years of experience.',
    type: 'mentor',
    route: '/mentors/3',
    tags: ['Roman', 'Imperial', 'Authentication']
  }
];

// Function to perform search on mock data
export function performSearch(query: string): SearchItem[] {
  if (!query.trim()) return [];
  
  // Convert query to lowercase for case-insensitive matching
  const lowercaseQuery = query.toLowerCase();
  
  return searchData.filter(item => {
    // Search in title, description and tags
    return (
      item.title.toLowerCase().includes(lowercaseQuery) || 
      item.description.toLowerCase().includes(lowercaseQuery) ||
      item.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  });
}

// Get best match route for search query (used in Hero component)
export function getBestMatchRoute(query: string): string | null {
  const results = performSearch(query);
  if (results.length > 0) {
    // Return the route of the first result
    return results[0].route;
  }
  
  // If no direct match found, try to determine category
  const lowercaseQuery = query.toLowerCase();
  
  if (lowercaseQuery.includes('course')) {
    return '/courses';
  } else if (lowercaseQuery.includes('coin')) {
    return '/coins-market';
  } else if (lowercaseQuery.includes('mentor')) {
    return '/mentors';
  } else if (lowercaseQuery.includes('article')) {
    return '/articles';
  }
  
  return '/search?q=' + encodeURIComponent(query);
}
