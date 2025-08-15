import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import { Request } from 'express';
import dotenv from "dotenv";

dotenv.config();

const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max:  1000,
  message: 'Too many requests from this user, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

export default rateLimiter;
