import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button/button';
import { Input } from '@/components/ui/Input/input';
import { Loader2, Mail, ArrowLeft } from 'lucide-react';
import { authService } from '@/services/authService';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [resetLink, setResetLink] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Por favor, insira seu endereço de e-mail.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');
    setResetLink('');

    try {
      const response = await authService.forgotPassword(email);
      setMessage(response.message);
      
      // If we're in development and got a reset URL from the backend, show it
      if (process.env.NODE_ENV === 'development' && response.resetUrl) {
        setResetLink(response.resetUrl);
        console.log('Reset Link:', response.resetUrl);
      }
    } catch (err: unknown) {
      console.error('Erro ao solicitar recuperação de senha:', err);
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.';
      setError(errorMessage);
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
                Redefinir senha
              </motion.h2>
              <p className="text-gray-600 dark:text-gray-300">
                Digite seu e-mail para receber o link de redefinição
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

            {message ? (
              <motion.div 
                className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 mb-6 rounded-r"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="space-y-3">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700 dark:text-green-300">{message}</p>
                    </div>
                  </div>
                  
                  {resetLink && (
                    <div className="mt-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded border border-green-200 dark:border-green-900">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Link de redefinição (apenas para desenvolvimento):</p>
                      <div className="flex items-center">
                        <a 
                          href={resetLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary dark:text-primary-400 hover:underline break-all"
                        >
                          {resetLink}
                        </a>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(resetLink);
                            // You could add a toast notification here
                          }}
                          className="ml-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          title="Copiar link"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="pl-10 w-full py-3 border-0 border-b-2 border-gray-200 focus:border-primary focus:ring-0 bg-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      placeholder="Seu e-mail cadastrado"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
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
                        Enviando...
                      </>
                    ) : 'Enviar link de recuperação'}
                  </Button>
                </motion.div>
              </form>
            )}
          </div>
          
          <motion.div 
            className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link 
              to="/login" 
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 dark:text-primary-400 dark:hover:text-primary-300"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Voltar para o login
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ForgotPasswordPage;
