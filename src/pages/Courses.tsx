import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Clock, ChevronRight, Filter, Search, SlidersHorizontal, ShoppingCart, ChevronLeft, ChevronDown, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ConfigContext } from "@/App";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth';
import { useCourses } from '@/hooks/useCourses';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

// Sample course data (in a real application, this would be fetched from Supabase)
const courses = [
  {
    id: 1,
    title: "Ancient Coin Authentication",
    instructor: "Dr. Eleanor Davies",
    instructorTitle: "Museum Curator & Historian",
    level: "Intermediate",
    duration: "6 weeks",
    rating: 4.9,
    reviews: 124,
    price: 2499,
    category: "Authentication",
    featured: true,
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc1b13a?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Modern Collectible Grading",
    instructor: "James Wilson",
    instructorTitle: "Master Grader & Collector",
    level: "All Levels",
    duration: "8 weeks",
    rating: 4.8,
    reviews: 97,
    price: 1999,
    category: "Grading",
    featured: true,
    image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "European Coinage History",
    instructor: "Professor Henry Dubois",
    instructorTitle: "History Department Head",
    level: "Beginner",
    duration: "10 weeks",
    rating: 4.7,
    reviews: 112,
    price: 2999,
    category: "History",
    featured: false,
    image: "https://images.unsplash.com/photo-1621786899979-53a042943b99?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    title: "Numismatic Photography",
    instructor: "Isabella Rossi",
    instructorTitle: "Professional Photographer",
    level: "Intermediate",
    duration: "4 weeks",
    rating: 4.6,
    reviews: 88,
    price: 1499,
    category: "Photography",
    featured: false,
    image: "https://images.unsplash.com/photo-1638987759999-bb37e1685452?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    title: "Investing in Rare Coins",
    instructor: "Charles Lee",
    instructorTitle: "Financial Advisor & Collector",
    level: "Advanced",
    duration: "12 weeks",
    rating: 4.9,
    reviews: 145,
    price: 3499,
    category: "Investment",
    featured: true,
    image: "https://images.unsplash.com/photo-1563783446488-a6e3b399c41a?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 6,
    title: "Cleaning and Preservation",
    instructor: "Sophia Nguyen",
    instructorTitle: "Conservation Specialist",
    level: "All Levels",
    duration: "6 weeks",
    rating: 4.5,
    reviews: 76,
    price: 1799,
    category: "Preservation",
    featured: false,
    image: "https://images.unsplash.com/photo-1623842345403-4e2c25899c46?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 7,
    title: "Ancient Greek Coinage",
    instructor: "Dr. Marcus Antonius",
    instructorTitle: "Classical Historian",
    level: "Intermediate",
    duration: "8 weeks",
    rating: 4.8,
    reviews: 102,
    price: 2799,
    category: "History",
    featured: false,
    image: "https://images.unsplash.com/photo-1574786540994-c9553a0149e3?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 8,
    title: "Error Coin Identification",
    instructor: "Emily Carter",
    instructorTitle: "Error Coin Specialist",
    level: "Advanced",
    duration: "10 weeks",
    rating: 4.7,
    reviews: 93,
    price: 2299,
    category: "Grading",
    featured: false,
    image: "https://plus.unsplash.com/premium_photo-1669643749457-d44a891c6b0f?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 9,
    title: "Digital Numismatics",
    instructor: "David Chen",
    instructorTitle: "Digital Asset Expert",
    level: "All Levels",
    duration: "4 weeks",
    rating: 4.6,
    reviews: 68,
    price: 1299,
    category: "Technology",
    featured: false,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 10,
    title: "World Banknote Collecting",
    instructor: "Aisha Khan",
    instructorTitle: "Banknote Collector",
    level: "Beginner",
    duration: "6 weeks",
    rating: 4.9,
    reviews: 132,
    price: 1999,
    category: "Collecting",
    featured: true,
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc1b13a?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 11,
    title: "Numismatic Law and Ethics",
    instructor: "Robert Hughes",
    instructorTitle: "Legal Consultant",
    level: "Advanced",
    duration: "8 weeks",
    rating: 4.8,
    reviews: 118,
    price: 2499,
    category: "Legal",
    featured: false,
    image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 12,
    title: "Coin Grading Standards",
    instructor: "Linda Perez",
    instructorTitle: "Coin Grading Expert",
    level: "Intermediate",
    duration: "10 weeks",
    rating: 4.7,
    reviews: 105,
    price: 2999,
    category: "Grading",
    featured: false,
    image: "https://images.unsplash.com/photo-1621786899979-53a042943b99?w=600&auto=format&fit=crop&q=80"
  }
];

const CourseCreatorForm = () => {
  const [title, setTitle] = useState('');
  const [instructor, setInstructor] = useState('');
  const [instructorTitle, setInstructorTitle] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [duration, setDuration] = useState('');
  const [rating, setRating] = useState(4.5);
  const [reviews, setReviews] = useState(50);
  const [price, setPrice] = useState(999);
  const [category, setCategory] = useState('History');
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to Supabase)
    console.log({
      title,
      instructor,
      instructorTitle,
      level,
      duration,
      rating,
      reviews,
      price,
      category,
      featured,
      image
    });
    // Reset form fields after submission
    setTitle('');
    setInstructor('');
    setInstructorTitle('');
    setLevel('Beginner');
    setDuration('');
    setRating(4.5);
    setReviews(50);
    setPrice(999);
    setCategory('History');
    setFeatured(false);
    setImage('');
  };
  
  // Add a handler function for the checkbox
  const handleFeaturedChange = (checked: boolean | "indeterminate") => {
    setFeatured(checked === true);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Course Title</Label>
        <Input
          type="text"
          id="title"
          placeholder="Enter course title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="instructor">Instructor Name</Label>
        <Input
          type="text"
          id="instructor"
          placeholder="Enter instructor name"
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="instructorTitle">Instructor Title</Label>
        <Input
          type="text"
          id="instructorTitle"
          placeholder="Enter instructor title"
          value={instructorTitle}
          onChange={(e) => setInstructorTitle(e.target.value)}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="level">Course Level</Label>
        <Select value={level} onValueChange={setLevel}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
            <SelectItem value="All Levels">All Levels</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="duration">Course Duration</Label>
        <Input
          type="text"
          id="duration"
          placeholder="Enter course duration (e.g., 6 weeks)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="rating">Course Rating</Label>
        <Input
          type="number"
          id="rating"
          placeholder="Enter course rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min="1"
          max="5"
          step="0.1"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="reviews">Number of Reviews</Label>
        <Input
          type="number"
          id="reviews"
          placeholder="Enter number of reviews"
          value={reviews}
          onChange={(e) => setReviews(Number(e.target.value))}
          min="0"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="price">Course Price</Label>
        <Input
          type="number"
          id="price"
          placeholder="Enter course price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          min="0"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="category">Course Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="History">History</SelectItem>
            <SelectItem value="Grading">Grading</SelectItem>
            <SelectItem value="Authentication">Authentication</SelectItem>
            <SelectItem value="Investment">Investment</SelectItem>
            <SelectItem value="Preservation">Preservation</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Collecting">Collecting</SelectItem>
            <SelectItem value="Legal">Legal</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="image">Course Image URL</Label>
        <Input
          type="url"
          id="image"
          placeholder="Enter course image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="featured" 
          checked={featured} 
          onCheckedChange={handleFeaturedChange} 
        />
        <Label htmlFor="featured">Featured Course</Label>
      </div>
      
      <Button type="submit" className="bg-royal hover:bg-blue-600 transition-colors text-white">
        Create Course
      </Button>
    </form>
  );
};

const Courses = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { courses, isLoading, error } = useCourses();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const categories = [
    'all',
    'ancient',
    'medieval',
    'modern',
    'world',
    'specialized',
  ];

  const levels = ['all', 'beginner', 'intermediate', 'advanced'];

  const filteredCourses = courses?.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleEnroll = async (courseId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to enroll in courses.",
        variant: "destructive",
      });
      navigate('/authenticate');
      return;
    }

    try {
      // TODO: Implement enrollment logic
      toast({
        title: "Enrolled successfully",
        description: "You have been enrolled in the course.",
      });
    } catch (error) {
      toast({
        title: "Enrollment failed",
        description: "There was a problem enrolling in the course. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Courses</h2>
          <p className="text-foreground/60">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Explore Our Courses</h1>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Discover comprehensive courses on numismatics, from ancient coins to modern currency.
            Learn from expert instructors and enhance your knowledge.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40" />
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-md border border-border bg-background"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 rounded-md border border-border bg-background"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses?.map((course) => (
            <Card key={course.id} className="flex flex-col">
              <CardHeader>
                <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                  <img
                    src={course.thumbnail_url}
                    alt={course.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    {course.level}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-foreground/60">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{course.duration} hours</span>
                  </div>
                  <div className="flex items-center text-sm text-foreground/60">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{course.enrolled_count} students</span>
                  </div>
                  <div className="flex items-center text-sm text-foreground/60">
                    <Star className="h-4 w-4 mr-2" />
                    <span>{course.rating.toFixed(1)} rating</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="text-xl font-bold">${course.price}</div>
                <Button
                  onClick={() => handleEnroll(course.id)}
                  className="bg-royal hover:bg-royal/90"
                >
                  Enroll Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredCourses?.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-foreground/60">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
