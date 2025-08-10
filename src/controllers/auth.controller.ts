import { Request, Response } from "express";
import { IAuthController } from "../interface/controllers-interfaces/IAuthController";
import { IAuthService } from "../interface/services-interface/IAuthService";
import { HTTP_STATUS } from "../constants/http-status";
import { MESSAGES } from "../constants/messages";

export class AuthController implements IAuthController {
    constructor(private authService: IAuthService) { }

    async register(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password, role } = req.body;
            if (!name || !email || !password || !role) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: MESSAGES.ALL_FIELD_REQUIRED });
                return;
            }
            await this.authService.register(req.body);
            res.status(HTTP_STATUS.CREATED).json({ success: true, message: "User Registred Successfully." });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to registration controller.", error.message);
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: error.message });
            }
            console.log(" Unknown error during registration.");
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: "An Unknown error occured while registration." });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: MESSAGES.ALL_FIELD_REQUIRED });
            }
            const { accessToken, refreshToken, userData } = await this.authService.login(req.body);
            res.status(HTTP_STATUS.SUCCESS).json({ success: true, message: MESSAGES.LOGIN_SUCCESSFULL, accessToken, refreshToken, userData })
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to login controller.", error.message);
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: error.message });
            }
            console.log("Unknown error during login.");
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: "An Unknown error occured while login" });
        }
    }

    async validateRefreshToken(req: Request, res: Response): Promise<void> {
        try {
            const { refreshToken } = req.body;
            if(!refreshToken) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({success: false, message: MESSAGES.TOKEN_NOT_FOUND});
            }
            await this.authService.validateRefreshToken(refreshToken);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to refresh token validation controller.");
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: error.message });
            }
            console.log("Unknown error during refresh token validation.");
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: "An Unknown error occured while refresh token validation." });
        }
    }
}