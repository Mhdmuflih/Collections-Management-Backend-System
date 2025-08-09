import { Router } from "express";
import { AccountController } from "../controllers/account.controller";
import AccountRepository from "../repositories/account.repository";
import { AccountService } from "../services/account.service";

const accountService =  new AccountService(AccountRepository);
const accountController = new AccountController(accountService);

const Account_Routes = Router();

export default Account_Routes;