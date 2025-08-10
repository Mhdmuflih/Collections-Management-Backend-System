import { ICreateUser, ILoginUser } from "../interface";
import { IUser } from "../models-interfaces/interface";

export interface IAuthService {
    register(data: ICreateUser): Promise<IUser | null>;
    login(loginData: ILoginUser): Promise<{accessToken: string, refreshToken: string, userData: IUser}>;
    validateRefreshToken(refreshToken: string): Promise<{accessToken: string, refreshToken: string, userData: IUser}>;
}