
import { useSupabaseAuth } from './useSupabaseAuth';

const ALLOWED_SELLER_EMAILS = [
  'nsh.development.acc1.00@gmail.com',
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
