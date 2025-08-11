import { ICreatePayment } from "../interface/interface";
import { IPayment } from "../interface/models-interfaces/interface";
import { IPaymentRepository } from "../interface/repositories-interfaces/IPaymentRepository";
import Payment from "../models/payment.model";
import { BaseRepository } from "./base.respository";

class PaymentRepository extends BaseRepository<IPayment> implements IPaymentRepository {
    constructor() {
        super(Payment);
    }

    async createPayment(createData: ICreatePayment): Promise<IPayment | null> {
        try {
            return this.create(createData);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error in create payment: ${error.message}`);
            }
            throw new Error("Unknown error in create payment");
        }
    }

    async paymentHistory(accountId: string, page: number, limit: number): Promise<{ total: number, data: IPayment[] }> {
        try {
            return this.findWithPagination({ account: accountId }, page, limit);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error in create payment: ${error.message}`);
            }
            throw new Error("Unknown error in create payment");
        }
    }

    async findPayment(paymentId: string): Promise<IPayment | null> {
        try {
            return this.findOne({ _id: paymentId });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error in find payment: ${error.message}`);
            }
            throw new Error("Unknown error in find payment");
        }
    }

    async updateStatus(paymentId: string): Promise<IPayment | null> {
        try {
            return Payment.findOneAndUpdate({_id: paymentId}, {$set: {status: "completed"}}, {new: true}).exec();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error in update payment status: ${error.message}`);
            }
            throw new Error("Unknown error in update payment status.");
        }
    }
}

export default new PaymentRepository()