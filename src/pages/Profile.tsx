
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Edit, 
  Save, 
  Shield, 
  BookOpen, 
  Award,
  LogOut,
  AlertCircle
} from 'lucide-react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ConfigContext } from "@/App";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import ProfileCompletion from '@/components/profile/ProfileCompletion';
import AvatarUploader from '@/components/profile/AvatarUploader';
import ProfileThemeSelector from '@/components/profile/ProfileThemeSelector';

const Profile = () => {
  const { supabaseClient, supabaseConfigured } = useContext(ConfigContext);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  
  // Profile form state
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [themeColor, setThemeColor] = useState('#0B2C5E'); // Default royal blue
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  
  // Sample data for demo purposes (in a real app, this would come from Supabase)
  const userCourses = [
    {
      id: 1,
      title: "Ancient Coin Authentication",
      progress: 65,
      lastActivity: "2024-05-15",
      image: "https://images.unsplash.com/photo-1583485088034-697b5bc1b13a?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      title: "Modern Collectible Grading",
      progress: 30,
      lastActivity: "2024-05-10",
      image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=300&auto=format&fit=crop&q=80"
    }
  ];
  
  const userCoins = [
    {
      id: 1,
      title: "1854 Gold Double Eagle",
      status: "Verified",
      submittedDate: "2024-05-02",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      title: "Ancient Roman Denarius",
      status: "Pending",
      submittedDate: "2024-05-18",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      title: "Mughal Empire Gold Mohur",
      status: "Rejected",
      submittedDate: "2024-04-25",
      image: "https://images.unsplash.com/photo-1583485088034-697b5bc1b13a?w=300&auto=format&fit=crop&q=80"
    }
  ];
  
  const certificates = [
    {
      id: 1,
      title: "Advanced Coin Authentication",
      issueDate: "2024-03-15",
      instructor: "Dr. Eleanor Davies"
    },
    {
      id: 2,
      title: "Digital Collection Management",
      issueDate: "2024-02-10",
      instructor: "Thomas Wright"
    }
  ];

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      
      if (supabaseClient) {
        try {
          const { data: { session }, error } = await supabaseClient.auth.getSession();
          
          if (error) throw error;
          
          if (!session) {
            navigate('/authenticate');
            return;
          }
          
          // Get user profile
          const { data: profile, error: profileError } = await supabaseClient
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (profileError && profileError.code !== 'PGRST116') {
            throw profileError;
          }
          
          setUser(session.user);
          
          if (profile) {
            setName(profile.full_name || '');
            setBio(profile.bio || '');
            setPhone(profile.phone || '');
            setAvatarUrl(profile.avatar_url || '');
            setThemeColor(profile.theme_color || '#0B2C5E');
          } else {
            // Set defaults from auth metadata if profile doesn't exist yet
            setName(session.user.user_metadata?.full_name || '');
          }
        } catch (error: any) {
          console.error('Error fetching user data:', error);
          toast({
            title: "Error loading profile",
            description: error.message,
            variant: "destructive"
          });
        } finally {
          setLoading(false);
        }
      } else {
        // Demo mode for when Supabase is not configured
        setTimeout(() => {
          const demoUser = {
            id: '12345',
            email: 'demo@example.com',
            user_metadata: {
              full_name: 'Demo User',
              avatar_url: ''
            }
          };
          
          setUser(demoUser);
          setName('Demo User');
          setBio('Passionate coin collector with interests in ancient Roman and Indian coinage.');
          setPhone('+91 98765 43210');
          setThemeColor('#0B2C5E');
          setLoading(false);
        }, 1000);
      }
    };
    
    fetchUserData();
  }, [supabaseClient, navigate, toast]);
  
  const handleLogout = async () => {
    if (supabaseClient) {
      try {
        const { error } = await supabaseClient.auth.signOut();
        if (error) throw error;
        
        toast({
          title: "Logged out successfully",
          description: "You have been logged out of your account.",
        });
        
        navigate('/');
      } catch (error: any) {
        toast({
          title: "Error logging out",
          description: error.message,
          variant: "destructive"
        });
      }
    } else {
      // Demo mode
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      navigate('/');
    }
  };
  
  const handleAvatarChange = (file: File, previewUrl: string) => {
    setAvatarFile(file);
    setAvatarUrl(previewUrl);
  };
  
  const handleProfileUpdate = async () => {
    if (!supabaseClient || !user) return;
    
    setLoading(true);
    
    try {
      let newAvatarUrl = avatarUrl;
      
      // Upload avatar if changed
      if (avatarFile) {
        setUploadingAvatar(true);
        const fileExt = avatarFile.name.split('.').pop();
        const filePath = `avatars/${user.id}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabaseClient
          .storage
          .from('profiles')
          .upload(filePath, avatarFile);
          
        if (uploadError) throw uploadError;
        
        // Get the public URL
        const { data: urlData } = supabaseClient
          .storage
          .from('profiles')
          .getPublicUrl(filePath);
          
        newAvatarUrl = urlData.publicUrl;
        setUploadingAvatar(false);
      }
      
      // Update profile
      const { error } = await supabaseClient
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: name,
          bio,
          phone,
          avatar_url: newAvatarUrl,
          theme_color: themeColor,
          updated_at: new Date().toISOString()
        });
        
      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      
      setEditMode(false);
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setUploadingAvatar(false);
    }
  };

  // Create a profile object for the ProfileCompletion component
  const profileData = {
    full_name: name,
    bio,
    phone,
    avatar_url: avatarUrl,
    theme_color: themeColor
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gradient-to-b from-royal/5 to-white">
        <div className="container mx-auto px-4 py-16">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-t-4 border-royal rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Loading your profile...</p>
            </div>
          ) : !user ? (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-royal mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-royal mb-4">Authentication Required</h2>
              <p className="text-gray-600 mb-6">
                Please sign in to view your profile and access your courses.
              </p>
              <Link to="/authenticate">
                <Button>Sign In</Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Profile Header */}
              <div className="mb-12">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center space-y-4"
                  >
                    <AvatarUploader
                      avatarUrl={avatarUrl}
                      onAvatarChange={handleAvatarChange}
                      isUploading={uploadingAvatar}
                      name={name}
                      email={user.email}
                    />
                    
                    {!editMode && (
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-white" 
                        style={{ backgroundColor: themeColor }}
                        title="Your theme color"
                      />
                    )}
                    
                    {/* Profile Completion Component */}
                    <div className="w-full md:w-48">
                      <ProfileCompletion profile={profileData} />
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex-grow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="text-center md:text-left">
                      {editMode ? (
                        <Input 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Name"
                          className="text-3xl font-bold text-royal mb-2 max-w-md"
                        />
                      ) : (
                        <h1 className="text-3xl font-bold mb-2" style={{ color: themeColor || '#0B2C5E' }}>
                          {name || 'Unnamed User'}
                        </h1>
                      )}
                      
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          <span>{user.email}</span>
                        </div>
                        {phone && (
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            <span>{phone}</span>
                          </div>
                        )}
                        {user.created_at && (
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Member since {new Date(user.created_at).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                      
                      {editMode ? (
                        <Textarea 
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          placeholder="Tell us about yourself and your collection..."
                          className="mb-4 max-w-md"
                          rows={3}
                        />
                      ) : (
                        <p className="text-gray-700 mb-4 max-w-2xl">
                          {bio || 'No bio provided yet.'}
                        </p>
                      )}
                      
                      {editMode && (
                        <div className="mb-6 max-w-md">
                          <Input 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Your Phone Number"
                            className="mb-4"
                          />
                          
                          {/* Theme Color Selector */}
                          <ProfileThemeSelector 
                            selectedColor={themeColor}
                            onChange={setThemeColor}
                          />
                        </div>
                      )}
                      
                      <div className="flex flex-wrap items-center gap-2">
                        {editMode ? (
                          <>
                            <Button 
                              onClick={handleProfileUpdate} 
                              className="bg-royal hover:bg-royal-light text-white"
                              disabled={loading || uploadingAvatar}
                            >
                              <Save className="h-4 w-4 mr-2" />
                              Save Changes
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => setEditMode(false)}
                              disabled={loading}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <Button 
                            variant="outline" 
                            onClick={() => setEditMode(true)}
                            style={{ borderColor: themeColor, color: themeColor }}
                            className="hover:bg-royal/10"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Profile
                          </Button>
                        )}
                        
                        <Button 
                          variant="outline" 
                          onClick={handleLogout}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Profile Content */}
              <Tabs defaultValue="courses" className="w-full">
                <TabsList className="mb-8 flex flex-wrap justify-center sm:justify-start gap-2">
                  <TabsTrigger value="courses" className="flex items-center text-sm sm:text-base">
                    <BookOpen className="h-4 w-4 mr-2" />
                    My Courses
                  </TabsTrigger>
                  <TabsTrigger value="coins" className="flex items-center text-sm sm:text-base">
                    <Shield className="h-4 w-4 mr-2" />
                    My Coins
                  </TabsTrigger>
                  <TabsTrigger value="certificates" className="flex items-center text-sm sm:text-base">
                    <Award className="h-4 w-4 mr-2" />
                    Certificates
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="courses">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {userCourses.length > 0 ? (
                      userCourses.map((course) => (
                        <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
                          <div className="h-40 relative">
                            <img 
                              src={course.image} 
                              alt={course.title} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                              <h3 className="text-white font-bold">{course.title}</h3>
                            </div>
                          </div>
                          <CardContent className="p-6">
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-sm text-gray-600">
                                Last activity: {new Date(course.lastActivity).toLocaleDateString()}
                              </span>
                              <span className="font-medium text-royal">{course.progress}% complete</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-royal h-2.5 rounded-full" 
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                            <Button className="w-full mt-4">Continue Learning</Button>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-12">
                        <div className="w-16 h-16 bg-royal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <BookOpen className="h-8 w-8 text-royal" />
                        </div>
                        <h3 className="text-xl font-bold text-royal mb-2">No Courses Yet</h3>
                        <p className="text-gray-600 mb-6">
                          You haven't enrolled in any courses yet. Explore our course catalog to get started.
                        </p>
                        <Link to="/courses">
                          <Button>Browse Courses</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="coins">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {userCoins.length > 0 ? (
                      userCoins.map((coin) => (
                        <Card key={coin.id} className="overflow-hidden hover:shadow-md transition-shadow">
                          <div className="h-40 relative">
                            <img 
                              src={coin.image} 
                              alt={coin.title} 
                              className="w-full h-full object-cover"
                            />
                            <div 
                              className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded ${
                                coin.status === 'Verified' 
                                  ? 'bg-green-100 text-green-800' 
                                  : coin.status === 'Pending' 
                                    ? 'bg-amber-100 text-amber-800' 
                                    : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {coin.status}
                            </div>
                          </div>
                          <CardContent className="p-6">
                            <h3 className="font-bold text-lg text-royal mb-2">{coin.title}</h3>
                            <p className="text-sm text-gray-600 mb-4">
                              Submitted: {new Date(coin.submittedDate).toLocaleDateString()}
                            </p>
                            <Button 
                              variant={coin.status === 'Verified' ? 'default' : 'outline'} 
                              className="w-full"
                            >
                              {coin.status === 'Verified' 
                                ? 'View Certificate' 
                                : coin.status === 'Pending' 
                                  ? 'Check Status' 
                                  : 'View Details'}
                            </Button>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-12">
                        <div className="w-16 h-16 bg-royal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Shield className="h-8 w-8 text-royal" />
                        </div>
                        <h3 className="text-xl font-bold text-royal mb-2">No Coins Submitted</h3>
                        <p className="text-gray-600 mb-6">
                          You haven't submitted any coins for verification yet.
                        </p>
                        <Link to="/marketplace">
                          <Button>Verify Your Coins</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="certificates">
                  {certificates.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {certificates.map((cert) => (
                        <Card key={cert.id} className="overflow-hidden border-gold/20">
                          <CardHeader className="bg-royal/5 border-b border-gold/10">
                            <CardTitle className="text-royal">{cert.title}</CardTitle>
                            <CardDescription>
                              Issued: {new Date(cert.issueDate).toLocaleDateString()} • Instructor: {cert.instructor}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="p-6 flex justify-between items-center">
                            <div className="flex items-center">
                              <Award className="h-8 w-8 text-gold mr-3" />
                              <span className="text-gray-600">Certificate of Completion</span>
                            </div>
                            <Button variant="outline" size="sm">
                              Download
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-royal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="h-8 w-8 text-royal" />
                      </div>
                      <h3 className="text-xl font-bold text-royal mb-2">No Certificates Yet</h3>
                      <p className="text-gray-600 mb-6">
                        Complete courses to earn certificates and showcase your expertise.
                      </p>
                      <Link to="/courses">
                        <Button>Browse Courses</Button>
                      </Link>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
