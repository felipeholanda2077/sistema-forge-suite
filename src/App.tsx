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
