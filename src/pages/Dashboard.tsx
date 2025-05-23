
import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Users, Book as BookOpen, Coins as CoinsIcon, PieChart, BarChart3, Clock, User, 
  FileCheck, CreditCard, ChevronRight, FileClock, BadgeCheck, 
  Settings, Plus, Heart, CheckCircle, X, List 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as ReChart, Pie, Cell, Legend, BarChart, Bar } from "recharts";
import { ConfigContext } from "@/App";

const Dashboard = () => {
  const { supabaseClient, supabaseConfigured } = useContext(ConfigContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get data from localStorage for demo purposes
  const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
  const uploadedCourses = JSON.parse(localStorage.getItem('uploadedCourses') || '[]');
  const wishlistItems = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const verificationRequests = JSON.parse(localStorage.getItem('verificationRequests') || '[]');
  const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
  
  // For demo purposes, make the current user an admin if they've uploaded courses
  useEffect(() => {
    const checkUserRole = async () => {
      // In a real app, would fetch role from Supabase
      // For demo purposes, we'll assume admin if the user has uploaded at least 2 courses
      setTimeout(() => {
        setIsAdmin(uploadedCourses.length >= 2);
        setUserRole(uploadedCourses.length >= 2 ? 'admin' : 'user');
        setIsLoading(false);
      }, 500);
    };
    
    checkUserRole();
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-royal border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500">Loading dashboard...</p>
              </div>
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
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-royal">Dashboard</h1>
              <p className="text-gray-600">
                {isAdmin ? 'Admin Dashboard' : 'Your Learning Progress & Activity'}
              </p>
            </div>
            
            {isAdmin ? (
              <Button variant="outline" className="mt-4 md:mt-0">
                <Users className="mr-2 h-4 w-4" /> Manage Users
              </Button>
            ) : (
              <Button variant="outline" className="mt-4 md:mt-0" asChild>
                <Link to="/profile">
                  <User className="mr-2 h-4 w-4" /> Edit Profile
                </Link>
              </Button>
            )}
          </div>
          
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center text-gray-600">
                  <BookOpen className="h-4 w-4 mr-2" />
                  {isAdmin ? 'Total Courses' : 'Enrolled Courses'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-royal">
                  {isAdmin ? uploadedCourses.length + 15 : enrolledCourses.length}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {isAdmin ? '15 featured courses' : enrolledCourses.length > 0 ? '2 in progress' : 'No courses yet'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center text-gray-600">
                  <Coins className="h-4 w-4 mr-2" />
                  {isAdmin ? 'Coin Verifications' : 'Your Coins'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-royal">
                  {isAdmin ? verificationRequests.length + 12 : verificationRequests.length}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {isAdmin ? '5 pending review' : verificationRequests.length > 0 ? `${verificationRequests.filter(req => req.status === 'pending').length} pending` : 'No coins submitted'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center text-gray-600">
                  <Heart className="h-4 w-4 mr-2" />
                  {isAdmin ? 'Active Users' : 'Saved Items'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-royal">
                  {isAdmin ? 247 : wishlistItems.length}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {isAdmin ? '24 new this month' : wishlistItems.length > 0 ? `${wishlistItems.filter(i => i.type === 'course').length} courses, ${wishlistItems.filter(i => i.type === 'coin').length} coins` : 'No saved items'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center text-gray-600">
                  <FileCheck className="h-4 w-4 mr-2" />
                  {isAdmin ? 'Total Revenue' : 'Profile Completion'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isAdmin ? (
                  <>
                    <div className="text-3xl font-bold text-royal">₹230,450</div>
                    <p className="text-sm text-gray-500 mt-1">₹45,280 this month</p>
                  </>
                ) : (
                  <>
                    <div className="text-3xl font-bold text-royal">75%</div>
                    <Progress value={75} className="h-2 mt-2" />
                    <p className="text-sm text-gray-500 mt-1">Add a profile image to complete</p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content Tabs */}
          <Tabs defaultValue={isAdmin ? "overview" : "activity"} className="space-y-4">
            <TabsList>
              {isAdmin ? (
                <>
                  <TabsTrigger value="overview">Admin Overview</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="verifications">Verifications</TabsTrigger>
                  <TabsTrigger value="users">Users</TabsTrigger>
                </>
              ) : (
                <>
                  <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                  <TabsTrigger value="courses">My Courses</TabsTrigger>
                  <TabsTrigger value="coins">My Coins</TabsTrigger>
                  <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                </>
              )}
            </TabsList>
            
            {isAdmin ? (
              <>
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Recent Verifications</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {verificationRequests.length > 0 ? (
                          <div className="space-y-4">
                            {verificationRequests.map((req, idx) => (
                              <div key={idx} className="flex items-center justify-between border-b pb-2">
                                <div className="flex items-center">
                                  {req.status === 'pending' ? (
                                    <Clock className="h-4 w-4 text-amber-500 mr-2" />
                                  ) : req.status === 'verified' ? (
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                  ) : (
                                    <X className="h-4 w-4 text-red-500 mr-2" />
                                  )}
                                  <span>{req.coinName}</span>
                                </div>
                                <span className={`text-sm ${
                                  req.status === 'pending' ? 'text-amber-500' : 
                                  req.status === 'verified' ? 'text-green-500' : 
                                  'text-red-500'
                                }`}>
                                  {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6">
                            <p className="text-gray-500">No verification requests yet</p>
                          </div>
                        )}
                        <Button variant="outline" className="w-full mt-4">View All Requests</Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Recent Courses</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {uploadedCourses.length > 0 ? (
                          <div className="space-y-4">
                            {uploadedCourses.map((course, idx) => (
                              <div key={idx} className="flex items-center justify-between border-b pb-2">
                                <div className="flex items-center">
                                  <BookOpen className="h-4 w-4 text-royal mr-2" />
                                  <span>{course.title}</span>
                                </div>
                                <span className="text-sm">₹{course.price}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6">
                            <p className="text-gray-500">No courses created yet</p>
                          </div>
                        )}
                        <Button variant="outline" className="w-full mt-4">View All Courses</Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="courses" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>All Courses</CardTitle>
                        <Button size="sm" className="bg-royal hover:bg-royal-dark" asChild>
                          <Link to="/create-course">
                            <Plus className="mr-2 h-4 w-4" /> Add New
                          </Link>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {uploadedCourses.length > 0 ? (
                          uploadedCourses.map((course, idx) => (
                            <div key={idx} className="flex items-start justify-between border-b pb-4">
                              <div>
                                <h3 className="font-medium">{course.title}</h3>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{course.description}</p>
                              </div>
                              <div className="text-right">
                                <span className="font-medium">₹{course.price}</span>
                                <div className="flex space-x-2 mt-2">
                                  <Button size="sm" variant="ghost">Edit</Button>
                                  <Button size="sm" variant="ghost" className="text-red-500">Delete</Button>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-12">
                            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-medium text-gray-800 mb-1">No Courses Yet</h3>
                            <p className="text-gray-500 mb-4">Start creating courses to share your numismatic knowledge</p>
                            <Button className="bg-royal hover:bg-royal-dark" asChild>
                              <Link to="/create-course">Create Your First Course</Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="verifications" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Coin Verification Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {verificationRequests.length > 0 ? (
                          verificationRequests.map((req, idx) => (
                            <div key={idx} className="flex items-start justify-between border-b pb-4">
                              <div>
                                <h3 className="font-medium">{req.coinName}</h3>
                                <p className="text-sm text-gray-500 mt-1">Submitted by User ID: {req.userId}</p>
                              </div>
                              <div className="text-right">
                                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                  req.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                                  req.status === 'verified' ? 'bg-green-100 text-green-700' : 
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                                </span>
                                {req.status === 'pending' && (
                                  <div className="flex space-x-2 mt-2">
                                    <Button size="sm" variant="outline" className="text-green-500 border-green-500">Verify</Button>
                                    <Button size="sm" variant="outline" className="text-red-500 border-red-500">Reject</Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-12">
                            <Coins className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-gray-500">No verification requests yet</h3>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="users" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-gray-800 mb-1">User Management</h3>
                        <p className="text-gray-500 mb-4">
                          This feature will be available in the next update.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </>
            ) : (
              <>
                <TabsContent value="activity" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {enrolledCourses.length > 0 || verificationRequests.length > 0 ? (
                          <>
                            {enrolledCourses.slice(0, 3).map((course, idx) => (
                              <li key={`course-${idx}`} className="flex items-start space-x-3 border-b pb-3">
                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                  <BookOpen className="h-4 w-4 text-royal" />
                                </div>
                                <div>
                                  <p className="font-medium">Enrolled in course: {course.title}</p>
                                  <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
                                </div>
                              </li>
                            ))}
                            
                            {verificationRequests.slice(0, 3).map((req, idx) => (
                              <li key={`verify-${idx}`} className="flex items-start space-x-3 border-b pb-3">
                                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                                  <Coins className="h-4 w-4 text-amber-600" />
                                </div>
                                <div>
                                  <p className="font-medium">Submitted coin for verification: {req.coinName}</p>
                                  <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
                                </div>
                              </li>
                            ))}
                            
                            {wishlistItems.slice(0, 2).map((item, idx) => (
                              <li key={`wishlist-${idx}`} className="flex items-start space-x-3 border-b pb-3">
                                <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center">
                                  <Heart className="h-4 w-4 text-pink-600" />
                                </div>
                                <div>
                                  <p className="font-medium">Added to wishlist: {item.title}</p>
                                  <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
                                </div>
                              </li>
                            ))}
                          </>
                        ) : (
                          <div className="text-center py-10">
                            <Clock className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                            <p className="text-gray-500">No recent activity to show</p>
                          </div>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="courses">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Enrolled Courses</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {enrolledCourses.length > 0 ? (
                          <div className="space-y-4">
                            {enrolledCourses.map((course, idx) => (
                              <div key={idx} className="flex items-center space-x-3 border-b pb-3">
                                <div className="h-12 w-12 bg-gray-200 rounded-md flex-shrink-0 overflow-hidden">
                                  {course.thumbnailUrl && (
                                    <img
                                      src={course.thumbnailUrl}
                                      alt={course.title}
                                      className="w-full h-full object-cover"
                                    />
                                  )}
                                </div>
                                <div className="flex-grow">
                                  <h4 className="font-medium line-clamp-1">{course.title}</h4>
                                  <p className="text-xs text-gray-500">
                                    {Math.floor(Math.random() * 100)}% complete
                                  </p>
                                </div>
                                <Button size="sm" variant="ghost">Continue</Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <BookOpen className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                            <p className="text-gray-500 mb-3">No enrolled courses yet</p>
                            <Button className="bg-royal hover:bg-royal-dark" asChild>
                              <Link to="/courses">Explore Courses</Link>
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Your Uploaded Courses</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {uploadedCourses.length > 0 ? (
                          <div className="space-y-4">
                            {uploadedCourses.map((course, idx) => (
                              <div key={idx} className="flex items-center space-x-3 border-b pb-3">
                                <div className="h-12 w-12 bg-gray-200 rounded-md flex-shrink-0 overflow-hidden">
                                  {course.thumbnailUrl && (
                                    <img
                                      src={course.thumbnailUrl}
                                      alt={course.title}
                                      className="w-full h-full object-cover"
                                    />
                                  )}
                                </div>
                                <div className="flex-grow">
                                  <h4 className="font-medium line-clamp-1">{course.title}</h4>
                                  <p className="text-xs text-gray-500">₹{course.price}</p>
                                </div>
                                <Button size="sm" variant="ghost">Edit</Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <List className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                            <p className="text-gray-500 mb-3">You haven't created any courses</p>
                            <Button className="bg-royal hover:bg-royal-dark" asChild>
                              <Link to="/create-course">Create a Course</Link>
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="coins">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Your Coin Verification Requests</CardTitle>
                        <Button size="sm" className="bg-royal hover:bg-royal-dark" asChild>
                          <Link to="/verify">
                            <Plus className="mr-2 h-4 w-4" /> Verify New
                          </Link>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {verificationRequests.length > 0 ? (
                        <div className="space-y-4">
                          {verificationRequests.map((req, idx) => (
                            <div key={idx} className="flex items-start justify-between border-b pb-4">
                              <div className="flex space-x-3">
                                <div className="h-16 w-16 bg-gray-200 rounded-md overflow-hidden">
                                  {req.image && (
                                    <img
                                      src={req.image}
                                      alt={req.coinName}
                                      className="w-full h-full object-cover"
                                    />
                                  )}
                                </div>
                                <div>
                                  <h3 className="font-medium">{req.coinName}</h3>
                                  <p className="text-sm text-gray-500 mt-1">
                                    Submitted on {new Date().toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                  req.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                                  req.status === 'verified' ? 'bg-green-100 text-green-700' : 
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                                </span>
                                {req.status === 'verified' && (
                                  <div className="mt-2">
                                    <Button size="sm" variant="outline">View Certificate</Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-10">
                          <Coins className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-xl font-medium text-gray-800 mb-1">No Coins Verified Yet</h3>
                          <p className="text-gray-500 mb-4">Get expert verification for your coins</p>
                          <Button className="bg-royal hover:bg-royal-dark" asChild>
                            <Link to="/verify">Verify Your First Coin</Link>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="wishlist">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Wishlist</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {wishlistItems.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {wishlistItems.map((item, idx) => (
                            <div key={idx} className="flex space-x-3 border rounded-md p-3">
                              <div className="h-16 w-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                                {item.image && (
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              <div className="flex-grow">
                                <h3 className="font-medium line-clamp-1">{item.title}</h3>
                                <p className="text-sm text-gray-500">
                                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                </p>
                                <div className="mt-2">
                                  <Button size="sm" className="bg-royal hover:bg-royal-dark">
                                    {item.type === 'course' ? 'Enroll' : 'View Details'}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-10">
                          <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-xl font-medium text-gray-800 mb-1">Your Wishlist is Empty</h3>
                          <p className="text-gray-500 mb-4">Save items you're interested in</p>
                          <div className="flex justify-center space-x-4">
                            <Button variant="outline" asChild>
                              <Link to="/courses">Browse Courses</Link>
                            </Button>
                            <Button variant="outline" asChild>
                              <Link to="/coins">Browse Coins</Link>
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
