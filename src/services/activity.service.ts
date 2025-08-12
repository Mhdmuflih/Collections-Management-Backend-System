import mongoose from "mongoose";
import { MESSAGES } from "../constants/messages";
import { ICreateActivity } from "../interface/interface";
import { IActivity } from "../interface/models-interfaces/interface";
import { IActivityRepository } from "../interface/repositories-interfaces/IActivityRepository";
import { IActivityService } from "../interface/services-interface/IActivityService";

export class ActivityService implements IActivityService {
    constructor(private activityRepository: IActivityRepository) { }

    async createActivity(id: string, action: string, userId: string, description?: string): Promise<IActivity | null> {
        try {
            let createData: ICreateActivity = {
                account: new mongoose.Types.ObjectId(id),
                action: action,
                description: description || "",
                performedBy: new mongoose.Types.ObjectId(userId)
            };
            const createdData = await this.activityRepository.createActivity(createData);
            if (!createdData) {
                throw new Error(MESSAGES.ACTIVITY_NOT_FOUND);
            }
            return createdData;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to create activity data.", error.message);
                throw new Error(`Error create activity data ${error.message}`);
            }
            throw new Error("An unknown error occurred during create activity data.");
        }
    }

    async getActivity(id: string): Promise<IActivity[] | null> {
        try {
            const activityData = await this.activityRepository.getActivitiesByAccount(id);
            if (!activityData) {
                throw new Error(MESSAGES.ACTIVITY_FAILED_TO_FETCH);
            }
            return activityData
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to get activity data.", error.message);
                throw new Error(`Error get activity data ${error.message}`);
            }
            throw new Error("An unknown error occurred during get activity data.");
        }
    }

    async getActivityBuilkData(accountId: string, page: number, limit: number): Promise<{ total: number; activityData: IActivity[]; }> {
        try {
            const activitiesData = await this.activityRepository.getActivitiesBulkData(accountId, page, limit);
            console.log(activitiesData, 'this is activities data')
            if(!activitiesData) {
                throw new Error(MESSAGES.ACTIVITY_BULK_DATA_FETCHED_FAILED);
            }
            return {total: activitiesData.total, activityData: activitiesData.data}
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to get bulk activity data.", error.message);
                throw new Error(`Error get bulk activity data ${error.message}`);
            }
            throw new Error("An unknown error occurred during get bulk activity data.");
        }
    }
}