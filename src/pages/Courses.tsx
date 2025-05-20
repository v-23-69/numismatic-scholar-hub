
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, BookOpen, ChevronRight, Filter, Search, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
    image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "European Coinage History",
    instructor: "Prof. Michael Torres",
    instructorTitle: "University Historian",
    level: "Advanced",
    duration: "10 weeks",
    rating: 4.7,
    reviews: 85,
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    title: "Numismatic Photography",
    instructor: "Sarah Johnson",
    instructorTitle: "Professional Photographer",
    level: "Beginner",
    duration: "4 weeks",
    rating: 4.9,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1583518257225-f9a8081f6a84?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    title: "Asian Coins Through History",
    instructor: "Dr. Mei Zhang",
    instructorTitle: "Historical Researcher",
    level: "Intermediate",
    duration: "8 weeks",
    rating: 4.8,
    reviews: 72,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 6,
    title: "Digital Collection Management",
    instructor: "Thomas Wright",
    instructorTitle: "Software Engineer & Collector",
    level: "All Levels",
    duration: "5 weeks",
    rating: 4.6,
    reviews: 43,
    image: "https://images.unsplash.com/photo-1526378787940-576a539ba69d?w=600&auto=format&fit=crop&q=80"
  }
];

const CourseCard = ({ course, index }: { course: typeof courses[0], index: number }) => {
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
        <div className="absolute top-3 right-3 bg-gold text-royal-dark text-xs font-bold px-2 py-1 rounded">
          EXPERT PICK
        </div>
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
          <Link 
            to={`/courses/${course.id}`} 
            className="text-royal hover:text-gold flex items-center transition-colors"
          >
            View Course <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const CourseCreatorForm = () => {
  // Form state (in a real app, would be managed by React Hook Form or similar)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [duration, setDuration] = useState('');
  const [level, setLevel] = useState('');
  const [price, setPrice] = useState('');
  const [instructorInfo, setInstructorInfo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would submit to Supabase in a real implementation
    console.log('Course submitted:', { title, description, image, duration, level, price, instructorInfo });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Course Title</label>
          <Input 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Enter course title"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
          <Input 
            id="duration" 
            value={duration} 
            onChange={(e) => setDuration(e.target.value)} 
            placeholder="e.g., 6 weeks"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="level" className="block text-sm font-medium text-gray-700">Difficulty Level</label>
          <select 
            id="level" 
            value={level} 
            onChange={(e) => setLevel(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          >
            <option value="">Select level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="All Levels">All Levels</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (₹)</label>
          <Input 
            id="price" 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            placeholder="Enter price"
            min="0"
            required
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="instructorInfo" className="block text-sm font-medium text-gray-700">Instructor Information</label>
          <Input 
            id="instructorInfo" 
            value={instructorInfo} 
            onChange={(e) => setInstructorInfo(e.target.value)} 
            placeholder="Name, title, and credentials"
            required
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Course Description</label>
          <textarea 
            id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Describe your course"
            required
          ></textarea>
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Course Image</label>
          <Input 
            id="image" 
            type="file"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            className="cursor-pointer"
            accept="image/*"
            required
          />
          <p className="text-xs text-gray-500">Recommended: 16:9 ratio, high-quality image</p>
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="video" className="block text-sm font-medium text-gray-700">Video Upload</label>
          <Input 
            id="video" 
            type="file" 
            className="cursor-pointer"
            accept="video/*"
          />
          <p className="text-xs text-gray-500">Optional: Upload an introduction or sample video</p>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" className="bg-royal hover:bg-royal-light text-white">
          Create Course
        </Button>
      </div>
    </form>
  );
};

const Courses = () => {
  // For filtering and search (would be more sophisticated in a real app)
  const [searchQuery, setSearchQuery] = useState('');

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
              
              <div className="relative max-w-xl mx-auto">
                <Input
                  type="text"
                  placeholder="Search courses by title, topic, or instructor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="browse" className="w-full">
              <div className="flex justify-between items-center mb-8">
                <TabsList>
                  <TabsTrigger value="browse">Browse Courses</TabsTrigger>
                  <TabsTrigger value="create">Create Course</TabsTrigger>
                </TabsList>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Sort
                  </Button>
                </div>
              </div>
              
              <TabsContent value="browse" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {courses.map((course, index) => (
                    <CourseCard key={course.id} course={course} index={index} />
                  ))}
                </div>
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
