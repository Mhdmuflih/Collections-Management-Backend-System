import { IPayment } from "../interface/models-interfaces/interface";
import { IPaymentRepository } from "../interface/repositories-interfaces/IPaymentRepository";
import Payment from "../models/payment.model";
import { BaseRepository } from "./base.respository";

class PaymentRepository extends BaseRepository<IPayment> implements IPaymentRepository {
    constructor() {
        super(Payment);
    }
}

export default new PaymentRepository()