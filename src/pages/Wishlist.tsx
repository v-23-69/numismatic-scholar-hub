import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useWishlist } from '@/hooks/useWishlist';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';

const Wishlist = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { wishlist, removeFromWishlist, isLoading, error } = useWishlist();
  const { toast } = useToast();

  const handleRemove = async (itemId: string) => {
    try {
      await removeFromWishlist(itemId);
      toast({
        title: "Removed from wishlist",
        description: "The item has been removed from your wishlist.",
      });
    } catch (error) {
      toast({
        title: "Error removing item",
        description: "There was a problem removing the item from your wishlist. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePurchase = async (itemId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to purchase items.",
        variant: "destructive",
      });
      navigate('/authenticate');
      return;
    }

    try {
      // TODO: Implement purchase logic
      toast({
        title: "Purchase successful",
        description: "You have successfully purchased the item.",
      });
      // Remove from wishlist after successful purchase
      await removeFromWishlist(itemId);
    } catch (error) {
      toast({
        title: "Purchase failed",
        description: "There was a problem processing your purchase. Please try again.",
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
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Wishlist</h2>
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
          <h1 className="text-4xl font-bold mb-4">Your Wishlist</h1>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Keep track of coins and courses you're interested in.
            You can purchase them later or remove them from your wishlist.
          </p>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist?.map((item) => (
            <Card key={item.id} className="flex flex-col">
              <CardHeader>
                <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-2">{item.name}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    {item.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-2">
                  {item.type === 'coin' && (
                    <>
                      <div className="flex items-center text-sm text-foreground/60">
                        <span>Year: {item.year}</span>
                      </div>
                      <div className="flex items-center text-sm text-foreground/60">
                        <span>Country: {item.country}</span>
                      </div>
                    </>
                  )}
                  {item.type === 'course' && (
                    <>
                      <div className="flex items-center text-sm text-foreground/60">
                        <span>Duration: {item.duration} hours</span>
                      </div>
                      <div className="flex items-center text-sm text-foreground/60">
                        <span>Level: {item.level}</span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="text-xl font-bold">${item.price}</div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemove(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => handlePurchase(item.id)}
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

        {wishlist?.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-foreground/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-foreground/40" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
            <p className="text-foreground/60 mb-6">
              Browse our marketplace or courses to find items you'd like to add to your wishlist.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => navigate('/marketplace')}
                className="bg-royal hover:bg-royal/90"
              >
                Browse Marketplace
              </Button>
              <Button
                onClick={() => navigate('/courses')}
                variant="outline"
              >
                Explore Courses
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
