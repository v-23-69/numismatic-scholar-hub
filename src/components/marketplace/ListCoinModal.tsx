
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Upload, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  region: z.string().min(1, 'Region is required'),
  rarity: z.string().min(1, 'Rarity is required'),
  mint_date: z.string().optional(),
  metal: z.string().optional(),
  condition: z.string().optional(),
  dynasty: z.string().optional(),
});

interface ListCoinModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ListCoinModal = ({ open, onOpenChange }: ListCoinModalProps) => {
  const { user } = useSupabaseAuth();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      price: 0,
      description: '',
      category: '',
      region: '',
      rarity: '',
      mint_date: '',
      metal: '',
      condition: '',
      dynasty: '',
    },
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !user) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `coin-images/${user.id}/${fileName}`;

        const { data, error } = await supabase.storage
          .from('coin-images')
          .upload(filePath, file);

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from('coin-images')
          .getPublicUrl(filePath);

        uploadedUrls.push(publicUrl);
      }

      setUploadedImages(prev => [...prev, ...uploadedUrls]);
      toast({
        title: "Images uploaded successfully",
        description: `${uploadedUrls.length} image(s) uploaded`,
        className: "bg-green-50 border-green-200 text-green-800"
      });
    } catch (error) {
      console.error('Error uploading images:', error);
      toast({
        title: "Upload Error",
        description: "Failed to upload images. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to list a coin.",
        variant: "destructive"
      });
      return;
    }

    if (uploadedImages.length === 0) {
      toast({
        title: "Images Required",
        description: "Please upload at least one image of your coin.",
        variant: "destructive"
      });
      return;
    }

    try {
      setSubmitting(true);
      
      const { error } = await supabase
        .from('coin_listings')
        .insert({
          title: values.title,
          description: values.description,
          value: values.price,
          images: uploadedImages,
          category: values.category,
          region: values.region,
          rarity: values.rarity,
          mint_date: values.mint_date || null,
          metal: values.metal || null,
          condition: values.condition || null,
          dynasty: values.dynasty || null,
          seller_id: user.id,
          verified: false,
          stock_quantity: 1,
        });

      if (error) throw error;

      toast({
        title: "Coin Listed Successfully!",
        description: "Your coin has been added to the marketplace.",
        className: "bg-green-50 border-green-200 text-green-800"
      });

      form.reset();
      setUploadedImages([]);
      onOpenChange(false);
      
      // Refresh the page to show the new listing
      window.location.reload();
    } catch (error) {
      console.error('Error listing coin:', error);
      toast({
        title: "Listing Error",
        description: "Failed to list your coin. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white z-[100] border border-royal/20 shadow-2xl">
        <DialogHeader className="sticky top-0 bg-white border-b pb-4 mb-6 z-10">
          <DialogTitle className="text-2xl font-bold text-royal">List Your Coin</DialogTitle>
          <DialogDescription className="text-gray-600">
            Add your coin to the marketplace for other collectors to discover and purchase.
          </DialogDescription>
        </DialogHeader>

        <div className="px-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Image Upload Section */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Coin Images *</label>
                <div className="border-2 border-dashed border-royal/30 rounded-lg p-8 text-center bg-royal/5">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                    disabled={uploading}
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-royal mb-4" />
                    <p className="text-royal font-medium">
                      {uploading ? 'Uploading images...' : 'Click to upload coin images from your device'}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB each</p>
                  </label>
                </div>

                {/* Preview uploaded images */}
                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {uploadedImages.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`Coin ${index + 1}`}
                          className="w-full h-32 object-cover rounded border border-royal/20"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-royal font-medium">Title *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., 1921 Morgan Silver Dollar" 
                          className="border-royal/30 focus:border-royal focus:ring-royal/20"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-royal font-medium">Price (₹) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="border-royal/30 focus:border-royal focus:ring-royal/20"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-royal font-medium">Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your coin's condition, history, and unique features..."
                        className="min-h-[120px] border-royal/30 focus:border-royal focus:ring-royal/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-royal font-medium">Category *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-royal/30 focus:border-royal focus:ring-royal/20">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="z-[200] bg-white border border-gray-200 shadow-lg">
                          <SelectItem value="Ancient India">Ancient India</SelectItem>
                          <SelectItem value="Mughal India">Mughal India</SelectItem>
                          <SelectItem value="British India">British India</SelectItem>
                          <SelectItem value="Republic India">Republic India</SelectItem>
                          <SelectItem value="World Coins">World Coins</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-royal font-medium">Region *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-royal/30 focus:border-royal focus:ring-royal/20">
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="z-[200] bg-white border border-gray-200 shadow-lg">
                          <SelectItem value="India">India</SelectItem>
                          <SelectItem value="United States">United States</SelectItem>
                          <SelectItem value="Europe">Europe</SelectItem>
                          <SelectItem value="China">China</SelectItem>
                          <SelectItem value="Roman Empire">Roman Empire</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rarity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-royal font-medium">Rarity *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-royal/30 focus:border-royal focus:ring-royal/20">
                            <SelectValue placeholder="Select rarity" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="z-[200] bg-white border border-gray-200 shadow-lg">
                          <SelectItem value="Common">Common</SelectItem>
                          <SelectItem value="Uncommon">Uncommon</SelectItem>
                          <SelectItem value="Rare">Rare</SelectItem>
                          <SelectItem value="Very Rare">Very Rare</SelectItem>
                          <SelectItem value="Extremely Rare">Extremely Rare</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="metal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-royal font-medium">Metal</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Gold, Silver, Copper"
                          className="border-royal/30 focus:border-royal focus:ring-royal/20"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-royal font-medium">Condition</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-royal/30 focus:border-royal focus:ring-royal/20">
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="z-[200] bg-white border border-gray-200 shadow-lg">
                          <SelectItem value="Mint">Mint</SelectItem>
                          <SelectItem value="Excellent">Excellent</SelectItem>
                          <SelectItem value="Very Fine">Very Fine</SelectItem>
                          <SelectItem value="Fine">Fine</SelectItem>
                          <SelectItem value="Good">Good</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dynasty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-royal font-medium">Dynasty/Ruler</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Akbar, Shah Jahan"
                          className="border-royal/30 focus:border-royal focus:ring-royal/20"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="mint_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-royal font-medium">Mint Date</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., 1658 AD, 1800-1850, Ancient"
                        className="border-royal/30 focus:border-royal focus:ring-royal/20"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={submitting}
                  className="border-royal text-royal hover:bg-royal/10"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-royal hover:bg-royal-light text-white px-8"
                  disabled={uploading || submitting}
                >
                  {submitting ? (
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
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
