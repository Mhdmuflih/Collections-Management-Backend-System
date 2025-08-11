import { Request, Response } from "express";
import { IPaymentController } from "../interface/controllers-interfaces/IPaymentController";
import { IPaymentService } from "../interface/services-interface/IPaymentService";
import { HTTP_STATUS } from "../constants/http-status";
import { MESSAGES } from "../constants/messages";

export class PaymentController implements IPaymentController {
    constructor(private paymentService: IPaymentService) { }

    async recordPayment(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { amount, method } = req.body;
            const userId = req.headers['x-user-id'];
            if (!id || !amount || !method || !userId) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: MESSAGES.ALL_FIELD_REQUIRED });
                return;
            }
            if (isNaN(amount) || amount <= 0) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: "Invalid amount" });
                return;
            }

            const paymentData = await this.paymentService.recordPayment(id, amount, method, userId as string);
            res.status(HTTP_STATUS.SUCCESS).json({ success: true, message: MESSAGES.PAYMENT_CREATE_SUCCESSFULL, paymentData: paymentData });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to recode payment.", error.message);
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: error.message });
            }
            console.log("Unknown error during record payment.");
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: "An Unknown error occurred while record payment." });
        }
    }

    async getPaymentHistory(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            if (!id) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: MESSAGES.ALL_FIELD_REQUIRED });
                return;
            }
            const paymentData = await this.paymentService.getPaymentHistory(id, page, limit);
            res.status(HTTP_STATUS.SUCCESS).json({ success: true, message: MESSAGES.PAYMENT_FETCH_SUCCESSFULL, paymentData: paymentData });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to get payment history", error.message);
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: error.message });
            }
            console.log("Unknown error during get payment history.");
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: "An Unknwon error while get payment history" });
        }
    }

    async updatePaymentStatus(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: MESSAGES.ALL_FIELD_REQUIRED });
                return;
            }
            const data = await this.paymentService.updatePaymentStatus(id);
            console.log(data, 'this is tha data of the ');
            res.status(HTTP_STATUS.SUCCESS).json({ success: true, message: MESSAGES.PAYMENT_VARIFIED });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to update payment status", error.message);
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: error.message });
            }
            console.log("Unknown error during update payment status.");
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: "An Unknwon error while update payment status" });
        }
    }
}