
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from 'lucide-react';

interface UserDetailsStepProps {
  formData: {
    coin_name: string;
    phone: string;
  };
  errors: Record<string, string>;
  onFormDataChange: (data: Partial<{ coin_name: string; phone: string }>) => void;
  onNext: () => void;
}

const UserDetailsStep: React.FC<UserDetailsStepProps> = ({
  formData,
  errors,
  onFormDataChange,
  onNext
}) => {
  return (
    <Card className="border-2 border-blue-100 rounded-xl">
      <CardHeader>
        <CardTitle className="text-royal">Your Details</CardTitle>
        <CardDescription>
          Please provide your basic information for verification updates.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="coin_name">Full Name *</Label>
            <Input 
              id="coin_name" 
              placeholder="Enter your full name" 
              value={formData.coin_name}
              onChange={(e) => onFormDataChange({ coin_name: e.target.value })}
              className={`rounded-xl ${errors.coin_name ? 'border-red-500' : ''}`}
              required 
            />
            {errors.coin_name && (
              <p className="text-red-500 text-sm flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.coin_name}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number (10 digits) *</Label>
            <Input 
              id="phone" 
              placeholder="9876543210" 
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                onFormDataChange({ phone: value });
              }}
              className={`rounded-xl ${errors.phone ? 'border-red-500' : ''}`}
              maxLength={10}
              required 
            />
            {errors.phone && (
              <p className="text-red-500 text-sm flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.phone}
              </p>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          onClick={onNext}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
        >
          Continue to Upload
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserDetailsStep;
