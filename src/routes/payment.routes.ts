import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller";
import PaymentRepository from "../repositories/payment.repository";
import { PaymentService } from "../services/payment.service";
import { authMiddleware } from "../middlewares/auth.middleware";

const paymentService = new PaymentService(PaymentRepository);
const paymentController = new PaymentController(paymentService);

const Payment_Routes = Router();

Payment_Routes.post("/account/:id/payments", authMiddleware, paymentController.recordPayment.bind(paymentController));
Payment_Routes.get("/account/:id/payments", authMiddleware, paymentController.getPaymentHistory.bind(paymentController));
Payment_Routes.put("/payments/:id", authMiddleware, paymentController.updatePaymentStatus.bind(paymentController));

export default Payment_Routes;