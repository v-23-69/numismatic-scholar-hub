
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomeSearchDropdown from '@/components/search/HomeSearchDropdown';
import { performSearch, SearchItem } from '@/services/SearchService';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Coins, Users, FileText, Category } from 'lucide-react';
import { Link } from 'react-router-dom';

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchItem[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  
  useEffect(() => {
    if (initialQuery) {
      performSearch();
    }
  }, [initialQuery]);
  
  const performSearch = () => {
    const searchResults = performSearch(searchQuery);
    setResults(searchResults);
  };
  
  const filteredResults = activeTab === 'all' 
    ? results 
    : results.filter(item => item.type === activeTab);
    
  const getIconForType = (type: SearchItem['type']) => {
    switch (type) {
      case 'course':
        return <BookOpen className="h-5 w-5 text-royal" />;
      case 'coin':
        return <Coins className="h-5 w-5 text-gold" />;
      case 'mentor':
        return <Users className="h-5 w-5 text-green-600" />;
      case 'article':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'category':
        return <Category className="h-5 w-5 text-purple-600" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-royal mb-6 font-playfair">Search</h1>
          
          <div className="mb-8">
            <HomeSearchDropdown 
              className="w-full"
              placeholder="Search for courses, coins, or mentors..."
            />
          </div>
          
          {results.length > 0 && (
            <>
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList className="grid grid-cols-5 mb-8">
                  <TabsTrigger value="all">All Results</TabsTrigger>
                  <TabsTrigger value="course">Courses</TabsTrigger>
                  <TabsTrigger value="coin">Coins</TabsTrigger>
                  <TabsTrigger value="mentor">Mentors</TabsTrigger>
                  <TabsTrigger value="article">Articles</TabsTrigger>
                </TabsList>
                
                <TabsContent value={activeTab}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredResults.map(item => (
                      <Link to={item.route} key={item.id}>
                        <Card className="cursor-pointer h-full hover:border-royal transition-colors">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center">
                                <div className="mr-2">
                                  {getIconForType(item.type)}
                                </div>
                                <div>
                                  <CardTitle>{item.title}</CardTitle>
                                  <CardDescription className="text-xs uppercase mt-1">
                                    {item.type}
                                  </CardDescription>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-600 line-clamp-2">{item.description}</p>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <div className="flex flex-wrap gap-1">
                              {item.tags?.map(tag => (
                                <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </CardFooter>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
          
          {searchQuery && results.length === 0 && (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🔍</div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">No results found</h2>
              <p className="text-gray-500">
                We couldn't find anything matching "{searchQuery}".<br />
                Try different keywords or browse our categories.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
