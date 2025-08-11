import { ICreateAccount } from "../interface";
import { IAccount } from "../models-interfaces/interface";

export interface IAccountService {
    createAccount(createData: ICreateAccount, userId: string): Promise<IAccount | null>;
}