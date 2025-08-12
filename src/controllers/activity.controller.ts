import { Request, Response } from "express";
import { IActivityController } from "../interface/controllers-interfaces/IActivityController";
import { IActivityService } from "../interface/services-interface/IActivityService";
import { HTTP_STATUS } from "../constants/http-status";
import { MESSAGES } from "../constants/messages";

export class ActivityController implements IActivityController {
    constructor(private activityService: IActivityService) { }

    async logActivity(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { action, description } = req.body;
            const userId = req.headers["x-user-id"] as string;
            if (!id || !userId || !action) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: MESSAGES.ALL_FIELD_REQUIRED });
                return;
            }

            await this.activityService.createActivity(id, action, userId, description);
            res.status(HTTP_STATUS.SUCCESS).json({ success: true, message: MESSAGES.ACTIVITY_CREATED });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to log activity", error.message);
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: error.message });
            }
            console.log("Unknown error during log activity.");
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: "An Unknwon error while log activity." });
        }
    }

    async getActivityTimeline(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: MESSAGES.ALL_FIELD_REQUIRED });
                return;
            }
            const activityData = await this.activityService.getActivity(id);
            res.status(HTTP_STATUS.SUCCESS).json({ success: true, message: MESSAGES.ACTIVITY_FETCHED_SUCCESSFULL, activityData });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to get activity time line", error.message);
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: error.message });
            }
            console.log("Unknown error during get activity time line.");
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: "An Unknwon error while get activity time line" });
        }
    }

    async getBulkActivities(req: Request, res: Response): Promise<void> {
        try {
            const { accountId, page, limit, } = req.query;
            if (!accountId || !page || !limit) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: MESSAGES.ALL_FIELD_REQUIRED });
                return;
            }
            const activitiesData = await this.activityService.getActivityBuilkData(accountId as string, Number(page), Number(limit));
            res.status(HTTP_STATUS.SUCCESS).json({success: true, message: MESSAGES.ACTIVITY_BULK_DATA_FETCHED_SUCCESSFULL, activitiesData});
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to get bulk activities", error.message);
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: error.message });
            }
            console.log("Unknown error during get bulk activities.");
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: "An Unknwon error while get bulk activities" });
        }
    }
}