
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { MarketplaceService } from '@/services/MarketplaceService';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import type { CartItem } from '@/types/marketplace';

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useSupabaseAuth();
  const { toast } = useToast();
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (user) {
      loadCartItems();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadCartItems = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const items = await MarketplaceService.getCartItems(user.id);
      setCartItems(items);
    } catch (error) {
      console.error('Error loading cart items:', error);
      toast({
        title: "Error",
        description: "Failed to load cart items",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      setUpdating(itemId);
      await MarketplaceService.updateCartItemQuantity(itemId, newQuantity);
      
      if (newQuantity === 0) {
        setCartItems(prev => prev.filter(item => item.id !== itemId));
        toast({
          title: "Item removed",
          description: "Item has been removed from your cart",
        });
      } else {
        setCartItems(prev =>
          prev.map(item =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          )
        );
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
      toast({
        title: "Error",
        description: "Failed to update item quantity",
        variant: "destructive"
      });
    } finally {
      setUpdating(null);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      setUpdating(itemId);
      await MarketplaceService.removeFromCart(itemId);
      setCartItems(prev => prev.filter(item => item.id !== itemId));
      
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart",
      });
    } catch (error) {
      console.error('Error removing cart item:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive"
      });
    } finally {
      setUpdating(null);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.coin_listing?.value || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/authenticate');
      return;
    }
    
    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add some items to your cart before checkout",
        variant: "destructive"
      });
      return;
    }
    
    navigate('/checkout');
  };

  // If user not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-8 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center py-16">
              <ShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-600 mb-4">Please Sign In</h2>
              <p className="text-gray-500 mb-8">You need to be signed in to view your cart</p>
              <div className="space-x-4">
                <Button 
                  onClick={() => navigate('/authenticate')}
                  className="bg-royal hover:bg-royal-light text-white px-8 py-3"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => navigate('/coins-market')}
                  variant="outline"
                  className="border-royal text-royal hover:bg-royal hover:text-white px-8 py-3"
                >
                  Browse Marketplace
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-8 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your cart...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-royal font-playfair mb-2">Shopping Cart</h1>
            <p className="text-lg text-gray-600">
              {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-600 mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Browse our marketplace and add some coins to your cart!</p>
              <Button 
                onClick={() => navigate('/coins-market')}
                className="bg-royal hover:bg-royal-light text-white px-8 py-3"
              >
                Browse Marketplace
              </Button>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item) => {
                    const coin = item.coin_listing;
                    if (!coin) return null;

                    return (
                      <Card key={item.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            {/* Product Image */}
                            <div 
                              className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer group"
                              onClick={() => navigate(`/coins-market/${coin.id}`)}
                            >
                              <img 
                                src={coin.images[0] || 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&auto=format&fit=crop&q=80'} 
                                alt={coin.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                            
                            {/* Product Info */}
                            <div className="flex-grow">
                              <h3 
                                className="font-semibold text-royal text-lg mb-1 cursor-pointer hover:text-royal-light transition-colors"
                                onClick={() => navigate(`/coins-market/${coin.id}`)}
                              >
                                {coin.title}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2">{coin.region} • {coin.mint_date}</p>
                              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{coin.description}</p>
                              <div className="flex items-center space-x-4">
                                <span className="text-lg font-bold text-royal">₹{coin.value.toLocaleString()}</span>
                                <span className="text-sm text-gray-500">
                                  {coin.stock_quantity > 0 ? `${coin.stock_quantity} in stock` : 'Out of stock'}
                                </span>
                              </div>
                            </div>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-2 border border-gray-300 rounded-lg bg-white">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={updating === item.id || item.quantity <= 1}
                                  className="h-8 w-8 p-0 hover:bg-gray-100"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center text-sm font-medium">
                                  {updating === item.id ? '...' : item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  disabled={updating === item.id || item.quantity >= coin.stock_quantity}
                                  className="h-8 w-8 p-0 hover:bg-gray-100"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                disabled={updating === item.id}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <Card className="border border-gray-200 sticky top-4 shadow-lg">
                    <CardHeader className="bg-royal/5">
                      <CardTitle className="text-royal">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Subtotal ({getTotalItems()} items):</span>
                          <span className="font-medium">₹{getTotalPrice().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping:</span>
                          <span className={`font-medium ${getTotalPrice() >= 5000 ? "text-green-600" : ""}`}>
                            {getTotalPrice() >= 5000 ? 'Free' : '₹99'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax (GST):</span>
                          <span className="font-medium">₹{Math.round(getTotalPrice() * 0.18).toLocaleString()}</span>
                        </div>
                        <div className="border-t pt-4">
                          <div className="flex justify-between font-bold text-lg">
                            <span>Total:</span>
                            <span className="text-royal">
                              ₹{(getTotalPrice() + (getTotalPrice() >= 5000 ? 0 : 99) + Math.round(getTotalPrice() * 0.18)).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        
                        {getTotalPrice() < 5000 && (
                          <div className="text-sm text-blue-700 bg-blue-50 p-3 rounded-lg border border-blue-200">
                            Add ₹{(5000 - getTotalPrice()).toLocaleString()} more for free shipping
                          </div>
                        )}
                        
                        <Button 
                          className="w-full bg-royal hover:bg-royal-light text-white mt-6 h-12 text-lg font-semibold"
                          onClick={handleCheckout}
                          disabled={cartItems.length === 0}
                        >
                          Proceed to Checkout
                        </Button>
                        
                        <Button 
                          variant="outline"
                          className="w-full border-royal text-royal hover:bg-royal hover:text-white"
                          onClick={() => navigate('/coins-market')}
                        >
                          Continue Shopping
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
