import { Router } from "express";
import { ActivityController } from "../controllers/activity.controller";
import ActivityRepository from "../repositories/activity.repository";
import { ActivityService } from "../services/activity.service";
import { authMiddleware } from "../middlewares/auth.middleware";

const activityService = new ActivityService(ActivityRepository);
const activityController = new ActivityController(activityService);

const Activity_Routes = Router();

/**
 * @swagger
 * tags:
 *   name: Activities
 *   description: API for logging and fetching account activities
 *
 * components:
 *   schemas:
 *     Activity:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64fa2c44b87d6c8e24f0a123
 *         account:
 *           type: string
 *           example: 64fa2c44b87d6c8e24f0a999
 *         action:
 *           type: string
 *           example: "Account Updated"
 *         performedBy:
 *           type: string
 *           example: 64fa2c44b87d6c8e24f0a888
 *         description:
 *           type: string
 *           example: "Updated phone number"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-08-12T09:00:00.000Z
 *
 * /accounts/{id}/activities:
 *   post:
 *     summary: Log an activity for a specific account
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Account ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action
 *             properties:
 *               action:
 *                 type: string
 *                 example: "Account Created"
 *               description:
 *                 type: string
 *                 example: "New account was registered"
 *     responses:
 *       200:
 *         description: Activity logged successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 success: true
 *                 message: "Activity created successfully."
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized
 *   get:
 *     summary: Get activity timeline for an account
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Account ID
 *     responses:
 *       200:
 *         description: Activity timeline fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Activity fetched successfully."
 *                 activityData:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Activity'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *
 * /activities/bulk:
 *   get:
 *     summary: Get paginated bulk activities for an account
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: accountId
 *         required: true
 *         schema:
 *           type: string
 *         description: Account ID
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Bulk activities fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Bulk activities fetched successfully."
 *                 activitiesData:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Activity'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

Activity_Routes.post("/accounts/:id/activities", authMiddleware, activityController.logActivity.bind(activityController));
Activity_Routes.get("/accounts/:id/activities", authMiddleware, activityController.getActivityTimeline.bind(activityController));
Activity_Routes.get("/activities/bulk", authMiddleware, activityController.getBulkActivities.bind(activityController));

export default Activity_Routes;