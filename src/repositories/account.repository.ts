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
}

export default new AccountRepository();