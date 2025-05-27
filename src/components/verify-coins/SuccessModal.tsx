
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckCircle } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-xl">
        <div className="flex flex-col items-center space-y-4 p-6">
          <CheckCircle className="h-16 w-16 text-green-600" />
          <h3 className="text-xl font-semibold text-green-800">Payment Successful!</h3>
          <p className="text-center text-gray-600">
            Connecting you to our expert team...
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
