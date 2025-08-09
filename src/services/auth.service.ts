import { IUserRepository } from "../interface/repositories-interfaces/IUserRepository";
import { IAuthService } from "../interface/services-interface/IAuthService";

export class AuthService implements IAuthService {
    constructor(private userRepository: IUserRepository) { }
}