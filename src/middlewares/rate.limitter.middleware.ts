import rateLimit from 'express-rate-limit';
import { Request } from 'express';

const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 1000,
  message: 'Too many requests from this user, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request): string => {
    return req.ip as string;
  },
});

export default rateLimiter;
