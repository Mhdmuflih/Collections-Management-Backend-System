import { JwtPayload } from "jsonwebtoken";
import { ICreateUser, ILoginUser } from "../interface";
import { IUser } from "../models-interfaces/interface";
import { CreateUserDTO } from "../../dto/create-user.dto";

export interface IUserRepository {
    findByEmail(email: string): Promise<IUser | null>;
    createUser(data: CreateUserDTO): Promise<IUser | null>;
    findById(userId: string | JwtPayload | undefined): Promise<IUser | null>
    updateFailedToAttempt(userId: string): Promise<IUser | null>;
    resetFailedAttempts(userId: string): Promise<IUser | null>;
}