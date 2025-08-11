import { Request, Response } from "express";
import { IActivityController } from "../interface/controllers-interfaces/IActivityController";
import { IActivityService } from "../interface/services-interface/IActivityService";
import { HTTP_STATUS } from "../constants/http-status";

export class ActivityController implements IActivityController {
    constructor(private activityService: IActivityService) { }

    async logActivity(req: Request, res: Response): Promise<void> {
        try {

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
            
        } catch (error: unknown) {
             if(error instanceof Error) {
                console.log("Failed to get activity time line", error.message);
                res.status(HTTP_STATUS.BAD_REQUEST).json({success: false, message: error.message});
            }
            console.log("Unknown error during get activity time line.");
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({success: false, message: "An Unknwon error while get activity time line"});
        }
    }

    async getBulkActivities(req: Request, res: Response): Promise<void> {
        try {
            
        } catch (error: unknown) {
             if(error instanceof Error) {
                console.log("Failed to get bulk activities", error.message);
                res.status(HTTP_STATUS.BAD_REQUEST).json({success: false, message: error.message});
            }
            console.log("Unknown error during get bulk activities.");
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({success: false, message: "An Unknwon error while get bulk activities"});
        }
    }
}