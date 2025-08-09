import { Document, Model } from "mongoose";
import { IBaseRepository } from "../interface/repositories-interfaces/IBaseRepository";

export class BaseRepository<T extends Document> implements IBaseRepository {
    constructor(private readonly model: Model<T>) { }
}