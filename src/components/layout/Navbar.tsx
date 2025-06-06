import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { useSellerAccess } from "@/hooks/useSellerAccess";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const { signOut, user } = useSupabaseAuth();
  const { isSellerAllowed } = useSellerAccess();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/authenticate');
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="shrink-0 flex items-center">
              <Link to="/">
                <img
                  className="h-8 w-auto"
                  src="/logo.svg"
                  alt="CoinGlobe"
                />
              </Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Home
              </Link>
              <Link
                to="/coins-market"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Marketplace
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Courses
              </Link>
              <Link
                to="/verify-coins"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Verification
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="shrink-0">
              {/* User Menu */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email} />
                        <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg z-[60]" align="end">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.user_metadata?.full_name || 'User'}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/buyer-dashboard')}>
                      Buyer Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/wishlist')}>
                      Wishlist
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/cart')}>
                      Cart
                    </DropdownMenuItem>
                    {isSellerAllowed && (
                      <DropdownMenuItem onClick={() => navigate('/seller-dashboard')}>
                        Seller Dashboard
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/authenticate">
                  <Button>
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isMenuOpen ? 'block' : 'none'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-800 hover:bg-gray-50"
          >
            Home
          </Link>
          <Link
            to="/coins-market"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-800 hover:bg-gray-50"
          >
            Marketplace
          </Link>
          <Link
            to="/courses"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-800 hover:bg-gray-50"
          >
            Courses
          </Link>
           <Link
            to="/verify-coins"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-800 hover:bg-gray-50"
          >
            Verification
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
