
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Truck, Calendar, ArrowLeft } from 'lucide-react';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { user } = useSupabaseAuth();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || Math.random().toString(36).substr(2, 9).toUpperCase();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (!user) {
      navigate('/authenticate');
      return;
    }
  }, [user, navigate]);

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-royal font-playfair mb-2">
                Order Confirmed!
              </h1>
              <p className="text-lg text-gray-600">
                Thank you for your purchase. Your order has been successfully placed.
              </p>
            </div>

            {/* Order Details */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-mono font-medium">#{orderId}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-medium">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Status:</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                      Confirmed
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <span className="font-medium">{estimatedDelivery.toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Status Steps */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mb-2">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-green-600">Confirmed</span>
                  </div>
                  
                  <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                      <Package className="h-5 w-5 text-gray-500" />
                    </div>
                    <span className="text-sm text-gray-500">Processing</span>
                  </div>
                  
                  <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                      <Truck className="h-5 w-5 text-gray-500" />
                    </div>
                    <span className="text-sm text-gray-500">Shipped</span>
                  </div>
                  
                  <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                      <CheckCircle className="h-5 w-5 text-gray-500" />
                    </div>
                    <span className="text-sm text-gray-500">Delivered</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-royal mt-1" />
                    <div>
                      <h4 className="font-medium">Order Processing</h4>
                      <p className="text-gray-600 text-sm">
                        We'll process your order within 1-2 business days and send you a confirmation email.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Truck className="h-5 w-5 text-royal mt-1" />
                    <div>
                      <h4 className="font-medium">Shipping Updates</h4>
                      <p className="text-gray-600 text-sm">
                        You'll receive tracking information once your order has been shipped.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Package className="h-5 w-5 text-royal mt-1" />
                    <div>
                      <h4 className="font-medium">Delivery</h4>
                      <p className="text-gray-600 text-sm">
                        Your coins will be carefully packaged and delivered to your address.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate('/coins-market')}
                className="flex-1 bg-royal hover:bg-royal-light text-white"
              >
                Continue Shopping
              </Button>
              <Button
                onClick={() => navigate('/profile?tab=orders')}
                variant="outline"
                className="flex-1 border-royal text-royal hover:bg-royal hover:text-white"
              >
                View My Orders
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
