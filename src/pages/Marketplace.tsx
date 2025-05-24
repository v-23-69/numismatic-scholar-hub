import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCoins } from '@/hooks/useCoins';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Search, Filter, Heart, Shield, ShoppingCart } from 'lucide-react';

const Marketplace = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { coins, isLoading, error } = useCoins();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');

  const categories = [
    'all',
    'ancient',
    'medieval',
    'modern',
    'world',
    'specialized',
  ];

  const conditions = ['all', 'mint', 'excellent', 'very-good', 'good', 'fair'];

  const filteredCoins = coins?.filter((coin) => {
    const matchesSearch = coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || coin.category === selectedCategory;
    const matchesCondition = selectedCondition === 'all' || coin.condition === selectedCondition;
    return matchesSearch && matchesCategory && matchesCondition;
  });

  const handlePurchase = async (coinId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to purchase coins.",
        variant: "destructive",
      });
      navigate('/authenticate');
      return;
    }

    try {
      // TODO: Implement purchase logic
      toast({
        title: "Purchase successful",
        description: "You have successfully purchased the coin.",
      });
    } catch (error) {
      toast({
        title: "Purchase failed",
        description: "There was a problem processing your purchase. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddToWishlist = async (coinId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add coins to your wishlist.",
        variant: "destructive",
      });
      navigate('/authenticate');
      return;
    }

    try {
      // TODO: Implement wishlist logic
      toast({
        title: "Added to wishlist",
        description: "The coin has been added to your wishlist.",
      });
    } catch (error) {
      toast({
        title: "Failed to add to wishlist",
        description: "There was a problem adding the coin to your wishlist. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Marketplace</h2>
          <p className="text-foreground/60">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Coin Marketplace</h1>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Browse our collection of authentic coins from around the world.
            Each coin is verified by our expert team.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40" />
                <Input
                  type="text"
                  placeholder="Search coins..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-md border border-border bg-background"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="px-4 py-2 rounded-md border border-border bg-background"
              >
                {conditions.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Coin Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCoins?.map((coin) => (
            <Card key={coin.id} className="flex flex-col">
              <CardHeader>
                <div className="aspect-square relative mb-4 rounded-lg overflow-hidden">
                  <img
                    src={coin.images[0]}
                    alt={coin.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-2">{coin.name}</CardTitle>
                    <CardDescription>{coin.description}</CardDescription>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    {coin.condition}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-foreground/60">
                    <Shield className="h-4 w-4 mr-2" />
                    <span>{coin.verification_status}</span>
                  </div>
                  <div className="flex items-center text-sm text-foreground/60">
                    <span>Year: {coin.year}</span>
                  </div>
                  <div className="flex items-center text-sm text-foreground/60">
                    <span>Country: {coin.country}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="text-xl font-bold">${coin.price}</div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleAddToWishlist(coin.id)}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => handlePurchase(coin.id)}
                    className="bg-royal hover:bg-royal/90"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy Now
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredCoins?.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No coins found</h3>
            <p className="text-foreground/60">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
