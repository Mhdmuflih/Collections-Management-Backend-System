import { ICreateUser } from "../interface";
import { IUser } from "../models-interfaces/interface";

export interface IAuthService {
    register(data: ICreateUser): Promise<IUser | null>;
}