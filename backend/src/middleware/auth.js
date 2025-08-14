import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware que permite a continuação mesmo sem token
// Usa 'anonymous' como ID de usuário quando não há token
// ou quando o token é inválido
export const authenticateToken = (req, res, next) => {
  // Get token from header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Se não houver token, continua como usuário anônimo
  if (!token) {
    req.user = { id: 'anonymous' };
    return next();
  }

  // Verifica o token, mas continua mesmo se for inválido
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    try {
      if (err) {
        // Token inválido, continua como anônimo
        req.user = { id: 'anonymous' };
        return next();
      }

      // Tenta encontrar o usuário
      const user = await User.findById(decoded.userId).select('-password');
      
      if (!user) {
        // Usuário não encontrado, continua como anônimo
        req.user = { id: 'anonymous' };
        return next();
      }

      // Usuário autenticado com sucesso
      req.user = user;
      next();
    } catch (error) {
      console.error('Erro na autenticação:', error);
      // Em caso de erro, continua como anônimo
      console.error('Erro na autenticação:', error);
      req.user = { id: 'anonymous' };
      next();
    }
  });
};

export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: {
        code: 'FORBIDDEN',
        message: 'Acesso negado. Nível de acesso insuficiente.'
      }
    });
  }
  next();
};
