import { IUser } from "../interface/models-interfaces/model.interface";
import { IUserRepository } from "../interface/repositories-interfaces/IUserRepository";
import User from "../models/user.model";
import { BaseRepository } from "./base.respository";

class UserRepository extends BaseRepository<IUser> implements IUserRepository {
    constructor() {
        super(User);
    }
}

export default new UserRepository();