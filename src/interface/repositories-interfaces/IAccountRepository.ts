import { CreateAccountDTO } from "../../dto/create-account.dto";
import { UpdateAccountDTO } from "../../dto/update-account.dto";
import { ICreateAccount } from "../interface";
import { IAccount } from "../models-interfaces/interface";

export interface IAccountRepository {
    createAccount(createData: CreateAccountDTO): Promise<IAccount | null>;
    getAllAccounts(page: number, limit: number, search?: string): Promise<{ total: number, data: IAccount[] }>
    getAccountById(accountId: string): Promise<IAccount | null>;
    updateById(accountId: string, updatesField: UpdateAccountDTO): Promise<IAccount | null>;
    deleteAccount(accountId: string): Promise<IAccount | null>;
    createManyAccount(data: ICreateAccount[]): Promise<IAccount | null>
}