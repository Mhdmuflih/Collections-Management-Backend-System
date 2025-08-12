import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { HTTP_STATUS } from "../constants/http-status";
import { MESSAGES } from "../constants/messages";

dotenv.config();

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;
    console.log(authHeader, 'what is this')

    // Check if the token is available in the Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: MESSAGES.UNAUTHORIZED });
        return;
    }

    const token = authHeader.split(' ')[1];
    console.log(token, ' this is the jwt token')
    const userType = authHeader.split(' ')[2];
    console.log(userType, 'user type')

    try {
        console.log(process.env.JWT_ACCESS_SECRET, 'this is env data')
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET || "access_secret") as JwtPayload;
        console.log("Decoded:", decoded);
        req.headers['x-user-id'] = decoded.userId;

        next();
    } catch (error: any) {
        console.log("Error in validate Token:", error.message);
        res.status(HTTP_STATUS.FORBIDDEN).json({ message: MESSAGES.FORBIDDEN });
        return;
    }
};