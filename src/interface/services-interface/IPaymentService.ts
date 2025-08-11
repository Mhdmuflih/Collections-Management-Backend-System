import { IPayment } from "../models-interfaces/interface";

export interface IPaymentService {
    recordPayment(id: string, amount: number, method: string, userId: string): Promise<IPayment | null>;
    getPaymentHistory(accountId: string, page: number, limit: number): Promise<{ total: number, paymentData: IPayment[] }>;
    updatePaymentStatus(paymentId: string): Promise<IPayment | null>;
};