import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button/button';
import { Input } from '@/components/ui/Input/input';
import { useAuth } from '@/hooks/useAuth';
import { authService, type LoginResponse } from '@/services/authService';
import { Loader2, Lock, Mail, Eye, EyeOff, Zap, Sparkles } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Call the auth service to login
      const response: LoginResponse = await authService.login(email, password);
      
      // Store the token and user data
      login(response.token);
      
      // Navigate to the intended page or home
      navigate(from, { replace: true });
    } catch (error: unknown) {
      console.error('Login error:', error);
      
      // Handle different error cases
      if (error && typeof error === 'object' && 'message' in error) {
        const errorMessage = error.message;
        if (typeof errorMessage === 'string') {
          setError(errorMessage);
        } else {
          setError('Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.');
        }
      } else {
        setError('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Pokémon colors
  const pokemonRed = '#FF0000';
  const pokemonYellow = '#FFDE00';
  const pokemonBlue = '#3B4CCA';
  const pokemonLightBlue = '#3B4CCA';

  // Floating Pokéball component
  const Pokeball = ({ style, delay = 0 }) => (
    <motion.div
      className="absolute pointer-events-none"
      style={style}
      initial={{ y: -50, opacity: 0 }}
      animate={{
        y: [0, -20, 0],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className="relative w-12 h-12">
        <div className="absolute w-full h-1/2 bg-red-600 rounded-t-full border-b-2 border-black"></div>
        <div className="absolute bottom-0 w-full h-1/2 bg-white rounded-b-full border-t-2 border-black"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-black"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full border border-black"></div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden bg-gradient-to-br from-blue-100 via-blue-200 to-red-100">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pokemon.png')] opacity-10"></div>
        {[...Array(5)].map((_, i) => (
          <Pokeball 
            key={i}
            delay={i * 0.5}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              scale: 0.5 + Math.random() * 1.5,
            }}
          />
        ))}
      </div>

      <motion.div 
        className="w-full max-w-md z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border-4 border-yellow-400"
          whileHover={{ y: -5, rotate: 0.5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="px-8 py-10 sm:p-10">
            <div className="text-center mb-8 relative">
              <motion.div
                className="absolute -top-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                <Sparkles className="h-8 w-8 text-yellow-400" />
              </motion.div>
              
              <motion.h2 
                className="text-4xl font-bold bg-gradient-to-r from-red-600 via-blue-600 to-yellow-400 bg-clip-text text-transparent mb-2 font-['Pokemon'] tracking-wider"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Bem-vindo Treinador!
              </motion.h2>
              <p className="text-gray-700 font-medium">
                Acesse sua Pokédex
              </p>
              <div className="mt-2 flex justify-center space-x-2">
                <div className="h-1 w-6 bg-red-500 rounded-full"></div>
                <div className="h-1 w-6 bg-yellow-400 rounded-full"></div>
                <div className="h-1 w-6 bg-blue-500 rounded-full"></div>
              </div>
            </div>
            
            {error && (
              <motion.div 
                className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 mb-6 rounded-r"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                  </div>
                </div>
              </motion.div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-blue-500" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="pl-10 w-full py-3 border-0 border-b-2 border-gray-300 focus:border-yellow-400 focus:ring-0 bg-transparent text-gray-800 font-medium placeholder-gray-400 focus:ring-2 focus:ring-yellow-200 rounded-lg transition-all duration-200"
                    placeholder="Seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-blue-500" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="pl-10 pr-10 w-full py-3 border-0 border-b-2 border-gray-300 focus:border-yellow-400 focus:ring-0 bg-transparent text-gray-800 font-medium placeholder-gray-400 focus:ring-2 focus:ring-yellow-200 rounded-lg transition-all duration-200"
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-yellow-500 hover:text-yellow-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-yellow-500 hover:text-yellow-600" />
                    )}
                  </button>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center justify-between"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Lembrar de mim
                  </label>
                </div>

                <div className="text-sm">
                  <Link 
                    to="/forgot-password" 
                    className="font-medium text-primary hover:text-primary/80 dark:text-primary-400 dark:hover:text-primary-300"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                >
                  <Button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border-2 border-yellow-400 rounded-full shadow-md text-sm font-bold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-all duration-200 transform hover:shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                        Carregando...
                      </>
                    ) : (
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 mr-2" />
                        <span>Iniciar Aventura!</span>
                      </div>
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            </form>
          </div>
          
          <motion.div 
            className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div 
              className="mt-6 text-center text-sm text-gray-700 font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="mb-2">Novo por aqui?</p>
              <Link
                to="/register"
                className="inline-flex items-center font-bold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Torne-se um Treinador Pokémon
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
