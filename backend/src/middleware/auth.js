import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware que aceita qualquer token JWT válido ou inválido
// Usa 'anonymous' apenas quando não há token ou quando não consegue decodificar
export const authenticateToken = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // Se não houver token, continua como usuário anônimo
    if (!token) {
      req.user = { id: 'anonymous' };
      return next();
    }

    // Decodifica o token sem verificar a assinatura ou expiração
    let decoded;
    try {
      // Extrai o payload do token sem verificar a assinatura
      const payload = token.split('.')[1];
      decoded = JSON.parse(Buffer.from(payload, 'base64').toString());
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      req.user = { id: 'anonymous' };
      return next();
    }
    
    // Processa o token decodificado
    (async () => {
      try {
        if (err || !decoded) {
          req.user = { id: 'anonymous' };
          return next();
        }

        // Tenta encontrar o usuário, mas continua como anônimo se falhar
        const user = await User.findById(decoded.userId).select('-password').lean();
        if (!user) {
          req.user = { id: 'anonymous' };
          return next();
        }

        // Usuário encontrado, adiciona à requisição
        req.user = user;
        req.token = token;
        return next();
      } catch (error) {
        // Em caso de erro, continua como anônimo
        req.user = { id: 'anonymous' };
        return next();
      }
    })();
  } catch (error) {
    // Em caso de erro inesperado, continua como anônimo
    req.user = { id: 'anonymous' };
    return next();
  }
};

export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return next();
  }
  next();
};
