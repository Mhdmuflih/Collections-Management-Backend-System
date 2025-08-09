import { FilterQuery } from "mongoose";

export interface IBaseRepository<T> {
    findOne(filter: FilterQuery<T>): Promise<T | null>;
    create(data: Partial<T>): Promise<T | null>;
}