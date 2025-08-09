import { IAuthController } from "../interface/controllers-interfaces/IAuthController";
import { IAuthService } from "../interface/services-interface/IAuthService";

export class AuthController implements IAuthController {
    constructor(private authService: IAuthService) { }
}