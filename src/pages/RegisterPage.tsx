import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button/button';
import { Input } from '@/components/ui/Input/input';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/authService';
import { Loader2, User, Mail, Lock, Eye, EyeOff, Zap, Sparkles } from 'lucide-react';

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
      repeatType: 'reverse',
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

export function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const validatePassword = (password: string): { isValid: boolean; message: string } => {
    if (password.length < 6) {
      return { isValid: false, message: 'A senha deve ter pelo menos 6 caracteres' };
    }
    if (!/[0-9]/.test(password)) {
      return { isValid: false, message: 'A senha deve conter pelo menos um número' };
    }
    if (!/[a-z]/.test(password)) {
      return { isValid: false, message: 'A senha deve conter pelo menos uma letra minúscula' };
    }
    if (!/[A-Z]/.test(password)) {
      return { isValid: false, message: 'A senha deve conter pelo menos uma letra maiúscula' };
    }
    return { isValid: true, message: '' };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError('As senhas não coincidem');
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      return setError(passwordValidation.message);
    }

    try {
      setError('');
      setLoading(true);

      // Call the registration API
      const { token, user } = await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // Log the user in after successful registration
      login(token);

      // Redirect to dashboard after successful registration and login
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      console.error('Registration error:', err);

      // Handle specific error cases
      if (err.response?.data?.error === 'EMAIL_EXISTS') {
        setError('Este e-mail já está em uso. Por favor, use outro e-mail ou faça login.');
      } else if (err.response?.data?.error === 'VALIDATION_FAILED') {
        // Format validation errors into a user-friendly message
        const validationErrors = err.response.data.errors || [];
        const errorMessages = validationErrors.map((e: any) =>
          `- ${e.msg || 'Erro de validação'}`
        ).join('\n');
        setError(`Por favor, corrija os seguintes erros:\n${errorMessages}`);
      } else if (err.message && err.message.includes('Network Error')) {
        setError('Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.');
      } else {
        setError(err.message || 'Falha ao criar a conta. Por favor, tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

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
                Torne-se um Treinador!
              </motion.h2>
              <p className="text-gray-700 font-medium">
                Crie sua conta e comece sua jornada
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
                className="space-y-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-blue-500" />
                  </div>
                  <Input
                    id="name"
                    type="text"
                    required
                    className="pl-10 w-full py-3 border-0 border-b-2 border-gray-300 focus:border-yellow-400 focus:ring-0 bg-transparent text-gray-800 font-medium placeholder-gray-400 focus:ring-2 focus:ring-yellow-200 rounded-lg transition-all duration-200"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-blue-500" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="pl-10 w-full py-3 border-0 border-b-2 border-gray-300 focus:border-yellow-400 focus:ring-0 bg-transparent text-gray-800 font-medium placeholder-gray-400 focus:ring-2 focus:ring-yellow-200 rounded-lg transition-all duration-200"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-blue-500" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="pl-10 pr-10 w-full py-3 border-0 border-b-2 border-gray-300 focus:border-yellow-400 focus:ring-0 bg-transparent text-gray-800 font-medium placeholder-gray-400 focus:ring-2 focus:ring-yellow-200 rounded-lg transition-all duration-200"
                    placeholder="Sua senha (mín. 6 caracteres)"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={6}
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

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-blue-500" />
                  </div>
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="pl-10 pr-10 w-full py-3 border-0 border-b-2 border-gray-300 focus:border-yellow-400 focus:ring-0 bg-transparent text-gray-800 font-medium placeholder-gray-400 focus:ring-2 focus:ring-yellow-200 rounded-lg transition-all duration-200"
                    placeholder="Confirme sua senha"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-yellow-500 hover:text-yellow-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-yellow-500 hover:text-yellow-600" />
                    )}
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                >
                  <Button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border-2 border-yellow-400 rounded-full shadow-md text-sm font-bold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-all duration-200 transform hover:shadow-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                        Criando conta...
                      </>
                    ) : (
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 mr-2" />
                        <span>Começar Jornada!</span>
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
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="mt-6 text-center text-sm text-gray-700 font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="mb-2">Já é um treinador?</p>
              <Link
                to="/login"
                className="inline-flex items-center font-bold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Faça login na sua conta
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <div className="mt-2 flex justify-center space-x-2">
                <div className="h-1 w-6 bg-red-500 rounded-full"></div>
                <div className="h-1 w-6 bg-yellow-400 rounded-full"></div>
                <div className="h-1 w-6 bg-blue-500 rounded-full"></div>
              </div>

              
            </motion.div>

          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
