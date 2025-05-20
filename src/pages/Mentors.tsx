
import { motion } from 'framer-motion';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, MessageCircle, Video } from 'lucide-react';

const mentors = [
  {
    id: 1,
    name: "Dr. Eleanor Davies",
    title: "Museum Curator & Historian",
    specialization: "Ancient Coins",
    bio: "Dr. Davies has over 20 years of experience in numismatics with a focus on ancient Greek and Roman coinage. She has worked with major museums across Europe.",
    rating: 4.9,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "James Wilson",
    title: "Master Grader & Collector",
    specialization: "Modern Collectibles",
    bio: "With a background in professional coin grading, James specializes in modern collectible coins and has evaluated over 50,000 coins in his career.",
    rating: 4.8,
    reviews: 97,
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Prof. Michael Torres",
    title: "University Historian",
    specialization: "European Coinage",
    bio: "Professor Torres teaches numismatic history at leading universities and has authored three books on the evolution of European coinage.",
    rating: 4.7,
    reviews: 85,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Sarah Johnson",
    title: "Professional Photographer",
    specialization: "Numismatic Photography",
    bio: "Sarah combines her expertise in photography and numismatics to teach collectors how to properly document and showcase their collections.",
    rating: 4.9,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Dr. Mei Zhang",
    title: "Historical Researcher",
    specialization: "Asian Coins",
    bio: "Dr. Zhang is a leading authority on Asian coinage history, with particular expertise in Chinese, Japanese, and Korean numismatic traditions.",
    rating: 4.8,
    reviews: 72,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Thomas Wright",
    title: "Software Engineer & Collector",
    specialization: "Digital Collection Management",
    bio: "Thomas helps collectors leverage technology for managing their collections, with expertise in database design and digital archiving.",
    rating: 4.6,
    reviews: 43,
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=600&auto=format&fit=crop"
  }
];

const Mentors = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-royal/10 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold font-playfair text-royal mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Learn from Expert Mentors
              </motion.h1>
              <motion.p 
                className="text-lg text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Connect with our hand-selected numismatic experts for personalized guidance,
                in-depth knowledge, and insider insights on coin collecting and authentication.
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* Mentors Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mentors.map((mentor, index) => (
                <motion.div 
                  key={mentor.id}
                  className="royal-card overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-16 w-16 mr-4">
                        {mentor.image ? (
                          <AvatarImage src={mentor.image} alt={mentor.name} />
                        ) : (
                          <AvatarFallback className="bg-royal text-white">
                            {mentor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-bold text-royal">{mentor.name}</h3>
                        <p className="text-gray-600">{mentor.title}</p>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.floor(mentor.rating) ? 'text-gold fill-gold' : 'text-gray-300'}`} 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">({mentor.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <span className="inline-block bg-royal/10 text-royal px-2 py-1 rounded text-sm font-medium">
                        {mentor.specialization}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{mentor.bio}</p>
                    
                    <div className="border-t pt-4">
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Book Session
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Video className="h-4 w-4 mr-2" />
                          View Courses
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 bg-royal/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-playfair text-3xl font-bold text-royal mb-4">How Mentorship Works</h2>
                <p className="text-gray-600">
                  Our mentorship program connects you directly with experienced numismatic experts
                  who can provide personalized guidance tailored to your collecting interests.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gold/10 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-royal text-white mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-royal mb-2">Choose a Mentor</h3>
                  <p className="text-gray-600">
                    Browse our expert profiles and select a mentor whose expertise aligns with your interests.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gold/10 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-royal text-white mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-royal mb-2">Book a Session</h3>
                  <p className="text-gray-600">
                    Schedule a one-on-one session at a time that works for you, in-person or virtually.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gold/10 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-royal text-white mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-royal mb-2">Grow Your Knowledge</h3>
                  <p className="text-gray-600">
                    Receive personalized advice, authentication help, and collecting strategies.
                  </p>
                </div>
              </div>
              
              <div className="text-center mt-12">
                <Button className="bg-royal hover:bg-royal-light text-white">
                  Become a Member to Access Mentors
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Mentors;
