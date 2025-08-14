import { CreateAccountDTO } from "../../dto/create-account.dto";
import { UpdateAccountDTO } from "../../dto/update-account.dto";
import { ICreateAccount } from "../interface";
import { IAccount } from "../models-interfaces/interface";

export interface IAccountService {
    createAccount(createData: CreateAccountDTO, userId: string): Promise<IAccount | null>;
    getAllAccountData(page: number, limit: number, search?: string): Promise<{ total: number, accountData: IAccount[] }>
    getAccountData(accountId: string): Promise<IAccount | null>;
    updateAccount(accountId: string, updatesField: UpdateAccountDTO): Promise<IAccount>;
    softDelete(accountId: string): Promise<void>;
}