import React from 'react';
import { Toaster } from "@/components/ui/Toaster/toaster";
import { Toaster as Sonner } from "@/components/ui/Sonner/sonner";
import { TooltipProvider } from "@/components/ui/Tooltip/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { AuthTest } from "./pages/AuthTest";
import Index from "./pages/Index";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { MicrofrontendProvider } from "./contexts/MicrofrontendContext";

const queryClient = new QueryClient();

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  console.log('PrivateRoute - isAuthenticated:', isAuthenticated);
  console.log('PrivateRoute - current path:', location.pathname);

  if (!isAuthenticated) {
    console.log('PrivateRoute - Redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log('PrivateRoute - Rendering protected content');
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MicrofrontendProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={
                <PrivateRoute>
                  <Index />
                </PrivateRoute>
              } />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              {/* Dashboard route removed - using Index as home */}
              <Route path="/test-auth" element={<AuthTest />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </MicrofrontendProvider>
  </QueryClientProvider>
);

export default App;
