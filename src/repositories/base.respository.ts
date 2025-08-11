import { Document, FilterQuery, Model } from "mongoose";
import { IBaseRepository } from "../interface/repositories-interfaces/IBaseRepository";

export class BaseRepository<T extends Document> implements IBaseRepository<T> {
    constructor(private readonly model: Model<T>) { }

    async findOne(filter: FilterQuery<T>): Promise<T | null> {
        try {
            return await this.model.findOne(filter).exec();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`An unknown error occurred in findOne: ${error.message}`);
            }
            throw new Error("An unknown non-error value was thrown in findOne");
        }
    }

    async create(data: Partial<T>): Promise<T | null> {
        try {
            const entity = new this.model(data);
            return await entity.save();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`An unknown error occurred in create: ${error.message}`);
            }
            throw new Error("An Unknown non-error value was throw in create.");
        }
    }

    async update(id: string, data: Partial<T>): Promise<T | null> {
        try {
            return await this.model.findByIdAndUpdate(id, { $set: data }, { new: true }).exec();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`An unknown error occurred in update: ${error.message}`);
            }
            throw new Error("An Unknown non-error value was throw in update.");
        }
    }

    async findWithPagination(filter: FilterQuery<T> = {}, page: number, limit: number, search?: string): Promise<{ total: number, data: T[] }> {
        try {

            if (search) {
                filter = {
                    ...filter,
                    $or: [
                        { accountNumber: { $regex: search, $options: "i" } },
                        { name: { $regex: search, $options: "i" } },
                        { email: { $regex: search, $options: "i" } },
                        { phone: { $regex: search, $options: "i" } },
                    ],
                };
            }

            const total = await this.model.countDocuments(filter).exec();
            const data = await this.model.find(filter).skip((page - 1) * limit).limit(limit).exec();
            return { total: total, data: data };
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`An unknown error occurred in find: ${error.message}`);
            }
            throw new Error("An Unknown non-error value was throw in find.");
        }
    }
}