import React, { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/Toaster/toaster";
import { Toaster as Sonner } from "@/components/ui/Sonner/sonner";
import { TooltipProvider } from "@/components/ui/Tooltip/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { MicrofrontendProvider } from "./contexts/MicrofrontendContext";
import ContactWidget from "./components/ui/ContactWidget/ContactWidget";

// Lazy load components
const LoginPage = lazy(() => import("./pages/LoginPage").then(module => ({ default: module.LoginPage })));
const RegisterPage = lazy(() => import("./pages/RegisterPage").then(module => ({ default: module.RegisterPage })));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage").then(module => ({ default: module.ForgotPasswordPage })));
const AuthTest = lazy(() => import("./pages/AuthTest").then(module => ({ default: module.AuthTest })));
const Index = lazy(() => import("./pages/Index").then(module => ({ default: module.default })));
const ProfilePage = lazy(() => import("./pages/ProfilePage").then(module => ({ default: module.default })));

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const queryClient = new QueryClient();

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [authChecked, setAuthChecked] = React.useState(false);
  
  React.useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      console.log('Auth check - token exists:', !!token);
      
      // If no token, we're definitely not authenticated
      if (!token) {
        console.log('No auth token found');
        setAuthChecked(true);
        return;
      }
      
      // If we have a token, check if auth context is ready
      if (isAuthenticated !== undefined) {
        console.log('Auth context is ready');
        setAuthChecked(true);
      } else {
        // If auth context isn't ready yet, wait a bit and check again
        console.log('Auth context not ready, waiting...');
        const timer = setTimeout(() => {
          console.log('Auth context check timeout');
          setAuthChecked(true);
        }, 1000);
        
        return () => clearTimeout(timer);
      }
    };
    
    checkAuth();
  }, [isAuthenticated]);

  // Show loading state while checking auth
  if (!authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  console.log('User is authenticated, rendering protected content');
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
            <ContactWidget />
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={
                  <PrivateRoute>
                    <Index />
                  </PrivateRoute>
                } />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/test-auth" element={<AuthTest />} />
                <Route path="/profile" element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </MicrofrontendProvider>
  </QueryClientProvider>
);

export default App;
