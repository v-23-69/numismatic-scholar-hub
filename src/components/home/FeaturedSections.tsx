
import { Link } from 'react-router-dom';
import { BookOpen, ShoppingBag, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  link, 
  linkText, 
  color 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  link: string; 
  linkText: string; 
  color: string;
}) => {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="royal-card p-8"
    >
      <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-4`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <Link to={link}>
        <Button variant="outline" className="border-royal text-royal hover:bg-royal hover:text-white">
          {linkText}
        </Button>
      </Link>
    </motion.div>
  );
};

const FeaturedSections = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-royal font-playfair mb-4">
            Discover the World of Numismatics
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our platform's key offerings — from expert-led courses to exclusive marketplace items,
            all within our trusted community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={BookOpen}
            title="Learn"
            description="Access expert-led courses on coin history, authentication, grading, and collection management."
            link="/courses"
            linkText="Browse Courses"
            color="bg-royal"
          />
          
          <FeatureCard 
            icon={ShoppingBag}
            title="Collect"
            description="Explore our curated marketplace of authentic, expert-verified coins and collectibles."
            link="/marketplace"
            linkText="Visit Marketplace"
            color="bg-gold"
          />
          
          <FeatureCard 
            icon={Users}
            title="Community"
            description="Join discussions with fellow enthusiasts, participate in events, and share your knowledge."
            link="/community"
            linkText="Join Community"
            color="bg-royal"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedSections;
