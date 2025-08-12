import { ICreateActivity } from "../interface";
import { IActivity } from "../models-interfaces/interface";

export interface IActivityRepository {
    createActivity(createData: ICreateActivity): Promise<IActivity | null>;
    getActivitiesByAccount(id: string): Promise<IActivity[] | null>;
    getActivitiesBulkData(accountId: string, page: number, limit: number): Promise<{ total: number; data: IActivity[]; }>;
}