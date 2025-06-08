
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { supabase } from '@/integrations/supabase/client';

interface ListCoinModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CoinFormData {
  title: string;
  description: string;
  value: number;
  category?: string;
  region: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Extremely Rare';
  mint_date?: string;
  metal?: string;
  condition?: string;
  dynasty?: string;
  stock_quantity: number;
}

export const ListCoinModal: React.FC<ListCoinModalProps> = ({ open, onOpenChange }) => {
  const { user } = useSupabaseAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  
  const [formData, setFormData] = useState<CoinFormData>({
    title: '',
    description: '',
    value: 0,
    category: undefined,
    region: '',
    rarity: 'Common',
    mint_date: '',
    metal: '',
    condition: '',
    dynasty: '',
    stock_quantity: 1
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      console.log('Uploading to coin-images bucket:', filePath);

      const { error: uploadError } = await supabase.storage
        .from('coin-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('coin-images')
        .getPublicUrl(filePath);

      console.log('Image uploaded successfully:', data.publicUrl);
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to list a coin",
        variant: "destructive"
      });
      return;
    }

    if (!formData.title || !formData.description || !formData.value) {
      toast({
        title: "Missing Information",
        description: "Please fill in title, description, and price",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      
      let imageUrl = '';
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      console.log('Inserting coin listing with data:', {
        title: formData.title,
        description: formData.description,
        value: formData.value,
        images: imageUrl ? [imageUrl] : [],
        category: formData.category || null,
        region: formData.region || null,
        rarity: formData.rarity,
        mint_date: formData.mint_date || null,
        metal: formData.metal || null,
        condition: formData.condition || null,
        dynasty: formData.dynasty || null,
        seller_id: user.id,
        seller_name: user.user_metadata?.full_name || user.email || 'Anonymous',
        stock_quantity: formData.stock_quantity,
      });

      const { error } = await supabase
        .from('coin_listings')
        .insert({
          title: formData.title,
          description: formData.description,
          value: formData.value,
          images: imageUrl ? [imageUrl] : [],
          category: formData.category || null,
          region: formData.region || null,
          rarity: formData.rarity,
          mint_date: formData.mint_date || null,
          metal: formData.metal || null,
          condition: formData.condition || null,
          dynasty: formData.dynasty || null,
          seller_id: user.id,
          seller_name: user.user_metadata?.full_name || user.email || 'Anonymous',
          stock_quantity: formData.stock_quantity,
        });

      if (error) {
        console.error('Database insert error:', error);
        throw error;
      }
      
      toast({
        title: "Success!",
        description: "Your coin has been listed successfully",
        className: "bg-green-50 border-green-200 text-green-800"
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        value: 0,
        category: undefined,
        region: '',
        rarity: 'Common',
        mint_date: '',
        metal: '',
        condition: '',
        dynasty: '',
        stock_quantity: 1
      });
      setImageFile(null);
      setImagePreview('');
      onOpenChange(false);
      
      // Refresh the page to show new listing
      window.location.reload();
    } catch (error: any) {
      console.error('Error adding coin:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to list your coin. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white z-[60]">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold text-royal">List Your Coin</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">Coin Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Mughal Gold Mohur 1658"
                className="mt-1 h-11"
                required
              />
            </div>
            <div>
              <Label htmlFor="value" className="text-sm font-medium text-gray-700">Price (₹) *</Label>
              <Input
                id="value"
                type="number"
                value={formData.value || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, value: Number(e.target.value) || 0 }))}
                placeholder="25000"
                className="mt-1 h-11"
                min="0"
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Detailed description of the coin..."
              rows={4}
              className="mt-1"
              required
            />
          </div>
          
          {/* Image Upload */}
          <div>
            <Label className="text-sm font-medium text-gray-700">Coin Image</Label>
            <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6">
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview('');
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      <span className="bg-royal text-white px-4 py-2 rounded-lg hover:bg-royal-light transition-colors">
                        Choose Image
                      </span>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </Label>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Coin Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category" className="text-sm font-medium text-gray-700">Category</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="mt-1 h-11">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="z-[70] bg-white">
                  <SelectItem value="Ancient India">Ancient India</SelectItem>
                  <SelectItem value="Mughal India">Mughal India</SelectItem>
                  <SelectItem value="British India">British India</SelectItem>
                  <SelectItem value="Republic India">Republic India</SelectItem>
                  <SelectItem value="Ancient">Ancient</SelectItem>
                  <SelectItem value="Medieval">Medieval</SelectItem>
                  <SelectItem value="Modern">Modern</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="region" className="text-sm font-medium text-gray-700">Region/Country</Label>
              <Input
                id="region"
                value={formData.region}
                onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
                placeholder="e.g., Mughal Empire"
                className="mt-1 h-11"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="mint_date" className="text-sm font-medium text-gray-700">Mint Date/Year</Label>
              <Input
                id="mint_date"
                value={formData.mint_date}
                onChange={(e) => setFormData(prev => ({ ...prev, mint_date: e.target.value }))}
                placeholder="e.g., 1658 AD"
                className="mt-1 h-11"
              />
            </div>
            <div>
              <Label htmlFor="metal" className="text-sm font-medium text-gray-700">Metal</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, metal: value }))}>
                <SelectTrigger className="mt-1 h-11">
                  <SelectValue placeholder="Select metal" />
                </SelectTrigger>
                <SelectContent className="z-[70] bg-white">
                  <SelectItem value="Gold">Gold</SelectItem>
                  <SelectItem value="Silver">Silver</SelectItem>
                  <SelectItem value="Copper">Copper</SelectItem>
                  <SelectItem value="Bronze">Bronze</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dynasty" className="text-sm font-medium text-gray-700">Dynasty/Ruler (Optional)</Label>
              <Input
                id="dynasty"
                value={formData.dynasty}
                onChange={(e) => setFormData(prev => ({ ...prev, dynasty: e.target.value }))}
                placeholder="e.g., Akbar"
                className="mt-1 h-11"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="condition" className="text-sm font-medium text-gray-700">Condition</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, condition: value }))}>
                <SelectTrigger className="mt-1 h-11">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent className="z-[70] bg-white">
                  <SelectItem value="Mint">Mint</SelectItem>
                  <SelectItem value="Excellent">Excellent</SelectItem>
                  <SelectItem value="Very Fine">Very Fine</SelectItem>
                  <SelectItem value="Fine">Fine</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="rarity" className="text-sm font-medium text-gray-700">Rarity</Label>
              <Select 
                value={formData.rarity}
                onValueChange={(value: 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Extremely Rare') => 
                  setFormData(prev => ({ ...prev, rarity: value }))
                }
              >
                <SelectTrigger className="mt-1 h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-[70] bg-white">
                  <SelectItem value="Common">Common</SelectItem>
                  <SelectItem value="Uncommon">Uncommon</SelectItem>
                  <SelectItem value="Rare">Rare</SelectItem>
                  <SelectItem value="Very Rare">Very Rare</SelectItem>
                  <SelectItem value="Extremely Rare">Extremely Rare</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="stock" className="text-sm font-medium text-gray-700">Stock Quantity</Label>
              <Input
                id="stock_quantity"
                type="number"
                value={formData.stock_quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  setFormData(prev => ({ 
                    ...prev, 
                    stock_quantity: isNaN(value) ? 1 : Math.max(1, value)
                  }));
                }}
                min={1}
                className="mt-1 h-11"
              />
            </div>
          </div>
          
          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="border-royal text-royal hover:bg-blue-50"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-royal hover:bg-royal-light text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adding Listing...
                </>
              ) : (
                'Add Listing'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
