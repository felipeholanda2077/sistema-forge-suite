import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button/button';

export function AuthTest() {
  const { isAuthenticated, logout } = useAuth();
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Authentication Test</h1>
      <p className="mb-4">
        Current Auth Status: {isAuthenticated ? '✅ Authenticated' : '❌ Not Authenticated'}
      </p>
      {isAuthenticated && (
        <Button onClick={logout} variant="outline">
          Logout
        </Button>
      )}
    </div>
  );
}
