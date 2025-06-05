
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { MarketplaceService } from '@/services/MarketplaceService';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import type { CartItem } from '@/types/marketplace';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useSupabaseAuth();
  const { toast } = useToast();
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingOrder, setProcessingOrder] = useState(false);
  
  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: ''
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (!user) {
      navigate('/authenticate');
      return;
    }
    
    loadCartItems();
  }, [user, navigate]);

  const loadCartItems = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const items = await MarketplaceService.getCartItems(user.id);
      
      if (items.length === 0) {
        toast({
          title: "Empty Cart",
          description: "Your cart is empty. Add some coins first!",
        });
        navigate('/coins-market');
        return;
      }
      
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

  const calculateTotals = () => {
    const subtotal = cartItems.reduce((total, item) => {
      const price = item.coin_listing?.value || 0;
      return total + (price * item.quantity);
    }, 0);
    
    const shipping = subtotal >= 5000 ? 0 : 99;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + shipping + tax;
    
    return { subtotal, shipping, tax, total };
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    // Validate forms
    const requiredShipping = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    const requiredPayment = ['cardNumber', 'expiryDate', 'cvv', 'cardHolderName'];
    
    const missingShipping = requiredShipping.filter(field => !shippingInfo[field as keyof typeof shippingInfo]);
    const missingPayment = requiredPayment.filter(field => !paymentInfo[field as keyof typeof paymentInfo]);
    
    if (missingShipping.length > 0 || missingPayment.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      setProcessingOrder(true);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart after successful order
      await MarketplaceService.clearCart(user.id);
      
      // Generate order ID for confirmation
      const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
      
      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your purchase. You will receive a confirmation email shortly.",
        className: "bg-green-50 border-green-200 text-green-800"
      });
      
      // Redirect to order confirmation page
      navigate(`/order-confirmation?orderId=${orderId}`);
      
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Order Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessingOrder(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
            <p className="text-gray-600 mb-8">Please sign in to continue with checkout.</p>
            <Button onClick={() => navigate('/authenticate')} className="bg-royal hover:bg-royal-light text-white">
              Sign In
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-8 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal mx-auto mb-4"></div>
              <p className="text-gray-600">Loading checkout...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { subtotal, shipping, tax, total } = calculateTotals();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/cart')}
              className="text-royal hover:text-royal-light"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-royal font-playfair">Checkout</h1>
              <p className="text-lg text-gray-600">Complete your order</p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <form onSubmit={handlePlaceOrder}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Shipping & Payment Forms */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Shipping Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-royal">
                        <Truck className="h-5 w-5 mr-2" />
                        Shipping Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fullName">Full Name *</Label>
                          <Input
                            id="fullName"
                            value={shippingInfo.fullName}
                            onChange={(e) => setShippingInfo(prev => ({ ...prev, fullName: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={shippingInfo.email}
                            onChange={(e) => setShippingInfo(prev => ({ ...prev, email: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone *</Label>
                          <Input
                            id="phone"
                            value={shippingInfo.phone}
                            onChange={(e) => setShippingInfo(prev => ({ ...prev, phone: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="country">Country</Label>
                          <Select value={shippingInfo.country} onValueChange={(value) => setShippingInfo(prev => ({ ...prev, country: value }))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="India">India</SelectItem>
                              <SelectItem value="USA">United States</SelectItem>
                              <SelectItem value="UK">United Kingdom</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="address">Address *</Label>
                          <Input
                            id="address"
                            value={shippingInfo.address}
                            onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={shippingInfo.city}
                            onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            value={shippingInfo.state}
                            onChange={(e) => setShippingInfo(prev => ({ ...prev, state: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="zipCode">ZIP Code *</Label>
                          <Input
                            id="zipCode"
                            value={shippingInfo.zipCode}
                            onChange={(e) => setShippingInfo(prev => ({ ...prev, zipCode: e.target.value }))}
                            required
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-royal">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Payment Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label htmlFor="cardHolderName">Cardholder Name *</Label>
                          <Input
                            id="cardHolderName"
                            value={paymentInfo.cardHolderName}
                            onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardHolderName: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={paymentInfo.cardNumber}
                            onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardNumber: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date *</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={paymentInfo.expiryDate}
                            onChange={(e) => setPaymentInfo(prev => ({ ...prev, expiryDate: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={paymentInfo.cvv}
                            onChange={(e) => setPaymentInfo(prev => ({ ...prev, cvv: e.target.value }))}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-center">
                        <Shield className="h-5 w-5 text-green-600 mr-2" />
                        <span className="text-sm text-gray-700">Your payment information is secure and encrypted</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-4">
                    <CardHeader>
                      <CardTitle className="text-royal">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Cart Items */}
                        <div className="space-y-3">
                          {cartItems.map((item) => {
                            const coin = item.coin_listing;
                            if (!coin) return null;

                            return (
                              <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <img 
                                  src={coin.images[0] || 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&auto=format&fit=crop&q=80'} 
                                  alt={coin.title}
                                  className="w-12 h-12 rounded object-cover"
                                />
                                <div className="flex-grow">
                                  <h4 className="font-medium text-sm">{coin.title}</h4>
                                  <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                                </div>
                                <span className="font-medium">₹{(coin.value * item.quantity).toLocaleString()}</span>
                              </div>
                            );
                          })}
                        </div>

                        <div className="border-t pt-4 space-y-2">
                          <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>₹{subtotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Shipping:</span>
                            <span className={shipping === 0 ? "text-green-600" : ""}>
                              {shipping === 0 ? 'Free' : `₹${shipping}`}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax (GST):</span>
                            <span>₹{tax.toLocaleString()}</span>
                          </div>
                          <div className="border-t pt-2">
                            <div className="flex justify-between font-bold text-lg">
                              <span>Total:</span>
                              <span className="text-royal">₹{total.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          type="submit"
                          disabled={processingOrder}
                          className="w-full bg-royal hover:bg-royal-light text-white h-12 mt-6"
                        >
                          {processingOrder ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Processing Order...
                            </>
                          ) : (
                            'Place Order'
                          )}
                        </Button>
                        
                        <p className="text-xs text-gray-600 text-center mt-4">
                          By placing this order, you agree to our Terms of Service and Privacy Policy
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
