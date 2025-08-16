import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import { Request, Response } from 'express';

export const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many accounts created from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

export const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  message: 'Too many login attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request, res: Response) => {
    return (req.body?.email?.toLowerCase() || ipKeyGenerator(req as any, res as any));
  },
});
