import { Request, Response } from "express";
import { IAccountController } from "../interface/controllers-interfaces/IAccountControllers";
import { IAccountService } from "../interface/services-interface/IAccountService";
import { HTTP_STATUS } from "../constants/http-status";

export class AccountController implements IAccountController {
    constructor(private accountService: IAccountService) { }

    async getAllAccount(req: Request, res: Response): Promise<void> {
        try {

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to get all account controller", error.message);
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: error.message });
            }
            console.log("Unknown error during get all account controller.");
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: "An Unknown error occurred while get all account" });
        }
    }

    async createAccount(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.body, 'this is account details data from account service');

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Failed to create account controller", error.message);
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: error.message });
            }
            console.log("Unknown error during create account.");
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: "An Unknown error occurred while create account" });
        }
    }

    async getAccountById(req: Request, res: Response): Promise<void> {
        try {

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Unknown error get account by id controller.", error.message);
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: error.message });
            }
            console.log("Unknown error during get account by id controller.");
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: "An Unknown error occurred while get account by id" });
        }
    }

    async updateAccount(req: Request, res: Response): Promise<void> {
        try {

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Unknown error update account controller.", error.message);
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: error.message });
            }
            console.log("Unknown error during update account controller.");
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: "An Unknown error occurred while update account." });
        }
    }

    async softDeleteAccount(req: Request, res: Response): Promise<void> {
        try {

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Unknown error soft delete account controller.", error.message);
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: error.message });
            }
            console.log("Unknown error during soft delete account.");
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: "An Unknown error occurred while soft delete account." });
        }
    }
}