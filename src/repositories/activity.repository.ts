import { ICreateActivity } from "../interface/interface";
import { IActivity } from "../interface/models-interfaces/interface";
import { IActivityRepository } from "../interface/repositories-interfaces/IActivityRepository";
import Activity from "../models/activity.model";
import { BaseRepository } from "./base.respository";

class ActivityRepository extends BaseRepository<IActivity> implements IActivityRepository {
    constructor() {
        super(Activity);
    }

    async createActivity(createData: ICreateActivity): Promise<IActivity | null> {
        try {
            return this.create(createData);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error in create activity: ${error.message}`);
            }
            throw new Error("Unkown error in carete activity.");
        }
    }

    async getActivitiesByAccount(id: string): Promise<IActivity[] | null> {
        try {
            return Activity.find({ account: id }).sort({ createdAt: -1 });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error in get activity: ${error.message}`);
            }
            throw new Error("Unkown error in get activity.");
        }
    }

    async getActivitiesBulkData(accountId: string, page: number, limit: number): Promise<{ total: number; data: IActivity[]; }> {
        try {
            const skip = (page - 1) * limit;

            const total = await Activity.countDocuments({ account: accountId });

            const data = await Activity.find({ account: accountId })
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });
                
            return { total, data };
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error in get bulk activity: ${error.message}`);
            }
            throw new Error("Unkown error in get bulk activity.");
        }
    }
}

export default new ActivityRepository();