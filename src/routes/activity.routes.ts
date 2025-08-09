import { Router } from "express";
import { ActivityController } from "../controllers/activity.controller";
import ActivityRepository from "../repositories/activity.repository";
import { ActivityService } from "../services/activity.service";

const activityService = new ActivityService(ActivityRepository);
const activityController = new ActivityController(activityService);

const Activity_Routes = Router();

export default Activity_Routes;