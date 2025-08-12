import { IActivity } from "../models-interfaces/interface";

export interface IActivityService {
    createActivity(id: string, action: string, userId: string, description?: string): Promise<IActivity | null>;
    getActivity(id: string): Promise<IActivity[] | null>;
    getActivityBuilkData(accountId: string, page: number, limit: number): Promise<{ total: number; activityData: IActivity[]; }>;
}