import { IPaymentRepository } from "../interface/repositories-interfaces/IPaymentRepository";
import { IPaymentService } from "../interface/services-interface/IPaymentService";

export class PaymentService implements IPaymentService{
    constructor(private paymentRepository: IPaymentRepository) { }
}