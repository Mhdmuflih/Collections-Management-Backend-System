import { ICreateAccount } from "../interface/interface";
import { IAccount } from "../interface/models-interfaces/interface";
import { IAccountRepository } from "../interface/repositories-interfaces/IAccountRepository";
import Account from "../models/account.model";
import { BaseRepository } from "./base.respository";

class AccountRepository extends BaseRepository<IAccount> implements IAccountRepository {
    constructor() {
        super(Account);
    }

    async createAccount(createData: ICreateAccount): Promise<IAccount | null> {
        try {
            return this.create(createData);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error in create account: ${error.message}`);
            }
            throw new Error("Unkown error in carete account.");
        }
    }

    async getAllAccounts(page: number, limit: number, search?: string): Promise<{ total: number, data: IAccount[] }> {
        try {
            return this.findWithPagination({}, page, limit, search);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error in get all accounts: ${error.message}`);
            }
            throw new Error("Unkown error in get all accounts.");
        }
    }

    async getAccountById(accountId: string): Promise<IAccount | null> {
        try {
            return this.findOne({ _id: accountId });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error in get account: ${error.message}`);
            }
            throw new Error("Unkown error in get account.");
        }
    }

    async updateById(accountId: string, updatesField: Partial<ICreateAccount>): Promise<IAccount | null> {
        try {
            return await Account.findByIdAndUpdate(
                { _id: accountId },
                { $set: updatesField, updatedAt: new Date() },
                { new: true }
            ).exec();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error in update account: ${error.message}`);
            }
            throw new Error("Unkown error in update account.");
        }
    }

    async deleteAccount(accountId: string): Promise<IAccount | null> {
        try {
            return await Account.findByIdAndUpdate({_id: accountId}, {$set: {isDeleted: true}}, {new : true}).exec();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error in delete account: ${error.message}`);
            }
            throw new Error("Unkown error in delete account.");
        }
    }
}

export default new AccountRepository();