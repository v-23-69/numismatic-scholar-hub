import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    instructor: string;
    instructorTitle: string;
    level: string;
    duration: string;
    rating: number;
    reviews: number;
    price: number;
    category: string;
    featured: boolean;
    image: string;
  };
  index: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, index }) => {
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    // Get current cart from localStorage
    const existingCart = localStorage.getItem('cart');
    const cart = existingCart ? JSON.parse(existingCart) : [];
    
    // Check if course is already in cart
    if (cart.some((item: any) => item.id === course.id)) {
      toast({
        title: "Already in Cart",
        description: `${course.title} is already in your cart.`,
      });
      return;
    }
    
    // Add course to cart
    const updatedCart = [...cart, course];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    toast({
      title: "Added to Cart",
      description: `${course.title} has been added to your cart.`,
    });
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="royal-card overflow-hidden group"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {course.featured && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-gold text-royal-dark hover:bg-gold-light">
              EXPERT PICK
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
          <Clock className="h-4 w-4" />
          <span>{course.duration}</span>
          <span className="mx-2">•</span>
          <BookOpen className="h-4 w-4" />
          <span>{course.level}</span>
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-royal group-hover:text-gold transition-colors">
          {course.title}
        </h3>
        
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-royal rounded-full flex items-center justify-center text-white text-xs mr-3">
            {course.instructor.split(' ').map(name => name[0]).join('')}
          </div>
          <div>
            <p className="font-medium text-gray-800">{course.instructor}</p>
            <p className="text-sm text-gray-600">{course.instructorTitle}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-gold fill-gold" />
            <span className="ml-1 font-medium">{course.rating}</span>
            <span className="ml-1 text-sm text-gray-600">({course.reviews})</span>
          </div>
          <div className="text-lg font-bold text-royal">
            ₹{course.price.toLocaleString()}
          </div>
        </div>
        
        <div className="flex mt-4 space-x-2">
          <Button 
            variant="outline" 
            className="flex-grow flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors"
            onClick={handleAddToCart}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="mr-2"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Add to Cart
          </Button>
          <Link to={`/courses/${course.id}`} className="flex-grow">
            <Button className="w-full bg-royal hover:bg-blue-600 transition-colors text-white">
              View Course
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard; 