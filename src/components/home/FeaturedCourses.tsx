
import { Link, useNavigate } from 'react-router-dom';
import { Star, Clock, BookOpen, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

// Course data (in a real application, this would be fetched from an API)
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
  }
];

const CourseCard = ({ course, index }: { course: typeof courses[0], index: number }) => {
  const navigate = useNavigate();

  const handleCourseClick = () => {
    navigate(`/courses/${course.id}`);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
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
          <button 
            onClick={handleCourseClick}
            className="text-royal hover:text-gold flex items-center transition-colors"
          >
            View Course <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedCourses = () => {
  const navigate = useNavigate();

  const handleViewAllCourses = () => {
    navigate('/courses');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <section className="py-20 bg-royal/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-royal font-playfair mb-4">
              Featured Courses
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Learn directly from master numismatists with our carefully curated selection of premium courses.
            </p>
          </div>
          <Button 
            variant="outline" 
            className="border-royal text-royal hover:bg-royal hover:text-white mt-4 md:mt-0"
            onClick={handleViewAllCourses}
          >
            View All Courses
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
