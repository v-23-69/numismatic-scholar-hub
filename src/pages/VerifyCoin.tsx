
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ConfigContext } from "@/App";
import { useToast } from "@/components/ui/use-toast";
import { Coins, Upload, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const formSchema = z.object({
  coinName: z.string().min(3, "Coin name must be at least 3 characters"),
  coinYear: z.string().regex(/^\d+$/, "Year must be a number"),
  coinType: z.string().min(1, "Please select a coin type"),
  condition: z.string().min(1, "Please select a condition"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  imageUrl: z.string().url("Please enter a valid image URL"),
  verificationPackage: z.string().min(1, "Please select a verification package"),
});

type FormValues = z.infer<typeof formSchema>;

const VerifyCoin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { supabaseClient, supabaseConfigured } = useContext(ConfigContext);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // Get form with Zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coinName: "",
      coinYear: "",
      coinType: "",
      condition: "",
      description: "",
      imageUrl: "https://images.unsplash.com/photo-1605037287625-9303ban9a469?w=500",
      verificationPackage: "basic",
    },
  });
  
  const onSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsSubmitting(false);
      setShowPaymentModal(true);
    }, 1500);
  };
  
  const handlePayment = () => {
    setIsPaymentProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const formValues = form.getValues();
      
      // Save verification request to localStorage for demo purposes
      const existingRequests = JSON.parse(localStorage.getItem('verificationRequests') || '[]');
      const newRequest = {
        id: Date.now().toString(),
        userId: "current-user", // In real app, would get from auth
        coinName: formValues.coinName,
        coinYear: formValues.coinYear,
        coinType: formValues.coinType,
        condition: formValues.condition,
        description: formValues.description,
        image: formValues.imageUrl,
        package: formValues.verificationPackage,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      
      existingRequests.push(newRequest);
      localStorage.setItem('verificationRequests', JSON.stringify(existingRequests));
      
      setIsPaymentProcessing(false);
      setPaymentSuccess(true);
      
      // After showing success for a moment, navigate to dashboard
      setTimeout(() => {
        setShowPaymentModal(false);
        toast({
          title: "Verification Request Submitted",
          description: "Your coin has been submitted for verification",
        });
        navigate("/dashboard");
      }, 2000);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-royal mb-4">
                Coin Verification Service
              </h1>
              <p className="text-gray-600 max-w-xl mx-auto">
                Get your coins authenticated and valued by our team of numismatic
                experts.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-royal">Basic</CardTitle>
                  <CardDescription>Single coin verification</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold mb-1">₹20</p>
                  <p className="text-gray-500 text-sm">per coin</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>✓ Authentication</li>
                    <li>✓ Basic valuation</li>
                    <li>✓ Digital certificate</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-royal">
                <CardHeader className="pb-2 bg-royal text-white rounded-t-lg">
                  <CardTitle className="text-lg">Standard</CardTitle>
                  <CardDescription className="text-gray-100">
                    Best value for collectors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold mb-1">₹799</p>
                  <p className="text-gray-500 text-sm">for 50 coins</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>✓ Authentication</li>
                    <li>✓ Detailed valuation</li>
                    <li>✓ Digital certificate</li>
                    <li>✓ Condition grading</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-royal">Premium</CardTitle>
                  <CardDescription>For serious collectors</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold mb-1">₹1,499</p>
                  <p className="text-gray-500 text-sm">for 100 coins</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>✓ Authentication</li>
                    <li>✓ Expert valuation</li>
                    <li>✓ Physical certificate</li>
                    <li>✓ Professional grading</li>
                    <li>✓ Provenance research</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-royal">
                  <Coins className="h-5 w-5 mr-2" />
                  Submit Your Coin
                </CardTitle>
                <CardDescription>
                  Fill out the form below with details about your coin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="coinName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Coin Name/Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., 1854 Indian Head Gold Dollar"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="coinYear"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Year of Minting</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 1854" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="coinType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Coin Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select coin type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="ancient">Ancient</SelectItem>
                                <SelectItem value="medieval">Medieval</SelectItem>
                                <SelectItem value="modern">Modern</SelectItem>
                                <SelectItem value="commemorative">
                                  Commemorative
                                </SelectItem>
                                <SelectItem value="bullion">Bullion</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="condition"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Condition</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select condition" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="mint">Mint</SelectItem>
                                <SelectItem value="excellent">Excellent</SelectItem>
                                <SelectItem value="verygood">Very Good</SelectItem>
                                <SelectItem value="good">Good</SelectItem>
                                <SelectItem value="fair">Fair</SelectItem>
                                <SelectItem value="poor">Poor</SelectItem>
                              </SelectContent>
                            </Select>
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
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Provide any additional details about your coin..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Coin Image URL</FormLabel>
                          <FormControl>
                            <div className="flex space-x-2">
                              <Input
                                placeholder="https://example.com/coin.jpg"
                                {...field}
                              />
                              <Button variant="outline" type="button">
                                <Upload className="h-4 w-4 mr-2" />
                                Upload
                              </Button>
                            </div>
                          </FormControl>
                          <FormDescription>
                            Please provide clear images of both sides of the coin
                          </FormDescription>
                          <FormMessage />
                          {field.value && (
                            <div className="mt-2 w-32 h-32 border rounded-md overflow-hidden">
                              <img
                                src={field.value}
                                alt="Coin Preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </FormItem>
                      )}
                    />

                    <Separator />

                    <FormField
                      control={form.control}
                      name="verificationPackage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Verification Package</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-1 md:grid-cols-3 gap-4"
                            >
                              <FormItem className="flex items-center space-x-2 space-y-0 border rounded-md p-4">
                                <FormControl>
                                  <RadioGroupItem value="basic" />
                                </FormControl>
                                <div className="space-y-1">
                                  <FormLabel className="text-base">Basic</FormLabel>
                                  <p className="text-sm text-gray-500">
                                    ₹20 for single coin
                                  </p>
                                </div>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2 space-y-0 border border-royal rounded-md p-4 bg-blue-50">
                                <FormControl>
                                  <RadioGroupItem value="standard" />
                                </FormControl>
                                <div className="space-y-1">
                                  <FormLabel className="text-base">Standard</FormLabel>
                                  <p className="text-sm text-gray-500">
                                    ₹799 for 50 coins
                                  </p>
                                </div>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2 space-y-0 border rounded-md p-4">
                                <FormControl>
                                  <RadioGroupItem value="premium" />
                                </FormControl>
                                <div className="space-y-1">
                                  <FormLabel className="text-base">Premium</FormLabel>
                                  <p className="text-sm text-gray-500">
                                    ₹1,499 for 100 coins
                                  </p>
                                </div>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Alert className="bg-amber-50 border-amber-200">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <AlertTitle className="text-amber-800">Important</AlertTitle>
                      <AlertDescription className="text-amber-700">
                        Please ensure images clearly show both sides of the coin and any
                        special features or marks that may affect valuation.
                      </AlertDescription>
                    </Alert>

                    <Button
                      type="submit"
                      className="w-full bg-royal hover:bg-blue-700 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                        </>
                      ) : (
                        "Submit for Verification"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Payment Dialog */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{paymentSuccess ? "Payment Successful" : "Complete Payment"}</DialogTitle>
            <DialogDescription>
              {paymentSuccess
                ? "Your coin has been submitted for verification successfully."
                : "Please complete the payment to submit your coin for verification."}
            </DialogDescription>
          </DialogHeader>
          
          {paymentSuccess ? (
            <div className="flex flex-col items-center justify-center py-6">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-center text-gray-600 mb-2">
                Your verification request has been submitted.
              </p>
              <p className="text-center text-gray-600">
                You will be redirected to your dashboard.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Verification Fee</span>
                    <span className="font-bold">
                      {form.getValues().verificationPackage === "basic"
                        ? "₹20"
                        : form.getValues().verificationPackage === "standard"
                        ? "₹799"
                        : "₹1,499"}
                    </span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">
                      {form.getValues().verificationPackage === "basic"
                        ? "₹20"
                        : form.getValues().verificationPackage === "standard"
                        ? "₹799"
                        : "₹1,499"}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Card</span>
                    <div className="flex space-x-1">
                      <div className="w-8 h-5 rounded bg-gray-200"></div>
                      <div className="w-8 h-5 rounded bg-gray-200"></div>
                      <div className="w-8 h-5 rounded bg-gray-200"></div>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <Input placeholder="Card number" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="MM/YY" />
                    <Input placeholder="CVC" />
                  </div>
                </div>
              </div>
              
              <DialogFooter className="sm:justify-between">
                <Button
                  variant="outline"
                  onClick={() => setShowPaymentModal(false)}
                  disabled={isPaymentProcessing}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-royal hover:bg-blue-700 text-white"
                  onClick={handlePayment}
                  disabled={isPaymentProcessing}
                >
                  {isPaymentProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                    </>
                  ) : (
                    "Pay & Submit"
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default VerifyCoin;
