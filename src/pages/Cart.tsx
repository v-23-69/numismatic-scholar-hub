
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Get cart items from localStorage
    try {
      const items = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(items);
    } catch {
      setCartItems([]);
    }
  }, []);

  const removeFromCart = (itemId: string) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

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
            <div className="text-center py-12">
              <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-500 mb-2">Your cart is empty</h2>
              <p className="text-gray-400 mb-6">Add some courses to get started!</p>
              <Button className="bg-royal hover:bg-royal-light text-white">
                Browse Courses
              </Button>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4 mb-8">
                {cartItems.map((item) => (
                  <Card key={item.id} className="border-gold/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-royal">{item.title}</h3>
                          <p className="text-gray-600">{item.instructor}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-2xl font-bold text-royal">₹{item.price}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 border-red-300 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card className="border-gold/20">
                <CardHeader>
                  <CardTitle className="text-royal">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-xl font-bold text-royal">
                    <span>Total: ₹{total}</span>
                    <Button className="bg-royal hover:bg-royal-light text-white">
                      Proceed to Checkout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
