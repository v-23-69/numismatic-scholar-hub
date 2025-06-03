import { ConfigContext } from '@/context/ConfigContext';
import { useContext } from 'react';

export const useConfig = () => {
  return useContext(ConfigContext);
}; 