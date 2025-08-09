import { IPayment } from "../interface/models-interfaces/model.interface";
import { IPaymentRepository } from "../interface/repositories-interfaces/IPaymentRepository";
import Payment from "../models/payment.model";
import { BaseRepository } from "./base.respository";

export class PaymentRepository extends BaseRepository<IPayment> implements IPaymentRepository {
    constructor() {
        super(Payment);
    }
}