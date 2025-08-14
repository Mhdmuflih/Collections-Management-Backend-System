import mongoose from "mongoose";
import { MESSAGES } from "../constants/messages";
import { ICreatePayment } from "../interface/interface";
import { IPayment } from "../interface/models-interfaces/interface";
import { IPaymentRepository } from "../interface/repositories-interfaces/IPaymentRepository";
import { IPaymentService } from "../interface/services-interface/IPaymentService";
import { getIO } from "../sockets/socket.handler";

export class PaymentService implements IPaymentService {
    constructor(private paymentRepository: IPaymentRepository) { }

    async recordPayment(data: ICreatePayment): Promise<IPayment | null> {
        try {
            const paymentData: ICreatePayment = {
                account: data.account,
                amount: Number(data.amount),
                method: data.method,
                recordedBy: data.recordedBy,
            }
            const createPayment = await this.paymentRepository.createPayment(paymentData);
            if (!createPayment) {
                throw new Error(MESSAGES.PAYMENT_FAILED_TO_CREATE);
            }

            getIO().emit("payment:new", {
                message: "New payment recorded",
                payment: paymentData,
            });

            return createPayment;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to payment record service.", error.message);
                throw new Error(`Error payment record service ${error.message}`);
            }
            throw new Error("An unknown error occurred during payment record.");
        }
    }

    async getPaymentHistory(accountId: string, page: number, limit: number): Promise<{ total: number, paymentData: IPayment[] }> {
        try {
            const paymentData = await this.paymentRepository.paymentHistory(accountId, page, limit);
            if (!paymentData) {
                throw new Error(MESSAGES.PAYMENTDATA_NOT_FOUND);
            }
            return { total: paymentData.total, paymentData: paymentData.data };
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to payment history service.", error.message);
                throw new Error(`Error payment history service ${error.message}`);
            }
            throw new Error("An unknown error occurred during payment history.");
        }
    }

    async updatePaymentStatus(paymentId: string): Promise<IPayment | null> {
        try {
            const paymentData = await this.paymentRepository.findPayment(paymentId);
            if (!paymentData) {
                throw new Error(MESSAGES.PAYMENT_NOT_FOUND);
            }

            const updateStatus = await this.paymentRepository.updateStatus(paymentId);

            getIO().emit("payment:statusUpdated", {
                message: "Payment status updated",
                payment: updateStatus,
            });

            return updateStatus;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to update payment status service.", error.message);
                throw new Error(`Error update payment status service ${error.message}`);
            }
            throw new Error("An unknown error occurred during update payment status.");
        }
    }
}