import { ICreateUser, ILoginUser } from "../interface";
import { IUser } from "../models-interfaces/interface";

export interface IUserRepository {
    findByEmail(email: string): Promise<IUser | null>;
    createUser(data: ICreateUser): Promise<IUser | null>;
}