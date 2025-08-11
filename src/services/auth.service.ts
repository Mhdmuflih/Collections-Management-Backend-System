import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../config/jwt";
import { MESSAGES } from "../constants/messages";
import { ICreateUser, ILoginUser } from "../interface/interface";
import { IUser } from "../interface/models-interfaces/interface";
import { IUserRepository } from "../interface/repositories-interfaces/IUserRepository";
import { IAuthService } from "../interface/services-interface/IAuthService";
import { passwordCompaire, passwordHashing } from "../utilities/bcrypt";

export class AuthService implements IAuthService {
    constructor(private userRepository: IUserRepository) { }

    async register(data: ICreateUser): Promise<IUser | any> {
        try {
            const existingUser = await this.userRepository.findByEmail(data.email);
            if (existingUser) {
                throw new Error(MESSAGES.ALLREADY_EXISTED_EMAIL);
            }
            const hashedPassword: string | undefined = await passwordHashing(data.password);
            const user: ICreateUser = {
                name: data.name,
                email: data.email,
                password: hashedPassword as string,
                role: data.role
            }
            const createUser: IUser | null = await this.userRepository.createUser(user);
            if (!createUser) {
                throw new Error(MESSAGES.FAILED_TO_CREATE);
            }
            return null;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to registration service.", error.message);
                throw new Error(`Error creating user servcie ${error.message}`);
            }
        }
    }

    async login(loginData: ILoginUser): Promise<{ accessToken: string, refreshToken: string, userData: IUser }> {
        try {
            const userData: IUser | null = await this.userRepository.findByEmail(loginData.email);
            if (!userData) {
                throw new Error(MESSAGES.USER_NOT_FOUND);
            }

            if (userData.isLocked) {
                throw new Error(MESSAGES.USER_BLOCKED);
            }

            const compairePassword: boolean | undefined = await passwordCompaire(loginData.password, userData.password);
            if (!compairePassword) {
                throw new Error(MESSAGES.PASSWORD_IS_INCORRECT);
            }

            const accessToken: string = generateAccessToken(userData.id.toString() as string, userData.role);
            const refreshToken: string = generateRefreshToken(userData.id.toString() as string, userData.role);
            return { accessToken, refreshToken, userData };
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to login service.", error.message);
                throw new Error(`Error login user service ${error.message}`);
            }
            throw new Error("An unknown error occurred during login.");
        }
    }

    async validateRefreshToken(checkRefreshToken: string): Promise<{ accessToken: string; refreshToken: string; userData: IUser; }> {
        try {
            const decode = verifyRefreshToken(checkRefreshToken);
            const userData = await this.userRepository.findById(decode.userId);
            if (!userData) {
                throw new Error(MESSAGES.USER_NOT_FOUND);
            }

            const accessToken: string = generateAccessToken(userData.id.toString() as string, userData.role);
            const refreshToken: string = generateRefreshToken(userData.id.toString() as string, userData.role);
            return { accessToken, refreshToken, userData };
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to refresh token valid service.");
                throw new Error(`Error refresh token valid service ${error.message}`);
            }
            throw new Error("An unknown error occurred during refresh token valid.");
        }
    }
}