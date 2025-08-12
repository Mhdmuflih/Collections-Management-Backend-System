import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import UserRepository from "../repositories/user.repository";
import { AuthService } from "../services/auth.service";

const authService = new AuthService(UserRepository);
const authController = new AuthController(authService);

const Auth_Routes = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and authorization endpoints
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64cddc3bfc13ae736b000101
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           example: johndoe@example.com
 *         role:
 *           type: string
 *           enum: [Admin, Manager, Agent, Viewer]
 *           example: Viewer
 *         isLocked:
 *           type: boolean
 *           example: false
 *         failedAttempts:
 *           type: number
 *           example: 0
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-08-12T12:34:56.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-08-12T13:34:56.000Z
 *
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           example: johndoe@example.com
 *         password:
 *           type: string
 *           example: StrongP@ssw0rd
 *         role:
 *           type: string
 *           enum: [Admin, Manager, Agent, Viewer]
 *           example: Viewer
 *
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: johndoe@example.com
 *         password:
 *           type: string
 *           example: StrongP@ssw0rd
 *
 *     RefreshTokenRequest:
 *       type: object
 *       required:
 *         - checkRefreshToken
 *       properties:
 *         checkRefreshToken:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Login successful
 *         accessToken:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR...
 *         refreshToken:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR...
 *         userData:
 *           $ref: '#/components/schemas/User'
 *
 *     SuccessMessage:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: User registered successfully
 *
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessMessage'
 *       400:
 *         description: Missing required fields or invalid data
 *
 * /api/auth/login:
 *   post:
 *     summary: Authenticate a user and return tokens
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Invalid credentials or missing fields
 *
 * /api/auth/refresh-token:
 *   post:
 *     summary: Validate refresh token and issue new tokens
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenRequest'
 *     responses:
 *       200:
 *         description: New tokens generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Missing or invalid refresh token
 */

Auth_Routes.post("/register", authController.register.bind(authController));
Auth_Routes.post("/login", authController.login.bind(authController));
Auth_Routes.post("/refresh-token", authController.validateRefreshToken.bind(authController));

export default Auth_Routes;