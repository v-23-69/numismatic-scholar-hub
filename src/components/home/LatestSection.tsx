
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Star, Clock, Users } from 'lucide-react';

const LatestSection = () => {
  const latestCoins = [
    {
      id: 1,
      title: "1947 Indian Independence Coin",
      price: "₹15,000",
      image: "/placeholder.svg",
      grade: "MS-64",
      seller: "CoinMaster Pro"
    },
    {
      id: 2,
      title: "Mughal Empire Silver Rupee",
      price: "₹8,500",
      image: "/placeholder.svg",
      grade: "VF-30",
      seller: "Heritage Coins"
    },
    {
      id: 3,
      title: "British India Quarter Anna",
      price: "₹2,200",
      image: "/placeholder.svg",
      grade: "XF-45",
      seller: "Vintage Collection"
    }
  ];

  const latestCourses = [
    {
      id: 1,
      title: "Complete Guide to Indian Coin Grading",
      instructor: "Dr. Rajesh Kumar",
      price: "₹1,999",
      duration: "8 hours",
      students: 234,
      rating: 4.8
    },
    {
      id: 2,
      title: "Mughal Coins: History & Authentication",
      instructor: "Prof. Anjali Sharma",
      price: "₹2,499",
      duration: "12 hours",
      students: 189,
      rating: 4.9
    },
    {
      id: 3,
      title: "Coin Photography for Collectors",
      instructor: "Arjun Patel",
      price: "₹899",
      duration: "4 hours",
      students: 156,
      rating: 4.7
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-royal font-playfair mb-4">
            🔥 Latest Coins & Courses
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the newest additions to our marketplace and educational offerings
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Latest Coins */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-royal mb-6">Latest Coins</h3>
            <div className="space-y-4">
              {latestCoins.map((coin, index) => (
                <motion.div
                  key={coin.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={coin.image}
                      alt={coin.title}
                      className="w-16 h-16 rounded-lg object-cover bg-gray-100"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-royal">{coin.title}</h4>
                      <p className="text-sm text-gray-600">Grade: {coin.grade} • Seller: {coin.seller}</p>
                      <p className="text-lg font-bold text-gold">{coin.price}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6">
              <Link to="/coins-market">
                <Button variant="outline" className="w-full border-royal text-royal hover:bg-royal hover:text-white">
                  View All Coins
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Latest Courses */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-royal mb-6">Latest Courses</h3>
            <div className="space-y-4">
              {latestCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="space-y-2">
                    <h4 className="font-bold text-royal">{course.title}</h4>
                    <p className="text-sm text-gray-600">by {course.instructor}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {course.students} students
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                        {course.rating}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-gold">{course.price}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6">
              <Link to="/courses">
                <Button variant="outline" className="w-full border-royal text-royal hover:bg-royal hover:text-white">
                  View All Courses
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LatestSection;
