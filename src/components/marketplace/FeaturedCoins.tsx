
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Heart, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const featuredCoinsData = [
  {
    id: 'featured-1',
    title: '1943 Steel Penny',
    price: 45000,
    originalPrice: 50000,
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&auto=format&fit=crop&q=80',
    region: 'United States',
    rarity: 'Extremely Rare',
    verified: true,
    discount: 10
  },
  {
    id: 'featured-2',
    title: 'Roman Denarius 100 BC',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1614030424754-24d0eebd46b2?w=600&auto=format&fit=crop&q=80',
    region: 'Roman Empire',
    rarity: 'Very Rare',
    verified: true
  },
  {
    id: 'featured-3',
    title: 'Morgan Silver Dollar 1893',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1567596388756-b5d7c0a8e8d5?w=600&auto=format&fit=crop&q=80',
    region: 'United States',
    rarity: 'Rare',
    verified: true
  },
  {
    id: 'featured-4',
    title: 'Indian Head Gold Eagle',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&auto=format&fit=crop&q=80',
    region: 'United States',
    rarity: 'Extremely Rare',
    verified: true
  }
];

const FeaturedCoins = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 bg-gradient-to-r from-royal/5 via-gold/5 to-royal/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-playfair text-royal mb-4">
            Featured Coins
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our hand-picked selection of exceptional coins from verified sellers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCoinsData.map((coin, index) => (
            <motion.div
              key={coin.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group cursor-pointer overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-royal/30">
                <div 
                  className="relative h-48 overflow-hidden"
                  onClick={() => navigate(`/coins-market/${coin.id}`)}
                >
                  <img 
                    src={coin.image} 
                    alt={coin.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {coin.verified && (
                    <div className="absolute top-3 right-3 bg-gold text-royal-dark text-xs font-bold px-2 py-1 rounded flex items-center">
                      <Shield className="h-3 w-3 mr-1" />
                      VERIFIED
                    </div>
                  )}
                  
                  {coin.discount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      -{coin.discount}%
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="bg-royal hover:bg-royal-light">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-gold border-gold text-xs">
                      {coin.region}
                    </Badge>
                    <Badge variant="outline" className="text-royal border-royal text-xs">
                      {coin.rarity}
                    </Badge>
                  </div>
                  
                  <h3 
                    className="font-semibold text-royal text-lg mb-2 line-clamp-2 cursor-pointer hover:text-gold transition-colors"
                    onClick={() => navigate(`/coins-market/${coin.id}`)}
                  >
                    {coin.title}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-royal">
                        ₹{coin.price.toLocaleString()}
                      </span>
                      {coin.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{coin.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-royal hover:bg-royal-light text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to cart logic would go here
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button 
            onClick={() => navigate('/coins-market')}
            className="bg-royal hover:bg-royal-light text-white px-8 py-3"
          >
            View All Coins
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoins;
