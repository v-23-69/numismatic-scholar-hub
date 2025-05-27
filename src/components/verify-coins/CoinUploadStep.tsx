
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Info, Plus, Minus } from 'lucide-react';
import CoinUploadBlock from './CoinUploadBlock';

interface CoinUploadStepProps {
  coinCount: number;
  formData: {
    description: string;
    coinImages: Record<number, { front?: File, back?: File }>;
  };
  errors: Record<string, string>;
  onCoinCountChange: (count: number) => void;
  onFormDataChange: (data: Partial<{ description: string }>) => void;
  onFileUpload: (file: File | undefined, coinNumber: number, side: 'front' | 'back') => void;
  onNext: () => void;
  onBack: () => void;
}

const CoinUploadStep: React.FC<CoinUploadStepProps> = ({
  coinCount,
  formData,
  errors,
  onCoinCountChange,
  onFormDataChange,
  onFileUpload,
  onNext,
  onBack
}) => {
  const basePrice = 20;
  const totalPrice = coinCount * basePrice;
  const hasFreeVerification = coinCount >= 5;
  const totalCoinsToUpload = hasFreeVerification ? coinCount + 1 : coinCount;

  const incrementCoinCount = () => {
    onCoinCountChange(Math.min(coinCount + 1, 6));
  };

  const decrementCoinCount = () => {
    onCoinCountChange(Math.max(1, coinCount - 1));
  };

  const renderCoinUploadBlocks = () => {
    const blocks = [];
    for (let i = 1; i <= totalCoinsToUpload; i++) {
      const isFreeBonus = i > coinCount;
      blocks.push(
        <CoinUploadBlock
          key={i}
          coinNumber={i}
          isFreeBonus={isFreeBonus}
          frontImage={formData.coinImages[i]?.front}
          backImage={formData.coinImages[i]?.back}
          errors={errors}
          onFileUpload={onFileUpload}
        />
      );
    }
    return blocks;
  };

  return (
    <Card className="border-2 border-blue-100 rounded-xl">
      <CardHeader>
        <CardTitle className="text-royal">Upload Your Coins</CardTitle>
        <CardDescription>
          Select how many coins you want to verify and upload clear photos of both sides.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Coin Count Selection */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h3 className="text-lg font-semibold text-royal mb-4">How many coins do you want to verify?</h3>
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={decrementCoinCount}
              disabled={coinCount <= 1}
              className="rounded-xl"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-2xl font-bold text-royal px-6">{coinCount}</span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={incrementCoinCount}
              disabled={coinCount >= 6}
              className="rounded-xl"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-royal">
              {coinCount} coin{coinCount > 1 ? 's' : ''} = ₹{totalPrice}
            </p>
            <p className="text-sm text-gray-600">₹20 per coin verification</p>
            {hasFreeVerification && (
              <div className="mt-3 p-3 bg-green-100 rounded-xl border border-green-200">
                <p className="text-sm font-medium text-green-800">
                  🎁 Special Offer: Get 1 coin verification FREE! (Total: {totalCoinsToUpload} coins)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Coin Upload Blocks */}
        <div className="space-y-4">
          {renderCoinUploadBlocks()}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">What would you like to know about your coin? (Optional)</Label>
          <Textarea 
            id="description" 
            placeholder="e.g., Is this coin authentic? What's its estimated value? What year is it from? Any specific details you want verified..."
            rows={3}
            value={formData.description}
            onChange={(e) => onFormDataChange({ description: e.target.value })}
            className="resize-none rounded-xl"
          />
        </div>
        
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <div className="flex items-start">
            <Info className="text-blue-600 mr-3 mt-1" size={20} />
            <div>
              <h4 className="text-sm font-medium text-blue-800">Photo Tips for Best Results</h4>
              <ul className="mt-2 text-sm text-blue-700 list-disc pl-5 space-y-1">
                <li>Use natural lighting without direct glare</li>
                <li>Place the coin against a neutral background</li>
                <li>Capture close-up shots that show details clearly</li>
                <li>Include any mint marks or special features</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="rounded-xl">
          Back
        </Button>
        <Button onClick={onNext} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
          Proceed to Payment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CoinUploadStep;
