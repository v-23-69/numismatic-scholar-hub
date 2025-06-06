import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreditCard, MapPin, Package, Smartphone, Building, QrCode } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { MarketplaceService } from '@/services/MarketplaceService';
import { PaymentService } from '@/services/PaymentService';
import { NotificationService } from '@/services/NotificationService';
import type { CartItem } from '@/types/marketplace';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useSupabaseAuth();
  const { toast } = useToast();
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [processingPayment, setProcessingPayment] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  const [shippingAddress, setShippingAddress] = useState({
    full_name: '',
    phone: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'India'
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!user) {
      navigate('/authenticate');
      return;
    }
    loadCart();
  }, [user, navigate]);

  const loadCart = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const items = await MarketplaceService.getCartItems(user.id);
      if (items.length === 0) {
        navigate('/cart');
        return;
      }
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

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.coin_listing?.value || 0) * item.quantity;
    }, 0);
  };

  const calculateTax = (subtotal: number) => {
    return Math.round(subtotal * 0.18); // 18% GST
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    return subtotal + tax;
  };

  const handlePlaceOrder = async () => {
    if (!user) return;

    // Validate shipping address
    const requiredFields = ['full_name', 'phone', 'address_line_1', 'city', 'state', 'postal_code'];
    const missingFields = requiredFields.filter(field => !shippingAddress[field as keyof typeof shippingAddress]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required shipping details",
        variant: "destructive"
      });
      return;
    }

    try {
      setPlacingOrder(true);
      
      // Create order first
      const orderData = {
        total: calculateTotal(),
        shippingAddress,
        items: cartItems.map(item => ({
          coin_id: item.coin_id,
          quantity: item.quantity,
          price: item.coin_listing?.value || 0
        }))
      };

      const order = await MarketplaceService.placeOrder(user.id, orderData);
      setOrderId(order.id);
      
      // Show payment modal
      setShowPaymentModal(true);
      
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setPlacingOrder(false);
    }
  };

  const handlePayment = async () => {
    if (!user || !orderId) return;

    try {
      setProcessingPayment(true);
      
      const paymentRequest = {
        amount: calculateTotal(),
        currency: 'INR',
        orderId: orderId,
        customerEmail: user.email || '',
        customerPhone: shippingAddress.phone
      };

      let paymentResponse;
      
      switch (paymentMethod) {
        case 'upi':
          paymentResponse = await PaymentService.processUPIPayment(paymentRequest);
          break;
        case 'card':
          paymentResponse = await PaymentService.processCardPayment(paymentRequest);
          break;
        case 'netbanking':
          paymentResponse = await PaymentService.processNetBanking(paymentRequest);
          break;
        default:
          throw new Error('Invalid payment method');
      }

      if (paymentResponse.success) {
        // Send notifications
        await NotificationService.sendAllOrderNotifications({
          orderId: orderId,
          customerName: shippingAddress.full_name,
          customerEmail: user.email || '',
          customerPhone: shippingAddress.phone,
          orderAmount: calculateTotal(),
          orderItems: cartItems,
          shippingAddress: shippingAddress,
          paymentStatus: 'completed'
        });

        toast({
          title: "Payment Successful!",
          description: paymentResponse.message,
          className: "bg-green-50 border-green-200 text-green-800"
        });

        setShowPaymentModal(false);
        navigate('/checkout/confirmation', { 
          state: { 
            orderId: orderId,
            transactionId: paymentResponse.transactionId,
            paymentMethod: paymentResponse.paymentMethod 
          } 
        });
      } else {
        toast({
          title: "Payment Failed",
          description: paymentResponse.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      toast({
        title: "Payment Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessingPayment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal mx-auto mb-4"></div>
            <p className="text-gray-600">Loading checkout...</p>
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
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-royal font-playfair">Checkout</h1>
            <p className="text-lg text-gray-600">Complete your order</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Shipping Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-royal">
                    <MapPin className="h-5 w-5 mr-2" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="full_name">Full Name *</Label>
                      <Input
                        id="full_name"
                        value={shippingAddress.full_name}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, full_name: e.target.value }))}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="address_line_1">Address Line 1 *</Label>
                    <Input
                      id="address_line_1"
                      value={shippingAddress.address_line_1}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, address_line_1: e.target.value }))}
                      placeholder="Street address, building, apartment"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address_line_2">Address Line 2</Label>
                    <Input
                      id="address_line_2"
                      value={shippingAddress.address_line_2}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, address_line_2: e.target.value }))}
                      placeholder="Landmark, area (optional)"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
                        placeholder="Enter your city"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, state: e.target.value }))}
                        placeholder="Enter your state"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="postal_code">Postal Code *</Label>
                      <Input
                        id="postal_code"
                        value={shippingAddress.postal_code}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, postal_code: e.target.value }))}
                        placeholder="Enter postal code"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={shippingAddress.country}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-royal">
                    <Package className="h-5 w-5 mr-2" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <img
                          src={item.coin_listing?.images[0] || 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&auto=format&fit=crop&q=80'}
                          alt={item.coin_listing?.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-grow">
                          <h4 className="font-medium text-gray-900">{item.coin_listing?.title}</h4>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{((item.coin_listing?.value || 0) * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{calculateSubtotal().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="text-green-600">Free</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GST (18%)</span>
                        <span>₹{calculateTax(calculateSubtotal()).toLocaleString()}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-royal">₹{calculateTotal().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button 
                onClick={handlePlaceOrder}
                disabled={placingOrder}
                className="w-full bg-royal hover:bg-royal-light text-white py-3"
                size="lg"
              >
                {placingOrder ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <CreditCard className="h-4 w-4 mr-2" />
                )}
                Place Order - ₹{calculateTotal().toLocaleString()}
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Choose Payment Method</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex items-center cursor-pointer">
                  <Smartphone className="h-4 w-4 mr-2 text-blue-600" />
                  UPI Payment
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center cursor-pointer">
                  <CreditCard className="h-4 w-4 mr-2 text-green-600" />
                  Credit/Debit Card
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="netbanking" id="netbanking" />
                <Label htmlFor="netbanking" className="flex items-center cursor-pointer">
                  <Building className="h-4 w-4 mr-2 text-purple-600" />
                  Net Banking
                </Label>
              </div>
            </RadioGroup>

            {paymentMethod === 'upi' && (
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <QrCode className="h-16 w-16 mx-auto mb-2 text-blue-600" />
                <p className="text-sm text-blue-800">Scan QR code with any UPI app</p>
                <p className="text-xs text-blue-600 mt-1">Amount: ₹{calculateTotal().toLocaleString()}</p>
              </div>
            )}

            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setShowPaymentModal(false)}
                className="flex-1"
                disabled={processingPayment}
              >
                Cancel
              </Button>
              <Button 
                onClick={handlePayment}
                disabled={processingPayment}
                className="flex-1 bg-royal hover:bg-royal-light"
              >
                {processingPayment ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : null}
                Pay ₹{calculateTotal().toLocaleString()}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Checkout;
