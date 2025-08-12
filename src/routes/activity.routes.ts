import { Router } from "express";
import { ActivityController } from "../controllers/activity.controller";
import ActivityRepository from "../repositories/activity.repository";
import { ActivityService } from "../services/activity.service";
import { authMiddleware } from "../middlewares/auth.middleware";

const activityService = new ActivityService(ActivityRepository);
const activityController = new ActivityController(activityService);

const Activity_Routes = Router();

Activity_Routes.post("/accounts/:id/activities", authMiddleware, activityController.logActivity.bind(activityController));
Activity_Routes.get("/accounts/:id/activities", authMiddleware, activityController.getActivityTimeline.bind(activityController));
Activity_Routes.get("/activities/bulk", authMiddleware, activityController.getBulkActivities.bind(activityController));

export default Activity_Routes;