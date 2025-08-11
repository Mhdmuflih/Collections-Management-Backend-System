import { Router } from "express";
import { AccountController } from "../controllers/account.controller";
import AccountRepository from "../repositories/account.repository";
import { AccountService } from "../services/account.service";

const accountService = new AccountService(AccountRepository);
const accountController = new AccountController(accountService);

const Account_Routes = Router();

Account_Routes.get("/", accountController.getAllAccount.bind(accountController));
Account_Routes.post("/", accountController.createAccount.bind(accountController));
Account_Routes.get("/:id", accountController.getAccountById.bind(accountController));
Account_Routes.put("/:id", accountController.updateAccount.bind(accountController));
Account_Routes.delete("/:id", accountController.softDeleteAccount.bind(accountController));

export default Account_Routes;