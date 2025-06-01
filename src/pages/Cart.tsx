
import { useState, useEffect } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Load cart items from localStorage
    try {
      const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
      const items = purchases.map((item: any, index: number) => ({
        id: item.id || `item-${index}`,
        title: item.title || 'Course',
        price: item.price || 0,
        quantity: 1,
        image: item.image
      }));
      setCartItems(items);
    } catch (error) {
      console.error('Failed to load cart items:', error);
    }
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    // Also remove from localStorage
    try {
      const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
      const updatedPurchases = purchases.filter((item: any) => item.id !== id);
      localStorage.setItem('purchases', JSON.stringify(updatedPurchases));
    } catch (error) {
      console.error('Failed to update localStorage:', error);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-royal font-playfair mb-4">Shopping Cart</h1>
            <p className="text-lg text-gray-600">Review your selected courses and proceed to checkout</p>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-600 mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Browse our courses and add some to your cart!</p>
              <Button 
                onClick={() => window.location.href = '/courses'}
                className="bg-royal hover:bg-royal-light text-white px-8 py-3"
              >
                Browse Courses
              </Button>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item) => (
                    <Card key={item.id} className="border border-gray-200">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          {item.image && (
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-grow">
                            <h3 className="font-semibold text-royal text-lg">{item.title}</h3>
                            <p className="text-gray-600">₹{item.price}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <Card className="border border-gray-200 sticky top-4">
                    <CardHeader>
                      <CardTitle className="text-royal">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>₹{getTotalPrice()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax:</span>
                          <span>₹0</span>
                        </div>
                        <div className="border-t pt-4">
                          <div className="flex justify-between font-bold text-lg">
                            <span>Total:</span>
                            <span className="text-royal">₹{getTotalPrice()}</span>
                          </div>
                        </div>
                        <Button className="w-full bg-royal hover:bg-royal-light text-white mt-6">
                          Proceed to Checkout
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
