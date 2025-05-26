
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { BookOpen, ShoppingBag, Users, Shield } from 'lucide-react';

const FeaturedSections = () => {
  const sections = [
    {
      icon: BookOpen,
      title: "Learn",
      description: "Master numismatics with expert-led courses covering history, grading, and market trends.",
      cta: "Start Learning",
      link: "/courses",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600"
    },
    {
      icon: ShoppingBag,
      title: "Collect",
      description: "Discover and acquire authenticated coins from trusted sellers worldwide.",
      cta: "Browse Collection",
      link: "/coins-market",
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600"
    },
    {
      icon: Users,
      title: "Connect",
      description: "Join a vibrant community of collectors, experts, and enthusiasts.",
      cta: "Join Community",
      link: "/community",
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600"
    },
    {
      icon: Shield,
      title: "Verify",
      description: "Get professional authentication and grading for your valuable coins.",
      cta: "Verify Now",
      link: "/verify-coins",
      color: "bg-gold/10 border-gold/20",
      iconColor: "text-gold"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-royal font-playfair mb-4">
            Discover the World of Numismatics
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you're a beginner or seasoned collector, our platform offers everything you need to explore, learn, and grow in the fascinating world of coin collecting.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-6 rounded-xl border-2 ${section.color} hover:shadow-lg transition-all duration-300 group`}
              >
                <Icon className={`h-12 w-12 ${section.iconColor} mb-4 group-hover:scale-110 transition-transform duration-300`} />
                <h3 className="text-xl font-bold text-royal mb-3">{section.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{section.description}</p>
                <Link to={section.link}>
                  <Button 
                    variant="outline" 
                    className="w-full border-royal text-royal hover:bg-royal hover:text-white transition-colors"
                  >
                    {section.cta}
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSections;
