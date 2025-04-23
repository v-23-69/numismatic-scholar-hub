
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, BookOpen, User, ShoppingCart, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  const toggleNav = () => setIsOpen(!isOpen);
  const toggleSearch = () => setSearchActive(!searchActive);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "Community", path: "/community" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gold/10">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-10 w-10 bg-royal rounded-full flex items-center justify-center">
            <span className="text-gold font-bold text-xl">NS</span>
          </div>
          <span className="font-playfair text-royal font-bold text-xl tracking-tight">NumismaticScholar</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="px-3 py-2 text-gray-700 hover:text-royal transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}

          <div className="relative group ml-2">
            <button className="px-3 py-2 text-gray-700 hover:text-royal transition-colors duration-300 flex items-center">
              Resources <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="py-1">
                <Link to="/blog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gold/10">Blog & Articles</Link>
                <Link to="/guides" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gold/10">Guides</Link>
                <Link to="/events" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gold/10">Events</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Search and User Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <div className={`transition-all duration-300 ${searchActive ? 'w-64' : 'w-10'} overflow-hidden flex items-center border rounded-full`}>
            <button 
              onClick={toggleSearch}
              className="p-2 text-gray-500 hover:text-royal"
            >
              <Search className="h-5 w-5" />
            </button>
            <input 
              type="text" 
              placeholder="Search courses, coins, mentors..." 
              className={`${searchActive ? 'w-full px-2 py-1' : 'w-0'} outline-none transition-all duration-300`}
            />
          </div>
          <Link to="/cart" className="p-2 text-gray-500 hover:text-royal relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute top-0 right-0 bg-gold text-xs text-white rounded-full h-4 w-4 flex items-center justify-center">2</span>
          </Link>
          <Link to="/account" className="p-2 text-gray-500 hover:text-royal">
            <User className="h-5 w-5" />
          </Link>
          <Link to="/login">
            <Button variant="outline" className="border-royal text-royal hover:bg-royal hover:text-white">
              Sign In
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3">
          <button onClick={toggleSearch} className="p-2 text-gray-500 hover:text-royal">
            <Search className="h-5 w-5" />
          </button>
          <button onClick={toggleNav} className="p-2 text-gray-500 hover:text-royal">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Search */}
      <div className={`${searchActive ? 'block' : 'hidden'} md:hidden px-4 py-2 border-b`}>
        <div className="flex items-center border rounded-full px-3 py-1">
          <Search className="h-4 w-4 text-gray-500 mr-2" />
          <input 
            type="text" 
            placeholder="Search courses, coins, mentors..." 
            className="w-full outline-none"
          />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white shadow-md border-b`}>
        <div className="px-2 pt-2 pb-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gold/10 hover:text-royal"
              onClick={toggleNav}
            >
              {link.name}
            </Link>
          ))}
          <div className="px-3 py-2 text-gray-700">Resources</div>
          <Link to="/blog" className="block px-5 py-2 text-sm text-gray-700 hover:bg-gold/10">Blog & Articles</Link>
          <Link to="/guides" className="block px-5 py-2 text-sm text-gray-700 hover:bg-gold/10">Guides</Link>
          <Link to="/events" className="block px-5 py-2 text-sm text-gray-700 hover:bg-gold/10">Events</Link>
          
          <div className="mt-4 flex space-x-2 px-3">
            <Link to="/login" className="w-1/2">
              <Button variant="outline" className="w-full border-royal text-royal">
                Sign In
              </Button>
            </Link>
            <Link to="/register" className="w-1/2">
              <Button className="w-full bg-royal hover:bg-royal-light text-white">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
