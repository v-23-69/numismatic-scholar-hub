import { useContext } from 'react';
import { ConfigContext } from '@/App';

export function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigContext.Provider');
  }
  return context;
} 