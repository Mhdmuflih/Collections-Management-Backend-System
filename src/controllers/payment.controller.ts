import { Request, Response } from "express";
import { IPaymentController } from "../interface/controllers-interfaces/IPaymentController";
import { IPaymentService } from "../interface/services-interface/IPaymentService";
import { HTTP_STATUS } from "../constants/http-status";

export class PaymentController implements IPaymentController {
    constructor(private paymentService: IPaymentService) { }

    async recordPayment(req: Request, res: Response): Promise<void> {
        try {

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