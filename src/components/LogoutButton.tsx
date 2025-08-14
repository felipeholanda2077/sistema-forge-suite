import React from 'react';
import { Button } from '@/components/ui/Button/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // Optional: Redirect to login page or home page after logout
      // You can use the router here if needed
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      className="text-red-600 hover:bg-red-50 hover:text-red-700"
    >
      <LogOut className="w-4 h-4 mr-2" />
      Sair
    </Button>
  );
};

export default LogoutButton;
