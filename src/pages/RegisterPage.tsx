import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button/button';
import { Input } from '@/components/ui/Input/input';
import { Label } from '@/components/ui/Label/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card/card';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/authService';
import { Loader2, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-6 lg:p-8">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          whileHover={{ y: -5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="px-8 py-10 sm:p-10">
            <div className="text-center mb-8">
              <motion.h2 
                className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Crie sua conta
              </motion.h2>
              <p className="text-gray-600 dark:text-gray-300">
                Preencha seus dados para se cadastrar
              </p>
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
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="name"
                    type="text"
                    required
                    className="pl-10 w-full py-3 border-0 border-b-2 border-gray-200 focus:border-primary focus:ring-0 bg-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="pl-10 w-full py-3 border-0 border-b-2 border-gray-200 focus:border-primary focus:ring-0 bg-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="pl-10 pr-10 w-full py-3 border-0 border-b-2 border-gray-200 focus:border-primary focus:ring-0 bg-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
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
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    )}
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="pl-10 pr-10 w-full py-3 border-0 border-b-2 border-gray-200 focus:border-primary focus:ring-0 bg-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
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
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    )}
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 dark:focus:ring-offset-gray-800"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      Criando conta...
                    </>
                  ) : 'Criar conta'}
                </Button>
              </motion.div>
            </form>
          </div>
          
          <motion.div 
            className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Já tem uma conta?{' '}
              <Link 
                to="/login" 
                className="font-medium text-primary hover:text-primary/80 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Faça login
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default RegisterPage;
