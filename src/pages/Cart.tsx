
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { MarketplaceService } from '@/services/MarketplaceService';

interface CartItem {
  id: number;
  coin_listing_id: number;
  quantity: number;
  coin_listings: {
    id: number;
    title: string;
    description: string;
    value: number;
    images: string[];
    seller_name: string;
    stock_quantity: number;
  };
}

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useSupabaseAuth();
  const { toast } = useToast();
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    loadCart();
  }, [user]);

  const loadCart = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const items = await MarketplaceService.getCartItems(user.id);
      setCartItems(items);
    } catch (error) {
      console.error('Error loading cart:', error);
      toast({
        title: "Error",
        description: "Failed to load your cart",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: number, newQuantity: number) => {
    if (!user || newQuantity < 1) return;

    try {
      setActionLoading(prev => ({ ...prev, [itemId]: true }));
      await MarketplaceService.updateCartItemQuantity(user.id, itemId, newQuantity);
      
      setCartItems(prev => 
        prev.map(item => 
          item.coin_listing_id === itemId 
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive"
      });
    } finally {
      setActionLoading(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const removeItem = async (itemId: number) => {
    if (!user) return;

    try {
      setActionLoading(prev => ({ ...prev, [itemId]: true }));
      await MarketplaceService.removeFromCart(user.id, itemId);
      
      setCartItems(prev => prev.filter(item => item.coin_listing_id !== itemId));
      
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart",
      });
    } catch (error) {
      console.error('Error removing item:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive"
      });
    } finally {
      setActionLoading(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.coin_listings.value * item.quantity);
    }, 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some coins to your cart before checking out",
        variant: "destructive"
      });
      return;
    }
    navigate('/checkout');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-8 pb-16 flex items-center justify-center">
          <div className="text-center">
            <ShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-600 mb-4">Please sign in</h2>
            <p className="text-gray-500 mb-8">You need to be signed in to view your cart</p>
            <Button 
              onClick={() => navigate('/authenticate')}
              className="bg-royal hover:bg-royal-light text-white px-8 py-3"
            >
              Sign In
            </Button>
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
            <h1 className="text-4xl font-bold text-royal font-playfair">Shopping Cart</h1>
            <p className="text-lg text-gray-600">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading your cart...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-600 mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Add some amazing coins to your cart and come back!</p>
              <Button 
                onClick={() => navigate('/coins-market')}
                className="bg-royal hover:bg-royal-light text-white px-8 py-3"
              >
                Browse Coins
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.coin_listing_id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="border border-gray-200">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                          {/* Product Image */}
                          <div className="w-full md:w-32 h-32 flex-shrink-0">
                            <img
                              src={item.coin_listings.images[0] || 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&auto=format&fit=crop&q=80'}
                              alt={item.coin_listings.title}
                              className="w-full h-full object-cover rounded-lg cursor-pointer"
                              onClick={() => navigate(`/coins-market/${item.coin_listing_id}`)}
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-grow">
                            <h3 
                              className="text-xl font-bold text-royal cursor-pointer hover:text-royal-light transition-colors"
                              onClick={() => navigate(`/coins-market/${item.coin_listing_id}`)}
                            >
                              {item.coin_listings.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                              {item.coin_listings.description}
                            </p>
                            <p className="text-sm text-gray-500">Seller: {item.coin_listings.seller_name}</p>
                            
                            <div className="flex items-center justify-between mt-4">
                              <span className="text-xl font-bold text-royal">
                                ₹{item.coin_listings.value.toLocaleString()}
                              </span>
                              
                              {/* Stock indicator */}
                              {item.coin_listings.stock_quantity <= 5 && (
                                <span className="text-sm text-orange-600 font-medium">
                                  Only {item.coin_listings.stock_quantity} left
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex flex-col items-end space-y-4">
                            <div className="flex items-center space-x-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.coin_listing_id, item.quantity - 1)}
                                disabled={item.quantity <= 1 || actionLoading[item.coin_listing_id]}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              
                              <span className="w-12 text-center font-medium">
                                {item.quantity}
                              </span>
                              
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.coin_listing_id, item.quantity + 1)}
                                disabled={item.quantity >= item.coin_listings.stock_quantity || actionLoading[item.coin_listing_id]}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.coin_listing_id)}
                              disabled={actionLoading[item.coin_listing_id]}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>

                            {/* Item Total */}
                            <div className="text-right">
                              <p className="text-lg font-bold text-royal">
                                ₹{(item.coin_listings.value * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="border border-royal/20 sticky top-4">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-royal mb-6">Order Summary</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                        <span className="font-medium">₹{calculateTotal().toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium text-green-600">Free</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span className="font-medium">Calculated at checkout</span>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-royal">₹{calculateTotal().toLocaleString()}</span>
                      </div>
                    </div>

                    <Button 
                      onClick={handleCheckout}
                      className="w-full mt-6 bg-royal hover:bg-royal-light text-white py-3"
                      size="lg"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Proceed to Checkout
                    </Button>

                    <Button 
                      onClick={() => navigate('/coins-market')}
                      variant="outline"
                      className="w-full mt-3 border-royal text-royal hover:bg-royal hover:text-white"
                    >
                      Continue Shopping
                    </Button>

                    <div className="mt-6 text-center text-sm text-gray-500">
                      <p>Free shipping on all orders</p>
                      <p>Secure checkout with SSL encryption</p>
                    </div>
                  </CardContent>
                </Card>
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
