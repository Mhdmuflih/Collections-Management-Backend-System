import mongoose from "mongoose";
import { generateAccountNumber } from "../config/generate-account";
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
            if(!accountCreatedData) {
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
}