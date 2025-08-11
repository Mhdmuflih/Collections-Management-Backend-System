import { ICreateAccount } from "../interface";
import { IAccount } from "../models-interfaces/interface";

export interface IAccountRepository {
    createAccount(createData: ICreateAccount): Promise<IAccount | null>;
    getAllAccounts(page: number, limit: number, search?: string): Promise<{ total: number, data: IAccount[] }>
    getAccountById(accountId: string): Promise<IAccount | null>;
    updateById(accountId: string, updatesField: Partial<ICreateAccount>): Promise<IAccount | null>;
    deleteAccount(accountId: string): Promise<IAccount | null>;
}