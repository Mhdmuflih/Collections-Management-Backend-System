import { ICreateUser } from "../interface/interface";
import { IUser } from "../interface/models-interfaces/interface";
import { IUserRepository } from "../interface/repositories-interfaces/IUserRepository";
import User from "../models/user.model";
import { BaseRepository } from "./base.respository";

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

    async createUser(data: ICreateUser): Promise<IUser | null> {
        try {
            return this.create(data);
        } catch (error:unknown) {
            if(error instanceof Error) {
                throw new Error(`Error in createUser: ${error.message}`);
            }
            throw new Error("Unknown error in create user");
        }
    }
}

export default new UserRepository();