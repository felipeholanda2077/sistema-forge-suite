import { Request, Response, NextFunction } from 'express';
import ApiRequest from '../models/ApiRequest';

export const logApiRequest = async (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  // Override res.json to capture the response
  const originalJson = res.json;
  res.json = function (body) {
    res.locals.responseBody = body;
    return originalJson.call(this, body);
  };

  res.on('finish', async () => {
    try {
      const duration = Date.now() - start;
      
      await ApiRequest.create({
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        responseTime: duration,
        user: (req as any).user?._id,
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent: req.get('user-agent'),
      });
    } catch (error) {
      console.error('Error logging API request:', error);
    }
  });

  next();
};
