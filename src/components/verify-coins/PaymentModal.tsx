
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  totalPrice: number;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  totalPrice,
  onClose,
  onPaymentSuccess
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-royal">Complete Your Payment</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 p-6">
          <div className="bg-white p-4 rounded-xl border-2 border-gray-200">
            <QrCode className="h-32 w-32 text-gray-600" />
          </div>
          <p className="text-lg font-semibold">₹{totalPrice}</p>
          <p className="text-sm text-gray-600 text-center">
            Scan this QR code with any UPI app to complete payment
          </p>
          <Button 
            onClick={onPaymentSuccess}
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl w-full"
          >
            Payment Completed
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
