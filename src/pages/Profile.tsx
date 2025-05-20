
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Edit, LogOut, BookOpen, ShoppingCart, Mail, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface UserProfile {
  id: string;
  username: string;
  full_name: string;
  bio: string;
  location: string;
  avatar_url: string | null;
}

interface Course {
  id: string;
  title: string;
  image: string;
  description: string;
  progress: number;
  instructor: string;
}

interface Listing {
  id: string;
  title: string;
  image: string;
  price: number;
  description: string;
  created_at: string;
  status: 'active' | 'sold' | 'pending';
}

interface SavedItem {
  id: string;
  type: 'course' | 'listing';
  title: string;
  image: string;
  price?: number;
}

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [updatedProfile, setUpdatedProfile] = useState<Partial<UserProfile>>({});
  const [courses, setCourses] = useState<Course[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const getProfile = async () => {
    try {
      setLoading(true);
      
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData.session) {
        navigate('/authenticate');
        return;
      }
      
      const { user: authUser } = sessionData.session;
      
      // Get profile data
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();
        
      if (error) {
        if (error.code === 'PGRST116') {
          // Profile doesn't exist yet, create one
          const newProfile = {
            id: authUser.id,
            username: authUser.email?.split('@')[0] || 'user',
            full_name: authUser.user_metadata?.full_name || '',
            bio: '',
            location: '',
            avatar_url: null,
          };
          
          await supabase.from('profiles').insert([newProfile]);
          
          setUser(newProfile);
          setUpdatedProfile(newProfile);
        } else {
          throw error;
        }
      } else {
        setUser(data);
        setUpdatedProfile(data);
      }
      
      // Get courses
      const { data: coursesData } = await supabase
        .from('enrolled_courses')
        .select('courses(*)')
        .eq('user_id', authUser.id);
        
      if (coursesData) {
        setCourses(coursesData.map((item: any) => item.courses));
      }
      
      // Get listings
      const { data: listingsData } = await supabase
        .from('coin_listings')
        .select('*')
        .eq('user_id', authUser.id);
        
      if (listingsData) {
        setListings(listingsData);
      }
      
      // Get saved items
      const { data: savedData } = await supabase
        .from('saved_items')
        .select('*')
        .eq('user_id', authUser.id);
        
      if (savedData) {
        setSavedItems(savedData);
      }
    } catch (error: any) {
      toast({
        title: "Error loading profile",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatarFile(e.target.files[0]);
    }
  };
  
  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      
      if (!user) return;
      
      let avatarUrl = user.avatar_url;
      
      // Upload avatar if changed
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const filePath = `avatars/${user.id}-${Math.random()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, avatarFile);
          
        if (uploadError) throw uploadError;
        
        avatarUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${filePath}`;
      }
      
      // Update profile
      const { error } = await supabase
        .from('profiles')
        .update({
          ...updatedProfile,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      setUser({ ...user, ...updatedProfile, avatar_url: avatarUrl });
      setIsEditMode(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };
  
  if (loading && !user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-royal"></div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Profile Header */}
            <div className="mb-8 bg-white rounded-xl shadow-sm border border-gold/10 p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {isEditMode ? (
                  <div className="relative">
                    <Avatar className="h-32 w-32">
                      {avatarFile ? (
                        <AvatarImage src={URL.createObjectURL(avatarFile)} alt="Profile" />
                      ) : (
                        user?.avatar_url ? (
                          <AvatarImage src={user.avatar_url} alt="Profile" />
                        ) : (
                          <AvatarFallback className="bg-royal text-white text-2xl">
                            {user?.username?.charAt(0).toUpperCase() || 'U'}
                          </AvatarFallback>
                        )
                      )}
                    </Avatar>
                    <label 
                      htmlFor="avatar-upload"
                      className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow-md cursor-pointer"
                    >
                      <Edit className="h-4 w-4 text-royal" />
                      <input 
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    </label>
                  </div>
                ) : (
                  <Avatar className="h-32 w-32">
                    {user?.avatar_url ? (
                      <AvatarImage src={user.avatar_url} alt="Profile" />
                    ) : (
                      <AvatarFallback className="bg-royal text-white text-2xl">
                        {user?.username?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                )}
                
                <div className="flex-1 text-center md:text-left">
                  {isEditMode ? (
                    <div className="space-y-4 max-w-lg">
                      <div>
                        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <Input
                          id="full_name"
                          name="full_name"
                          value={updatedProfile.full_name || ''}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                          Username
                        </label>
                        <Input
                          id="username"
                          name="username"
                          value={updatedProfile.username || ''}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <Input
                          id="location"
                          name="location"
                          value={updatedProfile.location || ''}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                          Bio
                        </label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={updatedProfile.bio || ''}
                          onChange={handleChange}
                          rows={4}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-3xl font-bold text-royal font-playfair">
                        {user?.full_name || 'Anonymous Collector'}
                      </h1>
                      <p className="text-gray-500">@{user?.username}</p>
                      
                      {user?.location && (
                        <div className="flex items-center justify-center md:justify-start mt-2">
                          <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                          <span className="text-gray-600 text-sm">{user.location}</span>
                        </div>
                      )}
                      
                      {user?.bio && (
                        <p className="text-gray-700 mt-4 max-w-2xl">{user.bio}</p>
                      )}
                    </>
                  )}
                </div>
                
                <div>
                  {isEditMode ? (
                    <div className="space-y-2">
                      <Button 
                        onClick={handleSaveProfile}
                        disabled={loading}
                        className="w-full bg-royal hover:bg-royal-light text-white"
                      >
                        Save Profile
                      </Button>
                      <Button 
                        onClick={() => setIsEditMode(false)}
                        variant="outline"
                        disabled={loading}
                        className="w-full"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Button 
                        onClick={() => setIsEditMode(true)}
                        variant="outline"
                        className="flex items-center"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                      <Button 
                        onClick={handleSignOut}
                        variant="outline"
                        className="flex items-center text-red-500 border-red-200 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Tabs Content */}
            <Tabs defaultValue="courses" className="w-full">
              <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-8">
                <TabsTrigger value="courses" className="text-lg flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  My Courses
                </TabsTrigger>
                <TabsTrigger value="listings" className="text-lg flex items-center">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  My Listings
                </TabsTrigger>
                <TabsTrigger value="saved" className="text-lg flex items-center">
                  <Heart className="h-4 w-4 mr-2" />
                  Saved
                </TabsTrigger>
              </TabsList>
              
              {/* My Courses Tab */}
              <TabsContent value="courses">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <Card key={course.id} className="overflow-hidden">
                        <div className="h-48 bg-gray-200 relative">
                          {course.image ? (
                            <img 
                              src={course.image} 
                              alt={course.title} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-royal/10">
                              <BookOpen className="h-12 w-12 text-royal/50" />
                            </div>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                            <div 
                              className="h-full bg-gold" 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{course.title}</CardTitle>
                          <p className="text-sm text-gray-500">
                            Instructor: {course.instructor}
                          </p>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                            {course.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-royal">
                              {course.progress}% Complete
                            </span>
                            <Button size="sm">Continue</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-600 mb-2">No courses yet</h3>
                      <p className="text-gray-500 mb-6">
                        You haven't enrolled in any courses yet.
                      </p>
                      <Button>Browse Courses</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              {/* My Listings Tab */}
              <TabsContent value="listings">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listings.length > 0 ? (
                    listings.map((listing) => (
                      <Card key={listing.id} className="overflow-hidden">
                        <div className="h-48 bg-gray-200">
                          {listing.image ? (
                            <img 
                              src={listing.image} 
                              alt={listing.title} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-royal/10">
                              <ShoppingCart className="h-12 w-12 text-royal/50" />
                            </div>
                          )}
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{listing.title}</CardTitle>
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                              {listing.status}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-royal">
                            ${listing.price.toFixed(2)}
                          </p>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                            {listing.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">
                              Listed on {new Date(listing.created_at).toLocaleDateString()}
                            </span>
                            <Button size="sm">Edit</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-600 mb-2">No listings yet</h3>
                      <p className="text-gray-500 mb-6">
                        You haven't created any coin listings yet.
                      </p>
                      <Button>Create Listing</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              {/* Saved Items Tab */}
              <TabsContent value="saved">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedItems.length > 0 ? (
                    savedItems.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="h-48 bg-gray-200">
                          {item.image ? (
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-royal/10">
                              <Heart className="h-12 w-12 text-royal/50" />
                            </div>
                          )}
                          <div className="absolute top-2 right-2 p-1 rounded-full bg-white shadow-sm">
                            <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
                          </div>
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                              {item.type}
                            </span>
                          </div>
                          {item.price && (
                            <p className="text-sm font-bold text-royal">
                              ${item.price.toFixed(2)}
                            </p>
                          )}
                        </CardHeader>
                        <CardContent className="pb-4">
                          <Button size="sm" variant="outline" className="w-full">
                            View Details
                          </Button>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-600 mb-2">No saved items</h3>
                      <p className="text-gray-500 mb-6">
                        You haven't saved any courses or listings yet.
                      </p>
                      <Button>Explore Content</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
