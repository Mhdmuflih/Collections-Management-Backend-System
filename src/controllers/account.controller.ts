import { IAccountController } from "../interface/controllers-interfaces/IAccountControllers";
import { IAccountService } from "../interface/services-interface/IAccountService";

export class AccountController implements IAccountController {
    constructor(private accountService: IAccountService) { }
}