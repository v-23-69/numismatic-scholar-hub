
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react';

interface AgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewLiveSupport: () => void;
}

const AgentModal: React.FC<AgentModalProps> = ({
  isOpen,
  onClose,
  onViewLiveSupport
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-royal">Live Agent Support</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 p-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-royal">Our expert is now ready to guide you!</h3>
          <p className="text-center text-gray-600">
            Your coin verification is in progress. Our numismatic expert will analyze your submission and provide detailed insights.
          </p>
          <div className="w-full bg-blue-50 p-4 rounded-xl">
            <h4 className="font-semibold text-blue-800 mb-2">What happens next:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Expert analysis begins immediately</li>
              <li>• You'll receive updates via phone/SMS</li>
              <li>• Detailed report ready within 24-48 hours</li>
              <li>• Live chat support available</li>
            </ul>
          </div>
          <div className="flex space-x-3 w-full">
            <Button 
              onClick={onViewLiveSupport}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >
              View Live Support
            </Button>
            <Button 
              onClick={onClose}
              variant="outline"
              className="flex-1 rounded-xl"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgentModal;
