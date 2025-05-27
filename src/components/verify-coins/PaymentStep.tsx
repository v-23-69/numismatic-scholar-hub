
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, CheckCircle } from 'lucide-react';

interface PaymentStepProps {
  coinCount: number;
  totalPrice: number;
  hasFreeVerification: boolean;
  totalCoinsToUpload: number;
  isSubmitting: boolean;
  onPayment: () => void;
  onBack: () => void;
}

const PaymentStep: React.FC<PaymentStepProps> = ({
  coinCount,
  totalPrice,
  hasFreeVerification,
  totalCoinsToUpload,
  isSubmitting,
  onPayment,
  onBack
}) => {
  return (
    <Card className="border-2 border-blue-100 rounded-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-royal">Complete Your Payment</CardTitle>
        <CardDescription>
          Secure payment for your coin verification service
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h3 className="text-lg font-semibold text-royal mb-4">Verification Summary</h3>
          <div className="space-y-2 mb-4">
            <p><strong>Coins to verify:</strong> {totalCoinsToUpload} ({coinCount} paid + {hasFreeVerification ? '1 free' : '0 free'})</p>
            <p><strong>Total price:</strong> ₹{totalPrice}</p>
          </div>
          
          {hasFreeVerification && (
            <div className="mb-4 p-3 bg-green-100 rounded-xl border border-green-200">
              <p className="text-sm font-medium text-green-800">
                🎁 You've earned 1 FREE coin verification!
              </p>
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 p-6 rounded-xl">
          <h4 className="font-semibold text-gray-700 mb-4 flex items-center justify-center">
            <Award className="mr-2 text-gold" size={20} />
            Our expert will analyze:
          </h4>
          <ul className="text-left text-gray-600 space-y-2 max-w-md mx-auto">
            <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />🔍 Authenticity verification</li>
            <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />💰 Current market price</li>
            <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />🏭 Metal composition analysis</li>
            <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />📈 Future valuation insights</li>
            <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />📅 Era and historical context</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="justify-center space-x-4">
        <Button variant="outline" onClick={onBack} className="rounded-xl">
          Back to Upload
        </Button>
        <Button 
          onClick={onPayment}
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 text-lg rounded-xl"
        >
          Pay ₹{totalPrice} & Submit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentStep;
