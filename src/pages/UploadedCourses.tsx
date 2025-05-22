
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookOpen, Plus, MoreVertical, Edit, Trash2, Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CourseSection {
  id: string;
  title: string;
  content: string;
}

interface UploadedCourse {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnailUrl: string;
  videoUrl: string;
  sections: CourseSection[];
  createdAt: string;
  authorId: string;
  enrollments?: number;
  status?: 'published' | 'draft' | 'review';
}

const UploadedCourses = () => {
  const [courses, setCourses] = useState<UploadedCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, would fetch from API or database
    // For now, retrieve from localStorage
    const fetchCourses = () => {
      try {
        const storedCourses = JSON.parse(localStorage.getItem('uploadedCourses') || '[]');
        
        // Add random enrollments for demo purposes
        const coursesWithData = storedCourses.map((course: UploadedCourse) => ({
          ...course,
          enrollments: Math.floor(Math.random() * 50),
          status: Math.random() > 0.7 ? 'published' : (Math.random() > 0.5 ? 'draft' : 'review')
        }));
        
        setCourses(coursesWithData);
        setLoading(false);
      } catch (error) {
        console.error("Error loading uploaded courses:", error);
        setCourses([]);
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []);
  
  const deleteCourse = (id: string) => {
    try {
      const updatedCourses = courses.filter(course => course.id !== id);
      setCourses(updatedCourses);
      localStorage.setItem('uploadedCourses', JSON.stringify(updatedCourses));
      
      toast({
        title: "Course Deleted",
        description: "Your course has been successfully deleted",
      });
    } catch (error) {
      console.error("Error deleting course:", error);
      toast({
        title: "Error",
        description: "Failed to delete the course. Please try again.",
        variant: "destructive",
      });
    }
  };
  
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
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-royal">My Uploaded Courses</h1>
              <p className="text-gray-600">
                Manage your published numismatic courses
              </p>
            </div>
            <Button className="mt-4 md:mt-0 bg-royal hover:bg-royal-dark" asChild>
              <Link to="/create-course">
                <Plus className="h-4 w-4 mr-2" />
                Create New Course
              </Link>
            </Button>
          </div>

          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.thumbnailUrl || "https://images.unsplash.com/photo-1605037287625-9303ban9a469?w=500"}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="bg-white/90 hover:bg-white h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="h-4 w-4 mr-2" /> Edit Course
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600 cursor-pointer"
                            onClick={() => deleteCourse(course.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" /> Delete Course
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="absolute top-2 left-2">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        course.status === 'published' ? 'bg-green-100 text-green-800' : 
                        course.status === 'review' ? 'bg-amber-100 text-amber-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {course.status === 'published' ? 'Published' : 
                         course.status === 'review' ? 'Under Review' : 'Draft'}
                      </span>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <h3 className="text-xl font-bold text-royal line-clamp-1">{course.title}</h3>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 line-clamp-3 mb-4">{course.description}</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" /> 
                        {course.enrollments} students
                      </span>
                      <span className="font-medium">₹{course.price}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <div className="flex items-center justify-between w-full">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/courses/${course.id}`}>
                          Preview
                        </Link>
                      </Button>
                      
                      <Button variant="outline" size="sm" className="ml-2">
                        <Users className="h-4 w-4 mr-2" /> Students
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                You haven't created any courses yet
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                Share your numismatic knowledge with the community by creating your first course.
              </p>
              <Button className="bg-royal hover:bg-royal-dark" asChild>
                <Link to="/create-course">Create Your First Course</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UploadedCourses;
