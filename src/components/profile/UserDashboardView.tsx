import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, BookOpen, Coins, Star } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import type { WishlistItem } from '@/context/WishlistContext';

type PurchaseItem = {
  id: number;
  title: string;
  price: number;
  purchaseDate: string;
  image?: string;
  type: 'course' | 'coin';
};

const UserDashboardView = () => {
  const [purchases, setPurchases] = useState<PurchaseItem[]>([]);
  const { wishlist, removeFromWishlist } = useWishlist();
  
  // Get purchase data from localStorage
  useEffect(() => {
    const loadPurchases = () => {
      try {
        const storedPurchases = localStorage.getItem('purchases');
        if (storedPurchases) {
          setPurchases(JSON.parse(storedPurchases));
        }
      } catch (error) {
        console.error('Failed to load purchases:', error);
        setPurchases([]);
      }
    };
    
    loadPurchases();
  }, []);
  
  const handleRemoveFromWishlist = (id: number) => {
    removeFromWishlist(id);
  };
  
  // Group items by type
  const wishlistCourses = wishlist.filter(item => item.type === 'course');
  const wishlistCoins = wishlist.filter(item => item.type === 'coin');
  const purchasedCourses = purchases.filter(item => item.type === 'course');
  const purchasedCoins = purchases.filter(item => item.type === 'coin');
  
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold font-playfair text-royal">Your Dashboard</h2>
      
      <Tabs defaultValue="wishlist">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="wishlist">
            <Heart className="h-4 w-4 mr-2" />
            Wishlist
          </TabsTrigger>
          <TabsTrigger value="purchases">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Purchases
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="wishlist" className="pt-4">
          {wishlist.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-5xl mb-4">💭</div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-500 mb-4">Add items to your wishlist to save them for later.</p>
              <div className="flex gap-4 justify-center">
                <Link to="/courses">
                  <Button variant="outline" className="border-royal text-royal">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Browse Courses
                  </Button>
                </Link>
                <Link to="/coins-market">
                  <Button variant="outline" className="border-royal text-royal">
                    <Coins className="h-4 w-4 mr-2" />
                    Browse Coins
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {wishlistCourses.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Courses</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wishlistCourses.map(item => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="relative">
                          {item.image ? (
                            <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                          ) : (
                            <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                              <BookOpen className="h-12 w-12 text-gray-400" />
                            </div>
                          )}
                          <Button 
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                            onClick={() => handleRemoveFromWishlist(item.id)}
                          >
                            <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                          </Button>
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                          <CardDescription>Course • ${item.price.toFixed(2)}</CardDescription>
                        </CardHeader>
                        <CardFooter>
                          <Link to={`/courses/${item.id}`} className="w-full">
                            <Button className="w-full bg-royal">View Course</Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {wishlistCoins.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Coins</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wishlistCoins.map(item => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="relative">
                          {item.image ? (
                            <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                          ) : (
                            <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                              <Coins className="h-12 w-12 text-gray-400" />
                            </div>
                          )}
                          <Button 
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                            onClick={() => handleRemoveFromWishlist(item.id)}
                          >
                            <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                          </Button>
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                          <CardDescription>Coin • ${item.price.toFixed(2)}</CardDescription>
                        </CardHeader>
                        <CardFooter>
                          <Link to={`/coins-market/${item.id}`} className="w-full">
                            <Button className="w-full bg-royal">View Coin</Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="purchases" className="pt-4">
          {purchases.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-5xl mb-4">🛒</div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No purchases yet</h3>
              <p className="text-gray-500 mb-4">Your purchased courses and coins will appear here.</p>
              <div className="flex gap-4 justify-center">
                <Link to="/courses">
                  <Button variant="outline" className="border-royal text-royal">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Browse Courses
                  </Button>
                </Link>
                <Link to="/coins-market">
                  <Button variant="outline" className="border-royal text-royal">
                    <Coins className="h-4 w-4 mr-2" />
                    Browse Coins
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {purchasedCourses.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Purchased Courses</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {purchasedCourses.map(item => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="relative">
                          {item.image ? (
                            <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                          ) : (
                            <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                              <BookOpen className="h-12 w-12 text-gray-400" />
                            </div>
                          )}
                          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3">
                            <div className="flex items-center text-white">
                              <Star className="h-4 w-4 text-gold fill-gold mr-1" />
                              <span className="text-sm">Purchased on {new Date(item.purchaseDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                          <CardDescription>Course • ${item.price.toFixed(2)}</CardDescription>
                        </CardHeader>
                        <CardFooter>
                          <Link to={`/courses/${item.id}`} className="w-full">
                            <Button className="w-full bg-royal">Access Course</Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {purchasedCoins.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Purchased Coins</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {purchasedCoins.map(item => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="relative">
                          {item.image ? (
                            <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                          ) : (
                            <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                              <Coins className="h-12 w-12 text-gray-400" />
                            </div>
                          )}
                          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3">
                            <div className="flex items-center text-white">
                              <Star className="h-4 w-4 text-gold fill-gold mr-1" />
                              <span className="text-sm">Purchased on {new Date(item.purchaseDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                          <CardDescription>Coin • ${item.price.toFixed(2)}</CardDescription>
                        </CardHeader>
                        <CardFooter>
                          <Link to={`/coins-market/${item.id}`} className="w-full">
                            <Button className="w-full bg-royal">View Details</Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboardView;
