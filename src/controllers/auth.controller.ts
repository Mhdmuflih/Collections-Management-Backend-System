import { Request, Response } from "express";
import { IAuthController } from "../interface/controllers-interfaces/IAuthController";
import { IAuthService } from "../interface/services-interface/IAuthService";
import { HTTP_STATUS } from "../constants/http-status";

export class AuthController implements IAuthController {
    constructor(private authService: IAuthService) { }

    async register(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password, role } = req.body;
            if(!name || !email || !password || !role) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({success: false, message: "All Field is required!"});
                return;
            }
            console.log(req.body, "this is request of body.");
            await this.authService.register(req.body);
            res.status(HTTP_STATUS.CREATED).json({ success: true, message: "User Registred Successfully." });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to registration controller.", error.message);
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: error.message });
            } else {
                console.log(" Unknown error during registration.");
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: "An Unknown error occured while registration." })
            }
        }
    }
}