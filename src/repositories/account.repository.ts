import { IAccount } from "../interface/models-interfaces/model.interface";
import { IAccountRepository } from "../interface/repositories-interfaces/IAccountRepository";
import Account from "../models/account.model";
import { BaseRepository } from "./base.respository";

class AccountRepository extends BaseRepository<IAccount> implements IAccountRepository {
    constructor() {
        super(Account);
    }
}

export default new AccountRepository();