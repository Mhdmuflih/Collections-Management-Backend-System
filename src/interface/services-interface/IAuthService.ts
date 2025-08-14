import { CreateUserDTO } from "../../dto/create-user.dto";
import { LoginUserDTO } from "../../dto/login-user.dot";
import { ICreateUser, ILoginUser } from "../interface";
import { IUser } from "../models-interfaces/interface";

export interface IAuthService {
    register(data: CreateUserDTO): Promise<IUser | null>;
    login(loginData: LoginUserDTO): Promise<{accessToken: string, refreshToken: string, userData: IUser}>;
    validateRefreshToken(refreshToken: string): Promise<{accessToken: string, refreshToken: string, userData: IUser}>;
}