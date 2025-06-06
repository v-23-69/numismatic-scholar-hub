
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (!orderId) {
      navigate('/');
    }
  }, [orderId, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="mb-8">
              <CheckCircle className="h-24 w-24 text-green-600 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-royal font-playfair mb-2">Order Confirmed!</h1>
              <p className="text-lg text-gray-600">
                Thank you for your purchase. Your order has been successfully placed.
              </p>
            </div>

            {/* Order Details */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-royal mb-2">Order Details</h2>
                    <p className="text-gray-600">Order ID: <span className="font-mono font-medium">#{orderId}</span></p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Package className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="text-left">
                        <h3 className="font-medium text-blue-900">What happens next?</h3>
                        <ul className="text-sm text-blue-800 mt-2 space-y-1">
                          <li>• You'll receive an order confirmation email shortly</li>
                          <li>• Our team will verify and process your order</li>
                          <li>• You'll get shipping updates via email and SMS</li>
                          <li>• Expected delivery: 3-7 business days</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={() => navigate('/orders')}
                      className="bg-royal hover:bg-royal-light text-white"
                    >
                      View My Orders
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    
                    <Button 
                      onClick={() => navigate('/coins-market')}
                      variant="outline"
                      className="border-royal text-royal hover:bg-royal hover:text-white"
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Information */}
            <div className="text-center text-gray-600">
              <p className="mb-2">Need help with your order?</p>
              <p>
                Contact us at{' '}
                <a href="mailto:support@coinglobe.com" className="text-royal hover:underline">
                  support@coinglobe.com
                </a>{' '}
                or call{' '}
                <a href="tel:+91-9876543210" className="text-royal hover:underline">
                  +91-9876543210
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
