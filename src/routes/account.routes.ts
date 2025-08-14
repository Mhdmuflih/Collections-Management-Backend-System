import { Router } from "express";
import { AccountController } from "../controllers/account.controller";
import AccountRepository from "../repositories/account.repository";
import { AccountService } from "../services/account.service";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { dtoValidationMiddleware } from "../middlewares/dto.validation";
import { CreateAccountDTO } from "../dto/create-account.dto";
import { UpdateAccountDTO } from "../dto/update-account.dto";

const accountService = new AccountService(AccountRepository);
const accountController = new AccountController(accountService);

const Account_Routes = Router();

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: Account management endpoints
 *
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64cddc3bfc13ae736b000101
 *         accountNumber:
 *           type: string
 *           example: ACC-001
 *         name:
 *           type: string
 *           example: Jane Smith
 *         email:
 *           type: string
 *           example: janesmith@example.com
 *         phone:
 *           type: string
 *           example: "+1-202-555-0123"
 *         address:
 *           type: string
 *           example: 123 Main St, Springfield
 *         status:
 *           type: string
 *           enum: [Active, Inactive, Deleted]
 *           example: Active
 *         isDeleted:
 *           type: boolean
 *           example: false
 *         createdBy:
 *           type: string
 *           example: 64cddc3bfc13ae736b000102
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-08-12T12:34:56.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-08-12T13:34:56.000Z
 *
 *     CreateAccountRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - address
 *       properties:
 *         name:
 *           type: string
 *           example: Jane Smith
 *         email:
 *           type: string
 *           example: janesmith@example.com
 *         phone:
 *           type: string
 *           example: "+1-202-555-0123"
 *         address:
 *           type: string
 *           example: 123 Main St, Springfield
 *
 *     UpdateAccountRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Jane Doe
 *         email:
 *           type: string
 *           example: janedoe@example.com
 *         phone:
 *           type: string
 *           example: "+1-202-555-0145"
 *         address:
 *           type: string
 *           example: 456 Oak Ave, Springfield
 *         status:
 *           type: string
 *           enum: [Active, Inactive, Deleted]
 *           example: Inactive
 *
 *     PaginatedAccountsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Accounts fetched successfully
 *         total:
 *           type: integer
 *           example: 25
 *         accountData:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Account'
 *
 * /api/accounts:
 *   get:
 *     summary: Get all accounts (paginated)
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: Jane
 *     responses:
 *       200:
 *         description: List of accounts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedAccountsResponse'
 *       400:
 *         description: Missing pagination parameters
 *
 *   post:
 *     summary: Create a new account (Admin & Manager only)
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAccountRequest'
 *     responses:
 *       200:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Account created successfully
 *
 * /api/accounts/{id}:
 *   get:
 *     summary: Get account by ID
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 64cddc3bfc13ae736b000101
 *     responses:
 *       200:
 *         description: Account details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Account fetched successfully
 *                 accountData:
 *                   $ref: '#/components/schemas/Account'
 *       400:
 *         description: Invalid ID
 *
 *   put:
 *     summary: Update account details (Admin & Manager only)
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 64cddc3bfc13ae736b000101
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAccountRequest'
 *     responses:
 *       200:
 *         description: Account updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Account details updated
 *                 accountData:
 *                   $ref: '#/components/schemas/Account'
 *
 *   delete:
 *     summary: Soft delete account (Admin only)
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 64cddc3bfc13ae736b000101
 *     responses:
 *       200:
 *         description: Account soft deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Account soft deleted
 */

Account_Routes.get("/", authMiddleware, accountController.getAllAccount.bind(accountController));
Account_Routes.post("/", dtoValidationMiddleware(CreateAccountDTO), authMiddleware, roleMiddleware(["Admin", "Manager"]), accountController.createAccount.bind(accountController));
Account_Routes.get("/:id", authMiddleware, accountController.getAccountById.bind(accountController));
Account_Routes.put("/:id", dtoValidationMiddleware(UpdateAccountDTO), authMiddleware, roleMiddleware(["Admin", "Manager"]), accountController.updateAccount.bind(accountController));
Account_Routes.delete("/:id", authMiddleware, roleMiddleware(["Admin"]), accountController.softDeleteAccount.bind(accountController));

export default Account_Routes;