
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSupabaseAuth } from './useSupabaseAuth';

const ALLOWED_SELLER_EMAILS = [
  'nsh.development.acc1.00@gmail.com',
];

const SELLER_PROTECTED_ROUTES = [
  '/seller-dashboard'
];

export const useSellerAccess = () => {
  const { user, isInitialized } = useSupabaseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [accessChecked, setAccessChecked] = useState(false);
  
  const isSellerAllowed = () => {
    if (!user || !user.email) return false;
    return ALLOWED_SELLER_EMAILS.includes(user.email);
  };

  // Protect seller routes
  useEffect(() => {
    if (isInitialized) {
      const isSellerRoute = SELLER_PROTECTED_ROUTES.some(route => 
        location.pathname.startsWith(route)
      );
      
      if (isSellerRoute && user && !isSellerAllowed()) {
        console.log('Unauthorized access to seller route, redirecting...');
        navigate('/coins-market', { replace: true });
      }
      
      setAccessChecked(true);
    }
  }, [user, isInitialized, location.pathname, navigate]);

  return {
    isSellerAllowed: isSellerAllowed(),
    userEmail: user?.email || null,
    accessChecked
  };
};
