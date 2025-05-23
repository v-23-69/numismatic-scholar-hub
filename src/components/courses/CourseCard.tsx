import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Heart, BookOpen } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ConfigContext } from "@/App";

export interface Course {
  id: string | number;
  title: string;
  instructor: string;
  rating: number;
  numReviews: number;
  price: number;
  image: string;
  category: string;
  level: string;
  duration: string;
  description: string;
  isFree?: boolean;
}

export default function CourseCard({ course }: { course: Course }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { supabaseClient, supabaseConfigured } = useContext(ConfigContext);
  
  // Check if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Check if course is already enrolled
  const isEnrolled = () => {
    try {
      const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
      return enrolledCourses.some((c: any) => c.id.toString() === course.id.toString());
    } catch {
      return false;
    }
  };
  
  const handleWishlist = () => {
    if (isInWishlist(course.id)) {
      removeFromWishlist(course.id);
    } else {
      addToWishlist({
        id: course.id,
        type: 'course' as any,  // Type assertion to avoid type error
        title: course.title,
        price: course.price,
        image: course.image,
      });
    }
  };
  
  const enrollInCourse = () => {
    if (course.isFree) {
      // Handle free course enrollment
      processFreeEnrollment();
    } else {
      // Open payment modal for paid courses
      setIsPaymentModalOpen(true);
    }
  };
  
  const processFreeEnrollment = () => {
    try {
      // Save to enrolled courses in localStorage
      const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
      
      if (!enrolledCourses.some((c: any) => c.id.toString() === course.id.toString())) {
        enrolledCourses.push({
          id: course.id,
          title: course.title,
          thumbnailUrl: course.image,
          price: course.price,
          enrolledAt: new Date().toISOString(),
          description: course.description,
        });
        
        localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
      }
      
      toast({
        title: "Enrolled Successfully",
        description: `You have been enrolled in ${course.title}`,
      });
      
      navigate("/enrolled-courses");
    } catch (error) {
      console.error("Error enrolling in course:", error);
      toast({
        title: "Enrollment Failed",
        description: "There was an error enrolling in this course",
        variant: "destructive",
      });
    }
  };
  
  const processPayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      try {
        // Save to enrolled courses in localStorage
        const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
        
        if (!enrolledCourses.some((c: any) => c.id.toString() === course.id.toString())) {
          enrolledCourses.push({
            id: course.id,
            title: course.title,
            thumbnailUrl: course.image,
            price: course.price,
            enrolledAt: new Date().toISOString(),
            description: course.description,
          });
          
          localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
        }
        
        // Also save to purchases
        const purchases = JSON.parse(localStorage.getItem("purchases") || "[]");
        purchases.push({
          id: Date.now().toString(),
          productId: course.id,
          type: "course",
          title: course.title,
          price: course.price,
          purchaseDate: new Date().toISOString(),
          image: course.image,
        });
        
        localStorage.setItem("purchases", JSON.stringify(purchases));
        
        setIsProcessing(false);
        setIsPaymentModalOpen(false);
        
        toast({
          title: "Payment Successful",
          description: `You have been enrolled in ${course.title}`,
        });
        
        navigate("/enrolled-courses");
      } catch (error) {
        console.error("Error processing payment:", error);
        setIsProcessing(false);
        toast({
          title: "Payment Failed",
          description: "There was an error processing your payment",
          variant: "destructive",
        });
      }
    }, 2000);
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
        <Link to={`/courses/${course.id}`} className="overflow-hidden">
          <div className="h-48 overflow-hidden">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
            />
          </div>
        </Link>
        <CardHeader className="pb-3 pt-4">
          <div className="flex justify-between items-start">
            <Link to={`/courses/${course.id}`}>
              <h3 className="font-bold text-lg text-royal hover:text-blue-700 transition-colors line-clamp-2">
                {course.title}
              </h3>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-pink-50 hover:text-pink-500"
              onClick={handleWishlist}
            >
              <Heart
                className={`h-5 w-5 ${
                  isInWishlist(course.id) ? "fill-pink-500 text-pink-500" : ""
                }`}
              />
            </Button>
          </div>
          <div className="text-gray-500 text-sm mt-1">
            By {course.instructor}
          </div>
        </CardHeader>
        <CardContent className="pb-4 flex-grow">
          <div className="flex items-center mb-2">
            <div className="flex items-center mr-2">
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <Star
                    key={index}
                    size={14}
                    className={`${
                      index < Math.floor(course.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
            </div>
            <span className="text-sm text-gray-600">
              {course.rating} ({course.numReviews} reviews)
            </span>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {course.category}
            </span>
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
              {course.level}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            <span className="flex items-center">
              <BookOpen className="h-3 w-3 mr-1" />
              {course.duration}
            </span>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-between items-center">
          <div className="font-bold text-lg">
            {course.isFree ? (
              <span className="text-green-600">Free</span>
            ) : (
              <span>₹{course.price}</span>
            )}
          </div>
          {isEnrolled() ? (
            <Button asChild>
              <Link to="/enrolled-courses">Continue Learning</Link>
            </Button>
          ) : (
            <Button 
              onClick={enrollInCourse}
              className="bg-royal hover:bg-blue-700 text-white"
            >
              {course.isFree ? "Enroll Now" : "Buy Now"}
            </Button>
          )}
        </CardFooter>
      </Card>
      
      {/* Payment Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
            <DialogDescription>
              Enter your payment details to enroll in "{course.title}"
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="border rounded-md p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">{course.title}</span>
                <span className="font-bold">₹{course.price}</span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold">₹{course.price}</span>
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
              onClick={() => setIsPaymentModalOpen(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              className="bg-royal hover:bg-blue-700 text-white"
              onClick={processPayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </>
              ) : (
                `Pay ₹${course.price}`
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
