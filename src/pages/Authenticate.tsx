
import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Camera, Check, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Authenticate = () => {
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, side: 'front' | 'back') => {
    if (e.target.files && e.target.files[0]) {
      if (side === 'front') {
        setFrontImage(e.target.files[0]);
      } else {
        setBackImage(e.target.files[0]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // In a real implementation, you would handle the upload and payment processing here
      console.log("Form submitted:", { frontImage, backImage });
      alert("Authentication request submitted successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-royal font-playfair mb-6 text-center">
                Upload Your Coin for Authentication
              </h1>
              <p className="text-lg text-gray-600 mb-8 text-center">
                Our experts will analyze your coin and provide detailed authentication and valuation information.
              </p>

              <Card className="border-gold/20 mb-8">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6 p-4 bg-gold/10 rounded-md">
                    <div className="text-gold">
                      <Check size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-royal">Fast & Reliable</h3>
                      <p className="text-sm text-gray-600">
                        Upload your coin photos, pay ₹20, and receive expert analysis within 24 hours
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Front side image upload */}
                      <div>
                        <Label htmlFor="front-image" className="block mb-2">
                          Front Side Image <span className="text-red-500">*</span>
                        </Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                          {frontImage ? (
                            <div className="text-center">
                              <div className="relative mx-auto w-32 h-32 mb-2">
                                <Image className="mx-auto text-gray-400" />
                                <div className="absolute inset-0 flex items-center justify-center bg-royal/10 rounded-md">
                                  <Check className="h-8 w-8 text-royal" />
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 truncate">
                                {frontImage.name}
                              </p>
                              <button 
                                type="button"
                                className="mt-2 text-sm text-red-500 hover:underline"
                                onClick={() => setFrontImage(null)}
                              >
                                Remove
                              </button>
                            </div>
                          ) : (
                            <label htmlFor="front-image" className="cursor-pointer">
                              <div className="flex flex-col items-center justify-center py-4">
                                <Camera className="h-10 w-10 text-gray-400 mb-2" />
                                <p className="text-sm font-medium text-royal">
                                  Click to upload front image
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  PNG, JPG up to 5MB
                                </p>
                              </div>
                              <input
                                id="front-image"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageChange(e, 'front')}
                                required
                              />
                            </label>
                          )}
                        </div>
                      </div>

                      {/* Back side image upload */}
                      <div>
                        <Label htmlFor="back-image" className="block mb-2">
                          Back Side Image <span className="text-red-500">*</span>
                        </Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                          {backImage ? (
                            <div className="text-center">
                              <div className="relative mx-auto w-32 h-32 mb-2">
                                <Image className="mx-auto text-gray-400" />
                                <div className="absolute inset-0 flex items-center justify-center bg-royal/10 rounded-md">
                                  <Check className="h-8 w-8 text-royal" />
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 truncate">
                                {backImage.name}
                              </p>
                              <button 
                                type="button"
                                className="mt-2 text-sm text-red-500 hover:underline"
                                onClick={() => setBackImage(null)}
                              >
                                Remove
                              </button>
                            </div>
                          ) : (
                            <label htmlFor="back-image" className="cursor-pointer">
                              <div className="flex flex-col items-center justify-center py-4">
                                <Camera className="h-10 w-10 text-gray-400 mb-2" />
                                <p className="text-sm font-medium text-royal">
                                  Click to upload back image
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  PNG, JPG up to 5MB
                                </p>
                              </div>
                              <input
                                id="back-image"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageChange(e, 'back')}
                                required
                              />
                            </label>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="notes" className="block mb-2">
                        Additional Notes (Optional)
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="Provide any additional information about the coin that might help with authentication..."
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="bg-royal/5 p-4 rounded-md">
                      <h3 className="font-medium text-royal mb-2">Fee: ₹20 per coin</h3>
                      <p className="text-sm text-gray-600 mb-0">
                        Payment will be processed securely after submission.
                      </p>
                    </div>

                    <div className="text-center">
                      <Button
                        type="submit"
                        className="bg-gold hover:bg-gold-light text-royal font-medium px-8 py-6 text-lg"
                        disabled={!frontImage || !backImage || isSubmitting}
                      >
                        {isSubmitting ? (
                          <>Processing...</>
                        ) : (
                          <>
                            <Upload className="mr-2" size={18} />
                            Submit for Authentication
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <div className="bg-royal/5 p-6 rounded-lg border border-royal/10">
                <h3 className="font-bold text-royal mb-4 font-playfair text-xl">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-royal">How long does authentication take?</h4>
                    <p className="text-gray-600">
                      Our experts typically complete authentication within 24 hours of receiving your submission.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-royal">What if my coin is determined to be inauthentic?</h4>
                    <p className="text-gray-600">
                      You'll still receive a detailed report explaining the findings. This information can be valuable for educational purposes.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-royal">Can I authenticate multiple coins at once?</h4>
                    <p className="text-gray-600">
                      Yes, you can submit multiple coins. Each coin requires separate images and a fee of ₹20 per coin.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Authenticate;
