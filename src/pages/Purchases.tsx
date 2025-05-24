import { useState, useEffect } from 'react';
import { BookOpen, ShoppingCart, Eye, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface PurchaseItem {
  id: number;
  title: string;
  image: string;
  type: 'coin' | 'course';
  purchaseDate: string;
}

const Purchases = () => {
  const [purchases, setPurchases] = useState<PurchaseItem[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load purchases from localStorage
    const savedPurchases = localStorage.getItem('purchases');
    if (savedPurchases) {
      setPurchases(JSON.parse(savedPurchases));
    }
  }, []);
  
  const coins = purchases.filter(item => item.type === 'coin');
  const courses = purchases.filter(item => item.type === 'course');
  
  const handleViewCoin = (id: number) => {
    navigate(`/marketplace/${id}`);
  };
  
  const handleWatchCourse = (id: number) => {
    navigate(`/courses/${id}`);
  };
  
  const PurchaseCard = ({ item, onAction }: { item: PurchaseItem, onAction: () => void }) => {
    const date = new Date(item.purchaseDate).toLocaleDateString();
    
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border overflow-hidden flex flex-col md:flex-row"
      >
        <div className="md:w-1/4 h-40 md:h-auto overflow-hidden">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-royal">
                {item.title}
              </h3>
              <span className="text-xs text-gray-500">
                Purchased on {date}
              </span>
            </div>
            
            <div className="mt-2 flex items-center">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {item.type === 'coin' ? 'Coin' : 'Course'}
              </span>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button 
              className="bg-royal hover:bg-royal-light text-white"
              onClick={onAction}
            >
              {item.type === 'coin' ? (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  View Coin
                </>
              ) : (
                <>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Watch Now
                </>
              )}
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </motion.div>
    );
  };
  
  const EmptyState = ({ type, onBrowse }: { type: string, onBrowse: () => void }) => (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gray-100 mb-4">
        {type === 'coins' ? (
          <ShoppingCart className="h-10 w-10 text-gray-400" />
        ) : (
          <BookOpen className="h-10 w-10 text-gray-400" />
        )}
      </div>
      <h2 className="text-xl font-bold text-gray-700 mb-2">
        No {type} purchased yet
      </h2>
      <p className="text-gray-600 mb-6">
        Browse our collection and make your first purchase!
      </p>
      <Button 
        className="bg-royal hover:bg-royal-light text-white"
        onClick={onBrowse}
      >
        Browse {type === 'coins' ? 'Marketplace' : 'Courses'}
      </Button>
    </div>
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-12 bg-gradient-to-b from-royal/5 to-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-8">
              <ShoppingCart className="h-6 w-6 text-royal mr-3" />
              <h1 className="text-3xl font-bold font-playfair text-royal">My Purchases</h1>
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-8 bg-white">
                <TabsTrigger value="all">All Purchases</TabsTrigger>
                <TabsTrigger value="coins">Coins</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-6">
                {purchases.length === 0 ? (
                  <EmptyState type="purchases" onBrowse={() => navigate('/')} />
                ) : (
                  purchases.map((item) => (
                    <PurchaseCard 
                      key={`${item.type}-${item.id}`} 
                      item={item}
                      onAction={() => 
                        item.type === 'coin' 
                          ? handleViewCoin(item.id) 
                          : handleWatchCourse(item.id)
                      }
                    />
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="coins" className="space-y-6">
                {coins.length === 0 ? (
                  <EmptyState type="coins" onBrowse={() => navigate('/marketplace')} />
                ) : (
                  coins.map((item) => (
                    <PurchaseCard 
                      key={`${item.type}-${item.id}`} 
                      item={item}
                      onAction={() => handleViewCoin(item.id)}
                    />
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="courses" className="space-y-6">
                {courses.length === 0 ? (
                  <EmptyState type="courses" onBrowse={() => navigate('/courses')} />
                ) : (
                  courses.map((item) => (
                    <PurchaseCard 
                      key={`${item.type}-${item.id}`} 
                      item={item}
                      onAction={() => handleWatchCourse(item.id)}
                    />
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Purchases; 