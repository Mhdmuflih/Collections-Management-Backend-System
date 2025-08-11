import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
import { IAuthTokenPayload } from "../interface/interface";

configDotenv();

const JWT_ACCESS_SECRET: string | undefined = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET: string | undefined = process.env.JWT_REFRESH_SECRET;

if (!JWT_ACCESS_SECRET || !JWT_REFRESH_SECRET) {
    throw new Error("JWT secrets are not defined in environment variables");
}

export const generateAccessToken = (userId: string, role: string): string => {
    return jwt.sign(
        { userId, role },
        JWT_ACCESS_SECRET as string,
        { expiresIn: "30m" }
    );
};

export const generateRefreshToken = (userId: string, role: string): string => {
    return jwt.sign(
        { userId, role },
        JWT_REFRESH_SECRET as string,
        { expiresIn: "1d" }
    );
};

export const verifyAccessToken = (token: string): IAuthTokenPayload => {
    try {
        const decode = jwt.verify(token, JWT_ACCESS_SECRET as string) as IAuthTokenPayload;
        return decode;
    } catch (error: unknown) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error("Access token has expired");
        }
        if (error instanceof jwt.JsonWebTokenError) {
            throw new Error("Invalid access token");
        }
        throw new Error("Unknown error occurred while verifying access token");
    }
};

export const verifyRefreshToken = (token: string): IAuthTokenPayload => {
    try {
        const decode = jwt.verify(token, JWT_REFRESH_SECRET as string) as IAuthTokenPayload;
        return decode;
    } catch (error: unknown) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error("Refresh token has expired");
        }
        if (error instanceof jwt.JsonWebTokenError) {
            throw new Error("Invalid refresh token");
        }
        throw new Error("Unknown error occurred while verifying refresh token");
    }
}