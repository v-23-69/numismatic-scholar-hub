<<<<<<< HEAD
=======

>>>>>>> 813d0fd0065b6f839cbd5b9921e4616d9d2a780c
import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  coin: {
    id: number;
    title: string;
    value: string;
    image: string;
  };
  onSuccess: () => void;
}

const PaymentModal = ({ open, onClose, coin, onSuccess }: PaymentModalProps) => {
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();
  
  const handlePayment = () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      
      // Save purchase to localStorage for persistence
      const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
      purchases.push({
        id: coin.id,
        title: coin.title,
        image: coin.image,
        type: 'coin',
        purchaseDate: new Date().toISOString()
      });
      localStorage.setItem('purchases', JSON.stringify(purchases));
      
      toast({
        title: "Purchase Successful!",
        description: `You've successfully purchased ${coin.title}`,
        variant: "default",
      });
      
      onSuccess();
      onClose();
    }, 2000);
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-royal">Confirm Purchase</DialogTitle>
          <DialogDescription>
            You are about to purchase the following coin:
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center space-x-4 py-4">
          <div className="h-16 w-16 rounded-md overflow-hidden">
            <img 
              src={coin.image} 
              alt={coin.title} 
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold">{coin.title}</h3>
            <p className="text-lg text-royal font-bold">₹{coin.value}</p>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-md p-4 border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Price:</span>
            <span>₹{coin.value}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Transaction Fee:</span>
            <span>₹0.00</span>
          </div>
          <div className="border-t pt-2 mt-2 flex items-center justify-between font-bold">
            <span>Total:</span>
            <span>₹{coin.value}</span>
          </div>
        </div>
        
        <div className="bg-blue-50 text-blue-700 p-3 rounded-md text-sm flex items-start">
          <div className="mr-2 mt-0.5">
            <Check className="h-4 w-4" />
          </div>
          <div>
            Satisfaction guaranteed! If you're not satisfied with your purchase, 
            contact our support team within 7 days for a full refund.
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="sm:w-auto w-full">
            Cancel
          </Button>
          <Button 
            onClick={handlePayment} 
            className="bg-royal hover:bg-royal-light text-white sm:w-auto w-full"
            disabled={processing}
          >
            {processing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : `Pay ₹${coin.value}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

<<<<<<< HEAD
export default PaymentModal; 
=======
export default PaymentModal;
>>>>>>> 813d0fd0065b6f839cbd5b9921e4616d9d2a780c
