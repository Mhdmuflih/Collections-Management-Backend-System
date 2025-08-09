import { MESSAGES } from "../constants/messages";
import { ICreateUser } from "../interface/interface";
import { IUser } from "../interface/models-interfaces/interface";
import { IUserRepository } from "../interface/repositories-interfaces/IUserRepository";
import { IAuthService } from "../interface/services-interface/IAuthService";
import { passwordHashing } from "../utilities/bcrypt";

export class AuthService implements IAuthService {
    constructor(private userRepository: IUserRepository) { }

    async register(data: ICreateUser): Promise<IUser | any> {
        try {
            const existingUser = await this.userRepository.findByEmail(data.email);
            if (existingUser) {
                throw new Error(MESSAGES.ALLREADY_EXISTED_EMAIL);
            }
            const hashedPassword: string | undefined = await passwordHashing(data.password);
            console.log(hashedPassword, 'this is hashed password');
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
}