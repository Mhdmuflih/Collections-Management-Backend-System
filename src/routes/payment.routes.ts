import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller";
import PaymentRepository from "../repositories/payment.repository";
import { PaymentService } from "../services/payment.service";
import { authMiddleware } from "../middlewares/auth.middleware";

const paymentService = new PaymentService(PaymentRepository);
const paymentController = new PaymentController(paymentService);

const Payment_Routes = Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management endpoints
 *
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64cddc3bfc13ae736b000101
 *         account:
 *           type: string
 *           description: ID of the linked account
 *           example: 64cddc3bfc13ae736b000201
 *         amount:
 *           type: number
 *           example: 150.75
 *         method:
 *           type: string
 *           example: Credit Card
 *         status:
 *           type: string
 *           enum: [pending, completed, failed]
 *           example: completed
 *         paymentDate:
 *           type: string
 *           format: date-time
 *           example: 2025-08-12T12:34:56.000Z
 *         recordedBy:
 *           type: string
 *           description: ID of the user who recorded the payment
 *           example: 64cddc3bfc13ae736b000301
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-08-12T12:34:56.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-08-12T13:34:56.000Z
 *
 *     RecordPaymentRequest:
 *       type: object
 *       required:
 *         - amount
 *         - method
 *       properties:
 *         amount:
 *           type: number
 *           example: 150.75
 *         method:
 *           type: string
 *           example: Credit Card
 *
 *     PaymentList:
 *       type: object
 *       properties:
 *         payments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Payment'
 *         total:
 *           type: number
 *           example: 20
 *
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Payment created successfully
 *
 * /api/payments/{id}:
 *   post:
 *     summary: Record a new payment for an account
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Account ID for the payment
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecordPaymentRequest'
 *     responses:
 *       200:
 *         description: Payment recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     paymentData:
 *                       $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Bad request (missing fields or invalid amount)
 *
 * /api/payments/history/{id}:
 *   get:
 *     summary: Get payment history for an account
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Account ID
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Payment history fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     paymentData:
 *                       $ref: '#/components/schemas/PaymentList'
 *       400:
 *         description: Bad request (missing account ID)
 *
 * /api/payments/status/{id}:
 *   patch:
 *     summary: Update payment status to verified
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Payment ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Bad request (missing payment ID)
 */

Payment_Routes.post("/accounts/:id/payments", authMiddleware, paymentController.recordPayment.bind(paymentController));
Payment_Routes.get("/accounts/:id/payments", authMiddleware, paymentController.getPaymentHistory.bind(paymentController));
Payment_Routes.put("/payments/:id", authMiddleware, paymentController.updatePaymentStatus.bind(paymentController));

export default Payment_Routes;