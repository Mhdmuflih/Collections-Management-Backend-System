import { IPaymentController } from "../interface/controllers-interfaces/IPaymentController";
import { IPaymentService } from "../interface/services-interface/IPaymentService";

export class PaymentController implements IPaymentController {
    constructor(private paymentService: IPaymentService) { }
}