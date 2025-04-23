
import { motion } from 'framer-motion';
import { Users, BookOpen, Shield, Award } from 'lucide-react';

const StatItem = ({ 
  icon: Icon, 
  value, 
  label, 
  delay 
}: { 
  icon: React.ElementType; 
  value: string; 
  label: string; 
  delay: number;
}) => {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-royal/10 text-royal rounded-full mb-4">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-3xl font-bold text-royal mb-2 font-playfair">
        {value}
      </h3>
      <p className="text-gray-600">
        {label}
      </p>
    </motion.div>
  );
};

const TrustStats = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-royal/5">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-royal font-playfair mb-4">
            Trusted by Collectors Worldwide
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our growing community of numismatists and collectors rely on our platform for 
            authentication, education, and trusted marketplace transactions.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem 
            icon={Users}
            value="10,000+"
            label="Active Members"
            delay={0.1}
          />
          <StatItem 
            icon={Shield}
            value="1,500+"
            label="Verified Coins"
            delay={0.2}
          />
          <StatItem 
            icon={BookOpen}
            value="50+"
            label="Expert Courses"
            delay={0.3}
          />
          <StatItem 
            icon={Award}
            value="25+"
            label="Certified Mentors"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
