import mongoose from "mongoose";
import { generateAccountNumber } from "../utilities/generate-account";
import { MESSAGES } from "../constants/messages";
import { ICreateAccount } from "../interface/interface";
import { IAccount } from "../interface/models-interfaces/interface";
import { IAccountRepository } from "../interface/repositories-interfaces/IAccountRepository";
import { IAccountService } from "../interface/services-interface/IAccountService";

export class AccountService implements IAccountService {
    constructor(private accountRepository: IAccountRepository) { }

    async createAccount(createData: ICreateAccount, userId: string): Promise<IAccount | null> {
        try {
            if (!createData || !userId) {
                throw new Error(MESSAGES.ALL_FIELD_REQUIRED);
            }
            const accountNumber = generateAccountNumber();
            if (!accountNumber) {
                throw new Error(MESSAGES.ACCOUNT_NUMBER_GENERATION_FAILED);
            }
            const accountData = {
                accountNumber,
                name: createData.name,
                email: createData.email,
                phone: createData.phone,
                address: createData.address,
                createdBy: new mongoose.Types.ObjectId(userId),
            }
            const accountCreatedData = await this.accountRepository.createAccount(accountData);
            if (!accountCreatedData) {
                throw new Error(MESSAGES.ACCOUNT_CREATION_FAILED);
            }
            return accountCreatedData;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to create account.", error.message);
                throw new Error(`Error create account ${error.message}`);
            }
            throw new Error("An unknown error occurred during create account.");
        }
    }

    async getAllAccountData(page: number, limit: number, search?: string): Promise<{ total: number, accountData: IAccount[] }> {
        try {
            const data = await this.accountRepository.getAllAccounts(page, limit, search);
            if (!data) {
                throw new Error(MESSAGES.GET_ALL_ACCOUTS_FAILD);
            }
            console.log(data, 'this is data');
            return { total: data.total, accountData: data.data };
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to get all accounts data.", error.message);
                throw new Error(`Error get all accounts data ${error.message}`);
            }
            throw new Error("An unknown error occurred during get all accounts data.");
        }
    }

    async getAccountData(accountId: string): Promise<IAccount | null> {
        try {
            const accountData = await this.accountRepository.getAccountById(accountId);
            if (!accountData) {
                throw new Error(MESSAGES.ACCOUNT_NOT_FOUND);
            }
            return accountData;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to get account data.", error.message);
                throw new Error(`Error get account data ${error.message}`);
            }
            throw new Error("An unknown error occurred during all account data.");
        }
    }

    async updateAccount(accountId: string, updatesField: Partial<ICreateAccount>): Promise<IAccount> {
        try {
            const accountData = await this.accountRepository.getAccountById(accountId);
            if (!accountData) {
                throw new Error(MESSAGES.ACCOUNT_NOT_FOUND)
            }
            const updatedData = await this.accountRepository.updateById(accountId, updatesField);
            if (!updatedData) {
                throw new Error(MESSAGES.ACCOUNT_UPDATE_FAILED);
            }
            return updatedData;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to update account data.", error.message);
                throw new Error(`Error update account data ${error.message}`);
            }
            throw new Error("An unknown error occurred during update account data.");
        }
    }

    async softDelete(accountId: string): Promise<void> {
        try {
            const accountData = await this.accountRepository.getAccountById(accountId);
            if(!accountData) {
                throw new Error(MESSAGES.ACCOUNT_NOT_FOUND);
            }
            if(accountData.isDeleted) {
                throw new Error(MESSAGES.ALREADY_DELETED_ACCOUNT);
            }
            const softDeleteData = await this.accountRepository.deleteAccount(accountId);
            if(!softDeleteData) {
                throw new Error(MESSAGES.ACCOUNT_SOFT_DELETE_FAILED);
            }
            return;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to soft delete account.", error.message);
                throw new Error(`Error soft delete account ${error.message}`);
            }
            throw new Error("An unknown error occurred during soft delete account.");
        }
    }
}