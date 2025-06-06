
import { useSupabaseAuth } from './useSupabaseAuth';

const ALLOWED_SELLER_EMAILS = [
  'vishal23mentoratnsh@gmail.com',
  // Add more allowed seller emails here
];

export const useSellerAccess = () => {
  const { user } = useSupabaseAuth();
  
  const isSellerAllowed = () => {
    if (!user || !user.email) return false;
    return ALLOWED_SELLER_EMAILS.includes(user.email);
  };

  return {
    isSellerAllowed: isSellerAllowed(),
    userEmail: user?.email || null
  };
};
