import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller";
import PaymentRepository from "../repositories/payment.repository";
import { PaymentService } from "../services/payment.service";

const paymentService = new PaymentService(PaymentRepository);
const paymentController = new PaymentController(paymentService);

const Payment_Routes = Router();

Payment_Routes.post("/account/:id/payments", paymentController.recordPayment.bind(paymentController));
Payment_Routes.get("/account/:id/payments", paymentController.getPaymentHistory.bind(paymentController));
Payment_Routes.put("/payments/:id", paymentController.updatePaymentStatus.bind(paymentController));

export default Payment_Routes;