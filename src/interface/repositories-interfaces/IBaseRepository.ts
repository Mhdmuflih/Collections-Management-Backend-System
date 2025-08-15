import { FilterQuery, HydratedDocument } from "mongoose";

export interface IBaseRepository<T> {
    findOne(filter: FilterQuery<T>): Promise<T | null>;
    create(data: Partial<T>): Promise<T | null>;
    update(id: string, data: Partial<T>): Promise<T | null>
    findWithPagination(filter: FilterQuery<T>, page: number, limit: number, search?: string): Promise<{ total: number, data: T[] }>;
    createMany(data: Partial<T>[]): Promise<T[] | null>
}