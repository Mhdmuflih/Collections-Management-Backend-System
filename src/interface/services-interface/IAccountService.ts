import { ICreateAccount } from "../interface";
import { IAccount } from "../models-interfaces/interface";

export interface IAccountService {
    createAccount(createData: ICreateAccount, userId: string): Promise<IAccount | null>;
    getAllAccountData(page: number, limit: number, search?: string): Promise<{ total: number, accountData: IAccount[] }>
    getAccountData(accountId: string): Promise<IAccount | null>;
    updateAccount(accountId: string, updatesField: Partial<ICreateAccount>): Promise<IAccount>;
    softDelete(accountId: string): Promise<void>;
}