import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
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
import { ConfigContext } from "@/context/ConfigContext";
import { useToast } from "@/hooks/use-toast";
import CourseCard from "@/components/CourseCard";

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
            <SelectItem value="Beginner">Beginner Level</SelectItem>
            <SelectItem value="Intermediate">Intermediate Level</SelectItem>
            <SelectItem value="Advanced">Advanced Level</SelectItem>
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
  // State for search, filtering, and pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('browse');
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage, setCoursesPerPage] = useState(6);
  const [sortBy, setSortBy] = useState('featured');
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Filter state
  const [filters, setFilters] = useState({
    levels: [] as string[],
    price: { min: 0, max: 5000 },
    categories: [] as string[],
    rating: 0
  });
  
  // Cart state
  const [cart, setCart] = useState<typeof courses[0][]>([]);
  const { toast } = useToast();
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart data:', error);
      }
    }
  }, []);
  
  // Filtering and sorting logic
  const filteredCourses = courses
    .filter(course => {
      // Text search
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Level filter
      const matchesLevel = filters.levels.length === 0 || filters.levels.includes(course.level);
      
      // Price filter
      const matchesPrice = course.price >= filters.price.min && course.price <= filters.price.max;
      
      // Category filter
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(course.category);
      
      // Rating filter
      const matchesRating = course.rating >= filters.rating;
      
      return matchesSearch && matchesLevel && matchesPrice && matchesCategory && matchesRating;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id - a.id;
        case 'featured':
        default:
          return b.featured ? 1 : -1;
      }
    });
    
  // Pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters, coursesPerPage, sortBy]);
  
  // Toggle filter for checkboxes
  const toggleFilter = (type: 'levels' | 'categories', value: string) => {
    setFilters(prev => {
      const currentValues = prev[type];
      return {
        ...prev,
        [type]: currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value]
      };
    });
  };
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({
      levels: [],
      price: { min: 0, max: 5000 },
      categories: [],
      rating: 0
    });
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-royal/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold font-playfair text-royal mb-4">
                Expert-Led Courses in Numismatics
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Elevate your knowledge with our curated selection of premium courses taught by industry experts and renowned collectors.
              </p>
              
              <div className="relative max-w-xl mx-auto flex">
                <Input
                  type="text"
                  placeholder="Search courses by title, instructor, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
                {searchQuery && (
                  <button 
                    className="absolute right-10 top-2.5 text-gray-400 hover:text-gray-600"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <div className="flex justify-center mt-6 space-x-2">
                <Button 
                  variant={selectedTab === 'browse' ? 'default' : 'outline'} 
                  onClick={() => setSelectedTab('browse')}
                  className="flex items-center hover:bg-blue-600 hover:text-white transition-colors"
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
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  Browse Courses
                </Button>
                <Button 
                  variant={selectedTab === 'create' ? 'default' : 'outline'} 
                  onClick={() => setSelectedTab('create')}
                  className="flex items-center hover:bg-blue-600 hover:text-white transition-colors"
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
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Create Course
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsContent value="browse" className="mt-0">
                {/* Filters and Sorting */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Popover open={filterOpen} onOpenChange={setFilterOpen}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex items-center hover:bg-blue-50 hover:text-blue-600 transition-colors">
                          <Filter className="h-4 w-4 mr-2" />
                          Filters
                          {(filters.levels.length > 0 || filters.categories.length > 0 || filters.rating > 0) && (
                            <Badge variant="secondary" className="ml-2">
                              {filters.levels.length + filters.categories.length + (filters.rating > 0 ? 1 : 0)}
                            </Badge>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-0" align="start">
                        <div className="p-4 pb-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">Filters</h3>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-auto p-0 text-sm text-muted-foreground"
                              onClick={clearFilters}
                            >
                              Clear all
                            </Button>
                          </div>
                        </div>
                        
                        <Separator />
                        <div className="p-4">
                          <h4 className="mb-2 font-semibold">Level</h4>
                          <div className="space-y-1">
                            {['Beginner', 'Intermediate', 'Advanced', 'All Levels'].map(level => (
                              <div key={level} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`level-${level}`}
                                  checked={filters.levels.includes(level)}
                                  onCheckedChange={() => toggleFilter('levels', level)}
                                />
                                <Label htmlFor={`level-${level}`}>{level}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <Separator />
                        <div className="p-4">
                          <h4 className="mb-2 font-semibold">Category</h4>
                          <div className="space-y-1">
                            {['History', 'Grading', 'Authentication', 'Investment', 'Preservation', 'Technology', 'Collecting', 'Legal'].map(category => (
                              <div key={category} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`category-${category}`}
                                  checked={filters.categories.includes(category)}
                                  onCheckedChange={() => toggleFilter('categories', category)}
                                />
                                <Label htmlFor={`category-${category}`}>{category}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <Separator />
                        <div className="p-4">
                          <h4 className="mb-2 font-semibold">Minimum Rating</h4>
                          <div className="flex items-center space-x-2">
                            {[4, 4.5, 5].map(rating => (
                              <Button
                                key={rating}
                                variant={filters.rating === rating ? "default" : "outline"}
                                size="sm"
                                className={`mx-1 min-w-[36px] ${
                                  filters.rating !== rating ? "hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600" : ""
                                } transition-colors`}
                                onClick={() => setFilters(prev => ({ ...prev, rating }))}
                              >
                                {rating}+
                              </Button>
                            ))}
                          </div>
                        </div>
                        
                        <Separator />
                        <div className="p-4 flex justify-end">
                          <Button
                            onClick={() => setFilterOpen(false)}
                            className="hover:bg-blue-600 transition-colors"
                          >
                            Apply Filters
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                    
                    {filters.levels.length > 0 && filters.levels.map(level => (
                      <Badge key={level} variant="secondary" className="flex items-center gap-1">
                        {level}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => toggleFilter('levels', level)} 
                        />
                      </Badge>
                    ))}
                    
                    {filters.categories.length > 0 && filters.categories.map(category => (
                      <Badge key={category} variant="secondary" className="flex items-center gap-1">
                        {category}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => toggleFilter('categories', category)} 
                        />
                      </Badge>
                    ))}
                    
                    {filters.rating > 0 && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {filters.rating}+ <Star className="h-3 w-3 text-gold fill-gold" />
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => setFilters(prev => ({ ...prev, rating: 0 }))} 
                        />
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Sort" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured Courses</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Link to="/cart">
                      <Button variant="outline" className="relative hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition-colors">
                        <ShoppingCart className="h-5 w-5" />
                        {cart.length > 0 && (
                          <span className="absolute -top-2 -right-2 bg-blue-600 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center cart-badge-animate">
                            {cart.length}
                          </span>
                        )}
                      </Button>
                    </Link>
                  </div>
                </div>
                
                {/* Course Grid */}
                {filteredCourses.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {currentCourses.map((course, index) => (
                        <CourseCard 
                          key={course.id} 
                          course={course} 
                          index={index}
                        />
                      ))}
                    </div>
                    
                    {/* Pagination Controls */}
                    <div className="mt-12 flex flex-col md:flex-row justify-between items-center">
                      <div className="flex items-center space-x-2 mb-4 md:mb-0">
                        <span className="text-sm text-gray-600">Show</span>
                        <Select 
                          value={coursesPerPage.toString()} 
                          onValueChange={(value) => setCoursesPerPage(Number(value))}
                        >
                          <SelectTrigger className="w-[70px]">
                            <SelectValue placeholder="3" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="6">6</SelectItem>
                            <SelectItem value="9">9</SelectItem>
                            <SelectItem value="12">12</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-sm text-gray-600">per page</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition-colors"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        
                        <div className="flex items-center">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <Button
                              key={page}
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              className={`mx-1 min-w-[36px] ${
                                currentPage !== page ? "hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600" : ""
                              } transition-colors`}
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </Button>
                          ))}
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          disabled={currentPage === totalPages || totalPages === 0}
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition-colors"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">No courses found</h3>
                    <p className="text-gray-600 mb-6">
                      No courses match your current search criteria. Try adjusting your filters or search term.
                    </p>
                    <Button onClick={clearFilters} className="hover:bg-blue-600 transition-colors">
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="create" className="mt-6">
                <div className="royal-card p-8">
                  <h2 className="text-2xl font-bold font-playfair text-royal mb-6">Create a New Course</h2>
                  <CourseCreatorForm />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
