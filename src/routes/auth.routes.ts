import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import UserRepository from "../repositories/user.repository";
import { AuthService } from "../services/auth.service";

const authService = new AuthService(UserRepository);
const authController = new AuthController(authService);

const Auth_Routes = Router();

Auth_Routes.post("/register", authController.register.bind(authController));
Auth_Routes.post("/login", authController.login.bind(authController));
Auth_Routes.post("/refresh-token", authController.validateRefreshToken.bind(authController));

export default Auth_Routes;