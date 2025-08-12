import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../constants/http-status";
import { MESSAGES } from "../constants/messages";

export const roleMiddleware = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.headers['x-user-role'] as string;

        if (!allowedRoles.includes(userRole)) {
            return res.status(HTTP_STATUS.FORBIDDEN).json({ message: MESSAGES.ACCESS_DENIED });
        }

        next();
    };
};