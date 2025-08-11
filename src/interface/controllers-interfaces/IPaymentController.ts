import { Request, Response } from "express";

export interface IPaymentController {
    recordPayment(req: Request, res: Response): Promise<void>;
    getPaymentHistory(req: Request, res: Response): Promise<void>;
    updatePaymentStatus(req: Request, res: Response): Promise<void>;
}