import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Shield, ShoppingCart, Users } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
            Discover the World of{' '}
            <span className="text-royal">Numismatics</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-foreground/60 max-w-3xl mx-auto">
            Your gateway to ancient coins, expert verification, and a vibrant community of collectors.
            Learn, trade, and authenticate with confidence.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button size="lg" className="bg-royal hover:bg-royal/90 text-white">
                <BookOpen className="mr-2 h-5 w-5" />
                Start Learning
              </Button>
            </Link>
            <Link to="/verify-coins">
              <Button size="lg" variant="outline" className="border-royal text-royal hover:bg-royal/10">
                <Shield className="mr-2 h-5 w-5" />
                Verify Your Coins
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-foreground/5 border border-border">
            <BookOpen className="h-8 w-8 text-royal mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Expert Courses</h3>
            <p className="text-foreground/60">
              Learn from numismatic experts with comprehensive courses on coin history, grading, and authentication.
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-foreground/5 border border-border">
            <Shield className="h-8 w-8 text-royal mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Secure Verification</h3>
            <p className="text-foreground/60">
              Get your coins professionally verified with our state-of-the-art authentication system.
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-foreground/5 border border-border">
            <Users className="h-8 w-8 text-royal mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Vibrant Community</h3>
            <p className="text-foreground/60">
              Connect with fellow collectors, share knowledge, and participate in exclusive events.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-foreground/60 mb-8">
            Join thousands of collectors who trust Numismatic Scholar Hub for their numismatic needs.
          </p>
          <Link to="/authenticate">
            <Button size="lg" className="bg-royal hover:bg-royal/90 text-white">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
