import { ICreateAccount } from "../interface";
import { IAccount } from "../models-interfaces/interface";

export interface IAccountRepository {
    createAccount(createData: ICreateAccount): Promise<IAccount | null>
}