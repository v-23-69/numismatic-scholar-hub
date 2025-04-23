
import { motion } from 'framer-motion';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Robert Johnson",
    role: "Coin Collector",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    text: "The Authentication course completely transformed how I approach my collection. I've avoided several counterfeits thanks to the expert techniques I learned here.",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Museum Curator",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    text: "NumismaticScholar connected me with leading experts in the field. The community discussions have provided invaluable insights for our museum exhibitions.",
    rating: 5
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Hobbyist & Seller",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    text: "From hobbyist to verified seller in months! The marketplace gave me the confidence to start trading, with verification processes that ensure trust on both sides.",
    rating: 4
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  return (
    <div className="royal-card p-6 md:p-8 h-full flex flex-col">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img 
            src={testimonial.image} 
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold">{testimonial.name}</h4>
          <p className="text-sm text-gray-600">{testimonial.role}</p>
        </div>
      </div>
      
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < testimonial.rating ? 'text-gold fill-gold' : 'text-gray-300'}`} 
          />
        ))}
      </div>
      
      <p className="text-gray-700 italic flex-grow">{testimonial.text}</p>
      
      <div className="mt-6 pt-4 border-t border-gold/10 text-sm text-gray-600">
        Verified Member
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slidesToShow = 3;
  const totalSlides = Math.ceil(testimonials.length / slidesToShow);
  
  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };
  
  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };
  
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-royal font-playfair mb-4">
            From Our Community
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from our members about their experiences with our courses, marketplace, and community.
          </p>
        </motion.div>
        
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
          
          {totalSlides > 1 && (
            <div className="flex justify-center mt-8 space-x-4">
              <button 
                onClick={prevSlide}
                className="p-2 border border-royal text-royal rounded-full hover:bg-royal hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={nextSlide}
                className="p-2 border border-royal text-royal rounded-full hover:bg-royal hover:text-white transition-colors"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
