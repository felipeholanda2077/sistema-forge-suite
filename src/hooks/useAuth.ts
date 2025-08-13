import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext/context';
import type { AuthContextType } from '../contexts/AuthContext/context';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
