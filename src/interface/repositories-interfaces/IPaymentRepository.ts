import { ICreatePayment } from "../interface";
import { IPayment } from "../models-interfaces/interface";

export interface IPaymentRepository {
    createPayment(createData: ICreatePayment): Promise<IPayment | null>;
    paymentHistory(accountId: string, page: number, limit: number): Promise<{total: number, data: IPayment[]}>;
    findPayment(paymentId: string): Promise<IPayment | null>;
    updateStatus(paymentId: string): Promise<IPayment | null>;
}