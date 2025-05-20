
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Tag, Calendar } from 'lucide-react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const articles = [
  {
    id: 1,
    title: "How to Identify Authentic Ancient Roman Coins",
    excerpt: "Learn the key markers that distinguish authentic Roman coins from modern reproductions with our expert guide.",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&auto=format&fit=crop&q=80",
    author: "Dr. Eleanor Davies",
    date: "2024-05-10",
    category: "Authentication",
    readTime: 8
  },
  {
    id: 2,
    title: "Understanding Coin Grading Standards",
    excerpt: "Explore the standardized grading systems used by professional numismatists and how they affect coin values.",
    image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=600&auto=format&fit=crop&q=80",
    author: "James Wilson",
    date: "2024-05-02",
    category: "Grading",
    readTime: 12
  },
  {
    id: 3,
    title: "The History of Indian Coinage Through the Ages",
    excerpt: "A comprehensive look at how Indian currency evolved from ancient punch-marked coins to modern rupees.",
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&auto=format&fit=crop&q=80",
    author: "Prof. Anil Sharma",
    date: "2024-04-25",
    category: "History",
    readTime: 15
  },
  {
    id: 4,
    title: "Digital Photography Tips for Coin Collectors",
    excerpt: "Master the techniques for capturing high-quality images of your coins using equipment you already own.",
    image: "https://images.unsplash.com/photo-1583518257225-f9a8081f6a84?w=600&auto=format&fit=crop&q=80",
    author: "Sarah Johnson",
    date: "2024-04-18",
    category: "Photography",
    readTime: 6
  },
  {
    id: 5,
    title: "Investing in Rare Coins: Risks and Rewards",
    excerpt: "An in-depth analysis of numismatic investments compared to bullion and other collectible assets.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80",
    author: "Michael Reynolds",
    date: "2024-04-10",
    category: "Investment",
    readTime: 10
  },
  {
    id: 6,
    title: "Preservation Techniques for Your Collection",
    excerpt: "Learn how to properly store and handle your coins to maintain their condition and value over time.",
    image: "https://images.unsplash.com/photo-1526378787940-576a539ba69d?w=600&auto=format&fit=crop&q=80",
    author: "Dr. Mei Zhang",
    date: "2024-04-02",
    category: "Conservation",
    readTime: 9
  }
];

const Articles = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter articles based on search query
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-royal/10 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold font-playfair text-royal mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Articles & Blog
              </motion.h1>
              <motion.p 
                className="text-lg text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Discover in-depth articles, collector guides, and expert insights on numismatics and coin collecting.
              </motion.p>
              
              <motion.div
                className="relative max-w-xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Input
                  type="text"
                  placeholder="Search articles by title, topic, or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Articles Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="all" className="w-full mb-8">
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="all">All Articles</TabsTrigger>
                  <TabsTrigger value="authentication">Authentication</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="investment">Investment</TabsTrigger>
                </TabsList>
                
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              
              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.length > 0 ? (
                    filteredArticles.map((article, index) => (
                      <motion.div
                        key={article.id}
                        className="royal-card overflow-hidden group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 right-3 bg-gold text-royal-dark text-xs font-bold px-2 py-1 rounded">
                            {article.category}
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(article.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}</span>
                            <span className="mx-2">•</span>
                            <span>{article.readTime} min read</span>
                          </div>
                          
                          <h3 className="text-xl font-bold mb-2 text-royal group-hover:text-gold transition-colors">
                            {article.title}
                          </h3>
                          
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {article.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">By {article.author}</span>
                            <Button variant="ghost" size="sm" className="text-royal hover:text-gold p-0">
                              Read More
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full py-12 text-center">
                      <p className="text-lg text-gray-600">No articles found matching your search.</p>
                      <Button onClick={() => setSearchQuery('')} className="mt-4">
                        Clear Search
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="authentication" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles
                    .filter(article => article.category === 'Authentication')
                    .map((article, index) => (
                      // Same article card as above
                      <motion.div
                        key={article.id}
                        className="royal-card overflow-hidden group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 right-3 bg-gold text-royal-dark text-xs font-bold px-2 py-1 rounded">
                            {article.category}
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(article.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}</span>
                            <span className="mx-2">•</span>
                            <span>{article.readTime} min read</span>
                          </div>
                          
                          <h3 className="text-xl font-bold mb-2 text-royal group-hover:text-gold transition-colors">
                            {article.title}
                          </h3>
                          
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {article.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">By {article.author}</span>
                            <Button variant="ghost" size="sm" className="text-royal hover:text-gold p-0">
                              Read More
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles
                    .filter(article => article.category === 'History')
                    .map((article, index) => (
                      // Same article card as above
                      <motion.div
                        key={article.id}
                        className="royal-card overflow-hidden group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 right-3 bg-gold text-royal-dark text-xs font-bold px-2 py-1 rounded">
                            {article.category}
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(article.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}</span>
                            <span className="mx-2">•</span>
                            <span>{article.readTime} min read</span>
                          </div>
                          
                          <h3 className="text-xl font-bold mb-2 text-royal group-hover:text-gold transition-colors">
                            {article.title}
                          </h3>
                          
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {article.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">By {article.author}</span>
                            <Button variant="ghost" size="sm" className="text-royal hover:text-gold p-0">
                              Read More
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="investment" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles
                    .filter(article => article.category === 'Investment')
                    .map((article, index) => (
                      // Same article card as above
                      <motion.div
                        key={article.id}
                        className="royal-card overflow-hidden group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 right-3 bg-gold text-royal-dark text-xs font-bold px-2 py-1 rounded">
                            {article.category}
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(article.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}</span>
                            <span className="mx-2">•</span>
                            <span>{article.readTime} min read</span>
                          </div>
                          
                          <h3 className="text-xl font-bold mb-2 text-royal group-hover:text-gold transition-colors">
                            {article.title}
                          </h3>
                          
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {article.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">By {article.author}</span>
                            <Button variant="ghost" size="sm" className="text-royal hover:text-gold p-0">
                              Read More
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-center mt-12">
              <Button className="bg-royal hover:bg-royal-light text-white">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-16 bg-royal/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold font-playfair text-royal mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-gray-600 mb-8">
                Get the latest articles, coin authentication tips, and exclusive content delivered to your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow"
                />
                <Button className="bg-royal hover:bg-royal-light text-white">
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Articles;
