import { Request, Response } from "express";
import { IAccountController } from "../interface/controllers-interfaces/IAccountControllers";
import { IAccountService } from "../interface/services-interface/IAccountService";
import { HTTP_STATUS } from "../constants/http-status";
import { MESSAGES } from "../constants/messages";

export class AccountController implements IAccountController {
    constructor(private accountService: IAccountService) { }

    async getAllAccount(req: Request, res: Response): Promise<void> {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const search = req.query.search ? String(req.query.search) : undefined;

            if (!page || !limit) {
                throw new Error(MESSAGES.PAGE_LIMITS_ARE_REQUIRED);
            }


            const { total, accountData } = await this.accountService.getAllAccountData(page, limit, search);
            res.status(HTTP_STATUS.SUCCESS).json({ success: true, message: MESSAGES.ACCOUNTS_FETCH_SUCCESSFULL, total, accountData: accountData });
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
            const { name, email, phone, address } = req.body;
            const userId = req.headers['x-user-id'];
            if (!name || !email || !phone || !address || !userId) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: MESSAGES.ALL_FIELD_REQUIRED });
                return;
            }

            await this.accountService.createAccount(req.body, userId as string);
            res.status(HTTP_STATUS.SUCCESS).json({ success: true, message: MESSAGES.ACCOUNT_CREATED_SUCCESSFULL });
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
            const { id } = req.params;
            if (!id) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: MESSAGES.ALL_FIELD_REQUIRED });
                return;
            }

            const accountData = await this.accountService.getAccountData(id);
            res.status(HTTP_STATUS.SUCCESS).json({ success: true, message: MESSAGES.ACCOUNT_FETCH_SUCCESSFULL, accountData: accountData });
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
            const { id } = req.params;
            const updateFields = req.body;
            if (!id) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: MESSAGES.ALL_FIELD_REQUIRED });
                return;
            }
            const accountData = await this.accountService.updateAccount(id, updateFields);
            res.status(HTTP_STATUS.SUCCESS).json({ success: true, message: MESSAGES.ACCOUNT_DETAILS_UPDATED, accountData: accountData });
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
            const { id } = req.params;
            if (!id) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: MESSAGES.ALL_FIELD_REQUIRED });
                return;
            }

            await this.accountService.softDelete(id);
            res.status(HTTP_STATUS.SUCCESS).json({ success: true, message: MESSAGES.ACCOUNT_SOFT_DELETED });
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