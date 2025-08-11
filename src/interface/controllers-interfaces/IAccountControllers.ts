import { Request, Response } from "express";

export interface IAccountController {
    getAllAccount(req: Request, res: Response): Promise<void>;
    createAccount(req: Request, res: Response): Promise<void>;
    getAccountById(req: Request, res: Response): Promise<void>;
    updateAccount(req: Request, res: Response): Promise<void>;
    softDeleteAccount(req: Request, res: Response): Promise<void>;
}