
import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload, AlertCircle } from 'lucide-react';

interface CoinUploadBlockProps {
  coinNumber: number;
  isFreeBonus?: boolean;
  frontImage?: File;
  backImage?: File;
  errors: Record<string, string>;
  onFileUpload: (file: File | undefined, coinNumber: number, side: 'front' | 'back') => void;
}

const CoinUploadBlock: React.FC<CoinUploadBlockProps> = ({
  coinNumber,
  isFreeBonus = false,
  frontImage,
  backImage,
  errors,
  onFileUpload
}) => {
  return (
    <div className={`mb-6 p-4 border rounded-xl ${isFreeBonus ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}>
      {isFreeBonus && (
        <div className="text-center mb-3">
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            🎁 FREE BONUS COIN
          </span>
        </div>
      )}
      <h4 className="font-semibold text-gray-700 mb-3">Coin {coinNumber}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Front Side */}
        <div className={`border-2 border-dashed ${errors[`coin${coinNumber}Front`] ? 'border-red-300' : 'border-gray-300'} rounded-xl p-6 flex flex-col items-center justify-center hover:border-blue-400 transition-colors`}>
          <Upload className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 text-center mb-3">
            <strong>Coin {coinNumber} - Front Side</strong>
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onFileUpload(e.target.files?.[0], coinNumber, 'front')}
            className="hidden"
            id={`coin${coinNumber}-front-upload`}
          />
          <Button 
            variant="outline" 
            size="sm" 
            className="border-royal text-royal hover:bg-blue-50 rounded-xl"
            onClick={() => document.getElementById(`coin${coinNumber}-front-upload`)?.click()}
          >
            Select Image
          </Button>
          {frontImage && (
            <p className="text-sm text-green-600 mt-2">✓ Image selected</p>
          )}
          {errors[`coin${coinNumber}Front`] && (
            <p className="text-red-500 text-xs mt-2 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              {errors[`coin${coinNumber}Front`]}
            </p>
          )}
        </div>

        {/* Back Side */}
        <div className={`border-2 border-dashed ${errors[`coin${coinNumber}Back`] ? 'border-red-300' : 'border-gray-300'} rounded-xl p-6 flex flex-col items-center justify-center hover:border-blue-400 transition-colors`}>
          <Upload className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 text-center mb-3">
            <strong>Coin {coinNumber} - Back Side</strong>
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onFileUpload(e.target.files?.[0], coinNumber, 'back')}
            className="hidden"
            id={`coin${coinNumber}-back-upload`}
          />
          <Button 
            variant="outline" 
            size="sm" 
            className="border-royal text-royal hover:bg-blue-50 rounded-xl"
            onClick={() => document.getElementById(`coin${coinNumber}-back-upload`)?.click()}
          >
            Select Image
          </Button>
          {backImage && (
            <p className="text-sm text-green-600 mt-2">✓ Image selected</p>
          )}
          {errors[`coin${coinNumber}Back`] && (
            <p className="text-red-500 text-xs mt-2 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              {errors[`coin${coinNumber}Back`]}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinUploadBlock;
