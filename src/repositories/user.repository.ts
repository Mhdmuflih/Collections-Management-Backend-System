import { ICreateUser } from "../interface/interface";
import { IUser } from "../interface/models-interfaces/interface";
import { IUserRepository } from "../interface/repositories-interfaces/IUserRepository";
import User from "../models/user.model";
import { BaseRepository } from "./base.respository";
import { MESSAGES } from "../constants/messages";
import { CreateUserDTO } from "../dto/create-user.dto";

class UserRepository extends BaseRepository<IUser> implements IUserRepository {
    constructor() {
        super(User);
    }

    async findByEmail(email: string): Promise<IUser | null> {
        try {
            return this.findOne({ email });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error in findByEmail: ${error.message}`);
            }
            throw new Error("Unknown error in findByEmail");
        }
    }

    async createUser(data: CreateUserDTO): Promise<IUser | null> {
        try {
            return this.create(data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error in createUser: ${error.message}`);
            }
            throw new Error("Unknown error in create user");
        }
    }

    async findById(userId: string): Promise<IUser | null> {
        try {
            return this.findOne({ _id: userId });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error in findById: ${error.message}`);
            }
            throw new Error("Unkown error in findById.");
        }
    }

    async updateFailedToAttempt(userId: string): Promise<IUser | null> {
        try {
            const user = await this.findById(userId);
            if (!user) {
                throw new Error(MESSAGES.USER_NOT_FOUND_WHILE_UPDATING_FAILED_ATTMPTS);
            }
            const updatedFailedAttempts = (user.failedAttempts ?? 0) + 1;
            let updatedData: Partial<IUser> = {
                failedAttempts: updatedFailedAttempts
            }

            if (updatedFailedAttempts >= 5) {
                updatedData.isLocked = true;
            }

            return this.update(userId, updatedData);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error in update data: ${error.message}`);
            }
            throw new Error("Unkown error in updatedata.");
        }
    }

    async resetFailedAttempts(userId: string): Promise<IUser | null> {
        try {
            return this.update(userId, { failedAttempts: 0 });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error in resetFailedAttempts: ${error.message}`);
            }
            throw new Error("Unknown error in resetFailedAttempts");
        }
    }

}

export default new UserRepository();