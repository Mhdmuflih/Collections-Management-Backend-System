import { Router } from "express";
import { AccountController } from "../controllers/account.controller";
import AccountRepository from "../repositories/account.repository";
import { AccountService } from "../services/account.service";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const accountService = new AccountService(AccountRepository);
const accountController = new AccountController(accountService);

const Account_Routes = Router();

Account_Routes.get("/", authMiddleware, accountController.getAllAccount.bind(accountController));
Account_Routes.post("/", authMiddleware, roleMiddleware(["Admin", "Manager"]), accountController.createAccount.bind(accountController));
Account_Routes.get("/:id", authMiddleware, accountController.getAccountById.bind(accountController));
Account_Routes.put("/:id", authMiddleware, roleMiddleware(["Admin", "Manager"]), accountController.updateAccount.bind(accountController));
Account_Routes.delete("/:id", authMiddleware, roleMiddleware(["Admin"]), accountController.softDeleteAccount.bind(accountController));

export default Account_Routes;