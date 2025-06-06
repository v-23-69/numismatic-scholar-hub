
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Upload, X, Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { supabase } from '@/integrations/supabase/client';

interface ListCoinModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ListCoinModal = ({ open, onOpenChange }: ListCoinModalProps) => {
  const { user } = useSupabaseAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mint_date: '',
    region: '',
    value: '',
    rarity: '',
    metal: '',
    dynasty: '',
    ruler: '',
    condition: '',
    stock_quantity: '1'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to list a coin",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('coin_listings')
        .insert({
          ...formData,
          value: parseFloat(formData.value),
          stock_quantity: parseInt(formData.stock_quantity),
          images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&auto=format&fit=crop&q=80'],
          seller_id: user.id,
          verified: false
        });

      if (error) throw error;

      toast({
        title: "Coin listed successfully!",
        description: "Your coin has been added to the marketplace",
        className: "bg-green-50 border-green-200 text-green-800"
      });

      onOpenChange(false);
      setFormData({
        title: '',
        description: '',
        mint_date: '',
        region: '',
        value: '',
        rarity: '',
        metal: '',
        dynasty: '',
        ruler: '',
        condition: '',
        stock_quantity: '1'
      });
      setImages([]);
    } catch (error) {
      console.error('Error listing coin:', error);
      toast({
        title: "Error",
        description: "Failed to list your coin. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addImageUrl = () => {
    const url = prompt('Enter image URL:');
    if (url && url.trim()) {
      setImages(prev => [...prev, url.trim()]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-royal/20 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-royal">List Your Coin</DialogTitle>
          <DialogDescription>
            Add your coin to the CoinGlobe marketplace and reach collectors worldwide.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Coin Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Ancient Roman Denarius"
                required
                className="border-royal/30 focus:border-royal"
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Detailed description of your coin..."
                rows={3}
                required
                className="border-royal/30 focus:border-royal"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="value">Price (₹) *</Label>
                <Input
                  id="value"
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                  placeholder="5000"
                  required
                  min="1"
                  className="border-royal/30 focus:border-royal"
                />
              </div>
              <div>
                <Label htmlFor="stock_quantity">Stock Quantity *</Label>
                <Input
                  id="stock_quantity"
                  type="number"
                  value={formData.stock_quantity}
                  onChange={(e) => setFormData(prev => ({ ...prev, stock_quantity: e.target.value }))}
                  placeholder="1"
                  required
                  min="1"
                  className="border-royal/30 focus:border-royal"
                />
              </div>
            </div>
          </div>

          {/* Coin Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dynasty">Dynasty/Period</Label>
                <Select value={formData.dynasty} onValueChange={(value) => setFormData(prev => ({ ...prev, dynasty: value }))}>
                  <SelectTrigger className="border-royal/30 focus:border-royal">
                    <SelectValue placeholder="Select dynasty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ancient India">Ancient India</SelectItem>
                    <SelectItem value="Mughal India">Mughal India</SelectItem>
                    <SelectItem value="British India">British India</SelectItem>
                    <SelectItem value="Republic India">Republic India</SelectItem>
                    <SelectItem value="Roman Empire">Roman Empire</SelectItem>
                    <SelectItem value="Byzantine Empire">Byzantine Empire</SelectItem>
                    <SelectItem value="Medieval Europe">Medieval Europe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="region">Region/Country</Label>
                <Input
                  id="region"
                  value={formData.region}
                  onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
                  placeholder="e.g., India, Rome, China"
                  className="border-royal/30 focus:border-royal"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="metal">Metal</Label>
                <Select value={formData.metal} onValueChange={(value) => setFormData(prev => ({ ...prev, metal: value }))}>
                  <SelectTrigger className="border-royal/30 focus:border-royal">
                    <SelectValue placeholder="Select metal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Gold">Gold</SelectItem>
                    <SelectItem value="Silver">Silver</SelectItem>
                    <SelectItem value="Copper">Copper</SelectItem>
                    <SelectItem value="Bronze">Bronze</SelectItem>
                    <SelectItem value="Nickel">Nickel</SelectItem>
                    <SelectItem value="Brass">Brass</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="rarity">Rarity</Label>
                <Select value={formData.rarity} onValueChange={(value) => setFormData(prev => ({ ...prev, rarity: value }))}>
                  <SelectTrigger className="border-royal/30 focus:border-royal">
                    <SelectValue placeholder="Select rarity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Common">Common</SelectItem>
                    <SelectItem value="Uncommon">Uncommon</SelectItem>
                    <SelectItem value="Rare">Rare</SelectItem>
                    <SelectItem value="Very Rare">Very Rare</SelectItem>
                    <SelectItem value="Extremely Rare">Extremely Rare</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="condition">Condition</Label>
                <Select value={formData.condition} onValueChange={(value) => setFormData(prev => ({ ...prev, condition: value }))}>
                  <SelectTrigger className="border-royal/30 focus:border-royal">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mint">Mint</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Fair">Fair</SelectItem>
                    <SelectItem value="Poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="mint_date">Mint Date/Year</Label>
                <Input
                  id="mint_date"
                  value={formData.mint_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, mint_date: e.target.value }))}
                  placeholder="e.g., 1857, 2nd Century AD"
                  className="border-royal/30 focus:border-royal"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="ruler">Ruler/Authority</Label>
              <Input
                id="ruler"
                value={formData.ruler}
                onChange={(e) => setFormData(prev => ({ ...prev, ruler: e.target.value }))}
                placeholder="e.g., Queen Victoria, Akbar, Marcus Aurelius"
                className="border-royal/30 focus:border-royal"
              />
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <Label>Coin Images</Label>
            <div className="grid grid-cols-3 gap-4">
              {images.map((url, index) => (
                <div key={index} className="relative">
                  <img src={url} alt={`Coin ${index + 1}`} className="w-full h-24 object-cover rounded-lg border" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addImageUrl}
                className="h-24 border-2 border-dashed border-royal/30 rounded-lg flex items-center justify-center hover:border-royal transition-colors"
              >
                <Plus className="h-6 w-6 text-royal" />
              </button>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-royal text-royal hover:bg-royal hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-royal hover:bg-royal-light text-white"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              {loading ? 'Listing...' : 'List Coin'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
