
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { BookOpen, Play, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface EnrolledCourse {
  id: string;
  title: string;
  thumbnailUrl: string;
  description: string;
  progress?: number;
  completed?: boolean;
  instructor?: string;
}

const EnrolledCourses = () => {
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, would fetch from API or database
    // For now, retrieve from localStorage
    const fetchCourses = () => {
      try {
        const storedCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
        
        // Add random progress for demo purposes
        const coursesWithProgress = storedCourses.map((course: EnrolledCourse) => ({
          ...course,
          progress: Math.floor(Math.random() * 100),
          completed: Math.random() > 0.7,
          instructor: "Dr. John Smith"
        }));
        
        setCourses(coursesWithProgress);
        setLoading(false);
      } catch (error) {
        console.error("Error loading enrolled courses:", error);
        setCourses([]);
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-10">
          <div className="container mx-auto px-4">
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-royal border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500">Loading your courses...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-royal">My Enrolled Courses</h1>
              <p className="text-gray-600">
                Continue your numismatic education journey
              </p>
            </div>
            <Button asChild>
              <Link to="/courses">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse More Courses
              </Link>
            </Button>
          </div>

          {courses.length > 0 ? (
            <div className="space-y-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 h-48 md:h-auto">
                      <img
                        src={course.thumbnailUrl || "https://images.unsplash.com/photo-1605037287625-9303ban9a469?w=500"}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-3/4">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                          <h2 className="text-2xl font-bold mb-2 text-royal">
                            {course.title}
                          </h2>
                          <p className="text-sm text-gray-500 mb-4">
                            Instructor: {course.instructor || "Unknown"}
                          </p>
                        </div>
                        <div className="md:text-right mb-4 md:mb-0">
                          {course.completed ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <Award className="w-3 h-3 mr-1" />
                              Completed
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              In Progress
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {course.description}
                      </p>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{course.progress || 0}%</span>
                        </div>
                        <Progress value={course.progress || 0} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <Button
                          className="bg-royal hover:bg-royal-dark text-white"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          {course.progress && course.progress > 0 ? "Continue Learning" : "Start Course"}
                        </Button>
                        
                        <Link 
                          to={`/courses/${course.id}`}
                          className="text-royal hover:text-royal-dark text-sm font-medium"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                You haven't enrolled in any courses yet
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                Explore our collection of expert-led numismatic courses and
                start your learning journey today.
              </p>
              <Button asChild>
                <Link to="/courses">Browse Courses</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EnrolledCourses;
