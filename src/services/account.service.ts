import { IAccountRepository } from "../interface/repositories-interfaces/IAccountRepository";
import { IAccountService } from "../interface/services-interface/IAccountService";

export class AccountService implements IAccountService {
    constructor(private accountRepository: IAccountRepository) { }
}